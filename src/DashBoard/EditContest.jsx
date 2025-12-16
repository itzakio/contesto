import axios from "axios";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useLocation, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

const EditContest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { id } = useParams();
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const location = useLocation();
  const navigate = useNavigate();


  const { data: currentCreator = [] } = useQuery({
    queryKey: ["creator", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/creators?email=${user.email}`);
      return res.data;
    },
  });
  const creator = currentCreator[0];

  const { data: contest = {} } = useQuery({
    queryKey: ["contest-to-edit", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${id}`);
      setThumbnailUrl(res.data.contestThumbnail);
      return res.data;
    },
  });

  const isoToLocalDate = (iso) => {
    if (!iso) return "";

    const date = new Date(iso);
    if (isNaN(date.getTime())) return "";

    const offset = date.getTimezoneOffset();
    const local = new Date(date.getTime() - offset * 60000);

    return local.toISOString().slice(0, 10); // YYYY-MM-DD
  };

  const isoToLocalTime = (iso) => {
    if (!iso) return "";

    const date = new Date(iso);
    if (isNaN(date.getTime())) return "";

    const offset = date.getTimezoneOffset();
    const local = new Date(date.getTime() - offset * 60000);

    return local.toISOString().slice(11, 16); // HH:mm
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (contest?.participationEndAt) {
      reset({
        endDate: isoToLocalDate(contest.participationEndAt),
        endTime: isoToLocalTime(contest.participationEndAt),
        category: contest.category,
      });
    }
  }, [contest, reset]);

  // edit handler
  const contestEditHandler = async (data) => {
    let contestThumbnail = thumbnailUrl;

    if (data.thumbnail && data.thumbnail.length > 0) {
      const coverImage = data.thumbnail[0];

      const formData = new FormData();
      formData.append("image", coverImage);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`;

      const imgRes = await axios.post(image_API_URL, formData);
      contestThumbnail = imgRes.data.data.url;
    }

    const participationEndAt = new Date(
      `${data.endDate}T${data.endTime}`
    ).toISOString();

    const contestDataUpdated = {
      title: data.title,
      category: data.category,
      description: data.description,
      entryFee: Number(data.entryFee),
      prize: Number(data.prize),
      participationEndAt,
      contestThumbnail,
    };

    Swal.fire({
      title: "Are you sure with the edit?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/creator/contests/${contest._id}`, contestDataUpdated)
          .then(() => {
            Swal.fire({
              title: "Contest edited!",
              icon: "success",
              timer: 2500,
            });
            navigate(location.state?location.state:'/dashboard/my-contests')
          });
      }
    });
  };

  return (
    <div className="card w-full max-w-lg mx-auto margin-y">
      <div className="card-body">
        <h2 className="text-3xl font-extrabold text-primary">
          Edit Your Contest Info
        </h2>

        <form onSubmit={handleSubmit(contestEditHandler)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Contest Thumbnail (full width) */}
            <div className="lg:col-span-2">
              <label className="label font-semibold">Contest Thumbnail</label>
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
                {...register("thumbnail")}
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
                defaultValue={contest.title}
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
                defaultValue={contest.description}
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
                defaultValue={contest.entryFee}
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
                defaultValue={contest.prize}
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
};

export default EditContest;
