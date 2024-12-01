
import Navbar from "./Navbar"
import ProfileLinks from "./ProfileLinks"
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppliedJob from "./AppliedJob";
const Profile = () => {

    return (
        <>
            <Navbar />
            <div className="background-light900_dark100 min-h-[100vh] p-5 ">
                <div className="lg:p-4 flex flex-col-reverse items-start justify-between sm:flex-row mx-auto max-sm:w-full lg:w-[50vw] lg:shadow-light-300">
                    <div className="flex flex-col items-start gap-4 lg:flex-row">
                        <img
                            src="/assets/images/pfp.jpg"
                            alt="profile"
                            width={140}
                            height={140}
                            className="rounded-full object-cover"
                        />
                        <div className="mt-3">
                            <h2 className="h2-bold text-dark100_light900 ">
                                Hrishabh Joshi
                            </h2>
                            <p className="paragraph-regular text-dark200_light800">
                                @hrishabhjoshi
                            </p>
                            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">

                                <ProfileLinks
                                    imgUrl="/assets/icons/link.svg"
                                    href={"https://portfolio-hrishabh-joshis-projects.vercel.app/"}
                                    title="Portfolio"
                                />

                                <ProfileLinks
                                    imgUrl="/assets/icons/link.svg"
                                    href={"https://google.com"}
                                    title="Resume"
                                />


                                <ProfileLinks
                                    imgUrl="/assets/icons/location.svg"
                                    title={"Delhi, India"}
                                />

                                <ProfileLinks
                                    imgUrl="/assets/icons/calendar.svg"
                                    title={`Joined December 2024`}
                                />

                            </div>

                            <>
                                <p className="paragraph-regular text-dark400_light800 mt-8">
                                    MERN Stack Developer
                                </p>
                                <p className="paragraph-regular text-dark400_light800 mt-2">
                                    Skills : React, Node, Express, MongoDB
                                </p>
                            </>

                        </div>
                    </div>
                    <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">


                        <Link to={`/profile`}>
                            <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                                Edit Profile
                            </Button>
                        </Link>


                    </div>
                </div>

                <div className="mt-10 flex gap-10 w-[80%] mx-auto max-sm:w-full">
                    <Tabs defaultValue="top posts" className="flex-1">
                        <TabsList className="background-light800_dark400 min-h-[42px] p-1">
                            <TabsTrigger value="top posts" className="tab">
                                Applied Jobs
                            </TabsTrigger>
                            <TabsTrigger value="answers" className="tab">
                                Saved Jobs
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="top posts" className="mt-5 flex w-full flex-col gap-6">
                            <AppliedJob

                            />
                        </TabsContent>
                        <TabsContent value="answers" className="w-full flex flex-col gap-6">
                            <AppliedJob

                            />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>


        </>

    )
}

export default Profile
