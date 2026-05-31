# Teaching Guide — Admin Dashboard

This is your reference for teaching the intern. Each phase builds on the previous one.
The goal is to go from "I know basic React" to "I can build and connect a full-stack app."

---

## How to Use This Guide

- **One phase per week** is a reasonable pace. Don't rush.
- Always start a session by running the app together: `npm run dev`
- Ask her to explain things back to you in her own words before moving on.
- Exercises are hands-on changes to THIS project — not toy examples.

---

## Learning Phases Overview

| Phase | Topic | Duration |
|-------|-------|----------|
| 1 | React Fundamentals Review | Week 1 |
| 2 | Context API & Custom Hooks | Week 2 |
| 3 | Redux & Global State | Week 3–4 |
| 4 | Backend: Express & REST APIs | Week 5 |
| 5 | Database: Prisma & SQLite | Week 6 |
| 6 | Authentication (JWT) | Week 7 |
| 7 | Full-Stack Thinking | Week 8 |

---

## Phase 1 — React Fundamentals Review

**Goal:** Make sure she understands how components, props, state, and effects work — using code she can see and run.

### 1.1 Components and Props

Show her `src/components/StatCard.tsx`.

Points to cover:
- A component is just a function that returns JSX
- Props are the inputs to a component (like function arguments)
- The `StatCardData` type tells TypeScript exactly what shape props must have
- Show her `src/pages/DashboardPage.tsx` line 76 — how `StatCard` is used inside a `.map()`

> **Ask her:** "What would happen if I removed the `key` prop from the map? Why does React need it?"

**Exercise:** Add a new stat card to the Dashboard for "Monthly Revenue." She needs to add a new entry to the `statsData` array with a new icon and color.

---

### 1.2 State and Re-renders

Show her `src/pages/UsersPage.tsx`.

Points to cover:
- `useState` creates a value that React tracks — when it changes, the component re-renders
- `searchQuery` and `currentPage` are local UI state: they only matter inside this component
- Show how `setSearchQuery` inside the `onChange` handler updates the search in real time

> **Ask her:** "If I define a variable with `let count = 0` instead of `useState`, why wouldn't the UI update when I change it?"

**Exercise:** Add a "clear search" X button that appears only when the input is not empty, and clears `searchQuery` when clicked.

---

### 1.3 useEffect

Show her `src/pages/UsersPage.tsx` — the two `useEffect` calls.

Points to cover:
- `useEffect` runs code **after** the component renders
- The dependency array `[status, dispatch]` controls **when** it runs — only when those values change
- The second `useEffect` resets `currentPage` to 1 every time `searchQuery` changes
- Without the dependency array it would run on every render (infinite loop risk)

> **Ask her:** "Why do we check `if (status === 'idle')` before dispatching `fetchUsers`? What would happen without that check?"

**Exercise:** Add a `useEffect` that updates the browser tab title to show how many users are loaded, e.g. `"Users (10) — Admin Panel"`.

---

### 1.4 Forms with react-hook-form

Show her `src/features/users/UserForm.tsx`.

Points to cover:
- `useForm()` manages form state so you don't need `useState` for every field
- `register` connects an input to the form
- `formState.errors` is automatically populated when validation fails
- `handleSubmit` runs validation before calling your function — if validation fails, it stops

> **Ask her:** "Why is it better to use react-hook-form instead of managing each input with `useState`?"

**Exercise:** Add a validation rule to the email field that rejects emails from `@test.com` domains. Hint: use the `validate` option inside `register`.

---

## Phase 2 — Context API & Custom Hooks

**Goal:** Understand how to share state across the component tree without prop drilling, using the Toast system as the example.

### 2.1 The Problem Context Solves

Before showing the code, explain the problem:

> "Imagine you need to show a toast from the Users page. The toast lives at the top of the app. Without Context, you'd pass a `showToast` function down as a prop through: `App → MainLayout → UsersPage`. That's called **prop drilling** and it gets messy fast."

### 2.2 How Context Works

Show her `src/context/ToastContext.tsx`. Walk through it in this order:

1. `ToastContextValue` interface — defines what the context provides
2. `createContext` — creates an empty container
3. `ToastProvider` — holds the state and provides it to children
4. `useToast` hook — the clean way to consume context from any component

