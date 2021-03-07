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
  const [displaySort, setdisplaySort] = useState({ category: null, sort: null })
  const [search, setSearch] = useState('')
  
  const setInitialList = () => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}`)
    .then(response => {
      setFullList(response.data)
      setDisplayList(response.data)
    })
  }

  const handleSearchInput = (e) => {
    const userInput = e.target.value
    setSearch(userInput)
    setDisplayList(() => {
      const filteredList = fullList.filter(asad => 
        asad.artist.toLowerCase().includes(userInput.toLowerCase()) ||
        asad.song.toLowerCase().includes(userInput.toLowerCase()) ||
        asad.catalogue_num.toString().includes(userInput) ||
        asad.release_date.toString().includes(userInput)
      )
      return filteredList
    })
  }

  const toggleSort = (category) => {
    if (category === displaySort.category) {
      setdisplaySort({
        category: category,
        sort: displaySort.sort === 'asc' ? 'desc' : 'asc'
      })
    } else {
      setdisplaySort({
        category: category,
        sort: 'asc'
      })
    }
  }

  useEffect(() => {
    setInitialList()
  }, [])

  useEffect(() => {
    if (displaySort.sort) {
      let orderedList = lodash.orderBy(fullList, [displaySort.category], [displaySort.sort])
      setDisplayList(orderedList)
    }
  }, [displaySort, fullList])

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
        sortButtonMap={sortButtonMap}
      />

      <List
          list={displayList}
        />

    </div>
  );
}

export default App;
