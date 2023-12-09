//1 create server application
const express = require("express");
const app = express();

//setting up database
const Mysql = require("mysql2");
const pool = Mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  port: 3306,
  password: "root",
  user: "root",
  database: "HealthyRecipesProject",
});

//serving static routing
app.use("/", express.static("./HealthyRecipesWebsite"));

//json routing to Insert the user data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/insert", (request, response) => {
  const data = {
    msgID: request.body.msgID,
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    countryCode: request.body.countryCode,
    mobile: request.body.mobile,
    gender: request.body.gender,
    birthday: request.body.birthday,
    email: request.body.email,
    language: request.body.language,
    msgType: request.body.msgType,
    message: request.body.message,
  };
  const query = "INSERT INTO contactForm SET ?";
  pool.query(query, data, (error, result) => {
    if (error) throw error;
    response.send("Data inserted successfully!");
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
