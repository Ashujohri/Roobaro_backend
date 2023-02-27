const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "public/images");
  },
});

var upload = multer({ storage: storage });

module.exports = upload;
