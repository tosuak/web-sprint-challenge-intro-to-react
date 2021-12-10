import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Character from './components/Character'
import './App.css';

const App = () => {
  // Try to think through what state you'll need for this app before starting. Then build out
  // the state properties here.
  const [characters, setCharacters] = useState([]);
  const [charactersId, setCharactersId] = useState('1');

  // Fetch characters from the API in an effect hook. Remember, anytime you have a 
  // side effect in a component, you want to think about which state and/or props it should
  // sync up with, if any.

  const openDetails = id => {
    setCharactersId(id);
  }

  const closeDetails = id => {
    setCharactersId(null);
  }

  useEffect(() => {
    axios.get(`https://swapi.dev/api/people`)
    .then(resp => {
      console.log(resp);
      setCharacters(resp.data);
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <div className="App">
      <h1 className="Header">Characters</h1>
    </div>
  );
}

export default App;
