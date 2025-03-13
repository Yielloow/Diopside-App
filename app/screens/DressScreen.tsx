import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function DressScreen() {
  return (
    <View style={styles.container}>
      {/* Bouton Home */}
      <TouchableOpacity style={styles.backButton}>
        <Link href="/screens/HomeScreen">
          <Ionicons name="home" size={28} color="#a7c191" />
        </Link>
      </TouchableOpacity>

      {/* Texte de test affiché au centre */}
      <Text style={styles.testText}>Test réussi !</Text>

      {/* Navbar */}
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
          <TouchableOpacity style={styles.navButton}>
            <Ionicons name="person" size={36} color="#a7c191" />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    justifyContent: "center", // Centrer verticalement
    alignItems: "center", // Centrer horizontalement
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
  navButton: {
    margin: -15,
    padding: 10,
    alignItems: "center",
  },
  testText: {
    fontSize: 24,
    color: "#a7c191",
    fontWeight: "bold",
    position: "absolute",
    top: "40%", // Ajuste la position verticale
  },
});
