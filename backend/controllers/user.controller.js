import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { normalizeEmail } from "../utils/constant.js";
import getDataURI from "../utils/dataURI.js";
import cloudinary from "../utils/Cloudinary.js";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const verifyCaptcha = async (captchaToken) => {
    if (!captchaToken) {
        throw new Error('Captcha token is missing');
    }

    const googleVerifyURL = "https://www.google.com/recaptcha/api/siteverify";
    const secretKey = process.env.GOOGLE_SECRET_KEY;

    try {
        const response = await axios.post(googleVerifyURL, null, {
            params: {
                secret: secretKey,
                response: captchaToken,
            },
        });

        if (!response.data.success) {
            console.error("Captcha Errors:", response.data["error-codes"]);
            throw new Error('reCAPTCHA verification failed');
        }

        return true;
    } catch (error) {
        console.error('Captcha verification error:', error);
        throw new Error('reCAPTCHA verification failed');
    }
};

// Helper function to generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Helper function to format user response
const formatUserResponse = (user) => {
    return {
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
};

export const login = async (email, password, role, captchaToken) => {
    try {
        // Validate required fields
        if (!email || !password || !role) {
            throw new Error('Required fields are missing');
        }

        // Only verify captcha if token is provided (skip for auto-login after registration)
        if (captchaToken) {
            await verifyCaptcha(captchaToken);
        }

        // Find and validate user
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Incorrect credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Incorrect credentials');
        }

        if (role !== user.role) {
            throw new Error('Account does not exist with current role');
        }

        // Generate token and format user response
        const token = generateToken(user._id);
        const formattedUser = formatUserResponse(user);

        return {
            success: true,
            message: 'Logged in successfully',
            user: formattedUser,
            token,
        };
    } catch (error) {
        console.error('Login error:', error);
        return {
            success: false,
            message: error.message || 'An error occurred during login',
        };
    }
};

export const register = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, password, role, username, captchaToken } = req.body;

        // Validate required fields
        if (!fullName || !email || !phoneNumber || !password || !role || !username) {
            return res.status(400).json({
                success: false,
                message: 'Required fields are missing',
            });
        }

        // Verify captcha
        await verifyCaptcha(captchaToken);

        // Check for existing user
        const [userByEmail, userByUsername] = await Promise.all([
            User.findOne({ email }),
            User.findOne({ username }),
        ]);

        if (userByEmail) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email',
            });
        }

        if (userByUsername) {
            return res.status(400).json({
                success: false,
                message: 'Username is already taken',
            });
        }

        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name: fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            username,
            profile: {
                profilePhoto: null,
            },
        });

        // Auto-login after successful registration (skip captcha verification)
        const loginResponse = await login(email, password, role);

        if (!loginResponse.success) {
            throw new Error('Auto-login failed after registration');
        }

        return res.status(201).json({
            success: true,
            message: 'Account registered and logged in successfully',
            user: loginResponse.user,
            token: loginResponse.token,
        });

    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'An error occurred during registration',
        });
    }
};



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