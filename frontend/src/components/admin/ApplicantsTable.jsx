import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Link, useParams } from "react-router-dom";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import axios from "axios";
import { toast } from "sonner";


export function ApplicantsTable() {
    const { id } = useParams();
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_APPLICATION_API_END_POINT}/${id}/applicants`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data?.message || "Something went wrong!");
                }
                console.log(data.job.applications);
                setApplicants(data.job.applications); // Ensure companies is an array

            } catch (error) {
                console.error("Error fetching companies:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchApplicants();
    }, [id]);

    const handleAction = async ({ id, updatedStatus }) => {
        try {
            console.log("Update route accessed with ID:", id);
    
            const response = await axios.post(
                `${import.meta.env.VITE_APPLICATION_API_END_POINT}/status/${id}/update`,
                { updatedStatus }, // Ensure this matches the backend payload format
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
    
            // Parse backend response
            const { success, application } = response.data;
            console.log("Response from backend:", response.data);
    
            if (success) {  
                // Update the applicants state dynamically
                toast.success("Application status updated successfully. Email has been sent to applicant with the status");
                
                setApplicants((prevApplicants) =>
                    prevApplicants.map((company) =>
                        company._id === id
                            ? { ...company, status: application.status }
                            : company
                    )
                
                );
            } else {
                throw new Error("Failed to update application status");
            }
    
            console.log("Status updated successfully:", application.status);
        } catch (error) {
            console.error("Error updating application status:", error);
        }
    };
    

    if (loading) {
        return <p>Loading Applicants</p>;
    }

    if (!Array.isArray(applicants) || applicants.length === 0) {
        return <p>No Applicants</p>;
    }


    return (
        <Table className="w-3/4 md:mx-auto max-md:w-full mt-4">
            <TableCaption className="mb-4">List of Applicants applied for this job</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">DP</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>resume</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {applicants.map((company) => (
                    <TableRow key={company._id}>
                        <TableCell className="font-medium">
                            <Link to={`/admin/companies/${company._id}`}>
                                <Avatar>
                                    <AvatarImage
                                        src={company.applicant?.profile?.profilePhoto || "/assets/images/pfp.jpg"}

                                        className="cursor-pointer"
                                    />
                                </Avatar>

                            </Link>
                        </TableCell>
                        <TableCell>{company.applicant.name || "N/A"}</TableCell>
                        <TableCell>
                            {
                                company.applicant?.profile?.resume ? <Link to={company.applicant?.profile?.resume} className="text-blue-400">resume</Link> : "N/A"
                            }


                        </TableCell>
                        <TableCell>
                            {company.status}
                        </TableCell>
                        <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-4">


                                <div>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <button disabled={company.status === "rejected" || company.status === "accepted"} className="actionButton" >
                                                <span className="transition-all duration-300 group-hover:opacity-0 group-hover:invisible">
                                                    {company.status === "pending" ? "Action" : company.status}
                                                </span>
                                                
                                            </button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px] bg-slate-700 dark:bg-dark-400 text-white ">
                                            <DialogHeader>
                                                <DialogTitle className="text-center">Action</DialogTitle>
                                                <DialogDescription className="text-light-700 dark:text-white mt-4">
                                                    Do you want to accept or reject this application. This action cannot be undone.
                                                </DialogDescription>
                                            </DialogHeader>

                                            <DialogFooter>
                                                <div className="flex w-full justify-around gap-4 items-center mt-4">
                                                    <DialogClose asChild>
                                                        <button
                                                            className="ui-btn"
                                                            onClick={() => handleAction({ id: company._id, updatedStatus: "rejected" })}
                                                        >
                                                            Reject
                                                        </button>
                                                    </DialogClose>

                                                    <DialogClose asChild>
                                                        <button
                                                            
                                                            className="confirm-btn"
                                                            onClick={() => handleAction({ id: company._id, updatedStatus: "accepted" })}
                                                        >
                                                            Accept
                                                        </button>
                                                    </DialogClose>

                                                </div>

                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>


                                </div>

                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
