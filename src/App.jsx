import "./App.css";
import FavoritesBar from "./components/FavoritesBar";
import Header from "./components/Header";
import MovieDetails from "./components/MovieDetails";
import PopularSearches from "./components/PopularSearches";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";

function App() {
    return (
        <>
            <Header />
            <SearchBar />
            <SearchResults />
            <MovieDetails />
            <PopularSearches />
            <FavoritesBar />
        </>
    );
}

export default App;
