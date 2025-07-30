// server/routes/chatbotRoutes.js
import express from "express";
import axios from "axios";
const router = express.Router();

router.post("/", async (req, res) => {
  const { messages } = req.body;

  try {
    // debug
    console.log(
      "🔑 OPENROUTER_API_KEY loaded:",
      process.env.OPENROUTER_API_KEY ? "Yes (first 5)" : "No"
    );
    if (process.env.OPENROUTER_API_KEY) {
      console.log(
        "🔑 Key preview:",
        process.env.OPENROUTER_API_KEY.slice(0, 5) + "..."
      );
    }
    console.log("📨 Received messages:", messages);
    console.log("🔑 Key length:", process.env.OPENROUTER_API_KEY?.length);

    const openRouterRes = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemini-pro-1.5",
        messages,
        max_tokens: 2048,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY.trim()}`,
          "HTTP-Referer": process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : "http://localhost:5000",
          "X-Title": "Job Portal Chatbot",
        },
      }
    );

    res.json({ text: openRouterRes.data.choices[0].message.content });
  } catch (error) {
    console.error("OpenRouter Error:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.error?.message || "AI request failed",
    });
  }
});

export default router;
