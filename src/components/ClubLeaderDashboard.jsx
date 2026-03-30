import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

function ClubLeaderDashboard() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {//match login user
        const user = localStorage.getItem('currentUser');
        if (user) {
            const userData = JSON.parse(user);
            setCurrentUser(userData);
            console.log("Club leader dashboard ", userData.name);
        } else {//fail
            navigate('/');
        }
    }, [navigate]);
    const handleLogout = () => {//log out
        console.log("Club leader logout");
        localStorage.removeItem('currentUser');
        navigate('/');
    };
    if (!currentUser) {//loading
        return <div>Loading...</div>;
    }
    return (
        <div className="dashboard-container">
            {/*navigation bar up on the top*/}
            <div className="navbar">
                <div className="navbar-left">
                    <h2>SunDevil Connect Club Leader</h2>
                </div>
                <div className="navbar-right">
                    <span>Hi, {currentUser.name}!</span>
                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                </div>
            </div>
            {/*body section*/}
            <div className="dashboard-content">
                <h1>Club Leader Dashboard</h1>
                <p>Role: {currentUser.role}</p>
                <div style={{marginTop: '40px', padding: '20px', background: 'white', borderRadius: '8px'}}>
                    <h2>Main body</h2>
                    <p>Things to do </p>
                    <ul>
                        <li>Create new events</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default ClubLeaderDashboard;