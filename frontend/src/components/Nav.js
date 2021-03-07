const Nav = ({ handleSearchInput, search, sortButtonMap }) => {

    return (
        <div>
            <div className='search-container'>
                <label htmlFor='search'>Search: </label>
                <input
                    type='text'
                    onChange={handleSearchInput}
                    value={search}
                />
            </div>

            <div>
                {sortButtonMap}
            </div>
            
        </div>
    )
}

export default Nav