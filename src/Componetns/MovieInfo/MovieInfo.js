import React, { useContext, useEffect, useRef } from "react";
import movieInfoContext from "../../context/search_MovieInfo_context";
import Context from "../../context/context";

const MovieInfo = () => {
    const ctxMovieInfo = useContext(movieInfoContext);
    const ctx = useContext(Context);
    const movieInfoRef = useRef();
    const showSeachResultSection = () => {
        ctxMovieInfo.showSeachResultSection(
            ctxMovieInfo.movieInfoSectionRef.current,
            ctxMovieInfo.searchResultSectionRef.current
        );
    };
    useEffect(() => {
        ctxMovieInfo.setMovieInfoRef(movieInfoRef);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addToWatchList = () => {
        const url = `${ctx.url[0]}/user/watchList/add/${ctx.movieInfo.imdb_id}`;
        const token = JSON.parse(localStorage.getItem("findMovieToken"));
        fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Token ${token}`,
            },
        }).then((response) => {
            if (response.ok) {
                ctx.watchListMovies[1]();
            }
        });
    };

    const changeStyleOfBookmarkBtn = () => {
        let exist = false;
        ctx.watchListMovies[0].forEach((movie) => {
            if (movie.imdb_id === ctx.movieInfo.imdb_id) {
                exist = true;
            }
        });
        if (exist) {
            return <i className="fas fa-bookmark fa-2x"></i>;
        }
        return <i className="far fa-bookmark fa-2x"></i>;
    };

    const backButton = () => {
        if (ctxMovieInfo.searchResult.movies.length > 0) {
            return (
                <button className="backButton" onClick={showSeachResultSection}>
                    <i className="fas fa-arrow-left"></i>Search results
                </button>
            );
        }
        return "";
    };

    return (
        <section className="MovieInfo hide" id="moreInfo" ref={movieInfoRef}>
            <div>{backButton()}</div>
            <figure>
                <img
                    src={
                        ctx.movieInfo.image_url != null
                            ? ctx.movieInfo.image_url
                            : ctx.movieInfo.image
                    }
                    alt={ctx.movieInfo.name}
                />
            </figure>
            <div className="inforamtion">
                <div className="movieTitle">
                    <h3>{ctx.movieInfo.name}</h3>
                    {ctx.isLogedIn[0] && (
                        <button
                            className="bookmarkButton"
                            onClick={addToWatchList}
                        >
                            {changeStyleOfBookmarkBtn()}
                        </button>
                    )}
                </div>
                <div className="runTime">
                    <i className="far fa-clock"></i>
                    <span>
                        {ctx.movieInfo.run_time
                            ? ctx.movieInfo.run_time + " min"
                            : "Not available"}
                    </span>
                </div>
                <ul>
                    <li>
                        Type:
                        <span className="movieRelease infoText">
                            {ctx.movieInfo.type}
                        </span>
                    </li>
                    <li>
                        Release:
                        <span className="movieRelease infoText">
                            {ctx.movieInfo.released_date}
                        </span>
                    </li>
                    <li>
                        Genre:
                        <span className="movieGenre infoText">
                            {ctx.movieInfo.genre}
                        </span>
                    </li>
                    <li>
                        Rating:
                        <span className="imdbVotes infoText">
                            {ctx.movieInfo.imdb_rating}
                        </span>
                        <i className="fab fa-imdb"></i>
                    </li>
                    <li>
                        Language:
                        <span className="language infoText">
                            {ctx.movieInfo.language}
                        </span>
                    </li>
                    <li>
                        <p className="summary">{ctx.movieInfo.summary}</p>
                    </li>
                    <li>
                        imdbID:
                        <span className="imdbID infoText">
                            {ctx.movieInfo.imdb_id}
                        </span>
                    </li>
                    <li className="actorsList">
                        <h3>Actors</h3>
                        <p className="actors">{ctx.movieInfo.actors}</p>
                    </li>
                    <a
                        href={`https://www.imdb.com/title/${ctx.movieInfo.imdb_id}/`}
                        className="redirecButton"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        See on IMDB website
                        <i className="fas fa-share-square fa"></i>
                    </a>
                </ul>
            </div>
        </section>
    );
};

export default MovieInfo;
