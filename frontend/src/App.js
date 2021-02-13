import { useEffect, useState } from 'react';
import axios from 'axios';
import Song from './components/Song'
import './App.css';

function App() {
  const [fullList, setFullList] = useState([])

  const getFullList = () => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}`)
    .then(response => {
      console.log(response.data)
      setFullList(response.data)
    })
  }

  useEffect(() => {
    getFullList()
  }, [])

  let displayList = fullList.map((song, idx) => {
    return <Song {...song} key={idx} />
  })

  return (
    <div className="App">
      <h1>ASAD</h1>
      {displayList}
    </div>
  );
}

export default App;
