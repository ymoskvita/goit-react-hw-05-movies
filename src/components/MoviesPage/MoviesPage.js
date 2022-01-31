import React, { useState, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function MoviesPage() {
    const [searchMovies, setSearchMovies] = useState('');
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const search = useLocation().search;
    const query = new URLSearchParams(search).get('query');

    useEffect(() => {
        if (!searchMovies) {
            return;
        }
        const url = `https://api.themoviedb.org/3/search/movie?api_key=19ddb91ef8747b0ab6c383201a05539c&query=${searchMovies}&language=en-US&page=1&include_adult=false`;

        async function fetchMovies() {
            const { data } = await axios.get(url);
            setMovies(data.results);

            navigate({
                pathname: '/movies',
                search: `?query=${searchMovies}`,
            });
        }
        fetchMovies();
    }, [searchMovies, navigate]);

    useEffect(() => {
        if (!query) {
            return;
        }
        const url = `https://api.themoviedb.org/3/search/movie?api_key=19ddb91ef8747b0ab6c383201a05539c&query=${query}&language=en-US&page=1&include_adult=false`;

        async function fetchMovies() {
            const { data } = await axios.get(url);
            setMovies(data.results);
        }
        fetchMovies();
    }, []);

    const handleQueryChange = event => {
        setSearchMovies(event.currentTarget.value.toLowerCase());
    };

    const handleSubmit = event => {
        event.preventDefault();

        if (searchMovies.trim() === '') {
            toast.error(`Enter query`)
            return;
        }
        setSearchMovies('');
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
            <button type="submit">
                <BsSearch />
            </button>
            <input
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search movies"
                value={searchMovies}
                onChange={handleQueryChange}
            />
            </form>
            <ul>
                {movies.map(({ id, title }) => (
                    <li key={id}>
                        <Link to={`/movies/${id}`}
                        state={{ from: location }}
                        >
                            {title}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}