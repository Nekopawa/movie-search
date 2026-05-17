import "../styles/searchResultCard.css";

export default function SearchResultCard({ film }) {
    const { title, year, rating, image } = film;

    return (
        <div className="film__card">
            <picture>
                <img src={image} height="180px"></img>
            </picture>
            <h3>{title}</h3>
            <p className="card__year">{year}</p>
            <div className="card__rating">
                <picture>
                    <img src="./star_icon.svg" alt="Star"></img>
                </picture>
                <p>{rating}</p>
            </div>
        </div>
    );
}
