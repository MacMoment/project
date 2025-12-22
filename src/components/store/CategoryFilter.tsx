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
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
            activeCategory === category.slug
              ? 'bg-purple-600 text-white shadow-md shadow-purple-500/30'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
