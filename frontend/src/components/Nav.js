const Nav = ({ handleSearchInput, search, setPageNum, pageNum, fullListLength, sortButtonMap }) => {

    const lastPageNum = Math.ceil(fullListLength / 20)

    const nextButtonOnClick = () => {
        setPageNum(previous => previous > 0 ? previous - 1 : 0)
    }

    const previousButtonOnClick = () => {
        setPageNum(pageNum + 1 < lastPageNum ? pageNum + 1 : lastPageNum - 1)
    }

    return (
        <div>
            <button onClick={() => nextButtonOnClick()}>
                Previous
            </button>

            <div className='search-container'>
                <label htmlFor='search'>Search: </label>
                <input
                    type='text'
                    onChange={handleSearchInput}
                    value={search}
                />
            </div>

            <button onClick={() => previousButtonOnClick()}>
                Next
            </button>

            <div>
                <em className="page-number-display">
                    {!search ? `${pageNum + 1} / ${lastPageNum}` : ''}
                </em>
            </div>

            <div>
                {sortButtonMap}
            </div>
            
        </div>
    )
}

export default Nav