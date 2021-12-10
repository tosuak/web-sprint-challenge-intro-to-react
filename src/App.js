import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Character from './components/Character'
import './App.css';

const App = () => {
  // Try to think through what state you'll need for this app before starting. Then build out
  // the state properties here.
  const [characters, setCharacters] = useState([]);
  const [currentCharactersId, setCurrentCharactersId] = useState(null);

  // Fetch characters from the API in an effect hook. Remember, anytime you have a 
  // side effect in a component, you want to think about which state and/or props it should
  // sync up with, if any.
  const openDetails = id => {
    setCurrentCharactersId(id);
  }

  const closeDetails = id => {
    setCurrentCharactersId(null);
  }

  const CharacterName = props => (
    <div className='character'>
      <button onClick={() => openDetails(props.info)}>{props.info.name}</button>
    </div>
  )
  useEffect(() => {
    axios.get(`https://swapi.dev/api/people`)
    .then(resp => {
      console.log(resp.data);
      setCharacters(resp.data);
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <div className="App">
      <h1 className="Header">Characters</h1>
      {
        characters.map(ch => {
          return <CharacterName key={ch.name} info={ch} action={openDetails} />
        })
      }
      {
        currentCharactersId && <Character characterId={currentCharactersId} close={closeDetails} />
      }
    </div>
  );
}

export default App;
