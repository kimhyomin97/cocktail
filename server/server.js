const express = require('express');
const app = express();
const mysql = require('mysql');
// const bodyParser;
const cors = require('cors');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "cocktail_db"
});

app.use(express.json());
app.use(cors());
// const api = require('./routes/index');
// const PORT = process.env.PORT || 5000;
const PORT = 5000;
// const db = require('./config/db');

app.get("/api/get", (req, res) => {
    const sqlQuery = "SELECT * FROM cocktail;";
    db.query(sqlQuery, (err, result) => {
        res.send(result);
        console.log(result);
    })
})

// app.post("/api/insert", (req, res) => {
//     const title = req.body.title;
//     const content = req.body.content;
//     const sqlQuery = "INSERT"...
// })

// app.use('/api', api);

// app.get('/', (req, res) => {
//     // db.query("SELECT * FROM cocktal", (err, data) => {
//     //     if(!err) res.send({products : data});
//     //     else res.send(err);
//     // })

//     // res.send('Server Response Success');
//     res.send({ test : "test test"});
// })

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})