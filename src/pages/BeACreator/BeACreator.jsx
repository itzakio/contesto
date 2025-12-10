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
  } = useForm();

  const beACreatorHandler = (data) => {
    console.log(data);
    axiosSecure.post("/creators", data).then((res) => {
      if(res.data.message){
        return toast.error(res.data.message)
      }
      if (res.data.insertedId) {
        Swal.fire({
          title: "Application Submitted!",
          text: "Your application has been submitted, We will reach out you within 7 days!",
          icon: "success",
          timer: 15000,
          customClass: {
            title: "swal-text",
            htmlContainer: "swal-text",
            confirmButton: "swal-confirm",
          },
        });
      }
    });
  };
  return (
    <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2">
      <div data-aos="fade-right">
        <div className="card w-full max-w-sm mx-auto mt-10 ">
          <div className="card-body">
            <h2 className="text-4xl font-extrabold mb-2">Become a Creator</h2>
            <p className="text-lg mb-4">Fill out the form to host contests</p>

            <form onSubmit={handleSubmit(beACreatorHandler)}>
              {/* Full Name */}
              <label className="label text-base font-semibold">Full Name</label>
              <input
                {...register("fullName", {
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
              {errors.fullName && (
                <p className="text-red-500 text-sm">
                  {errors.fullName.message}
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
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register("categories")}
                    value="coding"
                    className="checkbox checkbox-primary"
                  />
                  Coding
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register("categories")}
                    value="quiz"
                    className="checkbox checkbox-primary"
                  />
                  Quiz
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register("categories")}
                    value="art"
                    className="checkbox checkbox-primary"
                  />
                  Art
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register("categories")}
                    value="writing"
                    className="checkbox checkbox-primary"
                  />
                  Writing
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register("categories")}
                    value="gaming"
                    className="checkbox checkbox-primary"
                  />
                  Gaming
                </label>
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
                  className="checkbox checkbox-primary checkbox-sm "
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
      <div data-aos="fade-left">
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
