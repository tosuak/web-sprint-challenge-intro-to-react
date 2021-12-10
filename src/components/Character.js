// Write your Character component here
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled, { keyframes } from 'styled-components';


const kf = keyframes`
    0% {left: 5000px; top: 0px;}
    100% {left: 0px; top: 0px;}
`
const StyledDetails = styled.div`
    padding: 2%;
    margin: 5%;
    display: flex;
    flex-flow: column wrap;
    height: 100vh;
    width: 100%;
    border-radius: 40px;
    border: 4px solid ${props => props.theme.tertiaryColor};    position: relative;
    animation-name: ${kf};
    animation-duration: .5s;
    
    background-color: ${props => props.theme.secondaryColor};

    h2 {
        font-size: 2.5rem;
        font-family: 'Alata', sans-serif;
        color: white;

    }
    
    h4{
        font-family: 'Alata', sans-serif;
        color: white;
        font-size: 2rem;
    }

    p {
        background-color: black;
        border-radius: 40px;
        padding: 1%;
        font-family: 'Alata', sans-serif;
        color:  ${props => props.theme.tertiaryColor};
        font-size: 2rem;
        font-weight: bold;
        margin: 1%;
    }

    }
    ul {
        height: 20vh;
        display: flex;
        align-content: center;
        flex-flow: column wrap;
        margin: 0%;
        padding: 2% 0%;
        border: 2px solid ${props => props.theme.secondaryColor};
        background-color: ${props => props.theme.primaryColor};
        border-radius: 40px;
    }

    h4 li {
        font-family: 'Alata', sans-serif;
        font-size: 1.5rem;
        padding-bottom: 1%;
        margin-bottom: 1%;
        border-bottom: 5px solid ${props => props.theme.tertiaryColor};
        color: white;
    }

    button {
        margin-left: 6%;
        width: 40%;
        font-size: 2rem;
        font-weight: bold;
        padding: 2%;
        border-radius: 80px;
        background-color: ${props => props.theme.darkBrown};
        color: white;
    }

    button:hover {
        background-color: ${props => props.theme.primaryColor};
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
                    <h4>Name: </h4>
                        <p>{details.name}</p>
                    <h4>Home World: </h4>
                        <p>{details.homeworld}</p>
                    <h4>Birth Year: </h4>
                        <p>{details.birth_year}</p>
                    <h4>Gender: </h4>
                        <p>{details.gender}</p>
                    <h4>
                        Appearance: 
                        <ul>
                            <li>Height: {details.height}</li>
                            <li>Mass: {details.mass}</li>
                            <li>Skin Color: {details.skin_color}</li>
                            <li>Hair Color: {details.hair_color}</li>
                            <li>Eye Color: {details.eye_color}</li>
                        </ul>
                    </h4>
                </>
            }
            <button onClick={close}>Close</button>
        </StyledDetails>
    )
}