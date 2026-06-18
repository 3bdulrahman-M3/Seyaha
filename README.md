# Smart Tourism Platform Backend

This is the backend for the Smart Tourism Platform, built with Node.js, Express, and MongoDB.

## Features
- **Role-based Authentication**: Admin, Manager, User, Tour Guide.
- **Booking Request System**: Users can request bookings, and Managers/Admins can accept or reject them.
- **Real-time Chat**: Integrated with Socket.io for communication between users and managers after a booking is confirmed.
- **Service Management**: CRUD operations for tourism services (Hotels, Tours, Cars, Real Estate).
- **Reviews & Ratings**: Users can rate and review services.
- **Notifications**: System notifications for booking updates and messages.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas (Mongoose ODM)
- **Real-time**: Socket.io
- **Auth**: JSON Web Tokens (JWT) & BcryptJS

## Setup

1. **Install Dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file in the `backend` directory (one is already provided with placeholders):
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_secret_key
   NODE_ENV=development
   ```

3. **Run the Server**:
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints (Brief)
- `/api/auth`: Register, Login, Me
- `/api/services`: Get all, Get single, Create (Manager/Admin)
- `/api/bookings`: Create request, Update status, Get user bookings
- `/api/reviews`: Add/Get reviews
- `/api/messages`: Fetch chat history

## Folder Structure
- `config/`: Database connection
- `controllers/`: Logic for routes
- `middleware/`: Auth and Error handling
- `models/`: Mongoose schemas
- `routes/`: API route definitions
