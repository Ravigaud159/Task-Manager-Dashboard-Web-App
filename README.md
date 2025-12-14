# Task-Manager-Dashboard-Web-App
Frontend Developer Intern Assignment  A Scalable Web Application built with React.js, TailwindCSS, and Node.js/Express. This project demonstrates a full-stack CRUD application with authentication, user dashboard, search &amp; filter, and JWT-based security.

# Project Overview

This project is a sample dashboard web application where users can register, login, and manage tasks. It includes both a frontend and a backend, and implements best practices in security, scalability, and UI/UX.

Frontend: React.js + TailwindCSS
Backend: Node.js + Express
Database: MongoDB Atlas
Authentication: JWT + bcrypt

# Features
# Frontend

Responsive UI built with TailwindCSS

Registration 
 <img width="1274" height="785" alt="image" src="https://github.com/user-attachments/assets/95adc166-0e85-4739-8051-ba320f497907" />
& Login
<img width="1185" height="747" alt="image" src="https://github.com/user-attachments/assets/6041e82a-8ca2-4a05-a691-f1953d38115a" />

forms with validation (client + server)

Protected routes for authenticated users

Dashboard displaying user profile

<img width="1874" height="429" alt="image" src="https://github.com/user-attachments/assets/d65b2db8-80f0-43f7-93c4-d07e192cc746" />


Task CRUD operations (Add, Update, Delete, Toggle Complete)

<img width="1223" height="473" alt="image" src="https://github.com/user-attachments/assets/c3c5a9a8-9c52-4d90-9a02-dbc942df3069" />


Search & filter tasks

<img width="1900" height="682" alt="image" src="https://github.com/user-attachments/assets/360357d9-9802-4542-abd9-3f989b9b85b6" />


Logout flow

# Backend

Node.js + Express server

MongoDB database connection

REST APIs for authentication and task management

JWT-based authentication middleware

Password hashing with bcrypt

Error handling and validation

# Folder Structure
/backend
  ├─ models/         # MongoDB schemas (User.js, Task.js)
  ├─ routes/         # API routes (auth.js, tasks.js)
  ├─ middleware/     # JWT authentication middleware
  ├─ server.js       # Main backend server file
/frontend
  ├─ src/
      ├─ pages/      # Login, Register, Dashboard
      ├─ components/ # Reusable components (TaskCard, ProtectedRoute)
      ├─ services/   # Axios API service
      ├─ App.jsx
      ├─ main.jsx

API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login and get JWT token
# Tasks
Method	Endpoint	Description
GET	/api/tasks	Get all tasks for user
POST	/api/tasks	Add new task
PUT	/api/tasks/:id	Update task (title/complete)
DELETE	/api/tasks/:id	Delete task
Profile
Method	Endpoint	Description
GET	/api/profile	Fetch user profile
Getting Started
Backend





