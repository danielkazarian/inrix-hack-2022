
const fetch = require('node-fetch');
require("dotenv").config();

const blocks = async (latitude, longitude, radius, accessToken) => {
    let meterRadius = Math.round(radius * 1609.34)

    const url = `https://api.iq.inrix.com/blocks/v3?point=${latitude}%7C${longitude}&radius=${meterRadius}`;

    const requestOptions = {
        method: "GET",
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
        }
    }

    const response = await fetch(url, requestOptions)
    .then((response) => response.json())
    .then(function(data) {
        let blocksData = {};
        if (Object(data['result']).length > 5) {
            let probabilities = [];

            for (let i = 0; i < Object(data['result']).length; ++i) {
                if (data['result'][i]['segments']['rateCards'] !== "No Parking") {
                    probabilities.push(data['result'][i]['probability']);
                }
            }

            let topValues = [...probabilities].sort((a,b) => b-a).slice(0,5); 

            for (let i = 0; i < Object(data['result']).length; ++i) {
                if ( (topValues.includes(data['result'][i]['probability'])) && (Object.keys(blocksData).length < 5) ) {
                    blocksData[data['result'][i]['name']] = 
                    {
                        'probability': data['result'][i]['probability'],
                        'coordinates-1': data['result'][i]['geojson']['coordinates'][0],
                        'coordinates-2': data['result'][i]['geojson']['coordinates'][1],
                        'coordinates-3': data['result'][i]['geojson']['coordinates'][2]
                    }
                }
            }
            console.log(blocksData);
            return blocksData;
        
        } else if (Object(data['result']).length === 0) {
            console.log('Unfortunately, there are no streets near this location.');
            return null;

        } else {
            for (let i = 0; i < Object(data['result']).length; ++i) {
                blocksData[data['result'][i]['name']] = 
                {
                    'probability': data['result'][i]['probability'],
                    'coordinates-1': data['result'][i]['geojson']['coordinates'][0],
                    'coordinates-2': data['result'][i]['geojson']['coordinates'][1],
                    'coordinates-3': data['result'][i]['geojson']['coordinates'][2]
                }
        }
            console.log(blocksData);
            return blocksData;
        }



    })
}
 
export { blocks };
// blocks('37.774358', '-122.446225', 0.5, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6IjljdTBjczBmbGkiLCJ0b2tlbiI6eyJpdiI6ImY0YzJmNjkzNjQwZDRiYzQ5N2FkY2M4YzcyNTgxYTNlIiwiY29udGVudCI6IjIxZTA3ZTg3OTg2OGUxYzAwYmM2MjNmZjE2OTY4NDk1MDE5MTQ3Y2Q0Mzc0Nzc0OGZiMzVjYTczNmIwOGE2NWU3MWI0ZjdlOTc1ZjM5ODU2MzE3NGYyY2NhOTUyMGJiMTZiYzc1ZmU3NWNhNWNmMDRiOTMzMWVlYjU5MjY4OWE3YzI1ODRkNTdhZmFmZTNkZTExN2NlODgxYTAyYWIzMjdjNmE0NjllYjJiZWY3ZWU2ZjE2NmY4ZjU4OWRkM2FiOWMwNDBiODhiZmQ0NWIzN2U2YWQyODhhMjEzN2ViODBjNTA3Y2MyNTkyZTZhMTI3NWVjZWFjNjAzNjc1MDk1YzcyNmY2ZDVlODZhYzhkNDNmNGEyOWViNjc4ZTUxMjJiMjUwZjJjOGRkZWFlODVhYTBiNDUyYWNhOTAwZDQxZDVkNjc1ZDE2MDEwNzQ3ZjJkZWE5NjhiZWYxYzZmNDcwYmE4YjA5MTU1NGQ2ZmU1M2JhNmUwMTVjMDM2ZjQyNDhjZDA1NzEyYjdhOTdlY2IxZmI5MzM2ZjI5ZThlNGM2NWI0MjcyZDRjNDQ3OWFiNjFkNGIzMzQzNmMxMjAzNTQyODViMTMyMDVhODUxOWViNzk1NWVmMGIzZWQxNzE4NzYzYzdiMmJkOGQwMzgxYzk2MWFjMTllMjI1ZGE5MDg0MDhhZTVjOTllNWY5OWEzZDQwYmZkOGMwODhjYzFhM2M3MWUyZjEyYzUwZTliNmIxMWQxZjMwZjQ4MTdhODgyNmRjMzZhMjRhZWQzNGFkYWZhNjY3ZDM3ODU5ZDYwODdjOGNlZDRjZWIzNTFhMmViZjQ2YWI5YjYxY2VkOTRiY2ViZjc2ODU5NmYzYjdkMTI3ZmE4NmMwNzdkIn0sInNlY3VyaXR5VG9rZW4iOnsiaXYiOiJmNGMyZjY5MzY0MGQ0YmM0OTdhZGNjOGM3MjU4MWEzZSIsImNvbnRlbnQiOiIwZmM5NWY4ZWQwNGJiYmM2MGM5YzI2ZWUyYzgwZTdmMjI5OTc0YWRiNDI1MjRjMzZjZDQ0ZDEyZTQxMTdiNTVjNjljZmY0YWEzMmZlZDk1NTE1NGZkOWYyIn0sImp0aSI6ImQ4NzE0NTNlLWYzNWItNDU1YS1iMjkyLTU1MDBiYTVkMTVlZiIsImlhdCI6MTY2ODMyOTgzMSwiZXhwIjoxNjY4MzMzNDMxfQ.C_EjjxkcKdgqTrxzTBgIy7ou549TlMB81fiZH3T_MCA');
