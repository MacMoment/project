import { Link } from 'react-router-dom';
import { Box, Palette, Zap, Shield, ArrowRight } from 'lucide-react';

const features = [
  {
    title: 'Premium Quality',
    description: 'Meticulously crafted by professional designers with exceptional attention to detail.',
    icon: Box,
    gradient: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    title: 'Custom Services',
    description: 'Personalized creations tailored exactly to your unique vision and requirements.',
    icon: Palette,
    gradient: 'from-pink-500 to-pink-600',
    bgColor: 'bg-pink-50',
  },
  {
    title: 'Instant Delivery',
    description: 'Download your purchased assets immediately. No waiting, instant access.',
    icon: Zap,
    gradient: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-50',
  },
  {
    title: 'Secure & Licensed',
    description: 'All assets include proper commercial licensing for worry-free usage.',
    icon: Shield,
    gradient: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50',
  },
];

export function FloatingCards() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-[#0c0b16] via-[#151027] to-[#0b0f1f] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-12 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-12 right-16 w-80 h-80 bg-pink-500/15 rounded-full blur-[140px]" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Why Choose Academy Studios
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            We deliver exceptional quality and service for all your virtual building needs.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_20px_60px_-40px_rgba(15,10,26,0.9)] hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg`}>
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="relative text-lg font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="relative text-gray-300 text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>
                <Link 
                  to="/services" 
                  className="relative inline-flex items-center gap-1 text-sm font-medium text-purple-200 hover:text-white transition-colors"
                >
                  Learn more
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
