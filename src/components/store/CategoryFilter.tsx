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
          className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
            activeCategory === category.slug
              ? 'bg-gradient-to-r from-[#F73AFF] to-[#A634FF] text-white shadow-lg shadow-purple-500/25'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-[#F73AFF] hover:text-[#F73AFF]'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
