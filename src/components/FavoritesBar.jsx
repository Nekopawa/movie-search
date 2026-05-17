import "../styles/favoritesBar.css";

export default function FavoritesBar() {
    const temporaryFilm = {
        id: 122,
        title: "Flow",
        year: 2024,
        rating: 7.8,
        image: "./temporaryFilm.jpg",
    };

    const { id, title, year, rating, image } = temporaryFilm;

    return (
        <section id="favorites__container">
            <div id="favorites__title">
                <h2>Your Favorites</h2>
                <span id="favorites_count">6</span>
            </div>
            <div id="favorites__list">
                {
                    //temporary list
                    Array.from({ length: 6 }).map((_, index) => {
                        return (
                            <div className="favorite__card" key={index}>
                                <picture>
                                    <img
                                        src={image}
                                        alt="Movie poster"
                                        height="200px"
                                    ></img>
                                </picture>
                                <button className="delete__button">x</button>
                                <p className="favorite__title">{title}</p>
                                <div className="favorite-card__text">
                                    <picture>
                                        <img
                                            src="./favorite_icon2.svg"
                                            height="20px"
                                        ></img>
                                    </picture>
                                    <p className="favorite__year">{year}</p>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </section>
    );
}
