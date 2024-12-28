import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import "./custom.css"
import Login from "./components/shared/Login"
import SignUp from "./components/shared/SignUp"
import Home from "./components/User/Home"
import Jobs from "./components/User/Jobs"
import Browse from "./components/User/Browse"
import Profile from "./components/User/Profile"
import JobDescription from "./components/shared/JobDescription"
import UpdateProfile from "./components/shared/UpdateProfile"
import Companies from "./components/admin/Companies"
import CreateCompany from "./components/admin/CreateCompany"
import CompanyPage from "./components/admin/CompanyPage"
import EditCompany from "./components/admin/EditCompany"
import CreateJob from "./components/admin/CreateJob"
import AdminJobs from "./components/admin/AdminJobs"
import JobPage from "./components/admin/JobPage"


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
  },
  {
    path: "/admin/jobs",
    element: <AdminJobs />
  },
  {
    path: "/admin/companies/create",
    element: <CreateCompany />
  },
  {
    path: "/admin/companies/:id",
    element: <CompanyPage />
  },
  {
    path: "/admin/companies/:id/edit",
    element: <EditCompany />
  },
  {
    path: "/admin/company/:id/jobs/create",
    element: <CreateJob />
  },
  {
    path: "/admin/jobpage/:id",
    element: <JobPage />
  },
  
])

function App() {

  return (
    <>
      <RouterProvider router={appRouter}/>
                
    </>
  )
}

export default App

        
  
        
      

