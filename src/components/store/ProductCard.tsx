import { useState } from 'react';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

// Generate a nice gradient based on category
const getCategoryGradient = (category: string) => {
  const gradients: Record<string, string> = {
    buildings: 'from-violet-500 via-purple-500 to-fuchsia-500',
    landscapes: 'from-emerald-500 via-teal-500 to-cyan-500',
    interiors: 'from-orange-500 via-amber-500 to-yellow-500',
    vehicles: 'from-blue-500 via-indigo-500 to-purple-500',
  };
  return gradients[category] || 'from-gray-500 via-gray-600 to-gray-700';
};

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [imageError, setImageError] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl hover:border-transparent transition-all duration-500 hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* Gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(product.category)}`}>
          <div className="absolute inset-0 bg-black/10" />
          {/* Abstract pattern overlay */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-4 left-4 w-20 h-20 border-2 border-white/30 rounded-full" />
            <div className="absolute bottom-4 right-4 w-32 h-32 border-2 border-white/20 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 rounded-xl rotate-45" />
          </div>
        </div>
        
        {/* Actual image if available */}
        {!imageError && (
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            onError={() => setImageError(true)}
          />
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
          <button
            onClick={handleAddToCart}
            className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg hover:bg-purple-600 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300"
            aria-label="Add to cart"
          >
            <ShoppingCart size={20} />
          </button>
          <button 
            className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg hover:bg-purple-600 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
            aria-label="Quick view"
          >
            <Eye size={20} />
          </button>
        </div>

        {/* Top badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-lg text-xs font-semibold text-gray-700 capitalize shadow-sm">
            {product.category}
          </span>
          <button 
            onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }}
            className={`w-9 h-9 rounded-lg flex items-center justify-center shadow-sm transition-all ${
              isLiked ? 'bg-red-500 text-white' : 'bg-white/95 text-gray-600 hover:text-red-500'
            }`}
            aria-label="Like"
          >
            <Heart size={16} className={isLiked ? 'fill-current' : ''} />
          </button>
        </div>

        {/* Rating badge */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-lg shadow-sm">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-1">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white text-sm font-semibold rounded-xl hover:bg-purple-700 transition-colors shadow-sm hover:shadow-md"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
