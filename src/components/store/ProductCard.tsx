import { Star, ShoppingCart, Plus } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

// Generate placeholder gradient based on product id
const getPlaceholderGradient = (id: string) => {
  const gradients = [
    'from-purple-500 to-pink-500',
    'from-blue-500 to-purple-500',
    'from-green-500 to-teal-500',
    'from-orange-500 to-red-500',
    'from-pink-500 to-rose-500',
    'from-indigo-500 to-blue-500',
    'from-teal-500 to-cyan-500',
    'from-amber-500 to-orange-500',
  ];
  const index = parseInt(id, 10) % gradients.length;
  return gradients[index];
};

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-lg shadow-gray-200/60 border border-gray-100/80 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* Placeholder gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getPlaceholderGradient(product.id)}`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/30 text-6xl font-bold">{product.name.charAt(0)}</span>
          </div>
        </div>
        <img
          src={product.image}
          alt={product.name}
          className="relative w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        {/* Quick Add Button */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#F73AFF] hover:text-white"
          aria-label="Add to cart"
        >
          <Plus size={22} />
        </button>
        {/* Category Badge */}
        <span className="absolute top-4 left-4 px-4 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700 capitalize shadow-sm">
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 lg:p-8">
        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-4">
          <Star size={16} className="fill-[#FFC800] text-[#FFC800]" />
          <span className="text-sm font-semibold text-gray-700">
            {product.rating}
          </span>
          <span className="text-sm text-gray-400">/ 5.0</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#F73AFF] transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 line-clamp-2 mb-6 leading-relaxed">
          {product.description}
        </p>

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gradient-to-r hover:from-[#F73AFF] hover:to-[#A634FF] hover:text-white transition-all duration-200"
          >
            <ShoppingCart size={16} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
