import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

export default function Reviews() {
    const [reviews, setReviews] = useState([]);
    let { movieId } = useParams();

    useEffect(() => {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=19ddb91ef8747b0ab6c383201a05539c&language=en-US&page=1`;

        async function fetchMovies() {
            const { data } = await axios.get(url);
            setReviews(data.results);
        }
        fetchMovies();
    }, [movieId]);

    return (
        <div>
            {reviews.length ?
                <ul>
                    {reviews.map(({ id, author, content }) => (
                        <li key={id}>
                            <h3>Author: {author}</h3>
                            <p>{content}</p>
                        </li>
                    ))}
                </ul>
                : <p>We don't have any reviews for this movie</p>
            }
        </div>
    )
}