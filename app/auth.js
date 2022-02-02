const Sender = require("./response");
const jwt = require("jsonwebtoken");
//for a six hour valid token
const expiry = 60 * 60 * 6;

exports.generateToken = (payloadData) => {
  let payload = {
    logintime: Date.now(),
    data: payloadData,
    role: "user",
  };
  let token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: expiry,
  });
  return token;
};

exports.verifyToken = (req, res, next) => {
  let payload = req.headers.authorization;
  if (payload) {
    jwt.verify(
      payload.split(" ")[1],
      process.env.JWT_SECRET_KEY,
      function (err, decoded) {
        if (err) {
          console.log("Some error occured");
        }
        if (decoded) {
          next();
        }
      }
    );
  } else {
    return Sender.sendAuthRequired(req, res);
  }
};
