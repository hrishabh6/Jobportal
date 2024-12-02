import mongoose from "mongoose";


const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // Job title (e.g., "Frontend Developer")
    },
    description: {
        type: String,
        required: true, // Detailed description of the job role
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company', // Reference to a separate Company schema
        required: true,
    },
    location: {
        type: String,
        required: true, // e.g., "Remote", "New York", etc.
    },
    employmentType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract', 'Internship'], // Options for job type
        required: true,
    },
    salary: {
        type: String, // e.g., "$70k-$90k per year"
        required: false,
    },
    
    requirements: [{
        type: String, 
        required: true, 
    }],

    experience: {
        type: String, // e.g., "2+ years of experience"
        required: false,
    },

    positions: {
        type: Number, // e.g., 5
        required: false,
    },

    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User schema (admin who posted the job)
        required: true,
    },
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application', // Reference to the Application schema
    }],
    
}, {timestamps: true});

export const Job = mongoose.model('Job', JobSchema);
