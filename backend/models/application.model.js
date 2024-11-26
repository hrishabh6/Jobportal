import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job', // Reference to the Job schema
        required: true,
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User schema
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'], // Application status
        default: 'Pending',
    },

}, {timestamps: true});

export const Application = mongoose.model('Application', applicationSchema);