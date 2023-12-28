import React, { useContext } from "react";
import Context from "../../context/context";
import Movie from "../Movie";

const Header = () => {
    const ctx = useContext(Context);
    const generateMoviesList = () => {
        return ctx.recommendedMovie.map((item) => {
            return <Movie movie={item} key={item.imdb_id} />;
        });
    };
    return (
        <header>
            <section id="recommendedMovies">
                <h3 className="title">Recommended Movies</h3>
                <ul className="MS-content" id="recommendedMoviesContainer">
                    {generateMoviesList()}
                </ul>
                <div className="MS-controls">
                    <button className="MS-left">
                        <i
                            className="fas fa-chevron-left fa-3x"
                            aria-hidden="true"
                        ></i>
                    </button>
                    <button className="MS-right">
                        <i
                            className="fas fa-chevron-right fa-3x"
                            aria-hidden="true"
                        ></i>
                    </button>
                </div>
            </section>
        </header>
    );
};

export default Header;
