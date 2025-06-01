import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { WebView } from "react-native-webview"; // ✅ import WebView

export default function DressScreen() {
  return (
    <View style={styles.container}>
      {/* ✅ WebGL intégré ici */}
      <WebView
        source={{ uri: "https://diopside-app.web.app" }} // remplace par ton vrai lien
        style={styles.webview}
      />


      {/* Bouton retour (haut droit) */}
      <TouchableOpacity style={styles.backButton}>
        <Link href="/screens/HomeScreen">
          <Ionicons name="home" size={28} color="#a7c191" />
        </Link>
      </TouchableOpacity>

      {/* Barre de navigation */}
      <View style={styles.navbar}>
        <Link href="/screens/ShopScreen" asChild>
          <TouchableOpacity style={styles.navButton} testID="nav-button">
            <Ionicons name="cart" size={36} color="#a7c191" />
          </TouchableOpacity>
        </Link>
        <Link href="/screens/DiscussScreen" asChild>
          <TouchableOpacity style={styles.navButton} testID="nav-button">
            <Ionicons name="chatbubble" size={36} color="#a7c191" />
          </TouchableOpacity>
        </Link>
        <Link href="/screens/FiltersScreen" asChild>
          <TouchableOpacity style={styles.navButton} testID="nav-button">
            <Ionicons name="filter" size={36} color="#a7c191" />
          </TouchableOpacity>
        </Link>
        <Link href="/screens/DressScreen" asChild>
          <TouchableOpacity style={styles.navButton} testID="nav-button">
            <Ionicons name="shirt" size={36} color="#a7c191" />
          </TouchableOpacity>
        </Link>
        <Link href="/screens/ProfilScreen" asChild>
          <TouchableOpacity style={styles.navButton} testID="nav-button">
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
  },
  webview: {
    flex: 1,
    marginBottom: 90, // Laisse de la place pour la navbar
  },
  avatarButton: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 10,
    zIndex: 10,
  },
  backButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 10,
    zIndex: 10,
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
});
