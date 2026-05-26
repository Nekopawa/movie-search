import { useEffect, useReducer } from "react";
import "./App.css";
import FavoritesBar from "./components/FavoritesBar";
import Header from "./components/Header";
import MovieDetails from "./components/MovieDetails";
import PopularSearches from "./components/PopularSearches";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import {
    ACTION_TYPES,
    init,
    INITIAL_STATE,
    reducer,
} from "./reducer/moviesReducer";

const API_KEY = import.meta.env.VITE_API_KEY;
const MOVIES_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`;

function App() {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE, init);

    function handleSearch(query) {
        if (query) {
            const encodedQuery = encodeURIComponent(query.trim());

            if (!encodedQuery) return;

            dispatch({ type: ACTION_TYPES.CHANGED_QUERY, query: encodedQuery });
        }
    }

    function handleLoadMore() {
        dispatch({ type: ACTION_TYPES.LOAD_MORE });
    }

    function handleMovieDetails(movieId) {
        dispatch({
            type: ACTION_TYPES.CHANGE_SELECTED_MOVIE,
            movieId: movieId,
        });
    }

    function handleAddFavorite(favoriteMovie) {
        const movieExists = state.favorites.find(
            (movie) => movie.id === favoriteMovie.id,
        );

        if (!movieExists)
            dispatch({ type: ACTION_TYPES.ADD_FAVORITE, movie: favoriteMovie });
    }

    function handleRemoveFavorite(id) {
        dispatch({ type: ACTION_TYPES.REMOVE_FAVORITE, movieId: id });
    }

    useEffect(() => {
        async function fetchMovies() {
            dispatch({ type: ACTION_TYPES.SEARCH_START });
            try {
                const response = await fetch(
                    `${MOVIES_API}&query=${state.query}&page=${state.page}`,
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

                dispatch({
                    type: ACTION_TYPES.SEARCH_SUCCESS,
                    payload: moviesFiltered,
                });
            } catch (error) {
                dispatch({
                    type: ACTION_TYPES.SEARCH_ERROR,
                    error: error.message,
                });
            }
        }

        fetchMovies();
    }, [state.query, state.page]);

    useEffect(() => {
        async function createMovieDetails() {
            dispatch({ type: ACTION_TYPES.DETAILS_SEARCH_START });
            const filteredMovie = state.movies.find(
                (movie) => movie.id === state.selectedMovieId,
            );

            if (!filteredMovie) {
                dispatch({
                    type: ACTION_TYPES.DETAILS_SEARCH_ERROR,
                    error: "Movie not found.",
                });
                return;
            }

            try {
                const fullMovieDetails = await fetchFullMovieDetails();
                if (!fullMovieDetails) {
                    dispatch({
                        type: ACTION_TYPES.DETAILS_SEARCH_ERROR,
                        error: "Could not fetch movie details.",
                    });
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
                dispatch({
                    type: ACTION_TYPES.DETAILS_SEARCH_SUCCESS,
                    payload: details,
                });
            } catch (err) {
                dispatch({
                    type: ACTION_TYPES.DETAILS_SEARCH_ERROR,
                    error: err.message,
                });
            }
        }

        async function fetchFullMovieDetails() {
            const url = `https://api.themoviedb.org/3/movie/${state.selectedMovieId}?api_key=${API_KEY}`;
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
                dispatch({
                    type: ACTION_TYPES.DETAILS_SEARCH_ERROR,
                    error: err.message,
                });
            }
        }

        async function fetchDirector() {
            const url = `https://api.themoviedb.org/3/movie/${state.selectedMovieId}/credits?api_key=${API_KEY}`;
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
                dispatch({
                    type: ACTION_TYPES.DETAILS_SEARCH_ERROR,
                    error: err.message,
                });
            }
        }

        createMovieDetails();
    }, [state.selectedMovieId, state.movies]);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
    }, [state.favorites]);

    return (
        <>
            <Header favoritesCount={state.favorites.length} />
            <SearchBar onSearchMovies={handleSearch} />
            <SearchResults
                //Passing key beacause when it changes, the whole component remounts,
                //and so reseting the value of visibleMovies
                key={state.query}
                movies={state.movies}
                loading={state.loadingMovies}
                error={state.errorMovies}
                onClickMovieCard={handleMovieDetails}
                onLoadMore={handleLoadMore}
            />
            <MovieDetails
                movieDetails={state.movieDetails}
                loading={state.loadingDetails}
                error={state.errorDetails}
                onAddFavorite={handleAddFavorite}
                onRemoveFavorite={handleRemoveFavorite}
                favorites={state.favorites}
            />
            <PopularSearches onSearchMovies={handleSearch} />
            <FavoritesBar
                favorites={state.favorites}
                onRemoveFavorite={handleRemoveFavorite}
            />
        </>
    );
}

export default App;
