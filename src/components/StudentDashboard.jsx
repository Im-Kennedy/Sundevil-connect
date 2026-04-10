import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { clubs, events, memberships, eventRegistrations } from '../data/mockData';
import '../styles/Dashboard.css';

function StudentDashboard() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('clubs');//seelected tabs
    const [categoryFilter, setCategoryFilter] = useState('all');//filter
    const [myRegistrations, setMyRegistrations] = useState([]);//registrations
    const [myMemberships, setMyMemberships] = useState([]);//membershipts

    useEffect(() => {
        const user = localStorage.getItem('currentUser');//get current users
        if (user) {
            const userData = JSON.parse(user);//save in storage
            setCurrentUser(userData);

            const regs = eventRegistrations.filter(r => r.userId === userData.userId);
            //filter registration list
            setMyRegistrations(regs.map(r => r.eventId));//save event id

            const mems = memberships.filter(m => m.userId === userData.userId);//filter club membership
            setMyMemberships(mems.map(m => ({ clubId: m.clubId, status: m.status })));

            console.log("Dashboard loaded for:", userData.name);
        } else {
            console.log("No user found, redirecting to login");
            navigate('/');
        }
    }, [navigate]);
    const filteredClubs = clubs.filter(club =>//add filtering
    //go through each club only select 1
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
    const getMembershipStatus = (clubId) => {//return appvove, pending
        const found = myMemberships.find(m => m.clubId === clubId);
        return found ? found.status : null;
    };

    const handleJoinClub = (clubId) => {//if membership already for club, do nothing
        if (myMemberships.find(m => m.clubId === clubId)) return;
        setMyMemberships(prev => [...prev, { clubId, status: 'pending' }]);//if not, add pending
    };

    const categoryOptions = ['all', 'social', 'tech', 'music', 'sports', 'career'];

    const filteredEvents = events.filter(event => {
        const matchesSearch =//only show if both these pass
            event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const handleRegister = (eventId) => {
        if (myRegistrations.includes(eventId)) return;
        setMyRegistrations(prev => [...prev, eventId]);
    };
    return (
        <div className="dashboard-container">
            {/* navbar */}
            <div className="navbar">
                <div className="navbar-left">
                    <h2>SunDevil Connect</h2>
                </div>
                <div className="navbar-right">
                    <span>Hey, {currentUser.name.split(' ')[0]}!</span>
                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                </div>
            </div>

            <div className="dashboard-content">
                {/*welcome banner */}
                <div className="welcome-banner">
                    <h1>Welcome back, {currentUser.name.split(' ')[0]}!</h1>
                    <p>Find your people. Discover events. Get involved.</p>
                </div>

                {/*tab switcher */}
                <div className="tab-switcher">
                    <button
                        className={`tab-btn ${activeTab === 'clubs' ? 'tab-active' : ''}`}
                        onClick={() => { setActiveTab('clubs'); setSearchTerm(''); setCategoryFilter('all'); }}
                    >
                        Clubs
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'events' ? 'tab-active' : ''}`}
                        onClick={() => { setActiveTab('events'); setSearchTerm(''); setCategoryFilter('all'); }}
                    >
                        Events
                    </button>
                </div>

                {/*searcb bar*/}
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder={activeTab === 'clubs' ? 'Search clubs...' : 'Search events...'}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/*cluybs*/}
                {activeTab === 'clubs' && (
                    <div>
                        <p className="tab-subtitle">Find a club that fits you</p>
                        <div className="clubs-grid">
                            {filteredClubs.map(club => {
                                const status = getMembershipStatus(club.clubId);
                                return (
                                    <div key={club.clubId} className="club-card">
                                        <h3>{club.name}</h3>
                                        <p className="club-category">{club.category}</p>
                                        <p className="club-description">{club.description}</p>
                                        <p className="club-members">{club.members} members</p>
                                        <div style={{marginTop: '10px'}}>
                                            {status === 'approved' && (
                                                <span className="join-status-joined">You're in!</span>
                                            )}
                                            {status === 'pending' && (
                                                <span className="join-status-pending">Request pending...</span>
                                            )}
                                            {!status && (
                                                <button
                                                    className="join-btn"
                                                    onClick={() => handleJoinClub(club.clubId)}
                                                >
                                                    Join Club
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        {filteredClubs.length === 0 && (
                            <p className="no-results">No clubs found matching "{searchTerm}"</p>
                        )}
                    </div>
                )}

                {/*events tab */}
                {activeTab === 'events' && (
                    <div>
                        <p className="tab-subtitle">What's happening around campus</p>

                        {/*filters*/}
                        <div className="category-filters">
                            {categoryOptions.map(cat => (
                                <button
                                    key={cat}
                                    className={`filter-btn ${categoryFilter === cat ? 'filter-active' : ''}`}
                                    onClick={() => setCategoryFilter(cat)}
                                >
                                    {cat === 'all' ? 'All' : cat}
                                </button>
                            ))}
                        </div>

                        <div className="clubs-grid">
                            {filteredEvents.map(event => {
                                const registered = myRegistrations.includes(event.eventId);
                                return (
                                    <div key={event.eventId} className="club-card">
                                        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                            <p className="club-category">{event.category}</p>
                                            <span style={{fontSize:'12px', fontWeight:'bold', color:'#4caf50'}}>
                                                {event.cost === 0 ? 'Free' : `$${event.cost}`}
                                            </span>
                                        </div>
                                        <h3>{event.title}</h3>
                                        <p className="club-members">{event.date}</p>
                                        <p className="club-members">{event.location}</p>
                                        <p className="club-description">{event.description}</p>
                                        <p className="club-members">{event.capacity} spots available</p>
                                        <div style={{marginTop: '10px'}}>
                                            {registered ? (
                                                <span className="join-status-joined">Registered!</span>
                                            ) : (
                                                <button
                                                    className="join-btn"
                                                    onClick={() => handleRegister(event.eventId)}
                                                >
                                                    Register
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        {filteredEvents.length === 0 && (
                            <p className="no-results">No events found. Try a different filter!</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default StudentDashboard;