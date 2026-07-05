# Store Rating Platform

A full-stack web application built as a role-based store rating system. The platform allows users to register, sign in, browse stores, and submit ratings from 1 to 5. The system is divided into three user roles: System Administrator, Normal User, and Store Owner.

This project follows the requirements from the FullStack Intern Coding Challenge and uses a React frontend with an Express.js backend and a MySQL database.

## Project Overview

The application supports:
- User registration and login for all roles
- Role-based dashboards and restricted access
- Store management and user management by administrators
- Store browsing, searching, and rating by normal users
- Store owner visibility into ratings submitted for their store

## Main Features

### 1. System Administrator
The administrator can:
- Create new stores
- Create new normal users and admin users
- View dashboard statistics for:
  - Total users
  - Total stores
  - Total submitted ratings
- View and filter lists of stores and users
- View user details including role and store-owner rating information
- Log out securely

### 2. Normal User
A normal user can:
- Register an account
- Log in to the platform
- Update their password after login
- View all registered stores
- Search stores by name and address
- View overall store rating and their own submitted rating
- Submit or modify a rating from 1 to 5 for a store
- Log out securely

### 3. Store Owner
A store owner can:
- Log in to the platform
- Update their password after login
- View a dashboard showing users who rated their store
- View the average rating of their store
- Log out securely

## Validation Rules
The application enforces the following validation rules:
- Name: minimum 20 characters, maximum 60 characters
- Address: maximum 400 characters
- Password: 8 to 16 characters, including at least one uppercase letter and one special character
- Email: must follow standard email validation rules

## Tech Stack

### Frontend
- React.js
- Vite
- React Router DOM
- Redux Toolkit
- Tailwind CSS
- Axios
- Framer Motion

### Backend
- Node.js
- Express.js
- MySQL
- JWT for authentication
- bcrypt for password hashing
- cookie-parser for session handling

## Project Structure

```text
client/                 # React frontend
  src/                  # Application pages, routes, components, hooks, and Redux state
  public/               # Static assets
  package.json          # Frontend dependencies and scripts

server/                 # Express backend
  Controllers/          # Route handlers for auth, admin, user, owner, and store operations
  Routes/               # API route definitions
  db/                   # Database connection and schema initialization
  middleware/           # Auth and role-based authorization middleware
  utils/                # Validation and JWT helpers
  index.js              # Server entry point
  package.json          # Backend dependencies and scripts
```

## Database Design
The backend uses MySQL with three core tables:
- users: stores user information and roles
- stores: stores registered store information and ownership
- ratings: stores user-submitted ratings for stores

The database initialization flow automatically creates the required tables and a default administrator account when the server starts.

## Setup Instructions

### 1. Clone the repository
```bash
git clone <repository-url>
cd Rating
```

### 2. Configure the backend environment
Create a `.env` file inside the `server` folder with values similar to:

```env
PORT=8747
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=rating_app
FRONTEND_URL=http://localhost:5173
DEFAULT_ADMIN_EMAIL=admin@roxiler.com
DEFAULT_ADMIN_PASSWORD=Admin@1234
```

### 3. Install dependencies
```bash
cd client
npm install

cd ../server
npm install
```

### 4. Run the application
Start the backend:
```bash
cd server
npm run dev
```

Start the frontend in a separate terminal:
```bash
cd client
npm run dev
```

The frontend will typically run on `http://localhost:5173` and the backend on `http://localhost:8747`.

## Notes
- The application is designed with role-based authorization for secure access to different dashboards and actions.
- The frontend uses route-based access control for admin, owner, and user sections.
- Sorting support is expected for key listing fields such as name, email, and address, in line with the challenge requirements.

## License
This project is intended for educational and coding challenge purposes.
