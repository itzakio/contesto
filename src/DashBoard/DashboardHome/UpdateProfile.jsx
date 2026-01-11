import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import Loading from "../../Components/Loading";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const UpdateProfile = () => {
  const { user: authUser, userProfileUpdate } = useAuth();
  const [photoUrl, setPhotoUrl] = useState("");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { data: user, isLoading } = useQuery({
    queryKey: ["user-profile", authUser.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/user/profile?email=${authUser.email}`
      );
      setPhotoUrl(res.data.photoURL);
      return res.data;
    },
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const profileUpdateHandler = async (data) => {
    let userPhotoUrl = photoUrl;

    if (data.photo && data.photo.length > 0) {
      const userImage = data.photo[0];

      const formData = new FormData();
      formData.append("image", userImage);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`;

      const imgRes = await axios.post(image_API_URL, formData);
      userPhotoUrl = imgRes.data.data.url;
    }

    const userInfo = {
      name: data.name,
      photoURL: userPhotoUrl,
      address: data.address,
      bio: data.bio,
    };

    const userProfile = {
      displayName: data.name,
      photoURL: userPhotoUrl,
    };

    Swal.fire({
      title: "Are you sure you want to update your information??",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/user/profile`, userInfo)
          .then(() => {
             userProfileUpdate(userProfile)
            .then(() => {
              console.log("user profile updated");
            })
            .catch((error) => {
              console.log(error);
            });
            Swal.fire({
              title: "Profile updated!",
              icon: "success",
              timer: 2500,
            });
            navigate(
              location.state ? location.state : "/dashboard"
            );
          });
      }
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className=" card w-full margin-y -mb-10 max-w-sm shrink-0 mx-auto">
      <div className="card-body">
        <form
         onSubmit={handleSubmit(profileUpdateHandler)}
        >
          <h3 className="text-3xl font-extrabold mb-2">Update Your Profile</h3>

          <fieldset className="fieldset">
            {/* name */}
            <label className="text-base label font-semibold">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              className="input w-full text-base placeholder:text-accent"
              placeholder="Enter Your Name"
              defaultValue={user?.name}
            />
            {errors?.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
            {/* Photo */}
            <label className="text-base label font-semibold">Photo</label>
            <input
              {...register("photo")}
              type="file"
              className="file-input w-full text-base placeholder:text-accent"
              placeholder="Upload Your Photo"
            />
            {errors?.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}

            {/* address */}
            <label className="label text-base font-semibold">Address</label>
            <input
              {...register("address")}
              type="text"
              className="input w-full text-base placeholder:text-accent"
              placeholder="Enter Your Address"
              defaultValue={user?.address}
            />

            {/* bio */}
            <label className="label text-base font-semibold">Bio</label>
            <textarea
              {...register("bio")}
              type="text"
              className="input w-full h-20 text-base placeholder:text-accent"
              placeholder="Write something about yourself!"
              defaultValue={user?.bio}
            />

            {errors?.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}

            <div className="flex flex-col items-center mt-4">
              <button type="submit" className="btn bg-primary w-full">
                Update Profile
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
