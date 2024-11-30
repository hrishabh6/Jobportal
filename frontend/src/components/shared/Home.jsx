import Category from "../Category"
import HeroSection from "../HeroSection"
import PopularJobs from "../PopularJobs"
import Footer from "./Footer"
import Navbar from "./Navbar"

const Home = () => {
  return (
    <div className="background-light900_dark300">
      <Navbar/>
      <HeroSection/>
      <Category/>
      <PopularJobs/>
      <Footer/>
    </div>
  )
}

export default Home
