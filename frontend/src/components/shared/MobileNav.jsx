import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useTheme } from "@/lib/useTheme";

const MobileNav = () => {
    const { mode } = useTheme(); // Get the current theme mode

    // Determine the logo based on the theme
    const logoSrc = mode === "dark"
        ? "/assets/images/logo-dark.png"
        : mode === "system"
            ? "/assets/images/logo-dark.png"
            : "/assets/images/logo-light.png";
    return (
        <Sheet >
            <SheetTrigger asChild>
                <img src="/assets/icons/hamburger.svg" alt="hamburger" className="h-[30px] w-[30 px] sm:hidden invert-colors" />
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
                            <img src="/assets/icons/home.svg" alt="" height={20} width={20} className="dark:invert"/>
                            <p className="font-semibold text-xl ">Home</p>
                        </div>
                    </SheetClose>
                    <SheetClose asChild>
                        <div className="flex gap-4 cursor-pointer h-8">
                            <img src="/assets/icons/briefcase-icon.svg" alt="" height={20} width={20} className="dark:invert"/>
                            <p className="font-semibold text-xl ">Jobs</p>
                        </div>
                    </SheetClose>
                    <SheetClose asChild>
                        <div className="flex gap-4 cursor-pointer h-8">
                            <img src="/assets/icons/home.svg" alt="" height={20} width={20} className="dark:invert" />
                            <p className="font-semibold text-xl ">Explore</p>
                        </div>
                    </SheetClose>
                </div>
            </SheetContent>
        </Sheet>

    )
}

export default MobileNav
