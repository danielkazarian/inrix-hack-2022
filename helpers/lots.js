
const fetch = require('node-fetch');
require("dotenv").config();

const lots = async (latitude, longitude, radius, accessToken) => {
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

        } else if (data['result'].length === 0) {
            console.log('Unfortunately, there are no parking lots near this location.');
            return 'Unfortunately, there are no parking lots near this location.';

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

export { lots };
// lots('37.774358', '-122.446225', 0.5, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6IjljdTBjczBmbGkiLCJ0b2tlbiI6eyJpdiI6IjYwNzcxYjk3MTNlYTdmMjdhZWRmOTY3MmU4MmJkMTZkIiwiY29udGVudCI6IjRkYjk3NGFlZDkzYTE4YTIxN2I1YjM2YjkwNGUxNmQ4NWFkMzc1YTQ4YjQ1NmZhN2YxZTcxMGJhYmMzNGY0OTE2MDg4N2RhYzJjMDFmNjhkMTYyZWEzMDFmMzQ2YTEwMmY0NWVkOGM0ODc4MWFmYTA4NjJlM2JhMTc3NmM5MzM1Yjk1ODNhNzg5MzNjNDcyYzlhNjlkNmQ0NjU2ZTAyMTBlYTQ0YzhkOWQzYzIzN2MyMzE2YTA4NDc2ZDI0NWVjMzYzMmEzNzc4NWE3ZTJkOTNhZDhiM2ExYmQzYjg3YWY2MDRlYTlhYWNkMTIwNmM1ZDhkMGRlOWYyODEyOTA3NTRjODJlMGFhYTUyNmEzNDNhZWU2MjY0OTliNjRiMGFiNWQ3MjIwNzBiMjBhNTM4NDZjODNkN2Q1MjUzN2MxNDNhOTY3YTAzODYzNzJlYTc0ZmEwYWQzYTQ1NmZiYmVlZDJkYWU2NGVkYzE1MTE5YTRkNDBjNTZhOWRhYmVlMjZjODIyMTUyYzQ4MTY1ODVkNDg5OTlhNmRiZTNkNzRmNzE3NzJkODk3YzgwZWMzNmRhYjRhNWMwY2NkMzZmYzk1M2UyOWEzZWUxZmU5OTU0Mzc0M2M2OTBlNDRiZDRhNTJiNDJjYzgwODFkN2I1OGMwZDUzMTYxMjQ4YjkwMDVhNDFjOTRiYzQ2OGNmMDViZDBiN2ZjYmIxYTdjMWRhYzE3ZDA4NzA2YTk0NzU4Mjg0MDI2M2MxZmQ1M2Q1NjNhZWZkNzQ1ODljYTBhNjUxYjg5MjBlNGUzMjNkNDI1MDI4YzNiZDMxMzJmYTE0NmZjZjE5MzNmM2UwNzQxMzI2YTM3MjQ3YmM5NTNmNmEzMGU3ZjY4ZmFkZjBiIn0sInNlY3VyaXR5VG9rZW4iOnsiaXYiOiI2MDc3MWI5NzEzZWE3ZjI3YWVkZjk2NzJlODJiZDE2ZCIsImNvbnRlbnQiOiIxMDgyNGFiN2Q4MzUwMjhlMmRiNGMwNmFiNDc1NmRiYjIyZDMwOWVlOTc2MDBlZThhNTlkMzNkOTg3MTVhZWFmNDBmZTA1YzQ0ZDVjZTViNjFmMDJiMjNmIn0sImp0aSI6IjVhYWNmZDQ5LTdlZGUtNGMyOC1iZDVlLWJlZDU5YjI0MTJkNyIsImlhdCI6MTY2ODMxNjc3MCwiZXhwIjoxNjY4MzIwMzY5fQ.yMXYnNEBI7ROtbEDmpfDd6mdw9gmRWeAn6-N9IwyQY8');
