import React, { useEffect } from "react";
import { Outlet } from "react-router";
import AOS from "aos";
import Footer from "../pages/Shared/Footer";
import Navbar from "../pages/Shared/Navbar";
import { Toaster } from "react-hot-toast";

const RootLayout = () => {
  useEffect(() => {
    AOS.init({
      duration: 700,
      once: false,
      easing: "ease-out-cubic",
    });
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar />
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default RootLayout;
