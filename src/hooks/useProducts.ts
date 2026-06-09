import { useEffect, useState } from "react";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}


export function useProducts(){
     const [products, setProducts] = useState<Product[]>([]);
     const [ loading,setLoading]=useState<boolean>(false);
     const [error,setError]=useState<string>("");
     
     
    
 const fetchProducts = () => {
    setLoading(true);
    setError("");
    fetch("http://localhost:3001/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
            setLoading(false);

      })
      .catch(() => {
        setLoading(false);
        setError("Failed to load products.");
       
        });
      };
       useEffect(() => {
    fetchProducts();
  }, []);
  return {products,loading,error,fetchProducts}
  };
