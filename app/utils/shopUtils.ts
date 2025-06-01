type Product = {
    id: string;
    name: string;
    price: number;
  };
  
  export const calculateTotal = (wishlist: string[], products: Product[]): number => {
    return wishlist.reduce((sum, id) => {
      const item = products.find((p) => p.id === id);
      return item ? sum + item.price : sum;
    }, 0);
  };
  
  export const getProductById = (id: string, products: Product[]) => {
    return products.find((p) => p.id === id) || null;
  };

  export function sortByPrice(
    products: { id: string; name: string; price: number }[],
    direction: "asc" | "desc"
  ) {
    return [...products].sort((a, b) =>
      direction === "asc" ? a.price - b.price : b.price - a.price
    );
  }
  
  