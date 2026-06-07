export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}
export interface ProductState {
  error: string;
  loading: boolean;
  searchQuery: string;
  sortBy:SortBy;
  category:string;
}
export type SortBy = "name" | "price" | "stock";
