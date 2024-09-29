import { Link } from "react-router-dom";
import { itemsConfig } from "../api/items";

export default function MainNav() {
  return (
    <ul className="mx-3 space-x-4 hidden md:flex">
      {itemsConfig.mainNav.map((item) => (
        <li key={item.name}>
          <Link to={item.href} className="hover:text-gray-300">
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
