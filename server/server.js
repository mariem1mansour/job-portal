import './config/instrument.js'
import * as Sentry from "@sentry/node"
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import { clerkWebhooks } from './controllers/webhooks.js';

//initisation de express
const app = express();

//connection to database

await connectDB();
//middlewares
app.use(cors());
app.use(express.json({limit:"5mb"}));
// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});
app.use('/webhooks', express.raw({ type: 'application/json', inflate: true }), (req, res, next) => {
  try {
    req.body = JSON.parse(req.body.toString());
    next();
  } catch (error) {
    console.error('Erreur lors du parsing du body:', error.message);
    res.status(400).json({ success: false, message: 'Invalid JSON' });
  }
});

//routes
// app.get("/", (req, res) => res.send("Server is working ..."));
app.get("/", function rootHandler(req, res) {
  res.end("Server is working ...🏆");
});
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
// app.post('/webhooks',clerkWebhooks)
app.post('/webhooks', (req, res, next) => {
  console.log("🚨 Webhook reçu - Headers:", req.headers);
  console.log("🚨 Webhook reçu - Body:", req.body);
  clerkWebhooks(req, res, next);
});



//port
const port = process.env.PORT || 5000;

// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);


app.listen(port, () => console.log(`Server listening on port ${port}!`));
