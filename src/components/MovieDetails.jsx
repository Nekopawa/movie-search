import "../styles/movieDetails.css";

const MOVIE_IMAGE_API = "https://image.tmdb.org/t/p/w500/";

export default function MovieDetails({
    movieDetails,
    loading,
    error,
    onAddFavorite,
    onRemoveFavorite,
    favorites,
}) {
    if (!movieDetails) return;

    const {
        id,
        title,
        rating,
        voteCount,
        releaseYear,
        plot,
        director,
        runtime,
        posterPath,
        genres,
    } = movieDetails;
    const isFavorite = favorites.find((favorite) => favorite.id === id);

    function getVoteCount() {
        const formatter = new Intl.NumberFormat("en-US", {
            notation: "compact",
            compactDisplay: "short",
        });
        return formatter.format(voteCount);
    }

    function handleClick() {
        if (isFavorite) {
            onRemoveFavorite(id);
        } else {
            const favoriteMovie = {
                id,
                posterPath,
                title,
                releaseYear,
            };
            onAddFavorite(favoriteMovie);
        }
    }

    return (
        <aside id="movie-details__container">
            <h2>Movie Details</h2>
            {error ? (
                <p id="movie-details-message">{error}</p>
            ) : loading ? (
                <p id="movie-details-message">Loading...</p>
            ) : (
                <>
                    <picture id="details__movie-poster">
                        <img
                            src={`${MOVIE_IMAGE_API}${posterPath}`}
                            alt="Movie poster"
                            height="250px"
                        ></img>
                    </picture>

                    <h3>{title}</h3>

                    <div id="details__rating">
                        <picture>
                            <img src="./star_icon.svg"></img>
                        </picture>
                        <p id="details__rating-value">{rating.toFixed(2)}/10</p>
                        <p id="details__votes">({getVoteCount()})</p>
                    </div>

                    <div id="details__movie-info">
                        <p>Year:</p>
                        <p>{releaseYear}</p>
                        <p>Director:</p>
                        <p>{director}</p>
                        <p>Genre:</p>
                        <p>{genres}</p>
                        <p>Runtime:</p>
                        <p>{runtime} min</p>
                    </div>

                    <h4>Plot</h4>
                    <p id="details__plot">{plot}</p>

                    <button id="add-favorites__button" onClick={handleClick}>
                        <picture>
                            <img
                                src="./favorite_icon.svg"
                                alt="Heart"
                                height="25px"
                            ></img>
                        </picture>
                        {isFavorite ? (
                            <p>Remove from favorites</p>
                        ) : (
                            <p>Add to favorites</p>
                        )}
                    </button>
                </>
            )}
        </aside>
    );
}
