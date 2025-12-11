import React from "react";
import { Link } from "react-router";
import { MdArrowBack } from "react-icons/md";
import forbiddenAnimation from '../assets/Forbidden.json'
import Lottie from "lottie-react";

const Forbidden = () => {
  return (
    <div className="space-y-4 flex flex-col justify-center items-center min-h-screen bg-base-100">
      <Lottie
          animationData={forbiddenAnimation} // Pass the imported JSON data
          loop={true} // Control looping
          autoplay={true} // Control starting playback
          className='w-70 lg:w-96' // You can pass inline styles
        />
      <h2 className="text-3xl font-extrabold text-center">
        You Are Forbidden to Access this Page!
      </h2>
      <p className="text-accent">
        Please contact the administrator if you believe this is an error
      </p>
      <div className="space-x-4">
        <Link className="btn btn-primary text-black" to="/">
          Go to Home
        </Link>
        <Link className="btn btn-secondary text-black" to="/dashboard">
          <MdArrowBack size={20}/>
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
