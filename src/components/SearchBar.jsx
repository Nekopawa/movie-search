import "../styles/searchBar.css";

export default function SearchBar() {
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
                    id="search__input"
                    type="text"
                    placeholder="Search for a movie..."
                ></input>
                <button id="search__button">Search</button>
            </div>
            <div id="suggested-titles">
                <p>Try:</p>
                <ul>
                    <li>Inception</li>
                    <li>Interstellar</li>
                    <li>The Dark Knight</li>
                </ul>
            </div>
        </section>
    );
}
