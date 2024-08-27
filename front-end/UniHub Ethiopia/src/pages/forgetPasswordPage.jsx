import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useAuthDialog } from "@/context/AuthDialogContext";

export default function ForgetPassword() {
  const [data, setData] = useState({
    email: "",
  });

  const handleDataChange = (name) => (e) => {
    setData({
      ...data,
      [name]: e.target.value,
    });
  };

  const { forgetPassword } = useAuth();
  const { toggleLogin } = useAuthDialog();

  const handleSubmit = (e) => {
    e.preventDefault();
    forgetPassword(data);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 px-4 dark:bg-gray-950">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Forgot your password?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Enter the email address associated with your account and we&apos;ll
            send you a link to reset your password.
          </p>
        </div>
        <form className="space-y-6" action="#" method="POST">
          <div>
            <Label htmlFor="email" className="sr-only">
              Email address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              onChange={handleDataChange("email")}
              required
              placeholder="Email address"
            />
          </div>
          <Button type="submit" className="w-full" onClick={handleSubmit}>
            Reset password
          </Button>
        </form>
        <div className="flex justify-center">
          <Link
            to="/"
            onClick={toggleLogin}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
