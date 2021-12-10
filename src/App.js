import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Character from './components/Character'
import './App.css';
import styled from 'styled-components';

const StyledDetails = styled.div`
    background-image: './images/rm-bj';
    margin: 0%;
    padding: 0%;
    height: 100vh;
    width: 50%;
    display: flex;
    justify-content: space-between;
    flex-flow: column wrap;

    h1 {
      font-size: 5rem;
      background-color: ${props => props.theme.secondaryColor};
      border-radius: 40px;
      padding: 2%;
      color: ${props => props.theme.tertiaryColor};
    }

    button {
      font-size: 3rem;
      font-weight: bold;
      width: 80%;
      height:10vh;
      color: white;
      background-color: ${props => props.theme.darkBrown};
      border-radius: 40px;
      margin: 10px;
    }
    
    button: hover {
      background-color: white;
      color: ${props => props.theme.secondaryColor};
    }
`

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
    <StyledDetails className="App">
      <h1 className="Header">Characters</h1>
      {
        characters.map(ch => {
          return <CharacterName key={ch.name} info={ch} action={openDetails} />
        })
      }
      {
        currentCharactersId && <Character characterId={currentCharactersId} close={closeDetails} />
      }
    </StyledDetails>
  );
}

export default App;
