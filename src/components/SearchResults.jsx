import { useEffect, useState } from "react";
import "../styles/searchResults.css";
import SearchResultCard from "./SearchResultsCard";

export default function SearchResults({
    movies,
    loading,
    error,
    onClickMovieCard,
    onLoadMore,
}) {
    const [cardsPerLoad, setCardsPerLoad] = useState(8);
    const [visibleMovies, setVisibleMovies] = useState(8);

    function getCardsPerLoad() {
        if (window.innerWidth >= 1700) {
            return 12;
        } else if (window.innerWidth >= 1550) {
            return 10;
        } else if (window.innerWidth >= 1100) {
            return 8;
        } else if (window.innerWidth >= 550) {
            return 9;
        } else {
            return 8;
        }
    }

    function handleLoadMore() {
        const nextVisibleMovies = visibleMovies + cardsPerLoad;

        setVisibleMovies(nextVisibleMovies);

        if (nextVisibleMovies > movies.length) {
            onLoadMore();
        }
    }

    useEffect(() => {
        function updateVisibleMovies() {
            const amount = getCardsPerLoad();
            setCardsPerLoad(amount);
            setVisibleMovies(amount);
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
                    {Math.min(visibleMovies, movies.length)}
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
                    <button id="load-more__button" onClick={handleLoadMore}>
                        Load More
                    </button>
                </>
            )}
        </section>
    );
}
