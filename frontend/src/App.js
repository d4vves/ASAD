import { useEffect, useState } from 'react';
import axios from 'axios';
import Song from './components/Song'
import './App.css';

function App() {
  const [displayList, setDisplayList] = useState([])
  const [fullList, setFullList] = useState([])
  const [search, setSearch] = useState([])

  const getFullList = () => {
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
          asad.song.toLowerCase().includes(userInput.toLowerCase()))
        return filteredList
      })
    :
      setDisplayList(fullList.slice(0, 20))
  }

  useEffect(() => {
    getFullList()
  }, [])

  let display = displayList.map((song, idx) => {
    return <Song {...song} key={idx} />
  })

  return (
    <div className="App">
      <h1>ASAD</h1>
      <label htmlFor='search'>Search: </label>
      <input type='text' onChange={handleSearchInput} value={search} />
      {display}
    </div>
  );
}

export default App;
