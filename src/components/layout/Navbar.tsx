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
          ? 'glass shadow-sm border-b border-gray-100/50'
          : hasDarkHero 
            ? 'bg-transparent' 
            : 'bg-white'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div className="hidden sm:block">
              <span className={`text-lg font-bold transition-colors ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Academy
              </span>
              <span className={`text-lg font-bold transition-colors ${
                isDarkMode ? 'text-purple-300' : 'text-purple-600'
              }`}>
                {' '}Studios
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `nav-link px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? isDarkMode 
                        ? 'text-white active'
                        : 'text-purple-600 active'
                      : isDarkMode
                        ? 'text-gray-300 hover:text-white'
                        : 'text-gray-600 hover:text-gray-900'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            <a
              href="https://buildersacademy.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                isDarkMode 
                  ? 'text-white border-white/20 hover:bg-white/10'
                  : 'text-purple-600 border-purple-200 hover:bg-purple-50'
              }`}
            >
              Builders Academy
              <ExternalLink size={14} />
            </a>

            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className={`relative p-2.5 rounded-xl transition-all ${
                isDarkMode 
                  ? 'hover:bg-white/10' 
                  : 'hover:bg-gray-100'
              }`}
              aria-label={`Shopping cart with ${itemCount} items`}
            >
              <ShoppingCart size={22} className={isDarkMode ? 'text-white' : 'text-gray-700'} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1 animate-fade-in">
                  {itemCount > MAX_CART_DISPLAY_COUNT ? `${MAX_CART_DISPLAY_COUNT}+` : itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2.5 rounded-xl transition-colors ${
                isDarkMode 
                  ? 'hover:bg-white/10' 
                  : 'hover:bg-gray-100'
              }`}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X size={22} className={isDarkMode ? 'text-white' : 'text-gray-700'} />
              ) : (
                <Menu size={22} className={isDarkMode ? 'text-white' : 'text-gray-700'} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-16 z-40 transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          onClick={closeMobileMenu}
        />
        <div
          className={`absolute top-0 right-0 w-72 h-full bg-white shadow-2xl transform transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
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
              className="flex items-center gap-2 px-4 py-3 text-purple-600 font-medium rounded-xl hover:bg-purple-50 transition-colors"
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
