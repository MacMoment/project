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
    <div className="flex flex-wrap items-center gap-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.slug)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm ${
            activeCategory === category.slug
              ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-purple-500/30'
              : 'bg-white/80 text-gray-600 hover:bg-white border border-gray-200/80 backdrop-blur'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
