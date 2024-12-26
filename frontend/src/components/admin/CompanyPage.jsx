import Navbar from "../shared/Navbar";
import RenderBadge from "../shared/RenderBadge";
import ProfileLinks from "../shared/ProfileLinks";

import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import RegisteredJobs from "./RegisteredJobs";

const CompanyPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [company, setCompany] = useState(null); // Use state to store the fetched company data
    const [loading, setLoading] = useState(true);
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_COMPANY_API_END_POINT}/get/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                const data = await response.json();
                setCompany(data.data); // Update the state with fetched data

            } catch (error) {
                console.error("Error fetching company:", error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchCompany();
    }, [id]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_JOB_API_END_POINT}/recruiter/jobbycompany/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                })
                const data = await response.json();
                setJobs(data.job);

            } catch (error) {
                console.error("Error fetching company:", error);
            }
        }
        fetchJobs();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!company) {
        return <div>No company data found.</div>;
    }

    return (
        <div className="text-dark200_light900 background-light900_dark300 min-h-[100vh] max-w-[100vw]">
            <Navbar />
            <div className="relative">
                <img
                    src="/assets/images/cover-image.png"
                    alt="cover image"
                    className="w-full h-[250px] object-cover relative"
                />
            </div>
            <div className="relative -mt-[100px] z-10 w-[70%] max-sm:w-[90%] mx-auto flex flex-col p-4">
                <div className="background-light900_dark200 rounded-lg flex flex-col p-4 shadow-lg">
                    <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <img
                                src={company.logo || "/assets/images/pfp.jpg"}
                                alt=""
                                className="h-[70px] rounded-full border-2 md:hidden border-white shadow-md"
                            />
                            <button onClick={() => navigate(`/admin/companies/${id}/edit`)} className="md:hidden relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                                    Edit company
                                </span>
                            </button>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex md:gap-11 gap-7 items-center justify-center">
                                <div>
                                    <img
                                        src={company.logo || "/assets/images/pfp.jpg"}
                                        alt=""
                                        className="h-[70px] max-md:hidden rounded-full border-2 border-white shadow-md"
                                    />
                                </div>
                                <div className="flex flex-col md:items-center justify-center gap-2">
                                    <h2 className="h2-semibold">{company.name || "Company Name"}</h2>
                                    <p className="paragraph-semibold">Company-driven platform for problem-solving</p>
                                </div>
                            </div>
                            <div>

                                <button onClick={() => navigate(`/admin/companies/${id}/edit`)} className="max-md:hidden relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                                        Edit Company
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-5 flex-wrap mt-5">
                        <ProfileLinks
                            imgUrl="/assets/icons/link.svg"
                            href={company.website}
                            title={company.websitePlaceholder || `${company.name}.com`}
                        />
                        <RenderBadge name={company.location || "Location not provided"} />
                        <RenderBadge name={company.type || "Industry not specified"} />
                        <RenderBadge name={`${company.size || "Unknown"} employees`} />
                    </div>
                </div>
                <div className="flex flex-col gap-4 mt-4">
                    <div>
                        <h2>About</h2>
                        <p>{company.about || "No information available about this company."}</p>
                        <div className="flex justify-between items-center mt-5">
                            <h1 className="h1-bold">Jobs Created in {company.name}</h1>
                            <p className="text-blue-400 cursor-pointer">View All Jobs</p>
                        </div>
                        <div className="mt-4">
                            <div className="hidden dark:flex">
                                <button className="addJobButton" onClick={() => navigate(`/admin/company/${id}/jobs/create`)}>
                                    <span>Create New Job</span> 
                                </button>
                            </div>
                            <div className=" dark:hidden">
                                <button className="lightAddJobButton" onClick={() => navigate(`/admin/company/${id}/jobs/create`)}>
                                    Create New Job
                                    <svg
                                        height="24"
                                        width="24"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" fill="currentColor"></path>
                                    </svg>
                                </button>

                            </div>
                        </div>

                        <div className="mt-5">
                            <RegisteredJobs data={jobs} setData={setJobs} />
                        </div>
                    </div>
                </div>

            </div>
        </div>



    );
};

export default CompanyPage;
