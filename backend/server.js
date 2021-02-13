require('dotenv').config()
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const express = require('express');

const app = express();
app.use(bodyParser.json());

app.use(cors({
    origin: `${process.env.CLIENT_URL}`,
    optionsSuccessStatus: 200,
}));

app.get('/', (req, res) => {
    db.entry.findAll().then(entries => {
        res.send(entries)
    })
});

app.post('/entry', (req, res) => {
    db.entry.findOrCreate({
        where: {
            catalogue_num: req.body.catalogue_num
        },
        defaults: {
            send_date: req.body.send_date,
            artist: req.body.artist,
            song: req.body.song,
            release_date: req.body.release_date,
            spotify_link: req.body.spotify_link
        }
    }).then(entry => {
        console.log(entry)
    }).catch(error => {
        console.error(error)
    })
});

app.listen(6969, () => {console.log('Listening!')});