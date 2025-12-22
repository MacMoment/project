import { Link } from 'react-router-dom';
import { teamMembers } from '../data';
import { Button } from '../components/ui/Button';
import { ArrowRight, ExternalLink } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Academy Studios
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We are a virtual design studio dedicated to crafting exceptional digital assets and custom builds for virtual environments.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                At Academy Studios, we believe that virtual worlds deserve the same attention to detail and craftsmanship as the physical world. Our mission is to empower creators, server owners, and content producers with premium digital assets that elevate their projects.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                We combine artistic vision with technical expertise to deliver builds that are not only visually stunning but also optimized for performance and usability.
              </p>
              <Button variant="outline" asChild>
                <Link to="/portfolio" className="flex items-center gap-2">
                  View Our Work
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-[#F73AFF] to-[#A634FF] rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What We Stand For
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our core values guide everything we create
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Quality First',
                description:
                  'Every asset we create meets the highest standards of craftsmanship and attention to detail.',
              },
              {
                title: 'Client Focused',
                description:
                  'We listen to your needs and work closely with you to bring your vision to life.',
              },
              {
                title: 'Continuous Innovation',
                description:
                  'We stay ahead of trends and constantly push the boundaries of what\'s possible.',
              },
            ].map((value, index) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F73AFF] to-[#A634FF] flex items-center justify-center mb-6">
                  <span className="text-xl text-white font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet The Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The talented builders behind Academy Studios
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="group text-center"
              >
                <div className="relative mb-6 inline-block">
                  <img
                    src={member.avatar}
                    alt={member.nickname}
                    className="w-32 h-32 rounded-full object-cover mx-auto ring-4 ring-white shadow-lg"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#F73AFF]/20 to-[#A634FF]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {member.nickname}
                </h3>
                <p className="text-sm text-[#F73AFF] font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {member.description}
                </p>
                {member.portfolioLink && (
                  <Link
                    to={member.portfolioLink}
                    className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#F73AFF] transition-colors"
                  >
                    View Portfolio
                    <ExternalLink size={14} />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#220735] to-[#AB1395]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Work With Us?
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            Let's create something amazing together. Browse our store or request a custom project today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              asChild
              className="bg-white text-[#220735] hover:bg-gray-100"
            >
              <Link to="/store">Browse Store</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-white text-white hover:bg-white hover:text-[#220735]"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
