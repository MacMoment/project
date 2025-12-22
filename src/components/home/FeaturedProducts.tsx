import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { products } from '../../data';
import { ProductCard } from '../store/ProductCard';

export function FeaturedProducts() {
  const featured = products.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Featured Assets
            </h2>
            <p className="text-gray-600">
              Our most popular premium digital assets
            </p>
          </div>
          <Link 
            to="/store" 
            className="inline-flex items-center gap-1.5 text-purple-600 font-medium hover:text-purple-700"
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
