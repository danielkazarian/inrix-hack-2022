const fetch = require('node-fetch');
require("dotenv").config();

function lots(latitude, longitude, radius) {
    fetch(`https://api.iq.inrix.com/lots/v3?point=${latitude}%7C${longitude}&radius=${radius}`);
}

