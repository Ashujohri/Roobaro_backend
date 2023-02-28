var express = require("express");
var router = express.Router();
var pool = require("../dbconfig/pool");
const { queryPostData } = require("./api/helper");
const multer = require("./api/multer");

router.get("/display", function (req, res, next) {
  try {
    pool.query("select * from visitors;", function (error, result) {
      if (error) {
        console.log("error in visitor", error);
        return res
          .status(400)
          .json({ status: false, message: "Bad request", error });
      } else {
        return res.status(200).json({
          status: true,
          message: "result found",
          result: result.rows,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.post("/member/add", multer.any(), function (req, res, next) {
  try {
    const { keys, values } = queryPostData(req.body);
    const qry = `insert into visitors(${keys}) values (${values})`;
    pool.query(qry, function (error, result) {
      if (error) {
        console.log("error", error);
        return res.status(400).json({ status: false, message: error.message });
      } else {
        return res
          .status(200)
          .json({ status: true, message: "Record submitted", result });
      }
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

module.exports = router;
