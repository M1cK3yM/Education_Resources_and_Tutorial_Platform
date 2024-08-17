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

const SignupPage = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { register } = useAuth();

  const handleDataChange = (name) => (e) => {
    setData({
      ...data,
      [name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    if (data.password !== data.confirmPassword) {
      // Handle password mismatch error
      console.log("Password mismatch!");
      return;
    }
    await register({
      name: data.name,
      email: data.email,
      password: data.password,
      role: "student",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Sign Up</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>UniHUB</DialogTitle>
          <DialogDescription>Explore, Learn, and Share.</DialogDescription>
        </DialogHeader>
        <Card className="mx-auto max-w-sm">
          <CardHeader className="space-y-1">
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
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={data.email}
                  onChange={handleDataChange("email")}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={data.password}
                  onChange={handleDataChange("password")}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={data.confirmPassword}
                  onChange={handleDataChange("confirmPassword")}
                  required
                />
              </div>
              <Button type="submit" className="w-full" onClick={handleSignup}>
                Sign Up
              </Button>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export { SignupPage };
