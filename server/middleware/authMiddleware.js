import jwt from "jsonwebtoken";
import Company from "../models/Company.js";

/**Objectif du middleware
Vérifier si l’utilisateur (ici une entreprise) est connecté en utilisant un token JWT .
Si oui → il autorise la requête.
Si non → il renvoie une erreur d’accès.  */
export const protectCompany = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorized ! Log In Again ⚠️",
    });
  }

  try {
    //On utilise jwt.verify() pour décoder et valider le token avec la clé secrète (JWT_SECRET)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    /**
   * Trouver l’entreprise liée au token
     On cherche l’entreprise dans la base de données grâce à l’id contenu dans le token
     Puis on attache cette entreprise à l’objet req (req.company) pour l’utiliser dans les routes suivantes
   */
    req.company = await Company.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
