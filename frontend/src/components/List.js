import Song from './Song'

const List = ({ list }) => {

    let display = list.map((song, idx) => {
        return <Song {...song} key={idx} />
    })

    return (
        <div>
            {display}
        </div>
    )
}

export default List