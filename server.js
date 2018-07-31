const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

var data = [
    { title: "Najam Shehzad" },
    { title: "Alan Johnson" },
    { title: "Charles Jolley" }
];

var port = process.env.PORT || 8000;

app.set("view engine", "hbs");

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('GetYear', () => new Date().getFullYear());
hbs.registerHelper('ScreamIt', (text) => text.toUpperCase());
hbs.registerHelper('list', (array) => {
    var ul = '<ul>'
    for (var i = 0; i < array.length; i++) {
        ul += `<li>${array[i].title}</li> `
    }
    return ul + '</ul>'
});

app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;
    fs.appendFile('Server.log', log + '\n', err => {
        if (err) {
            console.log(err);
        }
    });
    if(1 < 0){
        res.render('off.hbs',{title:'Najam'});
    }
    else{
        next();
    }
});


app.get('/', (req, res) => {
    res.render('home.hbs', {
        title: 'The Social',
        info: 'Our Mission is To Connect people all over the World',
        year: new Date().getFullYear(),
        data
    })
});
app.get('/project', (req, res) => {
    res.render('project.hbs', {
        title: 'Project Page',
        info: 'Our Mission is To Connect people all over the World and This is Project Page',
        year: new Date().getFullYear(),
        data
    })
});
app.get('/about', (req, res) => {
    res.render('about.hbs', { title: 'About Page', year: new Date().getFullYear(), data });
});
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle the request'
    });
});


app.listen(port, () => {
    console.log(`Runing In Port ${port}`);
});