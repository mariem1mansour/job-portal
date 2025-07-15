import Job from "../models/Job.js";

//get all jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ visible: true })
    .populate({path:'companyId', select:'-password'})


    res.json({success:true , jobs})
  } catch (error) {
    res.json({success:false , message:error.message})
  }
};

//get a single job by id

export const getJobById = async (req, res) => {};
