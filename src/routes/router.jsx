import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import AllContests from "../pages/AllContests/AllContests";
import Home from "../pages/home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import DashboardLayout from "../Layouts/DashboardLayout";
import UsersManagement from "../DashBoard/UsersManagement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "all-contests",
        element: <AllContests />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout/>,
    children: [
      {
        path: "users-management",
        element: <UsersManagement/>
      }
    ]
  }
]);

export default router;
