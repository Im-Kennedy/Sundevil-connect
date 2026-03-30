import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

function AdminDashboard() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    //use all same bodies for clubleader
    useEffect(() => {
        const user = localStorage.getItem('currentUser');
        if (user) {
            const userData = JSON.parse(user);
            setCurrentUser(userData);
            console.log("Admin dashboard loaded for:", userData.name);
        } else {
            // Not logged in, send back to login
            navigate('/');
        }
    }, [navigate]);
    const handleLogout = () => {
        console.log("Admin logging out");
        localStorage.removeItem('currentUser');
        navigate('/');
    };
    if (!currentUser) {//loading
        return <div>Loading...</div>;
    }
    return (
        <div className="dashboard-container">
            {/*navidation bar*/}
            <div className="navbar">
                <div className="navbar-left">
                    <h2>SunDevil Connect Admin</h2>
                </div>
                <div className="navbar-right">
                    <span>Hi, {currentUser.name}!</span>
                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                </div>
            </div>
            {/*main body section*/}
            <div className="dashboard-content">
                <h1>Admin Dashboard</h1>
                <p>Role: {currentUser.role}</p>
                <div style={{marginTop: '40px', padding: '20px', background: 'white', borderRadius: '8px'}}>
                    <h2>Main section</h2>
                    <p>admin roles</p>
                    <ul>
                        <li>Approve new clubs</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default AdminDashboard;