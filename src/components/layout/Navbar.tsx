import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-sm'
          : hasDarkHero 
            ? 'bg-transparent' 
            : 'bg-white'
      }`}
    >
      <nav className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
            <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <span className={`text-base font-bold hidden sm:block transition-colors ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Academy Studios
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? isDarkMode 
                        ? 'text-white'
                        : 'text-purple-600'
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
              className={`hidden md:flex items-center gap-1 text-sm font-medium transition-colors ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              Builders Academy
              <ExternalLink size={12} />
            </a>

            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className={`relative p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'hover:bg-white/10' 
                  : 'hover:bg-gray-100'
              }`}
              aria-label="Shopping cart"
            >
              <ShoppingCart size={18} className={isDarkMode ? 'text-white' : 'text-gray-700'} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-purple-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {itemCount > MAX_CART_DISPLAY_COUNT ? `${MAX_CART_DISPLAY_COUNT}+` : itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'hover:bg-white/10' 
                  : 'hover:bg-gray-100'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X size={18} className={isDarkMode ? 'text-white' : 'text-gray-700'} />
              ) : (
                <Menu size={18} className={isDarkMode ? 'text-white' : 'text-gray-700'} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-14 z-40 transition-all duration-200 ${
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
          className={`absolute top-0 right-0 w-56 h-full bg-white shadow-lg transform transition-transform duration-200 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-4 space-y-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `block text-sm font-medium ${
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
              className="flex items-center gap-1 text-gray-600 text-sm"
            >
              Builders Academy
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
