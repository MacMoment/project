import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const features = [
  {
    title: 'Premium Builds',
    description: 'Expertly crafted digital assets ready to use',
    gradient: 'from-[#F73AFF] to-[#A634FF]',
  },
  {
    title: 'Custom Services',
    description: 'Personalized creations for your unique needs',
    gradient: 'from-[#A634FF] to-[#AB1395]',
  },
  {
    title: 'Fast Delivery',
    description: 'Instant downloads for all prefab assets',
    gradient: 'from-[#FFC800] to-[#F73AFF]',
  },
];

export function FloatingCards() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We deliver exceptional quality and service for all your virtual building needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div
                className="relative bg-white rounded-2xl p-8 shadow-lg shadow-gray-200/50 border border-gray-100 transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
                style={{
                  animation: `float 6s ease-in-out infinite`,
                  animationDelay: `${index * 0.5}s`,
                }}
              >
                {/* Gradient accent */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${feature.gradient}`}
                />

                {/* Icon placeholder */}
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6`}
                >
                  <span className="text-2xl text-white font-bold">
                    {index + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                <Link
                  to="/store"
                  className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-[#F73AFF] hover:gap-3 transition-all"
                >
                  Learn more
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
