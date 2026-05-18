import { useRef } from "react";
import "../styles/searchBar.css";

export default function SearchBar({ onSearchMovies }) {
    const inputRef = useRef(null);
    const suggestedTitles = [
        "Flow",
        "Matrix",
        "Demon Slayer",
        "Batman",
        "Dark",
    ];

    function handleSearch() {
        onSearchMovies(inputRef.current.value);
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") handleSearch();
    }

    function handleClickSuggested(event) {
        onSearchMovies(event.target.textContent);
    }

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
                    {suggestedTitles.map((title, index) => {
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
