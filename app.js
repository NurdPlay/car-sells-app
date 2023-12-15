const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const uploadRouter = require('./routes/uploadRouter')
require('dotenv').config()

const url = "mongodb://localhost:27017/usedcarsdb";
const connect = mongoose.connect(url, {
 useCreateIndex: true,
 useFindAndModify: false,
 useNewUrlParser: true,
 useUnifiedTopology: true,
});

connect.then(
 () => console.log("Connected correctly to server"),
 (err) => console.log(err)
);

const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
 const authHeader = req.headers.authorization;
 if (!authHeader) {
    return res.status(401).json({ message: 'You are not authenticated' });
 }

 const token = authHeader.split(' ')[1];
 jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
 });
}

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const carsRouter = require("./routes/cars");
app.use('/imageUpload', verifyToken, uploadRouter);

const app = express();
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/cars", carsRouter);

app.use(function (req, res, next) {
 next(createError(404));
});

app.use(function (err, req, res, next) {
 res.locals.message = err.message;
 res.locals.error = req.app.get("env") === "development" ? err : {};

 res.status(err.status || 500);
 res.render("error.ejs");
});

module.exports = app;