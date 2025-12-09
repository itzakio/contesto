import React from "react";
import logo from "/logo.png";
import contestoImg from "../assets/contesto.jpeg";
import { Link, Outlet } from "react-router";
import { Toaster } from "react-hot-toast";

const AuthLayout = () => {
  return (
    <div className=" min-h-screen bg-base-100">
      <section className="flex">
        <div className="flex-1 flex justify-center items-center relative min-h-screen bg-base-100">
          <div className="absolute left-10 top-10">
            <Link to="/">
              <div className="flex items-center">
                <img className="size-12" src={logo} alt="" />
                <div className="hidden md:block">
                  <h3 className="text-3xl font-extrabold text-primary">
                    Contesto
                  </h3>
                </div>
              </div>
            </Link>
          </div>
          <Outlet />
        </div>
        <div className="flex-1 flex justify-center items-center min-h-screen bg-primary/5">
          <img src={contestoImg} alt="authImage" />
        </div>
      </section>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default AuthLayout;
