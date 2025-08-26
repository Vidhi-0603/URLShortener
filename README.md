# URL Shortener

A full-stack URL shortener application with user authentication, custom short URLs, and analytics.

---

## Features

- **Shorten URLs**: Instantly generate short links for any long URL.
- **Custom Short URLs**: Registered users can create custom short URLs.
- **User Authentication**: Register, login, and manage your account securely.
- **Dashboard**: View and manage all your shortened URLs, including click statistics.
- **Copy to Clipboard**: Easily copy original and short URLs.
- **Analytics**: Track the number of clicks for each short URL.
- **Responsive UI**: Modern, mobile-friendly interface built with React and Tailwind CSS.

---

## Tech Stack

### Frontend

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React Icons](https://lucide.dev/)

### Backend

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT Authentication](https://jwt.io/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [nanoid](https://github.com/ai/nanoid)

---

## API Endpoints

### Auth

- `POST /api/auth/register`  
  Register a new user.  
  **Body:** `{ name, email, password }`

- `POST /api/auth/login`  
  Login with email and password.  
  **Body:** `{ email, password }`

- `POST /api/auth/logout`  
  Logout the current user.

- `GET /api/auth/me`  
  Get the current authenticated user's info.

---

### URL Shortening

- `POST /api/create`  
  Create a new short URL.  
  **Body:** `{ url, customUrl? }`  
  - If authenticated, can provide `customUrl`.

- `GET /:id`  
  Redirect to the original URL for the given short URL ID.

---

### User

- `POST /api/user/urls`  
  Get all URLs created by the authenticated user.

---

## Getting Started

1. **Clone the repository**
2. **Install dependencies**  
   - Backend: `cd Backend && npm install`
   - Frontend: `cd Frontend && npm install`
3. **Set up environment variables**  
   - Copy `.env` in `Backend/` and set your MongoDB URI, JWT secret, and app URL.
4. **Start the backend**  
   - `cd Backend && node app.js`
5. **Start the frontend**  
   - `cd Frontend && npm run dev`
6. **Visit** [http://localhost:5173](http://localhost:5173)

---

## License

MIT
