import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

export default function Cast() {
    const [castInfo, setCastInfo] = useState([]);
    let { movieId } = useParams();

    useEffect(() => {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=19ddb91ef8747b0ab6c383201a05539c&language=en-US`;

        async function fetchMovies() {
            const { data } = await axios.get(url);
            setCastInfo(data.cast);
        }
        fetchMovies();
    }, [movieId]);

    return (
        <div>
            <ul>
                {castInfo.map(({ id, profile_path, character, original_name }) => (
                    <li key={id}>
                        <img src={`https://image.tmdb.org/t/p/w500${profile_path}`} alt={original_name} />
                        <p>Character: {character}</p>
                        <p>{original_name}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}