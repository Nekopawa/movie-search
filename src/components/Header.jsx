import "../styles/header.css";

export default function Header({ favoritesCount }) {
    return (
        <header>
            <div id="header__logo">
                <picture>
                    <img src="./movie_icon.svg" alt="Site logo"></img>
                </picture>
                <p>Movie Search</p>
            </div>

            <div id="header__favorites">
                <picture>
                    <img src="./favorite_icon.svg"></img>
                </picture>
                <p>Favorites</p>
                <span id="favorites_count">{favoritesCount}</span>
            </div>
        </header>
    );
}
