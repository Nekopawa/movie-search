import { useEffect, useState } from "react";
import "../styles/popularSearches.css";

const API_KEY = import.meta.env.VITE_API_KEY;
const POPULAR_MOVIES_API = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

export default function PopularSearches({ onSearchMovies }) {
    const [popularTitles, setPopularTitles] = useState([
        "The Punisher: One Last Kill",
        "The Devil Wears Prada",
        "Swapped",
        "Obsession",
        "Mortal Kombat",
    ]);

    useEffect(() => {
        async function fetchPopularTitles() {
            try {
                const response = await fetch(POPULAR_MOVIES_API);

                if (!response.ok) return;

                const data = await response.json();
                const titles = data.results
                    .slice(0, 5)
                    .map((movie) => movie.title);

                setPopularTitles(titles);
            } catch {
                return;
            }
        }

        fetchPopularTitles();
    }, []);

    return (
        <section id="popular-searches__container">
            <h2>Popular Searches</h2>
            <ul>
                {popularTitles.map((title) => {
                    return (
                        <li key={title} onClick={() => onSearchMovies(title)}>
                            <p>{title}</p>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
