import { Button } from "../ui/button";


export function AppSidebar() {
    return (
        <>

            <section className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-md:hidden md:w-[30%] lg:w-[30%] xl:w-[20%]">
                <div className="flex flex-1 flex-col gap-6">
                    
                </div>

            </section>
            <div className="flex justify-center items-center w-full md:hidden">
                <Button>Apply Filters</Button>
            </div>
        </>
    )
}
