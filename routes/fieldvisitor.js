var express = require("express");
var router = express.Router();
var pool = require("../dbconfig/pool");
const { queryPostData } = require("./api/helper");

router.put("/fieldMember/add", function (req, res, next) {
  try {
    // req.body.picture = req.files[0].filename;
    console.log("req body in add visitors", req.body);
    const { keys, values } = queryPostData(req.body);
    const qry = `insert into fieldvisitor(${keys}) values (${values})`;
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
