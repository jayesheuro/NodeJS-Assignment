const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is up and running at port ", PORT);
});
