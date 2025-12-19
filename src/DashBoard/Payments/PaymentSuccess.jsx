import React, { useEffect, useState } from 'react';
import payment from "../../assets/payment.gif"
import { Link, useLocation, useSearchParams } from 'react-router';
import { MdArrowBack } from 'react-icons/md';
import useAxiosSecure from '../../hooks/useAxiosSecure';



const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const axiosSecure = useAxiosSecure();
    const [paymentInfo, setPaymentInfo] = useState({})
    const sessionId = searchParams.get("session_id")

    useEffect(()=>{
        if(sessionId){
            axiosSecure.post(`/verify-payment?session_id=${sessionId}`)
            .then(res=>{
                setPaymentInfo({
                    transactionId: res.data.transactionId,
                })
            })
        }
    },[sessionId, axiosSecure])


    return (
        <div className='space-y-4 flex flex-col justify-center items-center min-h-screen bg-base-100'>
            <img className='w-40' src={payment} alt="payment" />
            <h2 className='text-4xl font-extrabold text-center'>Payment Successful!</h2> 
            <p><strong>Your Transaction Id:</strong> {paymentInfo?.transactionId}</p>
            <Link className='btn btn-primary text-black' to="/dashboard/my-joined-contests"><MdArrowBack />My Joined Contests</Link>
        </div>
    );
};

export default PaymentSuccess;