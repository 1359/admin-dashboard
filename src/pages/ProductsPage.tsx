import { useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { FiSearch, FiPackage } from "react-icons/fi";
import FilterBar from "../components/Filter";
import { useProducts, type Product } from "../hooks/useProducts";

type SortBy = "name" | "price" | "stock";

interface ProductsState {
  formLoading: boolean;
}
interface ProductFormData {
  name: string;
  category: string;
  price: number;
  stock: number;
}

const ProductsPage = () => {
  const { products, loading, error, fetchProducts } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    category: "",
    price: 0,
    stock: 0,
  });
  const [state, setState] = useState<ProductsState>({
    formLoading: false,
  });
  const [sortBy, setSortBy] = useLocalStorage<SortBy>("products.sortBy", "name");
  const [searchQuery, setSearchQuery] = useLocalStorage<string>(
    "products.searchQuery",
    "",
  );
  const [category, setCategory] = useLocalStorage<string>(
    "products.category",
    "",
  );

  // This useEffect runs after EVERY render
  // because no dependency array [] is provided.
  useEffect(() => {
    console.log("Component rendered");
  });

  // When selectedProduct changes → fill the form. When null → clear it.
  useEffect(() => {
    setFormData(
      selectedProduct
        ? {
            name: selectedProduct.name,
            category: selectedProduct.category,
            price: selectedProduct.price,
            stock: selectedProduct.stock,
          }
        : (console.log("null null null"),
          { name: "", category: "", price: 0, stock: 0 }),
    );
  }, [selectedProduct]);

  useEffect(() => {
    if (formData.price > 300) console.log("hello hello");
  }, [formData.price]);

  const categories = [...new Set(products.map((p) => p.category))];

  const query = String(searchQuery ?? "").toLowerCase();

  const filteredProducts = products
    .filter(
      (p) =>
        (category === "" || p.category === category) &&
        (p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)),
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price") return a.price - b.price;
      return a.stock - b.stock;
    });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
    setState((prev) => ({
      ...prev,
      error: "",
    }));
  };

  const handleSubmit = () => {
    if (!formData.name.trim() && !formData.category.trim()) {
      setState((prev) => ({
        ...prev,
        error: "Name and category are required.",
      }));

      return;
    }
    if (!formData.name.trim()) {
      setState((prev) => ({
        ...prev,
        error: "Name is required.",
      }));

      return;
    }
    if (!formData.category.trim()) {
      setState((prev) => ({
        ...prev,
        error: "Category is required.",
      }));

      return;
    }

    setState((prev) => ({
      ...prev,
      formLoading: true,
      error: "",
    }));

    const url = selectedProduct
      ? `http://localhost:3001/api/products/${selectedProduct.id}`
      : "http://localhost:3001/api/products";

    const method = selectedProduct ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then(() => {
        setState((prev) => ({ ...prev, formLoading: false }));
        setSelectedProduct(null);
        fetchProducts();
      })
      .catch(() => {
        setState((prev) => ({
          ...prev,
          formLoading: false,
          error: "Failed to save product.",
        }));
      });
  };

  const handleDelete = (product: Product) => {
    setState((prev) => ({ ...prev, formLoading: true, error: "" }));

    fetch(`http://localhost:3001/api/products/${product.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Delete failed");
        setState((prev) => ({ ...prev, formLoading: false }));
        if (selectedProduct?.id === product.id) setSelectedProduct(null);
        fetchProducts();
      })
      .catch(() => {
        setState((prev) => ({
          ...prev,
          formLoading: false,
          error: "Failed to delete product.",
        }));
      });
  };

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

      {/* Product Form */}
      <div
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-2 ${
          selectedProduct ? "border-amber-400" : "border-blue-500"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {selectedProduct
              ? `Editing: ${selectedProduct.name}`
              : "Add New Product"}
          </h2>
          {selectedProduct && (
            <button
              onClick={() => setSelectedProduct(null)}
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕ Cancel
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleFormChange}
              placeholder="Product name"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <input
              name="category"
              type="text"
              value={formData.category}
              onChange={handleFormChange}
              placeholder="e.g. Electronics"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Price ($)
            </label>
            <input
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Stock
            </label>
            <input
              name="stock"
              type="number"
              min="0"
              value={formData.stock}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={state.formLoading}
            className={`px-5 py-2 rounded-lg text-white font-medium transition-colors disabled:opacity-50 ${
              selectedProduct
                ? "bg-amber-500 hover:bg-amber-600"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {state.formLoading
              ? "Saving..."
              : selectedProduct
                ? "Save Changes"
                : "+ Add Product"}
          </button>
          {error && (
            <div className="flex items-center justify-center">
              <p className="text-red-500">{error}</p>
            </div>
          )}
          {selectedProduct && (
            <button
              onClick={() => setSelectedProduct(null)}
              className="px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        sortBy={sortBy}
        onSortChange={(val) => setSortBy(val)}
        category={category}
        onCategoryChange={(val) => setCategory(val)}
        categories={categories}
      />

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 dark:text-gray-400">
              Loading products...
            </p>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      selectedProduct?.id === product.id
                        ? "bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400"
                        : ""
                    }`}
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
                        {product.stock === 0 && (
                          <span style={{ marginLeft: "26px" }}>
                            Out of stock
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {selectedProduct?.id === product.id ? (
                        <span className="px-2 py-1 text-xs font-medium bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded-full">
                          Editing
                        </span>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedProduct(product)}
                            className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product)}
                            disabled={state.formLoading}
                            className="px-3 py-1 text-xs font-medium bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-800 transition-colors disabled:opacity-50"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {!loading && !error && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredProducts.length} of {products.length} products
        </p>
      )}
    </div>
  );
};

export default ProductsPage;
