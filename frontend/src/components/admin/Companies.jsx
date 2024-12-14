
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const Companies = () => {
  return (
    <div className='text-dark200_light900 background-light900_dark300 min-h-[100vh]'>
      <Navbar />
      <div className='mt-9 max-w-7xl max-sm:w-full mx-auto'>
        <div className="hidden max-sm:flex justify-end mb-4 p-4">
        <Button>Register New Company</Button>
        </div>
        <div className='flex justify-between items-center gap-5 max-sm:p-5 p-3'>
          <div className="w-1/2 max-sm:w-3/4 background-light700_dark400 relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
            <img
              src="/assets/icons/search.svg"
              width={24}
              height={24}
              alt="search"
              className="cursor-pointer"
            />
            <Input
              type="text"
              placeholder="Filter by Name"
              className=" no-focus paragraph-regular placeholder text-dark400_light700 border-none shadow-none outline-none bg-transparent"
            />
          </div>
          <Button className="max-sm:hidden">Register New Company</Button>
        </div>
        
      </div>
    </div>
  )
}

export default Companies
