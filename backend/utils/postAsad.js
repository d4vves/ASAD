/* ----- DEPENDENCIES -----*/

const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const { gmail } = require('googleapis/build/src/apis/gmail');
const { release } = require('os');
const axios = require('axios');
require('dotenv').config();

/* ----- HELPER FUNCTIONS -----*/

const decodeString = require('./helpers/decodeString');
const getEmailContent = require('./helpers/getEmailContent');
const getSpotifyToken = require('./helpers/getSpotifyToken');

/*----- GMAIL AUTH -----*/

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'lib/token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Gmail API.
  authorize(JSON.parse(content), postAsad);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/*----- POST FUNCTION -----*/

async function postAsad(auth) {
    // gmail config
    const gmail = google.gmail({version: 'v1', auth});

    // get todays date and format it to resemble our email date header
    let today = new Date();
    let weekday = today.toLocaleDateString('en-US', { weekday: 'short' });
    let day = today.toLocaleDateString('en-US', { day: 'numeric' });
    let month = today.toLocaleDateString('en-US', { month: 'short' });
    let year = today.toLocaleDateString('en-US', { year: 'numeric' });
    let todaysDate = `${weekday}, ${day} ${month} ${year}`;

    // fetch recent email list
    gmail.users.messages.list({
      userId: 'me',
      labelIds: 'Label_4083780721970678911'
    }, async (error, response) => {
      if (error) throw new Error('The API returned an error: ' + error);
      let recentEmailList = response.data.messages;

      // map over recentEmailList
      recentEmailList.map(async recentEmail => {
        // filter emailList by threadId
        let emailThread = recentEmailList.filter(email => email.threadId === recentEmail.threadId);

        // grab id of origin email in thread
        let originEmailId = emailThread[emailThread.length - 1].id;

        // get origin email
        let originEmail = await getEmailContent(gmail, originEmailId);

        // get headers
        let headers = originEmail.data.payload.headers;

        // get date email was sent
        let dateHeader = headers.filter(header => header.name === 'Date');
        let emailDate = dateHeader[0].value.slice(0, 16);

        // if the email was sent today, then it's the one we're looking for!
        if (todaysDate === emailDate) {
          // grab the catalogue number
          let subjectHeader = headers.filter(header => header.name === 'Subject');
          let catalogueNum = parseInt(subjectHeader[0].value.split(' ')[1]);
          // grab the beginning of the email body to extract variables
          let emailContent = originEmail.data.snippet;
          emailContent = decodeString(emailContent)
          console.log(emailContent)

          const artistNameRegex = /([^-]+[a-z])/
          let artistName = emailContent.match(artistNameRegex)[0]

          const songTitleRegex = /([^-]+\d{4})/
          let songTitleIdx = emailContent.match(songTitleRegex)[0]
          let songTitle = songTitleIdx.slice(1, songTitleIdx.length - 5)

          const releaseDateRegex = /\(\d{4}\)/
          let releaseDateIdx = emailContent.match(releaseDateRegex)[0];
          let releaseDate = parseInt(releaseDateIdx.slice(1, 5))

          console.log(artistName)
          console.log(songTitle)
          console.log(releaseDate)

          // get bearer token, then spotify link
          // let spotifyLink = await getSpotifyToken(artistName, songTitle);

          // POST
          // let newEntry = {
          //   catalogue_num: catalogueNum,
          //   artist: artistName,
          //   song: songTitle,
          //   release_date: releaseDate,
          //   spotify_link: spotifyLink
          // };

          // axios.post(`${process.env.SERVER_URL}/entry`, newEntry)
          //   .then(response => {
          //     console.log('POSTED')
          //   })
          //   .catch(error => console.error(error));
        };
      });
    });
  };