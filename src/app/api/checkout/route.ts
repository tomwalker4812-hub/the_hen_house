import { NextRequest, NextResponse } from 'next/server';
import stripe from '@/lib/stripe';
import Order from '@/models/Order';
import Cart from '@/models/Cart';
import dbConnect from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Types } from 'mongoose';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  try {
    await dbConnect();

    if (!session?.user?.id) {
      logger.warn('Unauthorized checkout attempt', { userId: undefined });
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { shippingAddress } = await request.json();

    // Validate shipping address
    if (!shippingAddress || !shippingAddress.address || !shippingAddress.city) {
      return NextResponse.json({ error: 'Valid shipping address is required' }, { status: 400 });
    }

    // Get user's cart
    const cart = await Cart.findOne({ user: new Types.ObjectId(session.user.id) }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Calculate total
    const total = cart.items.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);

    if (total <= 0) {
      return NextResponse.json({ error: 'Invalid cart total' }, { status: 400 });
    }

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        userId: session.user.id,
      },
    });

    if (!paymentIntent) {
      throw new Error('Failed to create payment intent');
    }

    // Create order
    const order = await Order.create({
      user: new Types.ObjectId(session.user.id),
      items: cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      total,
      shippingAddress,
      paymentIntentId: paymentIntent.id,
    });

    // Clear cart
    cart.items = [];
    await cart.save();

    logger.logPaymentEvent('intent_created', order._id.toString(), total * 100);

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      orderId: order._id,
    });
  } catch (error) {
    logger.trackApiError('POST', '/api/checkout', error, 500, { userId: session?.user?.id });
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}