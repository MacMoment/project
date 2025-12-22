import { useState } from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

// Generate placeholder color based on product id
const getPlaceholderColor = (id: string) => {
  const colors = [
    'bg-purple-100',
    'bg-blue-100',
    'bg-green-100',
    'bg-orange-100',
    'bg-pink-100',
    'bg-indigo-100',
    'bg-teal-100',
    'bg-amber-100',
  ];
  const index = parseInt(id, 10) % colors.length;
  return colors[index];
};

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-200">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className={`absolute inset-0 ${getPlaceholderColor(product.id)} flex items-center justify-center`}>
          <span className="text-gray-400 text-4xl font-bold opacity-50">
            {product.name.substring(0, 2).toUpperCase()}
          </span>
        </div>
        {!imageError && (
          <img
            src={product.image}
            alt={product.name}
            className="relative w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        )}
        {/* Category Badge */}
        <span className="absolute top-3 left-3 px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-600 capitalize">
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-gray-600">{product.rating}</span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 line-clamp-2 mb-4">
          {product.description}
        </p>

        {/* Price & Action */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors"
          >
            <ShoppingCart size={14} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
