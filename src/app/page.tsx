import HeroSection from '@/components/HeroSection';
import Newsletter from '@/components/Newsletter';
import ProductCard from '@/components/ProductCard';
import Product from '@/models/Product';
import dbConnect from '@/lib/mongodb';
import Link from 'next/link';

async function getFeaturedProducts() {
  try {
    await dbConnect();
    const products = await Product.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(4)
      .lean();
    return products;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

async function getNewArrivals() {
  try {
    await dbConnect();
    const products = await Product.find({})
      .sort({ createdAt: -1 })
      .limit(4)
      .lean();
    return products;
  } catch (error) {
    console.error('Error fetching new arrivals:', error);
    return [];
  }
}

export default async function HomePage() {
  const [featuredProducts, newArrivals] = await Promise.all([
    getFeaturedProducts(),
    getNewArrivals()
  ]);

  return (
    <div>
      <HeroSection />

      {/* Featured Products */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-brown text-center mb-12">
            Featured Collection
          </h2>
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product._id.toString()}
                  product={{
                    ...product,
                    _id: product._id.toString()
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-brown">
              <p>No featured products available yet.</p>
              <p className="text-sm mt-2">Check back soon for our latest collection!</p>
            </div>
          )}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-brown text-center mb-12">
            New Arrivals
          </h2>
          {newArrivals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {newArrivals.map((product) => (
                <ProductCard
                  key={product._id.toString()}
                  product={{
                    ...product,
                    _id: product._id.toString()
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-brown">
              <p>No new arrivals available yet.</p>
              <p className="text-sm mt-2">New items coming soon!</p>
            </div>
          )}
          <div className="text-center mt-8">
            <Link
              href="/products"
              className="inline-block bg-rust text-cream px-8 py-3 rounded-md hover:bg-brown transition-colors font-semibold"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-tan">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-brown text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Dresses', href: '/products?category=dresses', color: 'bg-rust' },
              { name: 'Bottoms', href: '/products?category=bottoms', color: 'bg-brown' },
              { name: 'Shoes', href: '/products?category=shoes', color: 'bg-sage' },
              { name: 'Jewelry', href: '/products?category=jewelry', color: 'bg-rust' },
              { name: 'Hats & Caps', href: '/products?category=hats-caps', color: 'bg-brown' },
              { name: 'Sale', href: '/products?category=sale', color: 'bg-sage' },
            ].map((category) => (
              <a
                key={category.name}
                href={category.href}
                className={`${category.color} text-cream p-6 rounded-lg text-center hover:opacity-90 transition-opacity`}
              >
                <h3 className="font-semibold">{category.name}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Gallery Placeholder */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-brown text-center mb-12">
            Follow Us on Instagram
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-square bg-tan rounded-lg flex items-center justify-center">
                <span className="text-brown">Instagram Image {i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}