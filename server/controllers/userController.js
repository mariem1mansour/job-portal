import User from "../models/User.js";

//get user donnee
export const getUserData = async (req, res) => {
  const userId = req.auth.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User Not Found ⚠️",
      });
    }

    res.json({
      success:true , user
    })


  } catch (error) {

    res.json({
      success:false,
      message:error.message
    })
  }
};

//Apply for a job
export const applyForJob = async (req, res) => {

  
};

//get user applied jobs

export const getUserJobApplications = async (req, res) => {};

//update user 's c.v
export const updateUserResume = async (req, res) => {};
