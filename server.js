const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}, ${req.method}, ${req.url}`;

    console.log(log);
    fs.appendFile('log.txt', log + '\n', (err) => {
        if (err) {
            console.log(err);
        }
    })
    next();
});

app.use((req, res, next) => {
   res.render('update.hbs', {
       title: 'site update', 
       welcomeMessage: 'naprawa czekajcie', 
       h1: 'remont'
   })
});

hbs.registerHelper('getYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIT', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        title: 'home page titlelelele',
        welcomeMessage: "widajcie na stronie",
        h1: 'h1 nazwa'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'about titlelelele',
        h1: 'about'
    });
})

app.listen(port, () => {
    console.log('server start' + port);
});