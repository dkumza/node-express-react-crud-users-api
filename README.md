# Front /w React, Back /w Express - "Users API"

This application is a playground provided by bit.lt. It uses Express as the back-end with different endpoints (GET, DELETE, POST, PUT), and React as the front-end to manipulate these endpoints at the DOM.

## Structure

The project is divided into two main folders:

1. `server`: This folder contains the Express server that handles the API requests.
2. `client`: This folder contains the React application that interacts with the server.

## Server

The server is built with Express.js and provides the following endpoints:

-  `GET /users`: Fetches all users from the database.
-  `DELETE /users/:id`: Deletes a user with the specified ID from the database.
-  `POST /users`: Adds a new user to the database.
-  `PUT /users/:id`: Updates the user with the specified ID in the database.

## Client

The client is a React application that provides a user interface for interacting with the server's endpoints. It allows you to view all users, delete a user, add a new user, and update a user's information.

## Installation

To install the application, follow these steps:

1. Clone the repository.
2. Navigate to the `server` folder and run `npm install` to install the server dependencies.
3. Navigate to the `client` folder and run `npm install` to install the client dependencies.

## Running the Application

To run the application, follow these steps:

1. In the `server` folder, run `npm run dev` to start the server.
2. In the `client` folder, run `npm run dev` to start the client.

The client will be accessible at `http://localhost:5173`, and the server will run at `http://localhost:3000`.
