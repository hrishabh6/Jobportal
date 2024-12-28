
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner";
import axios from "axios";
const RegisteredJobs = ({ data = [], setData }) => {
    const handleDelete = async (id) => {
        try {
            console.log("Delete route accessed with ID:", id);
            const response = await fetch(`${import.meta.env.VITE_JOB_API_END_POINT}/delete/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const data = await response.json();
            console.log(data)
            if (data.success) {
                toast.success(data.message)
                setData(prevData => prevData.filter(job => job._id !== id))
            } else {
                toast.error("Error while deleting job");
            }
        } catch (error) {
            console.log(error)
        }
    }


    const handleJobClose = async (id, newStatus) => {
        try {
            console.log(`Close route accessed with ID: ${id} and Status: ${newStatus}`);
            const response = await axios.post(
                `${import.meta.env.VITE_JOB_API_END_POINT}/updatestatus/${id}`,
                { updatedStatus: newStatus },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            const data = response.data;
            console.log(data);
            if (data.success) {
                toast.success(data.message);
                // Update the job status in the state immediately
                setData(prevData =>
                    prevData.map(job =>
                        job._id === id ? { ...job, status: newStatus } : job
                    )
                );
            } else {
                toast.error("Error while updating job status");
            }
        } catch (error) {
            console.error("Error updating job status:", error);
        }
    };
    


    if (!Array.isArray(data)) {
        console.error("Invalid data prop passed to AppliedJob:", data);
        return <p>No jobs available.</p>;
    }

    return (
        <div className="">
            {data.length > 0 ? (
                data.map((job, index) => {
                    return (
                        <div
                            key={index}
                            className={`${job.status === 'closed' ? 'background-light700_dark400' : 'card-wrapper'} rounded-[10px] p-9 sm:px-11 mb-4`}
                        >
                            <div className="flex justify-between items-center ">
                                <div className="flex justify-start items-center flex-wrap gap-3">
                                    <p
                                        className={`body-medium text-dark400_light700 flex items-center gap-3 max-sm:gap-1`}
                                    >
                                        <img
                                            src={job.company.logo || "/assets/images/pfp.jpg"}
                                            alt={"profile"}
                                            width={30}
                                            height={30}
                                            className={`object-contain rounded-full`}
                                        />
                                        <span className="text-[20px] ml-1 font-medium leading-[15.6px]">
                                            {job.company.name || "Company Name"}
                                        </span>
                                        <span
                                            className={`small-regular line-clamp-1 leading-3 max-sm:hidden`}
                                        >
                                            created at {new Date(job.createdAt).toLocaleDateString() || "N/A"}
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <button className="button">
                                                <svg viewBox="0 0 448 512" className="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
                                            </button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px] bg-slate-700 dark:bg-dark-400 text-white ">
                                            <DialogHeader>
                                                <DialogTitle className="text-center">WARNING</DialogTitle>
                                                <DialogDescription className="text-light-700 dark:text-white mt-4">
                                                    Are you sure you want to delete this job
                                                </DialogDescription>
                                            </DialogHeader>

                                            <DialogFooter>
                                                <div className="flex justify-between gap-4 items-center mt-4">
                                                    <DialogClose asChild>
                                                        <button className="ui-btn" onClick={() => handleDelete(job._id)}>Delete</button>
                                                    </DialogClose>
                                                    <DialogClose asChild>
                                                        <button className="confirm-btn"> Nah, just kidding</button>
                                                    </DialogClose>
                                                </div>

                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>


                                </div>


                            </div>
                            <div className="mt-5 max-sm:mt-3 flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
                                <div>
                                    <Link to={`/admin/jobpage/${job._id}`}>
                                        <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
                                            {job.title || "Job Title"}
                                        </h3>
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-3.5 flex flex-wrap gap-2">
                                <p className="paragraph-regular text-dark400_light800">
                                    {job.description ||
                                        "We are looking for a skilled candidate for this role."}
                                </p>
                            </div>
                            <div className="flex items-center mt-6 w-full flex-wrap gap-3">
                                <p className="body-semibold text-dark200_light900">No of Applicants applied :  </p>
                                {
                                    job.applications.length
                                }
                            </div>
                            <div>
                                <p className="small-regular text-dark400_light700 mt-4">Status : {job.status}</p>
                            </div>
                            <div >
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <button
                                            className="mt-4 inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                                        >
                                            {/* Dynamically change the button text based on job status */}
                                            {job.status === "closed" ? "Re-open job" : "Close job"}
                                        </button>
                                    </DialogTrigger>

                                    <DialogContent className="sm:max-w-[425px] bg-slate-700 dark:bg-dark-400 text-white ">
                                        <DialogHeader>
                                            <DialogTitle className="text-center">WARNING</DialogTitle>
                                            <DialogDescription className="text-light-700 dark:text-white mt-4">
                                                Are you sure you want to {job.status === "closed" ? "re-open" : "close"} this job?
                                            </DialogDescription>
                                        </DialogHeader>

                                        <DialogFooter>
                                            <div className="flex justify-between gap-4 items-center mt-4 w-full">
                                                {/* Button to Close or Re-open Job */}
                                                <DialogClose asChild>
                                                    <button
                                                        className="ui-btn"
                                                        onClick={() => {
                                                            if (job.status === "open") {
                                                                handleJobClose(job._id, "closed"); // Re-open job if it's closed
                                                            }
                                                        }}
                                                    >
                                                        {job.status === "closed" ? "Cancel" : "Close Job"}
                                                    </button>
                                                </DialogClose>

                                                {/* Button to Cancel or Close Job */}
                                                <DialogClose asChild>
                                                    <button
                                                        className="confirm-btn"
                                                        onClick={() => {
                                                            if (job.status === "closed") {
                                                                handleJobClose(job._id, "open"); // Close job if it's open
                                                            }
                                                        }}
                                                    >
                                                        {job.status === "closed" ? "Re-open Job" : "Nah, just kidding"}
                                                    </button>
                                                </DialogClose>
                                            </div>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>

                            </div>





                        </div>
                    );
                })
            ) : (
                <p>No jobs available.</p>
            )}
        </div>
    );
};
RegisteredJobs.propTypes = {
    data: PropTypes.array,
    setData: PropTypes.func.isRequired
};

export default RegisteredJobs;

