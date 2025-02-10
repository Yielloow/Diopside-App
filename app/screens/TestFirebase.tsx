import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function App() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Utilisateur connecté :", user.email);
      } else {
        console.log("Aucun utilisateur connecté.");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <View>
      <Text>Bienvenue sur l'App Expo Go avec Firebase !</Text>
    </View>
  );
}
