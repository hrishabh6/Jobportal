
import { useState } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import Navbar from './Navbar';
import axios from 'axios';
import { setLoading, setUser } from '@/redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';



const UpdateProfile = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { loading } = useSelector(store => store.auth)

  const [input, setInput] = useState({
    fullName: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    role: user?.role || "student",
    location: user?.profile?.address || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills.map(skill => skill) || "",
    portfolio: user?.profile?.portfolioWebsite || "",
    file: user?.profile?.file || "",
    profile: null,
    resume:  null,
  });

  const onSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("username", input.username);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("skills", input.skills);
    formData.append("portfolio", input.portfolio);
    formData.append("bio", input.bio);
    formData.append("location", input.location);
    if (input.profile) {
      formData.append("profile", input.profile);
    }
    if (input.resume) {
      formData.append("resume", input.resume);
    }
    console.log([...formData.entries()]); // Log FormData to verify it's correctly appended

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${import.meta.env.VITE_USER_API_END_POINT}/profile/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log("Response:", res.data);
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigateTo("/profile");
        toast.success(res.data.message);
      }
      console.log(input)
    } catch (error) {
      console.error("Error during API call:", error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  }

  const handleEventChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  }
  const handleFileChange = (event) => {
    const file = event.target.files?.[0]; // Get the selected file
    if (file) {
      setInput((prev) => ({ ...prev, profile: file })); // Store file in state
    }
  };

  const handleResumeChange = (event) => {
    const file = event.target.files?.[0]; // Get the selected file
    if (file) {
      setInput((prev) => ({ ...prev, resume: file })); // Store file in state
    }
  }

  return (
    <div className='background-light900_dark200 min-h-[100vh]'>
      <Navbar />
      <form
        encType="multipart/form-data"
        onSubmit={onSubmit}
        className="mt-9 mx-auto flex flex-col  w-1/2 max-sm:w-3/4 background-light900_dark200  gap-6 text-dark400_light800 p-4 overflow-auto"
        autoComplete="off"
      >
        <h1 className="h1-bold text-dark100_light900 text-center">Update Profile</h1>

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
            value={input.email}
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleEventChange}
            className="mt-2 w-3/4 max-sm:w-full no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 ,min-h-[56px] border"
          />
        </div>

        {/* Phone Number Field */}
        <div>
          <Label>Phone Number <span className="text-orange-500">*</span></Label>
          <Input
            value={input.phoneNumber}
            name="phoneNumber"
            type="text"
            placeholder="Phone Number"
            onChange={handleEventChange}
            className="mt-2 w-3/4 max-sm:w-full no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 ,min-h-[56px] border"
          />
        </div>
        <div>
          <Label>Bio <span className="text-orange-500">*</span></Label>
          <Input
            value={input.bio}
            name="bio"
            type="text"
            placeholder="introduce yourself"
            onChange={handleEventChange}
            className="mt-2 w-3/4 max-sm:w-full no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 ,min-h-[56px] border"
          />
        </div>
        <div>
          <Label>Your Location <span className="text-orange-500">*</span></Label>
          <Input
            value={input.location}
            name="location"
            type="text"
            placeholder="eg.; Bangalore, India"
            onChange={handleEventChange}
            className="mt-2 w-3/4 max-sm:w-full no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 ,min-h-[56px] border"
          />
        </div>
        <div>
          <Label>Skills <span className="text-orange-500">*</span></Label>
          <Input
            value={input.skills}
            name="skills"
            type="text"
            placeholder="react, node, express"
            onChange={handleEventChange}
            className="mt-2 w-3/4 max-sm:w-full no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 ,min-h-[56px] border"
          />
        </div>
        <div>
          <Label>Your Portfoio link</Label>
          <Input
            value={input.portfolio}
            name="portfolio"
            type="text"
            placeholder="url to your portfolio"
            onChange={handleEventChange}
            className="mt-2 w-3/4 max-sm:w-full no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 ,min-h-[56px] border"
          />
        </div>
        {/* File Input */}
        <div>
          <Label
            htmlFor="profile-upload"
            className="mt-5 w-1/2 min-h-[36px] max-sm:w-3/4 flex items-center justify-center px-4 py-2 rounded-lg cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md hover:opacity-90 active:scale-95"
          >
            Update Profile Picture
          </Label>
          <Input
            id="profile-upload"
            name="profile"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          {
            input.profile && (
              <p className="mt-2 text-sm text-gray-700">
                Selected File: {input.profile.name}
              </p>
            )}
          <Label
            htmlFor="resume-upload"
            className="mt-5 w-1/2 min-h-[36px] max-sm:w-3/4 flex items-center justify-center px-4 py-2 rounded-lg cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md hover:opacity-90 active:scale-95"
          >
            Update Resume
          </Label>
          <Input
            id="resume-upload"
            name="resume"
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleResumeChange}
          />
          {input.resume && (
            <p className="mt-2 text-sm text-gray-700">
              Selected File: {input.resume.name}
            </p>
          )}
        </div>
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


      </form>

    </div>
  )
}


export default UpdateProfile

