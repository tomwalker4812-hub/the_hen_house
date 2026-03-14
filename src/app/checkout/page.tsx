'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  console.error('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable');
}

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

export default function CheckoutPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  useEffect(() => {
    if (!session) {
      router.push('/auth/signin');
      return;
    }
    fetchCart();
  }, [session, router]);

  const fetchCart = async () => {
    try {
      const res = await fetch('/api/cart');
      if (!res.ok) {
        throw new Error('Failed to fetch cart');
      }
      const data = await res.json();
      setCart(data || { items: [] });
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      setCart({ items: [] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripePromise) {
      alert('Payment system is not configured. Please contact support.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shippingAddress }),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.error || 'Failed to process checkout');
        setLoading(false);
        return;
      }

      const { clientSecret } = await res.json();

      const stripe = await stripePromise;
      if (stripe && clientSecret) {
        // For basic implementation, redirect to Stripe payment page
        // In production, you'd use Stripe Elements with confirmCardPayment
        const { error } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            type: 'card',
            card: {
              token: 'tok_visa' // Replace with actual card token from Elements
            },
            billing_details: {
              name: shippingAddress.name,
              email: shippingAddress.email,
            },
          },
        } as any);

        if (error) {
          alert(error.message || 'Payment failed');
        } else {
          router.push('/order-confirmation');
        }
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const total = cart.items.reduce((sum: number, item: any) => sum + item.product.price * item.quantity, 0);

  if (!session) {
    return <div>Please sign in to checkout</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-serif font-bold text-brown text-center mb-12">
        Checkout
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shipping Information */}
        <div>
          <h2 className="text-2xl font-semibold text-brown mb-6">Shipping Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brown mb-1">Full Name</label>
              <input
                type="text"
                required
                value={shippingAddress.name}
                onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                className="w-full px-3 py-2 border border-brown rounded-md focus:outline-none focus:ring-2 focus:ring-rust"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brown mb-1">Email</label>
              <input
                type="email"
                required
                value={shippingAddress.email}
                onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                className="w-full px-3 py-2 border border-brown rounded-md focus:outline-none focus:ring-2 focus:ring-rust"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brown mb-1">Address</label>
              <input
                type="text"
                required
                value={shippingAddress.address}
                onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                className="w-full px-3 py-2 border border-brown rounded-md focus:outline-none focus:ring-2 focus:ring-rust"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brown mb-1">City</label>
                <input
                  type="text"
                  required
                  value={shippingAddress.city}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                  className="w-full px-3 py-2 border border-brown rounded-md focus:outline-none focus:ring-2 focus:ring-rust"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brown mb-1">State</label>
                <input
                  type="text"
                  required
                  value={shippingAddress.state}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                  className="w-full px-3 py-2 border border-brown rounded-md focus:outline-none focus:ring-2 focus:ring-rust"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brown mb-1">ZIP Code</label>
                <input
                  type="text"
                  required
                  value={shippingAddress.zipCode}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                  className="w-full px-3 py-2 border border-brown rounded-md focus:outline-none focus:ring-2 focus:ring-rust"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brown mb-1">Country</label>
                <input
                  type="text"
                  required
                  value={shippingAddress.country}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                  className="w-full px-3 py-2 border border-brown rounded-md focus:outline-none focus:ring-2 focus:ring-rust"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary & Payment */}
        <div>
          <h2 className="text-2xl font-semibold text-brown mb-6">Order Summary</h2>
          <div className="bg-cream p-4 rounded-lg mb-6">
            {cart.items.map((item: any) => (
              <div key={item.product._id} className="flex justify-between mb-2">
                <span>{item.product.name} x {item.quantity}</span>
                <span>${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-brown mt-4 pt-4">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-brown mb-2">Payment Information</label>
            <div className="border border-brown rounded-md p-3">
              {/* Stripe Card Element would go here */}
              <div className="text-sm text-brown">Stripe payment form will be rendered here</div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rust text-cream py-3 px-6 rounded-md hover:bg-brown transition-colors disabled:opacity-50"
          >
            {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
          </button>
        </div>
      </form>
    </div>
  );
}