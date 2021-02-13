const Asad = ({ catalogue_num, artist, song, release_date, spotify_link }) => {

    return (
        <div>
            <p>
                {catalogue_num} {artist} - {song} ({release_date}) <a href={spotify_link}>Spotify</a>
            </p>
        </div>
    )
}

export default Asad