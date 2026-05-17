import "../styles/popularSearches.css";

export default function PopularSearches() {
    //temporary tags
    const tags = ["cats", "animation", "anime"];

    return (
        <section id="popular-searches__container">
            <h2>Popular Searches</h2>
            <ul>
                {tags.map((tag) => {
                    return (
                        <li key={tag}>
                            <p>{tag}</p>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
