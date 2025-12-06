import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/Shared/Navbar';



const RootLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <header><Navbar/></header>
            <main className='flex-1'><Outlet/></main>
            <footer></footer>
        </div>
    );
};

export default RootLayout;