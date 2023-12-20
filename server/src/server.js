const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = 3000;

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

// Middleware
app.use(morgan("dev"));
app.use(cors()); // to fix cors error
app.use(express.json()); //to read req.body in json

// ROUTES
app.get("/", (req, res) => {
   res.send("Hello World!");
});

// GET - /api/users - returns all users
app.get("/api/users", (request, response) => {
   response.status(200).json(users);
});

// GET - /api/users/drivers - returns all drivers
app.get("/api/users/drivers", (request, response) => {
   const driversArr = users.filter((userObj) => userObj.isDriver === true);
   console.log(driversArr);
   response.json(driversArr);
});

// GET - /api/users/town - returns all users towns
app.get("/api/users/town", (request, response) => {
   const townsArr = users.map((uObj) => uObj.town);
   console.log("townsArr ===", townsArr);
   response.json(townsArr);
});

// GET - /api/users/1 - returns user by ID
// :userId dynamic part
app.get("/api/users/:userId", (request, response) => {
   console.log("request.params ===", request.params);
   const userId = request.params.userId;
   // finds user by id (if exists)
   const found = users.find((userObj) => userId === userObj.id);
   console.log("found ===", found);

   if (found === undefined) {
      response
         .status(404)
         .json({ msg: `user with id ${userId} was not found` });
      return;
   }
   response.json(found);
});

//  DELETE - /api/users/2 - delete user with id
app.delete("/api/users/:userId", (request, response) => {
   const userId = request.params.userId;
   users = users.filter((uObj) => uObj.id !== userId); // returns array w/o deleted user
   console.log("users ===", users);
   response.json(users);
});

// POST /api/users - create new users with ID
app.post("/api/users", (req, res) => {
   console.log(req);
   const newUser = {
      id: uuidv4(),
      name: req.body.name,
      town: req.body.town,
      isDriver: req.body.isDriver,
   };
   console.log(newUser);
   users.push(newUser);
   res.sendStatus(201); // return success status
});

// PUT /api/users - edit exiting user
app.put("/api/users/:userId", (req, res) => {
   const userId = req.params.userId;
   const userExists = users.find((user) => user.id == userId); //finds if user exists by ID

   if (userExists) {
      // create edited user
      const editedUser = {
         id: userId,
         name: req.body.name,
         town: req.body.town,
         isDriver: req.body.isDriver,
      };
      users = users.map((user) => (user.id == userId ? editedUser : user));
      res.status(200).json({
         message: "User updated successfully",
         user: editedUser,
      });
   }

   if (!userExists) res.status(404).json({ message: "User not found" });
});

app.listen(port, () => {
   console.log(`server is running http://localhost:${port}`);
});
