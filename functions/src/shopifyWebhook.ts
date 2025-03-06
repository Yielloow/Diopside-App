import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

export const shopifyWebhook = functions.https.onRequest(async (req, res) => {
  console.log("🔵 Webhook Shopify reçu :", JSON.stringify(req.body, null, 2));
  try {
    // Récupération des données
    const email = req.body?.customer?.email || null;
    const lineItems = req.body?.line_items || [];

    console.log("📦 Données extraites - Email:", email,
      "| Line Items:", lineItems.length);

    if (!email || lineItems.length === 0) {
      console.error("❌ Erreur : Données invalides reçues", req.body);
      res.status(400).json({error: "Commande invalide"});
      return;
    }

    // Liste des produits achetés (on ne prend que `product_id`)
    const purchasedItems = lineItems.map((item) => ({
      email,
      code: Math.random().toString(36).substr(2, 10).toUpperCase(),
      item: item.product_id.toString(), // Seul `product_id` est stocké
      createdAt: admin.firestore.Timestamp.now(),
    }));

    // Enregistrement en batch pour Firestore (optimisé)
    const batch = db.batch();
    purchasedItems.forEach((purchase) => {
      const purchaseRef = db.collection("purchases").doc();
      batch.set(purchaseRef, purchase);
      console.log(`✅ Produit ajouté : ${purchase.item} 
        | Code: ${purchase.code}`);
    });

    await batch.commit();

    console.log("✅ Tous les produits ont été enregistrés avec succès.");

    res.status(200).json({success: true,
      codes: purchasedItems.map((p) => p.code)});
  } catch (error) {
    console.error("❌ Erreur Webhook Shopify :", error);
    res.status(500).json({error: "Erreur serveur"});
  }
});
