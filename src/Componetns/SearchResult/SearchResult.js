import React, {
	useContext,
	useEffect,
	useRef,
} from "react";
import Pagination from "../Pagination/Pagination";
import movieInfoContext from "../../context/search_MovieInfo_context";
import Movie from "../Movie";
import Spinner from "../Spinner/Spinner";
import noResult from "../../Images/no_result.png";

const SearchResult = () => {
	const ctx = useContext(movieInfoContext);
	const searchResultRef = useRef();

	useEffect(() => {
		ctx.setSearchResultRef(searchResultRef);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const generateMoviesList = () => {
		if (ctx.searchResult.movies.length > 0) {
			return ctx.searchResult.movies.map(
				(item) => {
					return (
						<Movie
							movie={item}
							key={item.imdb_id}
						/>
					);
				}
			);
		}
		return (
			<figure>
				<img
					src={noResult}
					alt="no movies were found"
				/>
				<h4>
					No movie matched the search
					query
				</h4>
			</figure>
		);
	};

	const spinnerOrResult = () => {
		if (ctx.loading[0]) {
			return <Spinner />;
		}
		return (
			<React.Fragment>
				<h5>
					Results of:{" "}
					<span className="searchQuery">
						"
						{
							ctx.searchResult
								.searchQuery
						}
						"
					</span>
				</h5>
				<ul className="searchResults hidden">
					{generateMoviesList()}
				</ul>
				{ctx.searchResult.total_pages >
				1 ? (
					<Pagination />
				) : (
					""
				)}
			</React.Fragment>
		);
	};

	return (
		<section
			className="searchResultsSection hide"
			ref={searchResultRef}>
			{spinnerOrResult()}
		</section>
	);
};

export default SearchResult;
