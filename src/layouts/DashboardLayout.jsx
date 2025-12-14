import React from "react";
import logo from "/logo.png";
import { Link, Outlet } from "react-router";
import { RiArrowLeftSLine, RiUserSettingsLine } from "react-icons/ri";
import { HiOutlineSquaresPlus } from "react-icons/hi2";
import useAuth from "../hooks/useAuth";
import Loading from "../Components/Loading";
import { FaWpforms } from "react-icons/fa";
import useRole from "../hooks/useRole";
import { Toaster } from "react-hot-toast";

const DashboardLayout = () => {
  const { userLoading } = useAuth();
  const { role } = useRole();
  if (userLoading) {
    return <Loading />;
  }
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300 flex items-center justify-between">
          <div className="flex items-center">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <div to="/" className="flex items-center">
              <img className="size-12" src={logo} alt="" />
              <div className="hidden md:block">
                <h3 className="text-3xl font-extrabold text-primary">
                  Contesto
                </h3>
              </div>
            </div>
          </div>
          <div className="mr-4">
            <Link
              to="/"
              className="btn btn-primary text-black hidden md:flex items-center justify-center"
            >
              Back to Home
            </Link>
            <Link
              to="/"
              className="btn btn-primary text-black btn-square md:hidden"
            >
              <RiArrowLeftSLine size={24} />
            </Link>
          </div>
        </nav>
        {/* Page content here */}
        <Outlet />
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </button>
            </li>

            {role?.role === "creator" && (
              <>
                {/* List item */}
                <li>
                  <Link
                    to="/create-contest"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Create Contest"
                  >
                    {/* User_Management */}
                    <HiOutlineSquaresPlus size={20} />
                    <span className="is-drawer-close:hidden">
                      Create Contest
                    </span>
                  </Link>
                </li>
              </>
            )}
            {role?.role === "admin" && (
              <>
                {/* List item */}
                <li>
                  <Link
                    to="/dashboard/users-management"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Users Management"
                  >
                    {/* User_Management */}
                    <RiUserSettingsLine size={20} />
                    <span className="is-drawer-close:hidden">
                      Users Management
                    </span>
                  </Link>
                </li>

                {/* List item */}
                <li>
                  <Link
                    to="/dashboard/pending-creators"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Creators"
                  >
                    {/*Creators_Application */}
                    <FaWpforms size={20} />
                    <span className="is-drawer-close:hidden">
                      Creators
                    </span>
                  </Link>
                </li>
              </>
            )}

            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                {/* Settings icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
       <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default DashboardLayout;
