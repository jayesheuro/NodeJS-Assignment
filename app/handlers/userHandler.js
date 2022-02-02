// const Auth = require('../services/auth/auth')
const bcrypt = require("bcrypt");
const Sender = require("../response");
const dataModel = require("../userData");
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
