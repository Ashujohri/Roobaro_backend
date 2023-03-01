const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

module.exports = upload;
