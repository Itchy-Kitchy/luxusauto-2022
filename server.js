const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require("mysql");
//*const Pool = require("mysql/lib/Pool");

const app = express();
const static = path.join(__dirname, 'static');

const autosPool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'luxus'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(static));

const port = 9001;

app.get('/', (req, res) => {
    res.sendfile(path.join(static, 'index.html'))
})

app.get('/cars', (req, res) => {
    const q = "SELECT * FROM auto";
    autosPool.query(q, (error, results) => {
        if (!error) {
            res.json(results)
        }
    });
})

app.post('/cars', (req, res) => {
    autosPool.getConnection((err, connection) => {
        if (err) throw err;
        const q = "INSERT INTO auto SET ?";
        autosPool.query(q, req.body,
            function (error, results) {
                autosPool.release();
                if (!error) {
                    res.send("done");
                }
                else {
                    console.log(error);
                }
            });
    })

})

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`)
})
