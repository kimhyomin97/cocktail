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

// const PORT = process.env.PORT || 5000;
const PORT = 5000;

app.get("/api/get", (req, res) => {
    const sqlQuery = "SELECT * FROM cocktail;";
    db.query(sqlQuery, (err, result) => {
        res.send(result);
        console.log(result);
    })
})

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})