Then show where it's used:
- `src/main.tsx` — `ToastProvider` wraps the whole app
- `src/pages/UsersPage.tsx` — `useToast()` returns `success` and `error` functions

> **Ask her:** "Why do we throw an error inside `useToast` if `ctx` is null? When would that happen?"

**Exercise:** Add a `warning` toast when a search returns 0 results. The `warning` function is already available from `useToast()`.

---

### 2.3 The Portal (explain, don't require mastery)

Inside `ToastContext.tsx`, find `createPortal(...)`.

- Normally React renders components where they sit in the tree
- A portal renders the output to a **different** DOM node — here, `document.body`
- This is why toasts appear on top of everything, even modals

This is conceptual only — she doesn't need to write a portal herself yet.

---

## Phase 3 — Redux & Global State

**Goal:** Understand WHY global state exists, how Redux Toolkit organizes it, and how async data (API calls) fits in.

### 3.1 Why Redux?

> "We have `useState` and Context. Why Redux?"

- Context is great for theme or auth (rarely changes, no async logic)
- When state is complex — a list fetched, created, edited, deleted — you want a **centralized, predictable** place
- Redux also gives time-travel debugging in DevTools

### 3.2 The Store

Show her `src/store/store.ts`.

Points to cover:
- `configureStore` creates the single source of truth
- The `reducer` object defines slices: `auth`, `users`, `theme`
- `RootState` and `AppDispatch` are TypeScript helpers
- Always use `useAppDispatch` and `useAppSelector` — never the raw Redux hooks

> **Ask her:** "Open Redux DevTools in Chrome. What do you see when you navigate to the Users page?"

### 3.3 A Slice

Show her `src/store/slices/usersSlice.ts`. Walk through:

**State shape:**
```typescript
interface UsersState {
  items: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
```

> **Ask her:** "Why is `status` a string union instead of a boolean `isLoading`? What's the advantage?"

**Selectors:**
```typescript
export const selectAllUsers = (state: RootState) => state.users.items;
```

Explain: components never access `state.users.items` directly — they always go through a selector. This makes refactoring easier later.

**Exercise:** Add a `selectUserCount` selector that returns the total number of users. Display it in the Dashboard's "Total Users" stat card instead of the hardcoded `'2,543'`.

---

### 3.4 Async Thunks

This is the most important concept in Phase 3. Take time here.

Show `fetchUsers` in `usersSlice.ts` and the `extraReducers` that handle its three states.

Draw this on paper:

```
dispatch(fetchUsers())
       │
       ▼
  status = 'loading'      ← pending
       │
  API call runs...
       │
  ┌────┴────┐
  ✓ success  ✗ error
  │          │
status =   status =
'succeeded' 'failed'
items set   error set
```

> **Ask her:** "When the user submits the Create User form, which thunk fires? Trace it from the button click all the way to the database."

**Exercise:** Make the "Add User" button in the Dashboard Quick Actions section open the user creation modal. Discuss with her whether to use Redux or lift state up — let her decide.

---

### 3.5 Theme Slice (Simpler Example)

Show `src/store/slices/themeSlice.ts` as a contrast — a slice with **no** async logic.

Points to cover:
- `toggleTheme` is a synchronous reducer — runs instantly
- Side effects (localStorage, document class) are allowed inside RTK reducers because of Immer
- Initial state reads from `localStorage` so the theme persists across refreshes

**Exercise:** Add a keyboard shortcut — pressing `Ctrl+D` anywhere toggles the theme. Hint: use `useEffect` in `App.tsx` with a `keydown` listener.

---

## Phase 4 — Backend: Express & REST APIs

**Goal:** Understand what a server is, how HTTP requests work, and how the Express routes in this project are structured.

### 4.1 What is a Server?

Before any code, explain the request-response cycle:

> "The browser is the client. When the frontend loads the Users page, it sends a `GET` request to `http://localhost:3001/api/users`. Express receives it, asks the database for all users, and sends back a JSON array. The frontend renders that array."

Draw it:

```
Browser              Express Server         Database
  │                       │                    │
  │── GET /api/users ────>│                    │
  │                       │── SELECT * users ─>│
  │                       │<── rows ───────────│
  │<── JSON array ────────│                    │
```

### 4.2 Entry Point

