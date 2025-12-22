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
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Academy Studios
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
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
                className="group p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl hover:shadow-gray-100 border border-transparent hover:border-gray-100 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg`}>
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>
                <Link 
                  to="/services" 
                  className="inline-flex items-center gap-1 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
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
