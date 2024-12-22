
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
const RegisteredJobs = ({ data = [] }) => {
    const handleDelete = () => {
        console.log("Delete");
    }
    if (!Array.isArray(data)) {
        console.error("Invalid data prop passed to AppliedJob:", data);
        return <p>No jobs available.</p>;
    }

    return (
        <div>
            {data.length > 0 ? (
                data.map((job, index) => {
                    return (
                        <div
                            key={index}
                            className="card-wrapper rounded-[10px] p-9 sm:px-11 mb-4"
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
                                                        <button className="ui-btn" onClick={handleDelete}>Delete</button>
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
                                    <Link to={`/description/${job?.job?._id}`}>
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
    data: PropTypes.array
};

export default RegisteredJobs;

