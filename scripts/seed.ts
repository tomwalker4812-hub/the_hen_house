import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/the-hen-house';

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  images: [String],
  category: {
    type: String,
    enum: ['dresses', 'bottoms', 'shoes', 'jewelry', 'hats-caps', 'sale'],
  },
  sizes: [String],
  stock: Number,
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', productSchema);

const products = [
  // DRESSES (10 products)
  {
    name: "Western Floral Maxi Dress",
    description: "Elegant floral print maxi dress perfect for summer events.",
    price: 89.99,
    images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop"],
    category: "dresses",
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 15,
    featured: true
  },
  {
    name: "Denim Button-Up Dress",
    description: "Classic denim dress with western-style buttons.",
    price: 79.99,
    images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop"],
    category: "dresses",
    sizes: ["S", "M", "L", "XL"],
    stock: 12,
    featured: false
  },
  {
    name: "Lace Boho Dress",
    description: "Romantic lace dress with bohemian flair.",
    price: 95.99,
    images: ["https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=600&fit=crop"],
    category: "dresses",
    sizes: ["XS", "S", "M", "L"],
    stock: 8,
    featured: true
  },
  {
    name: "Red Plaid Shirt Dress",
    description: "Bold red plaid shirt dress with western styling.",
    price: 69.99,
    images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=600&fit=crop"],
    category: "dresses",
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 20,
    featured: false
  },
  {
    name: "Embroidered Western Dress",
    description: "Beautifully embroidered dress with western motifs.",
    price: 129.99,
    images: ["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=600&fit=crop"],
    category: "dresses",
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 6,
    featured: true
  },
  {
    name: "Black Midi Dress",
    description: "Sophisticated black midi dress with western details.",
    price: 84.99,
    images: ["https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=600&fit=crop"],
    category: "dresses",
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 14,
    featured: false
  },
  {
    name: "White Cotton Sundress",
    description: "Light and airy white cotton sundress.",
    price: 59.99,
    images: ["https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=600&fit=crop"],
    category: "dresses",
    sizes: ["S", "M", "L", "XL"],
    stock: 18,
    featured: false
  },
  {
    name: "Turquoise Print Dress",
    description: "Vibrant turquoise print dress with western styling.",
    price: 99.99,
    images: ["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=600&fit=crop"],
    category: "dresses",
    sizes: ["XS", "S", "M", "L"],
    stock: 10,
    featured: true
  },
  {
    name: "Velvet Evening Dress",
    description: "Luxurious velvet dress for special occasions.",
    price: 149.99,
    images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop"],
    category: "dresses",
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 7,
    featured: false
  },
  {
    name: "Chambray Wrap Dress",
    description: "Comfortable chambray wrap dress.",
    price: 74.99,
    images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=600&fit=crop"],
    category: "dresses",
    sizes: ["S", "M", "L", "XL"],
    stock: 16,
    featured: false
  },

  // BOTTOMS (8 products)
  {
    name: "High-Waisted Jeans",
    description: "Classic high-waisted jeans with western styling.",
    price: 89.99,
    images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop"],
    category: "bottoms",
    sizes: ["24", "25", "26", "27", "28"],
    stock: 20,
    featured: true
  },
  {
    name: "Leather Pants",
    description: "Premium leather pants with western detailing.",
    price: 149.99,
    images: ["https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=600&fit=crop"],
    category: "bottoms",
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 8,
    featured: false
  },
  {
    name: "Denim Skirt",
    description: "Flattering denim skirt with western stitching.",
    price: 69.99,
    images: ["https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=500&h=600&fit=crop"],
    category: "bottoms",
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 15,
    featured: true
  },
  {
    name: "Corduroy Pants",
    description: "Soft corduroy pants in western cut.",
    price: 79.99,
    images: ["https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=600&fit=crop"],
    category: "bottoms",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 18,
    featured: false
  },
  {
    name: "Fringe Shorts",
    description: "Edgy fringe shorts with western detailing.",
    price: 59.99,
    images: ["https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=600&fit=crop"],
    category: "bottoms",
    sizes: ["XS", "S", "M", "L"],
    stock: 12,
    featured: false
  },
  {
    name: "Embroidered Jeans",
    description: "Beautifully embroidered jeans with western motifs.",
    price: 109.99,
    images: ["https://images.unsplash.com/photo-1604176354204-9268737828e4?w=500&h=600&fit=crop"],
    category: "bottoms",
    sizes: ["24", "25", "26", "27", "28"],
    stock: 10,
    featured: true
  },
  {
    name: "Canvas Work Pants",
    description: "Artisan canvas work pants with detailing.",
    price: 94.99,
    images: ["https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=600&fit=crop"],
    category: "bottoms",
    sizes: ["S", "M", "L", "XL"],
    stock: 7,
    featured: false
  },
  {
    name: "Distressed Denim",
    description: "Fashionably distressed denim jeans.",
    price: 84.99,
    images: ["https://images.unsplash.com/photo-1604176354204-9268737828e4?w=500&h=600&fit=crop"],
    category: "bottoms",
    sizes: ["24", "25", "26", "27", "28"],
    stock: 16,
    featured: false
  },

  // SHOES (8 products)
  {
    name: "Cowboy Boots",
    description: "Classic cowboy boots crafted from premium leather.",
    price: 199.99,
    images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop"],
    category: "shoes",
    sizes: ["6", "7", "8", "9", "10"],
    stock: 12,
    featured: true
  },
  {
    name: "Western Ankle Boots",
    description: "Stylish ankle boots with western detailing.",
    price: 149.99,
    images: ["https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=500&h=600&fit=crop"],
    category: "shoes",
    sizes: ["5", "6", "7", "8", "9", "10"],
    stock: 15,
    featured: false
  },
  {
    name: "Embroidered Boots",
    description: "Beautifully embroidered boots with patterns.",
    price: 249.99,
    images: ["https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500&h=600&fit=crop"],
    category: "shoes",
    sizes: ["6", "7", "8", "9", "10"],
    stock: 8,
    featured: true
  },
  {
    name: "Riding Boots",
    description: "Functional riding boots with western styling.",
    price: 179.99,
    images: ["https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&h=600&fit=crop"],
    category: "shoes",
    sizes: ["5", "6", "7", "8", "9", "10", "11", "12"],
    stock: 10,
    featured: false
  },
  {
    name: "Fringe Boots",
    description: "Edgy boots with fringe detailing.",
    price: 189.99,
    images: ["https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&h=600&fit=crop"],
    category: "shoes",
    sizes: ["6", "7", "8", "9", "10", "11"],
    stock: 9,
    featured: true
  },
  {
    name: "Suede Boots",
    description: "Soft suede boots with western cut.",
    price: 159.99,
    images: ["https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=500&h=600&fit=crop"],
    category: "shoes",
    sizes: ["5", "6", "7", "8", "9", "10"],
    stock: 14,
    featured: false
  },
  {
    name: "Canvas Shoes",
    description: "Lightweight canvas shoes with western design.",
    price: 79.99,
    images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop"],
    category: "shoes",
    sizes: ["5", "6", "7", "8", "9", "10", "11"],
    stock: 20,
    featured: false
  },
  {
    name: "Work Boots",
    description: "Durable work boots with western styling.",
    price: 169.99,
    images: ["https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&h=600&fit=crop"],
    category: "shoes",
    sizes: ["7", "8", "9", "10", "11", "12", "13"],
    stock: 16,
    featured: false
  },

  // JEWELRY (8 products)
  {
    name: "Silver Turquoise Necklace",
    description: "Beautiful sterling silver necklace with turquoise stones.",
    price: 89.99,
    images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=600&fit=crop"],
    category: "jewelry",
    sizes: ["One Size"],
    stock: 12,
    featured: true
  },
  {
    name: "Pearl Earrings",
    description: "Elegant pearl stud earrings with silver settings.",
    price: 49.99,
    images: ["https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=500&h=600&fit=crop"],
    category: "jewelry",
    sizes: ["One Size"],
    stock: 20,
    featured: false
  },
  {
    name: "Concho Belt",
    description: "Authentic concho belt with intricate silver work.",
    price: 149.99,
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop"],
    category: "jewelry",
    sizes: ["S", "M", "L", "XL"],
    stock: 8,
    featured: true
  },
  {
    name: "Crystal Bracelet",
    description: "Sparkling crystal bracelet with western design.",
    price: 39.99,
    images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=600&fit=crop"],
    category: "jewelry",
    sizes: ["One Size"],
    stock: 25,
    featured: false
  },
  {
    name: "Beaded Necklace",
    description: "Hand-beaded necklace with traditional patterns.",
    price: 69.99,
    images: ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=600&fit=crop"],
    category: "jewelry",
    sizes: ["One Size"],
    stock: 15,
    featured: true
  },
  {
    name: "Silver Ring",
    description: "Sterling silver ring with turquoise inlay.",
    price: 59.99,
    images: ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=600&fit=crop"],
    category: "jewelry",
    sizes: ["6", "7", "8", "9"],
    stock: 18,
    featured: false
  },
  {
    name: "Feather Earrings",
    description: "Delicate feather earrings with silver accents.",
    price: 34.99,
    images: ["https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=500&h=600&fit=crop"],
    category: "jewelry",
    sizes: ["One Size"],
    stock: 22,
    featured: false
  },
  {
    name: "Navajo Inspired Pendant",
    description: "Pendant inspired by Navajo design with silver and stones.",
    price: 79.99,
    images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=600&fit=crop"],
    category: "jewelry",
    sizes: ["One Size"],
    stock: 10,
    featured: true
  },

  // HATS & CAPS (8 products)
  {
    name: "Cowboy Hat",
    description: "Classic cowboy hat made from premium felt.",
    price: 149.99,
    images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop"],
    category: "hats-caps",
    sizes: ["S", "M", "L", "XL"],
    stock: 10,
    featured: true
  },
  {
    name: "Straw Western Hat",
    description: "Lightweight straw hat perfect for summer.",
    price: 79.99,
    images: ["https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=600&fit=crop"],
    category: "hats-caps",
    sizes: ["S", "M", "L", "XL"],
    stock: 15,
    featured: false
  },
  {
    name: "Embroidered Cap",
    description: "Baseball cap with western embroidery.",
    price: 39.99,
    images: ["https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500&h=600&fit=crop"],
    category: "hats-caps",
    sizes: ["One Size"],
    stock: 25,
    featured: false
  },
  {
    name: "Felt Fedora",
    description: "Elegant felt fedora with western detailing.",
    price: 119.99,
    images: ["https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=600&fit=crop"],
    category: "hats-caps",
    sizes: ["S", "M", "L"],
    stock: 12,
    featured: true
  },
  {
    name: "Leather Cowboy Hat",
    description: "Premium leather cowboy hat.",
    price: 189.99,
    images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop"],
    category: "hats-caps",
    sizes: ["S", "M", "L", "XL"],
    stock: 8,
    featured: false
  },
  {
    name: "Sun Hat",
    description: "Wide-brimmed sun hat with western styling.",
    price: 59.99,
    images: ["https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=600&fit=crop"],
    category: "hats-caps",
    sizes: ["S", "M", "L"],
    stock: 18,
    featured: false
  },
  {
    name: "Canvas Work Hat",
    description: "Durable canvas work hat with western shape.",
    price: 49.99,
    images: ["https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500&h=600&fit=crop"],
    category: "hats-caps",
    sizes: ["S", "M", "L", "XL"],
    stock: 20,
    featured: false
  },
  {
    name: "Trucker Hat",
    description: "Mesh trucker hat with western-themed embroidery.",
    price: 29.99,
    images: ["https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500&h=600&fit=crop"],
    category: "hats-caps",
    sizes: ["One Size"],
    stock: 30,
    featured: false
  },

  // SALE ITEMS (10 products)
  {
    name: "Discount Western Maxi Dress",
    description: "Beautiful floral maxi dress now at special price.",
    price: 59.99,
    images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop"],
    category: "sale",
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 8,
    featured: true
  },
  {
    name: "Sale Denim Jeans",
    description: "Classic high-waisted jeans at 30% off.",
    price: 62.99,
    images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop"],
    category: "sale",
    sizes: ["24", "25", "26", "27", "28"],
    stock: 12,
    featured: false
  },
  {
    name: "Clearance Cowboy Boots",
    description: "Authentic cowboy boots at clearance price.",
    price: 129.99,
    images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop"],
    category: "sale",
    sizes: ["6", "7", "8", "9", "10"],
    stock: 6,
    featured: true
  },
  {
    name: "Discount Turquoise Necklace",
    description: "Sterling silver turquoise necklace at special pricing.",
    price: 49.99,
    images: ["https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=600&fit=crop"],
    category: "sale",
    sizes: ["One Size"],
    stock: 10,
    featured: false
  },
  {
    name: "Sale Straw Hat",
    description: "Lightweight straw western hat now on sale.",
    price: 39.99,
    images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop"],
    category: "sale",
    sizes: ["S", "M", "L", "XL"],
    stock: 15,
    featured: false
  },
  {
    name: "Clearance Embroidered Shirt",
    description: "Beautifully embroidered western shirt at clearance.",
    price: 44.99,
    images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop"],
    category: "sale",
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 9,
    featured: true
  },
  {
    name: "Discount Leather Belt",
    description: "Genuine leather western belt at sale price.",
    price: 34.99,
    images: ["https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=600&fit=crop"],
    category: "sale",
    sizes: ["S", "M", "L", "XL"],
    stock: 18,
    featured: false
  },
  {
    name: "Sale Suede Jacket",
    description: "Soft suede western jacket now on clearance.",
    price: 89.99,
    images: ["https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=600&fit=crop"],
    category: "sale",
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 7,
    featured: true
  },
  {
    name: "Clearance Pearl Earrings",
    description: "Elegant pearl stud earrings at special pricing.",
    price: 19.99,
    images: ["https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=600&fit=crop"],
    category: "sale",
    sizes: ["One Size"],
    stock: 25,
    featured: false
  },
  {
    name: "Discount Canvas Pants",
    description: "Comfortable canvas work pants at affordable price.",
    price: 29.99,
    images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop"],
    category: "sale",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 20,
    featured: false
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to database');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    const insertedProducts = await Product.insertMany(products);
    console.log(`Successfully seeded ${insertedProducts.length} products`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();