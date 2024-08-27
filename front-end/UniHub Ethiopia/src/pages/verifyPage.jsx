import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Email } from "@rsuite/icons";
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CircleCheckIcon } from "lucide-react";

export default function Component() {
  const navigate = useNavigate();
  const { token } = useParams();
  const { verifyUser } = useAuth();

  if (token) {
    verifyUser(token);
  }

  return token ? (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <Card className="max-w-md w-full">
        <CardHeader>
          <div className="flex flex-col items-center justify-center gap-4">
            <CircleCheckIcon className="text-green-500 size-12" />
            <h2 className="text-2xl font-bold">Account Verified</h2>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center">
            Congratulations! Your account has been successfully verified. You
            will be redirected to the login page in 5 seconds.
          </p>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={() => {
              navigate("/");
            }}
          >
            Continue
          </Button>
        </CardFooter>
      </Card>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="mx-auto max-w-xl p-8 rounded-md shadow-md dark:shadow-purple-500/20">
        <div className="flex items-center justify-center mb-6">
          <Email style={{ fontSize: "5em" }} />
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">
          Verify your email address
        </h1>
        <p className="text-center mb-6">
          Thanks for signing up! We&apos;re excited to have you onboard. We just
          need you to verify your email address to complete your setup.
        </p>
        <div className="flex justify-center mb-6">
          <Button onClick={() => navigate("/")}>Return Hompage</Button>
        </div>
        <footer className="text-center ">
          If you have any issues, please contact our support team at
          support@example.com or call us at (123) 456-7890.
        </footer>
      </div>
    </div>
  );
}
