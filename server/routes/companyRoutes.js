import express from "express";
import {
  ChangeJobApplicationsStatus,
  changeVisiblity,
  getComapnyPostedJobs,
  getCompanyData,
  getCompanyJobApplicants,
  loginCompany,
  postJob,
  registerCompany,
} from "../controllers/companyController.js";
import upload from "../config/multer.js";
import { protectCompany } from "../middleware/authMiddleware.js";

const router = express.Router();

//register company

router.post("/register",upload.single('image') ,registerCompany);

//login company

router.post("/login", loginCompany);

//get company data
router.get("/company",protectCompany, getCompanyData);

//post a new job
router.post("/post-job",protectCompany, postJob);

//get applicants data
router.get("/applicants",protectCompany, getCompanyJobApplicants);

//get company job list
router.get("/list-jobs",protectCompany, getComapnyPostedJobs);

//change applications status
router.post("/change-status",protectCompany, ChangeJobApplicationsStatus);

//change applications visibility
router.post("/change-visiblity",protectCompany, changeVisiblity);

export default router;
