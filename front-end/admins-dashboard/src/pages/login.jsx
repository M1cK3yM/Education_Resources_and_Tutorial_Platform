import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { LockIcon, AlertCircleIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { authApi } from "@/api";

const LoginPage = () => {
  const { login } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    email: "",
    password: ""
  })

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
      password: ""
    }

    if (!data.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (!data.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    if (isValid) {
      const response = await login(data);

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
    } else {
      setErrors(newErrors);
      console.log("errors", errors);
      return;
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    validateForm();
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="admin@example.com"
                type="email"
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
          </div>
          {errors.password && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircleIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errors.password}</AlertDescription>
            </Alert>
          )}
          {errors.email && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircleIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errors.email}</AlertDescription>
            </Alert>
          )}

          <Button className="w-full mt-6" type="button" onClick={handleLogin}>
            <LockIcon className="mr-2 h-4 w-4" /> Login
          </Button>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center text-gray-600 mt-4 w-full">
            Protected by UNiHUB Ethiopia
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default LoginPage;
