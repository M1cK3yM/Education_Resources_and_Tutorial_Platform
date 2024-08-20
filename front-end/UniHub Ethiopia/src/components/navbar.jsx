import { Link } from "react-router-dom";
import { ModeToggle } from "./modeToggle";
import { LoginPage } from "./login";
import { SignupPage } from "./signup";
import { useAuth } from "../context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BASE_URL } from "../api/config";
import { Button } from "@/components/ui/button";
import { itemsConfig } from "@/api";
import MainNav from "./mainNav";
import MobileNav from "./mobileNav";

function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  const isHomePage = location.pathname === "/";
  return (
    <nav className="absolute top-0 left-0 w-full bg-transparent text-foreground z-10">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link to="/" className="mx-2 text-xl font-semibold hidden md:flex">
          UniHUB
        </Link>
        <MainNav />
        <MobileNav />

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Avatar>
                <AvatarImage
                  src={BASE_URL + "uploads/" + user.profile}
                  alt="@shadcn"
                />
                <AvatarFallback>{user.name.toUpperCase()[0]}</AvatarFallback>
              </Avatar>
              <Button onClick={handleLogout} variant="outline">
                Logout
              </Button>
            </>
          ) : (
            <>
              <SignupPage />
              <LoginPage />
            </>
          )}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
