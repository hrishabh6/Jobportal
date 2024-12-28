import axios from "axios"
import ProfileLinks from "../shared/ProfileLinks"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getTimestamp } from "@/lib"
import { useDispatch, useSelector } from "react-redux"
import { setLoading } from "@/redux/authSlice"
import { Skeleton } from "../ui/skeleton"
import Navbar from "../shared/Navbar"
import RenderBadge from "../shared/RenderBadge"
import ParseHTML from "../shared/ParseHTML"
import { ApplicantsTable } from "./ApplicantsTable"
const JobPage = () => {
    const { allJobs } = useSelector(store => store.jobs);
    const { id } = useParams();
    const { loading } = useSelector(store => store.auth)
    const dispatch = useDispatch();
    const [job, setJob] = useState({});
    const findJobById = async (id) => {
        try {
            dispatch(setLoading(true));
            const res = await axios.get(`${import.meta.env.VITE_JOB_API_END_POINT}/get/${id}`);
            if (res.data.success) {
                setJob(res.data.job);

                
            }
        } catch (error) {
            console.error(error);
        } finally{
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (id) {
            findJobById(id);
        }
    }, [id, allJobs]); // Ensure the effect runs when the job id, allJobs, or user._id changes

    
    

    if (loading) {
        return (
            <>
                <div className="flex mt-9 lg:p-10 p-5 flex-col  w-full gap-5  lg:w-[50vw] lg:mx-auto shadow-light-300">
                    <Skeleton className={`ml-3 h-12 w-[150px]`} />
                    <div className="mt-5 flex flex-wrap items-start justify-start w-full gap-5">
                        <div className="grid grid-cols-[30%_80%] min-w-[50%]">
                            <Skeleton className={`h-[100px] w-[100px] rounded-full`} />
                            <div className="flex flex-col gap-5 items-start max-sm:ml-3">
                                <div className="flex gap-5">
                                    <Skeleton className={`h-[20px] w-[50px]`} />
                                    <Skeleton className={`h-[20px] w-[50px]`} />
                                </div>
                                <div className="flex gap-5 flex-wrap">
                                    <Skeleton className={`h-[30px] w-[50px]`} />
                                    <Skeleton className={`h-[30px] w-[50px]`} />
                                    <Skeleton className={`h-[30px] w-[50px]`} />
                                    <Skeleton className={`h-[30px] w-[50px]`} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex mt-9 flex-col gap-8">
                        <Skeleton className={`h-[30px] w-[40%]`} />
                        <Skeleton className={`h-[200px] w-[90%] `} />
                    </div>
                </div>

            </>

        )
    }

    return (
        <div className="background-light900_dark300 min-h-[100vh]">
            <Navbar />
            <img src="/assets/images/cover-image.png" className="w-full h-[250px] object-cover relative"/>
            <div className="background-light900_dark300 relative -mt-[100px] z-10 flex flex-col  lg:p-10 p-5  w-[95%] mx-auto  lg:w-[50vw] lg:mx-auto shadow-light-300">
                <p className="body-medium text-dark400_light700">{` • posted ${getTimestamp(job.createdAt)}`}</p>
                
                <div className="flex justify-between items-center">
                    <h1 className="h1-bold text-dark100_light900">{job.title}</h1>

                    

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
                                <RenderBadge name={`total applicants: ${job?.applications?.length}`} />
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
                    <div>
                        <h2 className="h2-semibold text-dark200_light900">Job Details</h2>
                        <p className="text-dark200_light900 paragraph-medium"><ParseHTML data={job.details}/></p>
                    </div>
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
            <h1 className="h1-bold text-center mt-8">List of applicants</h1>
            <ApplicantsTable/>
        </div>
    )
}

export default JobPage
