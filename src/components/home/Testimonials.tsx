import { Star } from 'lucide-react';
import { testimonials } from '../../data';

export function Testimonials() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-[#0c0b16] via-[#151027] to-[#0b0f1f] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-16 right-24 w-72 h-72 bg-purple-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-blue-500/15 rounded-full blur-[140px]" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Join hundreds of satisfied customers who trust Academy Studios for their virtual building needs.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group relative rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_20px_60px_-40px_rgba(15,10,26,0.9)] hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              {/* Rating */}
              <div className="relative flex items-center gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}
                  />
                ))}
              </div>

              {/* Content */}
              <p className="relative text-gray-200 leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="relative flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold text-sm">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
