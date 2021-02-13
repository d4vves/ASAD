import { useEffect, useState } from 'react';
import axios from 'axios';
import Asad from './components/Asad'
import './App.css';

function App() {
  const [fullList, setFullList] = useState([])

  const getFullList = () => {
    axios.get(`http://localhost:6969`)
    .then(response => {
      console.log(response.data)
      setFullList(response.data)
    })
  }

  useEffect(() => {
    getFullList()
  }, [])

  let displayList = fullList.map((song, idx) => {
    return <Asad {...song} key={idx} />
  })

  return (
    <div className="App">
      <h1>ASAD</h1>
      {displayList}
    </div>
  );
}

export default App;
