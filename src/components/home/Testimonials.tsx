import { Star, Quote } from 'lucide-react';
import { testimonials } from '../../data';

export function Testimonials() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Join hundreds of satisfied customers who trust Academy Studios for their virtual building needs.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative bg-gray-50 rounded-3xl p-8 hover:shadow-lg transition-shadow"
            >
              {/* Quote icon */}
              <Quote size={32} className="text-purple-200 mb-6" />

              {/* Content */}
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                "{testimonial.content}"
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}
                  />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-lg">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
