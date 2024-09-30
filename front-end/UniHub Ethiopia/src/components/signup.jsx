import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "@/components/ui/eyeicon";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useAuthDialog } from "../context/AuthDialogContext";
import { Loader } from "rsuite";
import { GoogleLogin } from "@react-oauth/google";

const SignupPage = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPasswordAlert, setShowConfirmPasswordAlert] =
    useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [isLoading, setIsLoading] = useState(false);
  const { register, signinWithGoogle } = useAuth();
  const { isSignupOpen, toggleLogin, toggleSignup } = useAuthDialog();

  async function handleGoogleSignIn() {
    await signinWithGoogle();
  }

  const handleDataChange = (name) => (e) => {
    setData({
      ...data,
      [name]: e.target.value,
    });
  };

  const validateForm = async () => {
    let isValid = true;
    setShowConfirmPasswordAlert(false);
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!data.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!data.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (!data.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    if (data.password !== data.confirmPassword) {
      // Handle password mismatch error
      setShowConfirmPasswordAlert(true);
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }
    if (isValid) {
      setIsLoading(true);
      const response = await register({
        name: data.name,
        email: data.email,
        password: data.password,
        role: "student",
      });
      setIsLoading(false);

      if (!response.success) {
        response.data.errors.map((err) => {
          newErrors[err.path] = err.msg;
        });

        setErrors(newErrors);
        console.log(errors);
        return;
      }
    } else {
      setErrors(newErrors);
      return;
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    validateForm();
  };

  return (
    <Dialog open={isSignupOpen} onOpenChange={toggleSignup}>
      <DialogTrigger asChild>
        <Button>Sign Up</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>UniHUB</DialogTitle>
          <DialogDescription>Explore, Learn, and Share.</DialogDescription>
        </DialogHeader>
        <Card className="mx-auto max-w-sm">
          <CardHeader className="space-y1">
            <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
            <CardDescription>
              Enter your details to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={data.name}
                  onChange={handleDataChange("name")}
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={data.email}
                  onChange={handleDataChange("email")}
                  required
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>
              <div className="space-y-2 relative">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={data.password}
                  onChange={handleDataChange("password")}
                  className={showConfirmPasswordAlert ? "!border-red-500" : ""}
                  required
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute bottom-1 right-1 h-7 w-7"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? (
                    <EyeIcon className="h-4 w-4" />
                  ) : (
                    <EyeOffIcon className="h-4 w-4" />
                  )}
                  <span className="sr-only">Toggle password visibility</span>
                </Button>
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
              <div className="space-y-2 relative">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type={showPassword ? "text" : "password"}
                  value={data.confirmPassword}
                  onChange={handleDataChange("confirmPassword")}
                  className={showConfirmPasswordAlert ? "!border-red-500" : ""}
                  required
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute bottom-1 right-1 h-7 w-7"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? (
                    <EyeIcon className="h-4 w-4" />
                  ) : (
                    <EyeOffIcon className="h-4 w-4" />
                  )}
                  <span className="sr-only">Toggle password visibility</span>
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword}</p>
              )}
              <Button type="button" className="w-full" onClick={handleSignup}>
                <span>Sign in</span>
                <span className="ml-2 w-4 h-4">
                  {isLoading && <Loader size="sm" />}
                </span>
              </Button>

              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500 text-sm px-2">or</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <div className="mt-7">
                <Button type="button" className="login-with-google-btn w-full" onClick={handleGoogleSignIn} >
                  Sign in with Google
                </Button>

              </div>
              <div>
                <p>
                  Already have an account?{" "}
                  <Link
                    href="#"
                    className="font-medium text-blue-600"
                    onClick={() => {
                      toggleLogin();
                      toggleSignup();
                    }}
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export { SignupPage };
