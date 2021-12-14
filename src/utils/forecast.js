const request = require('request');

forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=d406215031db79fd247f0fa3a334d0f7&query=${latitude},${longitude}`;
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("unable to connect to weather service", undefined);
        } else if (body.error) {
            callback("unable to find location", undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0]);
        }
    })
};

module.exports = forecast