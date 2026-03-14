export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-brown mb-4">
          Contact Us
        </h1>
        <p className="text-xl text-brown">
          We'd love to hear from you
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-brown mb-6">
            Send us a message
          </h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-brown mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-3 py-2 border border-brown rounded-md focus:outline-none focus:ring-2 focus:ring-rust"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brown mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-3 py-2 border border-brown rounded-md focus:outline-none focus:ring-2 focus:ring-rust"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-brown mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="w-full px-3 py-2 border border-brown rounded-md focus:outline-none focus:ring-2 focus:ring-rust"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-brown mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="w-full px-3 py-2 border border-brown rounded-md focus:outline-none focus:ring-2 focus:ring-rust"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-rust text-cream py-3 px-6 rounded-md hover:bg-brown transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info & Map */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-brown mb-6">
            Visit Our Store
          </h2>

          {/* Store Info */}
          <div className="bg-cream p-6 rounded-lg mb-6">
            <h3 className="font-semibold text-brown mb-4">Store Information</h3>
            <div className="space-y-2 text-brown">
              <p><strong>Address:</strong> 123 Western Avenue, Cowboy Town, TX 12345</p>
              <p><strong>Phone:</strong> (555) 123-4567</p>
              <p><strong>Email:</strong> hello@thehenhouse.com</p>
              <p><strong>Hours:</strong> Mon-Sat 10am-6pm, Sun Closed</p>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-tan p-6 rounded-lg mb-6">
            <h3 className="font-semibold text-brown mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-brown hover:text-rust transition-colors">
                Instagram
              </a>
              <a href="#" className="text-brown hover:text-rust transition-colors">
                Facebook
              </a>
              <a href="#" className="text-brown hover:text-rust transition-colors">
                Pinterest
              </a>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-sage p-6 rounded-lg">
            <h3 className="font-semibold text-brown mb-4">Location</h3>
            <div className="aspect-video bg-cream rounded-lg flex items-center justify-center">
              <p className="text-brown">Interactive Map</p>
              <p className="text-sm text-brown mt-2">Google Maps integration would go here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}