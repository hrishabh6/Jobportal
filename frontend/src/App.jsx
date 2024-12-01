import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import Login from "./components/shared/Login"
import SignUp from "./components/shared/SignUp"
import Home from "./components/shared/Home"
import Jobs from "./components/shared/Jobs"
import Browse from "./components/shared/Browse"


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
    path: "/",
    element: <Home />
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
