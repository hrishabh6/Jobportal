import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Button } from "../ui/button";
import {  Loader2 } from "lucide-react";

const SignUp = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "student",
  });
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector(store => store.auth)
  const handleEventChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };


  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${import.meta.env.VITE_USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log("Response:", res.data);
      if (res.data.success) {
        navigateTo("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error during API call:", error);
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Navbar />

      <form
        onSubmit={onSubmit}
        className="mt-9 mb-9 mx-auto flex flex-col w-1/2 max-sm:w-3/4 gap-6 text-dark400_light800 shadow-md dark:shadow-light-500 p-4"
        autoComplete="off"
      >
        <h1 className="h1-bold text-dark100_light900 text-center">Log-In</h1>

        {/* Email Field */}
        <div>
          <Label>Email <span className="text-orange-500">*</span></Label>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={input.email}
            onChange={handleEventChange}
            className="w-1/2 max-sm:w-full no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 ,min-h-[56px] border"
          />
        </div>

        {/* Password Field */}
        <div>
          <Label>Password <span className="text-orange-500">*</span></Label>
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={input.password}
            onChange={handleEventChange}
            className="w-1/2 max-sm:w-full no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 ,min-h-[56px] border"
          />
        </div>


        {/* Role Radio Buttons */}
        <div>
          <Label>Role</Label>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="student"
                id="student"
                checked={input.role === "student"}
                onChange={handleEventChange}

              />
              <Label htmlFor="student">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                id="recruiter"
                checked={input.role === "recruiter"}
                onChange={handleEventChange}

              />
              <Label htmlFor="recruiter">Recruiter</Label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        {
          loading ? <Button className="w-1/3 mx-auto primary-gradient text-white py-2 px-4 rounded-lg"> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> </Button>
            : <Button
              type="submit"
              className="w-1/3 mx-auto primary-gradient text-white py-2 px-4 rounded-lg"
            >
              Submit
            </Button>

        }

        <p>
          Don &apos;t have an account?{" "}
          <Link to={`/signup`} className="text-light400_light500">Sign-Up</Link>
        </p>
      </form>
    </>
  );
};

export default SignUp;
