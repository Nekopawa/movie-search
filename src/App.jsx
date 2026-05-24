import { useEffect, useState } from "react";
import "./App.css";
import FavoritesBar from "./components/FavoritesBar";
import Header from "./components/Header";
import MovieDetails from "./components/MovieDetails";
import PopularSearches from "./components/PopularSearches";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";

const API_KEY = import.meta.env.VITE_API_KEY;
const MOVIES_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`;

function App() {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("batman");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [loadingDetails, setLoadingDetails] = useState(false);
    const [error, setError] = useState(null);
    const [errorDetails, setErrorDetails] = useState(null);
    const [selectedMovieId, setSelectedMovieId] = useState(414906);
    const [movieDetails, setMovieDetails] = useState(null);
    const [favorites, setFavorites] = useState(() => {
        try {
            const savedFavorites = localStorage.getItem("favorites");

            if (!savedFavorites) return [];

            const parsedFavorites = JSON.parse(savedFavorites);
            return Array.isArray(parsedFavorites) ? parsedFavorites : [];
        } catch {
            return [];
        }
    });

    function handleSearch(query) {
        if (query) {
            const encodedQuery = encodeURIComponent(query.trim());

            if (!encodedQuery) return;

            setPage(1);
            setQuery(encodedQuery);
        }
    }

    function handleLoadMore() {
        setPage((prev) => prev + 1);
    }

    function handleMovieDetails(movieId) {
        setSelectedMovieId(Number(movieId));
    }

    function handleAddFavorite(favoriteMovie) {
        const movieExists = favorites.find(
            (movie) => movie.id === favoriteMovie.id,
        );

        if (!movieExists) setFavorites((prev) => [...prev, favoriteMovie]);
    }

    function handleRemoveFavorite(id) {
        setFavorites((prev) => prev.filter((favorite) => favorite.id !== id));
    }

    useEffect(() => {
        async function fetchMovies() {
            if (query.trim() === "") setMovies([]);

            setLoading(true);
            setError(null);
            try {
                const response = await fetch(
                    `${MOVIES_API}&query=${query}&page=${page}`,
                );
                if (!response.ok) {
                    throw new Error(
                        `Error fetching data. Status: ${response.status}`,
                    );
                }
                const data = await response.json();
                const moviesFiltered = data.results.filter(
                    (movie) => !movie.adult,
                );

                if (page === 1) {
                    setMovies(moviesFiltered);
                    if (moviesFiltered.length > 0) {
                        setSelectedMovieId(moviesFiltered[0].id);
                    }
                } else {
                    setMovies((prev) => [...prev, ...moviesFiltered]);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchMovies();
    }, [query, page]);

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
                    overview,
                    genres,
                    runtime,
                } = fullMovieDetails;
                const releaseYear = releaseDate
                    ? releaseDate.substr(0, 4)
                    : "Unknown";
                const genreNames =
                    genres.length > 0
                        ? genres.map((genre) => genre.name).join(", ")
                        : "Unknown";
                const plot = overview ? overview : "Unknown";
                let director = await fetchDirector();

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
                const director = data.crew?.find(
                    (member) => member.job === "Director",
                );

                return director ? director.name : "Unknown";
            } catch (err) {
                setErrorDetails(err.message);
            }
        }

        createMovieDetails();
    }, [selectedMovieId, movies]);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    return (
        <>
            <Header favoritesCount={favorites.length} />
            <SearchBar onSearchMovies={handleSearch} />
            <SearchResults
                //Passing key beacause when it changes, the whole component remounts,
                //and so reseting the value of visibleMovies
                key={query}
                movies={movies}
                loading={loading}
                error={error}
                onClickMovieCard={handleMovieDetails}
                onLoadMore={handleLoadMore}
            />
            <MovieDetails
                movieDetails={movieDetails}
                loading={loadingDetails}
                error={errorDetails}
                onAddFavorite={handleAddFavorite}
                onRemoveFavorite={handleRemoveFavorite}
                favorites={favorites}
            />
            <PopularSearches onSearchMovies={handleSearch} />
            <FavoritesBar
                favorites={favorites}
                onRemoveFavorite={handleRemoveFavorite}
            />
        </>
    );
}

export default App;
