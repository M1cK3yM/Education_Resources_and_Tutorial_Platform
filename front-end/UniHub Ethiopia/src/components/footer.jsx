import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <footer className="bg-transparent text-foregroud py-8 mt-8 border-t border-gray-250 footer-scaling">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-1/4 mb-6">
            <h4 className="text-xl font-bold mb-4">UniHub Ethiopia</h4>
            <p className="text-foreground">Empowering Students and Educators</p>
          </div>
          <div className="w-1/4 mb-6">
            <h5 className="text-lg font-bold mb-3">Quick Links</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gray-300">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-1/4 mb-6">
            <h5 className="text-lg font-bold mb-3">Follow Us</h5>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300">
                <FaFacebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="hover:text-gray-300">
                <FaTwitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="hover:text-gray-300">
                <FaLinkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          <div className="w-1/4 mb-6">
            <h5 className="text-lg font-bold mb-3">Newsletter</h5>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full p-2 bg-transparent border rounded"
              />
              <Button className="w-full">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="text-center mt-6">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} UniHub Ethiopia. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
