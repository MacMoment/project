import { Star, Quote } from 'lucide-react';
import { testimonials } from '../../data';

// Generate placeholder avatar based on name
const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

const avatarColors = [
  'from-purple-500 to-pink-500',
  'from-blue-500 to-cyan-500',
  'from-green-500 to-emerald-500',
];

export function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of satisfied customers who trust Academy Studios
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="relative bg-white rounded-3xl p-8 lg:p-10 shadow-xl shadow-gray-200/60 border border-gray-100/80"
            >
              {/* Quote icon */}
              <div className="absolute -top-4 left-8 w-10 h-10 bg-gradient-to-br from-[#F73AFF] to-[#A634FF] rounded-xl flex items-center justify-center shadow-lg">
                <Quote size={18} className="text-white" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-6 mt-2">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-[#FFC800] text-[#FFC800]"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 leading-relaxed mb-8 text-base">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                {/* Avatar placeholder */}
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${avatarColors[index % avatarColors.length]} flex items-center justify-center shadow-md`}>
                  <span className="text-white font-bold text-sm">{getInitials(testimonial.name)}</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
