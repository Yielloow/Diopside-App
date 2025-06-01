import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { signUp, signIn } from "../../authService";
import CustomAlert from "../components/CustomAlert";


// 🔹 Définition des types pour la navigation
type RootStackParamList = {
  SignIn: undefined;
  Home: undefined;
};

type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, "SignIn">;
type SignInScreenProps = {
  navigation: SignInScreenNavigationProp;
};

export default function SignInScreen({ navigation }: SignInScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // 🔹 Ajout du champ "Nom d'utilisateur"
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const goTo = (screenName: keyof RootStackParamList) => {
    navigation.navigate(screenName);
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez remplir les champs Email et Mot de passe.");
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      goTo("Home");
    } catch (error: any) {
      setAlertMessage(error.message || "Une erreur est survenue.");
      setAlertVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!email || !password || !username) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);
    try {
      const result = await signUp(email, password, username); // Passe le nom d'utilisateur à signUp
      setAlertMessage(
        `Inscription réussie ! Bienvenue, ${result.username}${result.userTag}. Vérifie ton email pour confirmer ton compte.`
      );
      setAlertVisible(true);
    } catch (error: any) {
      setAlertMessage(error.message || "Une erreur est survenue.");
      setAlertVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../../assets/images/Original logo Diopside white.png")} // 🔹 Logo ajouté
        style={styles.logo}
      />

      {/* Titre */}
      <Text style={styles.title}>Bienvenue</Text>
      <Text style={styles.subtitle}>Connectez-vous ou créez un compte</Text>

      {/* Champs d'entrée */}
      <TextInput
        testID="username-input"
        placeholder="Nom d'utilisateur"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TextInput
        testID="email-input"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        placeholderTextColor="#999"
      />

      <TextInput
        testID="password-input"
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#999"
      />

      {/* Boutons */}
      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <>
          <TouchableOpacity
            testID="login-button"
            style={styles.primaryButton}
            onPress={handleSignIn}
            activeOpacity={0.7}
          >
            <Text style={styles.primaryButtonText}>Se connecter</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleSignUp}
            activeOpacity={0.7} // 🔹 Effet de press pour le bouton
          >
            <Text style={styles.secondaryButtonText}>S'inscrire</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Alertes */}
      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#a7c191",
  },
  logo: {
    width: 200, // Taille du logo
    height: 200,
    alignSelf: "center",
    marginBottom: 30,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333333", // Couleur sombre
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#555555", // Couleur sombre
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Ombre pour Android
  },
  primaryButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // Ombre pour Android
  },
  secondaryButton: {
    backgroundColor: "#FFA726",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // Ombre pour Android
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
