import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
    try {
        const {title, description, company, location, employmentType, salary, requirements, postedBy, experience} = req.body;

        const userId = req.id

        if (!userId) {
            return res.status(401).json({message: "Unauthorized", success: false});
        }

        if (!title || !description || !company || !location || !employmentType || !requirements  ) {
            return res.status(400).json({message: "Please fill in all the required fields", success: false});
        }

        const createJob = {
            title,
            description,
            company,
            location,
            employmentType,
            requirements,
            postedBy: userId,
        }

        if (salary) createJob.salary = Number(salary);
        if (experience) createJob.experience = experience;
        
        const job = await Job.create(createJob);
        return res.status(201).json({message : "Job Created successfully", job, success: true});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error", success: false});
    }
}

//For students
export const getAllJobs = async (req, res) => {
    try {
        const Keyword = req.query.Keyword || ""
        const query = {
            $or : [
                {title : {$regex : Keyword, $options : "i"}},
                {description : {$regex : Keyword, $options : "i"}},
            ]
        };

        const job = await Job.find(query).populate({ path: "company",  select : "name" }).sort({ createdAt: -1 });
        if (!job) {
            return res.status(404).json({message: "No job found", success: false});
        }

        return res.status(200).json({job, success: true});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error", success: false});
        
    }
}
//For Students
export const getjobsById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate("company", "name").populate("postedBy", "name email");
        if (!job) {
            return res.status(404).json({message: "No job found", success: false});
        }
        return res.status(200).json({job, success: true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error", success: false});
    }
}

//Jobs created by recruiter
export const getJobsForRecruiter = async (req, res) => {
    try {
        const recruiterId = req.id;

        const job = await Job.find({postedBy : recruiterId}).populate("company", "name").populate("postedBy", "name email");    
        return res.status(200).json({job, success: true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error", success: false});
    }
}