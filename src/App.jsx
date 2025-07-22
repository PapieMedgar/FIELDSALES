import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import AdminAgentReports from './AdminAgentReports';
import LandingPage from './LandingPage';
import Login from './Login';
import SignUp from './SignUp';
import PinStore from './PinStore';
import CheckInOut from './CheckInOut';
import StoreVisits from './StoreVisits';
import AdminStoreVisits from './AdminStoreVisits';
import AdminCheckEvents from './AdminCheckEvents';
import AdminAddAgent from './AdminAddAgent';
import AdminDashboard from './AdminDashboard';
import Dashboard from './Dashboard';
import AgentDashboard from './AgentDashboard';
import AdBoards from './AdBoards';
import ClientDashboard from './ClientDashboard';
import ClientFeedback from './ClientFeedback';
import AgentAdFeedback from './AgentAdFeedback';
import SimCardFeedback from './SimCardFeedback';
import AgentSimCardFeedback from './AgentSimCardFeedback';

import './App.css';

function App() {
  const [user, setUser] = React.useState(localStorage.getItem('username'));
  const [role, setRole] = React.useState(localStorage.getItem('role'));
  const [name, setName] = React.useState(localStorage.getItem('name'));
  const [surname, setSurname] = React.useState(localStorage.getItem('surname'));

  React.useEffect(() => {
    const onStorage = () => {
      setUser(localStorage.getItem('username'));
      setRole(localStorage.getItem('role'));
      setName(localStorage.getItem('name'));
      setSurname(localStorage.getItem('surname'));
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    localStorage.removeItem('surname');
    setUser(null);
    setRole(null);
    setName(null);
    setSurname(null);
  };

  return (
    <Router>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc', marginBottom: '0' }}>
        <Link to="/" style={{ marginRight: 12 }}>Home</Link>
        {!user && <Link to="/login" style={{ marginRight: 12 }}>Login</Link>}
        {!user && <Link to="/signup" style={{ marginRight: 12 }}>Sign Up</Link>}
        {role === 'admin' && <>
          <Link to="/admin-dashboard" style={{ marginRight: 12 }}>Admin Dashboard</Link>
          <Link to="/admin/storevisits" style={{ marginRight: 12 }}>All Store Visits</Link>
          <Link to="/admin/checkevents" style={{ marginRight: 12 }}>All Check In/Out</Link>
          <Link to="/admin/add-agent" style={{ marginRight: 12 }}>Register Agent</Link>
          <Link to="/admin/agent-reports" style={{ marginRight: 12 }}>Agent Reports</Link>
        </>}
        {role === 'client' && <>
          <Link to="/client-dashboard" style={{ marginRight: 12 }}>Client Dashboard</Link>
          <Link to="/simcard-feedback" style={{ marginRight: 12 }}>SIM Card Feedback</Link>
        </>}
        {user && (!role || role === 'agent') && <>
          <Link to="/agent-dashboard" style={{ marginRight: 12 }}>Agent Dashboard</Link>
          <Link to="/dashboard" style={{ marginRight: 12 }}>My Store Visits</Link>
          <Link to="/agent-simcard-feedback" style={{ marginRight: 12 }}>SIM Card Feedback</Link>
        </>}
        {user && <button onClick={handleLogout} style={{ marginLeft: 12 }}>Logout</button>}
        {user && (
          <span style={{ marginLeft: 12 }}>
            Logged in as: <b>{role ? role.charAt(0).toUpperCase() + role.slice(1) : 'User'}</b>
            {name && (
              <span> ({name}{surname ? ' ' + surname : ''})</span>
            )}
          </span>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/storevisits" element={<AdminStoreVisits />} />
        <Route path="/admin/checkevents" element={<AdminCheckEvents />} />
        <Route path="/admin/add-agent" element={<AdminAddAgent />} />
        <Route path="/admin/agent-reports" element={<React.Suspense fallback={null}><AdminAgentReports /></React.Suspense>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/agent-dashboard" element={<AgentDashboard />} />
        <Route path="/adboards" element={<AdBoards />} />
        <Route path="/agent-ad-feedback" element={<AgentAdFeedback />} />
        <Route path="/storevisits" element={<StoreVisits />} />
        <Route path="/pinstore" element={<PinStore />} />
        <Route path="/check" element={<CheckInOut />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/client-feedback" element={<ClientFeedback />} />
        <Route path="/simcard-feedback" element={<SimCardFeedback />} />
        <Route path="/agent-simcard-feedback" element={<AgentSimCardFeedback />} />
      </Routes>
    </Router>
  );
}

export default App;
