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
import ProtectedRoute from "./components/protectedRoute";

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
    path: "/profile",
    element: <ProtectedRoute element={<Profile />} />,
  },
  {
    path: "/profile/edit",
    element: <ProtectedRoute element={<UpdateProfile />} />,
  },
  {
    path: "/description/:id",
    element: <ProtectedRoute element={<JobDescription />} />,
  },
  {
    path: "/admin/companies",
    element: <ProtectedRoute element={<Companies />} />,
  },
  {
    path: "/admin/jobs",
    element: <ProtectedRoute element={<AdminJobs />} />,
  },
  {
    path: "/admin/companies/create",
    element: <ProtectedRoute element={<CreateCompany />} />,
  },
  {
    path: "/admin/companies/:id",
    element: <ProtectedRoute element={<CompanyPage />} />,
  },
  {
    path: "/admin/companies/:id/edit",
    element: <ProtectedRoute element={<EditCompany />} />,
  },
  {
    path: "/admin/company/:id/jobs/create",
    element: <ProtectedRoute element={<CreateJob />} />,
  },
  {
    path: "/admin/jobpage/:id",
    element: <ProtectedRoute element={<JobPage />} />,
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;



        
  
        
      

