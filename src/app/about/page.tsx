export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-brown mb-4">
          About The Hen House
        </h1>
        <p className="text-xl text-brown">
          Your premier destination for western-style fashion and boutique clothing
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-serif font-bold text-brown mb-4">
            Our Story
          </h2>
          <p className="text-brown mb-4">
            Founded with a passion for western elegance, The Hen House brings you carefully curated
            collections that blend timeless western aesthetics with modern sophistication.
          </p>
          <p className="text-brown mb-4">
            We believe that fashion should tell a story - yours. Our pieces are designed for the
            confident woman who appreciates quality, craftsmanship, and that perfect western charm.
          </p>
          <p className="text-brown">
            From flowing dresses that dance in the breeze to statement jewelry that catches the light,
            every item in our collection is chosen with care to help you express your unique style.
          </p>
        </div>
        <div className="bg-tan p-8 rounded-lg">
          <h3 className="text-xl font-serif font-bold text-brown mb-4">
            Our Style Philosophy
          </h3>
          <ul className="space-y-3 text-brown">
            <li className="flex items-start">
              <span className="text-rust mr-2">•</span>
              Earth tone palettes that evoke the beauty of the western landscape
            </li>
            <li className="flex items-start">
              <span className="text-rust mr-2">•</span>
              High-quality materials that stand the test of time
            </li>
            <li className="flex items-start">
              <span className="text-rust mr-2">•</span>
              Versatile pieces that transition from ranch to city
            </li>
            <li className="flex items-start">
              <span className="text-rust mr-2">•</span>
              Attention to detail in every stitch and stone
            </li>
            <li className="flex items-start">
              <span className="text-rust mr-2">•</span>
              Sustainable practices and ethical sourcing
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-serif font-bold text-brown mb-6">
          Visit Our Boutique
        </h2>
        <p className="text-brown mb-8">
          Experience the full Hen House collection in person. Our boutique features
          a curated selection of western-inspired fashion, personalized styling advice,
          and that special touch that makes shopping memorable.
        </p>
        <div className="bg-cream p-6 rounded-lg inline-block">
          <p className="text-brown font-semibold">123 Western Avenue</p>
          <p className="text-brown">Cowboy Town, TX 12345</p>
          <p className="text-brown">Open Monday - Saturday: 10am - 6pm</p>
        </div>
      </div>
    </div>
  );
}