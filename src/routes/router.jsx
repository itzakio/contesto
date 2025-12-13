import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import AllContests from "../pages/AllContests/AllContests";
import Home from "../pages/home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import DashboardLayout from "../Layouts/DashboardLayout";
import UsersManagement from "../DashBoard/UsersManagement";
import BeACreator from "../pages/BeACreator/BeACreator";
import CreatorApplication from "../DashBoard/CreatorApplication";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import CreateContest from "../DashBoard/CreateContest";
import CreatorRoute from "./CreatorRoute";

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
      {
        path: "be-a-creator",
        element: (
          <PrivateRoute>
            {" "}
            <BeACreator />
          </PrivateRoute>
        ),
      },
      {
        path: "create-contest",
        element: <CreatorRoute><CreateContest/></CreatorRoute>
      }
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
    element: <DashboardLayout />,
    children: [
      // admin only route
      {
        path: "users-management",
        element: (
          <AdminRoute>
            <UsersManagement />
          </AdminRoute>
        ),
      },
      {
        path: "pending-creators",
        element: (
          <AdminRoute>
            <CreatorApplication />
          </AdminRoute>
        ),
      }
    ],
  },
]);

export default router;
