import { NextRequest, NextResponse } from 'next/server';
import Product from '@/models/Product';
import dbConnect from '@/lib/mongodb';

const products = [
  // DRESSES (20 products)
  {
    name: "Western Floral Maxi Dress",
    description: "Elegant floral print maxi dress perfect for summer events. Features a fitted bodice and flowing skirt with western-inspired details.",
    price: 89.99,
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=600&fit=crop"
    ],
    category: "dresses",
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 15,
    featured: true
  },
  {
    name: "Denim Button-Up Dress",
    description: "Classic denim dress with western-style buttons and a flattering A-line silhouette. Perfect for casual outings.",
    price: 79.99,
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a6aaaa?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=600&fit=crop"
    ],
    category: "dresses",
    sizes: ["S", "M", "L", "XL"],
    stock: 12,
    featured: false
  },
  {
    name: "Lace Boho Dress",
    description: "Romantic lace dress with bohemian flair. Features delicate lace detailing and a comfortable fit.",
    price: 95.99,
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=600&fit=crop"
    ],
    category: "dresses",
    sizes: ["XS", "S", "M", "L"],
    stock: 8,
    featured: true
  },
  {
    name: "Red Plaid Shirt Dress",
    description: "Bold red plaid shirt dress with western styling. Versatile piece that can be dressed up or down.",
    price: 69.99,
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a6aaaa?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=600&fit=crop"
    ],
    category: "dresses",
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 20,
    featured: false
  },
  {
    name: "Embroidered Western Dress",
    description: "Beautifully embroidered dress with traditional western motifs. A statement piece for any occasion.",
    price: 129.99,
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=600&fit=crop"
    ],
    category: "dresses",
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 6,
    featured: true
  },
  {
    name: "Black Midi Dress",
    description: "Sophisticated black midi dress with western-inspired details. Perfect for evening events.",
    price: 84.99,
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a6aaaa?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=600&fit=crop"
    ],
    category: "dresses",
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 14,
    featured: false
  },
  {
    name: "White Cotton Sundress",
    description: "Light and airy white cotton sundress perfect for warm weather. Features delicate embroidery.",
    price: 59.99,
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=600&fit=crop"
    ],
    category: "dresses",
    sizes: ["S", "M", "L", "XL"],
    stock: 18,
    featured: false
  },
  {
    name: "Turquoise Print Dress",
    description: "Vibrant turquoise print dress with western styling. A bold choice for fashion-forward looks.",
    price: 99.99,
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a6aaaa?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=600&fit=crop"
    ],
    category: "dresses",
    sizes: ["XS", "S", "M", "L"],
    stock: 10,
    featured: true
  },
  {
    name: "Velvet Evening Dress",
    description: "Luxurious velvet dress for special occasions. Features elegant western-inspired details.",
    price: 149.99,
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=600&fit=crop"
    ],
    category: "dresses",
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 7,
    featured: false
  },
  {
    name: "Chambray Wrap Dress",
    description: "Comfortable chambray wrap dress with a flattering fit. Easy to wear and versatile.",
    price: 74.99,
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a6aaaa?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=600&fit=crop"
    ],
    category: "dresses",
    sizes: ["S", "M", "L", "XL"],
    stock: 16,
    featured: false
  },
  {
    name: "Striped Maxi Dress",
    description: "Classic striped maxi dress with western flair. Perfect for beach days or casual outings.",
    price: 79.99,
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=600&fit=crop"
    ],
    category: "dresses",
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 13,
    featured: false
  },
  {
    name: "Leather Trim Dress",
    description: "Edgy dress with leather trim details. A modern take on western fashion.",
    price: 109.99,
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a6aaaa?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=600&fit=crop"
    ],
    category: "dresses",
    sizes: ["XS", "S", "M", "L"],
    stock: 9,
    featured: true
  },
  {
    name: "Polka Dot Swing Dress",
    description: "Fun polka dot swing dress with a retro western vibe. Perfect for dancing or parties.",
    price: 89.99,
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=600&fit=crop"
    ],
    category: "dresses",
    sizes: ["S", "M", "L", "XL"],
    stock: 11,
    featured: false
  },
  {
    name: "Denim Jacket Dress",
    description: "Stylish denim jacket dress hybrid. Combines the comfort of denim with dress elegance.",
    price: 94.99,
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a6aaaa?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=600&fit=crop"
    ],
    category: "dresses",
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 15,
    featured: false
  },
  {
    name: "Pearl Button Dress",
    description: "Elegant dress with pearl buttons and western detailing. A timeless classic.",
    price: 119.99,
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=600&fit=crop"
    ],
    category: "dresses",
    sizes: ["XS", "S", "M", "L"],
    stock: 8,
    featured: true
  },
  {
    name: "Fringe Hem Dress",
    description: "Dramatic dress with fringe hem detailing. Makes a bold fashion statement.",
    price: 134.99,
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a6aaaa?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=600&fit=crop"
    ],
    category: "dresses",
    sizes: ["S", "M", "L", "XL"],
    stock: 6,
    featured: false
  },
  {
    name: "Cotton Poplin Dress",
    description: "Lightweight cotton poplin dress perfect for everyday wear. Comfortable and stylish.",
    price: 64.99,
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=600&fit=crop"
    ],
    category: "dresses",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 22,
    featured: false
  },
  {
    name: "Metallic Thread Dress",
    description: "Glamorous dress with metallic thread embroidery. Perfect for special occasions.",
    price: 159.99,
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a6aaaa?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=600&fit=crop"
    ],
    category: "dresses",
    sizes: ["XS", "S", "M", "L"],
    stock: 5,
    featured: true
  },
  {
    name: "Tulle Skirt Dress",
    description: "Romantic dress with tulle skirt overlay. A feminine take on western fashion.",
    price: 124.99,
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=600&fit=crop"
    ],
    category: "dresses",
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 9,
    featured: false
  },
  {
    name: "Canvas Work Dress",
    description: "Artisan canvas work dress with intricate detailing. A unique handcrafted piece.",
    price: 139.99,
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a6aaaa?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=600&fit=crop"
    ],
    category: "dresses",
    sizes: ["S", "M", "L"],
    stock: 4,
    featured: true
  },

  // BOTTOMS (15 products)
  {
    name: "High-Waisted Jeans",
    description: "Classic high-waisted jeans with western styling. Comfortable fit with authentic denim quality.",
    price: 89.99,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=600&fit=crop"
    ],
    category: "bottoms",
    sizes: ["24", "25", "26", "27", "28", "29", "30", "31", "32"],
    stock: 20,
    featured: true
  },
  {
    name: "Leather Pants",
    description: "Premium leather pants with western detailing. A bold statement piece for any wardrobe.",
    price: 149.99,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=600&fit=crop"
    ],
    category: "bottoms",
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 8,
    featured: false
  },
  {
    name: "Denim Skirt",
    description: "Flattering denim skirt with western-inspired stitching. Versatile piece for any occasion.",
    price: 69.99,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=600&fit=crop"
    ],
    category: "bottoms",
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 15,
    featured: true
  },
  {
    name: "Corduroy Pants",
    description: "Soft corduroy pants in classic western cut. Comfortable and stylish for cooler weather.",
    price: 79.99,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=600&fit=crop"
    ],
    category: "bottoms",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 18,
    featured: false
  },
  {
    name: "Fringe Shorts",
    description: "Edgy fringe shorts with western detailing. Perfect for summer fashion statements.",
    price: 59.99,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=600&fit=crop"
    ],
    category: "bottoms",
    sizes: ["XS", "S", "M", "L"],
    stock: 12,
    featured: false
  },
  {
    name: "Embroidered Jeans",
    description: "Beautifully embroidered jeans with western motifs. A unique piece for your collection.",
    price: 109.99,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=600&fit=crop"
    ],
    category: "bottoms",
    sizes: ["24", "25", "26", "27", "28", "29", "30"],
    stock: 10,
    featured: true
  },
  {
    name: "Canvas Work Pants",
    description: "Artisan canvas work pants with intricate detailing. Handcrafted with care.",
    price: 94.99,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=600&fit=crop"
    ],
    category: "bottoms",
    sizes: ["S", "M", "L", "XL"],
    stock: 7,
    featured: false
  },
  {
    name: "Distressed Denim",
    description: "Fashionably distressed denim jeans with western styling. A modern classic.",
    price: 84.99,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=600&fit=crop"
    ],
    category: "bottoms",
    sizes: ["24", "25", "26", "27", "28", "29", "30", "31", "32"],
    stock: 16,
    featured: false
  },
  {
    name: "Suede Pants",
    description: "Luxurious suede pants with western cut. Soft texture and elegant design.",
    price: 129.99,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=600&fit=crop"
    ],
    category: "bottoms",
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 9,
    featured: true
  },
  {
    name: "Wide Leg Trousers",
    description: "Wide leg trousers with western-inspired details. Comfortable and flattering fit.",
    price: 74.99,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=600&fit=crop"
    ],
    category: "bottoms",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 14,
    featured: false
  },
  {
    name: "Pearl Snap Jeans",
    description: "Jeans with pearl snap detailing. Authentic western style with modern comfort.",
    price: 99.99,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=600&fit=crop"
    ],
    category: "bottoms",
    sizes: ["24", "25", "26", "27", "28", "29", "30"],
    stock: 11,
    featured: false
  },
  {
    name: "Linen Culottes",
    description: "Breathable linen culottes perfect for warm weather. Light and comfortable.",
    price: 64.99,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=600&fit=crop"
    ],
    category: "bottoms",
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 13,
    featured: false
  },
  {
    name: "Metallic Leather Pants",
    description: "Glamorous metallic leather pants. A statement piece for evening wear.",
    price: 169.99,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=600&fit=crop"
    ],
    category: "bottoms",
    sizes: ["XS", "S", "M", "L"],
    stock: 6,
    featured: true
  },
  {
    name: "Chambray Shorts",
    description: "Classic chambray shorts with western styling. Perfect for casual summer days.",
    price: 49.99,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=600&fit=crop"
    ],
    category: "bottoms",
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 19,
    featured: false
  },
  {
    name: "Embellished Denim",
    description: "Denim with crystal embellishments. A glamorous take on western wear.",
    price: 119.99,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=600&fit=crop"
    ],
    category: "bottoms",
    sizes: ["24", "25", "26", "27", "28", "29", "30"],
    stock: 8,
    featured: true
  }
];

export async function GET() {
  try {
    await dbConnect();

    // Clear existing products
    await Product.deleteMany({});

    // Insert new products
    const insertedProducts = await Product.insertMany(products);

    return NextResponse.json({
      message: `Successfully seeded ${insertedProducts.length} products`,
      products: insertedProducts.length
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
  }
}