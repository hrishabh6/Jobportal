import JobCard from "./shared/JobCard"
import JobCardSlider from "./shared/JobCardSlider"
const PopularJobs = () => {
    const isSearched = true
    return (
        
        <>
          <h2 className="h2-semibold text-dark200_light900 text-center mt-9">{isSearched ? "Searched Results 6" : "Latest Jobs"}</h2>
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

export default PopularJobs
