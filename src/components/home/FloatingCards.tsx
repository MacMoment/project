import { Box, Palette, Zap, Shield } from 'lucide-react';

const features = [
  {
    title: 'Premium Quality',
    description: 'Every asset is meticulously crafted by professional designers.',
    icon: Box,
  },
  {
    title: 'Custom Services',
    description: 'Get personalized creations tailored to your unique vision.',
    icon: Palette,
  },
  {
    title: 'Instant Delivery',
    description: 'Download your assets immediately after purchase.',
    icon: Zap,
  },
  {
    title: 'Secure & Licensed',
    description: 'All assets come with proper commercial licensing.',
    icon: Shield,
  },
];

export function FloatingCards() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Why Choose Academy Studios
          </h2>
          <p className="text-gray-600">
            We deliver exceptional quality and service for all your virtual building needs.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-3">
                  <Icon size={24} />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">
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
