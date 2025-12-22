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
      <section className="pt-28 pb-12 bg-gradient-to-br from-[#0f0a1a] via-purple-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Asset Store
            </h1>
            <p className="text-lg text-purple-200 mb-8">
              Browse our collection of premium prefabricated assets for your virtual projects.
            </p>
            
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300" size={20} />
              <input
                type="text"
                placeholder="Search assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-white/40 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Filters */}
          <div className="mb-10">
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No products found.</p>
              <p className="text-gray-400 mt-1">Try adjusting your search or filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Custom Order Section */}
      <section id="custom" className="py-20 bg-white">
        <div className="max-w-xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Need Something Custom?
            </h2>
            <p className="text-gray-600">
              Tell us about your project and we'll bring your vision to life.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <CustomOrderForm />
          </div>
        </div>
      </section>

      {/* Floating Custom Order Button */}
      <Link
        to="/store#custom"
        className={`fixed bottom-6 right-6 z-40 px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-xl transition-all duration-300 ${
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
