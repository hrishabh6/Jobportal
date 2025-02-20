import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyForJob = async (req, res) => {
    try {
        const userId = req.id
        const jobId = req.params.id;
        if (!userId) {
            return res.status(401).json({message: "Unauthorized", success: false});
        }
        if (!jobId) {
            return res.status(400).json({message: "Please provide a job id", success: false});
        }
        const job = await Job.findById(jobId);

        const existingApplication = await Application.findOne({job: jobId, applicant: userId});

        if (existingApplication) {
            return res.status(400).json({message: "You have already applied for this job", success: false});
        }

        if (!job) {
            return res.status(404).json({message: "Job not found", success: false});
        }

        // Create a new application

        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        })

        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({message: "Application submitted successfully", success: true});


    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error", success})
    }
}

export const getApplliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({applicant: userId}).sort({createdAt : -1}).populate({
            path: 'job',
            options: {sort: {createdAt: -1}},
            populate: {
                path: 'company',
                options: {sort: {createdAt: -1}},

            }
        });
        if (!application) {
            return res.status(404).json({message: "No applications found", success: false});
        }

        return res.status(200).json({application, success: true});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error", success: false});
    }
}

//For recruiter 
export const getApplications = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path : 'applications',
            options: {sort: {createdAt: -1}},
            populate: {path: 'applicant'}
        });

        if (!job) {
            return res.status(404).json({message: "Job not found", success: false});
        }

        return res.status(200).json({job, success: true});

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error", success: false})
    }
}

export const updateApplicationStatus = async (req, res) => {
    try {
        const applicationId = req.params.id;
        const {updatedStatus} = req.body;
        console.log(updatedStatus)
        
        if (!updatedStatus) {
            return res.status(400).json({message: "Please provide a status", success: false});
        }

        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({message: "Application not found", success: false})
        }

        application.status = updatedStatus.toLowerCase();
        await application.save();

        return res.status(200).json({message: "Application Updated Successfully", application, success: true});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error", success: false});
    }
}