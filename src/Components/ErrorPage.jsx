import { Link, useRouteError } from "react-router";
import errorElement from "../assets/404.json"
import Lottie from "lottie-react";


const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 px-6 text-center">
      <Lottie
        animationData={errorElement} // Pass the imported JSON data
        loop={true} // Control looping
        autoplay={true} // Control starting playback
        className="w-70 lg:w-96" // You can pass inline styles
      />
      <p className="text-xl font-semibold mt-4">
        Oops! Page not found
      </p>

      <p className="text-gray-500 mt-2">
        {error?.statusText || error?.message || "The page you are looking for does not exist."}
      </p>

      <Link to="/" className="btn btn-primary text-black mt-6">
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
