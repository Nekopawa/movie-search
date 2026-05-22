import "../styles/searchResults.css";
import SearchResultCard from "./SearchResultsCard";

export default function SearchResults({
    movies,
    loading,
    error,
    onClickMovieCard,
}) {
    return (
        <section id="search-results__container">
            <div id="search-results__title">
                <h2>Search Results</h2>
                <div id="results_amount">{movies.length}</div>
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
                        {movies.map((movie, index) => {
                            //implement Load More button
                            if (index > 7) return;
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
