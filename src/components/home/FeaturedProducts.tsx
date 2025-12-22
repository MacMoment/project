import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { products } from '../../data';
import { ProductCard } from '../store/ProductCard';

export function FeaturedProducts() {
  const featured = products.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Featured Assets
            </h2>
            <p className="text-lg text-gray-600">
              Our most popular premium digital assets
            </p>
          </div>
          <Link 
            to="/store" 
            className="hidden md:inline-flex items-center gap-2 text-[#F73AFF] font-semibold hover:gap-3 transition-all duration-200"
          >
            View All
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link 
            to="/store"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-[#F73AFF] hover:text-[#F73AFF] transition-all"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
