
import MobileNav from "./MobileNav";
import Theme from "./Theme";
import { useTheme } from "@/lib/useTheme";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { mode } = useTheme(); // Get the current theme mode

  // Determine the logo based on the theme
  const logoSrc = mode === "dark"
    ? "/assets/images/logo-dark.png"
    : mode === "system"
      ? "/assets/images/logo-dark.png"
      : "/assets/images/logo-light.png";

  const user = false; // This is a placeholder for the user state

  return (
    <section className="p-4 w-full background-light900_dark200 shadow-sm">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
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
        <div className="flex items-center gap-16 max-sm:gap-6 justify-center">
          <Theme />
          <ul className="flex text-2xl gap-10 max-sm:hidden text-dark-200 dark:text-light-900">
            <li>Home</li>
            <li>Jobs</li>
            <li>Explore</li>
          </ul>
          {
            user ? (
              <Popover className="mx-4 flex gap-4 ">
                <PopoverTrigger className="text-dark200_light900">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" className="cursor-pointer" />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="background-light900_dark300 ">
                  <div className="flex items-center gap-5 space-y-2">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" className="cursor-pointer" />
                    </Avatar>
                    <p className="paragraph-medium text-dark200_light700">
                      Hrishabh Joshi
                    </p>
                  </div>
                  <div className="flex mt-4 gap-3">
                    <Button className="primary-gradient max-h-[26px] px-2 py-1 !text-light-900">View Profile</Button>
                    <Button className="primary-gradient max-h-[26px] px-2 py-1 !text-light-900">Log Out</Button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <div className="flex gap-2 max-sm:hidden">
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
            )

          }
          <MobileNav />
        </div>
      </div>
    </section>
  );
};

export default Navbar;
