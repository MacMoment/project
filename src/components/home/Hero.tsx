import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-8 lg:px-12 py-16 md:py-24">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-6">
            ✨ Premium Virtual Assets
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Build Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Virtual Dreams
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 mb-8 max-w-lg">
            Premium prefabricated digital assets and custom services for virtual environments. Transform your vision into reality.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Link 
              to="/store" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
            >
              Explore Store
              <ArrowRight size={18} />
            </Link>
            <Link 
              to="/services"
              className="inline-flex items-center px-6 py-3 text-gray-700 font-medium rounded-lg border border-gray-300 hover:border-gray-400 transition-colors"
            >
              Custom Order
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 mt-12 pt-8 border-t border-gray-200">
            <div>
              <p className="text-3xl font-bold text-gray-900">500+</p>
              <p className="text-sm text-gray-500">Assets Created</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">200+</p>
              <p className="text-sm text-gray-500">Happy Clients</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">4.9</p>
              <p className="text-sm text-gray-500">Average Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
