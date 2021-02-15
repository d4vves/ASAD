import '../App.css';

const Song = ({ catalogue_num, artist, song, release_date, spotify_link }) => {

    let spotifyLinkDisplay = spotify_link ? 
        <a href={spotify_link} target='blank'>Spotify</a> :
        ''

    return (
        <div>
            <p className='song-row'>
                {catalogue_num}. {artist} - {song} ({release_date}) {spotifyLinkDisplay}
            </p>
        </div>
    )
}

export default Song