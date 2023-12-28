import React, { useContext, useRef, useEffect } from "react";
import Context from "../../context/context";
import WatchListMovie from "./WatchListMovie";

const WatchList = () => {
    const ctx = useContext(Context);
    const addedToWatchList = useRef();
    useEffect(() => {
        ctx.updateWatchListRef(addedToWatchList);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const watchListMovies = () => {
        return ctx.watchListMovies[0].map((movie) => {
            return <WatchListMovie movie={movie} key={movie.imdb_id} />;
        });
    };

    return (
        <section className="bookmarksContainer">
            <div ref={addedToWatchList} className="bookmarks bookmarksHidden">
                <h4 className="bookmarkTitle">Watch List</h4>
                <ul id="bookmarksList">{watchListMovies()}</ul>
                {ctx.watchListMovies[0].length === 0 ? (
                    <h3 className="emptyBookmark">You have no bookmark</h3>
                ) : (
                    ""
                )}
                <div className="Line"></div>
            </div>
        </section>
    );
};

export default WatchList;
