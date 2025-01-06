import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";

const SearchableAdminTypes = ["job", "company"];
const SearchableTypes = ["job", "company"];
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
    const extractFields = (queryResults, searchField, type) => {
      return queryResults.map((item) => ({
        title: item[searchField], // title for job or name for company
        id: item._id.toString(),  // Convert the _id to a string
        type,
      }));
    };
    if (!typeLower) {
      console.log("Searching all types ADMIN");

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


    return res.json(results); // Return as JSON
  } catch (error) {
    console.error(`Error fetching admin global results: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
}

export async function globalUserSearch(req, res) {
  try {
    const { query, type } = req.body;

    const regexQuery = { $regex: query, $options: "i" };
    let results = [];

    const modelsAndTypes = [
      { model: Company, searchField: "name", type: "company" },
      {
        model: Job,
        searchFields: ["title", "description", "company", "location", "employmentType", "requirements"],
        type: "job",
      },
    ];

    const typeLower = type?.toLowerCase();

    if (typeLower && !SearchableTypes.includes(typeLower)) {
      throw new Error("Invalid search type");
    }

    const extractFields = (queryResults, searchField, type) => {
      return queryResults.map((item) => ({
        title: type === "company" ? item[searchField] : item.title,
        id: item._id.toString(),
        type,
        additionalInfo: type === "job" ? {
          description: item.description,
          location: item.location,
          employmentType: item.employmentType,
          requirements: item.requirements,
          company: item.company.name, // Assuming `populate` is used to resolve the reference
        } : {},
      }));
    };

    if (!typeLower) {
      for (const { model, searchField, searchFields, type } of modelsAndTypes) {
        let queryResults;

        if (type === "company") {
          queryResults = await model
            .find({ [searchField]: regexQuery })
            .limit(5)
            .lean();
        } else if (type === "job") {
          const jobSearchFields = searchFields || [];
          queryResults = await model
            .find({
              $or: jobSearchFields
                .filter((field) => field !== "company")
                .map((field) => ({ [field]: regexQuery })),
            })
            .populate("company", "name")
            .limit(5)
            .lean();
        }

        results.push(
          ...extractFields(queryResults, type === "company" ? searchField : null, type)
        );
      }
    } else {
      const modelInfo = modelsAndTypes.find((item) => item.type === typeLower);
      if (!modelInfo) {
        throw new Error("Invalid search type");
      }

      let queryResults;

      if (typeLower === "company") {
        queryResults = await modelInfo.model
          .find({ [modelInfo.searchField]: regexQuery })
          .limit(10)
          .lean();
      } else if (typeLower === "job") {
        queryResults = await modelInfo.model
          .find({
            $or: modelInfo.searchFields.map((field) => ({ [field]: regexQuery })),
          })
          .populate("company", "name")
          .limit(10)
          .lean();
      }

      results = extractFields(queryResults, modelInfo.searchField, typeLower);
    }

    return res.json(results);
  } catch (error) {
    console.error(`Error fetching global search results: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
}

