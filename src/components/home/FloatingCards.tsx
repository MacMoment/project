import { Box, Palette, Zap, Shield } from 'lucide-react';

const features = [
  {
    title: 'Premium Quality',
    description: 'Meticulously crafted by professional designers with exceptional attention to detail.',
    icon: Box,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    title: 'Custom Services',
    description: 'Personalized creations tailored exactly to your unique vision and requirements.',
    icon: Palette,
    color: 'bg-pink-100 text-pink-600',
  },
  {
    title: 'Instant Delivery',
    description: 'Download your purchased assets immediately. No waiting, instant access.',
    icon: Zap,
    color: 'bg-amber-100 text-amber-600',
  },
  {
    title: 'Secure & Licensed',
    description: 'All assets include proper commercial licensing for worry-free usage.',
    icon: Shield,
    color: 'bg-emerald-100 text-emerald-600',
  },
];

export function FloatingCards() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Why Choose Academy Studios
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            We deliver exceptional quality and service for all your virtual building needs.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="text-center p-8 rounded-3xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mx-auto mb-6`}>
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
