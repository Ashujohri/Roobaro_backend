var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var jwt = require("./dbconfig/jwt");
var errorHandler = require("./dbconfig/error-handler");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var visitorsRouter = require("./routes/visitors");
var adminRouter = require("./routes/admin");
var departmentRouter = require("./routes/department");
var locationRouter = require("./routes/location");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(jwt());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/visitor", visitorsRouter);
app.use("/auth", adminRouter);
app.use("/department", departmentRouter);
app.use("/location", locationRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

app.use(errorHandler);

module.exports = app;
