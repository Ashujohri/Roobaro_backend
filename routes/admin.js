var express = require("express");
var router = express.Router();
var pool = require("../dbconfig/pool");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var useragent = require("useragent");
var moment = require("moment");
const config = require("../nodemon.json");

// sign-in api
router.post("/login/signin", function (req, res, next) {
  try {
    var agent = useragent.parse(req.headers["user-agent"]);
    let userDeviceId = agent.toString();
    const qry = `select * from admin where admin_email='${req.body.admin_email}'`;
    pool.query(qry, async (error, data) => {
      if (error) {
        return res
          .status(500)
          .json({ status: false, error, data: "No record found" });
      } else if (data.rows.length != 0) {
        if (await bcrypt.compare(req.body.password, data.rows[0].password)) {
          let { password, ...restData } = data.rows[0];

          let payload = {
            UserID: data.rows[0].admin_id,
            DeviceId: userDeviceId,
            CreatedTime: moment().format("HH:mm:ss"),
            CreatedDate: moment(),
          };
          const token = jwt.sign(payload, config.secret, {
            expiresIn: "2h",
          });
          return res.status(200).json({
            status: true,
            token: token,
            data: restData,
            token_type: "Bearer",
          });
        } else {
          return res
            .status(200)
            .json({ status: false, message: "Invalid password" });
        }
      } else {
        return res
          .status(200)
          .json({ status: false, message: "Email not found" });
      }
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.post("/updatePass/:admin_email/:admin_id", async (req, res, next) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const qry = `update admin set password='${hashPassword}' where admin_email='${req.params.admin_email}' and admin_id='${req.params.admin_id}'`;
    pool.query(qry, function (error, result) {
      if (error) {
        console.log("error", error);
        return res
          .status(400)
          .json({ status: false, message: "Bad request", error });
      } else {
        return res.status(200).json({
          status: true,
          message: "Updated info. successfully",
          result: result.rowCount,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

module.exports = router;
