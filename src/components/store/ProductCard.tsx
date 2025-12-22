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
    buildings: { bg: 'bg-gradient-to-br from-purple-100 to-purple-200', accent: 'text-purple-600' },
    landscapes: { bg: 'bg-gradient-to-br from-green-100 to-emerald-200', accent: 'text-emerald-600' },
    interiors: { bg: 'bg-gradient-to-br from-amber-100 to-orange-200', accent: 'text-orange-600' },
    vehicles: { bg: 'bg-gradient-to-br from-blue-100 to-indigo-200', accent: 'text-indigo-600' },
  };
  return styles[category] || { bg: 'bg-gradient-to-br from-gray-100 to-gray-200', accent: 'text-gray-600' };
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
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all duration-300">
      {/* Image Container */}
      <div className={`relative aspect-[4/3] ${style.bg} overflow-hidden`}>
        {/* Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-16 h-16 rounded-xl bg-white/60 backdrop-blur-sm flex items-center justify-center ${style.accent}`}>
            <span className="text-xl font-bold">{getInitials(product.name)}</span>
          </div>
        </div>
        
        {/* Actual image if available */}
        {!imageError && (
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
        )}

        {/* Category Badge */}
        <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-medium text-gray-700 capitalize">
          {product.category}
        </span>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-lg">
          <Star size={12} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 mb-1.5 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">
          {product.description}
        </p>

        {/* Price & Action */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-purple-600 text-white text-sm font-medium rounded-xl hover:bg-purple-700 transition-colors"
          >
            <ShoppingCart size={16} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
