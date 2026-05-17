import "../styles/searchResults.css";
import SearchResultCard from "./SearchResultsCard";

export default function SearchResults() {
    const temporaryFilm = {
        id: 122,
        title: "Flow",
        year: 2024,
        rating: 7.8,
        image: "./temporaryFilm.jpg",
    };

    return (
        <section id="search-results__container">
            <div id="search-results__title">
                <h2>Search Results</h2>
                <div id="results_amount">12</div>
            </div>

            <div id="search-results__grid">
                {
                    //temporary list
                    Array.from({ length: 8 }).map((_, index) => {
                        return (
                            <SearchResultCard
                                key={index}
                                film={temporaryFilm}
                            />
                        );
                    })
                }
            </div>

            <button id="load-more__button">Load More</button>
        </section>
    );
}
