# Event Management System

A full-stack Event Management System built using React, Express.js, MongoDB Atlas, and JWT Authentication.

## Features

### Admin

* Login using predefined credentials
* Create new events
* View all events
* View registrations for a specific event

### Student

* Login using predefined credentials
* Browse available events
* Register for events
* View personal registrations

---

# Tech Stack

## Frontend

* React
* React Router
* CSS

## Backend

* Node.js
* Express.js
* JWT Authentication

## Database

* MongoDB Atlas
* Mongoose

---

# Project Structure

```text
.
├── app/                 # React Frontend
├── backend/             # Express Backend
├── package.json         # Root package.json
└── README.md
```

---

# Setup and Run Locally

## 1. Clone Repository

```bash
git clone <repository-url>
cd <repository-folder>
```

---

## 2. Install Dependencies

### Root

```bash
npm install
```

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd ../app
npm install
```

---

## 3. Configure Environment Variables

Create a file named:

```text
backend/.env
```

Copy the contents from `.env.example` and update the values.

Example:
```bash
PORT=3000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
```

---

## 4. Seed Database

Navigate to backend:

```bash
cd backend
```

Run:

```bash
node seed.js
```

This creates the predefined users and sample events.

---

## 5. Start Application

From the project root:

```bash
npm run dev
```

This starts:

* React Frontend
* Express Backend

---

# Default Credentials

## Admin

```text
Username: admin
Password: inspirante2026
```


---


# Environment Variables

The following variables are required:

| Variable   | Description                        |
| ---------- | ---------------------------------- |
| PORT       | 3000                |
| MONGO_URI  | mongodb+srv://thenamesparky:3Y0VxqUmkhedhIyh@cluster0.gtcsxqq.mongodb.net/?appName=Cluster0   |
| JWT_SECRET | InspiranteEventManagement2026SecretKey |

---

# Author

Sambhram Alva
