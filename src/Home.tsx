import React from 'react';
import logo from './logo.svg';
import './App.css';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';

function Home() {
    const handleLogout = async () => {
        await signOut(auth);
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Firebase template App, with profile management.</p>
                <p>Using React and typescript.</p>
                <a
                    className="App-link"
                    href="https://console.firebase.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Firebase
                </a>
                <button onClick={handleLogout}>Logout</button>
            </header>
        </div>
    );
}

export default Home; 