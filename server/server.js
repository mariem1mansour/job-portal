import "./config/instrument.js";
import * as Sentry from "@sentry/node";
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import { clerkWebhooks } from "./controllers/webhooks.js";
import companyRoutes from "./routes/companyRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import jobRoutes from "./routes/jobRoutes.js" 
import userRoutes from"./routes/userRoutes.js"
import {clerkMiddleware} from "@clerk/express"


//initisation de express
const app = express();

//connection to database

await connectDB();
await connectCloudinary();
//middlewares
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(clerkMiddleware())

//routes
app.get("/", (req, res) => res.send("Server is working ..."));
app.post("/webhooks", clerkWebhooks);
app.use("/api/company", companyRoutes);
app.use('/api/jobs',jobRoutes)
app.use('/api/users',userRoutes)




//port
const port = process.env.PORT || 5000;

// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);

app.listen(port, () => console.log(`Server listening on port ${port}!`));
