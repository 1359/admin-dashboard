# Setup Guide

This project has two parts that run together:
- **Frontend** — React app (port 5173)
- **Backend** — Express API + SQLite database (port 3001)

---

## Step 1 — Install Node.js (Linux)

We use **nvm** (Node Version Manager) to install Node.js. This is the recommended way on Linux.

Open your terminal and run:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Close and reopen your terminal, then verify nvm is available:

```bash
nvm --version
```

Now install the latest LTS version of Node.js:

```bash
nvm install --lts
nvm use --lts
```

Verify Node.js and npm are installed:

```bash
node --version
npm --version
```

---

## Step 2 — Install Project Dependencies

From the root of the project, install frontend dependencies:

```bash
npm install
```

Then install backend dependencies:

```bash
cd backend
npm install
```

Go back to the root:

```bash
cd ..
```

---

## Step 3 — Set Up the Database

The backend uses SQLite (a simple file-based database — no server needed).

Run this once to create the database and its tables:

```bash
cd backend
npx prisma migrate dev --name init
cd ..
```

You will see a `dev.db` file appear inside `backend/prisma/`. That is your database.

---

## Step 4 — Run the Project

From the root folder, one command starts both frontend and backend:

```bash
npm run dev
```

Open your browser at **http://localhost:5173**

The backend API is running at **http://localhost:3001/api**

---

## Useful Commands

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start frontend + backend together |
| `npm run dev:frontend` | Start only the React app |
| `npm run dev:backend` | Start only the Express server |
| `cd backend && npm run db:seed` | Fill the database with 10 sample users |
| `cd backend && npm run db:studio` | Open Prisma Studio (visual database browser) |

## Login

Open **http://localhost:5173** and sign in with:

- **Username:** `admin`
- **Password:** `admin123`

---

## Project Structure

```
admin-dashboard/
├── src/              ← React frontend code
│   ├── pages/        ← Dashboard, Users, Settings pages
│   ├── components/   ← Reusable UI components
│   ├── layouts/      ← Sidebar and Header
│   └── services/     ← API calls (axios)
└── backend/
    ├── src/
    │   ├── index.ts          ← Express app entry point
    │   ├── routes/           ← URL route definitions
    │   ├── controllers/      ← Business logic
    │   └── middleware/       ← Error handling
    └── prisma/
        ├── schema.prisma     ← Database schema (your tables)
        └── dev.db            ← SQLite database file
```
