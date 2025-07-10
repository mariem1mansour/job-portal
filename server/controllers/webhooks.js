import { Webhook } from "svix";
import User from "../models/User.js";

//Api controller function to manage clerk user with database

export const clerkWebhooks = async (req, res) => {
  try {
    console.log("Webhook reçu 🔸 ! Type:", req.body.type); // 🔥 LOG
    //create a svix instance with clerk webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    //verify headers
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });
    //getting data from request body
    const { data, type } = req.body;
    //switch case pour different events
    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
          resume: "",
        };
        console.log("Création de l'utilisateur 🔸:", userData); // 🔥 LOG
        await User.create(userData);
        console.log("✅ Utilisateur enregistré dans la DB"); // 🔥 LOG
        res.json({});
        break;
      }
      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        console.log("✅ Utilisateur mis à jour"); // 🔥 LOG
        res.json({});
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        console.log("✅ Utilisateur supprimé"); // 🔥 LOG
        res.json({});
        break;
      }
      default:
        console.log("⚠️ Événement non géré");
        break;
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Webhook error:", error.message); // Affiche l'erreur exacte
    res
      .status(400)
      .json({
        success: false,
        message: "Webhook Error ❌",
        error: error.message,
      });
  }
};
