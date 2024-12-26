import { useNavigate } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import { CompanyTable } from './CompanyTable';
import GlobalSearch from '../shared/globalSearch';

const Companies = () => {
  const navigate = useNavigate();
  return (
    <div className='text-dark200_light900 background-light900_dark300 min-h-[100vh]'>
      <Navbar />
      <div className='mt-9 max-w-7xl max-sm:w-full mx-auto'>
        <div className="flex justify-end mb-4 p-4 md:hidden">
          <button
            onClick={() => navigate("/admin/companies/create")}
            className="relative px-8 py-4 text-lg font-bold text-white bg-gradient-to-b from-gray-900 to-gray-800 rounded-full shadow-md border border-gray-800 inline-flex items-center justify-center transition-all duration-200 hover:translate-y-[2px] hover:shadow-lg active:translate-y-[1px] active:shadow-sm"
          >
            Register Now
            <div className="relative flex items-center justify-center w-10 h-10 ml-2 bg-gradient-to-b from-gray-900 to-gray-800 rounded-full shadow-md border border-gray-900 transition-all duration-200">
              <svg
                id="Arrow"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                height="30"
                width="30"
                className="drop-shadow-[0_10px_20px_rgba(26,25,25,0.9)] transition-all duration-400 hover:drop-shadow-[0_10px_20px_rgba(50,50,50,1)_0_0_20px_rgba(2,2,2,1)] hover:rotate-[-35deg]"
              >
                <defs>
                  <linearGradient y2="100%" x2="100%" y1="0%" x1="0%" id="iconGradient">
                    <stop style={{ stopColor: "#FFFFFF", stopOpacity: 1 }} offset="0%" />
                    <stop style={{ stopColor: "#AAAAAA", stopOpacity: 1 }} offset="100%" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#iconGradient)"
                  d="M4 15a1 1 0 0 0 1 1h19.586l-4.292 4.292a1 1 0 0 0 1.414 1.414l6-6a.99.99 0 0 0 .292-.702V15c0-.13-.026-.26-.078-.382a.99.99 0 0 0-.216-.324l-6-6a1 1 0 0 0-1.414 1.414L24.586 14H5a1 1 0 0 0-1 1z"
                ></path>
              </svg>
            </div>
          </button>
        </div>

        <div className="flex justify-between items-center gap-5 max-sm:p-5 p-3">
          <div className="w-1/2 max-sm:w-3/4 background-light700_dark400 relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
            <GlobalSearch/>
          </div>

          {/* Ensuring this button is visible on large screens */}
          <button
            onClick={() => navigate("/admin/companies/create")}
            className="max-md:hidden relative px-8 py-4 text-lg font-bold text-white bg-gradient-to-b from-gray-900 to-gray-800 rounded-full shadow-md border border-gray-800 inline-flex items-center justify-center transition-all duration-200 hover:translate-y-[2px] hover:shadow-lg active:translate-y-[1px] active:shadow-sm"
          >
            Register Now
            <div className="relative flex items-center justify-center w-10 h-10 ml-2 bg-gradient-to-b from-gray-900 to-gray-800 rounded-full shadow-md border border-gray-900 transition-all duration-200">
              <div className="w-full h-full filter invert transition-all flex justify-center items-center duration-400">
                <img
                  src='/assets/icons/right-arrow.svg'
                  alt='right arrow'
                  className='w-3/4 transition-all duration-400 hover:drop-shadow-[0_10px_20px_rgba(50,50,50,1)_0_0_20px_rgba(2,2,2,1)] hover:rotate-[-35deg]'
                />
              </div>
            </div>

          </button>
        </div>

        <CompanyTable />
      </div>
    </div>
  );
};

export default Companies;
