import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const Login = () => {
  const { logInUser, googleSignIn, setUser } = useAuth();
  const [show, setShow] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const loginHandler = (data) => {
    console.log(data);
    logInUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Logged In Successfully!");
        navigate(location.state ? location.state : "/");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          toast.error("Invalid email address. Please check and try again.");
        } else if (error.code === "auth/missing-password") {
          toast.error("Please enter your password to continue.");
        } else if (error.code === "auth/user-not-found") {
          toast.error(
            "No account found with this email. Please sign up first."
          );
        } else if (error.code === "auth/wrong-password") {
          toast.error("Incorrect password. Please try again.");
        } else if (error.code === "auth/invalid-credential") {
          toast.error(
            "This email is not registered or the password is incorrect."
          );
        } else if (error.code === "auth/too-many-requests") {
          toast.error(
            "Too many failed attempts. Try again later or reset your password."
          );
        } else if (error.code === "auth/network-request-failed") {
          toast.error("Network error. Please check your internet connection.");
        } else if (error.code === "auth/popup-closed-by-user") {
          toast.error("Sign-in popup was closed before completion.");
        } else if (error.code === "auth/operation-not-allowed") {
          toast.error(
            "This sign-in method is currently disabled. Please contact support."
          );
        } else {
          toast.error(
            error.message || "Something went wrong. Please try again."
          );
        }
      });
  };

  const googleSignInHandler = () => {
    console.log("google login clicked");
    googleSignIn()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Logged In Successfully!");

        // create user in database
        const user_info = {
          email: result.user.email,
          name: result.user.displayName,
          photo_url: result.user.photoURL,
        };
        axiosSecure.post("/users", user_info).then((res) => {
          if (res.data.insertedId) {
            console.log("user created in database");
          }
        });
        navigate(location.state ? location.state : "/");
      })
      .catch((error) => {
        toast.error(error.message || "Something went wrong. Please try again.");
      });
  };

  return (
    <div className=" card w-full margin-y max-w-sm shrink-0 mx-auto">
      <div className="card-body">
        <form onSubmit={handleSubmit(loginHandler)}>
          <h3 className="text-4xl font-extrabold mb-2">Welcome Back</h3>
          <p className="text-lg mb-4">Login with Contesto</p>
          <fieldset className="fieldset">
            {/* email */}
            <label className="text-base label font-semibold">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              className="input w-full text-base placeholder:text-accent"
              placeholder="Enter Your Email"
              onChange={(e) => setEmailValue(e.target.value)}
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required</p>
            )}
            {/* password */}
            <label className="label text-base font-semibold">Password</label>
            <div className="relative">
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                    message:
                      "Password must contain at least one uppercase, one lowercase,one number & one special character",
                  },
                })}
                type={show ? "text" : "password"}
                className="input w-full placeholder:text-accent text-base transition-all duration-200"
                placeholder="Enter Your Password"
              />
              <p
                onClick={() => setShow(!show)}
                className="absolute right-4 top-2.5 z-99"
              >
                {show ? <HiEye size={20} /> : <HiEyeOff size={20} />}
              </p>
            </div>
            {errors?.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            <div className="mt-2 text-base">
              <Link state={emailValue} to="/reset-password">
                Forgot password?
              </Link>
            </div>
            <div className="flex flex-col items-center">
              <button type="submit" className="btn bg-primary w-full">
                Login
              </button>
            </div>
          </fieldset>
        </form>
        <p className="text-center text-base">or</p>
        <div className="flex flex-col items-center">
          <button
            onClick={googleSignInHandler}
            className="flex items-center justify-center gap-1 cursor-pointer active:scale-98  w-full btn bg-gray-200"
          >
            <FcGoogle size={16} /> <span>Login with Google</span>
          </button>
        </div>
        <p className="mt-2 text-center text-base">
          Don't have an account?{" "}
          <Link
            state={location.state}
            to="/register"
            className="hover:underline font-semibold "
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
