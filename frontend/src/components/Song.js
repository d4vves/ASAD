import '../App.css';

const Song = ({ send_date, catalogue_num, artist, song, release_date, spotify_link }) => {
    let date = new Date(send_date)
    let [month, day, year] = date.toLocaleDateString('en-US').split('/')
    let spotifyLinkDisplay = spotify_link ? 
        <a href={spotify_link} target='blank'>Spotify</a> :
        ''

    return (
        <div>
            <p className='song-row'>
                {catalogue_num} {month}/{day}/{year} {artist} - {song} ({release_date}) {spotifyLinkDisplay}
            </p>
        </div>
    )
}

export default Song