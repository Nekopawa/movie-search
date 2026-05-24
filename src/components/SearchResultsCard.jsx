import "../styles/searchResultCard.css";

const MOVIE_IMAGE_API = "https://image.tmdb.org/t/p/w500/";

export default function SearchResultCard({ movie, onClick }) {
    const {
        id,
        poster_path: posterPath,
        title,
        release_date: releaseDate,
        vote_average: rating,
    } = movie;
    const year = releaseDate ? releaseDate.substr(0, 4) : "Unknown";
    const image = `${MOVIE_IMAGE_API}${posterPath}`;

    return (
        <div className="movie_card" onClick={() => onClick(id)}>
            {posterPath ? (
                <picture>
                    <img src={image} height="180px"></img>
                </picture>
            ) : (
                <p className="movie_card-no-poster">No movie poster found</p>
            )}
            <h3>{title}</h3>
            <p className="card__year">{year}</p>
            <div className="card__rating">
                <picture>
                    <img src="./star_icon.svg" alt="Star"></img>
                </picture>
                <p>{Number(rating).toFixed(2)}</p>
            </div>
        </div>
    );
}
