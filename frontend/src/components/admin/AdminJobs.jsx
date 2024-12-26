import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar"
import RegisteredJobs from "./RegisteredJobs"

const AdminJobs = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_JOB_API_END_POINT}/recruiter/postedjobs`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json(); // Parse the JSON from the response
                console.log("Fetched Jobs:", data);
                setJobs(data.job); // Access `job` from the parsed response data
            } catch (error) {
                console.error("Error fetching jobs:", error.message);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className='text-dark200_light900 background-light900_dark300 min-h-[100vh]'>
            <Navbar />
            <div className="mt-4">
                <div className="max-w-7xl mx-auto p-4 max-md:w-full max-md:p-4">
                    <h1 className="h1-bold text-dark200_light900">Jobs Posted by you</h1>
                    <div className="flex flex-col mt-4">
                        <RegisteredJobs data={jobs} setData={setJobs}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminJobs
