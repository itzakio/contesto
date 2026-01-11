import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";


const Register = () => {
  const [show, setShow] = useState(false);
  const { registerUser, userProfileUpdate, googleSignIn, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const registerHandler = (data) => {
    const profileImage = data.photo[0];
    registerUser(data.email, data.password)
      .then((result) => {
        // 1. store image in form data
        const formData = new FormData();
        formData.append("image", profileImage);
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;
        // 2. upload the image and get the url
        axios.post(image_API_URL, formData).then((res) => {
          const photoURL = res.data.data.url;

          // create user in database
          const user_info = {
            email: data.email,
            name: data.name,
            photoURL,
          };
          axiosSecure.post("/users", user_info).then((res) => {
            if (res.data.insertedId) {
              console.log("user created in database");
            }
          });

          //3. update user profile
          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };
          userProfileUpdate(userProfile)
            .then(() => {
              console.log("user profile updated");
            })
            .catch((error) => {
              console.log(error);
            });
        });
        navigate(location.state ? location.state : "/");
        console.log(result.user);
      })
       .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          toast.error(
            "This email is already registered. Try logging in instead."
          );
        } else if (error.code === "auth/invalid-email") {
          toast.error("Invalid email address. Please check and try again.");
        } else if (error.code === "auth/weak-password") {
          toast.error(
            "Password is too weak. Use at least 6 characters with a upperCase and a lowerCase letters and numbers."
          );
        } else if (error.code === "auth/missing-password") {
          toast.error("Please enter a password before proceeding.");
        } else if (error.code === "auth/user-not-found") {
          toast.error(
            "No account found with this email. Please sign up first."
          );
        } else if (error.code === "auth/wrong-password") {
          toast.error("Incorrect password. Please try again.");
        } else if (error.code === "auth/too-many-requests") {
          toast.error("Too many failed attempts. Please try again later.");
        } else if (error.code === "auth/network-request-failed") {
          toast.error("Network error. Please check your internet connection.");
        } else if (error.code === "auth/popup-closed-by-user") {
          toast.error("Sign-in popup was closed before completion.");
        } else if (error.code === "auth/operation-not-allowed") {
          toast.error("This sign-in method is not enabled in Firebase.");
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
        toast.success("User Registered successfully");
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
    <div className="top-14 md:top-0 card w-full margin-y -mb-10 max-w-sm shrink-0 mx-auto">
      <div className="card-body">
        <form
         onSubmit={handleSubmit(registerHandler)}
        >
          <h3 className="text-4xl font-extrabold mb-2">Create an Account</h3>
          <p className="text-lg mb-4">Register with Contesto</p>
          <fieldset className="fieldset">
            {/* name */}
            <label className="text-base label font-semibold">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              className="input w-full text-base placeholder:text-accent"
              placeholder="Enter Your Name"
            />
            {errors?.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
            {/* Photo */}
            <label className="text-base label font-semibold">Photo</label>
            <input
              {...register("photo", { required: "Photo is required" })}
              type="file"
              className="file-input w-full text-base placeholder:text-accent"
              placeholder="Upload Your Photo"
            />
            {errors?.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
            {/* email */}
            <label className="text-base label font-semibold">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              className="input w-full text-base placeholder:text-accent"
              placeholder="Enter Your Email"
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
              <Link>Forgot password?</Link>
            </div>
            <div className="flex flex-col items-center">
              <button type="submit" className="btn bg-primary w-full text-black">
                Register
              </button>
            </div>
          </fieldset>
        </form>
        <p className="text-center text-base">or</p>
        <div className="flex flex-col items-center">
          <button
            onClick={googleSignInHandler}
            className="flex items-center justify-center gap-1 cursor-pointer active:scale-98 text-black w-full btn bg-gray-200"
          >
            <FcGoogle size={16} /> <span>Register with Google</span>
          </button>
        </div>
        <p className="mt-2 text-center text-base">
          Already have an account?{" "}
          <Link
            state={location.state}
            to="/login"
            className="hover:underline font-semibold "
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
