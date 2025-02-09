import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";
import { processSearchString } from "../utils/constant.js";
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

export const getSearchSuggestions = async (req, res) => {
  try {
    const { query } = req.query;
    console.log("Query:", query);
    if (!query || query.trim().length === 0) {
      return res.status(200).json({ suggestions: [] });
    }

    const processedQuery = processSearchString(query);
    const searchRegex = new RegExp(processedQuery, 'i');

    // Parallel execution of job and company searches
    const [jobResults, companyResults] = await Promise.all([
      // Search for jobs
      Job.aggregate([
        {
          $match: {
            title: searchRegex,
            status: 'open' // Only show active job listings
          }
        },
        {
          $lookup: {
            from: 'companies',
            localField: 'company',
            foreignField: '_id',
            as: 'companyInfo'
          }
        },
        {
          $unwind: '$companyInfo'
        },
        {
          // Calculate relevance score
          $addFields: {
            relevanceScore: {
              $sum: [
                // Exact match gets highest score
                { $cond: [{ $eq: [{ $toLower: '$title' }, query.toLowerCase()] }, 10, 0] },
                // Starts with query gets high score
                { $cond: [{ $regexMatch: { input: { $toLower: '$title' }, regex: new RegExp(`^${processedQuery}`, 'i') } }, 5, 0] },
                // Contains all words gets medium score
                { $cond: [{ $regexMatch: { input: { $toLower: '$title' }, regex: searchRegex } }, 3, 0] }
              ]
            }
          }
        },
        {
          $sort: { relevanceScore: -1 }
        },
        {
          $limit: 4
        },
        {
          $project: {
            _id: 1,
            title: 1,
            companyName: '$companyInfo.name',
            type: 'job'
          }
        }
      ]),

      // Search for companies
      Company.aggregate([
        {
          $match: {
            name: searchRegex
          }
        },
        {
          // Calculate relevance score for companies
          $addFields: {
            relevanceScore: {
              $sum: [
                { $cond: [{ $eq: [{ $toLower: '$name' }, query.toLowerCase()] }, 10, 0] },
                { $cond: [{ $regexMatch: { input: { $toLower: '$name' }, regex: new RegExp(`^${processedQuery}`, 'i') } }, 5, 0] },
                { $cond: [{ $regexMatch: { input: { $toLower: '$name' }, regex: searchRegex } }, 3, 0] }
              ]
            }
          }
        },
        {
          $sort: { relevanceScore: -1 }
        },
        {
          $limit: 2
        },
        {
          $project: {
            _id: 1,
            name: 1,
            type: 'company'
          }
        }
      ])
    ]);

    // Combine and format results
    const suggestions = {
      jobs: jobResults.map(job => ({
        id: job._id,
        text: job.title,
        companyName: job.companyName,
        type: 'job'
      })),
      companies: companyResults.map(company => ({
        id: company._id,
        text: company.name,
        type: 'company'
      }))
    };

     return res.status(200).json({data  : suggestions});
  } catch (error) {
    console.error('Search suggestion error:', error);
    res.status(500).json({ message: 'Error fetching search suggestions' });
  }
};
