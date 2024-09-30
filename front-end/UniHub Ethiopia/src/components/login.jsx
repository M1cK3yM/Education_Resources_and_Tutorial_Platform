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
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useAuthDialog } from "@/context/AuthDialogContext";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { EyeIcon, EyeOffIcon } from "@/components/ui/eyeicon";
import { Loader } from "rsuite";

const LoginPage = () => {

  function navigate(url) {
    window.location.href = url;
  }
  const [isLoading, setIsLoading] = useState(false)
  const { login, signinWithGoogle } = useAuth();

  async function handleGoogleSignIn() {
    await signinWithGoogle();
  }

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const { isLoginOpen, toggleLogin, toggleSignup } = useAuthDialog();

  const handleDataChange = (name) => (e) => {
    setData({
      ...data,
      [name]: e.target.value,
    });
  };

  const validateForm = async () => {
    let isValid = true;
    const newErrors = {
      email: "",
      password: "",
    };

    if (!data.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (!data.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }
    if (isValid) {
      setIsLoading(true);
      const response = await login(data);
      setIsLoading(false);
      console.log("response", response);

      if (!response.success) {
        if (response.data.message) {
          newErrors["password"] = response.data.message;
        }
        response.data.errors?.map((err) => {
          newErrors[err.path] = err.msg;
        });

        setErrors(newErrors);
        console.log(errors);
        return;
      }

      toggleLogin();
    } else {
      setErrors(newErrors);
      console.log("errors", errors);
      return;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    validateForm();
  };

  return (
    <Dialog onOpenChange={toggleLogin} open={isLoginOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>UniHUB</DialogTitle>
          <DialogDescription>Explore, Learn, and Share.</DialogDescription>
        </DialogHeader>
        <Card className="mx-auto max-w-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>
              Enter your email and password to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
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
                  <span className="sr-only">Toggle password visbility</span>
                </Button>
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
              <div className="flex items-center justify-between pb-2">
                <div className="flex items-center">
                  <Checkbox
                    id="remember-me"
                    name="remember-me"
                    className="h-4 w-4 rounded"
                  />
                  <Label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-muted-foreground"
                  >
                    Remember me
                  </Label>
                </div>
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-blue-600"
                    onClick={toggleLogin}
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <div className="flex flex-row-reverse pb-2">
                <div className="text-sm">
                  <Link
                    href="#"
                    className="font-medium text-blue-600"
                    onClick={() => {
                      toggleLogin();
                      toggleSignup();
                    }}
                  >
                    Create Account
                  </Link>
                </div>
                <div className="px-3">
                  <Label>New to UniHUB ?</Label>
                </div>
              </div>
              <Button type="button" className="w-full" onClick={handleLogin}>
                <span>Login</span>
                <span className="ml-2 w-4 h-4">
                  {isLoading && <Loader size="sm" />}
                </span>
              </Button>
              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500 text-sm px-2">or</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <Button type="button" className="login-with-google-btn w-full" onClick={handleGoogleSignIn} >
                Sign in with Google
              </Button>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export { LoginPage };
