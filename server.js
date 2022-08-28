const express = require('express');
const cors = require('cors');
const app = express();
const env = require('dotenv');
const DBServices = require('./DBConnection.js');
env.config();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// create posts
app.post("/post", (req, res) => {
    const { id, name, age } = req.body;
    const sql = DBServices.getDbServices();
    sql.makePost(id, name, age);
    res.json({ "success": "True" });
})

// delete posts
app.delete("/delete", (req, res) => {
    const { id } = req.query;
    const sql = DBServices.getDbServices();
    const data = sql.deleteId(id)

    data
        .then(data => res.json({ "msg": data }))
        .catch(err => console.log(err))
})

// update posts
app.put("/update", (req, res) => {
    const { id, name } = req.query;
    const sql = DBServices.getDbServices();
    const data = sql.updateNameById(id, name);

    data
        .then(data => res.json({ "result": data }))
        .catch(err => console.log(err))
})

// read posts
app.get("/getAll", (req, res) => {

    const sql = DBServices.getDbServices();
    const data = sql.getAll();
    data.then(data => res.json({ "data": data }))
        .catch(err => console.log(err))
})


// listening
app.listen(process.env.PORT, (req, res) => {
    console.log("The Server is running at the PORT - " + process.env.PORT);
})