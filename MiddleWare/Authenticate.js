const base64 = require("base-64");
function Authenticate(req, res, next) {
  if (!req.headers.authorization) {
    res.status(401).json({ Error: "unauthorised" });
  } else {
    encodedData = req.headers.authorization;
    encodedData = encodedData.replace("Basic ", "");
    decodedData = base64.decode(encodedData);
    decodedData = decodedData.split(":");
    if (decodedData[0] == "zia" && decodedData[1] == "zia") {
      next();
    } else {
      res.status(401).json({ Error: "unauthorised" });
    }
  }
}

module.exports = Authenticate;
