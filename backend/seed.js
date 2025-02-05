import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "./models/user.model.js";
import { Company } from "./models/company.model.js";
import { Job } from "./models/job.model.js";
import { seedData } from "./utils/index.js";
import connectToDatabase from "./utils/db.js";


async function seedDatabase() {
    try {
        console.log("⏳ Connecting to the database...");
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("✅ Database connected successfully!");

        // Clear existing data
        console.log("🚀 Clearing existing data...");
        await User.deleteMany({});
        await Company.deleteMany({});
        await Job.deleteMany({});

        const [recruitersData, companiesData, jobsData] = seedData;

        // Create Users/Recruiters (ensure password is hashed)
        console.log("👤 Seeding recruiters...");
        const recruiters = await Promise.all(recruitersData.map(async (recruiterData) => {
            const hashedPassword = await bcrypt.hash(recruiterData.password, 10);
            const recruiter = new User({
                ...recruiterData,
                password: hashedPassword
            });
            return recruiter.save();
        }));

        // Create Companies and assign each company a recruiter (userId)
        console.log("🏢 Seeding companies...");
        const companies = await Promise.all(companiesData.map((companyData, index) => {
            if (recruiters[index]) {
                const company = new Company({
                    ...companyData,
                    userId: recruiters[index]._id // Assign recruiter to the company
                });
                return company.save();
            }
        }));

        // Filter out undefined companies (if there were more companies than recruiters)
        const validCompanies = companies.filter(company => company !== undefined);

        // Update recruiter profiles with their respective companies
        console.log("🔄 Updating recruiter profiles...");
        await Promise.all(recruiters.map(async (recruiter, index) => {
            if (validCompanies[index]) {
                recruiter.profile.company = validCompanies[index]._id;
                await recruiter.save();
            }
        }));

        // Create Jobs and associate them with companies and recruiters
        console.log("💼 Seeding jobs...");
        const jobs = await Promise.all(jobsData.map((jobData, index) => {
            const companyIndex = Math.floor(index / 5);
            const recruiterIndex = companyIndex;

            const job = new Job({
                ...jobData,
                company: validCompanies[companyIndex]._id,
                postedBy: recruiters[recruiterIndex]._id
            });

            return job.save();
        }));

        console.log("🎉 Database successfully seeded!");
        console.log(`👤 Created ${recruiters.length} recruiters`);
        console.log(`🏢 Created ${validCompanies.length} companies`);
        console.log(`💼 Created ${jobs.length} jobs`);

        await mongoose.disconnect();
        console.log("🔌 Database connection closed.");
    } catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
}




// // Array of local URLs to your logos
const logos = [
    "/logos/logo1.webp",
    "/logos/logo2.webp",
    "/logos/logo3.webp",
    "/logos/logo4.webp",
    "/logos/logo5.webp",
    "/logos/logo6.webp",
    "/logos/logo7.webp",
    "/logos/logo8.webp",
    "/logos/logo9.webp",
    "/logos/logo10.webp",
    "/logos/logo11.webp",
    "/logos/logo12.webp",
    "/logos/logo13.webp",
    "/logos/logo14.webp",
    "/logos/logo15.webp",
    "/logos/logo16.webp",
    "/logos/logo17.webp",
    "/logos/logo18.webp",
    "/logos/logo19.webp",

];

// Function to update logo for all companies
const updateCompanyLogos = async () => {
    try {
        connectToDatabase()
        const companies = await Company.find(); // Fetch all companies

        if (companies.length !== logos.length) {
            console.error("Mismatch between number of companies and logos.");
            return;
        }

        // Update each company with the corresponding logo
        for (let i = 0; i < companies.length; i++) {
            const company = companies[i];
            const logo = logos[i];

            company.logo = logo;  // Set the local logo URL (adjust according to your setup)
            await company.save();  // Save the company with the updated logo field

            console.log(`Updated logo for company: ${company.name}`);
        }

        console.log("All company logos updated successfully!");
        await mongoose.disconnect();  // Close the DB connection
    } catch (error) {
        console.error('Error updating company logos:', error);
        process.exit(1);
    }
};

// seedDatabase();
updateCompanyLogos()



