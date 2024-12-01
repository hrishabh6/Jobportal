import Category from "../Category"
import HeroSection from "../HeroSection"
import Footer from "./Footer"
import JobCard from "./JobCard"
import JobCardSlider from "./JobCardSlider"
import Navbar from "./Navbar"
import { dummyJobs } from "@/lib";
const Home = () => {
  return (
    <div className="background-light900_dark300">
      <Navbar />
      <HeroSection />
      <Category />

      <h2 className="h2-semibold text-dark200_light900 text-center mt-9">Latest Jobs</h2>
      <div className="hidden md:grid md:grid-cols-2 md:grid-rows-3 xl:grid-cols-3 xl:grid-rows-2 gap-4">
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
      <div className="md:hidden  text-dark-100">
        <h2 className="h2-semibold text-dark200_light900 text-center mt-9">Latest Jobs</h2>
        <JobCardSlider>
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
        </JobCardSlider>
      </div>
      <Footer />
    </div>
  )
}

export default Home
