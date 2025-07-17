import express from "express";
import {
  applyForJob,
  getUserData,
  getUserJobApplications,
  updateUserResume,
} from "../controllers/userController.js";
import upload from "../config/multer.js";

const router = express.Router();

//Get user Data
router.get("/user", getUserData);

//apply for a job

router.post("/apply", applyForJob);

//get applied jobs data
router.get("/applications", getUserJobApplications);

//update cv
router.post("/update-resume", upload.single("resume"), updateUserResume);

export default router;
