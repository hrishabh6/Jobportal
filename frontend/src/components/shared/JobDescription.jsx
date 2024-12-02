import { Button } from "../ui/button"
import Navbar from "./Navbar"
import ProfileLinks from "./ProfileLinks"
import RenderBadge from "./RenderBadge"
const JobDescription = () => {
    const isSaved = false
    const isApplied = true
    return (
        <div className="background-light900_dark100 min-h-[100vh]">
            <Navbar />
            <div className="flex flex-col mt-9 lg:p-10 p-5  w-full lg:w-fit lg:max-w-[50vw] lg:mx-auto shadow-light-300">
                <div className="flex gap-4 justify-end mb-5 md:hidden">
                    {
                        isApplied ? <Button disabled>Applied Already</Button> : <Button>Apply Now</Button>
                    }
                    {
                        isSaved ? <img src="/assets/icons/bookmarked.svg" alt="saved" /> : <img src="/assets/icons/bookmark.svg" className="dark:invert invert-0" alt="save" />
                    }
                </div>
                <div className="flex justify-between items-center">
                    <h1 className="h1-bold text-dark100_light900">Frontend Developer</h1>

                    <div className="flex gap-4 max-sm:hidden">
                    {
                        isApplied ? <Button disabled>Applied Already</Button> : <Button>Apply Now</Button>
                    }
                        {
                            isSaved ? <img src="/assets/icons/bookmarked.svg" alt="saved" /> : <img src="/assets/icons/bookmark.svg" className="dark:invert invert-0" alt="save" />
                        }
                    </div>

                </div>
                <div className="mt-5 flex flex-wrap items-start justify-start w-full gap-5">
                    <div className="grid grid-cols-[20%_80%] min-w-[50%]">
                        <img src="/assets/images/logo-dark.png" height={70} width={70} />
                        <div className="flex flex-col gap-5 items-start max-sm:ml-3">
                            <div className="flex gap-5">
                                <ProfileLinks
                                    imgUrl="/assets/icons/link.svg"
                                    href={"https://portfolio-hrishabh-joshis-projects.vercel.app/"}
                                    title="Netflix"
                                />

                                <ProfileLinks
                                    imgUrl="/assets/icons/location.svg"
                                    title={"Delhi, India"}
                                />
                            </div>
                            <div className="flex gap-5 flex-wrap">
                                <RenderBadge name="Full-time" />
                                <RenderBadge name="Remote" />
                                <RenderBadge name="2-4 years" />
                                <RenderBadge name="$70k - $90k" />
                            </div>
                        </div>

                    </div>
                </div>

                <div className="flex mt-9 flex-col gap-8">
                    <div className="flex gap-3 flex-col">
                        <h2 className="h2-semibold text-dark200_light900">About this role</h2>
                        <p className="text-dark200_light900 paragraph-medium">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti explicabo quod vel iste cupiditate suscipit similique, quibusdam ducimus. In, iste repellat? Aspernatur delectus iure repellendus pariatur quam consequuntur quasi eligendi!
                            Beatae aliquam non reiciendis magnam laborum veritatis reprehenderit quibusdam hic, saepe similique fugit mollitia provident corrupti. Eius exercitationem totam labore provident eos quia minima deleniti aliquam consequatur. Asperiores, incidunt repudiandae.
                        </p>
                    </div>
                    {/* Use a text editor to take job requirements and parse the html here */}
                    <div className="flex flex-col gap-3">
                        <h2 className="h2-semibold text-dark200_light900">Job Requirements</h2>
                        <p className="text-dark200_light900 paragraph-medium">
                            Educational Qualifications:
                            <ul className="list-disc list-inside ml-3">
                                <li>Graduate</li>
                                <li>Post Graduate</li>
                            </ul>
                            Skills:
                            <ul className="list-disc list-inside ml-3">
                                <li>Skilled in react and nextjs</li>
                                <li>Should have experience of collaborating projects</li>
                            </ul>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDescription
