const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const uuid = require("uuid");

const app = express();
const port = 3000;

let users = [
   {
      id: 1,
      name: "James",
      town: "London",
      isDriver: false,
   },
   {
      id: 2,
      name: "Mike",
      town: "Kaunas",
      isDriver: true,
   },
   {
      id: 3,
      name: "Bob",
      town: "Vilnius",
      isDriver: false,
   },
   {
      id: 4,
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

// GET - /api/users - grazinti visus userius
app.get("/api/users", (request, response) => {
   response.status(200).json(users);
});

// GET - /api/users/drivers - grazins visus vairuotojus
app.get("/api/users/drivers", (request, response) => {
   const driversArr = users.filter((userObj) => userObj.isDriver === true);
   console.log(driversArr);
   response.json(driversArr);
});

// GET - /api/users/town - grazinsi visus miestus masyvo pavidalu
app.get("/api/users/town", (request, response) => {
   const townsArr = users.map((uObj) => uObj.town);
   console.log("townsArr ===", townsArr);
   response.json(townsArr);
});

// GET - /api/users/1 - grazinti konretu  useri
// :userId dinamine dalis
app.get("/api/users/:userId", (request, response) => {
   console.log("request.params ===", request.params);
   const userId = +request.params.userId;
   // surasti objekta su id === userId ir ji grazinti
   const found = users.find((userObj) => userId === userObj.id);
   console.log("found ===", found);
   // TODO: not found case
   // jei neradom
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
   const userId = +request.params.userId;
   // grazinti viska iskryrus ta el kurio id yra = userId
   users = users.filter((uObj) => uObj.id !== userId);
   console.log("users ===", users);
   response.json(users);
});

// POST /api/users - create new users with ID
app.post("/api/users", (req, res) => {
   console.log(req);
   const newUser = {
      id: uuid(),
      name: req.body.name,
      town: req.body.town,
      isDriver: req.body.isDriver,
   };
   console.log(newUser);
   users.push(newUser);
   res.sendStatus(201); // return success status
});

app.listen(port, () => {
   console.log(`server is running http://localhost:${port}`);
});
