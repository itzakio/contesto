import axios from "axios";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

export default function CreateContest() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: currentCreator = [] } = useQuery({
    queryKey: ["creator", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/creators?email=${user.email}`);
      return res.data;
    },
  });
  const creator = currentCreator[0];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const createContestHandler = (data) => {
    const participationEndAt = new Date(`${data.endDate}T${data.endTime}`);
    const coverImage = data.thumbnail[0];

    // 1. store image in form data
    const formData = new FormData();
    formData.append("image", coverImage);
    const image_API_URL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_host_key
    }`;
    // 2. upload the image and get the url
    axios.post(image_API_URL, formData).then((res) => {
      const photoURL = res.data.data.url;

      // create user in database

      const contestData = {
        title: data.title,
        category: data.category,
        description: data.description,
        entryFee: Number(data.entryFee),
        prize: Number(data.prize),
        participationEndAt,
        contestThumbnail: photoURL,
        creatorEmail: user?.email,
      };

      Swal.fire({
        title: `Are you sure you want to post this contest?`,
        icon: "warning",
        showCancelButton: true,
        customClass: {
          title: "swal-text",
          htmlContainer: "swal-text",
          confirmButton: "swal-confirm",
          cancelButton: "swal-cancel",
        },
        confirmButtonText: "Confirm",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.post("/contests", contestData).then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                title: `Contest submitted for admin approval!`,

                icon: "success",
                timer: 2500,
                customClass: {
                  title: "swal-text",
                  htmlContainer: "swal-text",
                  confirmButton: "swal-confirm",
                },
              });
              reset();
            }
          });
        }
      });
    });
    // axios.post("/contests", contestData)
  };

  return (
    <div data-aos="fade-up" data-aos-delay="0" className="card w-full max-w-lg mx-auto margin-y">
      <div className="card-body">
        <h2 className="text-3xl font-extrabold">Post a Contest</h2>

        <form onSubmit={handleSubmit(createContestHandler)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Contest Thumbnail (full width) */}
            <div className="lg:col-span-2">
              <label className="label font-semibold">Contest Thumbnail</label>
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
                {...register("thumbnail", {
                  required: "Thumbnail image is required",
                })}
              />
              {errors.thumbnail && (
                <p className="text-red-500 text-sm">
                  {errors.thumbnail.message}
                </p>
              )}
            </div>

            {/* Title */}
            <div className="lg:col-span-2">
              <label className="label font-semibold">Contest Title</label>
              <input
                className="input w-full"
                {...register("title", {
                  required: "Contest title is required",
                })}
              />
              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* Category */}
            <div className="lg:col-span-2">
              <label className="label font-semibold">Category</label>
              <select
                className="select w-full"
                {...register("category", {
                  required: "Category is required",
                })}
              >
                <option value="">Select Category</option>
                {creator?.categories?.map((cat, idx) => (
                  <option key={idx}>{cat}</option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500">{errors.category.message}</p>
              )}
            </div>

            {/* Description (full width) */}
            <div className="lg:col-span-2">
              <label className="label font-semibold">Description</label>
              <textarea
                className="textarea w-full"
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 50,
                    message: "At least 50 characters",
                  },
                })}
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>

            {/* Entry Fee */}
            <div>
              <label className="label font-semibold">Entry Fee</label>
              <input
                type="number"
                onWheel={(e) => e.target.blur()}
                className="input w-full"
                {...register("entryFee", {
                  required: "Entry fee required",
                  min: 1,
                })}
              />
              {errors.entryFee && (
                <p className="text-red-500">{errors.entryFee.message}</p>
              )}
            </div>

            {/* Prize */}
            <div>
              <label className="label font-semibold">Prize</label>
              <input
                type="number"
                onWheel={(e) => e.target.blur()}
                className="input w-full"
                {...register("prize", {
                  required: "Prize required",
                  min: 1,
                })}
              />
              {errors.prize && (
                <p className="text-red-500">{errors.prize.message}</p>
              )}
            </div>

            {/* End Date */}
            <div>
              <label className="label font-semibold">
                Participation End Date
              </label>
              <input
                type="date"
                className="input w-full"
                {...register("endDate", {
                  required: "End date required",
                })}
              />
              {errors.endDate && (
                <p className="text-red-500">{errors.endDate.message}</p>
              )}
            </div>

            {/* End Time */}
            <div>
              <label className="label font-semibold">
                Participation End Time
              </label>
              <input
                type="time"
                className="input w-full"
                {...register("endTime", {
                  required: "End time required",
                })}
              />
              {errors.endTime && (
                <p className="text-red-500">{errors.endTime.message}</p>
              )}
            </div>
          </div>

          {/* Agreement (full width, outside grid) */}
          <div className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              className="checkbox checkbox-primary checkbox-sm"
              {...register("agree", {
                required: "You must agree",
              })}
            />
            <span>I agree to platform rules</span>
          </div>
          {errors.agree && (
            <p className="text-red-500">{errors.agree.message}</p>
          )}

          {/* Submit */}
          <button className="btn bg-primary w-full mt-6">
            Submit for Approval
          </button>
        </form>
      </div>
    </div>
  );
}
