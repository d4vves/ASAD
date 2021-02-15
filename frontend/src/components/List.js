import Song from './Song'

const List = ({ list }) => {

    let listDisplay = list.map((song, idx) => {
        return <Song {...song} key={idx} />
    })

    return (
        <div>
            {listDisplay}
        </div>
    )
}

export default List