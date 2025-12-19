import { Link, useLocation, useParams } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import CountdownTimer from "../../Components/CountdownTimer";
import Loading from "../../Components/Loading";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import SubmissionForm from "./SubmissionForm";
import { FaArrowLeft } from "react-icons/fa";
import useRole from "../../hooks/useRole";

const ContestDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user, userLoading } = useAuth();
  const location = useLocation();
  const role = useRole();

  console.log(role)
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
      Swal.fire("Error","Payment failed!", "error");
    }
  };




  if (isLoading || paymentLoading || userLoading) {
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
        <div className="flex flex-col">
          <Link className="btn btn-primary text-black w-fit mb-4" to={location.state? location.state : "/all-contests"}><FaArrowLeft size={20}/> Back</Link>
          <img
          src={contestThumbnail}
          alt={title}
          className="rounded-xl shadow-lg w-full"
        />
        </div>

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
              👱 <strong>Participants:</strong> {participantCount}
            </p>
          </div>

          {/* COUNTDOWN */}
          <CountdownTimer endTime={participationEndAt} />

          {/* PAY BUTTON */}
          {!hasPaid && !deadlinePassed && role?.role === "user" &&  (
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
