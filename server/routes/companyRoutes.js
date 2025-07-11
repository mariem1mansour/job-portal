import express from "express";
import {
  ChangeJobApplocationsStatus,
  changeVisiblity,
  getComapnyPostedJobs,
  getCompanyData,
  getCompanyJobApplicants,
  loginCompany,
  postJob,
  registerCompany,
} from "../controllers/companyController.js";
import upload from "../config/multer.js";

const router = express.Router();

//register company

router.post("/register",upload.single('image') ,registerCompany);

//login company

router.post("login", loginCompany);

//get company data
router.get("/company", getCompanyData);

//post a new job
router.post("/post-job", postJob);

//get applicants data
router.get("/applicants", getCompanyJobApplicants);

//get company job list
router.get("/list-jobs", getComapnyPostedJobs);

//change applications status
router.post("/change-status", ChangeJobApplocationsStatus);

//change applications visibility
router.post("/change-visiblity", changeVisiblity);

export default router;
