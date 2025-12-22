import { Hero, FloatingCards, Testimonials, FeaturedProducts } from '../components/home';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FloatingCards />
      <FeaturedProducts />
      <Testimonials />
      
      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#220735] to-[#AB1395]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            Whether you need prefab assets or custom commissions, we're here to help bring your vision to life.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="primary" size="lg" asChild className="bg-white text-[#220735] hover:bg-gray-100">
              <Link to="/store" className="flex items-center gap-2">
                Browse Store
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-white text-white hover:bg-white hover:text-[#220735]">
              <Link to="/services">Request Custom Order</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
