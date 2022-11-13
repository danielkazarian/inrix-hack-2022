import fetch from 'node-fetch';

const MapBoxAccessToken = 'pk.eyJ1IjoiZGFuaWVsa2F6YXJpYW4iLCJhIjoiY2xhZWx1b2phMGF3NTNxbzVtZ3kybXA0aCJ9.mgVtnNOz8WaEgGlqxSs7Mw'

const locationToCoordinates = async (location) => {
    const encodedLocation = location.replace(' ', '%20')
    console.log(encodedLocation)

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedLocation}.json?access_token=${MapBoxAccessToken}`
    
    const requestOptions = {
        method: "GET",
    }

    const response = await fetch(url, requestOptions)
    const data = await response.json()
    console.log("data['features']: ", data.features)

    const locations = data.features
    return data
}

export {locationToCoordinates}