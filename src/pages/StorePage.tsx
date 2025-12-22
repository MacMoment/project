import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ProductCard, CategoryFilter, CustomOrderForm } from '../components/store';
import { products, categories } from '../data';

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
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Digital Asset Store
          </h1>
          <p className="text-gray-600 max-w-xl">
            Browse our collection of premium prefabricated assets for your virtual projects.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
          {/* Filters */}
          <div className="mb-8">
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
              <p className="text-gray-500">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Custom Order Section */}
      <section id="custom" className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-2xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Need Something Custom?
            </h2>
            <p className="text-gray-600">
              Tell us about your project and we'll bring your vision to life.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
            <CustomOrderForm />
          </div>
        </div>
      </section>

      {/* Floating Custom Order Button */}
      <Link
        to="/store#custom"
        className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3 bg-purple-600 text-white font-medium rounded-lg shadow-lg hover:bg-purple-700 transition-all duration-300 ${
          showFloatingButton
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        ✨ Custom Order
      </Link>
    </>
  );
}
