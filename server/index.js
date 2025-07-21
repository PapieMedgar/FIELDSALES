
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import { Parser as Json2csvParser } from 'json2csv';






const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

// In-memory user store
const users = [
  {
    name: 'Client',
    surname: 'User',
    id: 'client001',
    email: 'client@example.com',
    password: 'client123',
    role: 'client'
  },
  {
    name: 'Admin',
    surname: 'User',
    id: 'admin001',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    name: 'Agent',
    surname: 'User',
    id: 'agent001',
    email: 'agent@example.com',
    password: 'agent123',
    role: 'agent'
  }
];
// In-memory store visits, check-in/out, and ad boards
const storeVisits = [];
const checkEvents = [];
const adBoards = [];

// Admin: Get all check-in/out events (optionally filter by date)
app.get('/api/admin/check-events', (req, res) => {
  const { date } = req.query;
  let filtered = checkEvents;
  if (date) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    filtered = checkEvents.filter(v => v.timestamp >= start.getTime() && v.timestamp < end.getTime());
  }
  res.json({ events: filtered });
});
// Multer setup for image upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

const clientFeedbacks = [];
const agentAdFeedbacks = [];

// Client feedback and FICA upload
app.post('/api/client-feedback', upload.single('fica'), (req, res) => {
  const { username, feedback } = req.body;
  if (!username || !feedback || !req.file) {
    return res.status(400).json({ message: 'All fields and FICA document are required' });
  }
  clientFeedbacks.push({
    username,
    feedback,
    fica: req.file.buffer,
    ficaType: req.file.mimetype,
    timestamp: Date.now()
  });
  res.json({ message: 'Feedback and FICA uploaded!' });
});

// Agent advertisement feedback

// SIM card feedback store
const simCardFeedbacks = [];

// Client submits SIM card feedback for an agent
app.post('/api/simcard-feedback', (req, res) => {
  const { agentEmail, clientEmail, feedback, simCardDetails } = req.body;
  if (!agentEmail || !clientEmail || !feedback) {
    return res.status(400).json({ message: 'Agent, client, and feedback are required' });
  }
  simCardFeedbacks.push({
    agentEmail,
    clientEmail,
    feedback,
    simCardDetails: simCardDetails || '',
    timestamp: Date.now()
  });
  res.json({ message: 'SIM card feedback submitted!' });
});

// Agent retrieves SIM card feedback addressed to them
app.get('/api/agent/simcard-feedback', (req, res) => {
  const { agentEmail } = req.query;
  if (!agentEmail) {
    return res.status(400).json({ message: 'Agent email required' });
  }
  const feedbacks = simCardFeedbacks.filter(fb => fb.agentEmail === agentEmail);
  res.json({ feedbacks });
});

app.post('/api/agent-ad-feedback', (req, res) => {
  const { username, feedback } = req.body;
  if (!username || !feedback) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  agentAdFeedbacks.push({ username, feedback, timestamp: Date.now() });
  res.json({ message: 'Feedback submitted!' });
});

// Ad board submission endpoint
app.post('/api/adboards', upload.single('image'), (req, res) => {
  const { username, numBoards, radius, position } = req.body;
  if (!username || !numBoards || !radius || !position || !req.file) {
    return res.status(400).json({ message: 'All fields and image are required' });
  }
  adBoards.push({
    username,
    numBoards,
    radius,
    position,
    image: req.file.buffer,
    imageType: req.file.mimetype,
    timestamp: Date.now()
  });
  res.json({ message: 'Ad board info submitted!' });
});

// Admin: Get all store visits (optionally filter by date)
app.get('/api/admin/store-visits', (req, res) => {
  const { date } = req.query;
  let filtered = storeVisits;
  if (date) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    filtered = storeVisits.filter(v => v.timestamp >= start.getTime() && v.timestamp < end.getTime());
  }
  res.json({ visits: filtered });
});

// Get today's store visits for a user
app.get('/api/store-visits', (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ message: 'Username required' });
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const visits = storeVisits.filter(v => v.username === username && v.timestamp >= startOfDay.getTime());
  res.json({ visits });
});

// Store visit endpoint
app.post('/api/store-visit', (req, res) => {
  const { username, storeName, location } = req.body;
  if (!username || !storeName || !location) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  storeVisits.push({ username, storeName, location, timestamp: Date.now() });
  res.json({ message: 'Store visit recorded' });
});

// Check-in/out endpoint
app.post('/api/check', (req, res) => {
  const { username, action, location } = req.body;
  if (!username || !action || !location) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  checkEvents.push({ username, action, location, timestamp: Date.now() });
  res.json({ message: `${action === 'checkin' ? 'Checked in' : 'Checked out'} recorded` });
});


// Sign up endpoint
// Only allow clients to sign up
app.post('/api/signup', (req, res) => {
  const { name, surname, id, email, password } = req.body;
  if (!name || !surname || !id || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  users.push({ name, surname, id, email, password, role: 'client' });
  res.json({ message: 'Signup successful' });
});


// Login endpoint (use email as username)
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.email === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  res.json({
    message: 'Login successful',
    user: {
      username: user.email,
      name: user.name,
      surname: user.surname,
      id: user.id,
      role: user.role || 'agent'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
