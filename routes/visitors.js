var express = require("express");
var router = express.Router();
var pool = require("../dbconfig/pool");
const { queryPostData } = require("./api/helper");
const multer = require("./api/multer");
const moment = require("moment");
const request = require("request");

router.get("/display/:date", function (req, res, next) {
  try {
    const currDate = moment(req.params.date).format("YYYY-MM-DD");
    if (req.params.date === "undefined") {
      var qry = `select V.*, D.*, L.* from visitors as V join department as D on V.department_id=D.department_id join location as L on V.location_id=L.location_id group by V.visitors_id, D.department_id, L.location_id;`;
    } else {
      var qry = `select V.*, D.*, L.* from visitors as V join department as D on V.department_id=D.department_id join location as L on V.location_id=L.location_id where V.created_date_time like'${currDate}%' group by V.visitors_id, D.department_id, L.location_id;`;
    }
    pool.query(qry, function (error, result) {
      if (error) {
        console.log("error", error);
        return res
          .status(400)
          .json({ status: false, message: "Bad request", error });
      } else {
        console.log("result", result);
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

router.put("/member/add", multer.any(), function (req, res, next) {
  try {
    // req.body.picture = req.files[0].filename;
    console.log("req body in add visitors", req.body);
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

router.post("/sendOTP", function (req, res) {
  try {
    console.log("Request body", req.body);
    var options = {
      method: "GET",
      url: `http://sms.smsindori.com/http-api.php?username=Plus91labs&password=12345&senderid=PLSLMS&route=06&number=${req.body.mobile}&message=PLSLMS:Dear%20customer,%20use%20this%20OTP%20${req.body.otp}%20to%20log%20in%20to%20your%20TrueSales%20account.%20This%20OTP%20will%20expire%20in%2015%20minutes&templateid=1007379278963251418`,
      headers: {
        "Cache-Control": "no-cache",
      },
      // url: `https://api.msg91.com/api/v5/otp?template_id=6361f763d6fc0503f83a2632&mobile=${req.body.mobile}&authkey=383945Aj0ZM8eNX635238f7P1&otp=${req.body.otp}`,
    };
    request(options, function (error, result, body) {
      if (error) {
        return res.status(400).json({ status: false, msg: error });
      } else {
        return res.status(200).json({
          status: true,
          message: "OTP Has been sent",
          result,
          otp: req.body.otp,
          mobile: req.body.mobile,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

module.exports = router;
