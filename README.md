````markdown
# Access Grid Simulator

Internship Assessment Project — Innovaxel (Fall 2025)  
Simulates employee access to secure rooms based on **access level, room timings, and cooldown rules**.

## Setup

### 1. Clone Repo

```bash
git clone https://github.com/<your-username>/access-simulator.git
cd access-simulator
```
````

### 2. Backend

```bash
cd backend
npm install
node server.js
```

Runs at `http://localhost:5000`

### 3. Frontend

```bash
cd frontend
npm install
npm start
```

Runs at `http://localhost:3000`

## Usage

1. Open `http://localhost:3000`
2. View employee requests in table
3. Click **Simulate Access** → results with Granted/Denied + reason appear

## Tech Stack

- Node.js + Express (backend)
- React (frontend)
