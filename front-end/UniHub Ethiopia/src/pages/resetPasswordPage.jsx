import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { EyeIcon, EyeOffIcon } from "@/components/ui/eyeicon";
import { Button } from "@/components/ui/button";

export default function ResetPassword() {
  const [data, setData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [showConfirmPasswordAlert, setShowConfirmPasswordAlert] =
    useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    setIsValid(true);
    setShowConfirmPasswordAlert(false);
    const newErrors = {
      newPassword: "",
      confirmPassword: "",
    };

    if (!data.newPassword) {
      newErrors.newPassword = "Password is required";
      setIsValid(false);
    }

    if (data.newPassword !== data.confirmPassword) {
      setShowConfirmPasswordAlert(true);
      newErrors.confirmPassword = "Passwords do not match";
      setIsValid(false);
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }
  };

  useEffect(() => {
    if (submitted) {
      validateForm();
    }
  }, [data, submitted]);

  const handleDataChange = (name) => (e) => {
    setData({
      ...data,
      [name]: e.target.value,
    });
  };

  const handleResetPassword = () => {
    setSubmitted(true);
    if (!isValid) {
      return;
    }
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 px-4 dark:bg-gray-950">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y1">
          <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
          <CardDescription>
            Enter your details to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2 relative">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                required
                value={data.newPassword}
                className={showConfirmPasswordAlert ? "!border-red-500" : ""}
                onChange={handleDataChange("newPassword")}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute bottom-1 right-1 h-7 w-7"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeIcon className="h-4 w-4" />
                ) : (
                  <EyeOffIcon className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle password visibility</span>
              </Button>
              {errors.newPassword && (
                <p className="text-red-500">{errors.newPassword}</p>
              )}
            </div>{" "}
            <div className="space-y-2 relative">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                value={data.confirmPassword}
                className={showConfirmPasswordAlert ? "!border-red-500" : ""}
                onChange={handleDataChange("confirmPassword")}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute bottom-1 right-1 h-7 w-7"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeIcon className="h-4 w-4" />
                ) : (
                  <EyeOffIcon className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle password visibility</span>
              </Button>
              {errors.newPassword && (
                <p className="text-red-500">{errors.newPassword}</p>
              )}
            </div>
            <Button type="button" onClick={handleResetPassword}>
              {" "}
              Reset Password{" "}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
