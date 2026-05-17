import "../styles/movieDetails.css";

export default function MovieDetails() {
    return (
        <aside id="movie-details__container">
            <h2>Movie Details</h2>
            <picture id="details__movie-poster">
                <img
                    src="./temporaryFilm.jpg"
                    alt="Movie poster"
                    height="250px"
                ></img>
            </picture>

            <h3>Flow</h3>

            <div id="details__rating">
                <picture>
                    <img src="./star_icon.svg"></img>
                </picture>
                <p id="details__rating-value">7.8/10</p>
                <p id="details__votes">(133K)</p>
            </div>

            <div id="details__movie-info">
                <p>Year:</p>
                <p>2024</p>
                <p>Director:</p>
                <p>Gints Zilbalodis</p>
                <p>Genre:</p>
                <p>Animation</p>
                <p>Runtime:</p>
                <p>90 min</p>
            </div>

            <h4>Plot</h4>
            <p id="details__plot">
                Gato é um animal solitário, mas quando seu lar é destruído por
                uma grande inundação, ele encontra refúgio em um barco habitado
                por diversas espécies, tendo que se juntar a eles apesar das
            </p>

            <button id="add-favorites__button">
                <picture>
                    <img src="./favorite_icon.svg" alt="Heart"></img>
                </picture>
                <p>Add to favorites</p>
            </button>
        </aside>
    );
}
