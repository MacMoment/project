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
      <section className="py-20 bg-gradient-to-br from-[#0f0a1a] to-purple-900">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            Whether you need prefab assets or custom commissions, we're here to help bring your creative vision to life.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/store" 
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-all"
            >
              Browse Store
              <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link 
              to="/services"
              className="inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/10 transition-all"
            >
              Request Custom Order
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
