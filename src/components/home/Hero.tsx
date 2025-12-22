import { Link } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#0f0f1a] overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[150px]" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-600/15 rounded-full blur-[150px]" />

      <div className="relative w-full max-w-6xl mx-auto px-8 sm:px-12 lg:px-16 py-40">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-10">
            <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-purple-300">Now Available — Premium Assets</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-8">
            Build Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Virtual Dreams
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Premium prefabricated digital assets and custom design services for Minecraft and virtual environments. Transform your creative vision into reality.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16">
            <Link 
              to="/store" 
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 bg-purple-600 text-white text-lg font-semibold rounded-2xl hover:bg-purple-500 transition-all shadow-lg shadow-purple-500/25"
            >
              Explore Store
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 text-white text-lg font-semibold rounded-2xl border-2 border-gray-700 hover:bg-white/5 transition-all"
            >
              Request Custom Build
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-12 sm:gap-20 py-10 border-t border-gray-800">
            <div className="text-center">
              <p className="text-4xl sm:text-5xl font-bold text-white mb-2">500+</p>
              <p className="text-base text-gray-500">Assets Created</p>
            </div>
            <div className="text-center">
              <p className="text-4xl sm:text-5xl font-bold text-white mb-2">200+</p>
              <p className="text-base text-gray-500">Happy Clients</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-4xl sm:text-5xl font-bold text-white">4.9</span>
                <Star size={28} className="fill-yellow-400 text-yellow-400" />
              </div>
              <p className="text-base text-gray-500">Average Rating</p>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-8">
            {['Instant Download', 'Secure Payment', '24/7 Support'].map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-gray-500">
                <CheckCircle size={18} className="text-green-500" />
                <span className="text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
