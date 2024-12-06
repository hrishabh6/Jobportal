import { getTimestamp } from "@/lib";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const AppliedJob = ({ data = [] }) => {

  // Ensure `data` is always an array
  if (!Array.isArray(data)) {
    console.error("Invalid data prop passed to AppliedJob:", data);
    return <p>No jobs available.</p>;
  }

  return (
    <div>
      {data.length > 0 ? (
        data.map((job, index) => {
          const isPending = job.status === "pending"; // Adjust based on your status logic
          return (
            <div
              key={index}
              className="card-wrapper rounded-[10px] p-9 sm:px-11 mb-4"
            >
              <div className="flex justify-start items-center flex-wrap gap-3">
                <p
                  className={`body-medium text-dark400_light700 flex items-center gap-3 max-sm:gap-1`}
                >
                  <img
                    src={job.job.company.logo || "/assets/images/pfp.jpg"}
                    alt={"profile"}
                    width={30}
                    height={30}
                    className={`object-contain rounded-full`}
                  />
                  <span className="text-[20px] ml-1 font-medium leading-[15.6px]">
                    {job.job.company.name || "Company Name"}
                  </span>
                  <span
                    className={`small-regular line-clamp-1 leading-3 max-sm:hidden`}
                  >
                    • Applied {getTimestamp(job.createdAt) || "N days ago"}
                  </span>
                </p>
              </div>
              <div className="mt-5 max-sm:mt-3 flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
                <div>
                  <Link to={`/description/${job.job._id}`}>
                    <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
                      {job.job.title || "Job Title"}
                    </h3>
                  </Link>
                </div>
              </div>
              <div className="mt-3.5 flex flex-wrap gap-2">
                <p className="paragraph-regular text-dark400_light800">
                  {job.job.description ||
                    "We are looking for a skilled candidate for this role."}
                </p>
              </div>
              <div className="flex items-center mt-6 w-full flex-wrap gap-3">
                <p className="body-semibold text-dark200_light900">Status: </p>
                {isPending ? (
                  <div className="flex gap-2">
                    <img
                      src="/assets/icons/pending.svg"
                      className="invert-0 dark:invert"
                      height={18}
                      width={18}
                    />
                    <p className="text-dark300_light900">Pending</p>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <img
                      src="/assets/icons/accepted.svg"
                      height={18}
                      width={18}
                    />
                    <p className="text-dark300_light900">Accepted</p>
                  </div>
                )}
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
AppliedJob.propTypes = {
  data: PropTypes.array
};

export default AppliedJob;

