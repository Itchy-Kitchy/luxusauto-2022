require('dotenv').config();
const express = require("express");
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const path = require("path");
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    host:process.env.HOST,
    port:process.env.PORT,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
});

// Azonosítás

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send({message: "Azonosítás szükséges!"});
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
        if (error) {
            return res.status(403).send({message: "Nincs jogosultsága!"});
        }
        req.user = user;
        next();
    });
}

// Regisztráció

app.post('/api/users', (req, res) => {
    const usernamecheck = "SELECT username FROM users WHERE username=?";
    const newuser = "INSERT INTO users (username, userpassword, useremail) VALUES (?, ?, ?)";
    pool.query(usernamecheck, [req.body.newusername],
        function (error, results) {
            if (results[0] && !error) {
                return res.status(400).send({message: "Van már ilyen nevű felhasználó!"});
            }
            else if (error) {
                return res.status(400).send({message: error});
            }
            else {
                const newuserhash = bcrypt.hashSync(req.body.newuserpassword, 10);
                pool.query(newuser, [req.body.newusername, newuserhash, req.body.newuseremail],
                    function(error) {
                        if (!error) {
                            return res.status(201).send({message: "Sikeres regisztráció!"});
                        } 
                        else {
                            return res.status(500).send({message: error});
                        }
                    }
                );
            }
        }
    );
});

// Bejelentkezés

app.post('/api/login', (req, res) => {
    const getuser = "SELECT * FROM users WHERE username=?"
    let token = "";
    pool.query(getuser, [req.body.myusername],
        function (error, results) {
            if (results[0] && !error) {
                if (bcrypt.compareSync(req.body.myuserpassword, results[0].userpassword)) {
                    token = jwt.sign({
                        username:req.body.myusername, 
                        userpassword:results[0].myuserpassword, 
                        useremail:results[0].useremail
                        },
                        process.env.TOKEN_SECRET, 
                        { expiresIn: 3600 }
                    );
                    return res.status(200).json({
                        token: token,
                        useremail:results[0].useremail, 
                        message: "Sikeres bejelentkezés!"
                    });
                }
                else {
                    return res.status(400).send({message: "Hibás jelszó!"});
                }
            }
            else {
                return res.status(500).send({message: error});
            }
        }
    );
});

// Minden autó

app.get('/api/allcars', (req, res) => {
    const getallcars = "SELECT * FROM cars";
    pool.query(getallcars,
        function (error, results) {
            if (!results[0]) {
                return res.status(204).send({message: "Nincs még rendelhető autónk"});
            }
            else if (!error) {
                return res.status(200).send(results);
            }
            else {
                return res.status(500).send({message: error});
            }
        }
    );
});

// Elérhető autók

app.get('/api/cars', (req, res) => {
    const getavailablecars = "SELECT * FROM cars WHERE available=1";
    pool.query(getavailablecars,
        function (error, results) {
            if (!results[0]) {
                return res.status(204).send({message: "Nincs jelenleg elérhető autónk!"});
            }
            else if (!error) {
                return res.status(200).send(results);
            }
            else {
                return res.status(500).send({message: error});
            }
        }
    );
});

// Konkrét autó

app.get('/api/cars/:lplate', (req, res) => {
    const getcar = "SELECT * FROM cars WHERE lplate =?";
    pool.query(getcar, [req.params.lplate],
        function (error, results) {
            if (!results[0]) {
                return res.status(204).send({message: "Ez az autó nem elérhető!"});
            }
            else if (!error) {
                return res.status(200).send(results);
            }
            else {
                return res.status(500).send({message: error});
            }
        }
    );
});

// Autó bérlése

app.post('/api/cars/:lplate', authenticateToken,  (req, res) => {
    const rentcar = "INSERT INTO rents (lplate, useremail, startdate, enddate, firstname, lastname) VALUES (?, ?, ?, ?, ?, ?)";
    const setcarunavailable = "UPDATE cars SET available = 0 WHERE lplate=?";
    pool.query(
        rentcar, [
        req.params.lplate,
        req.body.useremail,
        req.body.startdate,
        req.body.enddate,
        req.body.firstname,
        req.body.lastname
        ],
        function (error, results) {
            if (!error) {
                pool.query(setcarunavailable, [req.params.lplate],
                    function (error, results) {
                        if (!error) {
                            return res.status(201).send({message: "Sikeres bérlés!"});
                        }
                        else {
                            return res.status(500).send({message: error});
                        }
                    }
                );
            }
            else {
                return res.status(500).send({message: error});
            }
        }
    );
});

// Admin belépés

app.post('/api/admin', (req, res) => {
    const adminpassword = "teslaisbest";
    if (req.body.adminpassword == adminpassword) {
        return res.status(200).send({message: "ok"});
    }
    else {
        return res.status(400).send({message: "Hibás jelszó!"});
    }
});

// Bérlések

app.get('/api/admin/rents', (req, res) => {
    const getrents = "SELECT * FROM rents";
    pool.query(getrents,
        function (error, results) {
            if (!results[0]) {
                return res.status(204).send({message: "Nincs még feladott rendelés!"});
            }
            else if (!error) {
                return res.status(200).send(results);
            }
            else {
                return res.status(500).send({message: error});
            }
        }
    );
});

// Konkrét bérlés

app.get('/api/admin/rents/:email', (req, res) => {
    const getrent = "SELECT * FROM rents WHERE useremail=?";
    pool.query(getrent, [req.params.email],
        function (error, results) {
            if (!results[0]) {
                return res.status(204).send({message: "Nincs ezzel az email címmel bérlés!"});
            }
            else if (!error) {
                return res.status(200).send(results);
            }
            else {
                return res.status(500).send({message: error});
            }
        }
    );
});

// Bérlés törlése, módosítása

app.post('/api/admin/rents/:lplate', (req, res) => {
    const setcaravailable = "UPDATE cars SET available=1 WHERE lplate=?";
    pool.query(setcaravailable, [req.params.lplate],
        function (error, results) {
            if (!error) {
                return res.status(200).send({message: "Az " + req.params.lplate + " rendszámú autó most már elérhető!"});
            }
            else {
                return res.status(500).send({message: error});
            }
        }
    );
});

app.put('/api/admin/rents/:lplate', (req, res) => {
    const updaterent = "UPDATE rents SET useremail=?, startdate=?, enddate=?, firstname=?, lastname=? WHERE lplate=?";
    pool.query(updaterent, [req.body.useremail, req.body.startdate, req.body.enddate, req.body.firstname, req.body.lastname, req.params.lplate],
        function (error) {
            if (!error) {
                return res.status(200).send({message: "Rendelés módosítva!"});
            }
            else {
                return res.status(500).send({message: error});
            }
        }
    );
});

app.delete('/api/admin/rents/:lplate', (req, res) => {
    const delrent = "DELETE FROM rents WHERE lplate=?";
    pool.query(delrent, [req.params.lplate],
        function (error) {
            if (!error) {
                return res.status(200).send({message: "Rendelés törölve!"});
            }
            else {
                return res.status(500).send({message: error});
            }
        }
    );
});

app.listen(8080, () => console.log("Szerver elindítva a 8080-as porton."));
