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

exports.getAllUsers = (req, res) => {
  let result = [];
  for (let i = 0; i < Data.length; i++) {
    let { password, ...restDetails } = Data[i];
    result.push(restDetails);
  }
  Sender.sendSuccessData(req, res, { data: result });
};

exports.getUserById = (req, res) => {
  users = Data.filter((user) => {
    return user.username === req.params.id;
  });
  if (users.length > 0) {
    let { password, ...restDetails } = users[0];
    Sender.sendSuccessData(req, res, { data: restDetails });
  } else {
    Sender.sendSuccessNoDataFound(req, res);
  }
};

exports.updateUserById = (req, res) => {
  users = Data.filter((user, i) => {
    return user.username === req.params.id;
  });
  if (users.length > 0) {
    let fields = req.body;
    for (var key in fields) {
      if (key !== "password") {
        users[0][key] = fields[key];
      }
    }
    let { password, ...restDetails } = users[0];
    Sender.sendSuccessData(req, res, { updatedUser: restDetails });
  } else {
    Sender.sendSuccessNoDataFound(req, res);
  }
};

exports.deleteUserById = (req, res) => {
  pos = Data.findIndex((user) => user.username === req.params.id);
  if (pos !== -1) {
    users = Data.filter((user) => {
      return user.username !== req.params.id;
    });
    Data = users;
    Sender.sendSuccessData(req, res, { deletedUser: req.params.id });
  } else {
    Sender.sendSuccessNoDataFound(req, res);
  }
};
