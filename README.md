# ParkEase: Smart Parking System

A full-stack web application for managing parking spaces with user authentication and role-based access control.

## Features

- **User Authentication**: Secure login and registration with JWT tokens
- **Role-Based Access**: Separate dashboards for users and administrators
- **Parking Management**: View real-time parking slot availability
- **Admin Panel**: Manage users and view system statistics
- **Responsive Design**: Clean, modern UI that works on all devices

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript (ES6+)

## Project Structure

```
Smart_parking/
├── backend/
│   ├── controller/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── index.html
│   ├── register.html
│   ├── user-dashboard.html
│   ├── admin-dashboard.html
│   ├── style.css
│   └── *.js files
└── seed/
    └── slotSeeder.js
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB instance

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:5000`

### Frontend Setup

1. Open `frontend/index.html` in your web browser, or

2. Use a local server (recommended):
   ```bash
   # Using Python
   cd frontend
   python -m http.server 8000
   
   # Or using Node.js
   npx http-server frontend -p 8000
   ```

3. Access the application at `http://localhost:8000`

## Usage

### For Users

1. **Register**: Create a new account with your details and vehicle information
2. **Login**: Access your dashboard with your credentials
3. **View Slots**: See available and occupied parking slots in real-time
4. **Profile**: View your vehicle information

### For Administrators

1. **Register as Admin**: Select "Admin" role during registration
2. **Login**: Access the admin dashboard
3. **Manage Users**: View all registered users and their details
4. **Monitor Slots**: See parking slot statistics and availability
5. **System Stats**: View total users, total slots, and available slots

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token
- `GET /api/auth/profile` - Get user profile (protected)

### Admin Routes
- `GET /api/admin/dashboard` - Admin dashboard (admin only)
- `GET /api/admin/users` - Get all users (admin only)

### User Routes
- `GET /api/user/dashboard` - User dashboard (user only)

### Parking Slots
- `GET /api/slots/all` - Get all parking slots

## Default Parking Slots

The system automatically seeds 4 parking slots on first run:
- A1 - Available
- A2 - Occupied
- A3 - Available
- A4 - Available

## Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected routes with middleware
- Role-based access control
- Environment variables for sensitive data

## Future Enhancements

- Real-time slot updates with WebSockets
- Slot booking functionality
- Payment integration
- Booking history
- Email notifications
- Mobile application
- Advanced admin features (add/remove slots)

## License

This project is created for educational purposes as part of the Infosys Springboard internship program.

## Author

Created as part of Infosys Springboard Internship - Milestone 1

---

For detailed information about the project implementation and learning outcomes, see [milestone1.md](milestone1.md)
