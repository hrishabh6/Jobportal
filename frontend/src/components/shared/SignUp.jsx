import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "@/components/ui/label"
import { RadioGroup } from "@/components/ui/radio-group"

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,

    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Navbar from "./Navbar";

// Define the schema using zod
const formSchema = z.object({
    name: z.string().min(2, {
        message: "Full Name must be at least 2 characters.",
    }),
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    phoneNumber: z.string().min(10, {
        message: "Phone Number must be at least 10 characters.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
    role: z.enum(["student", "recruiter"], {
        message: "Please select a valid role.",
    }), // Role must be either "student" or "recruiter"
});

const SignUp = () => {
    const form = useForm({
        resolver: zodResolver(formSchema), // Use zod for schema validation
        defaultValues: {
            name: "",
            username: "",
            email: "",
            phoneNumber: "",
            password: "",
            role: "student", // Default value for the role field
        },
    });

    const onSubmit = (data) => {
        console.log("Form data:", data); // Handle form submission
    };

    return (
        <>
            <Navbar />
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-9 mx-auto flex flex-col w-1/2 max-sm:w-3/4 gap-9 text-dark400_light800 shadow-md dark:shadow-light-500 p-4"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                >
                    
                    <h1 className="h1-bold text-dark100_light900 text-center">Sign Up</h1>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="paragraph-semibold text-dark400_light800">Full Name <span className="text-orange-500">*</span></FormLabel>
                                <FormControl>
                                    <Input placeholder="username" {...field} autoComplete="name" className=" no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 ,min-h-[56px] border" />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="paragraph-semibold text-dark400_light800">Username <span className="text-orange-500">*</span></FormLabel>
                                <FormControl>
                                    <Input placeholder="username" {...field} className=" no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 ,min-h-[56px] border" />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="paragraph-semibold text-dark400_light800">Email <span className="text-orange-500">*</span></FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="email" {...field} className=" no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 ,min-h-[56px] border" />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="paragraph-semibold text-dark400_light800">Phone Number <span className="text-orange-500">*</span></FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="your phone number" {...field} className=" no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 ,min-h-[56px] border" />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="paragraph-semibold text-dark400_light800">Password <span className="text-orange-500">*</span></FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="password" {...field} className=" no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 ,min-h-[56px] border" />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <RadioGroup {...field} className="flex" onValueChange={field.onChange}>
                                <div className="flex items-center space-x-2">
                                    <Input name="role" type="radio" value="student" id="student" />
                                    <Label htmlFor="student">Student</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Input name="role" type="radio" value="recruiter" id="recruiter" />
                                    <Label htmlFor="recruiter">Recruiter</Label>
                                </div>
                            </RadioGroup>
                        )}
                    />



                    <Button type="submit" className="max-sm:w-1/2 w-1/3 mx-auto">Submit</Button>
                </form>
            </Form>
        </>
    );
}

export default SignUp;