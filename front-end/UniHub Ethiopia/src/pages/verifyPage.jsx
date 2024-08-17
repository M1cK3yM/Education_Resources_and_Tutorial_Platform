import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Email } from "@rsuite/icons";

export default function Component() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="mx-auto max-w-xl bg-white dark:bg-gray-800 p-8 rounded-md shadow-md">
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
