const express = require("express");
const { v4: uuidv4 } = require("uuid");

// Middleware import
const { validateUser } = require("../middleware");

// Create Route
const usersRouter = express.Router();

// USERS data
let users = [
   {
      id: uuidv4(),
      name: "James",
      town: "London",
      isDriver: false,
   },
   {
      id: uuidv4(),
      name: "Mike",
      town: "Kaunas",
      isDriver: true,
   },
   {
      id: uuidv4(),
      name: "Bob",
      town: "Vilnius",
      isDriver: false,
   },
   {
      id: uuidv4(),
      name: "Jane",
      town: "Klaipeda",
      isDriver: true,
   },
];

// # ROUTES #

// GET - /api/users - returns all users
usersRouter.get("/api/users", (request, response) => {
   response.status(200).json(users);
});

//  GET - /api/users/:ID - returns user by ID
// :ID - dynamic part
usersRouter.get("/api/users/:userId", (request, response) => {
   const userId = request.params.userId;
   // finds user by id (if exists)
   const found = users.find((user) => userId === user.id);
   if (!found) {
      response
         .status(404)
         .json({ msg: `user with id ${userId} was not found` });
      return;
   }
   response.status(200).json(found);
});

//  DELETE - /api/users/2 - delete user with id
usersRouter.delete("/api/users/:userId", (request, response) => {
   const userId = request.params.userId;
   const userExists = users.find((user) => user.id == userId);
   if (userExists) users = users.filter((user) => user.id !== userId); // returns array w/o deleted user

   if (!userExists) res.status(404).json({ message: "User not found" });
   response.json(users);
});

// POST /api/users - create new users with ID
usersRouter.post("/api/users", validateUser, (req, res) => {
   const newUser = {
      id: uuidv4(),
      name: req.body.name,
      town: req.body.town,
      isDriver: req.body.isDriver,
   };
   users.push(newUser);
   res.sendStatus(201); // return success status
});

// PUT /api/users - edit exiting user
usersRouter.put("/api/users/:userId", validateUser, (req, res) => {
   const userId = req.params.userId;
   //finds if user exists by ID
   const userExists = users.find((user) => user.id === userId); // for validation, check if ID exists before editing
   const foundIdx = users.findIndex((user) => user.id === userId);

   if (userExists) {
      users[foundIdx] = {
         id: userId,
         ...req.body,
      };
      res.status(200).json({
         message: "User updated successfully",
         users,
      });
   }

   if (!userExists)
      res.status(404).json({
         msg: `Edit FAILED. USER - not found`,
      });
});

module.exports = usersRouter;
