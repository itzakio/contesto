import { useLocation, useParams } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import CountdownTimer from "../../Components/CountdownTimer";
import Loading from "../../Components/Loading";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import SubmissionForm from "./SubmissionForm";

const ContestDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const location = useLocation();

  const {
    data: contest = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["contest", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const { data: paymentInfo } = useQuery({
    queryKey: ["payment-status", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/check/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const hasPaid = paymentInfo?.paid;
  console.log(hasPaid)

 const { data:Pcount, isLoading:paymentLoading } = useQuery({
  queryKey: ["participants-count", contest._id],
  queryFn: async () => {
    const res = await axiosSecure.get(
      `/contests/${contest._id}/participants-count`
    );
    return res.data;
  },
  enabled: !!contest?._id,
});

const participantCount = Pcount?.count || 0;


  const {
    title,
    description,
    prize,
    entryFee,
    participationEndAt,
    contestThumbnail,
  } = contest;

  const deadlinePassed =
    new Date(participationEndAt).getTime() < new Date().getTime();


  const paymentHandler = async () => {
    try {
      const paymentInfo = {
        entryFee,
        contestId: contest._id,
        contestName: title,
        userEmail: user.email,
      };
      const res = await axiosSecure.post(
        "/payment-checkout-session",
        paymentInfo
      );

      if (res.data?.url) {
        window.location.assign(res.data.url);
      }
    } catch (error) {
      Swal.fire("Error", "Payment failed!", "error");
    }
  };




  if (isLoading || paymentLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="text-center mt-20 text-red-500">
        Failed to load contest
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 margin-y">
      {/* HEADER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <img
          src={contestThumbnail}
          alt={title}
          className="rounded-xl shadow-lg w-full"
        />

        <div>
          <h1 className="text-3xl font-bold">{title}</h1>

          <div className="mt-6 space-y-2">
            <p>
              🏆 <strong>Prize:</strong> ${prize}
            </p>
            <p>
              💰 <strong>Entry Fee:</strong> ${entryFee}
            </p>
            <p>
              ⏰ <strong>Deadline:</strong>{" "}
              {new Date(participationEndAt).toLocaleString()}
            </p>
            <p>
              😊 <strong>Participants:</strong> {participantCount}
            </p>
          </div>

          {/* COUNTDOWN */}
          <CountdownTimer endTime={participationEndAt} />

          {/* PAY BUTTON */}
          {!hasPaid && !deadlinePassed && (
            <button
              onClick={paymentHandler}
              className="btn btn-primary mt-6 w-full"
            >
              Pay & Participate
            </button>
          )}

          {deadlinePassed && (
            <p className="text-red-500 font-semibold mt-6">
              ❌ Submission closed
            </p>
          )}
        </div>
        <p className="mt-4 text-accent col-span-full">{description}</p>
      </div>

      {/* SUBMISSION FORM */}
      {hasPaid && !deadlinePassed && (
       <SubmissionForm contest={contest}/>
      )}
    </div>
  );
};

export default ContestDetails;
