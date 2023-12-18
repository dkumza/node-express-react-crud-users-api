"use strict";
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const port = 3000;

let users = [
   { id: 1, name: "James", town: "London", isDriver: false },
   { id: 2, name: "Mike", town: "Kaunas", isDriver: true },
   { id: 3, name: "Bob", town: "Vilnius", isDriver: false },
   { id: 4, name: "Jane", town: "Klaipeda", isDriver: true },
];

// Middleware
app.use(morgan("dev"));
app.use(cors()); // to fix cors errror

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
   // grazlinti viska iskryrus ta el kurio id yra = userId
   users = users.filter((uObj) => uObj.id !== userId);
   console.log("users ===", users);
   response.json(users);
});

app.listen(port, () => {
   console.log(`server is running http://localhost:${port}`);
});
