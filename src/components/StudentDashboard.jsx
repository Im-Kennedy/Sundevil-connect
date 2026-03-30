import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { clubs } from '../data/mockData';
import '../styles/Dashboard.css';

function StudentDashboard() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        const user = localStorage.getItem('currentUser');
        if (user) {
            setCurrentUser(JSON.parse(user));
            console.log("Dashboard loaded for:", JSON.parse(user).name);
        } else {
            // Nobody is logged in, send them back to login
            console.log("No user found, redirecting to login");
            navigate('/');
        }
    }, [navigate]);
    const filteredClubs = clubs.filter(club =>//add filtering
        club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleLogout = () => {
        console.log("Logging out");
        localStorage.removeItem('currentUser');
        navigate('/');
    };
    if (!currentUser) {
        return <div>Loading...</div>;
    }
    return (
        <div className="dashboard-container">
            {/*navigation bar*/}
            <div className="navbar">
                <div className="navbar-left">
                    <h2>SunDevil Connect</h2>
                </div>
                <div className="navbar-right">
                    <span>Hi, {currentUser.name}!</span>
                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                </div>
            </div>
            {/*mainbody*/}
            <div className="dashboard-content">
                <h1>Browse Clubs</h1>
                <p>Find clubs</p>
                {/*search*/}
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search clubs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {/*list of club*/}
                <div className="clubs-grid">
                    {filteredClubs.map(club => (
                        <div key={club.clubId} className="club-card">
                            <h3>{club.name}</h3>
                            <p className="club-category">{club.category}</p>
                            <p className="club-description">{club.description}</p>
                            <p className="club-members">{club.members} members</p>
                        </div>
                    ))}
                </div>
                {/*filtering error*/}
                {filteredClubs.length === 0 && (
                    <p className="no-results">No clubs found matching "{searchTerm}"</p>
                )}
            </div>
        </div>
    );
}
export default StudentDashboard;