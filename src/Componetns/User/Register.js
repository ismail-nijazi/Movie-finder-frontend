import React, {
	useContext,
	useRef,
	useEffect,
	useState,
} from "react";
import Context from "../../context/context";
import logo from "../../Images/logo.png";

const Register = () => {
	const ctx = useContext(Context);
	const [error, setError] = useState({
		error: false,
		messages: [],
	});
	const registerRef = useRef();
	const [username, updateUsername] =
		useState("");
	const [email, updateEmail] = useState("");
	const [first_name, updateFirstName] =
		useState("");
	const [last_name, updateLastName] =
		useState("");
	const [password1, updatePassword1] =
		useState("");
	const [password2, updatePassword2] =
		useState("");

	useEffect(() => {
		ctx.registerRef[1](registerRef);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const loginSectionEvent = (e) => {
		ctx.userSection[0].current.classList.toggle(
			"hide"
		);
	};

	const showLogin = () => {
		ctx.loginRef[0].current.classList.remove(
			"hide"
		);
		ctx.registerRef[0].current.classList.add(
			"hide"
		);
	};

	const setUsername = (e) => {
		updateUsername(e.target.value);
	};
	const setFirstName = (e) => {
		updateFirstName(e.target.value);
	};
	const setLastName = (e) => {
		updateLastName(e.target.value);
	};
	const setPassword1 = (e) => {
		updatePassword1(e.target.value);
	};
	const setPassword2 = (e) => {
		updatePassword2(e.target.value);
	};
	const setEmail = (e) => {
		updateEmail(e.target.value);
	};

	const register = (e) => {
		e.preventDefault();
		const url = `${ctx.url[0]}/user/register`;
		const sendRegister = async (url) => {
			return fetch(url, {
				method: "POST",
				body: JSON.stringify({
					username: username,
					email: email,
					password: password1,
					password2: password2,
					first_name: first_name,
					last_name: last_name,
				}),
				headers: {
					"Content-Type":
						"application/json",
				},
			}).then((response) => {
				if (!response.ok) {
					response
						.json()
						.then((jsonData) => {
							setError((prev) => {
								return {
									...prev,
									error: true,
									messages:
										Object.values(
											jsonData
										),
								};
							});
						});
					return null;
				}
				return response;
			});
		};
		const result = sendRegister(url);
		result.then((data) => {
			if (data) {
				data.json().then((data) => {
					localStorage.setItem(
						"findMovieToken",
						JSON.stringify(data.token)
					);
					ctx.isLogedIn[1](true);
					ctx.userSection[0].current.classList.add(
						"hide"
					);
					ctx.watchListMovies[1]();
					showLogin();
					resetFields();
				});
			}
		});
	};

	const resetFields = () => {
		updateUsername("");
		updatePassword1("");
		updatePassword2("");
		updateFirstName("");
		updateLastName("");
		updateEmail("");
	};

	const returnErrors = () => {
		if (error.error) {
			return error.messages.map(
				(message) => {
					return (
						<p className="error_message">
							* {message}
						</p>
					);
				}
			);
		}
		return "";
	};

	return (
		<div
			className="LoginForm RegisterForm hide"
			ref={registerRef}>
			<button
				id="closeLogin"
				onClick={loginSectionEvent}>
				<i className="fas fa-times"></i>
			</button>
			<figure className="logo">
				<a href="index.html">
					<img
						src={logo}
						alt="Movie Finder"
					/>
				</a>
			</figure>
			<h3>Register</h3>
			<form onSubmit={register}>
				{returnErrors()}
				<div className="row">
					<input
						name="first_name"
						type="text"
						placeholder="First name"
						value={first_name}
						onChange={setFirstName}
					/>

					<input
						name="last_name"
						type="text"
						placeholder="Last name"
						value={last_name}
						onChange={setLastName}
					/>
				</div>
				<div className="row">
					<input
						name="username"
						type="text"
						placeholder="Username"
						value={username}
						onChange={setUsername}
						required
					/>
				</div>
				<div className="row">
					<input
						name="email"
						type="email"
						placeholder="Email"
						value={email}
						onChange={setEmail}
						required
					/>
				</div>
				<div className="row">
					<input
						name="password"
						type="password"
						placeholder="Password"
						value={password1}
						onChange={setPassword1}
						required
					/>
					<input
						name="password2"
						type="password"
						placeholder="Repeat password"
						value={password2}
						onChange={setPassword2}
						required
					/>
				</div>
				<button
					type="submit"
					className="btn">
					Create account
				</button>
				<div className="row">
					<button
						className="link"
						onClick={showLogin}
						type="button">
						Have already an account?
					</button>
				</div>
			</form>
		</div>
	);
};

export default Register;
