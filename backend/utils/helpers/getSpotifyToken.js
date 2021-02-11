const axios = require('axios');

const getSpotifyToken = async () => {
    let response;
    try {
        response = await axios.post(`https://accounts.spotify.com/api/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`);
    } catch (error) {
        throw new Error('The API returned an error: ' + error);
    }
    let token = response.data.access_token;
    return token;
}

module.exports = getSpotifyToken;