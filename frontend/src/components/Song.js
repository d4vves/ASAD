const Song = ({ catalogue_num, artist, song, release_date, spotify_link }) => {

    let spotifyLink = spotify_link ? 
        <a href={spotify_link}>Spotify</a> :
        ''

    return (
        <div>
            <p>
                {catalogue_num} {artist} - {song} ({release_date}) {spotifyLink}
            </p>
        </div>
    )
}

export default Song