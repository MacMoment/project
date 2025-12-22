import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { products } from '../../data';
import { ProductCard } from '../store/ProductCard';

export function FeaturedProducts() {
  const featured = products.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Assets
            </h2>
            <p className="text-xl text-gray-600">
              Our most popular premium digital assets
            </p>
          </div>
          <Link 
            to="/store" 
            className="group inline-flex items-center gap-2 text-purple-600 text-lg font-semibold hover:text-purple-700 transition-colors"
          >
            View All Assets
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
