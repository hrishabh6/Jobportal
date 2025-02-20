import mongoose from "mongoose";

    const userSchema = new mongoose.Schema({
        name: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        phoneNumber: { type: Number, required: true },  
        password: { type: String, required: true },
        role: { type: String, enum: ['student', 'recruiter'], required: true,  },
        profile: {
            bio: { type: String, default: "" },
            portfolioWebsite: { type: String, default: "" },
            address: { type: String, default: "" },
            skills: [{type: String, default: []}],
            resume: { type: String },
            resumeOriginalName: { type: String },
            company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
            profilePhoto: { type: String, default: "" },
            savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
        }
        
    }, {timestamps: true});

export const User = mongoose.model('User', userSchema);