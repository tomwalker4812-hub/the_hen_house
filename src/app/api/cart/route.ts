import { NextRequest, NextResponse } from 'next/server';
import Cart from '@/models/Cart';
import dbConnect from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Types } from 'mongoose';
import { logger } from '@/lib/logger';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const sessionId = request.cookies.get('sessionId')?.value;
    
    logger.logCartOperation('fetch', session?.user?.id, sessionId);
    
    await dbConnect();
    
    let cart;
    if (session?.user?.id) {
      cart = await Cart.findOne({ user: new Types.ObjectId(session.user.id) }).populate('items.product');
    } else if (sessionId) {
      cart = await Cart.findOne({ sessionId }).populate('items.product');
    }

    if (!cart) {
      return NextResponse.json({ items: [] });
    }

    const response = NextResponse.json(cart);
    // Set sessionId cookie for anonymous users if it doesn't exist
    if (!session?.user?.id && !request.cookies.get('sessionId')) {
      const sessionId = Math.random().toString(36).substring(2);
      response.cookies.set('sessionId', sessionId, { httpOnly: true, maxAge: 60 * 60 * 24 * 7 });
    }
    
    return response;
  } catch (error) {
    logger.trackApiError('GET', '/api/cart', error, 500);
    console.error('Cart GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const sessionId = request.cookies.get('sessionId')?.value;
  
  try {
    await dbConnect();
    const { productId, quantity = 1 } = await request.json();

    // Validate input
    if (!productId || !Types.ObjectId.isValid(productId)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    if (quantity <= 0) {
      return NextResponse.json({ error: 'Quantity must be greater than 0' }, { status: 400 });
    }

    logger.logCartOperation('add', session?.user?.id, sessionId);
    
    let cart;
    if (session?.user?.id) {
      cart = await Cart.findOne({ user: new Types.ObjectId(session.user.id) });
      if (!cart) {
        cart = await Cart.create({ user: new Types.ObjectId(session.user.id), items: [] });
      }
    } else {
      let sessionId = request.cookies.get('sessionId')?.value;
      if (!sessionId) {
        sessionId = Math.random().toString(36).substring(2);
      }
      cart = await Cart.findOne({ sessionId });
      if (!cart) {
        cart = await Cart.create({ sessionId, items: [] });
      }
    }

    const existingItem = cart.items.find(item => item.product.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    await cart.populate('items.product');

    const response = NextResponse.json(cart);
    if (!session?.user?.id) {
      response.cookies.set('sessionId', cart.sessionId, { httpOnly: true, maxAge: 60 * 60 * 24 * 7 });
    }

    return response;
  } catch (error) {
    logger.trackApiError('POST', '/api/cart', error, 500);
    console.error('Cart POST error:', error);
    return NextResponse.json({ error: 'Failed to add item to cart' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const sessionId = request.cookies.get('sessionId')?.value;
  
  try {
    await dbConnect();
    const { productId, quantity } = await request.json();

    // Validate input
    if (!productId || !Types.ObjectId.isValid(productId)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    if (typeof quantity !== 'number' || quantity < 0) {
      return NextResponse.json({ error: 'Quantity must be a non-negative number' }, { status: 400 });
    }

    logger.logCartOperation('update', session?.user?.id, sessionId);
    
    let cart;
    if (session?.user?.id) {
      cart = await Cart.findOne({ user: new Types.ObjectId(session.user.id) });
    } else {
      const sessionId = request.cookies.get('sessionId')?.value;
      cart = await Cart.findOne({ sessionId });
    }

    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    const item = cart.items.find(item => item.product.toString() === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        cart.items = cart.items.filter(item => item.product.toString() !== productId);
      }
      await cart.save();
      await cart.populate('items.product');
    } else {
      return NextResponse.json({ error: 'Product not found in cart' }, { status: 404 });
    }

    const response = NextResponse.json(cart);
    if (!session?.user?.id) {
      const sessionId = request.cookies.get('sessionId')?.value;
      if (sessionId) {
        response.cookies.set('sessionId', sessionId, { httpOnly: true, maxAge: 60 * 60 * 24 * 7 });
      }
    }
    
    return response;
  } catch (error) {
    logger.trackApiError('PUT', '/api/cart', error, 500);
    console.error('Cart PUT error:', error);
    return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const sessionId = request.cookies.get('sessionId')?.value;
  
  try {
    await dbConnect();
    const { productId } = await request.json();

    // Validate input
    if (!productId || !Types.ObjectId.isValid(productId)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    logger.logCartOperation('remove', session?.user?.id, sessionId);
    
    let cart;
    if (session?.user?.id) {
      cart = await Cart.findOne({ user: new Types.ObjectId(session.user.id) });
    } else {
      const sessionId = request.cookies.get('sessionId')?.value;
      cart = await Cart.findOne({ sessionId });
    }

    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();
    await cart.populate('items.product');

    const response = NextResponse.json(cart);
    if (!session?.user?.id) {
      const sessionId = request.cookies.get('sessionId')?.value;
      if (sessionId) {
        response.cookies.set('sessionId', sessionId, { httpOnly: true, maxAge: 60 * 60 * 24 * 7 });
      }
    }
    
    return response;
  } catch (error) {
    logger.trackApiError('DELETE', '/api/cart', error, 500);
    console.error('Cart DELETE error:', error);
    return NextResponse.json({ error: 'Failed to remove item from cart' }, { status: 500 });
  }
}