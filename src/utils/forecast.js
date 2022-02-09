const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + encodeURIComponent(latitude) + '&lon=' + encodeURIComponent(longitude) + '&appid=67dda0d219bfd76efe63e578ff0a18c2&units=metric'
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!');
        } else if (body.message) {
            callback('Unable to find location');
        } else {
            callback(undefined, body.weather[0].main + '.Current temperature is ' + body.main.temp);
        }
    })
}

module.exports = forecast