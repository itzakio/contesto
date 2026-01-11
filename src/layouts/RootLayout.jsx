import { Outlet } from "react-router";
import Footer from "../pages/Shared/Footer";
import Navbar from "../pages/Shared/Navbar";
import { Toaster } from "react-hot-toast";
import ScrollToHash from "../Components/ScrollToHash";

const RootLayout = () => {


  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar />
        <div className="w-full h-16 "></div>
      </header>
      <main className="flex-1">
         <ScrollToHash />
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
