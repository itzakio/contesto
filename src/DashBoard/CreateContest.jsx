import { useForm } from "react-hook-form";

export default function CreateContest() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const participationEndAt = new Date(`${data.endDate}T${data.endTime}`);

    const contestData = {
      title: data.title,
      category: data.category,
      description: data.description,
      entryFee: Number(data.entryFee),
      prize: Number(data.prize),
      participationEndAt, // IMPORTANT
    };

    console.log(contestData);

    // axios.post("/contests", contestData)
  };

  return (
    <div className="card w-full max-w-lg mx-auto margin-y">
      <div className="card-body">
        <h2 className="text-3xl font-extrabold">Post a Contest</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
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
                <option value="">Select</option>
                <option>Quiz Contest</option>
                <option>Coding Contest</option>
                <option>Creative Design Contest</option>
                <option>Writing Contest</option>
                <option>Photography Contest</option>
                <option>Idea Pitch Contest</option>
                <option>Logic & Puzzle Contest</option>
                <option>Gaming (Score-based) Contest</option>
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
