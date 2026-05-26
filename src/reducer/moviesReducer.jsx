export const ACTION_TYPES = {
    SEARCH_START: "SEARCH_START",
    SEARCH_ERROR: "SEARCH_ERROR",
    SEARCH_SUCCESS: "SEARCH_SUCCESS",
    CHANGE_SELECTED_MOVIE: "CHANGE_SELECTED_MOVIE",
    DETAILS_SEARCH_START: "DETAILS_SEARCH_START",
    DETAILS_SEARCH_ERROR: "DETAILS_SEARCH_ERROR",
    DETAILS_SEARCH_SUCCESS: "DETAILS_SEARCH_SUCCESS",
    CHANGED_QUERY: "CHANGED_QUERY",
    LOAD_MORE: "LOAD_MORE",
    ADD_FAVORITE: "ADD_FAVORITE",
    REMOVE_FAVORITE: "REMOVE_FAVORITE",
};

export const INITIAL_STATE = {
    movies: [],
    query: "batman",
    page: 1,
    loadingMovies: false,
    loadingDetails: false,
    errorMovies: null,
    errorDetails: null,
    selectedMovieId: 414906,
    movieDetails: null,
    favorites: [],
};

export function init(initialState) {
    try {
        const savedFavorites = localStorage.getItem("favorites");

        if (!savedFavorites) return initialState;

        const parsedFavorites = JSON.parse(savedFavorites);
        return Array.isArray(parsedFavorites)
            ? { ...initialState, favorites: parsedFavorites }
            : initialState;
    } catch {
        return initialState;
    }
}

export function reducer(state, action) {
    switch (action.type) {
        case "SEARCH_START": {
            if (state.query.trim() === "") return { ...state, movies: [] };
            return { ...state, loadingMovies: true, errorMovies: null };
        }
        case "SEARCH_ERROR": {
            return {
                ...state,
                loadingMovies: false,
                errorMovies: action.error,
            };
        }
        case "SEARCH_SUCCESS": {
            let moviesList;
            let firstMovieId = state.selectedMovieId;
            if (state.page === 1) {
                moviesList = action.payload;
                firstMovieId =
                    moviesList.length > 0
                        ? moviesList[0].id
                        : state.selectedMovieId;
            } else {
                moviesList = [...state.movies, ...action.payload];
            }

            return {
                ...state,
                loadingMovies: false,
                errorMovies: null,
                movies: moviesList,
                selectedMovieId: firstMovieId,
            };
        }
        case "CHANGE_SELECTED_MOVIE": {
            return {
                ...state,
                selectedMovieId: action.movieId,
            };
        }
        case "DETAILS_SEARCH_START": {
            return {
                ...state,
                loadingDetails: true,
                errorDetails: null,
            };
        }
        case "DETAILS_SEARCH_ERROR": {
            return {
                ...state,
                errorDetails: action.error,
                loadingDetails: false,
                movieDetails: null,
            };
        }
        case "DETAILS_SEARCH_SUCCESS": {
            return {
                ...state,
                loadingDetails: false,
                errorDetails: false,
                movieDetails: action.payload,
            };
        }

        case "CHANGED_QUERY": {
            return {
                ...state,
                page: 1,
                query: action.query,
            };
        }
        case "LOAD_MORE": {
            return {
                ...state,
                page: state.page + 1,
            };
        }
        case "ADD_FAVORITE": {
            return {
                ...state,
                favorites: [...state.favorites, action.movie],
            };
        }
        case "REMOVE_FAVORITE": {
            return {
                ...state,
                favorites: state.favorites.filter(
                    (movie) => movie.id !== action.movieId,
                ),
            };
        }
        default:
            return state;
    }
}
