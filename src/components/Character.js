// Write your Character component here
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled, { keyframes } from 'styled-components';


const kf = keyframes`
    0% {left: 0px; top: 200px;}
    50% {left: 0px; top: 0px}
`
const StyledDetails = styled.div`
    border-radius: 40% 10% 40% 10%;
    margin: 0%;
    height: 100%;
    position: relative;
    animation-name: ${kf};
    animation-duration: 1s;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-flow: column wrap;
    background-color: ${props => props.theme.secondaryColor};
    ul {
        display: flex;
        justify-content: center;
        align-content: center;
        flex-flow: column wrap;
        width: 80%;
        border: 2px solid ${props => props.theme.secondaryColor};
        background-color: ${props => props.theme.primaryColor};
        height: 30vh;
        border-radius: 60% 60% 20% 20%;
    }

    li {
        bottom-border: 2px solid white;
    }
`







export default function Character(props) {
    const {characterId, close} = props;
    const [details, setDetails] = useState([]);
    
    useEffect(() => {
        axios.get(characterId.url)
        .then(resp => {
            setDetails(resp.data)
        })
        .catch(err => {
            console.log(err)
        })    
    }, [characterId])

    return (
        <StyledDetails className='container'>
            <h2>Character Details:</h2>
            {
                details &&
                <>
                    <h3>Name: {details.name}</h3>
                    <h4>Home World: {details.homeworld}</h4>
                    <h4>Birth Year: {details.birth_year}</h4>
                    <h4>Gender: {details.gender}</h4>
                    <h3>
                        Appearance: 
                        <ul>
                            <p>Height: {details.height}</p>
                            <p>Mass: {details.mass}</p>
                            <p>Skin Color: {details.skin_color}</p>
                            <p>Hair Color: {details.hair_color}</p>
                            <p>Eye Color: {details.eye_color}</p>
                        </ul>
                    </h3>
                </>
            }
            <button onClick={close}>Close</button>
        </StyledDetails>
    )
}