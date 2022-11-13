
const fetch = require('node-fetch');
require("dotenv").config();

const lots = (latitude, longitude, radius, accessToken) => {
    let meterRadius = Math.round(radius * 1609.34)

    const url = `https://api.iq.inrix.com/lots/v3?point=${latitude}%7C${longitude}&radius=${meterRadius}`;

    const requestOptions = {
        method: "GET",
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
        }
    }

    const response = fetch(url, requestOptions)
    .then((response) => response.json())
    .then(function(data) {
        let lotsData = {};
        if (data['result'].length > 5) {
            for (let i = 0; i < data['result'].length; ++i) {
                let probabilities = [];
                probabilities.push(data['result'][i]['occupancy']['probability']);
                let topValues = [...probabilities].sort((a,b) => b-a).slice(0,5); 
                if (topValues.includes(data['result'][i]['occupancy']['probability']) && Object.keys(lotsData).length < 5) {
                    lotsData[data['result'][i]['name']] = 
                    [
                        data['result'][i]['occupancy']['probability'],
                        data['result'][i]['hrs'],
                        data['result'][i]['rateCard'][0],
                        data['result'][i]['pmtTypes'], 
                        data['result'][i]['buildingAddress'],
                        data['result'][i]['point']['coordinates'],                        
                    ];
                }
            }
            console.log(lotsData);
            return lotsData;
        } else {
            for (let i = 0; i < data['result'].length; ++i) {
                console.log(data['result'][i]['occupancy']['probability']);
                lotsData[data['result'][i]['name']] = 
                [
                    data['result'][i]['occupancy']['probability'],
                    data['result'][i]['hrs'],
                    data['result'][i]['rateCard'][0],
                    data['result'][i]['pmtTypes'], 
                    data['result'][i]['buildingAddress'],
                    data['result'][i]['point']['coordinates'],                        
                ];
            }
            console.log(lotsData);
            return lotsData;
        }
    });
}

module.exports = { lots };
