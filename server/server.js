const express = require('express'); // express 연결
const app = express();
const mysql = require('mysql');     // mysql 연동을 위한 모듈
// const bodyParser;
const cors = require('cors');       // 교차 출처 리소스 공유

const cron = require('node-cron');

const db = mysql.createPool({       // 데이터베이스 연동
    host: "localhost",
    user: "root",
    password: "1234",
    database: "cocktail_db"
});

app.use(express.json());
app.use(cors());

// const PORT = process.env.PORT || 5000;
const PORT = 5000;                  // 포트 넘버 5000번 사용

app.get("/api/get", (req, res) => { // HTTP 통신을 사용해 db에 접근
    const sqlQuery = "SELECT * FROM cocktail";
    db.query(sqlQuery, (err, result) => { // sql문을 전송해서 결과값을 받아온다
        res.send(result);           // 결과를 프론트단으로 보내준다
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
    const sql = `select hash1, hash2, hash3 from cocktail 
    where hash1 = '${req.body.tag1}' or hash2 = '${req.body.tag1}' or hash3 = '${req.body.tag1}'`
    db.query(sql, (err, result) => {    // 이전 페이지에서 선택한 태그가 포함된
        res.send(result);               // 칵테일들의 태그를 검색한다
        console.log(result);
    })
})

app.post("/api/landing3", (req, res) => {
    const sql = `select hash1, hash2, hash3 from cocktail where (hash1 = '${req.body.tag1}' or hash2 = '${req.body.tag1}' or hash3 = '${req.body.tag1}') and (hash1 = '${req.body.tag2}' or hash2 = '${req.body.tag2}' or hash3 = '${req.body.tag2}')`
    db.query(sql, (err, result) => {
        res.send(result);
        console.log(result);
    })
})

app.post('/api/search_name', (req, res) => {
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
    console.log(req.body.tag2)
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
    db.query(sql, (err, result) => { // good 순으로 정렬한 뒤
        res.send(result);            // 프론트단으로 반환해준다
    })
    console.log(sql);
})
app.get('/api/homepage_rank', (req, res) => {
    const sql = "SELECT * from today_hash order by good DESC;";
    db.query(sql, (err, result) => {
        res.send(result);
    })
})

app.get('/api/recommend-cocktail', (req, res) => {
    const sql = "SELECT * from cocktail order by good DESC;";
    db.query(sql, (err, result) => {
        res.send(result);
    })
})

cron.schedule('00 12 1-31 * *', () => { // 매일 12시에 오늘의 칵테일 좋아요 업데이트
    const sql = "update today_hash set bad = 0, good = 0;"
    db.query(sql, (err, result) => {
        res.send(result);
    })
})

app.post('/api/comment', (req, res) => {
    const sql = `select * from comment where cocktail = '${req.body.name}';`;
    db.query(sql, (err, result) => {
        res.send(result);
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

app.post("/api/keyword", (req, res) => { // DisplayCocktail페이지 검색 서버코드
    const sql = `select * from cocktail where name like '%${req.body.searchname}%'`;
    db.query(sql, (err, result) => {     // like % 연산자를 활용해서 칵테일 이름으로
        res.send(result);                // 검색해준 결과를 리턴해준다
    })
})

