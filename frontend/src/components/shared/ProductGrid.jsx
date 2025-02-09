import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import JobCard from './JobCard';
import InfiniteScroll from 'react-infinite-scroll-component';

const filterShape = {
  location: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.arrayOf(PropTypes.string),
  salary: PropTypes.arrayOf(PropTypes.string)
};

const ProductGrid = ({ selectedFilters = { location: [], title: [], salary: [] } }) => {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  
  const ITEMS_PER_PAGE = 9;

  const fetchJobs = async (pageNum, isNewFilter = false) => {
    try {
      setLoading(true);
      console.log('Fetching page:', pageNum);

      const res = await axios.post(
        `${import.meta.env.VITE_JOB_API_END_POINT}/get`,
        { 
          limit: ITEMS_PER_PAGE,
          currentPage: pageNum,
          filters: Object.values(selectedFilters).some(filter => filter.length > 0) ? selectedFilters : undefined
        }
      );

      if (res.data.success) {
        const newJobs = res.data.jobs || [];
        setTotalJobs(res.data.totalJobs);
        
        if (isNewFilter || pageNum === 1) {
          setJobs(newJobs);
        } else {
          setJobs(prevJobs => [...prevJobs, ...newJobs]);
        }
        
        setHasMore(res.data.isNext);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    setHasMore(true);
    fetchJobs(1, true);
  }, [selectedFilters]);

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchJobs(nextPage);
    }
  };

  return (
    <div className="w-full">
      <InfiniteScroll
        dataLength={jobs.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <div className="col-span-full text-center py-4">
            <h4 className="text-dark200_light900">Loading more jobs...</h4>
          </div>
        }
        endMessage={null} // Remove default end message
        className="flex flex-col gap-4 text-xl font-bold"
        scrollThreshold={0.8}
      >
        {/* Grid Container */}
        <div className="md:grid md:grid-cols-2 md:grid-rows-3 xl:grid-cols-3 xl:grid-rows-2 gap-4">
          {jobs.length > 0 ? (
            jobs.map((job, index) => (
              <JobCard
                key={job._id || index}
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
            ))
          ) : !loading && (
            <div className="col-span-full">
              <p className="h1-bold text-center text-dark200_light900">No jobs found</p>
            </div>
          )}
        </div>

        {/* Separate End Message */}
        {!hasMore && jobs.length > 0 && (
          <div className="w-full text-center py-4 mt-4 border-t border-gray-200">
            <p className="text-dark200_light900">
              You&apos;ve seen all {totalJobs} jobs
            </p>
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
};

ProductGrid.propTypes = {
  selectedFilters: PropTypes.shape(filterShape)
};

export default ProductGrid;