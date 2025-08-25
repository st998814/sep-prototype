// 

import React, { useState, useEffect } from 'react';
import './App.css';
import Testing from './component/testing';
import LandingPage from './pages/landingpage';
function App() {
  const [backendStatus, setBackendStatus] = useState('checking...');
  const [backendMessage, setBackendMessage] = useState('');

  useEffect(() => {
    checkBackendConnection();
  }, []);

  const checkBackendConnection = async () => {
    try {
      // Try backend container name first (for container-to-container communication)
      let response;
      try {
        response = await fetch('http://backend:5000');
      } catch (containerError) {
        // Fallback to localhost for development
        const backendPort = process.env.REACT_APP_BACKEND_PORT || '5001';
        response = await fetch(`http://localhost:${backendPort}`);
      }
      
      const data = await response.json();
      setBackendStatus('Connected');
      setBackendMessage(data.message);
    } catch (error) {
      setBackendStatus('Connection failed');
      setBackendMessage('Unable to connect to backend service');
      console.error('Backend connection error:', error);
    }
  };
  if(1){
    return <LandingPage>11</LandingPage>
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1> SEP Prototype implementation (FR)</h1>
        <p>Docker Environment Test</p>
        <div className="status-box">
          <h2>Frontend is Running!</h2>
          <p>If you can see this page, your Docker frontend container is working correctly.</p>
          <div className="backend-status">
            <strong>Backend status: </strong>{backendStatus}
            {backendMessage && <p><em>{backendMessage}</em></p>}
          </div>
        </div>
        <div className="info-box">
          <h3>Service URLs to Test:</h3>
          <ul>
            <li><strong>Frontend:</strong> http://localhost:3000 (Current page)</li>
            <li><strong>Backend:</strong> http://localhost:5000 (Windows) / http://localhost:5001 (macOS)</li>
            <li><strong>InfluxDB:</strong> http://localhost:8086</li>
            <li><strong>Grafana:</strong> http://localhost:3001</li>
          </ul>
        </div>
        <button onClick={() => {
          checkBackendConnection();
        }} className="test-button">
          Refresh Test
        </button>
        <div className="typescript-test">
          <h3>TypeScript Component Test:</h3>
          <Testing />
        </div>
      </header>
    </div>
  );
}

export default App;
