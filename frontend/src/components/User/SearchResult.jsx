import { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, MoreHorizontal, Building2, Briefcase } from 'lucide-react';
import Navbar from '../shared/Navbar';
import { filters } from '@/lib';
import axios from 'axios';

const SearchResult = () => {
    // States for filters
    const [openSections, setOpenSections] = useState({});
    const [selectedFilters, setSelectedFilters] = useState({});
    
    // States for search and results
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState({ jobs: [], companies: [] });
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [isLoadingJobs, setIsLoadingJobs] = useState(false);
    const searchRef = useRef(null);

    // Fetch initial jobs
    useEffect(() => {
        const fetchAllJobs = async (limit = 9) => {
          try {
            setIsLoading(true)
            const res = await axios.post(
              `${import.meta.env.VITE_JOB_API_END_POINT}/get`,
              {  limit }  // Pass limit as query parameter
            );
            console.log(res);
    
            if (res.data.success) {
              setJobs(res.data.jobs || []); // Ensure it's always an array
            }
          } catch (error) {
            console.error(error);
          } finally {
            setIsLoading(false)
          }
        };
        fetchAllJobs()
    }, [])

    // Debounce function
    const useDebounce = (value, delay) => {
        const [debouncedValue, setDebouncedValue] = useState(value);

        useEffect(() => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            return () => clearTimeout(handler);
        }, [value, delay]);

        return debouncedValue;
    };

    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Fetch suggestions
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (debouncedSearchQuery.trim().length === 0) {
                setSuggestions({ jobs: [], companies: [] });
                return;
            }

            setIsLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_GLOBAL_API_END_POINT}/suggestions?query=${encodeURIComponent(debouncedSearchQuery)}`);
                console.log("Response:", response);
                // Update this line to access the nested data structure
                setSuggestions(response.data.data);
                setShowSuggestions(true);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSuggestions();
    }, [debouncedSearchQuery]);

    // Handle search submission
    const handleSearch = async (searchTerm) => {
        setShowSuggestions(false);
        setIsLoadingJobs(true);
        try {
            const response = await fetch(`/api/jobs/search?query=${encodeURIComponent(searchTerm)}`);
            const data = await response.json();
            setJobs(data.jobs);
        } catch (error) {
            console.error('Error searching jobs:', error);
        } finally {
            setIsLoadingJobs(false);
        }
    };

    // Handle suggestion click
    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion.text);
        handleSearch(suggestion.text);
    };

    // Handle search input submission
    const handleSearchSubmit = (e) => {
        if (e.key === 'Enter') {
            handleSearch(searchQuery);
        }
    };

    // Filter functions
    const toggleSection = (sectionId) => {
        setOpenSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    const handleFilterChange = (filterId, value) => {
        setSelectedFilters(prev => ({
            ...prev,
            [filterId]: {
                ...prev[filterId],
                [value]: !prev[filterId]?.[value]
            }
        }));
    };
    return (
        <>
            <Navbar />
            <div className="flex w-full min-h-screen background-light900_dark200">
                {/* Sidebar */}
                <div className="w-[30%] border-r border-gray-200 p-4 background-light900_dark300 max-md:hidden">
                    <h1 className="text-lg font-semibold mb-4 text-dark200_light900">Filters</h1>
                    <div className="space-y-2">
                        {filters.map((filter) => (
                            <div key={filter.id} className="border border-gray-200 rounded-lg">
                                <div
                                    onClick={() => toggleSection(filter.id)}
                                    className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    <span className="text-dark200_light900 font-medium">{filter.name}</span>
                                    <ChevronDown 
                                        className={`w-4 h-4 text-gray-400 transition-transform ${
                                            openSections[filter.id] ? 'transform rotate-180' : ''
                                        }`}
                                    />
                                </div>
                                {openSections[filter.id] && (
                                    <div className="p-3 border-t border-gray-200 space-y-2">
                                        {filter.options.map((option) => (
                                            <label
                                                key={option.value}
                                                className="flex items-center space-x-3 cursor-pointer"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedFilters[filter.id]?.[option.value] || false}
                                                    onChange={() => handleFilterChange(filter.id, option.value)}
                                                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                                />
                                                <span className="text-sm text-dark200_light900">
                                                    {option.label}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="w-[70%] max-md:w-full max-md:p-0 p-6">
                    {/* Search Bar */}
                    <div className="relative mb-6" ref={searchRef}>
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 invert dark:invert-0 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by keyword"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleSearchSubmit}
                            className="w-full pl-10 pr-4 py-2 border background-light900_dark300 text-dark200_light900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {/* Suggestions Dropdown */}
                        {showSuggestions && (
                            <div className="absolute mt-1 w-full bg-white dark:bg-dark-400 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                                {isLoading ? (
                                    <div className="p-4 text-center text-gray-500">Loading...</div>
                                ) : (
                                    <>
                                        {suggestions?.jobs?.length > 0 && (
                                            <div className="p-2">
                                                <div className="text-xs text-gray-500 dark:text-gray-400 px-3 py-1">Jobs</div>
                                                {suggestions.jobs.map((job) => (
                                                    <div
                                                        key={job.id}
                                                        onClick={() => handleSuggestionClick(job)}
                                                        className="flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-md"
                                                    >
                                                        <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                                                        <div>
                                                            <div className="text-sm text-dark200_light900">{job.text}</div>
                                                            <div className="text-xs text-gray-500">{job.companyName}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {suggestions?.companies?.length > 0 && (
                                            <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                                                <div className="text-xs text-gray-500 dark:text-gray-400 px-3 py-1">Companies</div>
                                                {suggestions.companies.map((company) => (
                                                    <div
                                                        key={company.id}
                                                        onClick={() => handleSuggestionClick(company)}
                                                        className="flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-md"
                                                    >
                                                        <Building2 className="w-4 h-4 mr-2 text-gray-400" />
                                                        <div className="text-sm text-dark200_light900">{company.text}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {(!suggestions?.jobs?.length && !suggestions?.companies?.length) && (
                                            <div className="p-4 text-center text-gray-500">No results found</div>
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Jobs List */}
                    <div className="space-y-4">
                        {isLoadingJobs ? (
                            <div className="text-center py-8">Loading jobs...</div>
                        ) : (
                            jobs.map((job, index) => (
                                <div
                                    key={job._id}
                                    className={`flex items-start gap-4 p-4 border-t bg-white dark:bg-dark-400 border-l border-r border-gray-200
                                    ${index === 0 ? "rounded-tl-lg rounded-tr-lg" : ""}
                                    ${index === jobs.length - 1 ? "rounded-bl-lg rounded-br-lg border-b" : ""}`}
                                >
                                    {/* Company Logo */}
                                    <div className="w-16 h-16 rounded-full max-md:h-12 max-md:w-12 bg-gray-200">
                                        <img 
                                            src={job.company?.logo || "/assets/images/pfp.jpg"} 
                                            className="h-16 w-16 max-md:h-12 max-md:w-12 rounded-full" 
                                            alt="company-logo" 
                                        />
                                    </div>

                                    {/* Job Content */}
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-semibold text-dark200_light900">{job.title}</h3>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <img src='/assets/icons/bookmark.svg' width={14} height={14} alt='bookmark' />
                                                <button className="px-4 py-1 text-sm border border-gray-200 rounded text-dark200_light900 hover:bg-gray-50 max-md:hidden">
                                                    Apply
                                                </button>
                                                <button className="p-1 hover:bg-gray-50 rounded">
                                                    <MoreHorizontal className="w-5 h-5 text-gray-400" />
                                                </button>
                                            </div>
                                        </div>

                                        <p className="text-sm dark:text-light-500 text-gray-900 font-medium mt-1">
                                            {job.company?.name} - {job.location}
                                        </p>

                                        <div className="flex gap-2 mt-2">
                                            {[job.employmentType, job.location].map((tag) => (
                                                <span key={tag} className="text-xs text-gray-600 hover:underline cursor-pointer">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                        
                        {!isLoadingJobs && jobs.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                No jobs found
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchResult;