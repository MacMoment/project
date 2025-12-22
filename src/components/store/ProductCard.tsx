import { useState } from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

// Get gradient based on category
const getCategoryStyle = (category: string) => {
  const styles: Record<string, { bg: string; accent: string }> = {
    buildings: { bg: 'bg-gradient-to-br from-purple-50 to-purple-100', accent: 'text-purple-600' },
    landscapes: { bg: 'bg-gradient-to-br from-green-50 to-emerald-100', accent: 'text-emerald-600' },
    interiors: { bg: 'bg-gradient-to-br from-amber-50 to-orange-100', accent: 'text-orange-600' },
    vehicles: { bg: 'bg-gradient-to-br from-blue-50 to-indigo-100', accent: 'text-indigo-600' },
  };
  return styles[category] || { bg: 'bg-gradient-to-br from-gray-50 to-gray-100', accent: 'text-gray-600' };
};

// Get initials safely
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .filter(word => word.length > 0)
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const style = getCategoryStyle(product.category);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300">
      {/* Image Container */}
      <div className={`relative aspect-[4/3] ${style.bg}`}>
        {/* Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-20 h-20 rounded-2xl bg-white/80 flex items-center justify-center shadow-sm ${style.accent}`}>
            <span className="text-2xl font-bold">{getInitials(product.name)}</span>
          </div>
        </div>
        
        {/* Actual image if available */}
        {!imageError && (
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        )}

        {/* Category Badge */}
        <span className="absolute top-4 left-4 px-3 py-1.5 bg-white rounded-lg text-sm font-medium text-gray-700 capitalize shadow-sm">
          {product.category}
        </span>

        {/* Rating Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg shadow-sm">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-bold text-xl text-gray-900 mb-2">
          {product.name}
        </h3>
        <p className="text-gray-500 line-clamp-2 mb-6 leading-relaxed">
          {product.description}
        </p>

        {/* Price & Action */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 px-5 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
