import { Link } from "react-router-dom"
import PropTypes from 'prop-types';

const JobCard = ({jobId, title, description, company, location, employmentType, salary, experience, positions, logo }) => {
    return (

        <div >
            <div className="m-5 background-light800_dark400 text-dark300_light700">
                <div className=" group mx-2  grid max-w-screen-md grid-cols-12 space-x-8 overflow-hidden rounded-lg border py-8 text-gray-700 shadow transition hover:shadow-lg sm:mx-auto">
                    <Link to={`/description/${jobId}`} className="text-dark400_light700 order-2 col-span-1 mt-4 -ml-14 text-left text-gray-600 hover:text-gray-700 sm:-order-1 sm:ml-4">
                        <div className="group relative md:h-12 md:w-12 h-16 w-16  overflow-hidden rounded-lg">
                            <img src={logo} alt={company} className="object-contain h-full w-full  text-gray-700" />
                        </div>
                    </Link>

                    <div className="text-dark300_light700 col-span-11 flex flex-col pr-8 text-left sm:pl-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-sm text-dark300_light700">{company}</h3>
                            <h3 className="text-sm text-dark300_light700 max-sm:hidden">{employmentType}</h3>

                        </div>
                        <Link to={`/description/${jobId}`} className="mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-xl">{title}</Link>
                        <p className="text-dark400_light700 overflow-hidden pr-7 text-sm">{description}</p>
                        <div className="flex flex-col gap-3">
                            <div className="mt-5 flex flex-col items-start justify-start space-y-3 text-sm font-medium text-gray-500 gap-3 sm:space-y-0 sm:space-x-2">
                                <div className="text-dark300_light700">Positions:<span className="ml-2 mr-3 rounded-full bg-yellow-100 px-2 py-0.5 text-green-900">{positions}</span></div>
                                <div className="text-dark300_light700">Experience:<span className="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900">{experience}</span></div>
                                <div className="mx-0 my-0 text-dark300_light700">Salary:<span className="ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900">{salary}</span></div>
                                <div className="mx-0 my-0 text-dark300_light700">Location:<span className="ml-2 mr-3 rounded-full bg-violet-100 px-2 py-0.5 text-blue-900">{location}</span></div>
                            </div>
                            <h3 className="text-sm text-dark300_light700 sm:hidden">{employmentType}</h3>

                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

JobCard.propTypes = {
    jobId: PropTypes.string, // Job ID
    title: PropTypes.string.isRequired, // Job title (e.g., "Frontend Developer")
    description: PropTypes.string.isRequired, // Detailed description of the job role
    company: PropTypes.string.isRequired, // Company name or company ID (string)
    location: PropTypes.string.isRequired, // Location (e.g., "Remote", "New York")
    employmentType: PropTypes.string.isRequired, // Employment type (e.g., "Full-time", "Part-time")
        salary: PropTypes.string, // Salary range (e.g., "$70k-$90k per year")
    experience: PropTypes.string, // Experience required (e.g., "2+ years of experience")
    positions: PropTypes.number, // Number of positions available
    logo: PropTypes.string, // Company logo URL
};

export default JobCard
