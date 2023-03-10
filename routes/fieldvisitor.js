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

router.get("/displayFieldVisitors/:date", function (req, res, next) {
  try {
    // console.log("BODYYYY OF FIELD VISITORS>>>>>>>>>>>", req.params);
    // const currDate = moment(req.params.date).format("YYYY-MM-DD");
    if (req.params.date === "undefined") {
      var qry = `select FV.*, D.*, L.* from fieldvisitor as FV join department as D on FV.field_visitor_department_id=D.department_id join location as L on FV.field_visitor_location_id=L.location_id;`;
    } else {
      var qry = `select FV.*, D.*, L.* from fieldvisitor as FV join department as D on FV.field_visitor_department_id=D.department_id join location as L on FV.field_visitor_location_id=L.location_id where FV.created_date_time like'${req.params.date}%';`;
    }
    pool.query(qry, function (error, result) {
      if (error) {
        console.log("ERROR IN DISPLAY FIELD VISITOR", error);
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
    console.log("error>>>>>>>>>>>>", error);
    return res.status(500).json({ error });
  }
});

module.exports = router;
