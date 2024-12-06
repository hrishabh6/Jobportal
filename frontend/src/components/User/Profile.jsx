import Navbar from "../shared/Navbar"
import ProfileLinks from "../shared/ProfileLinks"
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppliedJob from "../shared/AppliedJob";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTimestamp } from "@/lib";
const Profile = () => {
    const { user } = useSelector(store => store.auth)
    const {allJobs} = useSelector(store => store.jobs)
    
    return (
        <>
            <Navbar />
            <div className="background-light900_dark100 min-h-[100vh] p-5 ">
                <div className="lg:p-4 flex flex-col-reverse items-start justify-between sm:flex-row mx-auto max-sm:w-full lg:w-[50vw] lg:shadow-light-300">
                    <div className="flex flex-col items-start gap-4 lg:flex-row">
                        <img
                            src={user?.profile?.profilePhoto || "/assets/images/default-profile.jpg"}
                            alt="profile"
                            width={140}
                            height={140}
                            className="rounded-full object-cover"
                        />
                        <div className="mt-3">
                            <h2 className="h2-bold text-dark100_light900 ">
                                {user?.fullName}
                            </h2>
                            <p className="paragraph-regular text-dark200_light800">
                                @{user?.username}
                            </p>
                            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
                                {
                                  user?.profile?.portfolioWebsite &&
                                      <ProfileLinks
                                        imgUrl="/assets/icons/link.svg"
                                        href={user?.profile?.portfolioWebsite}
                                        title="Portfolio"
                                    />
                                }

                                {
                                    user?.profile?.resume && <ProfileLinks
                                        imgUrl="/assets/icons/link.svg"
                                        href={user?.profile?.resume}
                                        title="Resume"
                                    />

                                }

                                <ProfileLinks
                                    imgUrl="/assets/icons/location.svg"
                                    title={user?.profile?.address}
                                />
                                {
                                    user?.createdAt &&
                                    <ProfileLinks
                                        imgUrl="/assets/icons/calendar.svg"
                                        title={`Joined ${getTimestamp(user?.createdAt)}`}
                                    />
                                }

                            </div>

                            <>
                                {
                                    user?.profile?.bio && <p className="paragraph-regular text-dark400_light800 mt-8">
                                        {user?.profile?.bio}
                                    </p>
                                }

                                {
                                    user?.profile?.skills && <p className="paragraph-regular text-dark400_light800 mt-2">
                                        Skills : {user?.profile?.skills.join(", ")}
                                    </p>
                                }

                            </>

                        </div>
                    </div>
                    <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
                        <Link to="/profile/edit">
                            <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                                Edit Profile
                            </Button>

                        </Link>
                    </div>
                </div>

                <div className="mt-10 flex gap-10 w-[80%] mx-auto max-sm:w-full">
                    <Tabs defaultValue="applied-jobs" className="flex-1">
                        <TabsList className="background-light800_dark400 min-h-[42px] p-1">
                            <TabsTrigger value="applied-jobs" className="tab">
                                Applied Jobs
                            </TabsTrigger>
                            <TabsTrigger value="saved-jobs" className="tab">
                                Saved Jobs
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="applied-jobs" className="mt-5 flex w-full flex-col gap-6">
                            <AppliedJob
                                data={allJobs}
                                
                            />
                        </TabsContent>
                        <TabsContent value="saved-jobs" className="w-full flex flex-col gap-6">
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
