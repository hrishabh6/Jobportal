import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import Login from "./components/shared/Login"
import SignUp from "./components/shared/SignUp"
import Home from "./components/User/Home"
import Jobs from "./components/User/Jobs"
import Browse from "./components/User/Browse"
import Profile from "./components/User/Profile"
import JobDescription from "./components/shared/JobDescription"
import UpdateProfile from "./components/shared/UpdateProfile"
import Companies from "./components/admin/Companies"


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/explore",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/profile/edit",
    element: <UpdateProfile />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
  {
    path: "/admin/companies",
    element: <Companies />
  }

])

function App() {

  return (
    <>
      <RouterProvider router={appRouter}/>
                
    </>
  )
}

export default App
