import { useEffect, useState } from "react";
import "./App.css";
import FavoritesBar from "./components/FavoritesBar";
import Header from "./components/Header";
import MovieDetails from "./components/MovieDetails";
import PopularSearches from "./components/PopularSearches";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";

const apiKey = import.meta.env.VITE_API_KEY;
const MOVIES_API = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;

function App() {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("batman");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
                setMovies(data.results);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchMovies();
    }, [query]);

    function handleSearch(query) {
        if (query) setQuery(encodeURIComponent(query));
    }

    return (
        <>
            <Header />
            <SearchBar onSearchMovies={handleSearch} />
            <SearchResults movies={movies} loading={loading} error={error} />
            <MovieDetails />
            <PopularSearches />
            <FavoritesBar />
        </>
    );
}

export default App;
