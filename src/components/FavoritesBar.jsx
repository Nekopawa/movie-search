import "../styles/favoritesBar.css";

const MOVIE_IMAGE_API = "https://image.tmdb.org/t/p/w500/";

export default function FavoritesBar({ favorites, onRemoveFavorite }) {
    return (
        <section id="favorites__container">
            <div id="favorites__title">
                <h2>Your Favorites</h2>
                <span id="favorites_count">{favorites.length}</span>
            </div>
            <div id="favorites__list">
                {favorites.map((movie) => {
                    return (
                        <div className="favorite__card" key={movie.id}>
                            <picture>
                                <img
                                    src={`${MOVIE_IMAGE_API}${movie.posterPath}`}
                                    alt="Movie poster"
                                    height="200px"
                                ></img>
                            </picture>
                            <button
                                className="delete__button"
                                onClick={() => onRemoveFavorite(movie.id)}
                            >
                                x
                            </button>
                            <p className="favorite__title">{movie.title}</p>
                            <div className="favorite-card__text">
                                <picture>
                                    <img
                                        src="./favorite_icon2.svg"
                                        height="20px"
                                    ></img>
                                </picture>
                                <p className="favorite__year">
                                    {movie.releaseYear}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
