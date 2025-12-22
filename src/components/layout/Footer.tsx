import { Link } from 'react-router-dom';
import { Mail, MapPin, ExternalLink } from 'lucide-react';

const footerLinks = {
  navigation: [
    { label: 'Home', path: '/' },
    { label: 'Store', path: '/store' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Services', path: '/services' },
  ],
  company: [
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Builders Academy', path: 'https://buildersacademy.com', external: true },
  ],
  legal: [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Refund Policy', path: '/refunds' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#220735] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F73AFF] to-[#A634FF] flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-xl font-bold">Academy Studios</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium prefabricated digital assets and custom services for virtual environments.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Mail size={18} />
                <span>hello@academystudios.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <MapPin size={18} />
                <span>Virtual Studio, Internet</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-lg mb-6">Navigation</h4>
            <ul className="space-y-4">
              {footerLinks.navigation.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) =>
                link.external ? (
                  <li key={link.path}>
                    <a
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors text-sm inline-flex items-center gap-1.5"
                    >
                      {link.label}
                      <ExternalLink size={14} />
                    </a>
                  </li>
                ) : (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-lg mb-6">Legal</h4>
            <ul className="space-y-4">
              {footerLinks.legal.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Academy Studios. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <a
              href="https://discord.gg/academystudios"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
            >
              Discord
            </a>
            <a
              href="https://twitter.com/academystudios"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
            >
              Twitter
            </a>
            <a
              href="https://youtube.com/academystudios"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
