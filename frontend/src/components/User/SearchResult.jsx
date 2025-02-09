import { Search, ChevronDown, MoreHorizontal } from 'lucide-react';
import Navbar from '../shared/Navbar';

const SearchResult = () => {
    return (
        <>
            <Navbar />
            <div className="flex w-full min-h-screen background-light900_dark200">
                {/* Sidebar */}
                <div className="w-[30%] border-r border-gray-200 p-4 background-light900_dark300 max-md:hidden">
                    <h1 className="text-lg font-semibold mb-4 text-dark200_light900">Filters</h1>

                    {/* Filter sections */}
                    <div className="space-y-2 ">
                        {['Speaker\'s lists', 'Topics & types', 'Budget', 'Date', 'Comments', 'Audience', 'Traveling from', 'WSB Exclusive'].map((filter) => (
                            <div key={filter} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                                <span className="text-gray-700">{filter}</span>
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="w-[70%] max-md:w-full max-md:p-0 p-6">
                    {/* Search Bar */}
                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 invert dark:invert-0 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by keyword"
                            className="w-full pl-10 pr-4 py-2 border background-light900_dark300 text-dark200_light900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Speakers List */}
                    <div className="">
                        {/* Sample Speaker Card */}
                        {[1, 2, 3].map((speaker, index, speakers) => (
                            <div
                                key={speaker}
                                className={`flex items-start gap-4 p-4 border-t bg-white dark:bg-dark-400 border-l border-r border-gray-200
                                            ${index === 0 ? "rounded-tl-lg rounded-tr-lg " : ""}
                                            ${index === speakers.length - 1 ? "rounded-bl-lg rounded-br-lg border-b" : ""}`}
                            >
                                {/* Avatar */}
                                <div className="w-16 h-16 rounded-full max-md:h-12 max-md:w-12 bg-gray-200">
                                    <img src="/assets/images/pfp.jpg" className="h-16 w-16 max-md:h-12 max-md:w-12 rounded-full" alt="user-image" />
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-dark200_light900">Job/Company Name</h3>
                                            
                                        </div>
                                        <div className="flex items-center gap-2 ">
                                            <img src='/assets/icons/bookmark.svg' width={14} height={14} alt='bookmark' className=''/>
                                            <button className="px-4 py-1 text-sm border border-gray-200 rounded text-dark200_light900 hover:bg-gray-50 max-md:hidden">
                                                Apply
                                            </button>
                                            <button className="p-1 hover:bg-gray-50 rounded ">
                                                <MoreHorizontal className="w-5 h-5 text-gray-400" />
                                            </button>
                                        </div>
                                    </div>

                                    <p className="text-sm dark:text-light-500 text-gray-900 font-medium mt-1">
                                        Description of company or Company which posted job
                                    </p>

                                    <div className="flex gap-2 mt-2">
                                        {["India", "delhi"].map((tag) => (
                                            <span key={tag} className="text-xs text-gray-600 hover:underline cursor-pointer">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                
                            </div>
                        ))}

                    </div>

                </div>
            </div>
        </>
    );
};

export default SearchResult;