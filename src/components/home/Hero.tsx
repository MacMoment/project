import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-[#F73AFF]/20 to-[#A634FF]/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-[#FFC800]/20 to-[#F73AFF]/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#A634FF]/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100 mb-8">
            <Sparkles size={16} className="text-[#F73AFF]" />
            <span className="text-sm font-medium text-gray-700">
              Premium Virtual Assets
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Build Your
            <span className="block gradient-text">Virtual Dreams</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-xl">
            Premium prefabricated digital assets and custom services for virtual environments. Transform your vision into reality.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary" size="lg" asChild>
              <Link to="/store" className="flex items-center gap-2">
                Explore Store
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/services">Custom Order</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-12 mt-16 pt-12 border-t border-gray-200">
            <div>
              <p className="text-3xl font-bold text-gray-900">500+</p>
              <p className="text-sm text-gray-500 mt-1">Assets Created</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">200+</p>
              <p className="text-sm text-gray-500 mt-1">Happy Clients</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">4.9</p>
              <p className="text-sm text-gray-500 mt-1">Average Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
