import { NextRequest, NextResponse } from 'next/server';
import Product from '@/models/Product';
import dbConnect from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');
    const limit = searchParams.get('limit');

    let query: any = {};

    if (category) {
      query.category = category;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    let productQuery = Product.find(query).sort({ createdAt: -1 });

    if (limit) {
      const parsedLimit = parseInt(limit, 10);
      if (parsedLimit > 0) {
        productQuery = productQuery.limit(parsedLimit);
      }
    }

    const products = await productQuery.lean();

    // Add cache headers for better performance
    const response = NextResponse.json(products);
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');

    return response;
  } catch (error) {
    console.error('Get products error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    await dbConnect();
    const productData = await request.json();
    
    // Validate required fields
    if (!productData.name || !productData.price || !productData.description || !productData.images) {
      return NextResponse.json(
        { error: 'Name, price, description, and images are required' },
        { status: 400 }
      );
    }

    const product = await Product.create(productData);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}