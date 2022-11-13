const fetch = require('node-fetch');
require("dotenv").config();


function geoCode(location) {
    let encodedLocation = location.replace(' ', '%20');

    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedLocation}.json?access_token=${process.env.mapboxAccessToken}`)
    .then((response) => response.json())
    .then(function(data) {
        [longitude, latitude] = data['features'][0]['geometry']['coordinates'];

        return {
            longitude: longitude,
            latitude: latitude
        }

    });
}

module.exports = { geoCode };
