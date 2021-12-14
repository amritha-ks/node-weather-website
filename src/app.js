const path = require('path'); //part of nodes core module
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000; // exists when in prod

// app.com
// app.com/help
// app.com/about

//serving up directory
// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


//setup handle bar engine and views location
app.set('view engine', 'hbs'); //to setup handlbars...dynamic template
app.set('views', viewsPath); // change the path if the directory name is not view bcz express by default check for view directory
hbs.registerPartials(partialsPath);


//setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {   //render handlebar templates
        title: 'Weather',   // passing data to html
        name: 'Amritha'
    });
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Amritha'
    });
})
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'help msg',
        title: 'Help',
        name: 'Amritha'
    });
})

app.get('/weather', (req, res) => {
    if (req && req.query && !req.query.address) {
        return res.send({
            error: "Address must be provided"
        });
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            });

        })

    })

})

app.get('/products', (req, res) => {
    if (req && req.query && !req.query.search) {
        console.log(req.query.search)
        return res.send({
            error: "must provide search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })


})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Amritha',
        errorMessage: 'Help article not found'
    });
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Amritha',
        errorMessage: 'Page not found'
    });
})


//no long needed since index.html is served up by express
// app.get('', (req, res) => {
//     res.send('<h2>heloo express</h2>');
// })

// app.get('/help', (req, res) => {
//     res.send([{ name: "a" }, { name: "b" }]);
// })

// app.get('/about', (req, res) => {
//     res.send('about express');
// })

// app.get('/weather', (req, res) => {
//     res.send('your weather');
// })

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})//starts up the server