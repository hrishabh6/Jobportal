import { useState, useEffect } from "react";
import axios from "axios";
import Category from "../Category";
import HeroSection from "../HeroSection";
import Footer from "./Footer";
import JobCard from "./JobCard";
import JobCardSlider from "./JobCardSlider";
import Navbar from "./Navbar";
const Home = () => {
  const [allJobs, setAllJobs] = useState([]); // Default state as an empty array
  const [loading, setLoading] = useState(true);

  const fetchAllJobs = async (limit = 6) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_JOB_API_END_POINT}/get`,
        { params: { limit } } // Pass limit as query parameter
      );
      if (res.data.success) {
        console.log(res.data.jobs);
        setAllJobs(res.data.jobs || []); // Ensure it's always an array
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllJobs(); // Fetch jobs on component mount
  }, []);

  return (
    <div className="background-light900_dark300">
      <Navbar />
      <HeroSection />
      <Category />

      <h2 className="h2-semibold text-dark200_light900 text-center mt-9">
        Latest Jobs
      </h2>
      <div className="hidden md:grid md:grid-cols-2 md:grid-rows-3 xl:grid-cols-3 xl:grid-rows-2 gap-4">
        {allJobs.map((job, index) => (
          <JobCard
            logo={job.company.logo}
            jobId={job._id}
            key={index}
            title={job.title}
            description={job.description}
            company={job.company.name}
            location={job.location}
            employmentType={job.employmentType}
            salary={job.salary}
            experience={job.experience}
            positions={job.positions}
          />
        ))}
      </div>
      <div className="md:hidden text-dark-100">
        <h2 className="h2-semibold text-dark200_light900 text-center mt-9">
          Latest Jobs
        </h2>
        {loading ? (
          <p>Loading jobs...</p>
        ) : allJobs.length > 0 ? (
          <JobCardSlider>
            {allJobs.map((job, index) => (
              <JobCard
              logo={job.company.logo}
                key={index}
                title={job.title}
                description={job.description}
                company={job.company.name}
                location={job.location}
                employmentType={job.employmentType}
                salary={job.salary}
                experience={job.experience}
                positions={job.positions}
              />
            ))}
          </JobCardSlider>
        ) : (
          <p>No jobs available</p> // Handle case when no jobs are fetched
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
