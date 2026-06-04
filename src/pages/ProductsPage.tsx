import { useState, useEffect } from "react";
import { FiSearch, FiPackage } from "react-icons/fi";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}
interface ProductState {
  error: string;
  loading: boolean;
  searchQuery: string;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [state, setState] = useState<ProductState>({
    error: "",
    loading: false,
    searchQuery: "",
  });

  useEffect(() => {
    fetch("http://localhost:3001/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setState((prev) => ({
          ...prev,
          loading: false,
        }));
      })
      .catch(() => {
        setState((prev) => ({
          ...prev,
          error: "Failed to load products.",
          loading: false,
        }));
      });
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(state.searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Products
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Browse all products in the catalog
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <div className="relative">
          <FiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by name or category..."
            value={state.searchQuery}
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                searchQuery: e.target.value,
              }))
            }
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {state.loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 dark:text-gray-400">
              Loading products...
            </p>
          </div>
        ) : state.error ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-red-500">{state.error}</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-2">
            <FiPackage size={40} className="text-gray-300" />
            <p className="text-gray-500 dark:text-gray-400">
              No products found
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Stock
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`font-medium ${
                          product.stock <= 10
                            ? "text-red-600 dark:text-red-400"
                            : "text-green-600 dark:text-green-400"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {!state.loading && !state.error && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredProducts.length} of {products.length} products
        </p>
      )}
    </div>
  );
};

export default ProductsPage;
