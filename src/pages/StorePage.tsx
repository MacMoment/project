import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const handleScroll = () => {
      const customSection = document.getElementById('custom');
      if (customSection) {
        const rect = customSection.getBoundingClientRect();
        setShowFloatingButton(window.scrollY > 300 && rect.top > window.innerHeight);
      } else {
        setShowFloatingButton(window.scrollY > 300);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <section className="pt-28 pb-10 bg-[#0f0f1a]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Asset Store
            </h1>
            <p className="text-gray-400 mb-6">
              Browse our collection of premium digital assets.
            </p>
            
            {/* Search */}
            <div className="relative max-w-sm mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          {/* Filters */}
          <div className="mb-6">
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found. Try a different search or filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Custom Order Section */}
      <section id="custom" className="py-16 bg-white">
        <div className="max-w-xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Need Something Custom?
            </h2>
            <p className="text-gray-600 text-sm">
              Tell us about your project and we'll bring your vision to life.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <CustomOrderForm />
          </div>
        </div>
      </section>

      {/* Floating Custom Order Button */}
      <Link
        to="/store#custom"
        className={`fixed bottom-6 right-6 z-40 px-4 py-2.5 bg-purple-600 text-white text-sm font-medium rounded-lg shadow-lg hover:bg-purple-700 transition-all duration-300 ${
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
