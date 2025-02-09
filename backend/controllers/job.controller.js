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
        const { limit = 10, filters, currentPage = 1 } = req.body;
        console.log(currentPage, "This is the current page"); 
      const skipAmount = (currentPage - 1) * limit;
      const query = {};
       console.log(filters);
       console.log(limit);
      if (filters) {
        if (filters.location?.length) {
          const locationRegexArray = filters.location.map(location => new RegExp(location, 'i'));
          query.location = { $in: locationRegexArray };
        }
  
        if (filters.title?.length) {
          const titleRegexArray = filters.title.map(title => {
            const normalizedTitle = title.toLowerCase().replace(/[-]/g, ' ').trim();
            const words = normalizedTitle.split(/\s+/);
            const regexPattern = words.map(word => `(?=.*${word})`).join('');
            return new RegExp(regexPattern, 'i');
          });
          query.title = { $in: titleRegexArray };
        }
  
        if (filters.salary?.length) {
          query.salary = { $in: filters.salary };
        }
      }
  
      const jobs = await Job.find(query)
        .populate({ path: "company", select: "name logo" })
        .sort({ createdAt: -1 })
        .skip(skipAmount)
        .limit(Number(limit));
  
      const totalJobs = await Job.countDocuments(query);
      const isNext = totalJobs > skipAmount + jobs.length;
      const totalPages = Math.ceil(totalJobs / limit);
      return res.status(200).json({ 
        jobs, 
        success: true, 
        totalJobs,
        currentPage,
        totalPages,
        isNext
      });
    } catch (error) {
      console.error(error);
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
        

        const userId = req.id;
        
        // Find the job by ID
        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({message: "Job not found", success: false});
        }
        
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

export const jobStatus = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const { updatedStatus } = req.body;
        const job = await Job.findById(id)
        job.status = updatedStatus;
        await job.save();
        return res.status(200).json({message: "Job status updated successfully", success: true, status: job.status});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error", success: false});
    }
}

export const jobTitles = async (req, res) => {
    try {
        const titles = await Job.find().distinct("title"); // Get distinct titles
        const limitedTitles = titles.slice(0, 10); // Limit to 10 titles

        return res.status(200).json({ titles: limitedTitles, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};
