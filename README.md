# GameZone Authentication API

This is the authentication API for the GameZone application. It provides user registration and login functionality with secure password handling and JWT token-based authentication.

## Features

- User registration (signup)
- User authentication (login)
- Password hashing using bcrypt
- JWT token-based authentication
- Input validation
- MongoDB database integration

## API Endpoints

### Signup
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
      "email": "user-email"
    }
  }
  ```

### Login
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
      "email": "user-email"
    }
  }
  ```

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