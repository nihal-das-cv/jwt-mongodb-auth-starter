# JWT MongoDB Auth Starter - Server

## Overview

The server provided in this project is designed to handle user authentication and session using JSON Web Tokens (JWT) and MongoDB. This starter kit serves as a foundation for building secure, scalable Node.js applications.

## Features

- **JWT Authentication:** Secure authentication using JSON Web Tokens.
- **MongoDB Integration:** Data persistence using MongoDB for user management.
- **RESTful API:** Easily extendable endpoints for user registration, login, and protected routes.
- **Middleware:** Built-in middleware for error handling, request logging, and route protection.
- **Configurable:** Environment variables to quickly configure database connection, JWT secrets, and server settings.

## Getting Started

### Prerequisites

- Node.js or Bun.js
- MongoDB instance (local or cloud-based)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/nihal-das-cv/jwt-mongodb-auth-starter.git
   ```
2. **Install Dependencies**
   ```bash
   cd server
   npm install or bun install
   ```
3. **Setup Environment Variables**
   Create a `.env` file in the `server` directory with the following content:
   ```env
   MONGO_URI=<your_mongo_db_connection_string>
   JWT_SECRET=<your_jwt_secret>
   PORT=5000
   ```
4. **Run the Server**
   ```bash
   npm start
   ```

### Testing the API

- Use [Postman](https://www.postman.com/) or any similar tool to test the available endpoints.

## API Endpoints

### Authentication

- **POST /api/auth/register**  
  Register a new user.
- **POST /api/auth/login**  
  Authenticate user credentials and return a JWT token.

### Protected Routes

- **GET /api/protected**  
  Example of a protected route that requires a valid JWT token.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes with a clear message.
4. Create a pull request to merge your changes into this repository.

## Contact

For any questions or suggestions, please open an issue or contact me.
