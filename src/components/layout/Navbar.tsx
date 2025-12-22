import { useState, useEffect, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
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

// Pages with dark hero sections
const darkHeroPages = ['/', '/store'];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleCart, getItemCount } = useCartStore();
  const itemCount = getItemCount();
  const location = useLocation();
  
  const hasDarkHero = darkHeroPages.includes(location.pathname);
  const isDarkMode = hasDarkHero && !isScrolled;

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    // Throttle scroll events
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-sm'
          : hasDarkHero 
            ? 'bg-transparent' 
            : 'bg-white'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className={`text-xl font-bold hidden sm:block transition-colors ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Academy Studios
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-5 py-2.5 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? isDarkMode 
                        ? 'text-white bg-white/10'
                        : 'text-purple-600 bg-purple-50'
                      : isDarkMode
                        ? 'text-gray-300 hover:text-white hover:bg-white/5'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
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
              className={`hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-white/5'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              Builders Academy
              <ExternalLink size={16} />
            </a>

            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className={`relative p-3 rounded-xl transition-colors ${
                isDarkMode 
                  ? 'hover:bg-white/10' 
                  : 'hover:bg-gray-100'
              }`}
              aria-label={`Shopping cart with ${itemCount} items`}
            >
              <ShoppingCart size={24} className={isDarkMode ? 'text-white' : 'text-gray-700'} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[22px] h-[22px] bg-purple-600 text-white text-xs font-bold rounded-full flex items-center justify-center px-1">
                  {itemCount > MAX_CART_DISPLAY_COUNT ? `${MAX_CART_DISPLAY_COUNT}+` : itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-3 rounded-xl transition-colors ${
                isDarkMode 
                  ? 'hover:bg-white/10' 
                  : 'hover:bg-gray-100'
              }`}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X size={24} className={isDarkMode ? 'text-white' : 'text-gray-700'} />
              ) : (
                <Menu size={24} className={isDarkMode ? 'text-white' : 'text-gray-700'} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-20 z-40 transition-all duration-200 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={closeMobileMenu}
        />
        <div
          className={`absolute top-0 right-0 w-72 h-full bg-white shadow-xl transform transition-transform duration-200 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `block px-5 py-4 rounded-xl text-base font-medium transition-colors ${
                    isActive 
                      ? 'text-purple-600 bg-purple-50' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <hr className="my-4 border-gray-100" />
            <a
              href="https://buildersacademy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-4 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Builders Academy
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
