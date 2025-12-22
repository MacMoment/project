import type { Category } from '../../types';

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (slug: string) => void;
}

export function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.slug)}
          className={`px-6 py-3 rounded-xl text-base font-medium transition-all ${
            activeCategory === category.slug
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
