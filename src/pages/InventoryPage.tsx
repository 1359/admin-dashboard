import { FiAlertTriangle, FiDollarSign, FiPackage } from "react-icons/fi";
import { useInventory } from "../hooks/useInventory";

const InventoryPage = () => {
  const { loading, error, totalProducts, lowStock, totalAmount, byCategory } =
    useInventory();
  if (error) {
    return (
      <div className="flex item-center justify-center h-64 ">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="flex item-center justify-center h-64 ">
        <p className="text-gray-500">{loading}</p>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Inventory
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Stock levels and category breakdown
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <FiPackage size={24} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Products
            </p>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {totalProducts}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center gap-4">
          <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
            <FiAlertTriangle
              size={24}
              className="text-red-600 dark:text-red-400"
            />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Low Stock Alerts
            </p>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {lowStock.length}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center gap-4">
          <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
            <FiDollarSign
              size={24}
              className="text-red-600 dark:text-green-800"
            />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Inventory Value
            </p>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              $
              {totalAmount.toLocaleString("en-US", {
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
        </div>
      </div>
      {/* Low Stock */}
      {lowStock.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
            <FiAlertTriangle className="text-red-500" />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Low Stock (≤ 10 units)
            </h2>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {lowStock.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="font-bold text-red-600 dark:text-red-400">
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    ${product.price.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* By Category */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            By Category
          </h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Products
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Total Stock
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {byCategory.map((cat) => (
              <tr
                key={cat.name}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                  {cat.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {cat.productCount}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {cat.totalStock}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default InventoryPage;
