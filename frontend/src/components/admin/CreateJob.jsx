import axios from "axios";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "@/lib/useTheme";

const CreateJob = () => {
    const { mode } = useTheme();
    const { loading } = useSelector((store) => store.auth);
    const { id } = useParams();
    const [input, setInput] = useState({
        title: "",
        location: "",
        employmentType: "",
        salary: "",
        experience: "",
        requirements: "",
        description: "",
        details: "",
        positions: "",
        company: id,
    });

    const handleEventChange = (event) => {
        const { name, value } = event.target;
        setInput({ ...input, [name]: value });
    };

    const handleArrayChange = (e) => {
        const { name, value } = e.target;
        setInput((prevInput) => ({
            ...prevInput,
            [name]: value,
        }));
    };




    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            console.log("input data:", input);

            dispatch(setLoading(true));
            const res = await axios.post(`${import.meta.env.VITE_JOB_API_END_POINT}/post`, input, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate(`/admin/companies/${id}`);
            }
        } catch (error) {
            console.error("Error during API call:", error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            dispatch(setLoading(false));
        }
    };


    

    const editorRef = useRef(null);
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="text-dark200_light900 background-light900_dark300 min-h-[100vh]">
            <Navbar />
            <div className="flex flex-col items-center justify-center mt-11 md:max-w-[50%] md:mx-auto max-md:w-full ">
                <div className="w-full background-light900_dark200 rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold font-dark200_light900 mb-4">Create Job</h2>

                    <form onSubmit={submitHandler} className="flex flex-col gap-3">
                        <Label htmlFor="title" className="text-dark200_light900 mt-4">
                            Job Title <span className="text-orange-500">*</span>
                        </Label>
                        <input
                            value={input.title}
                            name="title"
                            onChange={handleEventChange}
                            type="text"
                            className="background-light850_dark100 placeholder text-dark200_light800 border-0 rounded-md p-2 mb-4 focus:background-light800_dark400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            placeholder="e.g., Frontend Developer"
                        />

                        <Label htmlFor="location" className="text-dark200_light900">
                            Location <span className="text-orange-500">*</span>
                        </Label>
                        <input
                            value={input.location}
                            name="location"
                            onChange={handleEventChange}
                            type="text"
                            className="background-light850_dark100 placeholder text-dark200_light800 border-0 rounded-md p-2 mb-4 focus:background-light800_dark400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            placeholder="Location"
                        />

                        <Label htmlFor="employmentType" className="text-dark200_light900">
                            Employment type
                        </Label>
                        <input
                            value={input.employmentType}
                            name="employmentType"
                            onChange={handleEventChange}
                            type="text"
                            className="background-light850_dark100 placeholder text-dark200_light800 border-0 rounded-md p-2 mb-4 focus:background-light800_dark400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            placeholder="e.g., Full-time"
                        />

                        <Label htmlFor="salary" className="text-dark200_light900">
                            Salary
                        </Label>
                        <input
                            value={input.salary}
                            name="salary"
                            onChange={handleEventChange}
                            type="text"
                            className="background-light850_dark100 placeholder text-dark200_light800 border-0 rounded-md p-2 mb-4 focus:background-light800_dark400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            placeholder="e.g., $10k or ₹80k - ₹100k"
                        />

                        <Label htmlFor="requirements" className="text-dark200_light900">
                            Requirements
                        </Label>
                        <input
                            value={input.requirements}
                            name="requirements"
                            onChange={handleArrayChange}
                            type="text"
                            className="background-light850_dark100 placeholder text-dark200_light800 border-0 rounded-md p-2 mb-4 focus:background-light800_dark400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            placeholder="e.g., MERN, Next.js, React Native"
                        />

                        <Label htmlFor="experience" className="text-dark200_light900">
                            Experience
                        </Label>
                        <input
                            value={input.experience}
                            name="experience"
                            onChange={handleEventChange}
                            type="text"
                            className="background-light850_dark100 placeholder text-dark200_light800 border-0 rounded-md p-2 mb-4 focus:background-light800_dark400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            placeholder="e.g., 2-3 years or NA"
                        />

                        <Label htmlFor="positions" className="text-dark200_light900">
                            No of Positions
                        </Label>
                        <input
                            value={input.positions}
                            name="positions"
                            onChange={handleEventChange}
                            type="text"
                            className="background-light850_dark100 placeholder text-dark200_light800 border-0 rounded-md p-2 mb-4 focus:background-light800_dark400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            placeholder="e.g., 2"
                        />

                        <Label htmlFor="description" className="text-dark200_light900">
                            Job Description <span className="text-orange-500">*</span>
                        </Label>
                        <textarea
                            value={input.description}
                            name="description"
                            onChange={handleEventChange}
                            rows={5}
                            className="background-light850_dark100 placeholder text-dark200_light800 border-0 rounded-md p-2 mb-4 focus:background-light800_dark400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            placeholder="A brief description about the job"
                        ></textarea>
                        <Editor
                            apiKey={import.meta.env.VITE_TINY_EDITOR_API_KEY}
                            onInit={(evt, editor) => {
                                // @ts-ignore
                                editorRef.current = editor;
                            }}
                            onEditorChange={(content) => {
                                setInput({ ...input, details: content });
                            }}
                            initialValue={""}
                            init={{
                                height: 350,
                                menubar: false,
                                plugins: [
                                    "advlist",
                                    "autolink",
                                    "lists",
                                    "link",
                                    "image",
                                    "charmap",
                                    "preview",
                                    "anchor",
                                    "searchreplace",
                                    "visualblocks",
                                    "codesample",
                                    "fullscreen",
                                    "insertdatetime",
                                    "media",
                                    "table",
                                ],
                                toolbar:
                                    "undo redo | codesample | " +
                                    "bold italic forecolor | alignleft aligncenter " +
                                    "alignright alignjustify | bullist numlist",
                                content_style: "body { font-family:Inter; font-size:16px }",
                                skin: mode === "dark" ? "oxide-dark" : "oxide",
                                content_css: mode === "dark" ? "dark" : "light",
                            }}
                        />
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                        >
                            {loading ? "Loading..." : "Create Job"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateJob;
