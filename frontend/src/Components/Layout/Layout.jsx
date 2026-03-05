import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext/AuthContext';
// import CampusLife from "../Home/Campuslife";

const Layout = () => {
    const {loading,setLoading} = useAuth();
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-neutral-800">
            <Navbar />
            {/* <CampusLife/> */}
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
