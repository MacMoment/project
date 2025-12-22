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
      <section className="py-24 md:py-32 bg-gradient-to-br from-[#220735] via-[#3d1259] to-[#AB1395] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#F73AFF] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#FFC800] rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-8 md:px-12 lg:px-16 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Whether you need prefab assets or custom commissions, we're here to help bring your vision to life.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <Link 
              to="/store" 
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-[#220735] font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200"
            >
              Browse Store
              <ArrowRight size={20} />
            </Link>
            <Link 
              to="/services"
              className="inline-flex items-center px-8 py-4 bg-transparent text-white font-semibold rounded-2xl border-2 border-white/40 hover:bg-white hover:text-[#220735] transition-all duration-200"
            >
              Request Custom Order
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
