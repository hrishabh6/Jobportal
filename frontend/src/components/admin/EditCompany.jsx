import axios from "axios";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef, useState } from 'react';
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { useNavigate, useParams } from "react-router-dom";


const EditCompany = () => {
    const fileInputRef = useRef(null);
    const { loading } = useSelector(store => store.auth)
    const handleButtonClick = () => {
        fileInputRef.current.click(); // Trigger the file input click
    };

    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [company, setCompany] = useState(null);
    const [input, setInput] = useState({
        name: "",
        linkedin: "",
        location: "",
        website: "",
        description: "",
        size: "",
        type: "",
        websitePlaceholder: "",
        profile: null,
    });

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${import.meta.env.VITE_COMPANY_API_END_POINT}/get/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                const data = await response.json();

                setCompany(data); // Update the state with fetched data

            } catch (error) {
                console.error("Error fetching company:", error);
            } finally {
                setIsLoading(false); // Set loading to false after fetching
            }
        }
        fetchCompany();
    }, [])

    useEffect(() => {
        if (company) {
            setInput({
                name: company.data.name || "",
                linkedin: company.data.linkedin || "",
                location: company.data.location || "",
                website: company.data.website || "",
                description: company.data.description || "",
                size: company.data.size || "",
                type: company.data.type || "",
                bio: company.data.bio || "",
                websitePlaceholder: company.data.websitePlaceholder || "",
                profile: null, // Files aren't included in the fetched data
            });
        }
    }, [company]);

    const handleEventChange = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value });
    }

    const handleFileChange = (event) => {
        const file = event.target.files?.[0]; // Get the selected file
        if (file) {
            setInput((prev) => ({ ...prev, profile: file })); // Store file in state
        }
    };
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("companyName", input.name);
        formData.append("linkedin", input.linkedin);
        formData.append("location", input.location);
        formData.append("website", input.website);
        formData.append("description", input.description);
        formData.append("size", input.size);
        formData.append("type", input.type);
        formData.append("bio", input.bio);
        formData.append("websitePlaceholder", input.websitePlaceholder);
        if (input.profile) {
            formData.append("profile", input.profile);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.put(`${import.meta.env.VITE_COMPANY_API_END_POINT}/update/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate(`/admin/companies/${id}`);
            }

        } catch (error) {
            console.error("Error during API call:", error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (

        <div className="text-dark200_light900 background-light900_dark300 min-h-[100vh]">
            <Navbar />
            <div className="flex flex-col items-center justify-center mt-11">
                <div className="w-full max-w-md background-light900_dark200 rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold font-dark200_light900 mb-4">Edit Company</h2>

                    <form onSubmit={submitHandler} className="flex flex-col gap-3">
                        <Label htmlFor="name" className="text-dark200_light900  mt-4">Company&apos;s Name <span className="text-orange-500">*</span></Label>
                        <input
                            value={input.name}
                            name="name"
                            onChange={handleEventChange}
                            type="text"
                            className="background-light850_dark100 placeholder  text-dark200_light800 border-0 rounded-md p-2 mb-4 focus:background-light800_dark400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            placeholder="Company's Name"
                        />
                        <Label htmlFor="linkedin" className="text-dark200_light900 ">Company&apos;s Linkedin Page</Label>
                        <input
                            value={input.linkedin}
                            name="linkedin"
                            onChange={handleEventChange}
                            type="text"
                            className="background-light850_dark100 placeholder text-dark200_light800 border-0 rounded-md p-2 mb-4 focus:background-light800_dark400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            placeholder="Linked In URL"
                        />
                        <Label htmlFor="location" className="text-dark200_light900 ">Company&apos;s Location <span className="text-orange-500">*</span></Label>
                        <input
                            value={input.location}
                            name="location"
                            onChange={handleEventChange}
                            type="text"
                            className="background-light850_dark100 placeholder text-dark200_light800 border-0 rounded-md p-2 mb-4 focus:background-light800_dark400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            placeholder="Location"
                        />
                        <Label htmlFor="website" className="text-dark200_light900 ">Company&apos;s website</Label>
                        <input
                            value={input.website}
                            name="website"
                            onChange={handleEventChange}
                            type="text"
                            className="background-light850_dark100 placeholder text-dark200_light800 border-0 rounded-md p-2 mb-4 focus:background-light800_dark400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            placeholder="Website"
                        />
                        <Label htmlFor="websitePlaceholder" className="text-dark200_light900 ">Placeholder for website</Label>
                        <input
                            value={input.websitePlaceholder}
                            name="websitePlaceholder"
                            onChange={handleEventChange}
                            type="text"
                            className="background-light850_dark100 placeholder text-dark200_light800 border-0 rounded-md p-2 mb-4 focus:background-light800_dark400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            placeholder="devoverflow"
                        />
                        <Label htmlFor="size" className="text-dark200_light900 ">Company Size</Label>
                        <input
                            value={input.size}
                            name="size"
                            onChange={handleEventChange}
                            type="text"
                            className="background-light850_dark100 placeholder text-dark200_light800 border-0 rounded-md p-2 mb-4 focus:background-light800_dark400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            placeholder="eg; 100-200 employees"
                        />
                        <Label htmlFor="type" className="text-dark200_light900 ">Company Type</Label>
                        <input
                            value={input.type}
                            name="type"
                            onChange={handleEventChange}
                            type="text"
                            className="background-light850_dark100 placeholder text-dark200_light800 border-0 rounded-md p-2 mb-4 focus:background-light800_dark400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            placeholder="eg; digital marketing"
                        />
                        <Label htmlFor="bio" className="text-dark200_light900 ">Company&apos;s bio</Label>
                        <input
                            value={input.bio}
                            name="bio"
                            onChange={handleEventChange}
                            type="text"
                            className="background-light850_dark100 placeholder text-dark200_light800 border-0 rounded-md p-2 mb-4 focus:background-light800_dark400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            placeholder="Should be a brief description of the company"
                        />
                        <Label htmlFor="description" className="text-dark200_light900 ">Company&apos;s description <span className="text-orange-500">*</span></Label>
                        <textarea
                            value={input.description}
                            name="description"
                            onChange={handleEventChange}
                            rows={10}
                            className="background-light850_dark100 placeholder text-dark200_light800 border-0 rounded-md p-2 mb-4 focus:background-light800_dark400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            placeholder="Description"
                        ></textarea>
                        <div>
                            <Label htmlFor="profile-upload">
                                <button
                                    type="button"
                                    onClick={handleButtonClick}
                                    className="bg-slate-950 text-slate-400 border border-slate-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
                                >
                                    <span className="bg-slate-400 shadow-slate-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                                    Update Logo
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

                        <button
                            type="submit"
                            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                        >
                            {loading ? "Loading..." : "Edit Company"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};



export default EditCompany;
