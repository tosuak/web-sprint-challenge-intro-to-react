// Write your Character component here
import React, { useState, useEffect } from 'react'
import axios from 'axios'


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
        <div className='container'>
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
        </div>
    )
}