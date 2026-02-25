import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function SmartCity() {
  const [currentSection, setCurrentSection] = useState('home');
  const [role, setRole] = useState('user');
  const [issues, setIssues] = useState([]);
  const [issueTitle, setIssueTitle] = useState('');
  const [issueDesc, setIssueDesc] = useState('');

  const showSection = id => setCurrentSection(id);

  const handleLogin = () => {
    if (role === 'admin') {
      setCurrentSection('admin');
    } else {
      setCurrentSection('user');
    }
  };

  const submitIssue = () => {
    if (!issueTitle || !issueDesc) {
      alert('Please fill all fields');
      return;
    }
    setIssues(prev => [...prev, { title: issueTitle, desc: issueDesc }]);
    setIssueTitle('');
    setIssueDesc('');
    alert('Issue Submitted Successfully!');
  };

  return (
    <>
      <style>{`
        body { background-color: #f8f9fa; }
        .section { display: none; }
        .active-section { display: block; }
        .navbar-brand { font-weight: bold; }
      `}</style>

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand" href="#">
            Smart City
          </a>
          <div>
            <button
              className="btn btn-light mx-1"
              onClick={() => showSection('home')}
            >
              Home
            </button>
            <button
              className="btn btn-light mx-1"
              onClick={() => showSection('services')}
            >
              Services
            </button>
            <button
              className="btn btn-light mx-1"
              onClick={() => showSection('infrastructure')}
            >
              Infrastructure
            </button>
            <button
              className="btn btn-light mx-1"
              onClick={() => showSection('amenities')}
            >
              Amenities
            </button>
            <button
              className="btn btn-warning mx-1"
              onClick={() => showSection('login')}
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        {/* HOME */}
        {currentSection === 'home' && (
          <div className="section active-section text-center">
            <h1>Smart City Management Portal</h1>
            <p className="lead">
              Manage Public Services, Infrastructure and Amenities Efficiently
            </p>

            <div className="row mt-4">
              <div className="col-md-4">
                <div className="card p-3 shadow">
                  <h4>Public Services</h4>
                  <button
                    className="btn btn-primary"
                    onClick={() => showSection('services')}
                  >
                    Explore
                  </button>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card p-3 shadow">
                  <h4>Infrastructure</h4>
                  <button
                    className="btn btn-success"
                    onClick={() => showSection('infrastructure')}
                  >
                    View
                  </button>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card p-3 shadow">
                  <h4>Amenities</h4>
                  <button
                    className="btn btn-info"
                    onClick={() => showSection('amenities')}
                  >
                    Check
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LOGIN */}
        {currentSection === 'login' && (
          <div className="section active-section">
            <h2>Login/Register</h2>
            <select
              id="role"
              className="form-control mb-3"
              value={role}
              onChange={e => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        )}

        {/* USER DASHBOARD */}
        {currentSection === 'user' && (
          <div className="section active-section">
            <h2>User Dashboard</h2>
            <div className="card p-4 shadow mt-3">
              <h4>Report Issue</h4>
              <input
                id="issueTitle"
                className="form-control mb-2"
                placeholder="Issue Title"
                value={issueTitle}
                onChange={e => setIssueTitle(e.target.value)}
              />
              <textarea
                id="issueDesc"
                className="form-control mb-2"
                placeholder="Describe Issue"
                value={issueDesc}
                onChange={e => setIssueDesc(e.target.value)}
              />
              <button className="btn btn-danger" onClick={submitIssue}>
                Submit
              </button>
            </div>
            <div id="issueList" className="mt-3">
              {issues.map((iss, idx) => (
                <div key={idx} className="card p-2 mt-2">
                  <strong>{iss.title}</strong>
                  <p>{iss.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADMIN DASHBOARD */}
        {currentSection === 'admin' && (
          <div className="section active-section">
            <h2>Admin Dashboard</h2>
            <div className="row mt-4">
              <div className="col-md-4">
                <div className="card p-3 shadow text-center">
                  <h5>Total Services</h5>
                  <h3>3</h3>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-3 shadow text-center">
                  <h5>Reported Issues</h5>
                  <h3 id="adminIssueCount">{issues.length}</h3>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-3 shadow text-center">
                  <h5>Total Users</h5>
                  <h3>1</h3>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SERVICES */}
        {currentSection === 'services' && (
          <div className="section active-section">
            <h2>Public Services</h2>
            <ul className="list-group mt-3">
              <li className="list-group-item">Water Supply</li>
              <li className="list-group-item">Electricity</li>
              <li className="list-group-item">Public Transport</li>
            </ul>
          </div>
        )}

        {/* INFRASTRUCTURE */}
        {currentSection === 'infrastructure' && (
          <div className="section active-section">
            <h2>Infrastructure</h2>
            <ul className="list-group mt-3">
              <li className="list-group-item">Road Networks</li>
              <li className="list-group-item">Bridges</li>
              <li className="list-group-item">Metro Rail</li>
            </ul>
          </div>
        )}

        {/* AMENITIES */}
        {currentSection === 'amenities' && (
          <div className="section active-section">
            <h2>Amenities</h2>
            <ul className="list-group mt-3">
              <li className="list-group-item">Parks</li>
              <li className="list-group-item">Hospitals</li>
              <li className="list-group-item">Schools</li>
            </ul>
          </div>
        )}
      </div>

      <footer className="bg-dark text-white text-center p-3 mt-5">
        © 2026 Smart City Management System
      </footer>
    </>
  );
}

export default SmartCity;
