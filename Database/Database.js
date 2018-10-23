
const mysql = require('mysql');
const cors = require('cors');
const express = require('express');
const app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'pacmandb',
    multipleStatements: true
});
connection.connect((err) => {
    if (!err)
        console.log('conx avec la base reussite.');
    else
        console.log('Connexion avec la base est échouée \n Error : ' + JSON.stringify(err, undefined, 2));
});
module.exports.connection = connection;
