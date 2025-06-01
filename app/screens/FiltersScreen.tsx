// 🟢 Tous les imports en haut
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  Linking,
  Image,
} from "react-native";
import { Camera, useCameraDevices, CameraDevice } from "react-native-vision-camera";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Platform } from 'react-native';




// ✅ Fallback Detox – affiché uniquement en test
const DetoxFallback = () => (
  <View style={styles.container}>
    <Text style={styles.title}>🧪 Mode test actif</Text>
    <Text style={styles.message}>La caméra est désactivée pendant les tests Detox.</Text>
  </View>
);

// ✅ Composant principal avec caméra
const FilterScreen = () => {
  const isWeb = Platform.OS === 'web';
  const isDetox = process.env.DETOX === 'true';

  if (isWeb || isDetox) return <DetoxFallback />;

  const { Camera, useCameraDevices } = require("react-native-vision-camera");

  const cameraRef = useRef<Camera>(null);
  const devices = useCameraDevices();
  const [cameraPosition, setCameraPosition] = useState<"back" | "front">("back");
  const [hasPermission, setHasPermission] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const device: CameraDevice | undefined = devices?.find(
  (d: CameraDevice) => d.position === cameraPosition
  );


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

  const toggleCamera = () => {
    setCameraPosition((prev) => (prev === "back" ? "front" : "back"));
  };

  const capturePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePhoto({});
        setPhotoUri("file://" + photo.path);
      } catch (error) {
        console.error("Erreur de capture :", error);
      }
    }
  };

  const cancelPreview = () => setPhotoUri(null);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Link href="/screens/HomeScreen">
          <Ionicons name="home" size={28} color="#a7c191" />
        </Link>
      </TouchableOpacity>

      <View style={styles.navbar}>
        <Text style={styles.title}>Sois magnifique</Text>
      </View>

      {hasPermission ? (
        photoUri ? (
          <View style={styles.previewContainer}>
            <Image source={{ uri: photoUri }} style={styles.previewImage} />
            <TouchableOpacity onPress={cancelPreview} style={styles.closeButton}>
              <Ionicons name="close" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
        ) : device ? (
          <>
            <Camera
              ref={cameraRef}
              style={styles.camera}
              device={device}
              isActive={true}
              photo={true}
            />
            <TouchableOpacity style={styles.switchButton} onPress={toggleCamera}>
              <Ionicons name="camera-reverse" size={28} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.captureButton} onPress={capturePhoto} />
          </>
        ) : (
          <Text style={styles.errorText}>Chargement de la caméra...</Text>
        )
      ) : (
        <Text style={styles.errorText}>Accès à la caméra refusé</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  backButton: { position: "absolute", top: 40, left: 20, zIndex: 10 },
  navbar: { alignItems: "center", padding: 20 },
  title: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  camera: { flex: 1 },
  errorText: { color: "red", textAlign: "center", marginTop: 20 },
  switchButton: {
    position: "absolute",
    bottom: 120,
    alignSelf: "center",
    backgroundColor: "#333",
    borderRadius: 30,
    padding: 15,
    zIndex: 10,
  },
  captureButton: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    borderWidth: 4,
    borderColor: "#aaa",
    zIndex: 10,
  },
  previewContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
  },
  previewImage: {
    flex: 1,
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#f44336",
    padding: 15,
    borderRadius: 30,
  },
  message: {
    color: "#aaa",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});

export default FilterScreen;
