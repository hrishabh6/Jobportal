import { Link } from "react-router-dom"


const JobCard = () => {
    return (
        <div >
            <div className="m-5 background-light800_dark400 text-dark300_light700">
                <div className=" group mx-2  grid max-w-screen-md grid-cols-12 space-x-8 overflow-hidden rounded-lg border py-8 text-gray-700 shadow transition hover:shadow-lg sm:mx-auto">
                    <Link to="#" className="text-dark400_light700 order-2 col-span-1 mt-4 -ml-14 text-left text-gray-600 hover:text-gray-700 sm:-order-1 sm:ml-4">
                        <div className="group relative md:h-12 md:w-12 h-16 w-16  overflow-hidden rounded-lg">
                            <img src="/assets/images/logo-light.png" alt="" className="h-full w-full object-cover text-gray-700" />
                        </div>
                    </Link>
                    <div className="text-dark300_light700 col-span-11 flex flex-col pr-8 text-left sm:pl-4">
                        <h3 className="text-sm text-dark300_light700">Invision</h3>
                        <a href="#" className="mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-xl"> Sr. Frontend Engineer </a>
                        <p className="text-dark400_light700 overflow-hidden pr-7 text-sm">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna .</p>

                        <div className="mt-5 flex flex-col items-start justify-start space-y-3 text-sm font-medium text-gray-500 gap-3 sm:space-y-0 sm:space-x-2">
                            <div className="text-dark300_light700">Positions:<span className="ml-2 mr-3 rounded-full bg-yellow-100 px-2 py-0.5 text-green-900"> 12 </span></div>
                            <div className="text-dark300_light700">Experience:<span className="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900"> 2 Years </span></div>
                            <div className="mx-0 my-0 text-dark300_light700">Salary:<span className="ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900">180-250k</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobCard
