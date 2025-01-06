import { useState, useEffect } from "react";
import axios from "axios";

import Footer from "../shared/Footer";
import JobCard from "../shared/JobCard";
import JobCardSlider from "../shared/JobCardSlider";
import Navbar from "../shared/Navbar";
import useGetAllAppliedJobs from "@/hooks/getAllAppliedJobs";
import { useSelector } from "react-redux";
import HeroSection from "../shared/HeroSection";
import { useNavigate } from "react-router-dom";
import MarqueeDemo from "../shared/Slider";

const Home = () => {
  const [allJobs, setAllJobs] = useState([]); // Default state as an empty array
  const [loading, setLoading] = useState(true);

  const { fetchJobs } = useGetAllAppliedJobs(); // Get fetchJobs method
  const { user } = useSelector(store => store.auth)
  const navigate = useNavigate()
  // Fetch all jobs
  const fetchAllJobs = async (limit = 6) => {

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_JOB_API_END_POINT}/get`,
        { params: { limit } } // Pass limit as query parameter
      );
      if (res.data.success) {
        
        setAllJobs(res.data.jobs || []); // Ensure it's always an array
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchAllJobs();
  }, []);

  useEffect(() => {
    if (user) { // Only fetch applied jobs if the user is logged in
      fetchJobs(); // Fetch applied jobs when the component mounts
    }
  }, [fetchJobs, user]);

  useEffect(() => {
    if(user && user.role === "recruiter"){
      navigate("/admin/companies")
    }
  }, [])

  return (
    <div className="background-light900_dark300">
      <Navbar />
      <HeroSection/>
      <MarqueeDemo/>
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
