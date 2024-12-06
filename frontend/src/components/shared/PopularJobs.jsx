import JobCard from "./shared/JobCard"
import JobCardSlider from "./shared/JobCardSlider"
import PropTypes from 'prop-types';

const PopularJobs = ({isHeading}) => {
    
    return (
        
        <>
          <h2 className="h2-semibold text-dark200_light900 text-center mt-9">{isHeading ? "Latest Jobs" : ""}</h2>
            <div className="hidden grid-cols-3 grid-rows-2 gap-4 md:grid md:grid-cols-2 md:grid-rows-3 xl:grid xl:grid-cols-3 xl:grid-rows-2">
                
                <JobCard />
                <JobCard />
                <JobCard />
                <JobCard />
                <JobCard />
                <JobCard />
            </div>
            <div className="md:hidden text-dark-100">
                <JobCardSlider>
                    <JobCard />
                    <JobCard />
                    <JobCard />
                    <JobCard />
                </JobCardSlider>
            </div>

        </>
    )
}

PopularJobs.propTypes = {
    isHeading: PropTypes.bool.isRequired,
};

export default PopularJobs

