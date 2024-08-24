const Footer = () => {
  return (
    <div>
      <hr />
      <footer className="bg-transparent text-white py-8 mt-0">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/4 mb-6">
              <h4 className="text-foreground text-xl font-bold mb-4">
                UniHub Ethiopia
              </h4>
              <p className="text-foreground">
                Empowering Students and Educators
              </p>
            </div>
            <div className="w-full md:w-1/4 mb-6">
              <h5 className="text-foreground text-lg font-bold mb-3">
                Quick Links
              </h5>
              <ul>
                <li>
                  <a href="/" className=" text-foreground hover:underline">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-foreground hover:underline">
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-foreground hover:underline"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="text-foreground w-full md:w-1/4 mb-6">
              <h5 className="text-lg font-bold mb-3">Follow Us</h5>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-400">
                  Facebook
                </a>
                <a href="#" className="hover:text-gray-400">
                  Twitter
                </a>
                <a href="#" className="hover:text-gray-400">
                  LinkedIn
                </a>
              </div>
            </div>
            <div className="text-foreground w-full md:w-1/4 mb-6">
              <h5 className="text-lg font-bold mb-3">Newsletter</h5>
              <form>
                <input
                  type="email"
                  placeholder="Your email"
                  className="p-2 w-full rounded bg-transparent border border-gray-700"
                />
                <button
                  type="submit"
                  className="mt-2 w-full bg-foreground hover:bg-background hover:text-foreground text-background p-2 rounded"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="text-gray-500">
              &copy; 2024 UniHub Ethiopia. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
