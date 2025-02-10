import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Root from "./root"; // ✅ Root contient la navigation

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Root />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
});
