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
import ContestSubmissions from "../DashBoard/CreatorDashboard/ContestSubmissions";
import AboutUs from "../pages/AboutUs/AboutUs";
import HowItWorks from "../pages/HowItWorks/HowItWorks";
import DashboardHome from "../DashBoard/DashboardHome/DashboardHome";
import UpdateProfile from "../DashBoard/DashboardHome/UpdateProfile";
import MyWiningContests from "../DashBoard/UserDashboard/MyWiningContests";
import Leaderboard from "../pages/Leaderboard/Leaderboard";
import ErrorPage from "../Components/ErrorPage";
import HelpCenter from "../pages/HelpCenter/HelpCenter";
import TermsAndConditions from "../pages/TermsAndConditions/TermsAndConditions";
import RefundPolicy from "../pages/RefundPolicy/RefundPolicy";
import Contact from "../pages/Contact/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
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
        path: "leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "be-a-creator",
        element: (
          <PrivateRoute>
            <UserRoute>
              <BeACreator />
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/contests-details/:id",
        element: <ContestDetails />,
      },
      {
        path: "edit-contest/:id",
        element: (
          <CreatorRoute>
            <EditContest />
          </CreatorRoute>
        ),
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "how-it-works",
        element: <HowItWorks />,
      },
      {
        path: "help-center",
        element: <HelpCenter />,
      },
      {
        path: "terms&conditions",
        element: <TermsAndConditions />,
      },
      {
        path: "refund",
        element: <RefundPolicy />,
      },
      {
        path: "contact",
        element: <Contact />,
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
      {
        index: true,
        element: (
          <PrivateRoute>
            <DashboardHome />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/edit-profile",
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
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
      {
        path: "contest/:contestId/submissions",
        element: (
          <CreatorRoute>
            <ContestSubmissions />
          </CreatorRoute>
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
        path: "my-wined-contests",
        element: (
          <UserRoute>
            <MyWiningContests />
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
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
