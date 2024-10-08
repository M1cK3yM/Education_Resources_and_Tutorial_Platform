const User = require("../models/users.model");
const Session = require("../models/session.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { OAuth2Client } = require('google-auth-library');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

const redirectURL = process.env.FRONTEND_URL + "/redirect";



async function getUserData(access_token) {

  const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);

  //console.log('response',response);
  const data = await response.json();
  console.log('data', data);
  return data;
}

const consentRequest = async (req, res) => {
  res.header("Referrer-Policy", "no-referrer-when-downgrade");

  const oAuth2Client = new OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET, redirectURL);
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid',
    prompt: 'consent'
  });

  res.json({ url: authorizeUrl })
}

const oauthResponse = async (req, res) => {
  const code = req.query.code;

  console.log('code', code);


  try {
    const oAuth2Client = new OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET, redirectURL);
    const r = await oAuth2Client.getToken(code);
    console.log("tokens", r);
    oAuth2Client.setCredentials(r.tokens);
    const credential = oAuth2Client.credentials;
    console.log('credentials', credential);
    const data = await getUserData(oAuth2Client.credentials.access_token)

    let user = await User.findOne({ email: data.email });

    if (!user) {
      user = await User.create({
        name: data.name,
        email: data.email,
        role: 'user',
        googleRefreshToken: r.tokens.refresh_token,
        profile: data.picture
      })
    } else {
      user.googleRefreshToken = r.tokens.refresh_token;
      await user.save();
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

    await Session.create({
      userId: user._id,
      refreshToken,
      ipAddress: req.ip,
      userAgent: req.userAgent,
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
      refreshToken: refreshToken,
      accessToken: accessToken,
      message: "Logged in Successfully",
    });

  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Internal server error" })
  }
}

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

    await Session.create({
      userId: user._id,
      refreshToken,
      ipAddress: req.ip,
      userAgent: req.userAgent,
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
      refreshToken: refreshToken,
      accessToken: accessToken,
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

    const link = `${process.env.FRONTEND_URL}/reset-password/${token}`;

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
      const link = `${process.env.FRONTEND_URL}/verify/${token}`;
      console.log(link);

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

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const session = await Session.findOneAndDelete({ refreshToken, userId: res.locals.user._id });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  try {
    const session = await Session.findOne({ refreshToken, userId: res.locals.user._id });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {

      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const newAccessToken = jwt.sign(
        {
          id: decoded.id,
          role: decoded.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
      );

      const newRefreshToken = jwt.sign(
        {
          id: decoded.id,
          role: decoded.role,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY },
      );

      session.refreshToken = newRefreshToken;
      await session.save();

      return res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const verifyEmail = async (req, res) => {
  const token = req.params.token;

  try {
    jwt.verify(token, process.env.VERIFY_TOKEN, async (err, decoded) => {
      if (err) {
        console.error("Error Controller", err)
        return res.status(401).json({ message: "Invalid token" });
      }

      const { name, email, password, role } = decoded;

      const user = await User.findOne({ email });
      if (user) {
        return res.status(403).json({ message: "Email already in used" });
      }

      bcrypt.hash(password, 10, (_err, hash) => {
        User.create({ name, email, role, password: hash }).then((result) => {
          console.log(result);
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
  oauthResponse,
  consentRequest
};
