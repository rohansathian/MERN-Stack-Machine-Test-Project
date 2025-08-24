# MERN Stack Machine Test Project

## **Project Title**

Task Management System

## **Objective**

This project is a MERN stack application that allows an admin to:

1. Login securely using JWT authentication.
2. Add and manage agents.
3. Upload CSV files and distribute tasks among agents automatically.
4. View tasks assigned to each agent on a dashboard.

## **Features**

- **Admin User Login**: Secure login using email and password.
- **Agent Management**: Add, view, and manage agents.
- **CSV Upload & Task Distribution**: Upload CSV files, validate format, and distribute tasks equally among agents.
- **Protected Routes**: Only authorized users can access dashboard and manage data.
- **Responsive Frontend**: Works on desktop and mobile devices.

## **Technical Stack**

- **Backend**: Node.js, Express.js
- **Frontend**: React.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Other**: bcrypt for password hashing, cors for API requests

## **Setup Instructions**

### 1. Clone the repository

```
git clone https://github.com/rohansathian/MERN-Stack-Machine-Test-Project
```

### 2. Backend Setup

```
cd backend
npm install
```

- Create a `.env` file in the backend folder with the following:

```
PORT=5000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
```

- Start the backend server:

```
npm run dev
```

### 3. Frontend Setup

```
cd frontend
npm install
npm start
```

- The frontend will run at `http://localhost:3000`

## **Usage Instructions**

1. Register/Login as admin.
2. Add agents with their details (name, email, mobile number, password).
3. Upload a CSV file containing task information (`FirstName`, `Phone`, `Notes`).
4. Tasks are automatically distributed among agents.
5. View assigned tasks for each agent on the dashboard.

## **Video Demonstration**

Watch the demo here: [https://drive.google.com/drive/folders/1nxMPdh\_\_xGYqRPypBqT0N4gGi\_eV7h6R?usp=sharing](https://drive.google.com/drive/folders/1nxMPdh__xGYqRPypBqT0N4gGi_eV7h6R?usp=sharing)

## **Screenshots**
Watch the screenshots: [https://drive.google.com/drive/folders/1nxMPdh\_\_xGYqRPypBqT0N4gGi\_eV7h6R?usp=sharing](https://drive.google.com/drive/folders/1nxMPdh__xGYqRPypBqT0N4gGi_eV7h6R?usp=sharing)



## **Author**

- **Name**: Rohan VS
- **Email**: [rohanssar523@gmail.com](mailto\:rohanssar523@gmail.com)

## **Notes**

- Only admin users can add agents and upload tasks.
- JWT token is required to access protected routes.
- CSV upload supports `.csv`, `.xlsx`, `.xls` files.

