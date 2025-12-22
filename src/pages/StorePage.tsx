import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ProductCard, CategoryFilter, CustomOrderForm } from '../components/store';
import { products, categories } from '../data';
import { Sparkles } from 'lucide-react';

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const location = useLocation();

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory);

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
      <section className="bg-gradient-to-b from-purple-50/50 via-white to-white pt-12 pb-8 md:pt-16 md:pb-12">
        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5">
              Digital Asset Store
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Browse our collection of premium prefabricated assets for your virtual projects.
            </p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
          {/* Filters */}
          <div className="mb-10 md:mb-14">
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Custom Order Section */}
      <section id="custom" className="py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-3xl mx-auto px-8 md:px-12 lg:px-16">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white shadow-md border border-gray-100/80 mb-8">
              <Sparkles size={18} className="text-[#F73AFF]" />
              <span className="text-sm font-semibold text-gray-700">
                Custom Services
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5">
              Need Something Custom?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Tell us about your project and we'll bring your vision to life.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100/80 p-8 md:p-12">
            <CustomOrderForm />
          </div>
        </div>
      </section>

      {/* Floating Custom Order Button */}
      <Link
        to="/store#custom"
        className={`fixed bottom-8 right-8 z-40 flex items-center gap-2.5 px-7 py-4 bg-gradient-to-r from-[#F73AFF] to-[#A634FF] text-white font-semibold rounded-2xl shadow-xl shadow-purple-500/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5 ${
          showFloatingButton
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <Sparkles size={20} />
        Custom Order
      </Link>
    </>
  );
}
