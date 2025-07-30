import express from "express";
import axios from "axios";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";
import Company from "../models/Company.js";

const router = express.Router();

// Middleware to check if user is authenticated
// Assumes you have req.user.companyId from authMiddleware
router.post("/", async (req, res) => {
  const { message, chatHistory = [] } = req.body;

  if (!req.user?.companyId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Fetch data from your DB
    const company = await Company.findById(req.user.companyId);
    const jobs = await Job.find({ company: req.user.companyId }).populate("applications");
    const applications = await JobApplication.find({ job: { $in: jobs.map(j => j._id) } });

    // Analyze: Which job has most applicants?
    const topJob = jobs
      .sort((a, b) => (b.applications?.length || 0) - (a.applications?.length || 0))
      .slice(0, 1)[0];

    // Build context for LLM
    const context = `
You are an HR Analytics Assistant for ${company?.name || "the company"}.
Answer based on the following internal data:

### Company
- Name: ${company?.name || "N/A"}
- Industry: ${company?.industry || "N/A"}

### Jobs
${jobs.map(j => `- ${j.title} (${j.applications?.length || 0} applicants)`).join("\n")}

### Top Job by Applicants
${topJob ? `${topJob.title} with ${topJob.applications?.length || 0} applicants` : "N/A"}

### Total Applications: ${applications.length}

Instructions:
- Be concise and helpful.
- Use bullet points if needed.
- Do not say "Based on the data".
- If asked "which job has most applicants?", name the job and count.
`;

    // Call Ollama via Cloudflare Tunnel
    const ollamaRes = await axios.post(
      `${process.env.OLLAMA_URL}/api/generate`,
      {
        model: "llama3.2:1b",
        prompt: `${context}\n\nUser: ${message}\nAssistant:`,
        stream: false,
      },
      {
        timeout: 30000,
      }
    );

    const reply = ollamaRes.data.response?.trim() || "I couldn't generate a response.";

    res.json({ reply });
  } catch (error) {
    console.error("Dashboard Chat Error:", error.message);
    res.status(500).json({ error: "Failed to get AI response" });
  }
});

export default router;