Show her `backend/src/index.ts`.

Points to cover:
- `express()` creates the app
- `app.use(cors(...))` — without this, the browser blocks the request (same-origin policy)
- `app.use(express.json())` — parses the request body into a JavaScript object
- `app.use('/api/users', userRoutes)` — delegates any `/api/users` request to the users router
- `app.listen(3001, ...)` — starts listening for incoming connections

### 4.3 Routes

Show her `backend/src/routes/users.ts`.

| Method | Path | Meaning |
|--------|------|---------|
| GET | `/` | Fetch all users |
| GET | `/:id` | Fetch one user |
| POST | `/` | Create a new user |
| PUT | `/:id` | Update a user |
| DELETE | `/:id` | Delete a user |

> **Ask her:** "In the URL `/api/users/5`, what is `5`? How does the controller read it?"

### 4.4 Controllers

Show her `backend/src/controllers/userController.ts`.

Points to cover:
- The controller is where logic lives — the route just maps the URL to a function
- `req.params` — URL segments like `:id`
- `req.body` — the data sent in POST/PUT requests
- `res.json()` — send JSON back to the client
- `res.status(201).json()` — set a status code AND send JSON
- `next(error)` — hands an error to the error handler middleware

**Exercise:** Add `GET /api/users/search?q=alice` that searches by name. Add the route in `users.ts` and the handler in `userController.ts` using `prisma.user.findMany({ where: { name: { contains: q } } })`.

### 4.5 Middleware

Show her `backend/src/middleware/errorHandler.ts`.

- Middleware is a function that runs between request and response
- Express recognizes an error handler by its **4 parameters**: `(err, req, res, next)`
- Every controller calls `next(error)` on failure → control goes to the error handler
- It must be the **last** `app.use()` call — after all routes

---

## Phase 5 — Database: Prisma & SQLite

**Goal:** Understand schema design, how Prisma bridges TypeScript and SQL, and how to query data.

### 5.1 What is a Database?

> "If you restart the Express server, all users are still there — because they're stored in a file: `backend/prisma/dev.db`. Without a database, data lives only in memory and disappears on restart."

Open Prisma Studio together first: `cd backend && npm run db:studio`

Show her the data **visually** before touching any code.

### 5.2 The Schema

Show her `backend/prisma/schema.prisma`.

Points to cover:
- `model User` defines a table called `User`
- Each line is a column: name, type, and optional attributes
- `@id @default(autoincrement())` — primary key, auto-numbered
- `@unique` — the database enforces no duplicate emails or usernames
- `?` after the type means the field is optional (nullable)
- `createdAt` / `updatedAt` are managed automatically

> **Ask her:** "What SQL command do you think `prisma.user.findMany()` generates?"

Let her guess. Then add `log: ['query']` to `new PrismaClient()` temporarily to show her the real SQL.

### 5.3 Migrations

- The schema file is the "truth" — it describes what the database **should** look like
- When you change the schema, run `npx prisma migrate dev`
- Prisma generates a SQL file in `backend/prisma/migrations/` — the actual changes applied
- Never edit migration files manually

**Exercise:** Add a `role` field to the User model:
```prisma
role  String  @default("user")
```
Run `npx prisma migrate dev --name add-user-role`. Then update `src/types/user.ts` and display the role in the Users table.

### 5.4 Seeding

Show her `backend/prisma/seed.ts`.

- Seeds fill the database with initial/test data
- `upsert` = "insert if not exists, skip if already there" — safe to run multiple times
- Run with: `npm run db:seed`

---

## Phase 6 — Authentication (JWT)

**Goal:** Understand how login works end to end, what a JWT is, and how frontend and backend stay in sync.

### 6.1 The Login Flow

Trace the full flow together, file by file:

```
1. User fills the form → LoginPage.tsx
2. dispatch(loginThunk({ username, password }))
3. authSlice.ts → api.post('/auth/login', credentials)
4. backend/src/routes/auth.ts → login controller
5. authController.ts → checks credentials against .env
6. Returns { token, user }
7. authSlice stores token in localStorage + Redux state
8. navigate('/') → ProtectedRoute sees isAuthenticated = true → shows Dashboard
```

Have her trace this herself first, then fill in any gaps.

### 6.2 What is a JWT?

