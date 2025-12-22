import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Menu, X, ExternalLink } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/store', label: 'Store' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/services', label: 'Services' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

const MAX_CART_DISPLAY_COUNT = 9;

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleCart, getItemCount } = useCartStore();
  const itemCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when navigating - close it on link click
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-white shadow-sm'
          : 'bg-white'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5" onClick={closeMobileMenu}>
            <div className="w-9 h-9 rounded-lg bg-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-lg font-bold text-gray-900 hidden sm:block">
              Academy Studios
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-purple-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <a
              href="https://buildersacademy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors"
            >
              Builders Academy
              <ExternalLink size={14} />
            </a>

            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={20} className="text-gray-700" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount > MAX_CART_DISPLAY_COUNT ? `${MAX_CART_DISPLAY_COUNT}+` : itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X size={20} className="text-gray-700" />
              ) : (
                <Menu size={20} className="text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-16 z-40 transition-all duration-200 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/20"
          onClick={closeMobileMenu}
        />
        <div
          className={`absolute top-0 right-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-200 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-5 space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `block text-base font-medium ${
                    isActive ? 'text-purple-600' : 'text-gray-700'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <hr className="border-gray-100" />
            <a
              href="https://buildersacademy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 text-sm"
            >
              Builders Academy
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
