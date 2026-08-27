# Notes-API
A RESTful Notes API built using Node.js, Express.js, and MySQL.

The API supports user registration, login with JWT authentication, and
CRUD operations for notes. Each note belongs to the authenticated user,
so users can access and modify only their own notes.

## Technologies Used

- Node.js
- Express.js
- MySQL
- JavaScript
- JWT (JSON Web Token)
- bcrypt
- REST API
- Thunder Client / Postman

## Project Structure

Notes-API/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── notesController.js
│   └── userController.js
│
├── middleware/
│   ├── authMiddleware.js
│   ├── errorHandler.js
│   ├── idValidation.js
│   ├── noteValidation.js
│   ├── paginationValidation.js
│   └── userValidation.js
│
├── models/
│   ├── notesModel.js
│   └── userModel.js
│
├── routes/
│   ├── notesRoutes.js
│   └── userRoutes.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md

## Folder Responsibilities

- `config/` – Handles the MySQL database connection.
- `controllers/` – Contains the main business logic and handles HTTP requests and responses.
- `models/` – Contains SQL queries and communicates with the database.
- `routes/` – Defines API endpoints and connects routes to controllers and middleware.
- `middleware/` – Handles authentication, validation, pagination, and centralized error handling.
- `server.js` – Entry point of the application and configures Express, routes, middleware, and the server.

## Environment Variables

The project uses environment variables to store sensitive configuration
such as database credentials and the JWT secret.

Create a `.env` file in the project root:

env
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=notes_db
DB_PORT=3306
JWT_SECRET=your_jwt_secret
PORT=3000


Then add:

markdown
## Database Setup

Create a MySQL database:

sql
CREATE DATABASE notes_db;
//create users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
//create notes table
CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    content VARCHAR(255),
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

## Authentication

The API uses JWT (JSON Web Token) for authentication.

### Registration

Users can create an account using:

http
POST /users/register
Request body:
{
    "username": "sowjanya",
    "password": "mypassword"
}
The password is hashed using bcrypt before it is stored in the database.
Example response:
{
    "message": "User registered successfully",
    "id": 1
}

Login

Users can log in using:

POST /users/login

Request body:

{
    "username": "sowjanya",
    "password": "mypassword123"
}

Example response:

{
    "message": "Login successful",
    "token": "YOUR_JWT_TOKEN"
}

## Authorization Header

Send the token using the following HTTP header:
Authorization: Bearer YOUR_JWT_TOKEN

## Notes API

All Notes APIs require a valid JWT token.

### Get All Notes

http
GET /notes

Returns notes belonging to the authenticated user.

Optional pagination:

GET /notes?page=1&limit=10

Required header:

Authorization: Bearer YOUR_JWT_TOKEN

Example response:

{
    "page": 1,
    "limit": 10,
    "notes": [
        {
            "id": 1,
            "title": "Java",
            "content": "Learning Java",
            "user_id": 1
        }
    ]
}
Get Note By ID
GET /notes/:id

Example:

GET /notes/1

Required header:

Authorization: Bearer YOUR_JWT_TOKEN

Example response:

{
    "id": 1,
    "title": "Java",
    "content": "Learning Java",
    "user_id": 1
}
Create Note
POST /notes

Required header:

Authorization: Bearer YOUR_JWT_TOKEN

Request body:

{
    "title": "Java",
    "content": "Learning Java methods"
}

Example response:

{
    "message": "Note created successfully",
    "id": 5
}

The user_id is automatically taken from the authenticated user's JWT.

Update Note
PUT /notes/:id

Example:

PUT /notes/5

Required header:

Authorization: Bearer YOUR_JWT_TOKEN

Request body:

{
    "title": "Java Methods",
    "content": "Learning methods in Java"
}

Example response:

{
    "message": "Note updated successfully"
}

A user can update only their own notes.

Delete Note
DELETE /notes/:id

Example:

DELETE /notes/5

Required header:

Authorization: Bearer YOUR_JWT_TOKEN

Example response:

{
    "message": "Note deleted successfully"
}

A user can delete only their own notes.



## Then add the API summary table

At the end of that section:

markdown
### API Summary

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/users/register` | Register a new user | ❌ |
| POST | `/users/login` | Login and receive JWT | ❌ |
| GET | `/notes` | Get user's notes | ✅ |
| GET | `/notes/:id` | Get a specific note | ✅ |
| POST | `/notes` | Create a note | ✅ |
| PUT | `/notes/:id` | Update a note | ✅ |
| DELETE | `/notes/:id` | Delete a note | ✅ |

## Validation

The API validates incoming request data using middleware.

### User Validation

Registration and login validate:

- Username is required.
- Password is required.
- Username must be at least 3 characters.
- Username cannot exceed 100 characters.
- Password must be at least 6 characters.

### Note Validation

Creating and updating notes validates:

- Title is required.
- Content is required.
- Title cannot exceed 100 characters.
- Content cannot exceed 5000 characters.

### ID Validation

Note IDs are validated before processing requests such as:
text
GET /notes/:id
PUT /notes/:id
DELETE /notes/:id


---

# 2. Error Handling

Add:

markdown
## Error Handling

The API uses centralized error-handling middleware.

Controllers pass unexpected errors to the error handler using:

javascript
next(error);


---

# 3. HTTP Status Codes

## HTTP Status Codes

| Status Code | Meaning | Example |
|-------------|---------|---------|
| 200 | OK | Successful GET, PUT, or DELETE |
| 201 | Created | Note or user successfully created |
| 400 | Bad Request | Invalid input or ID |
| 401 | Unauthorized | Missing, invalid, or expired JWT |
| 404 | Not Found | Note or resource does not exist |
| 500 | Internal Server Error | Database or server error |
Remember this distinction
400 → "Your request is invalid."
401 → "You are not authenticated."
404 → "The resource doesn't exist."
500 → "Something went wrong on the server."

## Pagination

The `GET /notes` endpoint supports pagination.

### Query Parameters

- `page` – Page number. Default: `1`
- `limit` – Number of notes per page. Default: `10`
- Maximum `limit`: `50`

Example:
http
GET /notes?page=2&limit=10
offset = (page - 1) × limit

## Installation and Running the project

Clone GitHub
     ↓
npm install
     ↓
Create .env
     ↓
Setup MySQL
     ↓
node server.js
     ↓
API running