const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-3">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h2 className="text-xl font-bold mb-4">CineSphere</h2>
            <p className="text-sm text-gray-400">
              Your ultimate destination for booking movie tickets online. Enjoy
              seamless ticket booking and hassle-free experience!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <ul className="text-gray-400 space-y-2">
              <li>
                <a href="/" className="hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/movies" className="hover:text-white transition">
                  Movies
                </a>
              </li>
              <li>
                <a href="/offers" className="hover:text-white transition">
                  Offers
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <ul className="text-gray-400 space-y-2">
              <li>Email: cenesphere@gmail.com</li>
              <li>Phone: +1 123-456-7890</li>
              <li>Location: 123 Cinema Street, Mehsana</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 mt-8 text-sm">
          &#169; {new Date().getFullYear()} CineSphere. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
