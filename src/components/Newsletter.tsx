'use client';

import { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <div className="bg-sage py-12">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-serif font-bold text-brown mb-4">
          Stay in the Loop
        </h2>
        <p className="text-brown mb-8">
          Get the latest updates on new arrivals, exclusive offers, and western fashion trends.
        </p>

        {isSubscribed ? (
          <div className="text-brown font-semibold">
            Thank you for subscribing! Check your email for confirmation.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-l-md border-0 focus:ring-2 focus:ring-brown"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-brown text-cream rounded-r-md hover:bg-rust transition-colors font-semibold"
              >
                Subscribe
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Newsletter;