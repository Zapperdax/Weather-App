const express = require('express');
const geocode = require('./utils/geocode.js');
const path = require('path');
const hbs = require('hbs');
const app = express();

//port
const port = process.env.PORT || 2533;

//Defining Paths
const publicDirPath = path.join(__dirname, '../public');
const templatePath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Setting Handle Bars to specific path
app.set('view engine', 'hbs');
app.set('views', templatePath);
hbs.registerPartials(partialPath);

//Using A Public Path
app.use(express.static(publicDirPath));

app.get('/help', (req, res) => {
    res.render('help', { 
        title: 'Help',
        name: 'Tsukasa',
        headTitle: 'Help',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Tsukasa',
        headTitle: 'About'
    });
})

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Current Weather',
        name: 'Tsukasa',
        headTitle: 'Weather App'
    });
});


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        });
    }
    geocode(req.query.address, (err, {location, currentWeather, temperature, feels_like, humidity}= {})=> {
        if(err){
            return res.send({err});
        }
        res.send({
            location,
            currentWeather,
            temperature,
            feels_like,
            humidity
        });
    });
    // res.send({
    //     forecast: '50 Degrees',
    //     location: 'Rawalpindi',
    //     address: req.query.address
    // });
});

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You Must Provide a search item'
        });
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get ('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Page Error',
        name: 'Tsukasa',
        errorMessage: '404, Help Not Found',
        headTitle: 'Error Page'
    })
});

app.get ('*', (req, res) => {
    res.render('404', {
        title: 'Error Page',
        name: 'Tsukasa',
        errorMessage: '404 Not Found',
        headTitle: 'Error Page'
    })
});

app.listen(port, () => {
    console.log("Listening on port" + port);
});