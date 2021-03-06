const express = require('express');
const app = express();
const mysql = require('mysql');
// const bodyParser;
const cors = require('cors');

const cron = require('node-cron');

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
    const sqlQuery = "SELECT * FROM cocktail";
    db.query(sqlQuery, (err, result) => {
        res.send(result);
    })
})

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})

app.get("/api/landing", (req, res) => {
    const sql = "select hash1, hash2, hash3 from cocktail";
    db.query(sql, (err, result) => {
        res.send(result);
        console.log(result);
    })
})


app.post("/api/landing2", (req, res) => {
    // const sql = "SELECT * from cocktail where hashtag = "+ req.body.tag1;
    // const sql = "SELECT * FROM cocktail";
    // console.log(req.body.tag1);
    const sql = `select hash1, hash2, hash3 from cocktail where hash1 = '${req.body.tag1}' or hash2 = '${req.body.tag1}' or hash3 = '${req.body.tag1}'`
    db.query(sql, (err, result) => {
        res.send(result);
        console.log(result);
    })
})

app.post("/api/landing3", (req, res) => {
    // const sql = `select hash1, hash2, hash3 from cocktail where hash1`
})

app.post('/api/search_name', (req, res) => {
    console.log(req.body.name);
    const cocktail_name = req.body.name;
    const sql = `SELECT * FROM cocktail WHERE name = '${cocktail_name}';`;
    db.query(sql, (err, result) => {
        res.send(result);
    })
})

app.post('/api/result', (req, res) => {
    const tag1 = req.body.tag1;
    const tag2 = req.body.tag2;
    const tag3 = req.body.tag3;
    const sql = `SELECT * FROM cocktail where (hash1='${tag1}' or hash2='${tag2}' or hash3='${tag3}')`;
    // console.log(sql);
    db.query(sql, (err, result) => {
        res.send(result);
    })
})

app.post('/api/result_good', (req, res) => {
    const sql = `UPDATE cocktail SET good = '${req.body.good}' WHERE name = '${req.body.name}';`;
    db.query(sql, (err, result) => {
        res.send(result);
    })
})

app.post('/api/result_bad', (req, res) => {
    const sql = `UPDATE cocktail SET bad = '${req.body.bad}' WHERE name = '${req.body.name}';`;
    db.query(sql, (err, result) => {
        res.send(result);
    })    
})

app.get('/api/homepage', (req, res) => {
    const sql = "SELECT * from cocktail order by good DESC;";
    db.query(sql, (err, result) => {
        res.send(result);
    })
})

cron.schedule('00 12 1-31 * *', () => { // ?????? 12?????? ????????? ????????? ????????? ????????????
    console.log('test second');
    // db ???????????? ?????? ????????????
})



