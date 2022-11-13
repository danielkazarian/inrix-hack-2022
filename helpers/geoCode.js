
const fetch = require('node-fetch');
require("dotenv").config();

let mapboxAccessToken = "pk.eyJ1IjoiZGFuaWVsa2F6YXJpYW4iLCJhIjoiY2xhZWx1b2phMGF3NTNxbzVtZ3kybXA0aCJ9.mgVtnNOz8WaEgGlqxSs7Mw";

function geoCode(location) {
    let encodedLocation = location.replace(' ', '%20');

    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedLocation}.json?access_token=${mapboxAccessToken}`, {
        method: "GET",
    })
    .then((response) => response.json())
    .then(function(data) {
        [longitude, latitude] = data['features'][0]['geometry']['coordinates'];

        return {
            longitude: longitude,
            latitude: latitude
        }
        console.log(x);

    });
}

export { geoCode };
