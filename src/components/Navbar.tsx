'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { data: session } = useSession();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-cream shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-serif font-bold text-brown">
              The Hen House
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-brown hover:text-rust transition-colors">
              Home
            </Link>
            <Link href="/products?category=new-arrivals" className="text-brown hover:text-rust transition-colors">
              New Arrivals
            </Link>
            <Link href="/products?category=dresses" className="text-brown hover:text-rust transition-colors">
              Dresses
            </Link>
            <Link href="/products?category=bottoms" className="text-brown hover:text-rust transition-colors">
              Bottoms
            </Link>
            <Link href="/products?category=shoes" className="text-brown hover:text-rust transition-colors">
              Shoes
            </Link>
            <Link href="/products?category=jewelry" className="text-brown hover:text-rust transition-colors">
              Jewelry
            </Link>
            <Link href="/products?category=hats-caps" className="text-brown hover:text-rust transition-colors">
              Hats & Caps
            </Link>
            <Link href="/products?category=sale" className="text-brown hover:text-rust transition-colors">
              Sale
            </Link>
            <Link href="/contact" className="text-brown hover:text-rust transition-colors">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/cart" className="text-brown hover:text-rust">
              <ShoppingCart className="h-6 w-6" />
            </Link>

            {session ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="text-brown hover:text-rust"
                  aria-label="User menu"
                >
                  <User className="h-6 w-6" />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Orders
                    </Link>
                    {session?.user?.role === 'admin' && (
                      <Link href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Admin
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        signOut();
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/auth/signin" className="text-brown hover:text-rust">
                <User className="h-6 w-6" />
              </Link>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-brown hover:text-rust"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/" className="block px-3 py-2 text-brown hover:text-rust">
                Home
              </Link>
              <Link href="/products?category=new-arrivals" className="block px-3 py-2 text-brown hover:text-rust">
                New Arrivals
              </Link>
              <Link href="/products?category=dresses" className="block px-3 py-2 text-brown hover:text-rust">
                Dresses
              </Link>
              <Link href="/products?category=bottoms" className="block px-3 py-2 text-brown hover:text-rust">
                Bottoms
              </Link>
              <Link href="/products?category=shoes" className="block px-3 py-2 text-brown hover:text-rust">
                Shoes
              </Link>
              <Link href="/products?category=jewelry" className="block px-3 py-2 text-brown hover:text-rust">
                Jewelry
              </Link>
              <Link href="/products?category=hats-caps" className="block px-3 py-2 text-brown hover:text-rust">
                Hats & Caps
              </Link>
              <Link href="/products?category=sale" className="block px-3 py-2 text-brown hover:text-rust">
                Sale
              </Link>
              <Link href="/contact" className="block px-3 py-2 text-brown hover:text-rust">
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;