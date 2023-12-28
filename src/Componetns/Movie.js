import React, { useContext } from "react";
import Context from "../context/context";
import movieInfoContext from "../context/search_MovieInfo_context";

const Movie = (props) => {
    const ctx = useContext(Context);
    const ctxMovieInfo = useContext(movieInfoContext);

    const showClickedMovieInfo = (e) => {
        e.preventDefault();
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
        <li className="item">
            <a href={`${ctx.movieInfo.imdb_id}`} onClick={showClickedMovieInfo}>
                {moviesImage()}
            </a>

            <details>
                <summary>
                    <div>
                        <h5>{props.movie.name}</h5>
                        <p className="Genre">{props.movie.genre}</p>
                    </div>
                    <div>
                        <i className="fas fa-star"></i>
                        <span className="rating">
                            {props.movie.imdb_rating}
                        </span>
                    </div>
                </summary>
            </details>
        </li>
    );
};

export default Movie;
