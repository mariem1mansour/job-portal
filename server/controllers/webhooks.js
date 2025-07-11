// import { Webhook } from "svix";
// import User from "../models/User.js";

// //Api controller function to manage clerk user with database

// export const clerkWebhooks = async (req, res) => {
//   try {
//     console.log("Webhook reçu 🔸 ! Type:", req.body.type); // 🔥 LOG
//     //create a svix instance with clerk webhook secret
//     const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
//     //verify headers
//   const payload =  await whook.verify(JSON.stringify(req.body), {
//       "svix-id": req.headers["svix-id"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//       "svix-signature": req.headers["svix-signature"],
//     });
//     //getting data from request body
//     const { data, type } = payload;
//     //switch case pour different events
//     switch (type) {
//       case 'user.created': {
//         const userData = {
//           _id: data.id,
//           email: data.email_addresses[0].email_address,
//           name: data.first_name + " " + data.last_name,
//           image: data.image_url,
//           resume: "",
//         };
//         console.log("Création de l'utilisateur 🔸:", userData); // 🔥 LOG
//         await User.create(userData);
//         console.log("✅ Utilisateur enregistré dans la DB"); // 🔥 LOG
//         res.json({});
//         break;
//       }
//       case 'user.updated': {
//         const userData = {
//           email: data.email_addresses[0].email_address,
//           name: data.first_name + " " + data.last_name,
//           image: data.image_url,
//         };
//         await User.findByIdAndUpdate(data.id, userData);
//         console.log("✅ Utilisateur mis à jour"); // 🔥 LOG
//         res.json({});
//         break;
//       }
//       case 'user.deleted': {
//         await User.findByIdAndDelete(data.id);
//         console.log("✅ Utilisateur supprimé"); // 🔥 LOG
//         res.json({});
//         break;
//       }
//       default:
//         console.log("⚠️ Événement non géré");
//         break;
//     }
//     //res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("❌ Webhook error:", error.message); // Affiche l'erreur exacte
//     res.json({success: false,message: "Webhook Error ❌",error: error.message,});
//   }
// };
// export const clerkWebhooks = async (req, res) => {
//   try {
//     console.log("🔸 Webhook reçu ! Type:", req.body?.type);

//     // ✅ Répond immédiatement pour éviter timeout
//     res.status(200).json({ success: true });

//     const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

//     const payload = await whook.verify(JSON.stringify(req.body), {
//       "svix-id": req.headers["svix-id"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//       "svix-signature": req.headers["svix-signature"],
//     });
//     const { data, type } = payload;
// // const { data, type } = req.body;
//     switch (type) {
//       case "user.created": {
//         const userData = {
//           _id: data.id,
//           email: data.email_addresses[0]?.email_address || "",
//           name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
//           image: data.image_url,
//           resume: "",
//         };

//         const existingUser = await User.findById(data.id);
//         if (!existingUser) {
//           await User.create(userData);
//           console.log("✅ Nouvel utilisateur créé :", userData);
//         } else {
//           console.log("⚠️ Utilisateur déjà existant :", data.id);
//         }

//         break;
//       }

//       case "user.updated":
//         await User.findByIdAndUpdate(data.id, {
//           email: data.email_addresses[0]?.email_address || "",
//           name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
//           image: data.image_url,
//         });
//         break;

//       case "user.deleted":
//         await User.findByIdAndDelete(data.id);
//         break;

//       default:
//         console.log("❓ Événement inconnu :", type);
//     }
//   } catch (error) {
//     // console.error("❌ Erreur critique :", error); // ✅ Très visible
//     //Sentry.captureException(error); // ✅ Envoie à Sentry aussi
//     //res.status(400).json({ success: false });
//     console.error("❌ Erreur lors du traitement du webhook :", error.message);
//   }
// };

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
