import React, {
	useContext,
	useState,
} from "react";
import Context from "../../context/context";
import logo from "../../Images/logo.png";

const Navbar = () => {
	const ctx = useContext(Context);
	const [error, setError] = useState({
		error: false,
		message: "",
	});
	const toggleBookmarks = () => {
		ctx.watchListRef.current.classList.toggle(
			"bookmarksHidden"
		);
	};

	const toggleLogin = () => {
		ctx.userSection[0].current.classList.remove(
			"hide"
		);
	};

	const toggleLogout = () => {
		const url = `${ctx.url[0]}/user/logout`;
		const sendLogout = async (url) => {
			const token = JSON.parse(
				localStorage.getItem(
					"findMovieToken"
				)
			);
			let response = await fetch(url, {
				method: "GET",
				headers: {
					Authorization: `Token ${token}`,
				},
			});
			const jsonResponse =
				await response.json();
			if (jsonResponse.status === 200) {
				localStorage.removeItem(
					"findMovieToken"
				);
				ctx.isLogedIn[1](false);
				ctx.userSection[0].current.classList.add(
					"hide"
				);
				ctx.resetWatchList();
			} else {
				setError((prev) => {
					return {
						...prev,
						error: true,
						message:
							"The logut was not successful!",
					};
				});
			}
		};
		sendLogout(url);
	};
	return (
		<nav>
			<figure className="logo">
				<a href="/">
					<img
						src={logo}
						alt="Movie Finder"
					/>
				</a>
			</figure>
			<div>
				{error.error && (
					<div class="error">
						<p class="error_message">
							* {error.message}
						</p>
					</div>
				)}

				{ctx.isLogedIn[0] && (
					<button
						id="showBookmarksButton"
						onClick={toggleBookmarks}>
						<i className="fas fa-bookmark fa-2x"></i>
					</button>
				)}
				{!ctx.isLogedIn[0] && (
					<button
						className="btn"
						onClick={toggleLogin}>
						Login
					</button>
				)}
				{ctx.isLogedIn[0] && (
					<button
						className="btn"
						onClick={toggleLogout}>
						Logout
					</button>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
