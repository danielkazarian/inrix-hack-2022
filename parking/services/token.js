import fetch from 'node-fetch'

const APP_ID = '9cu0cs0fli'
const HASH_TOK = 'OWN1MGNzMGZsaXxCUW5RVkJlWkRqMUR1ZkNXUVZEcjUxUzZTMkxkV2tGYzM4Z01aemRn'
let url = `https://api.iq.inrix.com/auth/v1/appToken?appId=${appId}&hashToken=${hashToken}`;
 
 
// app.get(port, function () {
//    console.log("Server has been started at " + port);
 
//    fetch( url, {
//        method: "GET"
//    })
//    .then((res) => res.json())
//    .then(function(data) {
//        console.log(data);
//    })
// });

const getBearerToken = async () => {
    const requestOptions = {
        method: GET,
    }

    const response = await fetch(url, requestOptions)
    const data = response.json()
    const bearerToken = data.result.token

    console.log(bearerToken)

    return bearerToken
}