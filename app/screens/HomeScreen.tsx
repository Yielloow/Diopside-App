import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function HomeScreen() {
  const [username, setUsername] = useState<string | null>(null);
  const [level, setLevel] = useState<number>(1);
  const [exp, setExp] = useState<number>(0);
  const [achievements, setAchievements] = useState<number>(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUsername(userData.username);
            setLevel(userData.level || 1);
            setExp(userData.exp || 0);
            setAchievements(userData.achievements || 0);
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur :", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container} testID="home-screen">
      <View style={styles.headerContainer}>
      <Text style={styles.welcomeText}>
        {username ? `Salut, ${username} 👋` : 'Chargement des données...'}
      </Text>
      </View>
      <Link href="/screens/ProfilScreen" asChild>
        <TouchableOpacity style={styles.profileInfoContainer}>
          <Text style={styles.level}>🔹 Niveau {level}</Text>
          <Text style={styles.exp}>⚡ EXP: {exp} pts</Text>
          <Text style={styles.achievements}>🏆 {achievements} succès</Text>
        </TouchableOpacity>
      </Link>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Nos Sélections</Text>
        <View style={styles.productsContainer}>
          <TouchableOpacity style={styles.product}>
            <Image source={require("../../assets/images/clothes/new_flatlay_front_verdelite.png")} style={styles.productImage} />
            <Text style={styles.productText}>Diopside Verdelite</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.product}>
            <Image source={require("../../assets/images/clothes/tshirt_front.png")} style={styles.productImage} />
            <Text style={styles.productText}>Lapidaire Noir</Text>
          </TouchableOpacity>
        </View>
        
        {/* Déplacement du container Actualités sous "Nos Sélections" */}
        <Text style={styles.newsTitle}>Actualités de Diopside</Text>
        <View style={styles.newsContainer}>
          <Text style={styles.newsText}>- Nouveau hoodie exclusif disponible !</Text>
          <Text style={styles.newsText}>- Mise à jour du catalogue : Découvrez nos nouveaux modèles !</Text>
          <Text style={styles.newsText}>- Livraison express maintenant disponible</Text>
        </View>
      </ScrollView>

      <View style={styles.navbar}>
        <Link href="/screens/ShopScreen" asChild>
          <TouchableOpacity style={styles.navButton}>
            <Ionicons name="cart" size={36} color="#a7c191" />
          </TouchableOpacity>
        </Link>
        <Link href="/screens/DiscussScreen" asChild>
          <TouchableOpacity style={styles.navButton} testID="discuss-button">
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
  newsContainer: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 15,
    margin: 20,
  },
  newsTitle: {
    paddingTop: 10,
    fontSize: 22,
    color: "#a7c191",
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  newsText: {
    fontSize: 16,
    color: "#ccc",
  },
  container: {
    flex: 1,
    backgroundColor: "#222",
  },
  headerContainer: {
    padding: 20,
    alignItems: "flex-end",
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#a7c191",
  },
  profileInfoContainer: {
    marginHorizontal: 20,
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  level: {
    fontSize: 18,
    color: "#a7c191",
    fontWeight: "bold",
  },
  exp: {
    fontSize: 16,
    color: "#ccc",
  },
  achievements: {
    fontSize: 16,
    color: "#ccc",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  sectionTitle: {
    paddingTop: 10,
    fontSize: 22,
    color: "#a7c191",
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  productsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  product: {
    alignItems: "center",
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 10,
  },
  productImage: {
    width: 120,
    height: 120,
    marginBottom: 5,
  },
  productText: {
    color: "#a7c191",
    fontWeight: "bold",
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
