var express = require('express');
var users = express.Router();
const app = express();
const bodyparser = require('body-parser');
var Sequelize = require('sequelize');
var database = require('../Database/database');
var cors = require('cors')
var jwt = require('jsonwebtoken');
// var token;

app.listen(3000, () => console.log('Executé sur le  port num : 3000'));
app.use(cors());
app.use(bodyparser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
process.env.SECRET_KEY = "devesh";


app.post('/register', function (req, res) {

    var today = new Date();
    var appData = {
        "error": 1,
        "data": ""
    };
    var userData = {
        // "id": 17,
        // "first_name": req.body.first_name,
        // "last_name": req.body.last_name,
        // "email": req.body.email,
        // "password": req.body.password,
        // "created": today

        "first_name": "test",
        "last_name": "test",
        "email": "test",
        "password": "test",
        "created": today
    }
    console.log("registre");
    database.connection.query('INSERT INTO pacmandb.users SET ?', userData, function (err, rows, fields) {
            appData["data"] = "User registered successfully!";

        if (!err)
            res.send('registred successfully.');
        else
            console.log(err);
    });

});


app.post('/login', function (req, res) {

    var appData = {};
    // var email = req.body.email;
    // var password = req.body.password;
    var email = "test";
    var password = "test";

    database.connection.query('SELECT * FROM users WHERE email = ?', [email], function (err, rows, fields) {
        if (err) {
            appData.error = 1;
            appData["data"] = "Error Occured!";
            res.status(400).json(appData);
        } else {
            if (rows.length > 0) {
                if (rows[0].password == password) {
                    const token = jwt.sign(rows[0], process.env.SECRET_KEY, {
                        expiresIn: 604800 // 1 week
                    });
                    // let token = jwt.sign(rows[0], process.env.SECRET_KEY, {
                    //     expiresIn: 1440
                    // });
                    appData.error = 0;
                    appData["token"] = token;
                    res.status(200).json(appData);
                } else {
                    appData.error = 1;
                    appData["data"] = "Email and Password does not match";
                    res.status(204).json(appData);
                }
            } else {
                appData.error = 1;
                appData["data"] = "Email does not exists!";
                res.status(204).json(appData);
            }
        }
    });

});

app.use(function (req, res, next) {
    headers('Content-Type: application/json');
    var token = req.body.token || req.headers['token'];
    var appData = {};
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, function (err) {
            if (err) {
                appData["error"] = 1;
                appData["data"] = "Token is invalid";
                res.status(500).json(appData);
            } else {
                next();
            }
        });
    } else {
        appData["error"] = 1;
        appData["data"] = "Please send a token";
        res.status(403).json(appData);
    }
});
app.get('/users', (req, res) => {
    database.connection.query('SELECT * FROM pacmandb.users', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});
app.get('/getUsers', function (req, res) {

    var appData = {};
    database.connection.query('SELECT *FROM pacmandb.users', function (err, rows, fields) {
        if (!err) {
            appData["error"] = 0;
            appData["data"] = rows;
            res.status(200).json(appData);
        } else {
            appData["data"] = "No data found";
            res.status(204).json(appData);
        }
    });
});

module.exports = users;