import fetch from 'node-fetch';
// require("dotenv").config();

const getLots = async (latitude, longitude, radius, accessToken) => {
    let meterRadius = Math.round(radius * 1609.34)

    const url = `https://api.iq.inrix.com/lots/v3?point=${latitude}%7C${longitude}&radius=${meterRadius}`;

    const requestOptions = {
        method: "GET",
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
        }
    }
    
    const response = await fetch(url, requestOptions)
    const data = await response.json()
    console.log("lots data: ", data)

    // .then((response) => response.json())
    // .then(function(data) {
    let lotsData = [];
    if (data['result'].length > 5) {

        for (let i = 0; i < data['result'].length; ++i) {
            let probabilities = [];
            probabilities.push(data['result'][i]['occupancy']['probability']);
            let topValues = [...probabilities].sort((a,b) => b-a).slice(0,5); 

            if (topValues.includes(data['result'][i]['occupancy']['probability']) && Object.keys(lotsData).length < 5) {
                lotsData.push({
                    name: data['result'][i]['name'],
                        data: {
                            occupancy: data['result'][i]['occupancy'],
                            hours: data['result'][i]['hrs'],
                            hourlyRate: data['result'][i]['rateCard'][0],
                            paymentMethods: data['result'][i]['pmtTypes'], 
                            navigationAddress: data['result'][i]['navigationAddress'],
                            coordinates: {
                                longitude: data['result'][i]['point']['coordinates'][0],
                                latitude: data['result'][i]['point']['coordinates'][1],
                            }                    
                        }
                    }
                )
            }
        }
        console.log(lotsData);
        return lotsData;

    } else if (data['result'].length === 0) {
        console.log('Unfortunately, there are no parking lots near this location.');
        // return 'Unfortunately, there are no parking lots near this location.';
        return null
    } else {
        for (let i = 0; i < data['result'].length; ++i) {
            console.log(data['result'][i]['occupancy']['probability']);

            lotsData.push({
                name: data['result'][i]['name'],
                    data: {
                        probability: data['result'][i]['occupancy']['probability'],
                        hours: data['result'][i]['hrs'],
                        hourlyRate: data['result'][i]['rateCard'][0],
                        paymentMethods: data['result'][i]['pmtTypes'], 
                        navigationAddress: data['result'][i]['navigationAddress'],
                        coordinates: {
                            longitude: data['result'][i]['point']['coordinates'][0],
                            latitude: data['result'][i]['point']['coordinates'][1],
                        }                    
                    }
                }
            )
        }
        console.log(lotsData);
        return lotsData;
    }
    // });
}

export { getLots };