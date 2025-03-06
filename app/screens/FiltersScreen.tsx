import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert, Linking } from "react-native";
import { Camera, useFrameProcessor } from "react-native-vision-camera";
import { runOnJS } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function FilterScreen() {
  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    runOnJS(console.log)("Processing frame...");
  }, []);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    async function requestCameraPermission() {
      const status = await Camera.requestCameraPermission();
      if (status === "granted") {
        setHasPermission(true);
      } else {
        Alert.alert(
  "Permission refusée",
  "L'application a besoin d'accéder à la caméra.",
  [
    { text: "Annuler", style: "cancel" },
    { text: "Ouvrir les paramètres", onPress: () => Linking.openSettings() }
  ]
);
      }
    }
    requestCameraPermission();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Link href="/screens/HomeScreen">
          <Ionicons name="home" size={28} color="#a7c191" />
        </Link>
      </TouchableOpacity>
      <View style={styles.navbar}>
        <Text style={styles.title}>Vision Camera Test</Text>
      </View>
      {hasPermission ? (
        <Camera
          style={styles.camera}
          device={Camera.getAvailableCameraDevices()[0]}
          isActive={true}
          frameProcessor={frameProcessor}
        />
      ) : (
        <Text style={styles.errorText}>Accès à la caméra refusé</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  backButton: { position: "absolute", top: 40, left: 20, zIndex: 10 },
  navbar: { alignItems: "center", padding: 20 },
  title: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  camera: { flex: 1 },
  errorText: { color: "red", textAlign: "center", marginTop: 20 },
});
