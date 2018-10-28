var express = require('express');
var users = express.Router();
const app = express();
const bodyparser = require('body-parser');
var Sequelize = require('sequelize');
var database = require('../Database/database');
var cors = require('cors')
var jwt = require('jsonwebtoken');
// var token;
const User = require('../model/user');
app.use(bodyparser.json())
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

        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "email": req.body.email,
        "password": req.body.password,
        "created": today


    }
    database.connection.query('INSERT INTO pacmandb.users SET ?', userData, function (err, rows, fields) {
            appData["data"] = "User registered successfully!";

        if (!err)
            res.send('registred successfully.');
        else
            console.log(err);
    });

});


// app.use(function (req, res, next) {
//     var token = req.body.token || req.headers['token'];
//     var appData = {};
//     if (token) {
//         jwt.verify(token, process.env.SECRET_KEY, function (err) {
//             if (err) {
//                 appData["error"] = 1;
//                 appData["data"] = "Token is invalid";
//                 res.status(500).json(appData);
//             } else {
//                 next();
//             }
//         });
//     } else {
//         appData["error"] = 1;
//         appData["data"] = "Please send a token";
//         res.status(403).json(appData);
//     }
// });
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

app.post('/login1',function(req,res){

    var email= req.body.email;
    var password = req.body.password;
    database.connection.query('SELECT * FROM pacmandb.users WHERE email = ?',[email], function (error, results, fields) {
        if (error) {
            // console.log("error ocurred",error);
            res.send({
                "code":400,
                "failed":"error ocurred"
            });
        }else{
            // console.log('The solution is: ', results);
            if(results.length >0){
                if(results[0].password == password){
                    res.send({
                        "code":200,
                        "success":"login sucessfull"
                    });
                }
                else{
                    res.send({
                        "code":204,
                        "success":"Email and password does not match"
                    });
                }
            }
            else{
                res.send({
                    "code":204,
                    "success":"Email does not exits"
                });
            }
        }
    });
});
module.exports = users;