const SortButton = ({ category, toggleSort }) => {
    return (
        <button onClick={() => toggleSort(category)}>
            {category}
        </button>
    )
}

export default SortButton