require('dotenv').config();
const express = require("express");
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const path = require("path");
const static = path.join(__dirname, "static");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname + '/static')));
// app.use(express.static(static));

const users = [];

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'fastluxury'
})

// Főoldal

app.get("/", (req, res) => {
    res.sendFile(path.join(static,"index.html"))
})

app.get("/cars", (req, res) => {
    res.sendFile(path.join(static,"cars.html"))
})

app.get("/car/:lplate", function (req, res) {
        res.sendFile(path.join(static,"car.html"))
});

app.get("/api/cars", function (req, res) {
    const q = "SELECT * FROM cars;";
    pool.query(q, 
        function (error, results) {
            if (!error) {
                res.json(results)
            }
        }
    );
});

app.get("/about", function (req, res) {
    res.sendFile(path.join(static,"about.html"))
});

// Admin felület

app.get("/admin", function (req, res) {
    res.sendFile(path.join(static,"admin.html"))
});

app.post("/admin", function (req, res) {
    const password = "teslaisbest";
    if (req.body.adminpass == password) {
        res.redirect("admin/rents")
    }
    else {
        res.send({message: "Hibás jelszó!"})
    }
});

app.get("/rents/:email", function (req, res) {
        res.sendFile(path.join(static, "rent.html")) 
});

app.get("/admin/rents", function (req, res) {
    res.sendFile(path.join(static, "rents.html"))
});

app.get("/api/admin/rents", function (req, res) {
    const q = "SELECT * FROM rents;"
    pool.query(q,
        function (error, results) {
            if (!error) {
                res.json(results)
            }
        }
    );
});

app.get("/api/admin/rents/:email", function (req, res) {
    const q = "SELECT * FROM rents WHERE email = ?;";
    pool.query(q, [req.params.email],
        function (error, results) {
            if (!error && results[0]) {
                res.json(results[0])
            }
        }    
    );
});

app.post("/rents/:email", function (req, res) {
    const q = "DELETE FROM rents WHERE email = ?";
    pool.query(q, [req.params.email],
        function (error, results) {
            if (!error) {
                res.redirect("/admin/rents")
            }
        }    
    );
});

// Felhasználók

app.get("/users", (req, res) => {
    res.sendFile(path.join(static,"users.html"))
});

app.get("/users/login", (req, res) => {
    res.sendFile(path.join(static,"login.html"))
});

// Regisztráció

app.post('/users', (req, res) => {
    const username = req.body.username;
    const userpassword = req.body.userpassword
    const user = users.find(user => user.name == username);
    if (user) return res.status(400).send("Van már ilyen nevű felhasználó!");

    const hash = bcrypt.hashSync(userpassword, 10);
    users.push({name: username, password: hash});
    res.redirect("/users/login");
});

// Bejelentkezés

app.post('/users/login', (req, res) => {
    const username = req.body.username;
    const userpassword = req.body.userpassword;
    const user = users.find(user => user.name == username);
    if (!user) return res.status(401).send("Nincs ilyen nevű felhasználó!");
    if (!bcrypt.compareSync(userpassword, user.password)) {
        return res.status(401).send("Hibás jelszó!");
    }
    const token = jwt.sign(user, process.env.TOKEN_SECRET, {expiresIn: 3600});
    res.redirect("/cars");
});

// Token ellenőrzés

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).send({message: "Azonosítás szükséges!"});
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send({message: "Nincs jogosultsága!"});
        req.user = user;
        next();
    });
}

app.get("/api/cars/:lplate", function (req, res) {
    const q = "SELECT * FROM cars WHERE lplate = ?;";
    pool.query(q, [req.params.lplate],
        function (error, results) {
            if (!error && results[0]) {
                res.json(results)
            }
        }
    );
});

app.post("/api/cars/:lplate", function (req, res) {
    const q = "INSERT INTO rents (lplate, email, startdate, fname, lname) VALUES (?, ?, ?, ?, ?)"
    pool.query(q, [req.params.lplate, req.body.email, req.body.startdate, req.body.fname, req.body.lname],
        function (error, results) {
            if (!error) {
                res.redirect("/cars");
            }
            else {
                res.send("Ez az autó jelenleg foglalt!");
            }
        }
    )
});

app.listen(8080 , () => console.log("Szerver elindítva az 8080-es porton."));