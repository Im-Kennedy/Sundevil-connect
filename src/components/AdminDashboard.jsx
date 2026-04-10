import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import { clubs } from '../data/mockData';

function AdminDashboard() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [activeTab, setActiveTab] = useState('clubs');
    const [allClubs, setAllClubs] = useState(clubs);
    const [flagged, setFlagged] = useState([]);
    //use all same bodies for clubleader
    useEffect(() => {
        const user = localStorage.getItem('currentUser');
        if (user) {
            const userData = JSON.parse(user);
            setCurrentUser(userData);
            console.log("Admin dashboard loaded for:", userData.name);
        } else {
            //not logged in, send back to login
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
    const handleApprove = (clubId) => {
        //set the club's approval status to approved
        setAllClubs(prev => prev.map(c =>
            c.clubId === clubId ? { ...c, approvalStatus: 'approved' } : c
        ));
        console.log("Approved club:", clubId);
    };

    const handleDeny = (clubId) => {
        //set the club's approval status to denied
        setAllClubs(prev => prev.map(c =>
            c.clubId === clubId ? { ...c, approvalStatus: 'denied' } : c
        ));
        console.log("Denied club:", clubId);
    };

    const handleFlag = (clubId) => {
        //add to flagged list if not already there
        if (flagged.includes(clubId)) return;
        setFlagged(prev => [...prev, clubId]);
        console.log("Flagged club:", clubId);
    };

    const handleUnflag = (clubId) => {
        setFlagged(prev => prev.filter(id => id !== clubId));
        console.log("Unflagged club:", clubId);
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
                {/* admin banner */}
                <div className="welcome-banner">
                    <h1>Admin Panel</h1>
                    <p>Manage all clubs and keep the platform running smoothly</p>
                </div>

                {/* tab switcher */}
                <div className="tab-switcher">
                    <button
                        className={`tab-btn ${activeTab === 'clubs' ? 'tab-active' : ''}`}
                        onClick={() => setActiveTab('clubs')}
                    >
                        All Clubs
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'pending' ? 'tab-active' : ''}`}
                        onClick={() => setActiveTab('pending')}
                    >
                        Pending Approval {allClubs.filter(c => c.approvalStatus === 'pending').length > 0 &&
                        `(${allClubs.filter(c => c.approvalStatus === 'pending').length})`}
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'flagged' ? 'tab-active' : ''}`}
                        onClick={() => setActiveTab('flagged')}
                    >
                        Flagged {flagged.length > 0 && `(${flagged.length})`}
                    </button>
                </div>

                {/*all the clubs*/}
                {activeTab === 'clubs' && (
                    <div>
                        <p className="tab-subtitle">All clubs on the platform</p>
                        {allClubs.map(club => (
                            <div key={club.clubId} className="member-row">
                                <div>
                                    <span className="member-name">{club.name}</span>
                                    <span style={{marginLeft: '12px', fontSize: '13px', color: '#888'}}>{club.category}</span>
                                    {flagged.includes(club.clubId) && (
                                        <span style={{marginLeft: '10px', color: 'red', fontSize: '13px', fontWeight: 'bold'}}>Flagged</span>
                                    )}
                                </div>
                                <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                    <span style={{
                        fontSize: '12px',
                        fontWeight: 'bold',
                        color: club.approvalStatus === 'approved' ? '#4caf50' : club.approvalStatus === 'denied' ? '#f44336' : '#ff9800'
                    }}>
                        {club.approvalStatus}
                    </span>
                                    {flagged.includes(club.clubId) ? (
                                        <button className="deny-btn" onClick={() => handleUnflag(club.clubId)}>
                                            Unflag
                                        </button>
                                    ) : (
                                        <button className="deny-btn" onClick={() => handleFlag(club.clubId)}>
                                            Flag
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/*pending tab*/}
                {activeTab === 'pending' && (
                    <div>
                        <p className="tab-subtitle">Clubs waiting for approval</p>
                        {allClubs.filter(c => c.approvalStatus === 'pending').length === 0 && (
                            <p className="tab-subtitle">No clubs pending approval right now.</p>
                        )}
                        {allClubs.filter(c => c.approvalStatus === 'pending').map(club => (
                            <div key={club.clubId} className="member-row">
                                <div>
                                    <span className="member-name">{club.name}</span>
                                    <p style={{margin: '4px 0 0', fontSize: '13px', color: '#666'}}>{club.description}</p>
                                </div>
                                <div style={{display: 'flex', gap: '10px'}}>
                                    <button className="join-btn" onClick={() => handleApprove(club.clubId)}>
                                        Approve
                                    </button>
                                    <button className="deny-btn" onClick={() => handleDeny(club.clubId)}>
                                        Deny
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/*flagged*/}
                {activeTab === 'flagged' && (
                    <div>
                        <p className="tab-subtitle">Clubs you have flagged for review</p>
                        {flagged.length === 0 && (
                            <p className="tab-subtitle">No flagged clubs right now.</p>
                        )}
                        {allClubs.filter(c => flagged.includes(c.clubId)).map(club => (
                            <div key={club.clubId} className="member-row">
                                <div>
                                    <span className="member-name">{club.name}</span>
                                    <p style={{margin: '4px 0 0', fontSize: '13px', color: '#666'}}>{club.description}</p>
                                </div>
                                <button className="deny-btn" onClick={() => handleUnflag(club.clubId)}>
                                    Unflag
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
export default AdminDashboard;