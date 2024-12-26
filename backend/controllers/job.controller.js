import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
    try {
        const { title, description, company, location, employmentType, salary, requirements, experience, positions, details } = req.body;

        const userId = req.id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }

        console.log(title, description, company, location, employmentType, requirements);

        // Ensure all required fields are filled
        if (!title || !description || !company || !location || !employmentType || !requirements) {
            return res.status(400).json({ message: "Please fill in all the required fields", success: false });
        }

        // Normalize employmentType field
        const validEmploymentTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];
        const normalizeEmploymentType = (type) => {
            // Normalize input (e.g., " full time " -> "full-time")
            const formattedType = type
                .trim()
                .toLowerCase()
                .replace(/\s+/g, "-"); // Replace spaces with hyphens
            
            // Find a matching type from the enum
            return validEmploymentTypes.find(
                (validType) => validType.toLowerCase() === formattedType
            ) || null; // Return null if no match
        };

        const normalizedEmploymentType = normalizeEmploymentType(employmentType);
        if (!normalizedEmploymentType) {
            return res.status(400).json({
                message: `Invalid employment type. Valid options are: ${validEmploymentTypes.join(", ")}`,
                success: false,
            });
        }

        const createJob = {
            title,
            description,
            company,
            salary,
            location,
            employmentType: normalizedEmploymentType,
            requirements,
            postedBy: userId,
            positions,
            details,
        };

       
        if (experience) createJob.experience = experience;

        const job = await Job.create(createJob);
        return res.status(201).json({ message: "Job Created successfully", job, success: true });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

//For students
export const getAllJobs = async (req, res) => {
    try {
      const { Keyword = "", limit = 10 } = req.query; // Extract limit and keyword from query params
      const query = {
        $or: [
          { title: { $regex: Keyword, $options: "i" } },
          { description: { $regex: Keyword, $options: "i" } },
        ],
      };
  
      // Apply limit and sort
      const jobs = await Job.find(query)
        .populate({ path: "company", select: "name logo" })
        .sort({ createdAt: -1 })
        .limit(Number(limit)); // Ensure limit is a number
  
      if (!jobs.length) {
        return res.status(404).json({ message: "No jobs found", success: false });
      }
  
      return res.status(200).json({ jobs, success: true });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error", success: false });
    }
  };
  
//For Students
export const getjobsById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate("company", "name website location logo").populate("postedBy", "name email");
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

export const getJobForAParticularCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        
        const job = await Job.find({company : companyId}).populate("company"); 
        if (!job) {
            return res.status(404).json({message: "No job found", success: false});
        }
        return res.status(200).json({job, success: true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error", success: false});
    }
}

export const deleteJob = async (req, res) => {
    try {
        const id = req.params.id;
        console.log("Delete route accessed with ID:", req.params.id);

        const userId = req.id;
        console.log("User ID:", userId);
        
        // Find the job by ID
        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({message: "Job not found", success: false});
        }
        console.log(job.postedBy.toString(), userId);
        
        // Check if the user is authorized to delete this job
        if (job.postedBy.toString() !== userId) {
            return res.status(401).json({message: "Unauthorized", success: false});
        }
        
        // Use deleteOne() to delete the job
        await Job.deleteOne({ _id: id });
        
        return res.status(200).json({message: "Job deleted successfully", success: true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error", success: false});
    }
};
