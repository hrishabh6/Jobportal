
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"


const category = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "Artificial Intelligence",
]

const Category = () => {
    return (
        <>
            <div className="flex justify-center items-center gap-5 flex-col mt-9">
                <h2 className="h2-semibold text-dark200_light900 ">Trending Job Titles</h2>
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full max-w-xl max-sm:w-1/2"
                >
                    <CarouselContent className="backgroud-light900_dark200">
                        {category.map((item, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 flex justify-center">
                                {/* Todo: Make these buttons actual link with the tag page */}
                                <div className="p-1 bg-light-700 dark:bg-dark-400 hover:bg-light-700 dark:hover:bg-dark-400 rounded-md paragraph-medium dark:text-white text-dark-100">
                                    {item}
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent >
                    <CarouselPrevious className="bg-dark-500 hover:bg-light-500 max-sm:hover:bg-dark-500" />
                    <CarouselNext className="bg-dark-500 hover:bg-light-500 max-sm:hover:bg-dark-500" />
                </Carousel>
            </div>


        </>
    )
}

export default Category
