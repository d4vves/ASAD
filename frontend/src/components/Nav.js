const Nav = ({ handleSearchInput, search, setPageNum, pageNum, fullListLength }) => {

    let lastPageNum = fullListLength / 20

    return (
        <div>
            <button
                onClick={() => setPageNum(previous => previous > 0 ? previous - 1 : 0)}
            >
                Previous
            </button>

            <div className='search-container'>
                <label htmlFor='search'>Search: </label>
                <input type='text' onChange={handleSearchInput} value={search} />
            </div>

            <button
                onClick={() => setPageNum(pageNum + 1 < lastPageNum ? pageNum + 1 : lastPageNum - 1)}
            >
                Next
            </button>

            <div>
                <em className="page-number">
                    {!search ? `${pageNum + 1} / ${lastPageNum}` : ''}
                </em>
            </div>
        </div>
    )
}

export default Nav