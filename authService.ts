import { sendEmailVerification, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { db } from "./firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

// 🔹 Génère un ID unique pour le nom d'utilisateur (ex : #1234)
function generateUserTag(): string {
  return `#${Math.floor(1000 + Math.random() * 9998999)}`; // Génère un ID entre #1000 et #9999999
}

// 🔹 Inscription d'un utilisateur avec nom d'utilisateur
export async function signUp(email: string, password: string, username: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password); // Création de l'utilisateur
    const user = userCredential.user;

    // Génère un tag unique pour le nom d'utilisateur
    const userTag = generateUserTag();

    console.log("Utilisateur créé avec succès :", user);

    // Sauvegarde dans Firestore avec le nom d'utilisateur et le tag
    await saveUserToFirestore(user.uid, user.email!, username, userTag);
    console.log("Utilisateur enregistré dans Firestore.");

    // Envoi de l'email de vérification
    await sendVerificationEmail(user);
    console.log("Email de vérification envoyé.");

    return { user, username, userTag }; // Retourne les informations de l'utilisateur
  } catch (error: any) {
    console.error("Erreur lors de l'inscription :", error.message);
    throw new Error(error.message || "Une erreur est survenue lors de l'inscription.");
  }
}

// 🔹 Connexion d'un utilisateur
export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (!user.emailVerified) {
      throw new Error("Veuillez vérifier votre compte avant de vous connecter.");
    }

    return user;
  } catch (error: any) {
    throw new Error(error.message || "Une erreur est survenue lors de la connexion.");
  }
}

// 🔹 Déconnexion d'un utilisateur
export async function logOut() {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message || "Une erreur est survenue lors de la déconnexion.");
  }
}

// 🔹 Envoi de l'email de vérification
async function sendVerificationEmail(user: any) {
  try {
    await sendEmailVerification(user);
  } catch (error: any) {
    throw new Error("Impossible d'envoyer l'email de vérification.");
  }
}

// 🔹 Sauvegarde dans Firestore avec nom d'utilisateur et tag
async function saveUserToFirestore(uid: string, email: string, username: string, userTag: string) {
  try {
    const userDoc = doc(db, "users", uid);
    await setDoc(userDoc, {
      email,
      username, // Nom d'utilisateur
      userTag,  // Tag unique
      createdAt: new Date().toISOString(),
      emailVerified: false,
    });
  } catch (error: any) {
    throw new Error("Erreur lors de l'enregistrement dans Firestore.");
  }
}
