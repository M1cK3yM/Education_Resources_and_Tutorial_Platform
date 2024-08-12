import { Link } from "react-router-dom";
import { ModeToggle } from "./modeToggle";

function Navbar() {
  return (
    <nav className="bg-background text-foreground py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        
        <Link to="/" className="text-xl font-semibold">
          Logo
        </Link>
        
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-accent">University</Link>
          </li>
          <li>
            <Link to="/events" className="hover:text-accent">Events</Link>
          </li>
          <li>
            <Link to="/resources" className="hover:text-accent">Resources</Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-accent">Profile</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-accent">About</Link>
          </li>
          <li>
            <Link to="/news" className="hover:text-accent">News</Link>
          </li>
        </ul>
        
        <ModeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
