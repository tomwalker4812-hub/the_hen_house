const Footer = () => {
  return (
    <footer className="bg-brown text-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">The Hen House</h3>
            <p className="text-sm">
              Your premier destination for western-style fashion and boutique clothing.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/products?category=dresses" className="hover:text-tan transition-colors">Dresses</a></li>
              <li><a href="/products?category=bottoms" className="hover:text-tan transition-colors">Bottoms</a></li>
              <li><a href="/products?category=shoes" className="hover:text-tan transition-colors">Shoes</a></li>
              <li><a href="/products?category=jewelry" className="hover:text-tan transition-colors">Jewelry</a></li>
              <li><a href="/products?category=hats-caps" className="hover:text-tan transition-colors">Hats & Caps</a></li>
              <li><a href="/products?category=sale" className="hover:text-tan transition-colors">Sale</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/contact" className="hover:text-tan transition-colors">Contact Us</a></li>
              <li><a href="/shipping" className="hover:text-tan transition-colors">Shipping Info</a></li>
              <li><a href="/returns" className="hover:text-tan transition-colors">Returns</a></li>
              <li><a href="/size-guide" className="hover:text-tan transition-colors">Size Guide</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-tan transition-colors">Instagram</a>
              <a href="#" className="hover:text-tan transition-colors">Facebook</a>
              <a href="#" className="hover:text-tan transition-colors">Pinterest</a>
            </div>
            <div className="mt-4">
              <h5 className="font-semibold mb-2">Newsletter</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 text-brown bg-cream rounded-l-md focus:outline-none focus:ring-2 focus:ring-tan"
                />
                <button className="px-4 py-2 bg-rust text-cream rounded-r-md hover:bg-brown transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-tan mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 The Hen House. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;