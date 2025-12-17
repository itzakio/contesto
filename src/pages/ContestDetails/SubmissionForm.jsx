import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import Loading from "../../Components/Loading";

const SubmissionForm = ({ contest }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: submission,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-submissions", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/submissions/me?contestId=${contest?._id}`
      );
      return res.data.submission;
    },
  });

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
              refetch();
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mt-14 card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="text-2xl font-bold mb-4">Submit Your Project</h2>

        {!submission ? (
          <form onSubmit={handleSubmit(projectSubmitHandler)}>
            <label className="label font-semibold">
              Project Details / Links
            </label>

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
        ) : (
          /* ================= SUBMITTED VIEW ================= */
          <div className="border rounded-lg p-4 bg-base-200">
            <h3 className="text-lg font-semibold mb-2">Your Submission</h3>

            <p className="whitespace-pre-line bg-base-100 p-3 rounded">
              {submission.submissionValue}
            </p>

            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">
                Submitted on{" "}
                {submission.submittedAt &&
                  new Date(submission.submittedAt).toLocaleString()}
              </span>
              <div className="cursor-not-allowed inline-block">
                <button
                  className="btn btn-primary"
                  disabled
                  title="Editing is disabled"
                >
                  Edit (Disabled)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmissionForm;
