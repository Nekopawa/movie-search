import { useEffect, useState } from "react";
import "../styles/searchResults.css";
import SearchResultCard from "./SearchResultsCard";

export default function SearchResults({
    movies,
    loading,
    error,
    onClickMovieCard,
}) {
    const [visibleMovies, setVisibleMovies] = useState(8);

    useEffect(() => {
        function updateVisibleMovies() {
            if (window.innerWidth >= 1700) {
                setVisibleMovies(12);
            } else if (window.innerWidth >= 1550) {
                setVisibleMovies(10);
            } else if (window.innerWidth >= 1100) {
                setVisibleMovies(8);
            } else if (window.innerWidth >= 768) {
                setVisibleMovies(9);
            } else if (window.innerWidth >= 550 && window.innerWidth < 700) {
                setVisibleMovies(9);
            } else {
                setVisibleMovies(8);
            }
        }

        updateVisibleMovies();
        window.addEventListener("resize", updateVisibleMovies);

        return () => {
            window.removeEventListener("resize", updateVisibleMovies);
        };
    }, []);

    return (
        <section id="search-results__container">
            <div id="search-results__title">
                <h2>Search Results</h2>
                <div id="results_amount">
                    {movies.length > visibleMovies
                        ? visibleMovies
                        : movies.length}
                </div>
            </div>

            {error ? (
                <p id="search-results-message">{error}</p>
            ) : loading ? (
                <p id="search-results-message">Loading...</p>
            ) : movies.length === 0 ? (
                <p id="search-results-message">No movies found.</p>
            ) : (
                <>
                    <div id="search-results__grid">
                        {movies.slice(0, visibleMovies).map((movie) => {
                            return (
                                <SearchResultCard
                                    key={movie.id}
                                    movie={movie}
                                    onClick={onClickMovieCard}
                                />
                            );
                        })}
                    </div>
                    <button id="load-more__button">Load More</button>
                </>
            )}
        </section>
    );
}
