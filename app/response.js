exports.sendSuccessMessage = (req, res, data) => {
  res.send({ message: data });
  res.status(200);
};

exports.sendSuccessData = (req, res, data) => {
  res.send(data);
  res.status(200);
};

exports.sendSuccessNoDataFound = (req, res) => {
  res.send({ message: "204 : No data to display :(" });
  res.status(204);
};

exports.sendResourceNotFound = (req, res) => {
  res.send({ message: "404 : Requested resource wasn't found" });
  res.status(404);
};

exports.sendBadRequest = (req, res) => {
  res.send({ message: "400 : Bad Request" });
  res.status(400);
};

exports.sendAuthRequired = (req, res) => {
  res.send({ message: "401 : Authentication Required" });
  res.status(401);
};

exports.credentialsMismatched = (req, res) => {
  res.send({ message: "401 : Either username or password is wrong!" });
  res.status(401);
};

exports.sendInternalServerError = (req, res) => {
  res.send({ message: "500 : An internal server error occured" });
  res.status(500);
};
