import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ProductCard, CategoryFilter, CustomOrderForm } from '../components/store';
import { products, categories } from '../data';
import { Search } from 'lucide-react';

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleScroll = useCallback(() => {
    const customSection = document.getElementById('custom');
    if (customSection) {
      const rect = customSection.getBoundingClientRect();
      setShowFloatingButton(window.scrollY > 300 && rect.top > window.innerHeight);
    } else {
      setShowFloatingButton(window.scrollY > 300);
    }
  }, []);

  useEffect(() => {
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

  useEffect(() => {
    if (location.hash === '#custom') {
      const element = document.getElementById('custom');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-16 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
        <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
              Asset Store
            </h1>
            <p className="text-xl text-purple-200 mb-10 leading-relaxed">
              Browse our collection of premium prefabricated assets for your virtual projects.
            </p>
            
            {/* Search */}
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-purple-300" size={22} />
              <input
                type="text"
                placeholder="Search assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-white/10 border-2 border-white/20 rounded-2xl text-white text-lg placeholder-purple-300 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-16">
          {/* Filters */}
          <div className="mb-12">
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-xl">No products found.</p>
              <p className="text-gray-400 mt-2">Try adjusting your search or filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Custom Order Section */}
      <section id="custom" className="py-28 bg-white">
        <div className="max-w-2xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Need Something Custom?
            </h2>
            <p className="text-xl text-gray-600">
              Tell us about your project and we'll bring your vision to life.
            </p>
          </div>

          <div className="bg-gray-50 rounded-3xl p-10">
            <CustomOrderForm />
          </div>
        </div>
      </section>

      {/* Floating Custom Order Button */}
      <Link
        to="/store#custom"
        className={`fixed bottom-8 right-8 z-40 px-6 py-4 bg-purple-600 text-white text-lg font-semibold rounded-2xl shadow-xl shadow-purple-500/25 hover:bg-purple-700 hover:shadow-2xl transition-all duration-300 ${
          showFloatingButton
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        Custom Order
      </Link>
    </>
  );
}
