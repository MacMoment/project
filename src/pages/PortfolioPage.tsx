import { useState } from 'react';
import { useAdminStore } from '../store/adminStore';
import { X } from 'lucide-react';
import type { PortfolioItem } from '../types';

export default function PortfolioPage() {
  const { portfolioItems } = useAdminStore();
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const visibleItems = portfolioItems.slice(0, visibleCount);
  const hasMore = visibleCount < portfolioItems.length;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Portfolio
            </h1>
            <p className="text-lg text-gray-600">
              Explore our showcase of custom builds and commissioned projects.
            </p>
          </div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {visibleItems.map((item) => (
              <div
                key={item.id}
                className="break-inside-avoid group cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative overflow-hidden rounded-2xl bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                      item.gridSize === 'large'
                        ? 'aspect-[4/3]'
                        : item.gridSize === 'medium'
                        ? 'aspect-[3/2]'
                        : 'aspect-square'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <h3 className="text-lg font-bold text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/80 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="text-center mt-12">
              <button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="px-8 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:border-[#F73AFF] hover:text-[#F73AFF] transition-colors"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
          onClick={() => setSelectedItem(null)}
        >
          <button
            className="absolute top-6 right-6 p-2 text-white/80 hover:text-white transition-colors"
            onClick={() => setSelectedItem(null)}
          >
            <X size={28} />
          </button>
          <div
            className="max-w-5xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedItem.image}
              alt={selectedItem.title}
              loading="eager"
              decoding="async"
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="mt-4 text-center">
              <h3 className="text-xl font-bold text-white mb-2">
                {selectedItem.title}
              </h3>
              <p className="text-gray-400">{selectedItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
