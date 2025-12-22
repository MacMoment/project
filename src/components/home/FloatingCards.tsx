import { Link } from 'react-router-dom';
import { ArrowRight, Layers, Palette, Zap } from 'lucide-react';

const features = [
  {
    title: 'Premium Builds',
    description: 'Expertly crafted digital assets ready to use in your projects.',
    icon: Layers,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    title: 'Custom Services',
    description: 'Personalized creations tailored to your unique vision.',
    icon: Palette,
    color: 'bg-pink-100 text-pink-600',
  },
  {
    title: 'Fast Delivery',
    description: 'Instant downloads for all prefab assets.',
    icon: Zap,
    color: 'bg-amber-100 text-amber-600',
  },
];

export function FloatingCards() {
  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            We deliver exceptional quality and service for all your virtual building needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-6 md:p-8 hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-5`}>
                  <Icon size={24} />
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>

                <Link
                  to="/store"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-600 hover:text-purple-700"
                >
                  Learn more
                  <ArrowRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
