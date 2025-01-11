import { setAllJobs } from "@/redux/jobSlice";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllAppliedJobs = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.allJobs);

  // Function to fetch jobs
  const fetchJobs = useCallback(async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_APPLICATION_API_END_POINT}/get`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // Ensure credentials are sent
      });

      // Parse the response body
      const data = await res.json(); // This is where the body gets parsed to JSON

      if (data.success) {
        dispatch(setAllJobs(data.application));  // Make sure 'data.application' is the right response field
      }
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
    }
  }, [dispatch]);

  return { fetchJobs, jobs }; // Return fetch function and jobs
};


export default useGetAllAppliedJobs;
