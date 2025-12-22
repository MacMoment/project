import { Link } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#0f0f1a] overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-purple-600/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-600/20 rounded-full blur-[120px]" />

      <div className="relative w-full max-w-5xl mx-auto px-6 py-32">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-purple-300">Now Available — Premium Assets</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Build Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Virtual Dreams
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
            Premium prefabricated digital assets and custom design services for Minecraft and virtual environments.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <Link 
              to="/store" 
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-500 transition-all"
            >
              Explore Store
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold rounded-lg border border-gray-700 hover:bg-white/5 transition-all"
            >
              Request Custom Build
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 py-8 border-t border-gray-800">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-white">500+</p>
              <p className="text-sm text-gray-500">Assets Created</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-white">200+</p>
              <p className="text-sm text-gray-500">Happy Clients</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <span className="text-2xl sm:text-3xl font-bold text-white">4.9</span>
                <Star size={20} className="fill-yellow-400 text-yellow-400" />
              </div>
              <p className="text-sm text-gray-500">Average Rating</p>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-4">
            {['Instant Download', 'Secure Payment', '24/7 Support'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-gray-500">
                <CheckCircle size={14} className="text-green-500" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
