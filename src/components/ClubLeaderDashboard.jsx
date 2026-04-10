import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import { clubs, events, memberships, announcements } from '../data/mockData';

function ClubLeaderDashboard() {
    const [activeTab, setActiveTab] = useState('events');
    const [myClub, setMyClub] = useState(null);
    const [myEvents, setMyEvents] = useState([]);
    const [myMembers, setMyMembers] = useState([]);
    const [myAnnouncements, setMyAnnouncements] = useState([]);

    const [eventTitle, setEventTitle] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventCategory, setEventCategory] = useState('social');
    const [eventDescription, setEventDescription] = useState('');

    const [announcementTitle, setAnnouncementTitle] = useState('');
    const [announcementContent, setAnnouncementContent] = useState('');
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        const user = localStorage.getItem('currentUser');
        if (user) {
            const userData = JSON.parse(user);
            setCurrentUser(userData);
            console.log("Club leader dashboard", userData.name);
            //find the club this leader manages
            const leaderClub = clubs.find(c => c.leaderId === userData.userId);
            setMyClub(leaderClub);
            if (leaderClub) {
                //get events for this club
                const clubEvents = events.filter(e => e.clubId === leaderClub.clubId);
                setMyEvents(clubEvents);
                //get pending membership requests for this club
                const pendingMembers = memberships.filter(
                    m => m.clubId === leaderClub.clubId && m.status === 'pending'
                );
                setMyMembers(pendingMembers);
                //get announcements for this club
                const clubAnnouncements = announcements.filter(
                    a => a.clubId === leaderClub.clubId
                );
                setMyAnnouncements(clubAnnouncements);
            }
        } else {
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
    const handleCreateEvent = () => {
        // make sure all fields are filled
        if (!eventTitle || !eventDate || !eventLocation || !eventDescription) {
            alert('Please fill out all fields!');
            return;
        }
        // build the new event object
        const newEvent = {
            eventId: String(myEvents.length + 10),
            clubId: myClub.clubId,
            title: eventTitle,
            date: eventDate,
            location: eventLocation,
            category: eventCategory,
            description: eventDescription,
            cost: 0,
            capacity: 30
        };
        setMyEvents(prev => [...prev, newEvent]);
        // clear the form
        setEventTitle('');
        setEventDate('');
        setEventLocation('');
        setEventCategory('social');
        setEventDescription('');
        console.log("New event created:", newEvent.title);
    };

    const handleApproveMember = (membershipId) => {
        // change status to approved and remove from pending list
        setMyMembers(prev => prev.filter(m => m.membershipId !== membershipId));
        console.log("Approved member:", membershipId);
    };

    const handleDenyMember = (membershipId) => {
        // remove from pending list
        setMyMembers(prev => prev.filter(m => m.membershipId !== membershipId));
        console.log("Denied member:", membershipId);
    };

    const handlePostAnnouncement = () => {
        if (!announcementTitle || !announcementContent) {
            alert('Please fill out both fields!');
            return;
        }
        // observer pattern - posting notifies all club members
        const newAnnouncement = {
            announcementId: String(myAnnouncements.length + 10),
            clubId: myClub.clubId,
            title: announcementTitle,
            content: announcementContent,
            date: new Date().toISOString().split('T')[0]
        };
        setMyAnnouncements(prev => [...prev, newAnnouncement]);
        setAnnouncementTitle('');
        setAnnouncementContent('');
        console.log("Announcement posted:", newAnnouncement.title);
    };
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

                {/* club info banner */}
                <div className="welcome-banner">
                    <h1>{myClub ? myClub.name : 'Your Club'}</h1>
                    <p>Manage your events, members, and announcements</p>
                </div>

                {/* tab switcher */}
                <div className="tab-switcher">
                    <button
                        className={`tab-btn ${activeTab === 'events' ? 'tab-active' : ''}`}
                        onClick={() => setActiveTab('events')}
                    >
                        Events
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'members' ? 'tab-active' : ''}`}
                        onClick={() => setActiveTab('members')}
                    >
                        Members {myMembers.length > 0 && `(${myMembers.length} pending)`}
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'announcements' ? 'tab-active' : ''}`}
                        onClick={() => setActiveTab('announcements')}
                    >
                        Announcements
                    </button>
                </div>

                {/*events*/}
                {activeTab === 'events' && (
                    <div>
                        <h2 style={{marginBottom: '16px'}}>Create a New Event</h2>
                        <div className="leader-form">
                            <input
                                type="text"
                                placeholder="Event title"
                                value={eventTitle}
                                onChange={(e) => setEventTitle(e.target.value)}
                                className="form-input"
                            />
                            <input
                                type="date"
                                value={eventDate}
                                onChange={(e) => setEventDate(e.target.value)}
                                className="form-input"
                            />
                            <input
                                type="text"
                                placeholder="Location"
                                value={eventLocation}
                                onChange={(e) => setEventLocation(e.target.value)}
                                className="form-input"
                            />
                            <select
                                value={eventCategory}
                                onChange={(e) => setEventCategory(e.target.value)}
                                className="form-input"
                            >
                                <option value="social">Social</option>
                                <option value="tech">Tech</option>
                                <option value="music">Music</option>
                                <option value="sports">Sports</option>
                                <option value="career">Career</option>
                            </select>
                            <textarea
                                placeholder="Event description"
                                value={eventDescription}
                                onChange={(e) => setEventDescription(e.target.value)}
                                className="form-input"
                                rows="3"
                            />
                            <button className="join-btn" onClick={handleCreateEvent}>
                                Create Event
                            </button>
                        </div>

                        <h2 style={{margin: '28px 0 16px'}}>Your Events</h2>
                        {myEvents.length === 0 && <p className="tab-subtitle">No events yet. Create one above!</p>}
                        <div className="clubs-grid">
                            {myEvents.map(event => (
                                <div key={event.eventId} className="club-card">
                                    <p className="club-category">{event.category}</p>
                                    <h3>{event.title}</h3>
                                    <p className="club-members">{event.date}</p>
                                    <p className="club-members">{event.location}</p>
                                    <p className="club-description">{event.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/*members*/}
                {activeTab === 'members' && (
                    <div>
                        <h2 style={{marginBottom: '16px'}}>Pending Requests</h2>
                        {myMembers.length === 0 && (
                            <p className="tab-subtitle">No pending requests right now.</p>
                        )}
                        {myMembers.map(member => (
                            <div key={member.membershipId} className="member-row">
                                <span className="member-name">User: {member.userId}</span>
                                <div style={{display: 'flex', gap: '10px'}}>
                                    <button
                                        className="join-btn"
                                        onClick={() => handleApproveMember(member.membershipId)}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="deny-btn"
                                        onClick={() => handleDenyMember(member.membershipId)}
                                    >
                                        Deny
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/*annouicement*/}
                {activeTab === 'announcements' && (
                    <div>
                        <h2 style={{marginBottom: '16px'}}>Post an Announcement</h2>
                        <div className="leader-form">
                            <input
                                type="text"
                                placeholder="Announcement title"
                                value={announcementTitle}
                                onChange={(e) => setAnnouncementTitle(e.target.value)}
                                className="form-input"
                            />
                            <textarea
                                placeholder="What do you want to tell your members?"
                                value={announcementContent}
                                onChange={(e) => setAnnouncementContent(e.target.value)}
                                className="form-input"
                                rows="4"
                            />
                            <button className="join-btn" onClick={handlePostAnnouncement}>
                                Post Announcement
                            </button>
                        </div>

                        <h2 style={{margin: '28px 0 16px'}}>Past Announcements</h2>
                        {myAnnouncements.length === 0 && (
                            <p className="tab-subtitle">No announcements posted yet.</p>
                        )}
                        {myAnnouncements.map(a => (
                            <div key={a.announcementId} className="announcement-card">
                                <div style={{display:'flex', justifyContent:'space-between'}}>
                                    <h3>{a.title}</h3>
                                    <span className="club-members">{a.date}</span>
                                </div>
                                <p className="club-description">{a.content}</p>
                            </div>
                        ))}
                    </div>
                )}

            </div> {/*closes dashboard-content */}
        </div>
    );
}
export default ClubLeaderDashboard;