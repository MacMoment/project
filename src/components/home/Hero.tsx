import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Star } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-violet-950 via-purple-900 to-indigo-950 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 animate-fade-in-up">
              <Sparkles size={16} className="text-yellow-400" />
              <span className="text-sm font-medium text-white/90">Premium Virtual Assets</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.1] mb-6 animate-fade-in-up stagger-1">
              Build Your{' '}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient">
                  Virtual Dreams
                </span>
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg lg:text-xl text-gray-300 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up stagger-2">
              Premium prefabricated digital assets and custom design services. 
              Transform your creative vision into stunning virtual reality.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12 animate-fade-in-up stagger-3">
              <Link 
                to="/store" 
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-lg shadow-white/20"
              >
                Explore Store
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold rounded-xl border border-white/30 hover:bg-white/10 transition-all"
              >
                Request Custom Build
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 sm:gap-10 animate-fade-in-up stagger-4">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-purple-900 flex items-center justify-center"
                    >
                      <span className="text-xs font-bold text-white">{String.fromCharCode(64 + i)}</span>
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-400">200+ happy clients</p>
                </div>
              </div>
              
              <div className="h-10 w-px bg-white/20 hidden sm:block" />
              
              <div className="text-center sm:text-left">
                <p className="text-2xl font-bold text-white">500+</p>
                <p className="text-sm text-gray-400">Assets delivered</p>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-lg aspect-square">
              {/* Floating cards */}
              <div className="absolute top-0 right-0 w-48 h-32 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-2xl shadow-purple-500/30 animate-float transform rotate-12 hover:rotate-6 transition-transform duration-500" />
              <div className="absolute top-20 left-0 w-48 h-32 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-2xl shadow-blue-500/30 animate-float-delayed transform -rotate-6 hover:rotate-0 transition-transform duration-500" />
              <div className="absolute bottom-10 right-10 w-48 h-32 rounded-2xl bg-gradient-to-br from-orange-500 to-yellow-500 shadow-2xl shadow-orange-500/30 animate-float transform rotate-6 hover:rotate-12 transition-transform duration-500" style={{ animationDelay: '1s' }} />
              
              {/* Center card */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex flex-col items-center justify-center p-6 shadow-2xl">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 shadow-lg animate-pulse-glow">
                  <span className="text-2xl font-bold text-white">A</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Academy Studios</h3>
                <p className="text-sm text-gray-400">Premium Virtual Assets</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
