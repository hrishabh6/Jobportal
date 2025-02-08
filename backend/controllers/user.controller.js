import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { normalizeEmail } from "../utils/constant.js";
import getDataURI from "../utils/dataURI.js";
import cloudinary from "../utils/Cloudinary.js";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();


export const register = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, password, role, username, captchaToken } = req.body;
        
        if(captchaToken){
            console.log("captcha token is here")
        }
        
        console.log(fullName, email, phoneNumber, password, role, username)
        const profile = req.file
        let pfpUri = null


        const googleVerifyURL = "https://www.google.com/recaptcha/api/siteverify";
        const secretKey = process.env.GOOGLE_SECRET_KEY;

        const  response  = await axios.post(googleVerifyURL, null, {
            params: {
                secret: secretKey,
                response: captchaToken,
            },
        });

        if (!response.data.success) {
            console.error("Errors:", response.data["error-codes"]);
            return res.status(400).json({ message: "reCAPTCHA verification failed" });
        }

        if(!fullName || !email || !phoneNumber || !password || !role || !username){
            return res.status(400).json({ message: "Something is missing", success: false });
        }

        try {
            if (profile) {
                pfpUri = getDataURI(profile);
            }
        } catch (err) {
            console.error('Error generating DataURI for profile picture:', err.message);
        }
        let pfpcloudResponse = null

        if (pfpUri) {
            pfpcloudResponse = await cloudinary.uploader.upload(pfpUri);
        }

        

        // Check if the email already exists in the database
        const userByEmail = await User.findOne({ email });
        if (userByEmail) {
            return res.status(400).json({ message: "User already exists with this email", success: false });
        }

        // Check if the username already exists in the database
        const userByUsername = await User.findOne({ username });
        if (userByUsername) {
            return res.status(400).json({ message: "Username is already taken", success: false });
        }

        // Normalize the email (if needed)
        const normalizedEmail = normalizeEmail(email);

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        let profilePicture = null

        if (pfpcloudResponse) {
            profilePicture = pfpcloudResponse.secure_url
        }

        // Create the new user
        await User.create({
            name: fullName,
            email: normalizedEmail,
            phoneNumber,
            password: hashedPassword,
            role,
            username, // Storing the username
            profile: {
                profilePhoto: profilePicture
            }
        });

        return res.status(201).json({ message: "Account registered successfully", success: true });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred during registration. Please try again later.",
            success: false,
        });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({ message: "Something is missing", success: false });
        }
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Incorrect Credentials", success: false });
        }

        const isPassword = await bcrypt.compare(password, user.password);

        if (!isPassword) {
            return res.status(400).json({ message: "Incorrect Credentials", success: false });
        }

        if (role !== user.role) {
            return res.status(400).json({ message: "Account does not exist with current role", success: false });

        }

        const tokenData = {
            userId: user._id,
        }

        user = {
            fullName: user.name,
            username: user.username,
            _id: user._id,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }

        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "7d" });

        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "None",
                secure: true,
                // secure: true, // Uncomment for production with HTTPS
            })
            .json({ message: "Logged in successfully", success: true, user });

    } catch (error) {
        console.log(error);
        throw error
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({ message: "logged out successfully", success: true })
    } catch (error) {
        console.log(error)
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, bio, skills, username, portfolio, location } = req.body;

        const profile = req.files?.profile?.[0];
        const resume = req.files?.resume?.[0];

        let pfpUri = null;
        let resumeUri = null;

        // Safely generate DataURI for profile picture
        try {
            if (profile) {
                pfpUri = getDataURI(profile);
            }
        } catch (err) {
            console.error('Error generating DataURI for profile picture:', err.message);
        }

        // Safely generate DataURI for resume
        try {
            if (resume) {
                resumeUri = getDataURI(resume);
            }
        } catch (err) {
            console.error('Error generating DataURI for resume:', err.message);
        }

        let pfpcloudResponse = null;
        let resumecloudResponse = null;

        // Safely upload to Cloudinary
        if (pfpUri) {
            pfpcloudResponse = await cloudinary.uploader.upload(pfpUri);
        }


        if (resumeUri) {
            resumecloudResponse = await cloudinary.uploader.upload(resumeUri, {

            });
        }

        const userId = req.id; // Middleware auth
        const updateFields = {};

        if (fullName) updateFields.name = fullName;
        if (email) updateFields.email = email;
        if (phoneNumber) updateFields.phoneNumber = phoneNumber;
        if (bio) updateFields['profile.bio'] = bio;
        if (skills) {
            updateFields['profile.skills'] = Array.isArray(skills)
                ? skills
                : skills.split(',').map(skill => skill.trim());
        }
        if (username) updateFields.username = username;
        if (portfolio) updateFields['profile.portfolioWebsite'] = portfolio;
        if (location) updateFields['profile.address'] = location;

        if (pfpcloudResponse?.secure_url) {
            updateFields['profile.profilePhoto'] = pfpcloudResponse.secure_url;
        }

        if (resumecloudResponse?.secure_url) {
            updateFields['profile.resume'] = resumecloudResponse.secure_url;
            updateFields['profile.resumeOriginalName'] = resume?.originalname;
        }

        let user = await User.findOneAndUpdate(
            { _id: userId }, // Filter
            { $set: updateFields }, // Update
            { new: true, runValidators: true } // Options: return updated document, validate
        );

        if (!user) {
            return res.status(400).json({ message: "User not found", success: false });
        }

        user = {
            fullName: user.name,
            username: user.username,
            _id: user._id,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };

        return res.status(200).json({ message: "Profile updated successfully", success: true, user });
    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({
            message: "An error occurred during profile update. Please try again later.",
            success: false,
        });
    }
};


export const getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).select("-password"); // Exclude sensitive fields like password
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Server error" });
    }
}