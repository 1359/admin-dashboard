import { FiSliders } from "react-icons/fi";

type SortBy = "name" | "price" | "stock";

interface FilterBarProps {
  sortBy: SortBy;
  onSortChange: (sort: SortBy) => void;
  category: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

const FilterBar = ({
  sortBy,
  onSortChange,
  category,
  onCategoryChange,
  categories,
}: FilterBarProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
        <FiSliders size={18} />
        <span className="text-sm font-medium">Filters</span>
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Sort field */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
          Sort by
        </label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortBy)}
          className="text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="stock">Stock</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
