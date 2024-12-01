import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useTheme } from "@/lib/useTheme";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const MobileNav = () => {
    const { mode } = useTheme(); // Get the current theme mode
    
    // Determine the logo based on the theme
    const logoSrc = mode === "dark"
        ? "/assets/images/logo-dark.png"
        : mode === "system"
            ? "/assets/images/logo-dark.png"
            : "/assets/images/logo-light.png";

    
    const { user } = useSelector(store => store.auth);
    return (
        <Sheet >
            <SheetTrigger asChild>
                <img src="/assets/icons/hamburger.svg" alt="hamburger" className="h-[30px] w-[30 px] md:hidden invert-colors" />
            </SheetTrigger>
            <SheetContent side="left"
                className="background-light900_dark200 border-none"
            >
                <div className="flex items-center gap-2">
                    <img src={logoSrc} alt="logo" className="h-10 w-10 max-sm:h-6 max-sm:w-6 " />
                    <p className="text-3xl max-sm:text-xl font-bold text-primary-100 dark:text-primary-500">
                        Career <span>Bridge</span>
                    </p>
                </div>
                <div className="flex flex-col gap-6 mt-11 background-light200_dark900 text-dark200_light900">
                    <SheetClose asChild>
                        <div className="flex gap-4 cursor-pointer h-8">
                            <img src="/assets/icons/home.svg" alt="" height={20} width={20} className="dark:invert" />
                            <Link to={`/`} className="font-semibold text-xl ">Home</Link>
                        </div>
                    </SheetClose>
                    <SheetClose asChild>
                        <div className="flex gap-4 cursor-pointer h-8">
                            <img src="/assets/icons/briefcase-icon.svg" alt="" height={20} width={20} className="dark:invert" />
                            <Link to={`/jobs`} className="font-semibold text-xl ">Jobs</Link>
                        </div>
                    </SheetClose>
                    <SheetClose asChild>
                        <div className="flex gap-4 cursor-pointer h-8">
                            <img src="/assets/icons/home.svg" alt="" height={20} width={20} className="dark:invert" />
                            <Link to={`/explore`} className="font-semibold text-xl ">Explore</Link>
                        </div>
                    </SheetClose>

                    {
                        !user  && (
                            <SheetClose asChild>
                                <div className="flex gap-5 flex-col mt-10 w-3/4">
                                    <Button className="small-medium btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                                        Login
                                    </Button>
                                    <Button className="small-medium btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                                        Sign-up
                                    </Button>
                                </div>
                            </SheetClose>
                        ) 
                    }


                </div>
            </SheetContent>
        </Sheet>

    )
}

export default MobileNav
