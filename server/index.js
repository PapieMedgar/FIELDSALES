import nodemailer from 'nodemailer';
// Setup Nodemailer transporter (Ethereal test account)
let transporter;
nodemailer.createTestAccount().then(testAccount => {
  transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });
});
// Admin: Register new agent (with password validation and email verification)
app.post('/api/admin/add-agent', async (req, res) => {
  const { name, surname, id, email, password, confirmPassword } = req.body;
  if (!name || !surname || !id || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters' });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  users.push({ name, surname, id, email, password, role: 'agent', verified: false });
  // Send verification email
  if (transporter) {
    const verifyLink = `http://localhost:4000/api/verify-agent?email=${encodeURIComponent(email)}`;
    const info = await transporter.sendMail({
      from: 'noreply@fieldsales.com',
      to: email,
      subject: 'Verify your Agent Account',
      html: `<h3>Welcome, ${name}!</h3><p>Please verify your agent account by clicking the link below:</p><a href="${verifyLink}">${verifyLink}</a>`
    });
    // For demo: log the preview URL
    console.log('Verification email sent:', nodemailer.getTestMessageUrl(info));
  }
  res.json({ message: 'Agent registered. Verification email sent.' });
});

// Agent email verification endpoint
app.get('/api/verify-agent', (req, res) => {
  const { email } = req.query;
  const user = users.find(u => u.email === email && u.role === 'agent');
  if (!user) return res.status(400).send('Invalid verification link.');
  user.verified = true;
  res.send('Agent account verified! You may now log in.');
});

// ...existing code...

// Admin: Get all agents
app.get('/api/admin/agents', (req, res) => {
  const agents = users.filter(u => u.role === 'agent');
  res.json({ agents });
});

// Admin: Download agent's store visits as CSV
app.get('/api/admin/agent-store-visits-csv', (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ message: 'Agent email required' });
  const visits = storeVisits.filter(v => v.username === email);
  const parser = new Json2csvParser({ fields: ['username', 'storeName', 'location', 'timestamp'] });
  const csv = parser.parse(visits.map(v => ({
    ...v,
    location: v.location ? `${v.location.lat},${v.location.lng}` : ''
  })));
  res.header('Content-Type', 'text/csv');
  res.attachment('store_visits.csv');
  res.send(csv);
});

// Admin: Download agent's check events as CSV
app.get('/api/admin/agent-check-events-csv', (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ message: 'Agent email required' });
  const checks = checkEvents.filter(e => e.username === email);
  const parser = new Json2csvParser({ fields: ['username', 'action', 'location', 'timestamp'] });
  const csv = parser.parse(checks.map(e => ({
    ...e,
    location: e.location ? `${e.location.lat},${e.location.lng}` : ''
  })));
  res.header('Content-Type', 'text/csv');
  res.attachment('check_events.csv');
  res.send(csv);
});

// Admin: Download agent's ad board submissions as CSV
app.get('/api/admin/agent-adboards-csv', (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ message: 'Agent email required' });
  const boards = adBoards.filter(a => a.username === email);
  const parser = new Json2csvParser({ fields: ['username', 'numBoards', 'radius', 'position', 'timestamp'] });
  const csv = parser.parse(boards);
  res.header('Content-Type', 'text/csv');
  res.attachment('adboards.csv');
  res.send(csv);
});

// Admin: Download agent's ad feedback as CSV
app.get('/api/admin/agent-ad-feedback-csv', (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ message: 'Agent email required' });
  const feedbacks = agentAdFeedbacks.filter(f => f.username === email);
  const parser = new Json2csvParser({ fields: ['username', 'feedback', 'timestamp'] });
  const csv = parser.parse(feedbacks);
  res.header('Content-Type', 'text/csv');
  res.attachment('ad_feedback.csv');
  res.send(csv);
});

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
app.post('/api/signup', async (req, res) => {
  const { name, surname, id, email, password, confirmPassword } = req.body;
  if (!name || !surname || !id || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters' });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  users.push({ name, surname, id, email, password, role: 'client', verified: false });
  // Send verification email
  if (transporter) {
    const verifyLink = `http://localhost:4000/api/verify-client?email=${encodeURIComponent(email)}`;
    const info = await transporter.sendMail({
      from: 'noreply@fieldsales.com',
      to: email,
      subject: 'Verify your Client Account',
      html: `<h3>Welcome, ${name}!</h3><p>Please verify your client account by clicking the link below:</p><a href="${verifyLink}">${verifyLink}</a>`
    });
    // For demo: log the preview URL
    console.log('Verification email sent:', nodemailer.getTestMessageUrl(info));
  }
  res.json({ message: 'Signup successful. Verification email sent.' });
});

// Client email verification endpoint
app.get('/api/verify-client', (req, res) => {
  const { email } = req.query;
  const user = users.find(u => u.email === email && u.role === 'client');
  if (!user) return res.status(400).send('Invalid verification link.');
  user.verified = true;
  res.send('Client account verified! You may now log in.');
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
