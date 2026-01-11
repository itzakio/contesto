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
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const loginHandler = (data) => {
    logInUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Logged in successfully!");
        navigate(location.state ? location.state : "/");
      })
      .catch((error) => {
        const errorMap = {
          "auth/invalid-email":
            "Invalid email address. Please check and try again.",
          "auth/missing-password":
            "Please enter your password to continue.",
          "auth/user-not-found":
            "No account found with this email. Please sign up first.",
          "auth/wrong-password":
            "Incorrect password. Please try again.",
          "auth/invalid-credential":
            "Email or password is incorrect.",
          "auth/too-many-requests":
            "Too many failed attempts. Try again later.",
          "auth/network-request-failed":
            "Network error. Please check your internet connection.",
        };

        toast.error(errorMap[error.code] || "Login failed. Try again.");
      });
  };

  const googleSignInHandler = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Logged in successfully!");

        const userInfo = {
          email: user.email,
          name: user.displayName,
          photo_url: user.photoURL,
        };

        axiosSecure.post("/users", userInfo);
        navigate(location.state ? location.state : "/");
      })
      .catch((error) =>
        toast.error(error.message || "Google sign-in failed")
      );
  };

  const fillDemoCredentials = (role) => {
    const demoUsers = {
      admin: {
        email: "contesto@gmail.com",
        password: "Akio@2001",
      },
      creator: {
        email: "akio@gmail.com",
        password: "Akio@2001",
      },
      user: {
        email: "akash@gmail.com",
        password: "Akio@2001",
      },
    };

    setValue("email", demoUsers[role].email);
    setValue("password", demoUsers[role].password);
    setEmailValue(demoUsers[role].email);

    toast.success(`${role.toUpperCase()} credentials filled`);
  };

  return (
    <div className="card w-full max-w-sm mx-auto my-16 bg-base-200 shadow-xl">
      <div className="card-body">
        <form onSubmit={handleSubmit(loginHandler)}>
          <h3 className="text-4xl font-extrabold mb-2">Welcome Back</h3>
          <p className="text-lg mb-4 opacity-70">Login to Contesto</p>

          {/* EMAIL */}
          <label className="label font-semibold">Email</label>
          <input
            {...register("email", { required: true })}
            type="email"
            className="input input-bordered w-full"
            placeholder="Enter your email"
            onChange={(e) => setEmailValue(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">Email is required</p>
          )}

          {/* PASSWORD */}
          <label className="label font-semibold mt-3">Password</label>
          <div className="relative">
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
              type={show ? "text" : "password"}
              className="input input-bordered w-full"
              placeholder="Enter your password"
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute right-4 top-3 cursor-pointer"
            >
              {show ? <HiEye size={20} /> : <HiEyeOff size={20} />}
            </span>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">
              {errors.password.message}
            </p>
          )}

          {/* DEMO BUTTONS */}
          <div className="mt-4">
            <p className="text-sm text-center opacity-70 mb-2">
              Try Demo Accounts
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => fillDemoCredentials("admin")}
                className="btn btn-outline btn-sm"
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials("creator")}
                className="btn btn-outline btn-sm"
              >
                Creator
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials("user")}
                className="btn btn-outline btn-sm"
              >
                User
              </button>
            </div>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="btn btn-primary w-full mt-5 text-black"
          >
            Login
          </button>
        </form>

        {/* FORGOT PASSWORD */}
        <div className="mt-3 text-center">
          <Link state={emailValue} to="/reset-password" className="link">
            Forgot password?
          </Link>
        </div>

        {/* GOOGLE LOGIN */}
        <div className="divider">OR</div>
        <button
          onClick={googleSignInHandler}
          className="btn bg-gray-200 w-full text-black flex items-center gap-2"
        >
          <FcGoogle size={18} /> Login with Google
        </button>

        {/* REGISTER */}
        <p className="text-center mt-3">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-semibold underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
