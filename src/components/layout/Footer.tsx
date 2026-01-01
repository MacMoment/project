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
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="text-lg font-bold">Academy Studios</span>
            </Link>
            <p className="text-gray-400 text-sm mb-5 leading-relaxed">
              Premium digital assets and custom services for virtual environments.
            </p>
            <div className="space-y-2.5">
              <a href="mailto:hello@academystudios.com" className="flex items-center gap-2.5 text-gray-400 text-sm hover:text-white transition-colors">
                <Mail size={16} />
                <span>hello@academystudios.com</span>
              </a>
              <div className="flex items-center gap-2.5 text-gray-400 text-sm">
                <MapPin size={16} />
                <span>Virtual Studio, Internet</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) =>
                link.external ? (
                  <li key={link.path}>
                    <a
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 text-sm hover:text-white transition-colors inline-flex items-center gap-1.5"
                    >
                      {link.label}
                      <ExternalLink size={12} />
                    </a>
                  </li>
                ) : (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-gray-400 text-sm hover:text-white transition-colors"
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
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Academy Studios. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://discord.gg/academystudios"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 text-sm hover:text-white transition-colors"
            >
              Discord
            </a>
            <a
              href="https://twitter.com/academystudios"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 text-sm hover:text-white transition-colors"
            >
              Twitter
            </a>
            <a
              href="https://youtube.com/academystudios"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 text-sm hover:text-white transition-colors"
            >
              YouTube
            </a>
          </div>
        </div>
        
        {/* Concealed Admin Access */}
        <div className="mt-8 pt-4 border-t border-gray-800/50 text-center">
          <div className="flex items-center justify-center gap-4 text-xs">
            <Link
              to="/account"
              className="text-gray-600 hover:text-gray-400 transition-colors"
            >
              Customer Panel
            </Link>
            <span className="text-gray-700">•</span>
            <Link
              to="/admin/panel"
              className="text-gray-600 hover:text-gray-400 transition-colors"
            >
              Admin Access
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
