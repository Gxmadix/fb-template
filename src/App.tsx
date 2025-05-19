import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Firebase template App, with profile management.
        </p>
        <p>
          Using React and typescript.
        </p>
        <a
          className="App-link"
          href="https://console.firebase.google.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Firebase
        </a>
      </header>
    </div>
  );
}

export default App;
