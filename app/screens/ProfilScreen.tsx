import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, Alert } from "react-native";
import { auth, db } from "../../firebaseConfig";
import { collection, query, where, getDocs, updateDoc, doc, getDoc } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";

export default function ProfilScreen() {
  const [code, setCode] = useState("");
  const [unlockedItems, setUnlockedItems] = useState<string[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;
  
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
  
      if (userSnap.exists()) {
        console.log("📌 Données récupérées depuis Firestore :", userSnap.data());
        setUnlockedItems(userSnap.data().unlocked_items || []);
      } else {
        console.log("❌ Aucune donnée trouvée pour cet utilisateur.");
      }
    };
  
    fetchUserData();
  }, []);  

  const handleCodeValidation = async () => {
    if (!code.trim()) {
      Alert.alert("Erreur", "Veuillez entrer un code.");
      return;
    }
  
    try {
      const q = query(collection(db, "purchases"), where("code", "==", code));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const purchaseDoc = querySnapshot.docs[0];
        const purchaseData = purchaseDoc.data();
  
        const user = auth.currentUser;
        if (!user) {
          Alert.alert("Erreur", "Vous devez être connecté.");
          return;
        }
  
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          unlocked_items: [...unlockedItems, purchaseData.item],
        });
  
        // Suppression du code une fois utilisé
        await deleteDoc(doc(db, "purchases", purchaseDoc.id));
  
        setUnlockedItems([...unlockedItems, purchaseData.item]);
        Alert.alert("Succès", "Vêtement débloqué !");
      } else {
        Alert.alert("Erreur", "Code invalide ou déjà utilisé.");
      }
    } catch (error) {
      console.error("Erreur validation code :", error);
      Alert.alert("Erreur", "Impossible de vérifier le code.");
    }
  };  

  const allItems = [
    { id: "9638803570952", name: "Lapidaire Noir", image: require("../../assets/images/clothes/tshirt_front.png") },
    { id: "9638888177928", name: "Verdelite Primo", image: require("../../assets/images/clothes/new_flatlay_front+verdelite.png") },
    { id: "9621285208328", name: "Quartzite Primo", image: require("../../assets/images/clothes/quartziteprimo.jpg") },
  ];

  return (
    <View>
      <TextInput
        placeholder="Entrer votre code ici"
        value={code}
        onChangeText={setCode}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TouchableOpacity onPress={handleCodeValidation} style={{ backgroundColor: "#a7c191", padding: 10 }}>
        <Text style={{ color: "#black" }}>Valider le code</Text>
      </TouchableOpacity>

      <FlatList
        data={allItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ opacity: unlockedItems.includes(item.id) ? 1 : 0.3 }}>
            <Image source={item.image} style={{ width: 100, height: 100 }} />
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}
