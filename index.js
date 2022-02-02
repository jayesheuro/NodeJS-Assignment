const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5000;

const Sender = require("./app/response");

const ApiRoutes = require("./app/routes/routes");

app.use("/api/user", ApiRoutes);

//for all Not Found : 404 errors
app.use(Sender.sendResourceNotFound);

app.listen(PORT, () => {
  console.log("Server is up and running at port", PORT);
});
