
import MobileNav from "./MobileNav";
import Theme from "./Theme";
import { useTheme } from "@/lib/useTheme";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { setAllJobs } from "@/redux/jobSlice";

const Navbar = () => {
  const { mode } = useTheme(); // Get the current theme mode
  const { user } = useSelector(store => store.auth);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      console.log("setUser from dispatch: ", dispatch(setUser));
      const res = await axios.get(`${import.meta.env.VITE_USER_API_END_POINT}/logout`)
      console.log("Logged out successfully");
      if (res.data.success) {
        console.log("Logged out successfully");
        dispatch(setUser(null));
        dispatch(setAllJobs([]));
        navigateTo("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error during API call:", error);

    }
  }


  // Determine the logo based on the theme
  const logoSrc = mode === "dark"
    ? "/assets/images/logo-dark.png"
    : mode === "system"
      ? "/assets/images/logo-dark.png"
      : "/assets/images/logo-light.png";


  return (
    <nav className="p-4 w-full max-w-full background-light900_dark200 shadow-sm z-50 sticky top-0 mb-4">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto overflow-hidden">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <img
            src={logoSrc}
            alt="logo"
            className="h-10 w-10 max-sm:h-6 max-sm:w-6"
          />
          <p className="text-3xl max-sm:text-xl font-bold text-primary-100 dark:text-primary-500 max-sm:hidden">
            Career <span>Bridge</span>
          </p>
        </div>

        {/* Navigation + Actions */}
        <div className="flex items-center gap-8 max-sm:gap-4 justify-center">
          <Theme />

          {/* Desktop Navigation */}
          <ul className="hidden md:flex text-xl gap-6 text-dark-200 dark:text-light-900">
            {
              user && user.role === "recruiter" ? (
                <>
                  <li><Link to={`/admin/companies`}>Companies</Link></li>
                  <li><Link to={`/admin/jobs`}>Jobs</Link></li>
                </>
              ) :
                (
                  <>
                    <li><Link to={`/`}>Home</Link></li>
                    <li><Link to={`/jobs`}>Jobs</Link></li>
                    <li><Link to={`/results`}>Explore</Link></li>
                  </>
                )
            }
          </ul>

          {/* User Section */}
          {user ? (
            <Popover className="flex gap-4">
              <PopoverTrigger className="text-dark200_light900">
                {
                  user.profile.profilePhoto ? (
                    <Avatar>
                      <AvatarImage src={user.profile.profilePhoto} className="cursor-pointer" />
                    </Avatar>
                  ) : (
                    <Avatar>
                      <AvatarImage src="/assets/images/pfp.jpg" className="cursor-pointer" />
                    </Avatar>
                  )
                }

              </PopoverTrigger>
              <PopoverContent className="background-light900_dark300">
                <div className="flex items-center gap-5">
                  {
                    user.profile.profilePhoto ? (
                      <Avatar>
                        <AvatarImage src={user.profile.profilePhoto} className="cursor-pointer" />
                      </Avatar>
                    ) : (
                      <Avatar>
                        <AvatarImage src="/assets/images/pfp.jpg" className="cursor-pointer" />
                      </Avatar>
                    )
                  }
                  <p className="paragraph-medium text-dark200_light700">
                    {user.fullName}
                  </p>
                </div>
                <div className="flex mt-4 gap-3">
                  {
                    user.role === "student" && (
                      <>
                        <Button className="small-medium btn-secondary text-dark400_light900 min-h-[41px]  rounded-lg px-4 py-3 shadow-none">
                          <Link to={`/profile`}>View Profile</Link>
                        </Button>
                      </>
                    )
                  }
                  <Button onClick={handleLogout} className="small-medium btn-secondary text-dark400_light900 min-h-[41px]  rounded-lg px-4 py-3 shadow-none">
                    Log Out
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="flex gap-2">
              <Link to={`/login`}>
                <Button className="primary-gradient max-h-[36px] px-2 py-1 !text-light-900">
                  Login
                </Button>
              </Link>
              <Link to={`/signup`}>
                <Button className="primary-gradient max-h-[36px] px-2 py-1 !text-light-900">
                  Sign-up
                </Button>
              </Link>
            </div>
          )}


          <MobileNav />
        </div>
      </div>
    </nav>

  );
};

export default Navbar;
