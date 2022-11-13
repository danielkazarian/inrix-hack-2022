const fetch = require('node-fetch');

const mapboxAccessToken = 'pk.eyJ1IjoiZGFuaWVsa2F6YXJpYW4iLCJhIjoiY2xhZWx1b2phMGF3NTNxbzVtZ3kybXA0aCJ9.mgVtnNOz8WaEgGlqxSs7Mw';

function geoCode(location) {
    let encodedLocation = location.replace(' ', '%20');

    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedLocation}.json?access_token=${mapboxAccessToken}`)
    .then((response) => response.json())
    .then(data => console.log(data['features'][0]['geometry']['coordinates']));
}

module.exports = { geoCode };
