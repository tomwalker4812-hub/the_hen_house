const HeroSection = () => {
  return (
    <div className="relative h-96 bg-gradient-to-r from-tan to-cream">
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-brown">
          <h1 className="text-5xl font-serif font-bold mb-4">
            Welcome to The Hen House
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover elegant western-style fashion and boutique clothing for the modern woman.
          </p>
          <a
            href="/products"
            className="inline-block bg-rust text-cream px-8 py-3 rounded-md hover:bg-brown transition-colors font-semibold"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;