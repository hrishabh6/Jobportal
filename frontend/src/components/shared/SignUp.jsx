import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import Recaptcha from "../captcha/Recaptcha";


const SignUp = () => {
  const [input, setInput] = useState({
    fullName: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "student",
    profile: null,
  });
  const [captchaToken, setCaptchaToken] = useState("null");
  const { loading } = useSelector(store => store.auth)
  const dispatch = useDispatch();
  const handleEventChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };
  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click(); // Trigger the file input click
};

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]; // Get the selected file
    if (file) {
      setInput((prev) => ({ ...prev, profile: file })); // Store file in state
    }
  };

  const navigateTo = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("username", input.username);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    formData.append("captchaToken", captchaToken);
    if (input.profile) {
      formData.append("profile", input.profile);
    }
    console.log([...formData.entries()]); // Log FormData to verify it's correctly appended

    try {
      dispatch(setLoading(true));
      
      const res = await axios.post(`${import.meta.env.VITE_USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log("Response:", res.data);      
      if (res.data.success) {
        navigateTo("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error during API call:", error);
      toast.error(error.response.data.message);
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
        <h1 className="h1-bold text-dark100_light900 text-center">Sign Up</h1>

        {/* Full Name Field */}
        <div>
          <Label>Full Name <span className="text-orange-500">*</span></Label>
          <Input
            name="fullName"
            placeholder="Full Name"
            value={input.fullName}
            onChange={handleEventChange}
            className="mt-2 w-3/4 max-sm:w-full no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 ,min-h-[56px] border"
          />
        </div>

        {/* Username Field */}
        <div>
          <Label>Username <span className="text-orange-500">*</span></Label>
          <Input
            name="username"
            placeholder="Username"
            value={input.username}
            onChange={handleEventChange}
            className="mt-2 w-3/4 max-sm:w-full no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 ,min-h-[56px] border"
          />
        </div>

        {/* Email Field */}
        <div>
          <Label>Email <span className="text-orange-500">*</span></Label>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={input.email}
            onChange={handleEventChange}
            className="mt-2 w-3/4 max-sm:w-full no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 ,min-h-[56px] border"
          />
        </div>

        {/* Phone Number Field */}
        <div>
          <Label>Phone Number <span className="text-orange-500">*</span></Label>
          <Input
            name="phoneNumber"
            type="text"
            placeholder="Phone Number"
            value={input.phoneNumber}
            onChange={handleEventChange}
            className="mt-2 w-3/4 max-sm:w-full no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 ,min-h-[56px] border"
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
            className="mt-2 w-3/4 max-sm:w-full no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 ,min-h-[56px] border"
          />
        </div>

        {/* File Input */}
        <div>
          <Label htmlFor="profile-upload">
            <button
              type="button"
              onClick={handleButtonClick}
              className="bg-slate-950 text-slate-400 border border-slate-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
            >
              <span className="bg-slate-400 shadow-slate-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
              Upload Logo
            </button>
          </Label>
          <Input
            id="profile-upload"
            name="profile"
            type="file"
            accept="image/*"
            ref={fileInputRef} // Attach the ref to the file input
            className="hidden"
            onChange={handleFileChange}
          />
          {input.profile && (
            <p className="mt-2 text-sm text-dark300_light700    ">
              Selected File: {input.profile.name}
            </p>
          )}
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
          <Recaptcha action="login" onVerify={setCaptchaToken} />
        {/* Submit Button */}
        {
          loading ? <Button className="w-1/3 mx-auto primary-gradient text-white py-2 px-4 rounded-lg"> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> </Button>
            : <Button
              type="submit"
              className="w-1/3 mx-auto bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600"
            >
              Submit
            </Button>

        }


        <p>
          Already have an Account?{" "}
          <Link to={`/login`} className="text-light400_light500">Login</Link>
        </p>
      </form>
    </>
  );
};

export default SignUp;
