import { Link, useNavigate } from "react-router-dom";
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
import { Input } from "./ui/input";

function Navbar({ searchTerm, setSearchTerm, handleSearch }) {
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
        <Link
          to="/"
          className="mx-2 text-xl font-semibold hidden md:flex"
          style={{ textDecoration: "none" }}
        >
          UniHUB
        </Link>
        <MainNav />
        <MobileNav />

        {!isHomePage && (
          <form onSubmit={handleSearch} className="flex mx-10 min-w-32">
            <Input
              className="flex w-full"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              placeholder="Search"
            />
          </form>
        )}

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/setting">
                <Avatar>
                  <AvatarImage
                    src={user.profile}
                    alt="@shadcn"
                    className="object-cover"
                  />
                  <AvatarFallback>{user.name.toUpperCase()[0]}</AvatarFallback>
                </Avatar>
              </Link>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="hidden md:block"
              >
                Logout
              </Button>
            </>
          ) : (
            <div className="hidden gap-4 md:flex">
              <SignupPage />
              <LoginPage />
            </div>
          )}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
