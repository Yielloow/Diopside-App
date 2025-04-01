import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

// 🔹 Type attendu pour un item Shopify (simplifié ici)
type ShopifyLineItem = {
  product_id: number;
};

// 🔹 Type que tu vas stocker dans Firestore
type PurchasedItem = {
  email: string;
  code: string;
  item: string; // l'ID du produit converti en string
  createdAt: FirebaseFirestore.Timestamp;
};

export const shopifyWebhook = functions.https.onRequest(async (req, res) => {
  console.log("🔵 Webhook Shopify reçu :", JSON.stringify(req.body, null, 2));
  try {
    const email: string | null = req.body?.customer?.email || null;
    const lineItems: ShopifyLineItem[] = req.body?.line_items || [];

    console.log("📦 Données extraites - Email:", email, "| Line Items:", lineItems.length);

    if (!email || lineItems.length === 0) {
      console.error("❌ Erreur : Données invalides reçues", req.body);
      res.status(400).json({ error: "Commande invalide" });
      return;
    }

    // ✅ Typé explicitement
    const purchasedItems: PurchasedItem[] = lineItems.map((item: ShopifyLineItem) => ({
      email,
      code: Math.random().toString(36).substr(2, 10).toUpperCase(),
      item: item.product_id.toString(),
      createdAt: admin.firestore.Timestamp.now(),
    }));

    const batch = db.batch();

    purchasedItems.forEach((purchase: PurchasedItem) => {
      const purchaseRef = db.collection("purchases").doc();
      batch.set(purchaseRef, purchase);
      console.log(`✅ Produit ajouté : ${purchase.item} | Code: ${purchase.code}`);
    });

    await batch.commit();

    console.log("✅ Tous les produits ont été enregistrés avec succès.");

    res.status(200).json({
      success: true,
      codes: purchasedItems.map((p: PurchasedItem) => p.code),
    });
  } catch (error) {
    console.error("❌ Erreur Webhook Shopify :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
