import React, { useState } from "react";

const movieInfoContext = React.createContext();

export default movieInfoContext;

export const Provider = (props) => {
    const [searchResultState, updateSearch] = useState({
        searchQuery: "",
        current_page: 1,
        total_pages: 0,
        movies: [],
    });
    const [loading, setLoading] = useState(false);
    const [movieInfoSectionRef, setMovieInfoRef] = useState(null);
    const [searchResultSectionRef, setSearchResultRef] = useState(null);
    const showMovieInfoSection = (movieInfo, searchResult) => {
        movieInfo.classList.remove("hide");
        searchResult.classList.add("hide");
    };

    const showSeachResultSection = (movieInfo, searchResult) => {
        movieInfo.classList.add("hide");
        searchResult.classList.remove("hide");
    };

    let value = {
        loading: [loading, setLoading],
        searchResult: searchResultState,
        updateSearchResult: updateSearch,
        movieInfoSectionRef: movieInfoSectionRef,
        setMovieInfoRef: setMovieInfoRef,
        searchResultSectionRef: searchResultSectionRef,
        setSearchResultRef: setSearchResultRef,
        showMovieInfoSection: showMovieInfoSection,
        showSeachResultSection: showSeachResultSection,
    };

    return (
        <movieInfoContext.Provider value={value}>
            {props.children}
        </movieInfoContext.Provider>
    );
};
