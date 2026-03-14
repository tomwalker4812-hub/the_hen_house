'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
    category: string;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-64 bg-gray-100">
        {imageLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-brown border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <Image
          src={imageError ? '/placeholder.svg' : (product.images[0] || '/placeholder.svg')}
          alt={product.name}
          fill
          className={`object-cover transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setImageLoading(false)}
          onError={() => {
            setImageError(true);
            setImageLoading(false);
          }}
          priority={false}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-brown mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-rust font-bold mb-3 text-lg">${product.price.toFixed(2)}</p>
        <div className="flex justify-between items-center">
          <Link
            href={`/products/${product._id}`}
            className="text-sm text-brown hover:text-rust transition-colors font-medium"
          >
            View Details
          </Link>
          <button className="bg-rust text-cream px-3 py-2 rounded-md hover:bg-brown transition-all duration-200 flex items-center gap-1 font-medium shadow-sm hover:shadow-md">
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;