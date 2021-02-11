const axios = require('axios');

const getSpotifyLink = async (url, token) => {
    console.log(url)
    console.log(token)
    let response;
    try {
        response = await axios.get(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    } catch (error_description) {
        throw new Error('The API returned an error: ' + error_description);
    }
    let searchResults = response.data.tracks.items[0]
    return searchResults ? response.data.tracks.items[0].external_urls.spotify : '';
}

module.exports = getSpotifyLink;