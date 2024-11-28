
import MobileNav from "./MobileNav";
import Theme from "./Theme";
import { useTheme } from "@/lib/useTheme";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar"

const Navbar = () => {
  const { mode } = useTheme(); // Get the current theme mode

  // Determine the logo based on the theme
  const logoSrc = mode === "dark"
    ? "/assets/images/logo-dark.png"
    : mode === "system"
      ? "/assets/images/logo-dark.png"
      : "/assets/images/logo-light.png";

  return (
    <section className="p-4 w-full background-light900_dark300 shadow-sm">
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

          <Popover className="mx-4 ">
            <PopoverTrigger className="text-dark200_light900">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" className="cursor-pointer"/>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent>Place content for the popover here.</PopoverContent>
          </Popover>

          <MobileNav />
        </div>
      </div>
    </section>
  );
};

export default Navbar;
