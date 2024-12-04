import { setAllJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.allJobs);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_JOB_API_END_POINT}/get`);
        console.log(res.data);
        if (res.data.success) {
          dispatch(setAllJobs(res.data.job));
        }
      } catch (error) {
        console.error(error);
      }
    };  

    fetchJobs();
  }, [dispatch]);

  return jobs;
};

export default useGetAllJobs;

