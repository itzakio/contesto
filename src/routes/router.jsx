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
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import CreateContest from "../DashBoard/CreateContest";
import CreatorRoute from "./CreatorRoute";
import Creators from "../DashBoard/Creators";
import PendingContests from "../DashBoard/PendingContests";
import MyContests from "../DashBoard/MyContests";
import EditContest from "../DashBoard/EditContest";
import ApprovedContests from "../DashBoard/ApprovedContests";
import ContestDetails from "../pages/ContestDetails/ContestDetails";
import PaymentSuccess from "../DashBoard/Payments/PaymentSuccess";
import PaymentCancelled from "../DashBoard/Payments/PaymentCancelled";
import UserRoute from "./UserRoute";
import UserJoinedContests from "../DashBoard/UserDashboard/UserJoinedContests";

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
            <BeACreator />
          </PrivateRoute>
        ),
      },
      {
        path: "/contests-details/:id",
        element: (
          <PrivateRoute>
            <ContestDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "create-contest",
        element: (
          <CreatorRoute>
            <CreateContest />
          </CreatorRoute>
        ),
      },
      {
        path: "edit-contest/:id",
        element: (
          <CreatorRoute>
            <EditContest />
          </CreatorRoute>
        ),
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
            <Creators />
          </AdminRoute>
        ),
      },
      {
        path: "pending-contests",
        element: (
          <AdminRoute>
            <PendingContests />
          </AdminRoute>
        ),
      },
      {
        path: "approved-contests",
        element: (
          <AdminRoute>
            <ApprovedContests />
          </AdminRoute>
        ),
      },
      //creator only routes
      {
        path: "my-contests",
        element: (
          <CreatorRoute>
            <MyContests />
          </CreatorRoute>
        ),
      },
      // user only route
      {
        path: "my-joined-contests",
        element: (
          <UserRoute>
            <UserJoinedContests />
          </UserRoute>
        ),
      },
      {
        path: "payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "payment-cancelled",
        element: <PaymentCancelled />,
      },
    ],
  },
]);

export default router;
