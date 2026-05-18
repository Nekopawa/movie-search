import "../styles/searchResultCard.css";

const MOVIE_IMAGE_API = "https://image.tmdb.org/t/p/w500/";

export default function SearchResultCard({ movie }) {
    const {
        poster_path: posterPath,
        title,
        release_date: releaseDate,
        vote_average: rating,
    } = movie;
    const year = releaseDate.substr(0, 4);
    const image = `${MOVIE_IMAGE_API}${posterPath}`;

    return (
        <div className="movie_card">
            <picture>
                <img src={image} height="180px"></img>
            </picture>
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
