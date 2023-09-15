const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(__dirname + '/Public'));
app.use(express.static(__dirname + '/Public/css'));
app.use(express.static(__dirname + '/Public/images'));

const Mobs = require('./Mobs.json');

app.set('view engine', 'ejs');
app.set('views', './View');

// Use bodyParser.json() for parsing JSON data for all requests
app.use(bodyParser.json());

// Use bodyParser.urlencoded() for parsing URL-encoded data for all requests
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('mobs', { Mobs: Mobs });
});

app.get('/Mobs', (req, res) => {
    // You can access query parameters directly for GET requests
    const searchName = String(req.query.Name).toLowerCase();
    console.log(searchName)
    if (!searchName) {
        res.redirect('/');
    } else {
        const Mob = Mobs.filter(e => e.name.toLowerCase() === searchName);
        console.log(Mob)
        if(Mob === []){
            res.redirect('/');
        }
        res.render('mobs', { Mobs: Mob });
    }
});

// app.get('/Mobs/*', (req, res))



app.listen(3000, () => {
    console.log('Server is running right now on: http://localhost:3000');
});

  
