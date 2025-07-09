import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";

//initisation de express
const app = express();

//connection to database

await connectDB();
//middlewares
app.use(cors());
app.use(express.json());

//port
const port = process.env.PORT || 5000;

//routes
app.get("/", (req, res) => res.send("Server is working ..."));

app.listen(port, () => console.log(`Server listening on port ${port}!`));
