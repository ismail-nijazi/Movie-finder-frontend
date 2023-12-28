import React, { useContext } from "react";
import Context from "../../context/context";
import movieInfoContext from "../../context/search_MovieInfo_context";

const WatchListMovie = (props) => {
    const ctx = useContext(Context);
    const ctxMovieInfo = useContext(movieInfoContext);
    const showClickedMovieInfo = () => {
        ctx.changeCurrentMovie(props.movie.imdb_id);
        ctxMovieInfo.showMovieInfoSection(
            ctxMovieInfo.movieInfoSectionRef.current,
            ctxMovieInfo.searchResultSectionRef.current
        );
        ctxMovieInfo.movieInfoSectionRef.current.scrollIntoView();
    };
    const moviesImage = () => {
        if (props.movie.image_url != null) {
            if (props.movie.image_url.length > 1) {
                return (
                    <img src={props.movie.image_url} alt={props.movie.name} />
                );
            }
        }
        return <img src={props.movie.image} alt={props.movie.name} />;
    };

    return (
        <li className="bookmark" onClick={showClickedMovieInfo}>
            <a href={`/#${ctx.movieInfo.imdb_id}`}>
                {moviesImage()}
                <div>
                    <h5>{props.movie.name}</h5>
                    <i className="fas fa-star"></i>
                    <span className="rating">{props.movie.imdb_rating}</span>
                </div>
            </a>
        </li>
    );
};

export default WatchListMovie;
