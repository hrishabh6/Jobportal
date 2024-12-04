import { setAllJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllAppliedJobs = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.allJobs);

  // Function to fetch jobs
  const fetchJobs = useCallback(async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APPLICATION_API_END_POINT}/get`, {
        withCredentials: true,
      });
      
      if (res.data.success) {

        dispatch(setAllJobs(res.data.application));
      }
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
    }
  }, [dispatch]);

  return { fetchJobs, jobs }; // Return fetch function and jobs
};

export default useGetAllAppliedJobs;
