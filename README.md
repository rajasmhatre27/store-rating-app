Store Rating Application - Full Stack Intern Challenge

This is a full-stack web application built with the PERN stack (PostgreSQL, Express, React, Node.js) that allows users to rate stores. It features a comprehensive Role-Based Access Control (RBAC) system.

🚀 Tech Stack

Frontend: React.js (Vite), Tailwind CSS

Backend: Node.js, Express.js

Database: PostgreSQL

Authentication: JWT (JSON Web Tokens)

🧪 Test Credentials

Use these accounts to test the different user roles.

1. System Administrator

Can view dashboard stats, add stores, view all users, and see owner ratings.

Email: rajasadmin@gmail.com

Password: Rajas@2704

2. Store Owner

Can view their specific store's average rating and individual customer ratings.

Email: owner@test.com

Password: Owner@123

3. Normal User

Can search for stores and submit ratings (1-5 stars).

Email: normal@gmail.com

Password: Normal@123

🛠️ How to Run Locally

1. Database Setup

Install PostgreSQL.

Create a database named rating_database.

Run the SQL scripts provided in database_schema.sql (or create tables for users, stores, ratings).

2. Backend Setup

cd server
npm install
# Create .env file with DB_PASSWORD, JWT_SECRET, etc.
npm run dev


3. Frontend Setup

cd client
npm install
npm run dev


✅ Completed Requirements

[x] Single Login System (Admin, User, Owner)

[x] Admin Dashboard (Stats, Add Store, User List with Ratings)

[x] Store Owner Dashboard

[x] User Store List & Rating System

[x] Sorting & Filtering

[x] Change Password Functionality