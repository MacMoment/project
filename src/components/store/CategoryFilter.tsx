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
          className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
            activeCategory === category.slug
              ? 'bg-gradient-to-r from-[#F73AFF] to-[#A634FF] text-white shadow-lg shadow-purple-500/25'
              : 'bg-white text-gray-600 border-2 border-gray-100 hover:border-[#F73AFF]/50 hover:text-[#F73AFF] shadow-sm'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
