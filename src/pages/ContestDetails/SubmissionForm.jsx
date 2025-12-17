import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const SubmissionForm = ({ contest }) => {
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const projectSubmitHandler = async (data) => {
    Swal.fire({
      title: "Submit Project?",
      text: "You won’t be able to edit after submission.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .post("/submissions", {
            contestId: contest._id,
            submissionValue: data.projectLink,
          })
          .then((res) => {
            if (res.data.success) {
              Swal.fire(
                "Success",
                "Project submitted successfully!",
                "success"
              );
              reset();
            }
          })
          .catch((error) => {
            const message =
              error.response?.data?.message ||
              "Something went wrong. Please try again.";

            Swal.fire("Error", message, "error");
          });
      }
    });
  };

  return (
    <div className="mt-14 card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="text-2xl font-bold mb-4">Submit Your Project</h2>

        <form onSubmit={handleSubmit(projectSubmitHandler)}>
          <label className="label font-semibold">Project Details / Links</label>

          <textarea
            {...register("projectLink", {
              required: "Submission details are required",
              minLength: {
                value: 10,
                message: "Please provide more details",
              },
            })}
            rows={5}
            placeholder={`Paste your links or details here:
- GitHub repo
- Live demo
- Drive link
- Description`}
            className="textarea textarea-bordered w-full resize-none"
          />

          {errors.projectLink && (
            <p className="text-error text-sm mt-1">
              {errors.projectLink.message}
            </p>
          )}

          <button
            type="submit"
            className="btn btn-primary text-black mt-4 w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Project"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmissionForm;
