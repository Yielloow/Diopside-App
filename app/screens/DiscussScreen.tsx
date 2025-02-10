import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  LayoutAnimation,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../../firebaseConfig";
import {
  doc,
  getDoc,
  where,
  getDocs,
  writeBatch,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { useRouter } from "expo-router";

export default function DiscussScreen() {
  const [messages, setMessages] = useState<
    { id: string; userId: string; username: string; message: string; timestamp: any; avatar: string }[]
  >([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isAtBottom, setIsAtBottom] = useState(true);
  const user = auth.currentUser;
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const q = query(collection(db, "general_chat"), orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      LayoutAnimation.easeInEaseOut();
      setMessages(snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as {
          userId: string;
          username: string;
          message: string;
          timestamp: any;
          avatar: string;
        }),
      })));

      if (isAtBottom) {
        flatListRef.current?.scrollToEnd({ animated: true });
      }
    });

    return () => unsubscribe();
  }, [user, isAtBottom]);

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    setIsAtBottom(isBottom);
  };

  const sendMessage = async () => {
    if (inputMessage.trim() === "") return;
  
    // Récupère le nom d'utilisateur depuis Firestore si nécessaire
    const getUserDisplayName = async (userId: string | undefined) => {
      if (!userId) return "Utilisateur";
      try {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          return userDoc.data()?.username || "Utilisateur";
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du nom d'utilisateur :", error);
      }
      return "Utilisateur";
    };
  
    const username = user?.displayName || (await getUserDisplayName(user?.uid)) || "Utilisateur";
  
    await addDoc(collection(db, "general_chat"), {
      userId: user?.uid,
      username: username, // Utilise le nom d'utilisateur récupéré
      message: inputMessage,
      timestamp: serverTimestamp(),
      avatar: user?.photoURL || "https://example.com/default-avatar.png",
    });
  
    setInputMessage("");
  };  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Discussion Générale</Text>
      </View>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        onScroll={handleScroll}
        renderItem={({ item }) => {
          const isUserMessage = item.userId === user?.uid;
          return (
            <View style={[styles.messageContainer, isUserMessage ? styles.myMessage : styles.otherMessage]}>
              {!isUserMessage && <Image source={{ uri: item.avatar }} style={styles.avatar} />}
              <View style={styles.messageContent}>
                <View style={styles.messageHeader}>
                  <Text style={styles.username}>{item.username}</Text>
                  <Text style={styles.timestamp}>
                    {new Date(item.timestamp?.toDate()).toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </View>
                <Text style={styles.message}>{item.message}</Text>
              </View>
              {isUserMessage && <Image source={{ uri: item.avatar }} style={styles.avatar} />}
            </View>
          );
        }}
      />
      {!isAtBottom && (
        <TouchableOpacity
          style={styles.scrollToBottomButton}
          onPress={() => flatListRef.current?.scrollToEnd({ animated: true })}
        >
          <Ionicons name="arrow-down" size={24} color="#fff" />
        </TouchableOpacity>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="Écrivez un message..."
          placeholderTextColor="#ccc"
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#333",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#a7c191",
    marginLeft: 10,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 10,
    marginBottom: 5,
    maxWidth: "80%",
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#a7c191",
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#444",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
    backgroundColor: "#fff",
  },
  messageContent: {
    flex: 1,
  },
  username: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  messageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  message: {
    fontSize: 15,
    color: "#fff",
  },
  timestamp: {
    fontSize: 12,
    color: "#bbb",
    marginTop: 3,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
  },
  sendButton: {
    marginLeft: 10,
  },
  scrollToBottomButton: {
    position: "absolute",
    bottom: 100, // Ajusté pour être proche du bas
    alignSelf: "center", // Centre le bouton horizontalement
    backgroundColor: "#000", // Noir pour le bouton
    borderRadius: 25, // Rendu plus arrondi
    padding: 12, // Taille légèrement augmentée
    zIndex: 10,
    shadowColor: "#000", // Ombre noire
    shadowOffset: { width: 0, height: 4 }, // Position de l'ombre
    shadowOpacity: 0.3, // Légère transparence
    shadowRadius: 5, // Diffusion de l'ombre
    elevation: 5, // Ombre sur Android
  },  
});
