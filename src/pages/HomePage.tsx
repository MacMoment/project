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
      <section className="py-28 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
        <div className="max-w-4xl mx-auto px-8 sm:px-12 lg:px-16 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-purple-200 mb-12 max-w-2xl mx-auto leading-relaxed">
            Whether you need prefab assets or custom commissions, we're here to help bring your creative vision to life.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link 
              to="/store" 
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-purple-900 text-lg font-semibold rounded-2xl hover:bg-gray-100 transition-all"
            >
              Browse Store
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 text-white text-lg font-semibold rounded-2xl border-2 border-white/30 hover:bg-white/10 transition-all"
            >
              Request Custom Order
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
