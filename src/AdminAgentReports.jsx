import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAgentReports = () => {
  const [agents, setAgents] = useState([]);
  const [selected, setSelected] = useState('');
  const [visits, setVisits] = useState([]);
  const [checks, setChecks] = useState([]);
  const [adBoards, setAdBoards] = useState([]);
  const [adFeedback, setAdFeedback] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:4000/api/admin/agents')
      .then(res => res.json())
      .then(data => setAgents(data.agents || []));
  }, []);

  const fetchReports = async (email) => {
    setSelected(email);
    if (!email) {
      setVisits([]);
      setChecks([]);
      setAdBoards([]);
      setAdFeedback([]);
      return;
    }
    const [v, c, a, f] = await Promise.all([
      fetch(`http://localhost:4000/api/admin/agent-store-visits?email=${email}`).then(r => r.json()),
      fetch(`http://localhost:4000/api/admin/agent-check-events?email=${email}`).then(r => r.json()),
      fetch(`http://localhost:4000/api/admin/agent-adboards?email=${email}`).then(r => r.json()),
      fetch(`http://localhost:4000/api/admin/agent-ad-feedback?email=${email}`).then(r => r.json()),
    ]);
    setVisits(v.visits || []);
    setChecks(c.events || []);
    setAdBoards(a.adBoards || []);
    setAdFeedback(f.feedbacks || []);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Agent Activity Reports</h2>
      <label style={styles.label}>
        Select Agent:
        <select
          value={selected}
          onChange={e => fetchReports(e.target.value)}
          style={styles.select}
        >
          <option value="">-- Select Agent --</option>
          {agents.map(a => (
            <option key={a.email} value={a.email}>
              {a.name} {a.surname} ({a.email})
            </option>
          ))}
        </select>
      </label>

      {selected && (
        <>
          <ReportSection
            title={`Store Visits (${visits.length})`}
            csvUrl={`http://localhost:4000/api/admin/agent-store-visits-csv?email=${selected}`}
            items={visits}
            renderItem={(v, i) => (
              <li key={i}>
                {v.storeName} @ ({v.location.lat}, {v.location.lng}){' '}
                {new Date(v.timestamp).toLocaleString()}
              </li>
            )}
          />

          <ReportSection
            title={`Check In/Out Events (${checks.length})`}
            csvUrl={`http://localhost:4000/api/admin/agent-check-events-csv?email=${selected}`}
            items={checks}
            renderItem={(c, i) => (
              <li key={i}>
                {c.action} @ ({c.location.lat}, {c.location.lng}){' '}
                {new Date(c.timestamp).toLocaleString()}
              </li>
            )}
          />

          <ReportSection
            title={`Ad Board Submissions (${adBoards.length})`}
            csvUrl={`http://localhost:4000/api/admin/agent-adboards-csv?email=${selected}`}
            items={adBoards}
            renderItem={(a, i) => (
              <li key={i}>
                Radius: {a.radius}, Boards: {a.numBoards}, Position: {a.position},{' '}
                {new Date(a.timestamp).toLocaleString()}
              </li>
            )}
          />

          <ReportSection
            title={`Ad Feedback (${adFeedback.length})`}
            csvUrl={`http://localhost:4000/api/admin/agent-ad-feedback-csv?email=${selected}`}
            items={adFeedback}
            renderItem={(f, i) => (
              <li key={i}>
                {f.feedback} ({new Date(f.timestamp).toLocaleString()})
              </li>
            )}
          />
        </>
      )}

      <button onClick={() => navigate('/admin-dashboard')} style={styles.backBtn}>
        Back to Dashboard
      </button>
    </div>
  );
};

const ReportSection = ({ title, csvUrl, items, renderItem }) => (
  <section style={styles.section}>
    <h3 style={styles.sectionTitle}>
      {title}
      <a
        href={csvUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={styles.csvLink}
        title="Download CSV"
      >
        Download CSV
      </a>
    </h3>
    <ul style={styles.list}>{items.length ? items.map(renderItem) : <li>No data available</li>}</ul>
  </section>
);

const styles = {
  container: {
    maxWidth: 960,
    margin: '2rem auto',
    padding: '1rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#fff',
    borderRadius: 12,
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#4f8cff',
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '1.5rem',
    fontWeight: '600',
    fontSize: '1.1rem',
    color: '#333',
  },
  select: {
    marginLeft: '1rem',
    padding: '8px 12px',
    fontSize: '1rem',
    borderRadius: 8,
    border: '1px solid #ccc',
    minWidth: 240,
    maxWidth: '100%',
  },
  section: {
    marginBottom: '2rem',
  },
  sectionTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '1.25rem',
    marginBottom: '0.75rem',
    color: '#222',
  },
  csvLink: {
    fontSize: '0.875rem',
    color: '#4f8cff',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  },
  list: {
    listStyleType: 'disc',
    paddingLeft: '1.25rem',
    maxHeight: 300,
    overflowY: 'auto',
  },
  backBtn: {
    display: 'block',
    margin: '1rem auto 0',
    padding: '10px 24px',
    backgroundColor: '#ddd',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    maxWidth: 200,
    fontWeight: '600',
  },

  // Responsive styles using media query in JS (can be replaced with CSS)
  '@media (max-width: 600px)': {
    container: {
      margin: '1rem',
      padding: '0.5rem',
    },
    select: {
      marginLeft: 0,
      width: '100%',
      marginTop: '0.5rem',
    },
    sectionTitle: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 8,
    },
    list: {
      maxHeight: 200,
    },
  },
};

export default AdminAgentReports;
