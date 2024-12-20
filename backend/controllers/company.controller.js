import { Company } from "../models/company.model.js";
import cloudinary from "../utils/Cloudinary.js";
import getDataURI from "../utils/dataURI.js";


export const registerCompany = async (req, res) => {
    try {
        const {companyName, description, website, location, userId, linkedin} = req.body;
        if (!companyName) {
            return res.status(400).json({message: "Company name is required", success: false});
        }

        const pfp = req.file
        let pfpUri = null
        try {
            if (pfp) {
                pfpUri = getDataURI(pfp);
            }
        } catch (err) {
            console.error('Error generating DataURI for profile picture:', err.message);
        }
        let pfpcloudResponse = null

        if (pfpUri) {
            pfpcloudResponse = await cloudinary.uploader.upload(pfpUri);
        }
        let profilePicture = null
        if (pfpcloudResponse) {
            profilePicture = pfpcloudResponse.secure_url
        }

        let company = await Company.findOne({
            name : companyName
        })

        if (company) {
            return res.status(400).json({message: "Company already exists with this name", success: false});
        }

        let companyCreate = {
            name : companyName,
            userId : req.id
        }

        if(description) companyCreate.description = description
        if(website) companyCreate.website = website
        if(location) companyCreate.location = location
        if(userId) companyCreate.userId = userId
        if(linkedin) companyCreate.linkedin = linkedin
        if(profilePicture) companyCreate.logo = profilePicture
        company = await Company.create(companyCreate);

        return res.status(201).json({message: "Company Registered successfully", success: true, data: company});


    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error", success: false});
    }
}

export const getCompany = async (req, res) => {
    try {
        const userId = req.id; // This is the logged in user's id

        const companies = await Company.find({userId});
        if (!companies) {
            return res.status(404).json({message: "No companies found", success: false});
        }

        return res.status(200).json({success: true, data: companies});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error", success: false});
    }
}

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({message: "Company not found", success: false});
        }

        return res.status(200).json({success: true, data: company});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error", success: false});
    }
}

export const updateCompany = async (req, res) => {
   try {
    const {name, description, website, location} = req.body;
    
        const file = req.file
        console.log(file);
        
        let pfpUri = null
        try {
            if (file) {
                pfpUri = getDataURI(file);
            }
        } catch (err) {
            console.error('Error generating DataURI for profile picture:', err.message);
        }
        let pfpcloudResponse = null

        if (pfpUri) {
            pfpcloudResponse = await cloudinary.uploader.upload(pfpUri);
        }
        let profilePicture = null
        if (pfpcloudResponse) {
            profilePicture = pfpcloudResponse.secure_url
        }
    
    
    const updateData = {}

    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (website) updateData.website = website;
    if (location) updateData.location = location;
    if (profilePicture) updateData.logo = profilePicture;

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {new: true});

    if (!company) {
        return res.status(404).json({message: "Company not found", success: false});
    }

    return res.status(200).json({message: "Company information updated successfully", success: true, data: company});
   } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error", success: false});
   }

}