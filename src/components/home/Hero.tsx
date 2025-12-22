import { Link } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#0f0a1a] overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute top-20 right-[15%] w-72 h-72 bg-purple-600/30 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-32 left-[10%] w-96 h-96 bg-pink-500/20 rounded-full blur-[120px] animate-float-reverse" />
        <div className="absolute top-1/3 left-[20%] w-64 h-64 bg-blue-500/15 rounded-full blur-[80px] animate-float-slow" />
        
        {/* Floating cards - 3D depth effect */}
        <div className="hidden lg:block absolute top-32 right-[8%] w-48 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-white/10 backdrop-blur-sm animate-float shadow-2xl" />
        <div className="hidden lg:block absolute top-48 right-[18%] w-56 h-36 bg-gradient-to-br from-pink-500/20 to-yellow-500/20 rounded-2xl border border-white/10 backdrop-blur-sm animate-float-reverse animate-delay-1 shadow-2xl" />
        <div className="hidden lg:block absolute top-72 right-[5%] w-40 h-28 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-white/10 backdrop-blur-sm animate-float-slow animate-delay-2 shadow-2xl" />
      </div>

      {/* Content */}
      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-32 lg:py-40">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
            </span>
            <span className="text-sm font-medium text-gray-300">Now Available — Premium Assets</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
            Build Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400">
              Virtual Dreams
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-400 mb-10 leading-relaxed max-w-xl">
            Premium prefabricated digital assets and custom design services for Minecraft and virtual environments. Transform your creative vision into reality.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start gap-4 mb-12">
            <Link 
              to="/store" 
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-base font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-purple-500/25"
            >
              Explore Store
              <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link 
              to="/services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white text-base font-semibold rounded-xl border border-white/20 hover:bg-white/5 transition-all"
            >
              Custom Order
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-8 sm:gap-12 py-8 border-t border-white/10">
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-white">500+</p>
              <p className="text-sm text-gray-500 mt-1">Assets Created</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-white">200+</p>
              <p className="text-sm text-gray-500 mt-1">Happy Clients</p>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-3xl sm:text-4xl font-bold text-white">4.9</span>
                <Star size={20} className="fill-yellow-400 text-yellow-400" />
              </div>
              <p className="text-sm text-gray-500 mt-1">Average Rating</p>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-6 mt-6">
            {['Instant Download', 'Secure Payment', '24/7 Support'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-gray-500">
                <CheckCircle size={16} className="text-green-500" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
