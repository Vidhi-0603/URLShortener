# ShortiFy - URL Shortener

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux.js.org/)

A full-stack URL shortener application with authentication, dashboard management, analytics, and responsive user experience.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Docker Setup](#docker-setup)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [License](#license)

---

## Features

- **URL shortening** with one-click creation of short links
- **Custom short URLs** for authenticated users
- **User authentication** with registration, login, and logout
- **Dashboard** for managing user-created links
- **Click analytics** for tracking URL usage
- **Copy to clipboard** for easy sharing of generated links
- **SPA routing** with support for direct short link resolution
- **Responsive design** built with Tailwind CSS

---

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Redux Toolkit
- TanStack React Query
- TanStack Router
- Lucide React Icons

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt
- nanoid

### DevOps

- Docker
- Docker Compose

---

## Architecture

This project follows a split frontend/backend architecture:

- `Frontend/` contains the React application, client-side routing, and API client.
- `Backend/` contains the Express server, authentication flows, URL creation, and redirect resolution.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Vidhi-0603/URLShortener.git
cd URLShortener
```

### 2. Install dependencies

```bash
cd Backend
npm install
```

```bash
cd ../Frontend
npm install
```

### 3. Configure environment variables

Create `.env` files for each service.

#### Backend `.env`

```env
MONGODB_URI=mongodb://localhost:27017/urlShortener
JWT_SECRET=your_jwt_secret
APP_URL=http://localhost:5000
```

#### Frontend `.env`

```env
VITE_API_URL=http://localhost:5000
VITE_FRONTEND_URL=http://localhost:5173
```

### 4. Start the backend

```bash
cd Backend
npx nodemon app.js
```

### 5. Start the frontend

```bash
cd Frontend
npm run dev
```

### 6. Open the app

Visit `http://localhost:5173`

---

## API Endpoints

### Authentication

- `POST /api/auth/register`
  - Register a new user
  - Body: `{ name, email, password }`

- `POST /api/auth/login`
  - Login using email and password
  - Body: `{ email, password }`

- `POST /api/auth/logout`
  - Logout current user

- `GET /api/auth/me`
  - Retrieve current authenticated user

### URL Management

- `POST /api/create`
  - Create a new short URL
  - Body: `{ url, customUrl? }`

- `GET /api/resolve/:id`
  - Resolve a short URL ID to the original full URL

- `POST /api/user/urls`
  - Retrieve all URLs created by the authenticated user

### Frontend Routes

- `/` — public homepage
- `/auth` — login/register page
- `/dashboard` — authenticated user dashboard
- `/:id` — short URL redirect route

---

## Environment Variables

### Backend

- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET` — secret key for signing tokens
- `APP_URL` — base URL used to build short URLs

### Frontend

- `VITE_API_URL` — backend API base URL

---

## Docker Setup (Refer to [Dockerized URLShortener](https://github.com/Vidhi-0603/URLShortenerDemo) Repository)

### Build and run with Docker Compose

```bash
docker compose up --build
```

This will start:

- MongoDB on `27017`
- Backend on `5000`
- Frontend on `3000`

### Notes

- `Frontend/Dockerfile` uses `Frontend/nginx.conf` to serve the app through Nginx.
- If you deploy without Docker, a direct Vercel or Render build is sufficient.

---

## Deployment

### Vercel

- Deploy the `Frontend/` app directly with Vite support
- Set `VITE_API_URL` to the backend URL in Vercel environment variables

### Render

- Either deploy backend and frontend separately, or use Docker if you want containerized hosting
- Ensure the backend has access to MongoDB and JWT_SECRET

---

## Project Structure

- `Backend/`
  - `app.js` — Express server entry point
  - `src/routes/` — API route definitions
  - `src/controller/` — request handlers
  - `src/services/` — business logic
  - `src/dao/` — database access
  - `src/models/` — Mongoose schemas
  - `src/config/` — environment and DB setup

- `Frontend/`
  - `src/App.jsx` — top-level app layout
  - `src/main.jsx` — router and provider setup
  - `src/pages/` — page views
  - `src/components/` — UI components
  - `src/routing/` — route definitions
  - `src/store/` — Redux store and slices
  - `src/utils/` — utilities and API client

- `docker-compose.yml` — local Docker orchestration
- `README.md` — project documentation

---

## License

MIT
