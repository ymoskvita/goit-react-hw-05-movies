import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, Item, Img, Title } from './HomePage.styled';
import { Link } from 'react-router-dom';

export default function HomePage() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const url = 'https://api.themoviedb.org/3/trending/movie/day?api_key=19ddb91ef8747b0ab6c383201a05539c';

        async function fetchMovies() {
            const { data } = await axios.get(url);
            setMovies(data.results);
        }
        fetchMovies();
    }, []);

    return (
        <div>
            <h2>Trending today</h2>
            <List>
                {movies.map(({ id, poster_path, title }) => (
                    <Item key={id}>
                        <Link to={`/movies/${id}`}>
                            <Img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />
                            <Title>{title}</Title>
                        </Link>
                    </Item>
                ))}
            </List>
        </div>
    )
}