import { useTheme } from "@/lib/useTheme";
import GlobalSearch from "./GlobalSearch";


const HeroSection = () => {
    // bg-[#d4d6d7]
    const { mode } = useTheme(); // Get the current theme mode
    const logoSrc = mode === "dark"
        ? "/assets/images/logo-dark.png"
        : mode === "system"
            ? "/assets/images/logo-dark.png"
            : "/assets/images/logo-light.png";


    return (
        <>
            <div className="mt-9">
                <div className="max-md:px-4">
                    <div className="w-1/2 max-md:w-full md:w-3/4 xl:w-1/2 mx-auto  mb-5 background-light700_dark400 relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
                        <GlobalSearch type={"user-global-search"} />
                    </div>

                </div>
                <div className="flex justify-center flex-col items-center">
                    <div className="flex max-sm:flex-col">
                        <div className=" mx-8 max-sm:mx-2 flex flex-col items-center justify-center">
                            <div className="flex justify-center items-center gap-4">
                                <img src={logoSrc} alt="logo" className="h-[100px] max-sm:h-[70px]" />
                                <p className="h1-bold  text-primary-100 dark:text-primary-500 ">
                                    Career <span>Bridge</span>
                                </p>
                            </div>
                            <p className=" text-dark200_light900 text-center mt-9 text-3xl ">The Worlds leading Platform for career opportunities</p>
                        </div>
                        <img src="/assets/images/job-search.png" alt="job-search" className="h-[50vh] max-sm:h-[30vh] w-1/2 max-sm:w-fit max-sm:mt-5" />
                    </div>

                </div>
            </div>

        </>
    )
}

export default HeroSection
