
import MobileNav from "./MobileNav";
import Theme from "./Theme";
import { useTheme } from "@/lib/useTheme";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const Navbar = () => {
  const { mode } = useTheme(); // Get the current theme mode
  const navigateTo = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_USER_API_END_POINT}/logout`)
      console.log("Logged out successfully");
      if (res.data.success) {
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

  const user = false; // This is a placeholder for the user state

  return (
    <nav className="p-4 w-full max-w-full background-light900_dark200 shadow-sm">
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
            <li><Link to={`/`}>Home</Link></li>
            <li><Link to={`/jobs`}>Jobs</Link></li>
            <li><Link to={`/explore`}>Explore</Link></li>
          </ul>

          {/* User Section */}
          {user ? (
            <Popover className="flex gap-4">
              <PopoverTrigger className="text-dark200_light900">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" className="cursor-pointer" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="background-light900_dark300">
                <div className="flex items-center gap-5">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" className="cursor-pointer" />
                  </Avatar>
                  <p className="paragraph-medium text-dark200_light700">
                    Hrishabh Joshi
                  </p>
                </div>
                <div className="flex mt-4 gap-3">
                  <Button className="primary-gradient max-h-[26px] px-2 py-1 !text-light-900">
                    View Profile
                  </Button>
                  <Button className="primary-gradient max-h-[26px] px-2 py-1 !text-light-900">
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

          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            className="hidden xl:inline-block primary-gradient max-h-[36px] px-2 py-1 !text-light-900"
          >
            Log Out
          </Button>

          {/* Mobile Navigation */}
          <MobileNav />
        </div>
      </div>
    </nav>

  );
};

export default Navbar;
