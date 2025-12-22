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
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-16 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-xl font-bold">Academy Studios</span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Premium digital assets and custom services for virtual environments.
            </p>
            <div className="space-y-3">
              <a href="mailto:hello@academystudios.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <Mail size={18} />
                <span>hello@academystudios.com</span>
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin size={18} />
                <span>Virtual Studio, Internet</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Navigation</h4>
            <ul className="space-y-4">
              {footerLinks.navigation.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) =>
                link.external ? (
                  <li key={link.path}>
                    <a
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2"
                    >
                      {link.label}
                      <ExternalLink size={14} />
                    </a>
                  </li>
                ) : (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white transition-colors"
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
            <h4 className="text-lg font-semibold mb-6">Legal</h4>
            <ul className="space-y-4">
              {footerLinks.legal.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-16 pt-10 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-gray-500">
            © {new Date().getFullYear()} Academy Studios. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <a
              href="https://discord.gg/academystudios"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Discord
            </a>
            <a
              href="https://twitter.com/academystudios"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Twitter
            </a>
            <a
              href="https://youtube.com/academystudios"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
