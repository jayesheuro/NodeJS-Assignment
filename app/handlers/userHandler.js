const bcrypt = require("bcrypt");
const Sender = require("../response");
const dataModel = require("../userData");
const Auth = require("../auth");

let Data = dataModel.DATA;

exports.register = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  bcrypt.hash(req.body.password, salt, (err, hash) => {
    if (hash) {
      let userObject = {};
      for (let key in req.body) {
        if (key !== "password") {
          userObject[key] = req.body[key];
        } else {
          userObject["password"] = hash;
        }
      }
      Data.push(userObject);
      let { password, ...dataobject } = userObject;
      Sender.sendSuccessData(req, res, { newUserAdded: dataobject });
    }
    if (err) {
      console.log(err);
    }
  });
};

exports.login = (req, res) => {
  //extracting user based on username
  users = Data.filter((user) => {
    return user.username === req.body.username;
  });
  console.log(users);
  if (users.length > 0) {
    let code = users[0].password;
    bcrypt.compare(req.body.password, code, (err, success) => {
      if (success) {
        let token = Auth.generateToken({
          username: req.body.username,
          password: users[0].password,
        });
        Sender.sendSuccessData(req, res, { token: token });
      } else {
        Sender.credentialsMismatched(req, res);
      }
    });
  } else {
    Sender.sendSuccessNoDataFound(req, res);
  }
};
