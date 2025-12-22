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
  const showDarkStyles = hasDarkHero && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
          ? 'bg-white shadow-lg shadow-black/5'
          : hasDarkHero 
            ? 'bg-transparent' 
            : 'bg-white'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" onClick={closeMobileMenu}>
            <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className={`text-xl font-bold hidden sm:block transition-colors ${
              showDarkStyles ? 'text-white' : 'text-gray-900'
            }`}>
              Academy Studios
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? showDarkStyles 
                        ? 'text-white bg-white/20'
                        : 'text-purple-600 bg-purple-50'
                      : showDarkStyles
                        ? 'text-white/80 hover:text-white hover:bg-white/10'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
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
              className={`hidden md:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                showDarkStyles 
                  ? 'text-white/80 hover:text-white hover:bg-white/10'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              Builders Academy
              <ExternalLink size={14} />
            </a>

            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className={`relative p-2.5 rounded-xl transition-all ${
                showDarkStyles 
                  ? 'hover:bg-white/10' 
                  : 'hover:bg-gray-100'
              }`}
              aria-label="Shopping cart"
            >
              <ShoppingCart size={22} className={showDarkStyles ? 'text-white' : 'text-gray-700'} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                  {itemCount > MAX_CART_DISPLAY_COUNT ? `${MAX_CART_DISPLAY_COUNT}+` : itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2.5 rounded-xl transition-all ${
                showDarkStyles 
                  ? 'hover:bg-white/10' 
                  : 'hover:bg-gray-100'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X size={22} className={showDarkStyles ? 'text-white' : 'text-gray-700'} />
              ) : (
                <Menu size={22} className={showDarkStyles ? 'text-white' : 'text-gray-700'} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-20 z-40 transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={closeMobileMenu}
        />
        <div
          className={`absolute top-0 right-0 w-72 h-full bg-white shadow-2xl transform transition-transform duration-300 ${
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
                  `block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive 
                      ? 'text-purple-600 bg-purple-50' 
                      : 'text-gray-700 hover:bg-gray-100'
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
              className="flex items-center gap-2 px-4 py-3 text-gray-600 text-sm rounded-xl hover:bg-gray-100 transition-all"
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
