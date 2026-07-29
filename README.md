# CONSYST — Industrial IoT Machine Monitoring Dashboard

A full-stack dashboard for monitoring factory floor machines (temperature, vibration, and
operating status) and acknowledging faults, built as a Full Stack Developer (Fresher) machine test.

## Tech Stack

**Backend:** Node.js, Express, MongoDB (Mongoose)
**Frontend:** React (Vite), Redux Toolkit, Tailwind CSS, react-toastify, lucide-react

## Project Structure

```
CONSYST/
├── backend/
│   ├── config/dBConnection.js       # MongoDB connection
│   ├── controllers/machineController.js
│   ├── models/machineModel.js
│   ├── router/routes.js
│   ├── data/machines.json           # seed data
│   ├── index.js                     # server entry point
│   └── .env                         # DATABASE, PORT (not committed)
└── frontend/
    ├── src/
    │   ├── components/              # MachineCard, StatusBadge, modals
    │   ├── pages/Dashboard.jsx
    │   ├── redux/                   # store.js, machinesSlice.js
    │   └── services/                # API layer (axios)
    └── vite.config.js
```

## Prerequisites

- Node.js (v18+ recommended)
- A MongoDB connection string (local MongoDB instance, or a free MongoDB Atlas cluster)

## Setup & Run — Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with:

```
DATABASE=<your-mongodb-connection-string>
PORT=3000
```

Seed the database with sample machines (run once):

```bash
# if a seed script isn't present, insert backend/data/machines.json
# into your `machines` collection via mongosh, Compass, or a one-off script
```

Start the server:

```bash
node index.js
```

The API will be running at `http://localhost:3000`.

### API Endpoints

| Method | Route | Description |
|---|---|---|
| GET | `/api/machines` | Return all machines |
| GET | `/api/machines/:id` | Return one machine, 404 if not found |
| PATCH | `/api/machines/:id/status` | Update status (`idle`/`fault`/`running`), updates `lastUpdated` |
| POST | `/api/machines` | Add a new machine (bonus) |
| DELETE | `/api/machines/:id` | Soft-delete a machine (bonus, sets `is_active: false`) |

## Setup & Run — Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be running at `http://localhost:5173` (default Vite port) and expects the backend
to be reachable at `http://localhost:3000` (configured in `src/services/serverURL.js`).

## Features

- Dashboard with color-coded machine status cards (green = running, yellow = idle, red = fault)
- Search by name and filter by status
- Machine detail modal on card click
- Acknowledge Fault action (PATCH → sets status to `idle`)
- Add Machine / Delete Machine (bonus, with confirmation modal)
- Auto-refresh polling every 60 seconds
- Toast notifications for add/acknowledge/delete actions
- Loading skeleton and error banner states

## What I'd Improve With More Time

1. Replace fixed-interval polling with WebSockets (Socket.io) for true real-time sensor updates instead of periodic refetching.
2. Add backend simulation of live sensor drift (temperature/vibration) so polling reflects genuinely changing data, not static values.
3. Add automated tests (Jest/Supertest for the API, React Testing Library for components).
4. Add centralized Express error-handling middleware instead of repeating try/catch per controller.
5. Deploy the app (backend to Render/Railway, frontend to Vercel) so it can be tested live without local setup.
   
