import React, { useState, useEffect } from 'react';
import './App.css';
import Testing from './component/testing';

function App() {
  const [backendStatus, setBackendStatus] = useState('checking...');
  const [backendMessage, setBackendMessage] = useState('');

  useEffect(() => {
    checkBackendConnection();
  }, []);

  const checkBackendConnection = async () => {
    try {
      const response = await fetch('http://localhost:5001');
      const data = await response.json();
      setBackendStatus('connected');
      setBackendMessage(data.message);
    } catch (error) {
      setBackendStatus('❌ Connection failed');
      setBackendMessage('Unable to connect to backend service');
    }
  };

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
          <h3>🔗 Service URLs to Test:</h3>
          <ul>
            <li><strong>Frontend:</strong> http://localhost:3000 (Current page)</li>
            <li><strong>Backend:</strong> http://localhost:5001</li>
            <li><strong>InfluxDB:</strong> http://localhost:8086</li>
            <li><strong>Grafana:</strong> http://localhost:3001</li>
          </ul>
        </div>
        <button onClick={() => {
          checkBackendConnection();
          window.location.reload();
        }} className="test-button">
          🔄 Refresh Test
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
