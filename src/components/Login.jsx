import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {users} from '../data/mockData';
import '../styles/Login.css';

function Login(){//lgoin function
    //create states for id/pass
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();//go to other pages]
    const [error, setError] = useState('');
    const handleLogin = (e) => {
        e.preventDefault();//dont refresh
        console.log("Login -> ", userId);
        setError('');
        let foundUser = null;//we need to check if users are matching
        for (let i = 0; i < users.length; i++) {
            if (users[i].userId === userId && users[i].password === password) {
                foundUser = users[i];
                break;//foudn user
            }
        }
        if (foundUser) {
            console.log("Logged in ", foundUser.name);
            localStorage.setItem('currentUser', JSON.stringify(foundUser));
            if (foundUser.role === 'student') {
                console.log("Loading student dashboard");
                navigate('/dashboard');
            } else if (foundUser.role === 'clubleader') {
                console.log("Loading Club Leader dashboard");
                navigate('/leader-dashboard');
            } else if (foundUser.role === 'admin') {
                console.log("Loading Admin dashboard");
                navigate('/admin-dashboard');
            }
        } else {
            //login failed
            console.log("Login failed");
            setError('Try again');
        }
    }
    return(
        <div className="login-container">
            <div className="login-box">
                <div className="login-header">
                    <h1>Sundevil Connect App</h1>
                    <p>ASU clubs and events</p>
                </div>
                {/*start login section*/}
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>User ID:</label>
                        <input
                            type="text"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            placeholder="Enter your user ID"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}
                    <button type="submit" className="login-button">
                        Log In
                    </button>
                </form>
                <div className="demo-info">
                    <p><strong>Test Accounts:</strong></p>
                    <p>Student: cjkenn13 / pass123</p>
                    <p>Club Leader: mei17 / pass123</p>
                    <p>Admin: rhonnie37 / pass123</p>
                </div>
            </div>
        </div>
    );
}
export default Login;