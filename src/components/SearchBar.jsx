import { useEffect, useRef, useState } from "react";
import "../styles/searchBar.css";

const API_KEY = import.meta.env.VITE_API_KEY;
const TRENDING_MOVIES_API = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;

export default function SearchBar({ onSearchMovies }) {
    const [trendingMovies, setTrendingMovies] = useState([
        "Flow",
        "Matrix",
        "Demon Slayer",
        "Batman",
        "Dark",
    ]);
    const inputRef = useRef(null);

    function handleSearch() {
        onSearchMovies(inputRef.current.value);
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") handleSearch();
    }

    function handleClickSuggested(event) {
        onSearchMovies(event.target.textContent);
    }

    useEffect(() => {
        async function fetchTrending() {
            try {
                const response = await fetch(TRENDING_MOVIES_API);

                if (!response.ok) return;

                const data = await response.json();
                const titles = data.results
                    .slice(0, 5)
                    .map((movie) => movie.title);

                setTrendingMovies(titles);
            } catch {
                return;
            }
        }

        fetchTrending();
    }, []);

    return (
        <section id="search-card__container">
            <h1>Find Movies You'll Love</h1>
            <p>
                Search for any movie and discover ratings, plot, cast and more.
            </p>
            <div id="search-bar">
                <picture>
                    <img src="./search_icon.svg"></img>
                </picture>
                <input
                    ref={inputRef}
                    id="search__input"
                    type="text"
                    placeholder="Search for a movie..."
                    onKeyDown={handleKeyDown}
                ></input>
                <button id="search__button" onClick={handleSearch}>
                    Search
                </button>
            </div>
            <div id="suggested-titles">
                <p>Try:</p>
                <ul>
                    {trendingMovies.map((title, index) => {
                        return (
                            <li key={index} onClick={handleClickSuggested}>
                                {title}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
