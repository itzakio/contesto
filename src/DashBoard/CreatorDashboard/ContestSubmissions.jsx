import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ContestSubmissions = () => {
  const { contestId } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedSubmission, setSelectedSubmission] = useState(null);

  // 🔹 Fetch submissions
  const {
    data: submissions = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["contest-submissions", contestId],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/creator/contests/${contestId}/submissions`
      );
      return res.data;
    },
    enabled: !!contestId,
  });

  // 🔹 Make winner handler
  const makeWinnerHandle = async (submissionId) => {
    const confirm = await Swal.fire({
      title: "Make this user winner?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, make winner",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(
        `/creator/contests/${contestId}/winner/${submissionId}`
      );

      Swal.fire("Success", "Winner selected successfully", "success");

      // 🔄 Refetch submissions
      queryClient.invalidateQueries({
        queryKey: ["contest-submissions", contestId],
      });
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to select winner",
        "error"
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mt-16">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-error text-center mt-10">
        {error?.response?.data?.message || "Failed to load submissions"}
      </p>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Contest Submissions</h2>

      {submissions.length === 0 ? (
        <p className="text-gray-500">No submissions yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Email</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub, index) => (
                <tr key={sub._id}>
                  <td>{index + 1}</td>

                  {/* 👤 User info */}
                  <td className="flex items-center gap-3">
                    <img
                      src={
                        sub.user?.photoURL ||
                        "https://img.freepik.com/premium-vector/user-profile-icon-circle_1256048-12499.jpg?semt=ais_hybrid&w=740&q=80"
                      }
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="font-semibold">
                      {sub.user?.name || "Unknown"}
                    </span>
                  </td>

                  <td>{sub.user?.email}</td>

                  {/* 🏷 Status */}
                  <td>
                    <span
                      className={`badge ${
                        sub.status === "winner"
                          ? "badge-success"
                          : sub.status === "lost"
                          ? "badge-error"
                          : "badge-outline"
                      }`}
                    >
                      {sub.status}
                    </span>
                  </td>

                  {/* 🎯 Actions */}
                  <td className="flex gap-4 justify-center">
                    <button
                      className="btn btn-outline"
                      onClick={() => {
                        setSelectedSubmission(sub);
                        document.getElementById("submission_modal").showModal();
                      }}
                    >
                      See Submission
                    </button>

                    <button
                      className="btn btn-success"
                      disabled={sub.status !== "pending"}
                      onClick={() => makeWinnerHandle(sub._id)}
                    >
                      Make Winner
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= MODAL ================= */}
      <dialog id="submission_modal" className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-lg mb-2">Submission Details</h3>

          {selectedSubmission && (
            <>
              <p className="text-sm mb-1">
                <strong>User:</strong> {selectedSubmission.user?.name}
              </p>

              <p className="text-sm mb-3">
                <strong>Email:</strong> {selectedSubmission.user?.email}
              </p>

              <div className="bg-base-200 p-4 rounded whitespace-pre-line">
                {selectedSubmission.submissionValue}
              </div>

              <p className="text-xs text-gray-500 mt-3">
                Submitted on{" "}
                {selectedSubmission.submittedAt
                  ? new Date(selectedSubmission.submittedAt).toLocaleString()
                  : ""}
              </p>
            </>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ContestSubmissions;
