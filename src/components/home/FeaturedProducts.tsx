import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { products } from '../../data';
import { ProductCard } from '../store/ProductCard';

export function FeaturedProducts() {
  const featured = products.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
              Featured Assets
            </h2>
            <p className="text-gray-600 text-sm">
              Our most popular premium digital assets
            </p>
          </div>
          <Link 
            to="/store" 
            className="group inline-flex items-center gap-1 text-purple-600 font-medium text-sm hover:text-purple-700"
          >
            View All
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
