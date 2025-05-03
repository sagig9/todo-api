# todo-api
Todo List API

# ToDo API

This is the backend server for the ToDo List application built with Node.js and Express.

## Features

- User authentication (login & register)
- Task creation, editing, deletion
- Priority & due date management
- MongoDB for data persistence

## Requirements

- Node.js (v18+ recommended)
- MongoDB instance (local or cloud, e.g. MongoDB Atlas)

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sagig9/todo-api.git
   cd todo-api

2. **Install dependencies:**
npm install

3. **Configure environment variables::**
    Create a nodemon.json file in the root directory and set the following:
     ```json
        {
            "MONGO_USERNAME": "your_mongodb_username",
            "MONGO_PASSWORD": "your_mongodb_password",
            "MONGO_URL": "your_mongodb_url",
            "JWT_KEY": "your_jwt_key",
            "PORT": 3001
        }

4. **Run the server:**
npm start

