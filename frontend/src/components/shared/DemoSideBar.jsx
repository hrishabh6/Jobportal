'use client'

import { useEffect, useState } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import JobCard from './JobCard'
import axios from 'axios'
import { filters } from '@/lib'
import { sortOptions } from '@/lib'

import PaginationComponent from './Pagination'
import { useLocation, useNavigate } from 'react-router-dom'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function DemoSideBar() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState({
        location: [],
        title: [],
        salary: []
    });
    const [loading, setLoading] = useState(false)
    const [jobs, setJobs] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const location = useLocation(); // For accessing the URL parameters
    const navigate = useNavigate(); // For navigating to updated URLs
    useEffect(() => {
        const fetchAllJobs = async (limit = 10) => {
            try {
                setLoading(true); // Set loading to true when fetching
                const res = await axios.post(
                    `${import.meta.env.VITE_JOB_API_END_POINT}/get`,
                    { limit, currentPage } // Send currentPage in the request body
                );
                console.log(res);

                if (res.data.success) {
                    setJobs(res.data.jobs || []); // Update jobs list
                    setTotalPages(res.data.totalPages); // Update totalPages
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setLoading(false); // Set loading to false after the fetch
            }
        };

        fetchAllJobs(); // Fetch jobs when currentPage changes
    }, [currentPage]); // Dependency on currentPage ensures effect runs when page changes

    // Update the URL with the new page number when navigating between pages
    const goToPage = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page); // Update currentPage on page change
            // Update URL query parameters to reflect current page
            const searchParams = new URLSearchParams(location.search);
            searchParams.set("page", page);
            navigate(`${location.pathname}?${searchParams.toString()}`);
        }
    };
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const pageFromUrl = parseInt(queryParams.get("page")) || 1; // Default to 1 if no page in URL
        setCurrentPage(pageFromUrl); // Set the currentPage from URL
    }, [location.search]); // Run this effect whenever the URL changes


    const handleFilterChange = (filterType, value, isChecked) => {
        setSelectedFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters };
            if (isChecked) {
                updatedFilters[filterType] = [...updatedFilters[filterType], value];
            } else {
                updatedFilters[filterType] = updatedFilters[filterType].filter((item) => item !== value);
            }
            return updatedFilters;
        });
    };

    const fetchFilteredJobs = async (filters) => {
        try {
            setLoading(true)
            const response = await axios.post(
                `${import.meta.env.VITE_JOB_API_END_POINT}/get`,
                { filters, limit: 10 } // Include filters, keyword, and limit in the request body
            );
            if (!response.data.success) {
                setJobs([]);

            }
            else {
                setJobs(response.data.jobs)
                setTotalPages(response.data.totalPages)

            }
            console.log(response.data);
            console.log(response.data.totalPages, "These are total pages");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    };


    useEffect(() => {
        if (selectedFilters.location.length || selectedFilters.title.length || selectedFilters.salary.length) {
            fetchFilteredJobs(selectedFilters);
        }

    }, [selectedFilters]);




    return (
        <div className="w-full">
            <div>
                {/* Mobile filter dialog */}
                <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                    />

                    <div className="fixed inset-0 z-40 flex">
                        <DialogPanel
                            transition
                            className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
                        >
                            <div className="flex items-center justify-between px-4">
                                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                <button
                                    type="button"
                                    onClick={() => setMobileFiltersOpen(false)}
                                    className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon aria-hidden="true" className="size-6" />
                                </button>
                            </div>

                            {/* Filters */}
                            <form className="mt-4 border-t border-gray-200">


                                {filters.map((section) => (
                                    <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                                        <h3 className="-mx-2 -my-3 flow-root">
                                            <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                <span className="font-medium text-gray-900">{section.name}</span>
                                                <span className="ml-6 flex items-center">
                                                    <PlusIcon aria-hidden="true" className="size-5 group-data-[open]:hidden" />
                                                    <MinusIcon aria-hidden="true" className="size-5 [.group:not([data-open])_&]:hidden" />
                                                </span>
                                            </DisclosureButton>
                                        </h3>
                                        <DisclosurePanel className="pt-6">
                                            <div className="space-y-6">
                                                {section.options.map((option, optionIdx) => (
                                                    <div key={option.value} className="flex gap-3">
                                                        <div className="flex h-5 shrink-0 items-center">
                                                            <div className="group grid size-4 grid-cols-1">
                                                                <input
                                                                    defaultValue={option.value}
                                                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                    onChange={(e) => handleFilterChange(section.id, option.value, e.target.checked)}
                                                                    name={`${section.id}[]`}
                                                                    type="checkbox"
                                                                    className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                                                />
                                                                <svg
                                                                    fill="none"
                                                                    viewBox="0 0 14 14"
                                                                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                                                >
                                                                    <path
                                                                        d="M3 8L6 11L11 3.5"
                                                                        strokeWidth={2}
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        className="opacity-0 group-has-[:checked]:opacity-100"
                                                                    />
                                                                    <path
                                                                        d="M3 7H11"
                                                                        strokeWidth={2}
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                                                    />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <label
                                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                            className="min-w-0 flex-1 text-gray-500"
                                                        >
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </DisclosurePanel>
                                    </Disclosure>
                                ))}
                            </form>
                        </DialogPanel>
                    </div>
                </Dialog>

                <main className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b  text-dark200_light900 border-gray-200 pb-6 mt-16">
                        <h1 className="text-4xl font-bold tracking-tight ">Filter Jobs</h1>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <MenuButton className="group inline-flex justify-center text-sm font-medium  hover:text-dark300_light700">
                                        Sort
                                        <ChevronDownIcon
                                            aria-hidden="true"
                                            className="-mr-1 ml-1 size-5 shrink-0  group-hover:text-dark300_light700"
                                        />
                                    </MenuButton>
                                </div>

                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md  shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <div className="py-1 background-light900_dark200 text-dark200_light900">
                                        {sortOptions.map((option) => (
                                            <MenuItem key={option.name}>
                                                <a
                                                    href={option.href}
                                                    className={classNames(

                                                        'block px-4 py-2 text-sm data-[focus]:background-light800_dark400  data-[focus]:outline-none',
                                                    )}
                                                >
                                                    {option.name}
                                                </a>
                                            </MenuItem>
                                        ))}
                                    </div>
                                </MenuItems>
                            </Menu>

                            <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                                <span className="sr-only">View grid</span>
                                <Squares2X2Icon aria-hidden="true" className="size-5" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setMobileFiltersOpen(true)}
                                className="-m-2 ml-4 p-2 text-dark200_light900 hover:text-gray-500 sm:ml-6 lg:hidden"
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon aria-hidden="true" className="size-5" />
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-[20%_80%]">
                            {/* Filters */}
                            <form className="hidden lg:block ">


                                {filters.map((section) => (
                                    <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                                        <h3 className="-my-3 flow-root">
                                            <DisclosureButton className="group flex w-full items-center justify-between py-3 text-sm text-dark200_light900">
                                                <span className="font-medium ">{section.name}</span>
                                                <span className="ml-6 flex items-center">
                                                    <PlusIcon aria-hidden="true" className="size-5 group-data-[open]:hidden" />
                                                    <MinusIcon aria-hidden="true" className="size-5 [.group:not([data-open])_&]:hidden" />
                                                </span>
                                            </DisclosureButton>
                                        </h3>
                                        <DisclosurePanel className="pt-6">
                                            <div className="space-y-4">
                                                {section.options.map((option, optionIdx) => (
                                                    <div key={option.value} className="flex gap-3">
                                                        <div className="flex h-5 shrink-0 items-center">
                                                            <div className="group grid size-4 grid-cols-1">
                                                                <input
                                                                    defaultValue={option.value}
                                                                    defaultChecked={option.checked}
                                                                    onChange={(e) => handleFilterChange(section.id, option.value, e.target.checked)}
                                                                    id={`filter-${section.id}-${optionIdx}`}
                                                                    name={`${section.id}[]`}
                                                                    type="checkbox"
                                                                    className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                                                />
                                                                <svg
                                                                    fill="none"
                                                                    viewBox="0 0 14 14"
                                                                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                                                >
                                                                    <path
                                                                        d="M3 8L6 11L11 3.5"
                                                                        strokeWidth={2}
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        className="opacity-0 group-has-[:checked]:opacity-100"
                                                                    />
                                                                    <path
                                                                        d="M3 7H11"
                                                                        strokeWidth={2}
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                                                    />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <label htmlFor={`filter-${section.id}-${optionIdx}`} className="text-sm text-dark200_light900">
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </DisclosurePanel>
                                    </Disclosure>
                                ))}
                            </form>

                            {/* Product grid */}
                            <div >
                                <div className=" md:grid md:grid-cols-2 md:grid-rows-3 xl:grid-cols-3 xl:grid-rows-2 gap-4">
                                    {
                                        loading ? (
                                            <div>
                                                loading
                                            </div>
                                        ) :
                                            jobs.length > 0 ? (jobs.map((job, index) => (
                                                <JobCard
                                                    key={index}
                                                    jobId={job._id}
                                                    title={job.title}
                                                    description={job.description}
                                                    company={job.company.name}
                                                    location={job.location}
                                                    employmentType={job.employmentType}
                                                    salary={job.salary}
                                                    experience={job.experience}
                                                    positions={job.positions}
                                                    logo={job.company.logo}
                                                />
                                            ))) : (
                                                <div>
                                                    <p className='h1-bold text-center text-dark200_light900'>No jobs found</p>
                                                </div>
                                            )
                                    }
                                </div>
                                <div className='mt-4'>
                                    <PaginationComponent totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}
