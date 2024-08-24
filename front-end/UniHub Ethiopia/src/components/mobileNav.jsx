import { useState } from "react";
import { Link } from "react-router-dom";
import { itemsConfig } from "@/api";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { LoginPage } from "./login";
import { SignupPage } from "./signup";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <svg
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path
              d="M3 5H11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 12H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 19H21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className=" flex flex-col justify-between ">
        <div>
          <Link
            to="/"
            className="mx-4 text-2xl font-bold my-32 text-gray-800 hover:text-indigo-600"
            style={{ textDecoration: "none" }}
            onClick={() => setOpen(false)}
          >
            UniHUb
          </Link>
          <ScrollArea className="px-4 py-10">
            <nav className="space-y-4">
              {itemsConfig.mainNav.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="hover:text-gray-300 block font-bold text-lg"
                  style={{ textDecoration: "none" }}
                  onClick={() => setOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </ScrollArea>
        </div>

        <div className="px-4 py-4">
          {user ? (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setOpen(false);
                handleLogout();
              }}
            >
              <span className="mr-4">
                <LogOut size={18} />
              </span>
              Logout
            </Button>
          ) : (
            <div className="flex flex-col gap-4">
              <LoginPage />
              <SignupPage />
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
