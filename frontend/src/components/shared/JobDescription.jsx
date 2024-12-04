import axios from "axios"
import { Button } from "../ui/button"
import Navbar from "./Navbar"
import ProfileLinks from "./ProfileLinks"
import RenderBadge from "./RenderBadge"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getTimestamp } from "@/lib"
import {  useSelector } from "react-redux"
import { toast } from "sonner"
import useGetAllAppliedJobs from "@/hooks/getAllAppliedJobs"
const JobDescription = () => {
    const isSaved = false
    const { allJobs } = useSelector(store => store.jobs);
    const { user } = useSelector(store => store.auth);
    const { id } = useParams();
    const [job, setJob] = useState({});
    const [isApplied, setIsApplied] = useState(false); // State to store if the job is applied or not
    const { fetchJobs } = useGetAllAppliedJobs(); // Get fetchJobs function from hook
    const findJobById = async (id) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_JOB_API_END_POINT}/get/${id}`);
            if (res.data.success) {
                setJob(res.data.job);

                // Check if user is logged in
                if (user && user._id) {
                    // If logged in, check if the job is in the applied jobs list
                    const isJobApplied = res.data.job.applications.some(applicationId =>
                        allJobs.some(appliedJob => appliedJob._id === applicationId && appliedJob.applicant === user._id)
                    );
                    setIsApplied(isJobApplied); // Update the isApplied state accordingly
                } else {
                    // If the user is not logged in, set isApplied to false
                    setIsApplied(false);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
        if (id) {
            findJobById(id);
        }
    }, [id, allJobs]); // Ensure the effect runs when the job id, allJobs, or user._id changes

    const handleApply = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_APPLICATION_API_END_POINT}/apply/${id}`, {
                withCredentials: true,
            })  
            if(res.data.success){
                setIsApplied(true)
                await fetchJobs(); // Fetch applied jobs after successful login
                toast.success(res.data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response.data.message)
        }
    }



    return (
        <div className="background-light900_dark100 min-h-[100vh]">
            <Navbar />
            <div className="flex flex-col mt-9 lg:p-10 p-5  w-full  lg:w-[50vw] lg:mx-auto shadow-light-300">
                <p className="body-medium text-dark400_light700">{` • posted ${getTimestamp(job.createdAt)}`}</p>
                <div className="flex gap-4 justify-end  mb-5 md:hidden items-center">

                    {
                        isApplied ? <Button disabled>Applied Already</Button> : <Button onClick={handleApply}>Apply Now</Button>
                    }
                    {
                        isSaved ? <img src="/assets/icons/bookmarked.svg" alt="saved" /> : <img src="/assets/icons/bookmark.svg" className="dark:invert invert-0" alt="save" />
                    }


                </div>
                <div className="flex justify-between items-center">
                    <h1 className="h1-bold text-dark100_light900">{job.title}</h1>

                    <div className="flex gap-4 max-md:hidden">
                        {
                            isApplied ? <Button disabled>Applied Already</Button> : <Button onClick={handleApply}>Apply Now</Button>
                        }
                        {
                            isSaved ? <img src="/assets/icons/bookmarked.svg" alt="saved" /> : <img src="/assets/icons/bookmark.svg" className="dark:invert invert-0" alt="save" />
                        }
                    </div>

                </div>
                <div className="mt-5 flex flex-wrap items-start justify-start w-full gap-5">
                    <div className="grid grid-cols-[20%_80%] min-w-[50%]">
                        {
                            job.company ? <img src={job.company.logo} alt={job.company.name} className="h-20 w-20 rounded-lg" /> : <img src="/assets/images/logo-dark.png" height={70} width={70} />
                        }
                        <div className="flex flex-col gap-5 items-start max-sm:ml-3">
                            <div className="flex gap-5">
                                <ProfileLinks
                                    imgUrl="/assets/icons/link.svg"
                                    href={job.company && job.company.website}
                                    title={job.company && job.company.name}
                                />

                                <ProfileLinks
                                    imgUrl="/assets/icons/location.svg"
                                    title={"Delhi, India"}
                                />
                            </div>
                            <div className="flex gap-5 flex-wrap">
                                <RenderBadge name={job.employmentType} />
                                <RenderBadge name={job.location} />
                                <RenderBadge name={job.experience} />
                                <RenderBadge name={job.salary} />
                            </div>
                        </div>

                    </div>
                </div>

                <div className="flex mt-9 flex-col gap-8">
                    <div className="flex gap-3 flex-col">
                        <h2 className="h2-semibold text-dark200_light900">About this role</h2>
                        <p className="text-dark200_light900 paragraph-medium">{job.description}
                        </p>
                    </div>
                    {/* Use a text editor to take job requirements and parse the html here */}
                    <div className="flex flex-col gap-3">
                        <h2 className="h2-semibold text-dark200_light900">Job Requirements</h2>
                        <p className="text-dark200_light900 paragraph-medium">
                            <ul className="list-disc list-inside ml-3 flex flex-col gap-2">
                                {job.requirements &&
                                    job.requirements.map((requirement, index) => (
                                        <li key={index}>{requirement}</li>
                                    ))
                                }
                            </ul>

                        </p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDescription
