import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";

const SearchableAdminTypes = ["job", "company"];

export async function globalAdminSearch(req, res) {
    try {
      const { query, type } = req.body;
      console.log("Query:", query, "Type:", type);
      const adminId = req.id;
      console.log("Admin ", adminId);

      const regexQuery = { $regex: query, $options: "i" };
      let results = [];

      const modelsAndTypes = [
        { model: Company, searchField: "name", type: "company" },
        { model: Job, searchField: "title", type: "job" },
      ];

      const typeLower = type?.toLowerCase();
      
      if (typeLower && !SearchableAdminTypes.includes(typeLower)) {
        throw new Error("Invalid search type for admin");
      }

      const adminCompanies = await Company.find({ userId: adminId }).lean();
      console.log("Admin Companies:", adminCompanies);
      
      const adminCompanyIds = adminCompanies.map((company) => company._id);
      console.log("Admin Company IDs:", adminCompanyIds);
      const extractFields = (queryResults, searchField, type) => {
        return queryResults.map((item) => ({
          title: item[searchField], // title for job or name for company
          id: item._id.toString(),  // Convert the _id to a string
          type,
        }));
      };
      if (!typeLower) {
        console.log("Searching all types");
        
        for (const { model, searchField, type } of modelsAndTypes) {
          let queryResults;

          if (type === "company") {
            queryResults = await model
              .find({ userId: adminId, [searchField]: regexQuery })
              .limit(2)
              .lean();
            console.log("Raw Company Results:", queryResults); // Log raw results
          } else if (type === "job") {
            queryResults = await model
              .find({ company: { $in: adminCompanyIds }, [searchField]: regexQuery })
              .limit(2)
              .lean();
            console.log("Raw Job Results:", queryResults); // Log raw results
          }

          results.push(...extractFields(queryResults, searchField, type));
        }
      } else {
        const modelInfo = modelsAndTypes.find((item) => item.type === typeLower);
        if (!modelInfo) {
          throw new Error("Invalid search type");
        }

        let queryResults;
        console.log("Searching type:", typeLower);
        
        if (typeLower === "company") {
          queryResults = await modelInfo.model
            .find({ userId: adminId, [modelInfo.searchField]: regexQuery })
            .limit(8)
            .lean();
        } else if (typeLower === "job") {
          queryResults = await modelInfo.model
            .find({ company: { $in: adminCompanyIds }, [modelInfo.searchField]: regexQuery })
            .limit(8)
            .lean();
        }

        results = extractFields(queryResults, modelInfo.searchField, typeLower);
      }

      console.log("Results before sending:", results);
      return res.json(results); // Return as JSON
    } catch (error) {
      console.error(`Error fetching admin global results: ${error.message}`);
      return res.status(500).json({ error: error.message });
    }
}

  