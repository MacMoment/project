import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-b from-white via-purple-50/30 to-white">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-20 w-80 h-80 bg-gradient-to-br from-[#F73AFF]/15 to-[#A634FF]/15 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-32 right-20 w-96 h-96 bg-gradient-to-br from-[#FFC800]/15 to-[#F73AFF]/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-[#A634FF]/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-8 md:px-12 lg:px-16 py-20 md:py-28">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm shadow-md border border-gray-100/80 mb-10">
            <Sparkles size={18} className="text-[#F73AFF]" />
            <span className="text-sm font-semibold text-gray-700">
              Premium Virtual Assets
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8 tracking-tight">
            Build Your
            <span className="block gradient-text mt-2">Virtual Dreams</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-12 max-w-lg">
            Premium prefabricated digital assets and custom services for virtual environments. Transform your vision into reality.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Link 
              to="/store" 
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#F73AFF] to-[#A634FF] text-white font-semibold rounded-2xl shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all duration-200"
            >
              Explore Store
              <ArrowRight size={20} />
            </Link>
            <Link 
              to="/services"
              className="inline-flex items-center px-8 py-4 bg-white text-gray-800 font-semibold rounded-2xl border-2 border-gray-200 hover:border-[#F73AFF] hover:text-[#F73AFF] transition-all duration-200"
            >
              Custom Order
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-10 md:gap-16 mt-20 pt-10 border-t border-gray-200/60">
            <div>
              <p className="text-4xl font-bold text-gray-900">500+</p>
              <p className="text-sm text-gray-500 mt-2 font-medium">Assets Created</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-gray-900">200+</p>
              <p className="text-sm text-gray-500 mt-2 font-medium">Happy Clients</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-gray-900">4.9</p>
              <p className="text-sm text-gray-500 mt-2 font-medium">Average Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
