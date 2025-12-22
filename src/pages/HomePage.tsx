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
      <section className="py-16 bg-[#0f0f1a]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Whether you need prefab assets or custom commissions, we're here to help bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link 
              to="/store" 
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-500 transition-all"
            >
              Browse Store
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-white font-semibold rounded-lg border border-gray-700 hover:bg-white/5 transition-all"
            >
              Request Custom Order
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
