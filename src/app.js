const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000
const app = express()

// public folder path
app.use(express.static(path.join(__dirname, '../public')))

// setting hbs paths for views and partials
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

// routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
        name: 'rex'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'rex'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'rex'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided.'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                place: req.query.address
            })
        })
    })
})


app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: 'Help 404 Page',
        message: 'Help article not found',
        name: 'rex'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404 Page',
        message: 'Page not found.',
        name: 'rex'
    })
})

// listening to port 3000
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})