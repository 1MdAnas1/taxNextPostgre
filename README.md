# NextJS Tax App

A modern full-stack tax consultancy website built with **Next.js**, featuring a responsive user interface, secure admin authentication, dynamic content management, and Postgres based Neon database integration. The application is designed to provide a fast, SEO-friendly experience for visitors while allowing administrators to manage website content through a protected dashboard.

---

## Features

- ⚡ Built with Next.js App Router
- 📱 Fully responsive design
- 🔐 JWT-based authentication
- 👤 Protected Admin Dashboard
- 📝 Dynamic content management
- 🚀 SEO-friendly pages


---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- Node.js
- Express.js
- Typescript
- Postgres
- JWT Authentication

---

## Project Structure

```text
next-app/
│
├── app/
├── components/
├── hooks/
├── lib/
├── public/
├── styles/
├── types/
├── utils/
├── middleware.ts
├── package.json
└── README.md
```


---

# Prerequisites

Before running this project, ensure you have the following installed:

- Node.js (v18 or later recommended)
- npm
- Postgres(Neon,Supabase or Railway)

---

# Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/1MdAnas1/taxNextPostgre.git
```

```bash
cd next-app
```

---

## 2. Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create a file named:

```text
.env.local
```

in the root directory of the project.

Add the following environment variable:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Environment Variable Explanation

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Base URL of the backend API |

### Example

For local development:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

For production:

```env
NEXT_PUBLIC_API_URL=https://your-domain.com/api
```

---

# Backend Requirement

This project is the **frontend** application and requires the backend API to be running.

Backend Repository:

https://github.com/1MdAnas1/taxNextPostgre/tree/main/backend

Ensure the backend is:

- Running
- Configured with its own `.env` file
- Accessible through the `NEXT_PUBLIC_API_URL`

---

# First-Time Setup

**Important:** Before running the application for the first time, you must seed the backend database.

### Step 1: Seed the Admin

Run the following command in the **backend project**:

```bash
npx ts-node src/seed.ts
```

This populates the database with the default admin details and default website content.

> **Note**
>
> - Ensure Database is running before executing these commands.
> - Run these commands only once on a fresh database.
> - If your database already contains the seeded data, rerunning them may create duplicate entries depending on the implementation.

---

# Running the Application

Start the development server:

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

---

# Production Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

# Available Scripts

### Start Development Server

```bash
npm run dev
```

### Build Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Run ESLint

```bash
npm run lint
```

---

# Authentication

The admin dashboard is protected.

Navigate to:

```text
/admin
```

If a user is not authenticated, they will automatically be redirected to the login page.

---

# Deployment

This application can be deployed on:

- Vercel
- DigitalOcean
- Hostinger VPS
- AWS
- Any Node.js hosting provider

Configure the following environment variable during deployment:

```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
```



---


# Contributing

Contributions are welcome!

1. Fork the repository.

2. Create a new feature branch.

```bash
git checkout -b feature/your-feature
```

3. Commit your changes.

```bash
git commit -m "Add your feature"
```

4. Push your branch.

```bash
git push origin feature/your-feature
```

---

# License

This project is licensed under the MIT License.

---

# Author

**Mohd Anas Siddique**
