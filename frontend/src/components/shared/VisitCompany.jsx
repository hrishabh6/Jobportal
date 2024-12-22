import Navbar from "../shared/Navbar";
import RenderBadge from "../shared/RenderBadge";
import ProfileLinks from "../shared/ProfileLinks";
import AppliedJob from "../shared/AppliedJob";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const CompanyPage = () => {
    const { id } = useParams();
    const [company, setCompany] = useState(null); // Use state to store the fetched company data
    const [loading, setLoading] = useState(true);
    
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
                console.log(data.data);
               
            } catch (error) {
                console.error("Error fetching company:", error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchCompany();
    }, [id]);
    
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!company) {
        return <div>No company data found.</div>;
    }

    return (
        <div className="text-dark200_light900 background-light900_dark300 min-h-[100vh] max-w-[100vw]">
            <Navbar />
            <div>
                <img src="/assets/images/cover-image.png" alt="cover image" className="w-full h-[285px] fixed" />
                <div className="text-dark200_light900 z-10 w-[70%] max-sm:w-[100%] mx-auto relative top-[190px] flex flex-col p-4">
                    <div className="background-light900_dark200 rounded-lg flex flex-col p-4">
                        <div className="flex flex-col">
                            <div className="flex justify-end mb-6">
                                <button className="Btn BtnMaxHide items-end">
                                    <img src="/assets/icons/plus.svg" alt="" className="invert" />
                                    Follow
                                </button>
                            </div>
                            <div className="flex justify-between ">
                                <div className="flex md:gap-11 gap-7 items-center justify-center">
                                    <div>
                                        <img src={company.logo || "/assets/images/pfp.jpg"} alt="" className="h-[70px]" />
                                    </div>
                                    <div className="flex flex-col md:items-center justify-center gap-2">
                                        <h2 className="h2-semibold">{company.name || "Company Name"}</h2>
                                        <p className="paragraph-semibold">Company driven platform for problem solving</p>
                                    </div>
                                </div>
                                <div>
                                    <button className="Btn BtnHide">
                                        <img src="/assets/icons/plus.svg" alt="" className="invert" />
                                        Follow
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-5 flex-wrap mt-5">
                            <ProfileLinks imgUrl="/assets/icons/link.svg" href={company.website} title={company.websitePlaceholder || `${company.name}.com`} />
                            <RenderBadge name={company.location || "Location not provided"} />
                            <RenderBadge name={company.type || "Industry not specified"} />
                            <RenderBadge name={`${company.size || "Unknown"} employees`} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <h2>About</h2>
                            <p>{company.about || "No information available about this company."}</p>
                            <div className="flex justify-between items-center mt-5">
                                <h1 className="h1-bold">Jobs from {company.name}</h1>
                                <p className="text-blue-400 cursor-pointer">View All Jobs</p>
                            </div>
                            <div>
                                <AppliedJob />
                            </div>
                        </div>
                        <div className="bg-green-500 p-4 text-white text-center">Column 2</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyPage;
