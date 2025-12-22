import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { products } from '../../data';
import { ProductCard } from '../store/ProductCard';

export function FeaturedProducts() {
  const featured = products.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Assets
            </h2>
            <p className="text-lg text-gray-600">
              Our most popular premium digital assets
            </p>
          </div>
          <Button variant="ghost" asChild className="hidden md:flex">
            <Link to="/store">View All →</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Button variant="outline" asChild>
            <Link to="/store">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
