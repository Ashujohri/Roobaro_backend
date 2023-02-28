var express = require("express");
var router = express.Router();
var pool = require("../dbconfig/pool");

router.get("/departmentDisplay", function (req, res, next) {
  try {
    const qry = `select * from department;`;
    pool.query(qry, function (error, result) {
      if (error) {
        return res
          .status(400)
          .json({ status: false, message: "Bad Request", error });
      } else {
        return res
          .status(200)
          .json({ status: true, message: "record found", result: result.rows });
      }
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

module.exports = router;
