import { Link } from "react-router-dom";
import { ModeToggle } from "./modeToggle";
import { Button } from "@/components/ui/button";
import { LoginPage } from "./login";

function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full bg-transparent text-foreground z-10">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link to="/" className="text-xl font-semibold">
          Logo
        </Link>

        <ul className="flex space-x-4">
          <li>
            <Link to="/universities" className="hover:text-gray-300">
              University
            </Link>
          </li>
          <li>
            <Link to="/events" className="hover:text-gray-300">
              Events
            </Link>
          </li>
          <li>
            <Link to="/resources" className="hover:text-gray-300">
              Resources
            </Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-gray-300">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-300">
              About
            </Link>
          </li>
          <li>
            <Link to="/news" className="hover:text-gray-300">
              News
            </Link>
          </li>
        </ul>
        <div className="flex items-center gap-4">
          <Button size="sm">Sign up</Button>
          <LoginPage />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
