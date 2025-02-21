# GameZone Authentication API

This is the authentication API for the GameZone application. It provides user registration, login functionality, and room management with secure password handling and JWT token-based authentication.

## Features

- User registration (signup)
- User authentication (login)
- Password hashing using bcrypt
- JWT token-based authentication
- Input validation
- MongoDB database integration
- Email notifications
- Room Cards Management System

## API Endpoints

### Authentication

#### Signup
- **URL**: `/api/auth/signup`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "string",
    "username": "string",
    "email": "string",
    "password": "string",
    "confirmPassword": "string",
    "gender": "male|female|other",
    "dob": "YYYY-MM-DD"
  }
  ```
- **Success Response**: `201 Created`
  ```json
  {
    "message": "User created successfully",
    "token": "jwt-token",
    "user": {
      "id": "user-id",
      "name": "user-name",
      "username": "username",
      "email": "user-email",
      "roomCardsCount": 10
    }
  }
  ```

#### Login
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "username": "string (username or email)",
    "password": "string"
  }
  ```
- **Success Response**: `200 OK`
  ```json
  {
    "message": "Login successful",
    "token": "jwt-token",
    "user": {
      "id": "user-id",
      "name": "user-name",
      "username": "username",
      "email": "user-email",
      "roomCardsCount": 10
    }
  }
  ```

### Room Cards Management

#### Get Room Cards Status
- **URL**: `/api/room-cards/status`
- **Method**: `GET`
- **Auth**: Required
- **Success Response**: `200 OK`
  ```json
  {
    "total": 10,
    "available": 8,
    "used": 1,
    "expired": 1
  }
  ```

#### Get Available Room Cards
- **URL**: `/api/room-cards/available`
- **Method**: `GET`
- **Auth**: Required
- **Success Response**: `200 OK`
  ```json
  [
    {
      "id": "card-id",
      "type": "basic",
      "isUsed": false,
      "expiresAt": "timestamp"
    }
  ]
  ```

#### Use Room Card
- **URL**: `/api/room-cards/use`
- **Method**: `POST`
- **Auth**: Required
- **Success Response**: `200 OK`
  ```json
  {
    "message": "Room card used successfully",
    "card": {
      "id": "card-id",
      "type": "basic",
      "isUsed": true,
      "expiresAt": "timestamp"
    }
  }
  ```

#### Add Reward Room Cards (Admin Only)
- **URL**: `/api/room-cards/reward`
- **Method**: `POST`
- **Auth**: Required (Admin)
- **Request Body**:
  ```json
  {
    "userId": "string",
    "count": "number",
    "type": "basic|premium|vip"
  }
  ```
- **Success Response**: `200 OK`
  ```json
  {
    "message": "5 basic room cards added successfully"
  }
  ```

## Room Cards System

### Features
- Each new user receives 10 basic room cards on signup
- Room cards expire after 3 hours from creation
- Each room creation consumes one room card
- Users can earn additional cards through rewards
- Cards can be of type: basic, premium, or vip
- Real-time tracking of card status (available, used, expired)

### Card States
- Available: Not used and not expired
- Used: Consumed for room creation
- Expired: Past the 3-hour validity period

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with the following variables:
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   EMAIL_USER=your_email
   EMAIL_PASS=your_email_app_password
   ```

3. Start the server:
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## Validation Rules

### Signup
- Name: Required
- Username: Required, unique
- Email: Valid email format, unique
- Password: Minimum 6 characters
- Confirm Password: Must match password
- Gender: Must be 'male', 'female', or 'other'
- Date of Birth: Valid date format

### Login
- Username/Email: Required
- Password: Required

## Error Handling

The API returns appropriate error messages and status codes:

- `400`: Bad Request (validation errors)
- `401`: Unauthorized (invalid credentials)
- `500`: Server Error

## Security Features

- Password hashing using bcrypt
- JWT token authentication
- Input validation and sanitization
- Unique email and username constraints
- Secure password comparison
- Protected room card management endpoints