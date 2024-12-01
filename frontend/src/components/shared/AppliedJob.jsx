import { Link } from "react-router-dom"

const AppliedJob = () => {
    const isPending = true;
    return (
        <div className="card-wrapper  rounded-[10px] p-9 sm:px-11">
            <div className="flex-start flex-wrap gap-3">
                <p className={`body-medium text-dark400_light700" flex items-center gap-1`}>
                    <img
                        src={"/assets/images/pfp.jpg"}
                        alt={"profile"}
                        width={30}
                        height={30}
                        className={`object-contain rounded-full`}
                    />
                    <span className="text-[20px] ml-1 font-medium leading-[15.6px]">Google</span>
                    <span
                        className={`small-regular line-clamp-1 leading-3 max-sm:hidden`}>
                        • Applied 2 days ago
                    </span>
                </p>
            </div>
            <div className="mt-3 flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
                <div>
                    
                    <Link to={`/jobPage`}>
                        <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
                            Frontend Developer
                        </h3>
                    </Link>
                </div>
            </div>
            <div className="mt-3.5 flex flex-wrap gap-2">
                <p className="paragraph-regular text-dark400_light800">
                    We are looking for a skilled frontend developer to join our team. The ideal candidate will have experience in building responsive web applications.
                </p>
            </div>
            <div className="flex items-center mt-6 w-full flex-wrap gap-3">
                <p className="body-semibold text-dark200_light900">Status: </p>
                {
                    isPending ? (
                        <div className="flex gap-2">
                            <img src="/assets/icons/pending.svg" className="invert-0 dark:invert" height={18} width={18} />
                            <p className="text-dark300_light900">Pending</p>

                        </div>
                    ) : (
                        <img src="/assets/icons/accepted.svg" height={18} width={18} />
                    )
                }
            </div>
        </div>
    )
}

export default AppliedJob
