const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

const loginAccount = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Invalid Email or Password" });
    }

    console.log(user);
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(404).json({ message: "Invalid Email or Password" });
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
    );

    const refreshToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      sameSite: "Lax",
      secure: false,
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 15 * 60 * 1000, // 15 minutes
      sameSite: "Lax",
      secure: false,
    });

    return res.status(200).json({
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        bookmark: user.bookmark,
        profile: user.profile,
      },
      message: "Logged in Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Login failed" });
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    const link = `http://${process.env.HOST}:${process.env.PORT}/reset-password/${token}`;

    transporter.sendMail(
      {
        from: process.env.SMTP_USERNAME,
        to: email,
        subject: "Reset your password",
        html: `
              <h2>Please click on the following link to reset your account</h2>
              <button style="background-color: #325ca8;
                              border: none;
                              color: white;
                              padding: 15px 32px; 
                              text-align: center;
                              text-decoration: none;
                              display: inline-block; 
                              font-size: 16px; 
                              margin: 4px 2px;
                              cursor: pointer;">
                              <a href="${link}">Reset your password</a>
              </button>`,
      },
      (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).json({ message: "Server error" });
        } else {
          console.log("Email sent: " + info.response);
          res
            .status(200)
            .json({ message: "Password reset link sent to your email" });
        }
      },
    );
    res.status(200).json({ message: "Password reset link sent to your email" });

    console.log(link);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const verifyUser = await User.findOne({ email });

  try {
    if (verifyUser) {
      return res.status(403).json({
        message: "Email already in used",
      });
    } else {
      const token = jwt.sign(req.body, process.env.VERIFY_TOKEN, {
        expiresIn: "1h",
      });
      const link = `http://${process.env.HOST}:${process.env.PORT}/verify-email/${token}`;

      transporter.sendMail(
        {
          from: process.env.SMTP_USERNAME,
          to: email,
          subject: "Verify your account",
          html: `
              <h2>Please click on the following link to verify your account</h2>
              <button style="background-color: #325ca8;
                              border: none;
                              color: white;
                              padding: 15px 32px; 
                              text-align: center;
                              text-decoration: none;
                              display: inline-block; 
                              font-size: 16px; 
                              margin: 4px 2px;
                              cursor: pointer;">
                              <a href="${link}">Verify your account</a>
              </button>`,
        },
        async (error, info) => {
          if (error) {
            console.log(error);
            return res.status(500).json({
              message: "Error sending email",
            });
          }
          console.log("Email sent: " + info.response);
          res.status(200).json({
            message: "User verification email sent",
          });
        },
      );
    }
  } catch (err) {
    console.log("unable to create user: " + err);
    return res.status(412).json({
      message: "Failed to registrer user",

      success: false,
    });
  }
};

const logout = (_req, res) => {
  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");
  console.log("Logged out successfully");
  res.status(200).json({ message: "Logged out successfully" });
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const accessToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
    );

    res.clearCookie("accessToken");

    res.cookie("accessToken", accessToken, {
      maxAge: 15 * 60 * 1000, // 15 minutes
      sameSite: "Lax",
      secure: false,
    });
    return res.status(200).send("Access token refreshed");
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const verifyEmail = async (req, res) => {
  const token = req.params.token;

  try {
    jwt.verify(token, process.env.VERIFY_TOKEN, function (err, decoded) {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }

      const { name, email, password, role } = decoded;

      bcrypt.hash(password, 10, (_err, hash) => {
        User.create({ name, email, role, password: hash }).then((result) => {
          return res.status(201).json({
            message: "User Successfully Created",
            result: result,
          });
        });
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  loginAccount,
  forgetPassword,
  resetPassword,
  registerUser,
  logout,
  refreshToken,
  verifyEmail,
};
