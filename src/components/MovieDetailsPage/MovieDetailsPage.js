import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Outlet, Link, useNavigate } from "react-router-dom";
import { MovieInfo, Img, Wrapper, Title, Caption } from './MovieDetailsPage.styled';

export default function MovieDetailsPage() {
    const [movieInfo, setMovieInfo] = useState({});
    let { movieId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=19ddb91ef8747b0ab6c383201a05539c`;

        async function fetchMovies() {
            const { data } = await axios.get(url);
            setMovieInfo(data);
        }
        fetchMovies();
    }, [movieId]);

    return (
        <>
            <button onClick={() => navigate({pathname: '/movies'})}> Go back</button>
            <MovieInfo>
                <div>
                    <Img src={`https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`} alt={movieInfo.title} />
                </div>
                <Wrapper>
                    <Title>{movieInfo.title}</Title>
                    <p>Vote Average: {movieInfo.vote_average}</p>
                    <Caption>Overview</Caption>
                    <p>{movieInfo.overview}</p>
                    <Caption>Genres</Caption>
                    {movieInfo?.genres?.length &&
                        movieInfo.genres.map(({ id, name }) => (
                            <span key={id}>{name} </span>
                        ))
                    }
                </Wrapper>
            </MovieInfo>
            <div>
                <hr />
                <h4>Additional information</h4>
                <ul>
                    <li><Link to={`/movies/${movieId}/cast`}>Cast</Link></li>
                    <li><Link to={`/movies/${movieId}/reviews`}>Reviews</Link></li>
                </ul>
                <hr />
            </div>
            <Outlet />
        </>
    )
}