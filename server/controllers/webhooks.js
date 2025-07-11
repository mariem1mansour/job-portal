import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  try {
    // 🔍 Log les headers et le body reçus
    console.log("🔸 Webhook reçu - Headers:", req.headers);
    console.log("🔸 Webhook reçu - Body brut:", req.body);

    // ✅ Répond immédiatement à Clerk/Svix
    res.status(200).json({ success: true });

    // ⚠️ Vérifie que req.body existe
    // if (!req.body || !req.body.data || !req.body.type) {
    //   console.warn("⚠️ Corps de la requête invalide", req.body);
    //   return;
    // }
    if (!req.body || typeof req.body !== "object") {
      console.warn("⚠️ Corps de la requête invalide", req.body);
      return res.status(400).json({ success: false, message: "Invalid body" });
    }
    // 🔐 Vérifie la signature Svix
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const payload = await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    console.log("📦 Payload vérifié :", payload); // ✅ Pour debug

    const { data, type } = payload;

    // ✅ Utilise payload.type & payload.data
    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses?.[0]?.email_address || "",
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          image: data.image_url,
          resume: "",
        };

        const existingUser = await User.findById(data.id);
        if (!existingUser) {
          await User.create(userData);
          console.log("✅ Nouvel utilisateur créé :", userData);
        } else {
          console.log("⚠️ Utilisateur existe déjà");
        }
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses?.[0]?.email_address || "",
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          image: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        console.log("🔄 Utilisateur mis à jour");
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        console.log("🗑️ Utilisateur supprimé");
        break;
      }

      default:
        console.log("❓ Événement non géré :", type);
    }
  } catch (error) {
    console.error("❌ Erreur webhook :", error.message);
  }
};
