const { expressjwt } = require("express-jwt");

const isAuthenticated = expressjwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload", // give the payload back
  getToken: (req) => {
    console.log(req.headers);
    if (req.headers === undefined || req.headers.authorization === undefined) {
      console.log("there is no token");
      return null;
    }

    const tokenArr = req.headers.authorization.split(" ");
    const tokenType = tokenArr[0];
    const token = tokenArr[1];

    if (tokenType !== "Bearer") {
      console.log("token invalid");
      return null;
    }

    console.log("Token extracted and sent");
    return token;
  },
});

module.exports = isAuthenticated;
