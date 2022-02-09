const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.openweathermap.org/geo/1.0/direct?q=' + encodeURIComponent(address) + '&limit=1&appid=67dda0d219bfd76efe63e578ff0a18c2'
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.length === 0) {
            callback('Location can not be found!', undefined);
        } else {
            callback(undefined, {
                latitude: body[0].lat,
                longitude: body[0].lon,
                location: (address + "," + body[0].country).toUpperCase()
            });
        }
    })
}

module.exports = geocode