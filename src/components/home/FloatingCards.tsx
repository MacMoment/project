import { Link } from 'react-router-dom';
import { ArrowRight, Layers, Palette, Zap, Shield } from 'lucide-react';

const features = [
  {
    title: 'Premium Quality',
    description: 'Every asset is meticulously crafted by professional designers with exceptional attention to detail.',
    icon: Layers,
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'bg-purple-50',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
  {
    title: 'Custom Services',
    description: 'Get personalized creations tailored exactly to your unique vision and project requirements.',
    icon: Palette,
    color: 'from-pink-500 to-rose-600',
    bgColor: 'bg-pink-50',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
  },
  {
    title: 'Instant Delivery',
    description: 'Download your assets immediately after purchase. No waiting, no delays, instant access.',
    icon: Zap,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
  {
    title: 'Secure & Licensed',
    description: 'All assets come with proper commercial licensing and secure, reliable download links.',
    icon: Shield,
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
];

export function FloatingCards() {
  return (
    <section className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to Build
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            We deliver exceptional quality and service for all your virtual building needs. 
            Here's what makes us different.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`group relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-transparent transition-all duration-300 hover:-translate-y-2 animate-fade-in-up stagger-${index + 1}`}
                style={{ opacity: 0, animationFillMode: 'forwards' }}
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl ${feature.iconBg} ${feature.iconColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={28} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Link */}
                <Link
                  to="/store"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 hover:text-purple-700 group/link"
                >
                  Learn more
                  <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
