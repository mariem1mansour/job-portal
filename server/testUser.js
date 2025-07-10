import mongoose from "mongoose";
import User from "./models/User.js";

mongoose.connect("mongodb+srv://mariemmansour7777:TUr4H7PTxFpLDPk6@jobseeker.wt06mai.mongodb.net/job-portal");

const testUser = async () => {
  const user = await User.create({
    _id: "manual_123",
    name: "Test User",
    email: "test@example.com",
    image: "https://example.com/avatar.png ",
    resume: "",
  });

  console.log("✅ Utilisateur créé manuellement", user);
};

testUser();