import { Hero, FloatingCards, Testimonials, FeaturedProducts } from '../components/home';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FloatingCards />
      <FeaturedProducts />
      <Testimonials />
      
      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Whether you need prefab assets or custom commissions, we're here to help bring your vision to life.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link 
              to="/store" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Browse Store
              <ArrowRight size={18} />
            </Link>
            <Link 
              to="/services"
              className="inline-flex items-center px-6 py-3 text-white font-medium rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors"
            >
              Request Custom Order
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
