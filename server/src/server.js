const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const usersRouter = require("./routers/usersRouter");

const app = express();
const port = 3000;

// # MIDDLEWARE #

app.use(morgan("dev"));
app.use(cors()); // to fix cors error
app.use(express.json()); //to read req.body in json

// # ROUTES #

// Home route
app.get("/", (req, res) => {
   res.send("Hello from Express");
});

// USER Router
app.use("/", usersRouter);

// catch all route 404 case
app.all("*", (req, res) => {
   res.status(500).json({
      url: req.url,
      msg: "Something went wrong",
      endpoints: "valid endpoints are at - /api/users",
      method: req.method,
   });
});

app.listen(port, () => {
   console.log(`server is running http://localhost:${port}`);
});
