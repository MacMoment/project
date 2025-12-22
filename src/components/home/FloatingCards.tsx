import { Link } from 'react-router-dom';
import { ArrowRight, Layers, Paintbrush, Zap } from 'lucide-react';

const features = [
  {
    title: 'Premium Builds',
    description: 'Expertly crafted digital assets ready to use in your projects. High quality guaranteed.',
    gradient: 'from-[#F73AFF] to-[#A634FF]',
    icon: Layers,
  },
  {
    title: 'Custom Services',
    description: 'Personalized creations tailored to your unique vision and requirements.',
    gradient: 'from-[#A634FF] to-[#AB1395]',
    icon: Paintbrush,
  },
  {
    title: 'Fast Delivery',
    description: 'Instant downloads for all prefab assets. Quick turnaround on custom orders.',
    gradient: 'from-[#FFC800] to-[#F73AFF]',
    icon: Zap,
  },
];

export function FloatingCards() {
  return (
    <section className="py-24 md:py-32 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5">
            Why Choose Us
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We deliver exceptional quality and service for all your virtual building needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative"
              >
                <div
                  className="relative bg-white rounded-3xl p-8 lg:p-10 shadow-xl shadow-gray-200/60 border border-gray-100/80 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                >
                  {/* Gradient accent */}
                  <div
                    className={`absolute top-0 left-6 right-6 h-1 rounded-b-full bg-gradient-to-r ${feature.gradient}`}
                  />

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-8 shadow-lg`}
                  >
                    <Icon size={28} className="text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  <Link
                    to="/store"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#F73AFF] hover:gap-3 transition-all duration-200"
                  >
                    Learn more
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
