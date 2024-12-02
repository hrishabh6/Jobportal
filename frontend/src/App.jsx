import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import Login from "./components/shared/Login"
import SignUp from "./components/shared/SignUp"
import Home from "./components/shared/Home"
import Jobs from "./components/shared/Jobs"
import Browse from "./components/shared/Browse"
import Profile from "./components/shared/Profile"
import JobDescription from "./components/shared/JobDescription"
import UpdateProfile from "./components/shared/UpdateProfile"


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
