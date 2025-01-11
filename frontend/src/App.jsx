import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "./custom.css";
import Login from "./components/shared/Login";
import SignUp from "./components/shared/SignUp";
import Home from "./components/User/Home";
import Jobs from "./components/User/Jobs";
import Browse from "./components/User/Browse";
import Profile from "./components/User/Profile";
import JobDescription from "./components/shared/JobDescription";
import UpdateProfile from "./components/shared/UpdateProfile";
import Companies from "./components/admin/Companies";
import CreateCompany from "./components/admin/CreateCompany";
import CompanyPage from "./components/admin/CompanyPage";
import EditCompany from "./components/admin/EditCompany";
import CreateJob from "./components/admin/CreateJob";
import AdminJobs from "./components/admin/AdminJobs";
import JobPage from "./components/admin/JobPage";
import ProtectedRouteAdmin from "./components/admin/ProtectedRouteAdmin";
import ProtectedRouteUser from "./components/User/ProtectedRouteUser";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/explore",
    element: <Browse />,
  },
  {
    path: "/description/:id",
    element: <JobDescription />,
  },
  {
    path: "/profile",
    element: <ProtectedRouteUser element={<Profile />} />,
  },
  {
    path: "/profile/edit",
    element: <ProtectedRouteUser element={<UpdateProfile />} />,
  },
  {
    path: "/admin/companies",
    element : <Companies />,
  },
  {
    path: "/admin/jobs",
    element: <ProtectedRouteAdmin element={<AdminJobs />} />,
  },
  {
    path: "/admin/companies/create",
    element: <ProtectedRouteAdmin element={<CreateCompany />} />,
  },
  {
    path: "/admin/companies/:id",
    element: <ProtectedRouteAdmin element={<CompanyPage />} />,
  },
  {
    path: "/admin/companies/:id/edit",
    element: <ProtectedRouteAdmin element={<EditCompany />} />,
  },
  {
    path: "/admin/company/:id/jobs/create",
    element: <ProtectedRouteAdmin element={<CreateJob />} />,
  },
  {
    path: "/admin/jobpage/:id",
    element: <ProtectedRouteAdmin element={<JobPage />} />,
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;



        
  
        
      

