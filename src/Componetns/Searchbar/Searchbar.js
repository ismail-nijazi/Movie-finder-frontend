import React, { useContext, useState } from "react";
import movieInfoContext from "../../context/search_MovieInfo_context";
import Context from "../../context/context";

const Searchbar = () => {
    const ctx = useContext(movieInfoContext);
    const context_ = useContext(Context);
    const [error, setError] = useState(false);
    const getSearchResult = (event) => {
        event.preventDefault();

        if (event.target.search.value.length > 2) {
            const url = `${context_.url[0]}/search/${event.target.search.value}`;
            ctx.loading[1](true);
            let result = fetch(url);
            result.then((response) => {
                response.json().then((data) => {
                    ctx.updateSearchResult({
                        searchQuery: event.target.search.value,
                        current_page: data.currentPage,
                        total_pages: data.totalPages,
                        movies: data.result,
                    });
                    ctx.loading[1](false);
                });
            });
            ctx.showSeachResultSection(
                ctx.movieInfoSectionRef.current,
                ctx.searchResultSectionRef.current
            );
            setError(false);
            ctx.searchResultSectionRef.current.scrollIntoView();
        } else {
            setError(true);
        }
    };
    return (
        <section className="searchContainer">
            <form
                method="POST"
                className="searchForm"
                onSubmit={getSearchResult}
            >
                {error && (
                    <label htmlFor="search" className="searchError">
                        {" "}
                        The search query should at least be 3 charecter!
                    </label>
                )}
                <div>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        className="search"
                        placeholder="Search movie ..."
                    />
                    <button type="submit">
                        <i className="fas fa-search"></i>
                        <span>Search</span>
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Searchbar;
