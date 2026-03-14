import { NextRequest, NextResponse } from 'next/server';
import stripe from '@/lib/stripe';
import Order from '@/models/Order';
import dbConnect from '@/lib/mongodb';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const sig = request.headers.get('stripe-signature');
    const body = await request.text();

    if (!sig) {
      return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.error('Missing STRIPE_WEBHOOK_SECRET environment variable');
      return NextResponse.json({ error: 'Webhook configuration error' }, { status: 500 });
    }

    let event;

    try {
      event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
    }

    await dbConnect();

    // Handle different webhook events
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      const order = await Order.findOne({ paymentIntentId: paymentIntent.id });

      if (order) {
        order.status = 'paid';
        await order.save();
        logger.logPaymentEvent('succeeded', order._id.toString(), paymentIntent.amount);
      }
    } else if (event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object;
      const order = await Order.findOne({ paymentIntentId: paymentIntent.id });

      if (order) {
        logger.logPaymentEvent('failed', order._id.toString(), paymentIntent.amount);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}