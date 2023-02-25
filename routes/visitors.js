var express = require("express");
var router = express.Router();
var pool = require("../dbconfig/pool");

router.get("/display", function (req, res, next) {
  pool.query("select * from visitors;", function (error, result) {
    if (error) {
      console.log("error in visitor", error);
      return res
        .status(400)
        .json({ status: 400, message: "Bad request", error });
    } else {
      return res
        .status(200)
        .json({ status: true, message: "result found", result });
    }
  });
});

module.exports = router;
