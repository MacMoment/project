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
      <section className="relative py-20 bg-gradient-to-br from-[#0f0a1a] via-[#1a1233] to-purple-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-16 w-64 h-64 bg-purple-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-500/20 rounded-full blur-[140px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <div className="rounded-3xl border border-white/15 bg-white/5 backdrop-blur-2xl px-8 py-12 shadow-[0_30px_80px_-50px_rgba(255,255,255,0.45)]">
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
        </div>
      </section>
    </>
  );
}
