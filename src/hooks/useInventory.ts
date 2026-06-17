import { useProducts } from "./useProducts";
interface categorySummery {
  name: string;
  productCount: number;
  totalStock: number;
}
interface categorySummery1 {
  name: string;
  productCount: number;
  totalStock: number;
}
export function useInventory() {
  const { products, loading, error } = useProducts();
  const lowStock = products.filter((product) => product.stock < 10);
  const totalAmount = products.reduce((total, product) => {
    return (total = product.stock * product.price);
  }, 0);

  const byCategory: categorySummery[] = [
    ...new Set(products.map((p) => p.category)),
  ].map((name) => {
    const inCategory = products.filter((p) => p.category == name);
    return {
      name,
      productCount: inCategory.length,
      totalStock: inCategory.reduce((sum, p) => sum + p.stock, 0),
    };
  });

  const byCategory1: categorySummery1[] = [
    ...new Set(products.map((p) => p.category)),
  ].map((name) => {
    const inCategory1 = products.filter((p) => p.category == name);
    return {
      name,
      productCount: inCategory1.length,
      totalStock: inCategory1.reduce((sum, p) => {
        return sum + p.stock;
      }, 0),
    };
  });
  return {
    loading,
    error,
    totalProducts: products.length,
    lowStock,
    totalAmount,
    byCategory,
  };
}
