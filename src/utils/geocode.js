const request = require('request');

const geocode = (address, callback) => {
    // encodeURIComponent() if there are any special charcters
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYW1yaXRoYWsyNyIsImEiOiJja3gxZmU1enUwcG55MnFxbGE1bDc2b3ZvIn0.RT0JF08cUV9aqVqmgsMpFw`;
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('unable to connect to map box service', undefined);
        } else if (body && (!body.features || body.features.length === 0)) {
            callback('Address not found', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    })

}

module.exports = geocode;