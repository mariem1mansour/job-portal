// Registrer un nouveau company
import Company from "./../models/Company.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateToken.js";

export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;
  const imageFile = req.file;
  if (!name || !email || !password || !imageFile) {
    return res.json({ sucess: false, message: "Missing Informations ⚠️" });
  }

  try {
    const companyExisting = await Company.findOne({ email });

    if (companyExisting) {
      return res.json({ success: false, message: "Company Already Exists ⚠️" });
    }
    //new company
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    //save company

    const company = await Company.create({
      name,
      email,
      password: hashPassword,
      image: imageUpload.secure_url,
    });

    res.json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    res.json({success:false , message:error.message})
  }
};

//company login
export const loginCompany = async (req, res) => {};

// getting company data
export const getCompanyData = async (req, res) => {};
//post a new job

export const postJob = async (req, res) => {};

//get company job applicants

export const getCompanyJobApplicants = async (req, res) => {};

//get company posted jobs

export const getComapnyPostedJobs = async (req, res) => {};

//change job application status : Accept or reject

export const ChangeJobApplocationsStatus = async (req, res) => {};

//change job visibility

export const changeVisiblity = async (req, res) => {};
