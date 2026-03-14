'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
  };
  quantity: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<{ items: CartItem[] }>({ items: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await fetch('/api/cart');
      
      if (!res.ok) {
        console.error('Failed to fetch cart');
        setCart({ items: [] });
        return;
      }
      
      const data = await res.json();
      setCart(data);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      const res = await fetch('/api/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity }),
      });
      
      if (!res.ok) {
        const error = await res.json();
        console.error('Failed to update cart:', error.error);
        return;
      }
      
      const data = await res.json();
      setCart(data);
    } catch (error) {
      console.error('Failed to update cart:', error);
    }
  };

  const removeItem = async (productId: string) => {
    try {
      const res = await fetch('/api/cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });
      
      if (!res.ok) {
        const error = await res.json();
        console.error('Failed to remove item:', error.error);
        return;
      }
      
      const data = await res.json();
      setCart(data);
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const total = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-serif font-bold text-brown text-center mb-12">
        Shopping Cart
      </h1>

      {cart.items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-brown mb-6">Your cart is empty</p>
          <Link
            href="/products"
            className="bg-rust text-cream px-8 py-3 rounded-md hover:bg-brown transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {cart.items.map((item) => (
              <div key={item.product._id} className="flex gap-4 p-4 border-b border-tan">
                <div className="relative w-24 h-24">
                  <Image
                    src={item.product.images[0] || '/placeholder.jpg'}
                    alt={item.product.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-brown">{item.product.name}</h3>
                  <p className="text-rust font-bold">${item.product.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => {
                        if (item.quantity > 1) {
                          updateQuantity(item.product._id, item.quantity - 1);
                        } else {
                          removeItem(item.product._id);
                        }
                      }}
                      className="p-1 border border-brown rounded hover:border-rust disabled:opacity-50"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-3 py-1 border border-brown rounded">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                      className="p-1 border border-brown rounded hover:border-rust"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => removeItem(item.product._id)}
                      className="p-1 text-rust hover:text-brown ml-4"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-cream p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-brown mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            <div className="border-t border-brown pt-4 mb-6">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="w-full bg-rust text-cream py-3 px-6 rounded-md hover:bg-brown transition-colors text-center block"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}