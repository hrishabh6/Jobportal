import JobCard from "./JobCard";
import Navbar from "./Navbar"
import { dummyJobs } from "@/lib";


const Browse = () => {

  return (
    <div className="background-light900_dark300 min-h-[100vh]">
      <Navbar />
      <div className="flex flex-col justify-center items-center gap-4 mt-10">
        <div className="w-1/2 max-sm:w-3/4 background-light700_dark400 relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
          <img
            src="/assets/icons/search.svg"
            width={24}
            height={24}
            alt="search"
            className="cursor-pointer"
          />
          <input
            type="text"
            placeholder="Search for Jobs"
            className="w-full ml-3 no-focus paragraph-regular placeholder text-dark400_light700 border-none shadow-none outline-none bg-transparent"
          />
        </div>
        <div className="md:grid md:grid-cols-2 md:grid-rows-3 xl:grid-cols-3 xl:grid-rows-2 gap-4">
          {dummyJobs.map((job, index) => (
            <JobCard
              key={index}  // It's good practice to use a unique key for each list item
              title={job.title}
              description={job.description}
              company={job.company}
              location={job.location}
              employmentType={job.employmentType}
              salary={job.salary}
              experience={job.experience}
              positions={job.positions}
            />
          ))}
        </div>

      </div>
    </div>
  )

}

export default Browse
