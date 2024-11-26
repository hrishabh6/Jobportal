import  jwt  from "jsonwebtoken";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { normalizeEmail } from "../utils/constant.js";

export const register = async (req, res) => {
    try {
        const {fullName, email, phoneNumber, password, role} = req.body;
        if (!fullName || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({message: "Something is missing", success: false});
        }

        const user = await User.findOne({email});
        if (user) {
            return res.status(400).json({message: "User already exists with this email"});
        }

        const normalizedEmail = normalizeEmail(email);

        const hashedPassword = await bcrypt.hash(password, 10);

        //TODO : Create a system of OTP verification for email and Phone number

        await User.create({
            name: fullName,
            email: normalizedEmail,
            phoneNumber,
            password: hashedPassword,
            role,
        });

        return res.status(201).json({message: "Account registered successfully", success: true});

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred during registration. Please try again later.",
            success: false,
        });
    }
}

export const login = async (req, res) => {
    try {
        const {email, password, role} = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({message: "Something is missing", success: false});
        }
        let user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({message: "Incorrect Credentials", success: false});
        }

        const isPassword = await bcrypt.compare(password, user.password);

        if (!isPassword) {
            return res.status(400).json({message: "Incorrect Credentials", success: false});
        }

        if (role !== user.role) {
            return res.status(400).json({message: "Account does not exist with current role", success: false});
            
        }

        const tokenData = {
            userId : user._id,
        }

        user = {
            _id : user._id,
            fullname : user.fullName,
            email : user.email,
            phoneNumber : user.phoneNumber,
            role: user.role,
            profile: user.profile,
        }

        const token = await jwt .sign(tokenData, process.env.JWT_SECRET, {expiresIn: "7d"});

        return res
        .status(200)
        .cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
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
        return res.status(200).cookie("token", "", {maxAge : 0}).json({message : "logged out successfully", success : true})
    } catch (error) {
        console.log(error)
    }
}

export const updateProfile = async (req, res) => {
    try {
        const {fullName, email, phoneNumber, bio, skills} = req.body;

        const file = req.file;

        //TODO : cloudinary setup
        const userId = req.id; //Middleware auth
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

        const user = await User.findOneAndUpdate(
            { _id: userId }, // Filter
            { $set: updateFields }, // Update
            { new: true, runValidators: true } // Options: return updated document, validate
        );

        if (!user) {
            return res.status(400).json({ message: "User not found", success: false });
        }

        return res.status(200).json({ message: "Profile updated successfully", success: true, user });

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "An error occurred during profile update. Please try again later.", success: false});
    }
}