import {onSchedule} from "firebase-functions/v2/scheduler";
import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();

export const cleanupOldMessages = onSchedule(
  "every 24 hours",
  async () => {
    const threeMonthsAgo = admin.firestore.Timestamp.fromDate(
      new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
    ); // Convertir en Timestamp Firestore

    try {
      const messagesRef = db.collection("general_chat");

      const snapshot = await messagesRef
        .where("timestamp", "<", threeMonthsAgo)
        .get(); // Correction max-len

      if (snapshot.empty) {
        console.log("Aucun message à supprimer.");
        return;
      }

      const batch = db.batch();
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();

      console.log(`${snapshot.size} messages supprimés.`);
    } catch (error) {
      console.error("Erreur lors du nettoyage des messages :", error);
    }
  });
