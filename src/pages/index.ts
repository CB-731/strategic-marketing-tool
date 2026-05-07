import React from 'react';
import Sidebar from '../components/Sidebar';
import CenterPanel from '../components/CenterPanel';
import RightSidebar from '../components/RightSidebar';
import './styles/main.css';

const HomePage: React.FC = () => {
    return (
        <div className="app-layout">
            <Sidebar />
            <CenterPanel />
            <RightSidebar />
        </div>
    );
};

export default HomePage;