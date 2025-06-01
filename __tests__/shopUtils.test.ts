import { calculateTotal, getProductById, sortByPrice } from "../app/utils/shopUtils";

const products = [
  { id: "1", name: "Lapidaire Noir", price: 49.99 },
  { id: "2", name: "Verdelite Primo", price: 39.99 },
  { id: "3", name: "Quartzite Primo", price: 59.99 },
];

describe("shopUtils", () => {
  describe("calculateTotal", () => {
    it("should return 0 when wishlist is empty", () => {
      expect(calculateTotal([], products)).toBe(0);
    });

    it("should return correct total for one item", () => {
      expect(calculateTotal(["1"], products)).toBe(49.99);
    });

    it("should return correct total for multiple items", () => {
      expect(calculateTotal(["1", "2"], products)).toBe(49.99 + 39.99);
    });

    it("should ignore invalid IDs", () => {
      expect(calculateTotal(["99", "1"], products)).toBe(49.99);
    });
  });

  describe("getProductById", () => {
    it("should return the correct product", () => {
      const product = getProductById("2", products);
      expect(product?.name).toBe("Verdelite Primo");
    });

    it("should return null if not found", () => {
      expect(getProductById("999", products)).toBeNull();
    });
  });

  describe("sortByPrice", () => {
    it("should sort products ascending", () => {
      const result = sortByPrice(products, "asc");
      expect(result.map((p) => p.price)).toEqual([39.99, 49.99, 59.99]);
    });

    it("should sort products descending", () => {
      const result = sortByPrice(products, "desc");
      expect(result.map((p) => p.price)).toEqual([59.99, 49.99, 39.99]);
    });
  });
});
