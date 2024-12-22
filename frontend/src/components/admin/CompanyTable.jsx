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
import { Link, useNavigate } from "react-router-dom";

  
export function CompanyTable() {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_COMPANY_API_END_POINT}/get`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                const data = await response.json();

                setCompanies(data?.data); // Ensure companies is an array
                
            } catch (error) {
                console.error("Error fetching companies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);



    if (loading) {
        return <p>Loading companies...</p>;
    }

    if (!Array.isArray(companies) || companies.length === 0) {
        return <p>No companies available.</p>;
    }


    return (
        <Table>
            <TableCaption>List of your registered companies.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Logo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Date of Registration</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {companies.map((company) => (
                    <TableRow key={company._id}>
                        <TableCell className="font-medium">
                            <Link to={`/admin/companies/${company._id}`}>
                                <Avatar>
                                    <AvatarImage
                                        src={company.logo || "/assets/images/pfp.jpg"}

                                        className="cursor-pointer"
                                    />
                                </Avatar>

                            </Link>
                        </TableCell>
                        <TableCell>{company.name || "N/A"}</TableCell>
                        <TableCell>
                            {new Date(company.createdAt).toLocaleDateString() || "N/A"}
                        </TableCell>
                        <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-4">
                                <button onClick={() => navigate(`/admin/companies/${company._id}`)} className="relative flex items-center justify-start w-24 h-10 px-5 bg-purple-600 text-white font-medium rounded-lg shadow-lg transition-all duration-300 group active:translate-x-1 active:translate-y-1 active:shadow-md" >
                                    <span className="transition-all duration-300 group-hover:opacity-0 group-hover:invisible">
                                        Edit
                                    </span>
                                    <svg
                                        className="absolute w-3 right-5 fill-white transition-all duration-300 group-hover:right-1/2 group-hover:mr-0"
                                        viewBox="0 0 512 512"
                                    >
                                        <path
                                            d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
