import React from "react";
import creatorAnimation from "../../assets/Create.json";
import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const BeACreator = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const beACreatorHandler = async (data) => {
    try {
      data.photoURL = user.photoURL;

      const res = await axiosSecure.post("/creators", data);

      if (res.data?.message) {
        toast.error(res.data.message);
        return;
      }
 
      if (res.data?.insertedId) {
        Swal.fire({
          title: "Application Submitted!",
          text: "Your application has been submitted. We will reach out within 7 days!",
          icon: "success",
          timer: 15000,
          customClass: {
            title: "swal-text",
            htmlContainer: "swal-text",
            confirmButton: "swal-confirm",
          },
        });
        reset();
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      toast.error(errorMsg);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2">
      <div >
        <div className="card w-full max-w-sm mx-auto mt-10 ">
          <div className="card-body">
            <h2 className="text-4xl font-extrabold mb-2 text-primary">
              Become a Creator
            </h2>
            <p className="text-lg mb-4">Fill out the form to host contests</p>

            <form onSubmit={handleSubmit(beACreatorHandler)}>
              {/* Full Name */}
              <label className="label text-base font-semibold">Full Name</label>
              <input
                {...register("creatorName", {
                  required: "Full name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
                defaultValue={user?.displayName}
                type="text"
                placeholder="Enter Your Full Name"
                className="input w-full text-base placeholder:text-accent"
              />
              {errors.creatorName && (
                <p className="text-red-500 text-sm">
                  {errors.creatorName.message}
                </p>
              )}

              {/* Email */}
              <label className="label text-base font-semibold mt-4">
                Email
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
                defaultValue={user?.email}
                readOnly
                type="email"
                placeholder="Enter Your Email"
                className="input w-full text-base placeholder:text-accent"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}

              {/* Phone */}
              <label className="label text-base font-semibold mt-4">
                Phone Number
              </label>
              <input
                {...register("phone", {
                  required: "Phone number is required",
                  minLength: {
                    value: 10,
                    message: "Phone number must be at least 10 digits",
                  },
                })}
                type="text"
                placeholder="Enter Your Phone Number"
                className="input w-full text-base placeholder:text-accent"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}

              {/* Contest Category */}
              <label className="label text-base font-semibold mt-4">
                Contest Categories
              </label>

              <div className="flex flex-col gap-2">
                {[
                  "Quiz",
                  "Coding",
                  "Creative Design",
                  "Writing",
                  "Photography",
                  "Idea Pitch",
                  "Logic & Puzzle",
                  "Gaming (Score-based)",
                ].map((category) => (
                  <label
                    key={category}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      {...register("categories")}
                      value={category}
                      className="checkbox checkbox-primary checkbox-sm mb-1"
                    />
                    <span className="text-base">{category}</span>
                  </label>
                ))}
              </div>

              {/* Short Bio */}
              <label className="label text-base font-semibold mt-4">
                Short Bio
              </label>
              <textarea
                {...register("bio", {
                  required: "Bio is required",
                  minLength: {
                    value: 20,
                    message: "Bio must be at least 20 characters",
                  },
                })}
                placeholder="Tell us about yourself"
                className="textarea w-full text-base placeholder:text-accent"
              />
              {errors.bio && (
                <p className="text-red-500 text-sm">{errors.bio.message}</p>
              )}

              {/* Agree Checkbox */}
              <div className="flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  {...register("agreement", {
                    required: "You must agree to the terms",
                  })}
                  className="checkbox checkbox-primary checkbox-sm mb-1"
                />
                <label className="text-base font-medium">
                  I agree to follow platform rules
                </label>
              </div>
              {errors.agreement && (
                <p className="text-red-500 text-sm">
                  {errors.agreement.message}
                </p>
              )}

              {/* Submit Button */}
              <input
                type="submit"
                value={"Submit Application"}
                className="btn bg-primary w-full mt-6"
              />
            </form>
          </div>
        </div>
      </div>
      <div >
        <Lottie
          animationData={creatorAnimation} // Pass the imported JSON data
          loop={true} // Control looping
          autoplay={true} // Control starting playback
          // style={{ width: 300, height: 300 }} // You can pass inline styles
        />
      </div>
    </div>
  );
};

export default BeACreator;
