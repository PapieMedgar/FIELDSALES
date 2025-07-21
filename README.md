
# React + Vite

This project was bootstrapped with [Vite](https://vitejs.dev/) and uses React for building the UI.

## Getting Started

### 1. Install dependencies (Frontend & Backend)
Open two terminals and run the following in each:

**Frontend:**
```
npm install
```

**Backend:**
```
cd server
npm install
```

### 2. Start the servers

**Frontend (React + Vite):**
```
npm run dev
```
The app will be available at the URL shown in your terminal (usually http://localhost:5173).

**Backend (Node.js/Express):**
```
cd server
npm start
```
The backend will run on http://localhost:4000.


### 3. Usage
- Register a new user or use default credentials (see below).
- After login, you will be redirected to your dashboard based on your role:
  - **Admin:** `/admin-dashboard` (manage agents, view all visits, reports, etc.)
  - **Agent:** `/agent-dashboard` (store visits, check in/out, ad boards, feedback)
  - **Client:** `/client-dashboard` (submit FICA, feedback, SIM card feedback)

#### Default Users (if not registered):
- **Agent:** agent@example.com / agent123
- **Admin:** admin@example.com / admin123
- **Client:** client@example.com / client123

#### Client Registration & Email
- When a client registers, their login details will be sent to their email (if email sending is configured in the backend).

> **Note:**
> This web app is designed to be migrated to a mobile app in the future. The codebase and API structure are being maintained with cross-platform compatibility in mind.

## Project Structure
- `src/` - Main source code (React components, styles, etc.)
- `public/` - Static assets

## Customization
Feel free to modify the project structure and configuration to fit your needs.

## Learn More
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
