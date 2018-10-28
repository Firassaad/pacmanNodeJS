
//CE FICHIER CONTIRNT LES FONCTIONS DU CRUD (AJOUT / SUPPRESSION /MODIFICATION /RETOUR DES PACMANS
const mysql = require('mysql');
const cors = require('cors');
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
var database = require('../Database/database');
app.use(bodyparser.json());

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'pacmandb',
//     multipleStatements: true
// });
// connection.connect((err) => {
//     if (!err)
//         console.log('conx avec la base reussite.');
//     else
//         console.log('Connexion avec la base est échouée \n Error : ' + JSON.stringify(err, undefined, 2));
// });


app.listen(3000, () => console.log('Executé sur le  port num : 3000'));


//retourner tous les picman
app.get('/pacmans', cors(), (req, res) => {
    database.connection.query('SELECT * FROM pacmandb.pacmen', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});
//retourner un pacman par id
app.get('/pacmans/:id', cors(), (req, res) => {
    database.connection.query('SELECT * FROM pacmandb.pacmen WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});
//supprimer un pacman
app.delete('/pacmans/delete/:id',cors(), (req, res) => {
    connection.query('DELETE FROM pacmandb.pacmen WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});


//inserer un pacman
app.post('/pacmans/addModif', cors(), (req, res) => {
    let pac = req.body;
    var sql = "SET @ID = ?;SET @Age = ?;SET @Famille = ?;SET @Couleur = ?;SET @Nourriture = ?; \
    CALL pacmanAddOrEdit(@ID,@Age,@Famille,@Couleur ,@Nourriture);";

    database.connection.query(sql, [pac.ID, pac.Age, pac.Famille, pac.Couleur , pac.Nourriture], (err, rows, fields) => {
            if (!err)
                rows.forEach(element => {
                    if(element.constructor == Array)
                        res.send('pacman inseré id : '+element[0].ID);
                });
            else
            console.log(err);
    })
});

