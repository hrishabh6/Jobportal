import Marquee from "../ui/marquee";
import { Link } from "react-router-dom";

const jobs = ["Backend Developer", "Frontend Developer", "Full-Stack Developer", "UI/UX designer"]

const MarqueeDemo = () => {
    return (
        <div className="relative flex mt-8 w-full flex-col items-center justify-center overflow-hidden rounded-lg background-light900_dark300  ">
            <h1 className="h1-bold mb-2 text-dark200_light900">Trending job titles</h1>
            <Marquee pauseOnHover className="[--duration:20s]">
                {jobs.map((review) => (
                    <>
                        <div className="flex bg-gradient-to-r from-white dark:from-background mx-5 border">
                            <Link to={`/description/676d247288f56ce7e42a017b`}> 
                                <h2 className="h2-semibold text-dark200_light900 text-center mx-5 my-5">
                                    {review}
                                </h2>
                                <p className="base-semibold text-center my-3">click here to view</p>
                            </Link>
                        </div>
                    </>
                ))}
            </Marquee>

        </div>
    );
}

export default MarqueeDemo;