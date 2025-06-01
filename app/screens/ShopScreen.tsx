import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { calculateTotal, sortByPrice } from "../utils/shopUtils";

const products = [
  { id: "1", name: "Lapidaire Noir", price: 49.99 },
  { id: "2", name: "Verdelite Primo", price: 39.99 },
  { id: "3", name: "Quartzite Primo", price: 59.99 },
];

export default function ShopScreen() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const total = calculateTotal(wishlist, products);

  return (
    <View style={styles.container} testID="shop-screen">
      {selectedProduct && (
        <Text testID="selected-product" style={styles.selectedText}>
          Produit sélectionné : {selectedProduct}
        </Text>
      )}
      <TouchableOpacity
        testID="sort-toggle"
        onPress={() => setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))}
        style={styles.sortButton}
      >
        <Text style={styles.sortText}>
          Trier par prix : {sortDirection === "asc" ? "↑ croissant" : "↓ décroissant"}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={sortByPrice(products, sortDirection)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isInWishlist = wishlist.includes(item.id);
          return (
            <View style={styles.productWrapper}>
              <TouchableOpacity
                testID={`product-${item.id}`}
                style={styles.productButton}
                onPress={() => setSelectedProduct(item.name)}
              >
                <Text style={styles.productText}>{item.name}</Text>
                <Text style={styles.priceText}>{item.price.toFixed(2)} €</Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID={`wishlist-${item.id}`}
                style={styles.wishlistButton}
                onPress={() => toggleWishlist(item.id)}
              >
                <Ionicons
                  name={isInWishlist ? "heart" : "heart-outline"}
                  size={24}
                  color={isInWishlist ? "#e74c3c" : "#a7c191"}
                />
              </TouchableOpacity>
            </View>
          );
        }}
        contentContainerStyle={{ padding: 20 }}
      />

      <Text style={styles.totalText} testID="wishlist-total">
        Total de la wishlist : {total.toFixed(2)} €
      </Text>

      <TouchableOpacity style={styles.backButton} testID="btn-home">
        <Link href="/screens/HomeScreen">
          <Ionicons name="home" size={28} color="#a7c191" />
        </Link>
      </TouchableOpacity>

      <View style={styles.navbar}>
        <Link href="/screens/ShopScreen" asChild>
          <TouchableOpacity style={styles.navButton}>
            <Ionicons name="cart" size={36} color="#a7c191" />
          </TouchableOpacity>
        </Link>
        <Link href="/screens/DiscussScreen" asChild>
          <TouchableOpacity style={styles.navButton}>
            <Ionicons name="chatbubble" size={36} color="#a7c191" />
          </TouchableOpacity>
        </Link>
        <Link href="/screens/FiltersScreen" asChild>
          <TouchableOpacity style={styles.navButton}>
            <Ionicons name="filter" size={36} color="#a7c191" />
          </TouchableOpacity>
        </Link>
        <Link href="/screens/DressScreen" asChild>
          <TouchableOpacity style={styles.navButton}>
            <Ionicons name="shirt" size={36} color="#a7c191" />
          </TouchableOpacity>
        </Link>
        <Link href="/screens/ProfilScreen" asChild>
          <TouchableOpacity testID="profil-button" style={styles.navButton}>
            <Ionicons name="person" size={36} color="#a7c191" />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#222" },
  productWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  productButton: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 10,
    flex: 1,
  },
  wishlistButton: { marginLeft: 10, padding: 10 },
  productText: { color: "#a7c191", fontSize: 18 },
  priceText: { color: "#ccc", fontSize: 14 },
  selectedText: {
    color: "#fff",
    fontSize: 16,
    padding: 15,
    textAlign: "center",
  },
  totalText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    padding: 10,
    marginTop: -10,
  },
  backButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 10,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#333",
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 90,
    alignItems: "center",
  },
  navButton: { margin: -15, padding: 10, alignItems: "center" },
  sortButton: {
    backgroundColor: "#444",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
    marginVertical: 10,
  },
  sortText: {
    color: "#fff",
    fontSize: 16,
  },
  
});
