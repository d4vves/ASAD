import { useEffect, useState } from 'react'
import axios from 'axios'
import List from './components/List'
import lodash from 'lodash'
import SortButton from './components/SortButton'
import Nav from './components/Nav'
import './App.css';

function App() {
  const [displayList, setDisplayList] = useState([])
  const [fullList, setFullList] = useState([])
  const [displaySort, setdisplaySort] = useState({ category: false, sort: false })
  const [pageNum, setPageNum] = useState(0)
  const [search, setSearch] = useState('')

  const determineDisplayListSlice = () => {
    let nextPageNum = pageNum + 1

    let nextStartSlice = pageNum * 20
    let nextEndSlice = nextPageNum * 20
    if (nextEndSlice > fullList.length) nextEndSlice = fullList.length

    setDisplayList(fullList.slice(nextStartSlice, nextEndSlice))
  }
  
  const setInitialLists = () => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}`)
    .then(response => {
      setFullList(response.data)
      setDisplayList(response.data.slice(0, 20))
    })
  }

  const handleSearchInput = (e) => {
    const userInput = e.target.value
    setSearch(userInput)

    userInput ?
      setDisplayList(() => {
        const filteredList = fullList.filter(asad => 
          asad.artist.toLowerCase().includes(userInput.toLowerCase()) ||
          asad.song.toLowerCase().includes(userInput.toLowerCase()) ||
          asad.catalogue_num.toString().includes(userInput) ||
          asad.release_date.toString().includes(userInput)
        )
        return filteredList
      })
    :
      determineDisplayListSlice()
  }

  const toggleSort = (category) => {
    if (category === displaySort.category) {
      setdisplaySort({
        category: category,
        sort: !displaySort.sort || displaySort.sort === 'desc' ? 'asc' : 'desc'
      })
    } else {
      setdisplaySort({
        category: category,
        sort: 'asc'
      })
    }
  }

  useEffect(() => {
    setInitialLists()
  }, [])

  useEffect(() => {
    determineDisplayListSlice()
  }, [pageNum])

  useEffect(() => {
    if (displaySort.sort) {
      let orderedList = lodash.orderBy(fullList, [displaySort.category], [displaySort.sort])
      setDisplayList(orderedList)
    }
  }, [displaySort])

  let sortButtonList = fullList.length && Object.keys(fullList[0]).slice(1, 7)
  let sortButtonMap = sortButtonList && sortButtonList.map((category, i) => {
    return <SortButton key={i} category={category} toggleSort={toggleSort}  />
  })

  return (
    <div className="App">

      <h1>ASAD</h1>

      <Nav
        search={search}
        handleSearchInput={handleSearchInput}
        setPageNum={setPageNum}
        pageNum={pageNum}
        fullListLength={fullList.length}
        sortButtonMap={sortButtonMap}
      />

      <List
          list={displayList}
        />

    </div>
  );
}

export default App;
