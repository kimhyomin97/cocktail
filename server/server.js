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
    // console.log(req.body.tag2)
    const sql = `select hash1, hash2, hash3 from cocktail where (hash1 = '${req.body.tag1}' or hash2 = '${req.body.tag1}' or hash3 = '${req.body.tag1}') and (hash1 = '${req.body.tag2}' or hash2 = '${req.body.tag2}' or hash3 = '${req.body.tag2}')`
    db.query(sql, (err, result) => {
        res.send(result);
        console.log(result);
    })
})

app.post('/api/search_name', (req, res) => {
    // console.log(req.body.name);
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
    const sql = `SELECT * FROM cocktail where (hash1='${tag1}' or hash2='${tag1}' or hash3='${tag1}') and (hash1='${tag2}' or hash2='${tag2}' or hash3='${tag2}') and (hash1='${tag3}' or hash2='${tag3}' or hash3='${tag3}')`;
    db.query(sql, (err, result) => {
        res.send(result);
    })
})

app.post('/api/result_good', (req, res) => {
    const sql = `UPDATE cocktail SET good = '${req.body.good}' WHERE name = '${req.body.name}';`;
    console.log(req.body.good)
    db.query(sql, (err, result) => {
        res.send(result);
    })
    // console.log(req.body.tag1)

    // const sql2 = `insert into today_hash (hashtag) select '${req.body.tag1}' from dual where not exists (select hashtag from today_hash where hashtag = '${req.body.tag1}')`;
    // const sql2 = `insert into today_hash (hashtag)
	// select '${req.body.tag1}' from dual
    // where not exists
    // (select hashtag from today_hash
	// 	where hashtag = '${req.body.tag1}')`;
})

app.post('/api/result_today_good', (req, res) => {
    const sql = `UPDATE today_hash SET good = '${req.body.good}' WHERE (hashtag = '${req.body.tag1}') or (hashtag = '${req.body.tag2}') or (hashtag = '${req.body.tag3}');`;
    console.log(sql);
    db.query(sql, (err, result) => {
        res.send(result);
        console.log(result);
    })
})

app.post('/api/result_today_bad', (req, res) => {
    const sql = `UPDATE today_hash SET bad = '${req.body.bad}' WHERE (hashtag = '${req.body.tag1}') or (hashtag = '${req.body.tag2}') or (hashtag = '${req.body.tag3}');`;
    console.log(sql);
    db.query(sql, (err, result) => {
        res.send(result);
        console.log(result);
    })
})

app.post('/api/result_create1', (req, res) => {
    const sql = `insert into today_hash (hashtag)
	select '${req.body.tag1}' from dual
    where not exists
    (select hashtag from today_hash
		where hashtag = '${req.body.tag1}');`;

    db.query(sql, (err, result) => {
        res.send(result);
    })
})

app.post('/api/result_create2', (req, res) => {
    const sql2 = `insert into today_hash (hashtag)
	select '${req.body.tag2}' from dual
    where not exists
    (select hashtag from today_hash
		where hashtag = '${req.body.tag2}');`;
    db.query(sql2, (err, result) => {
        res.send(result);
    })
})

app.post('/api/result_create3', (req, res) => {
    const sql3 = `insert into today_hash (hashtag)
	select '${req.body.tag3}' from dual
    where not exists
    (select hashtag from today_hash
		where hashtag = '${req.body.tag3}');`;

    db.query(sql3, (err, result) => {
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
    console.log(sql);
})

cron.schedule('00 12 1-31 * *', () => { // 매일 12시에 오늘의 칵테일 좋아요 업데이트
    console.log('test second');
    // db 업데이트 부분 코드작성
})

app.post('/api/comment', (req, res) => {
    const sql = `select * from comment where cocktail = '${req.body.name}';`;
    db.query(sql, (err, result) => {
        res.send(result);
        // console.log(result);
    })
})

app.post('/api/comment_post', (req, res) => {
    if(req.body.id != null){
        const sql = `insert into comment (cocktail, name, article, password) values ('${req.body.name}', '${req.body.id}','${req.body.comment_article}', '${req.body.pw}')`
    
        db.query(sql, (err, result) => {
            res.send(result);
        })
    }
})


