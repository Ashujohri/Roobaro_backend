const { expressjwt: expressJwt } = require("express-jwt");
const config = require("../nodemon.json");

function jwt() {
  const { secret } = config;
  return expressJwt({ secret, algorithms: ["sha1", "RS256", "HS256"] }).unless({
    path: ["/auth/login/signin"],
  });
}

module.exports = jwt;
