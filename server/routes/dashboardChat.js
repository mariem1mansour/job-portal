import express from "express";
import jwt from "jsonwebtoken";
import axios from "axios";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";
import Company from "../models/Company.js";

const router = express.Router();

// Helper to verify token
const verifyToken = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
};

router.post("/", async (req, res) => {
  const { message, chatHistory = [] } = req.body;

  // Verify token and get companyId
  const decoded = verifyToken(req, res);
  const companyId = decoded?.id; // assuming your token contains company _id

  if (!companyId) {
    return res.status(401).json({ error: "Unauthorized: Invalid or missing token" });
  }

  try {
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    const jobs = await Job.find({ company: companyId }).populate("applications");
    if (jobs.length === 0) {
      return res.json({ reply: "You haven't created any jobs yet." });
    }

    const applications = await JobApplication.find({ job: { $in: jobs.map(j => j._id) } });

    const topJob = jobs
      .sort((a, b) => (b.applications?.length || 0) - (a.applications?.length || 0))
      .at(0);

    const context = `
You are an HR Assistant for ${company.name}.
Answer based on this data:

### Company
- Name: ${company.name}

### Jobs
${jobs.map(j => `- ${j.title} (${j.applications?.length || 0} applicants)`).join("\n")}

### Top Job by Applicants
${topJob ? `${topJob.title} with ${topJob.applications?.length || 0} applicants` : "N/A"}

### Total Applications: ${applications.length}

Rules:
- Be concise.
- Use bullet points if needed.
- Never say "based on the data".
- If asked "which job has most applicants?", name the job.
`;

    const ollamaRes = await axios.post(
      `${process.env.OLLAMA_URL}/api/generate`,
      {
        model: "llama3.2:1b",
        prompt: `${context}\n\nUser: ${message}\nAssistant:`,
        stream: false,
      },
      { timeout: 30000 }
    );

    const reply = ollamaRes.data.response?.trim() || "I couldn't generate a response.";
    res.json({ reply });
  } catch (error) {
    console.error("Dashboard Chat Error:", error.message);
    res.status(500).json({ error: "AI request failed" });
  }
});

export default router;