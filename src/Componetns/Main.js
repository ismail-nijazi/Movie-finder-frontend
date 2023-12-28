import React, {
	useEffect,
	useContext,
} from "react";
import MovieInfo from "./MovieInfo/MovieInfo";
import Searchbar from "./Searchbar/Searchbar";
import SearchResult from "./SearchResult/SearchResult";
import Context from "../context/context";

const Main = () => {
	const ctx = useContext(Context);

	const checkForLogin = () => {
		const token = JSON.parse(
			localStorage.getItem("findMovieToken")
		);
		if (token) {
			ctx.isLogedIn[1](true);
			ctx.watchListMovies[1]();
		}
	};

	useEffect(() => {
		ctx.updateRecommended();
		checkForLogin();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<main>
			<Searchbar />
			<MovieInfo />
			<SearchResult />
		</main>
	);
};

export default Main;
