````markdown
# Access Grid Simulator

Internship Assessment Project — Innovaxel (Fall 2025)  
Simulates employee access to secure rooms based on **access level, room timings, and cooldown rules**.

## Setup

### 1. Backend

```bash
cd backend
npm install
node server.js
```

Runs at `http://localhost:3000`

### 2. Frontend

```bash
cd frontend
npm install
npm start
```

Runs at `http://localhost:5173`

## Usage

1. Open `http://localhost:5173`
2. View employee requests in table
3. Click **Simulate Access** → results with Granted/Denied + reason appear

## Tech Stack

- Node.js + Express (backend)
- React (frontend)