Open **https://jwt.io** in the browser. Paste a real token from DevTools → Application → Local Storage.

Show the three parts:
- **Header** — algorithm used to sign it
- **Payload** — `{ id, name, email, role, exp }`
- **Signature** — proves the token hasn't been tampered with

> **Ask her:** "The payload is base64-encoded, not encrypted. Can the user decode it? Is that a security problem?"

**Answer:** Yes, anyone can decode it. But they can't **fake** a token without the `JWT_SECRET`. Never store sensitive data (passwords, card numbers) in a JWT.

### 6.3 Protected Routes

Show her `src/components/ProtectedRoute.tsx`.

- Reads `isAuthenticated` from Redux
- If false → redirects to `/login` with `<Navigate>`
- Wraps every protected route in `App.tsx`

> **Ask her:** "Could a user set `isAuthenticated = true` in Redux DevTools to bypass this? What does that tell us about where real security lives?"

**Answer:** Yes — frontend protection is UX only. Real security is on the backend. Every API route should verify the JWT. (Next exercise below.)

### 6.4 The Auth Interceptor

Show her `src/services/api.ts`.

- The request interceptor runs before **every** API call
- Reads the token from localStorage and adds it to `Authorization: Bearer <token>`
- The response interceptor catches 401 errors — clears storage and redirects to login automatically

**Exercise:** Add `authMiddleware` to `backend/src/middleware/` that reads the `Authorization` header, calls `jwt.verify()`, and returns 401 if invalid. Apply it to `userRoutes` in `index.ts`.

---

## Phase 7 — Full-Stack Thinking

**Goal:** Connect all pieces mentally and learn to debug issues that cross the frontend/backend boundary.

### 7.1 The Full Data Flow

Trace "Create a User" together:

```
UserForm submits
  → handleSubmitUser() in UsersPage.tsx
    → dispatch(addUser(data))
      → addUser thunk in usersSlice.ts
        → userService.createUser(data)
          → api.post('/api/users', data)
            → interceptor adds Authorization header
              → Express: POST /api/users
                → userRoutes → createUser controller
                  → prisma.user.create(...)
                    → SQLite writes the row
                  ← returns new User
                ← Express sends 201 JSON
              ← axios receives response
            ← userService returns User
          ← thunk resolves
        → Redux: addUser.fulfilled → items.unshift(newUser)
      → UI re-renders with new user in list
    → toastSuccess('User created successfully')
```

Have her draw this **herself** for a DELETE request.

### 7.2 Debugging Full-Stack Issues

| Symptom | Where to look |
|---------|--------------|
| Network error / CORS | DevTools → Network tab → inspect the failed request |
| 401 Unauthorized | Check `localStorage` for token; check the Authorization header |
| 500 Internal Server Error | Backend terminal — the error stack trace prints there |
| Data in backend but not in UI | Redux DevTools → check if slice state updated |
| Form submits but nothing happens | Add `console.log` to the thunk and controller — find where it stops |

### 7.3 What to Build Next

After completing all phases, she should be able to build these independently:

1. **User roles** — restrict Delete to admin only (backend middleware + frontend conditional render)
2. **PostgreSQL migration** — change `provider = "sqlite"` to `"postgresql"`, run `prisma migrate dev`
3. **Backend search** — move filtering to `GET /api/users?q=alice` (teaches query params)
4. **Backend pagination** — `GET /api/users?page=1&limit=5` with `prisma.user.findMany({ skip, take })`
5. **Password hashing** — replace plaintext credentials with `bcryptjs` hashed passwords in the DB

---

## Key Questions to Ask at the End of Each Phase

- "Can you explain what this file does in one sentence?"
- "What would break if I deleted this file?"
- "Where does the data displayed on screen come from?"
- "What happens when this function throws an error?"
- "Can you find where this concept lives in the code without me pointing?"

---

## Tips for Teaching

- **Run the app first, explain the code second.** She should see it working before understanding it.
- **Let her break things.** If she breaks something, help her debug — don't fix it for her.
- **Always ask "why", not just "how".** Knowing `useEffect` syntax is less valuable than knowing when and why to use it.
- **`console.log` is her best friend.** Teach her to trace data through the system by logging at each step.
- **One concept per session.** Don't teach Redux and async thunks on the same day.
