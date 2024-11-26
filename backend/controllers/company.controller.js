import { Company } from "../models/company.model.js";


export const registerCompany = async (req, res) => {
    try {
        const {companyName} = req.body;
        if (!companyName) {
            return res.status(400).json({message: "Company name is required", success: false});
        }

        let company = await Company.findOne({
            name : companyName
        })

        if (company) {
            return res.status(400).json({message: "Company already exists with this name", success: false});
        }

        company = await Company.create({
            name: companyName,
            userId: req.id
        });

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
    const file = req.file;
    //TODO : Cloudinary Logic
    
    const updateData = {}

    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (website) updateData.website = website;
    if (location) updateData.location = location;

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