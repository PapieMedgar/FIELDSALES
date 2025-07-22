import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAgentReports = () => {
  const [agents, setAgents] = useState([]);
  const [selected, setSelected] = useState('');
  const [visits, setVisits] = useState([]);
  const [checks, setChecks] = useState([]);
  const [adBoards, setAdBoards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all agents
    fetch('http://localhost:4000/api/admin/agents')
      .then(res => res.json())
      .then(data => setAgents(data.agents || []));
  }, []);

  const [adFeedback, setAdFeedback] = useState([]);
  const fetchReports = async (email) => {
    setSelected(email);
    // Fetch store visits
    const v = await fetch(`http://localhost:4000/api/admin/agent-store-visits?email=${email}`).then(r => r.json());
    setVisits(v.visits || []);
    // Fetch check events
    const c = await fetch(`http://localhost:4000/api/admin/agent-check-events?email=${email}`).then(r => r.json());
    setChecks(c.events || []);
    // Fetch ad boards
    const a = await fetch(`http://localhost:4000/api/admin/agent-adboards?email=${email}`).then(r => r.json());
    setAdBoards(a.adBoards || []);
    // Fetch ad feedback
    const f = await fetch(`http://localhost:4000/api/admin/agent-ad-feedback?email=${email}`).then(r => r.json());
    setAdFeedback(f.feedbacks || []);
  };

  return (
    <div className="container">
      <h2>Agent Activity Reports</h2>
      <label>Select Agent:
        <select value={selected} onChange={e => fetchReports(e.target.value)}>
          <option value="">-- Select Agent --</option>
          {agents.map(a => (
            <option key={a.email} value={a.email}>{a.name} {a.surname} ({a.email})</option>
          ))}
        </select>
      </label>
      {selected && (
        <>
          <h3>Store Visits ({visits.length})
            <a
              href={`http://localhost:4000/api/admin/agent-store-visits-csv?email=${selected}`}
              style={{ marginLeft: 16, fontSize: '0.9em' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download CSV
            </a>
          </h3>
          <ul>
            {visits.map((v, i) => (
              <li key={i}>{v.storeName} @ ({v.location.lat}, {v.location.lng}) {new Date(v.timestamp).toLocaleString()}</li>
            ))}
          </ul>
          <h3>Check In/Out Events ({checks.length})
            <a
              href={`http://localhost:4000/api/admin/agent-check-events-csv?email=${selected}`}
              style={{ marginLeft: 16, fontSize: '0.9em' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download CSV
            </a>
          </h3>
          <ul>
            {checks.map((c, i) => (
              <li key={i}>{c.action} @ ({c.location.lat}, {c.location.lng}) {new Date(c.timestamp).toLocaleString()}</li>
            ))}
          </ul>
          <h3>Ad Board Submissions ({adBoards.length})
            <a
              href={`http://localhost:4000/api/admin/agent-adboards-csv?email=${selected}`}
              style={{ marginLeft: 16, fontSize: '0.9em' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download CSV
            </a>
          </h3>
          <ul>
            {adBoards.map((a, i) => (
              <li key={i}>Radius: {a.radius}, Boards: {a.numBoards}, Position: {a.position}, {new Date(a.timestamp).toLocaleString()}</li>
            ))}
          </ul>
          <h3>Ad Feedback ({adFeedback.length})
            <a
              href={`http://localhost:4000/api/admin/agent-ad-feedback-csv?email=${selected}`}
              style={{ marginLeft: 16, fontSize: '0.9em' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download CSV
            </a>
          </h3>
          <ul>
            {adFeedback.map((f, i) => (
              <li key={i}>{f.feedback} ({new Date(f.timestamp).toLocaleString()})</li>
            ))}
          </ul>
        </>
      )}
      <button style={{marginTop:24}} onClick={() => navigate('/admin-dashboard')}>Back to Dashboard</button>
    </div>
  );
};

export default AdminAgentReports;
