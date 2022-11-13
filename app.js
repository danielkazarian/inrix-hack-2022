const express = require('express');
const fetch = require("node-fetch");
const { response } = require('express');
const app = express();
const port = 8000;
app.set('json spaces', 2);

var lots = new Object();
var saveLotResult = new Object();

// to query, call: http://localhost:8000/findparkinglot?location=golden+gate+bridge&radius=3000

app.get('/findparkinglot', async function (req, res) {

    // geocode location 
    let location = req.query.location;
   // geocode location 
   let apiKey = '310a712682784f01889e4de0e211605f';
   let geocodeUrl = 'https://api.geoapify.com/v1/geocode/search?text=' + location + '&apiKey=' + apiKey;

   var requestOptions = {
       method: 'GET',
       // headers: {
       //     'Authorization': `Bearer ${bearerToken}`,
       // }
     };

    let geocode = await fetch(geocodeUrl, requestOptions);
    let gjson = await geocode.json();
    let longitude = gjson.features[0].properties.lon;
    let latitude = gjson.features[0].properties.lat;

    // res.json({
    //     lon: longitude,
    //     lat: latitude,
    // });
    
    // get bearer token
    //Set up URL to query
    let appId = "59qsor9vub";
    let hashToken = "NTlxc29yOXZ1Ynx0VVRzS3Q0Q2lRNHlxVGpmeVZ5cVJiWFVPc2p5dUU4NkVCcnQ5ajMz";
    let tokenUrl= `https://api.iq.inrix.com/auth/v1/appToken?appId=59qsor9vub&hashToken=NTlxc29yOXZ1Ynx0VVRzS3Q0Q2lRNHlxVGpmeVZ5cVJiWFVPc2p5dUU4NkVCcnQ5ajMz`;

    //Query INRIX for token

    let token = await fetch(tokenUrl, requestOptions);
    let tjson = await token.json();
    let output = tjson.result.token;

    // find parking lots
    let radius = req.query.radius;
    let lotUrl = 'https://api.iq.inrix.com/lots/v3?point=' + latitude + '%7C' + longitude + '&radius=' + radius;
    console.log(lotUrl);

    var myHeaders = new fetch.Headers();
    myHeaders.append("Authorization", 'Bearer ' + output);
    myHeaders.append("Cookie", "lang=en-US");

    var requestOptions2 = {
        method: 'GET',
        accept: 'application/json',
        headers: myHeaders,
        redirect: 'follow'
    };

    // fetch(lotUrl, requestOptions2)
    //     .then(response => response.text())
    //     .then(result => console.log(result))
    //     .catch(error => console.log('error', error));

    let lot = await fetch(lotUrl, requestOptions2);
    let ljson = await lot.json();

    let probabilities = [];
    for(i=0; i<ljson.count; i++)
    {

        probabilities.push(ljson.result[i].occupancy.probability);
    }
    
    let topValues = [...probabilities].sort((a,b) => b-a).slice(0,5);

    var count = 0;
    for(i=0; i< ljson.count; i++)
    {
        if(count > 5){
            break;
        }
        if (topValues.includes(ljson.result[i].occupancy.probability)){
            count++;
            lots[count] = new Object();
            lots[count]['name'] = ljson.result[i].name;
            lots[count]['space'] = ljson.result[i].spacesTotal;
            lots[count]['address'] = ljson.result[i].navigationAddress;
            lots[count]['hrs'] = ljson.result[i].hrs;
            lots[count]['lottype'] = ljson.result[i].lotCategory;
            lots[count]['rate'] = ljson.result[i].rateCard;
            lots[count]['occupancy'] = ljson.result[i].occupancy;
            lots[count]['distance'] = ljson.result[i].distance * 0.000621371;
            lots[count]['ev_charger'] = ljson.result[i].ev_chargers;
            lots[count]['polygon'] = ljson.result[i].polygon;
            lots[count]['isOpen'] = ljson.result[i].isOpen;
        }
    }

    res.json({
        lots,
    })
    
    saveLotResult = lots;
    lots = {};

    console.log(saveLotResult);
})

// to query, call: http://localhost:8000/findparkingblock?location=golden+gate+bridge&radius=3000

var blocks = new Object();
var saveBlockResult = new Object();

app.get('/findparkingblock', async function (req, res) {

    // geocode location 
    let location = req.query.location;
   // geocode location 
   let apiKey = '310a712682784f01889e4de0e211605f';
   let geocodeUrl = 'https://api.geoapify.com/v1/geocode/search?text=' + location + '&apiKey=' + apiKey;

   var requestOptions = {
       method: 'GET',
     };

    let geocode = await fetch(geocodeUrl, requestOptions);
    let gjson = await geocode.json();
    let longitude = gjson.features[0].properties.lon;
    let latitude = gjson.features[0].properties.lat;

    // get bearer token
    //Set up URL to query
    let appId = "59qsor9vub";
    let hashToken = "NTlxc29yOXZ1Ynx0VVRzS3Q0Q2lRNHlxVGpmeVZ5cVJiWFVPc2p5dUU4NkVCcnQ5ajMz";
    let tokenUrl= `https://api.iq.inrix.com/auth/v1/appToken?appId=59qsor9vub&hashToken=NTlxc29yOXZ1Ynx0VVRzS3Q0Q2lRNHlxVGpmeVZ5cVJiWFVPc2p5dUU4NkVCcnQ5ajMz`;

    //Query INRIX for token

    let token = await fetch(tokenUrl, requestOptions);
    let tjson = await token.json();
    let output = tjson.result.token;

    // find parking blocks
    let radius = req.query.radius;
    let lotUrl = 'https://api.iq.inrix.com/blocks/v3?point=' + latitude + '%7C' + longitude + '&radius=' + radius;
    console.log(lotUrl);

    var myHeaders = new fetch.Headers();
    myHeaders.append("Authorization", 'Bearer ' + output);
    myHeaders.append("Cookie", "lang=en-US");

    var requestOptions2 = {
        method: 'GET',
        accept: 'application/json',
        headers: myHeaders,
        redirect: 'follow'
    };

    let block = await fetch(lotUrl, requestOptions2);
    let bjson = await block.json();

    let probabilities = [];
    for(i=0; i<bjson.result.length; i++)
    {

        probabilities.push(bjson.result[i].probability);
    }
    
    let topValues = [...probabilities].sort((a,b) => b-a).slice(0,5);

    var count = 0;
    for(i=0; i< bjson.result.length; i++)
    {
        if(count > 5){
            break;
        }
        if (topValues.includes(bjson.result[i].probability)){
            count++;
            blocks[count] = new Object();
            blocks[count]['name'] = bjson.result[i].name;
            blocks[count]['probability'] = bjson.result[i].probability;
            
            for(j=0; j<bjson.result[i].segments.length; j++)
            {
                
                blocks[count]['segment'+j] = new Object();
                blocks[count]['segment'+j]['rate'] = bjson.result[i].segments[j].rateCards;
                blocks[count]['segment'+j]['space'] = bjson.result[i].segments[j].spacesTotal;
                blocks[count]['segment'+j]['polyline6'] = bjson.result[i].segments[j].polyline6;
                blocks[count]['segment'+j]['calculatedRate'] = bjson.result[i].segments[j].calculatedRates;
                blocks[count]['segment'+j]['isOpen'] = bjson.result[i].segments[j].isOpen;
            }
        }
    }

    res.json({
        blocks,
    })
    
    saveBlockResult = blocks;
    blocks = {};

    console.log(saveBlockResult);
})



//Starting server using listen function
app.listen(port, function () {
    console.log("Server has been started at " + port);
})