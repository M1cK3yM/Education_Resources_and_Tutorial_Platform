import { Link } from "react-router-dom";
import { ModeToggle } from "./modeToggle";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">University </Link>
        </li>
        <li>
          <Link to="/events">Events</Link>
        </li>
        <li>
          <Link to="/resources">Resources</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/news">News</Link>
        </li>
        <ModeToggle />
      </ul>
    </nav>
  );
}

export default Navbar;
