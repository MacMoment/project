import { useState } from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

// Get a color based on category
const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    buildings: 'bg-purple-100',
    landscapes: 'bg-green-100',
    interiors: 'bg-orange-100',
    vehicles: 'bg-blue-100',
  };
  return colors[category] || 'bg-gray-100';
};

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-purple-200 hover:shadow-md transition-all">
      {/* Image Container */}
      <div className={`relative aspect-[4/3] ${getCategoryColor(product.category)}`}>
        {/* Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center opacity-50">
            <div className="text-4xl font-bold text-gray-400 mb-1">
              {product.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
            </div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">
              {product.category}
            </div>
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
        <span className="absolute top-3 left-3 px-2 py-1 bg-white/90 rounded text-xs font-medium text-gray-600 capitalize">
          {product.category}
        </span>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-white/90 rounded">
          <Star size={12} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium text-gray-700">{product.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 text-sm">
          {product.name}
        </h3>
        <p className="text-gray-500 text-xs line-clamp-2 mb-3">
          {product.description}
        </p>

        {/* Price & Action */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 text-white text-xs font-medium rounded-lg hover:bg-purple-700 transition-colors"
          >
            <ShoppingCart size={14} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
