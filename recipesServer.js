
//1 creare server application
const express = require("express");
const app = express();
const port = 3000;
//setting up database

const Mysql = require("mysql2");
const pool = Mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    port: 3306,
    password: "root",
    user: "root",
    database: "HealthyRecipesProject"
});

//serving static routing

app.use("/",express.static("./HealthyRecipesWebsite"));

//json routing to Insert the user data 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/insert", (request, response) => {

    const data = { name: request.body.name, email: request.body.email, mealName: request.body.mealName, Ingredient: request.body.Ingredient, Instruction: request.body.Instruction };
    const query = "INSERT INTO recipes SET ?";

    pool.query(query, data, (error, result) => {
        if (error) throw error;
        response.send("Data inserted successfully!");
    });
});

// View data route
app.get("/view", (request, response) => {
    const query = "SELECT mealName,Ingredient,Instruction FROM recipes";

    pool.query(query, (error, result) => {
        if (error) throw error;
        response.json(result);
    });
});

//activating server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});