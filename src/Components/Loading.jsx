import React from 'react';
import loadingAnimation from '../assets/Loading.json'
import Lottie from 'lottie-react';

const Loading = () => {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <Lottie
          animationData={loadingAnimation} // Pass the imported JSON data
          loop={true} // Control looping
          autoplay={true} // Control starting playback
          className='w-70 lg:w-96' // You can pass inline styles
        />
        </div>
    );
};

export default Loading;