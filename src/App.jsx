import { useEffect, useState } from "react";
import "./App.css";
import FavoritesBar from "./components/FavoritesBar";
import Header from "./components/Header";
import MovieDetails from "./components/MovieDetails";
import PopularSearches from "./components/PopularSearches";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";

const API_KEY = import.meta.env.VITE_API_KEY;
const MOVIES_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

function App() {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("batman");
    const [loading, setLoading] = useState(false);
    const [loadingDetails, setLoadingDetails] = useState(false);
    const [error, setError] = useState(null);
    const [errorDetails, setErrorDetails] = useState(null);
    const [selectedMovieId, setSelectedMovieId] = useState(414906);
    const [movieDetails, setMovieDetails] = useState(null);

    function handleSearch(query) {
        if (query) setQuery(encodeURIComponent(query));
    }

    function handleMovieDetails(movieId) {
        setSelectedMovieId(Number(movieId));
    }

    useEffect(() => {
        async function fetchMovies() {
            if (query.trim() === "") setMovies([]);

            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${MOVIES_API}${query}`);
                if (!response.ok) {
                    throw new Error(
                        `Error fetching data. Status: ${response.status}`,
                    );
                }
                const data = await response.json();
                const moviesFiltered = data.results.filter(
                    (movie) => !movie.adult,
                );
                setMovies(moviesFiltered);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchMovies();
    }, [query]);

    useEffect(() => {
        async function createMovieDetails() {
            setLoadingDetails(true);
            setErrorDetails(null);

            const filteredMovie = movies.find(
                (movie) => movie.id === selectedMovieId,
            );

            if (!filteredMovie) {
                setLoadingDetails(false);
                setErrorDetails("Movie not found.");
                return;
            }

            try {
                const fullMovieDetails = await fetchFullMovieDetails();
                if (!fullMovieDetails) {
                    setMovieDetails(null);
                    setErrorDetails("Could not fetch movie details.");
                    return;
                }

                const {
                    id,
                    title,
                    vote_average: rating,
                    vote_count: voteCount,
                    release_date: releaseDate,
                    poster_path: posterPath,
                    overview: plot,
                    genres,
                    runtime,
                } = fullMovieDetails;
                const releaseYear = releaseDate.substr(0, 4);
                const genreNames = genres.map((genre) => genre.name).join(", ");

                let director = await fetchDirector();
                if (!director) {
                    director = "Unknown";
                }

                const details = {
                    id,
                    title,
                    rating,
                    voteCount,
                    releaseYear,
                    plot,
                    director,
                    runtime,
                    posterPath,
                    genres: genreNames,
                };
                setMovieDetails(details);
            } catch (err) {
                setErrorDetails(err.message);
            } finally {
                setLoadingDetails(false);
            }
        }

        async function fetchFullMovieDetails() {
            const url = `https://api.themoviedb.org/3/movie/${selectedMovieId}?api_key=${API_KEY}`;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(
                        `Error fetching data. Status: ${response.status}`,
                    );
                }
                const data = await response.json();
                return data;
            } catch (err) {
                setErrorDetails(err.message);
            }
        }

        async function fetchDirector() {
            const url = `https://api.themoviedb.org/3/movie/${selectedMovieId}/credits?api_key=${API_KEY}`;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(
                        `Error fetching data. Status: ${response.status}`,
                    );
                }

                const data = await response.json();
                const director = data.crew.find(
                    (member) => member.job === "Director",
                );
                return director.name;
            } catch (err) {
                setErrorDetails(err.message);
            }
        }

        createMovieDetails();
    }, [selectedMovieId, movies]);

    return (
        <>
            <Header />
            <SearchBar onSearchMovies={handleSearch} />
            <SearchResults
                movies={movies}
                loading={loading}
                error={error}
                onClickMovieCard={handleMovieDetails}
            />
            <MovieDetails
                movieDetails={movieDetails}
                loading={loadingDetails}
                error={errorDetails}
            />
            <PopularSearches />
            <FavoritesBar />
        </>
    );
}

export default App;
