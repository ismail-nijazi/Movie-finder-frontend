import React from "react";
import "./Componetns/main.scss";
import Header from "./Componetns/Header/Header";
import Navbar from "./Componetns/Navbar/Navbar";
import WatchList from "./Componetns/WatchList/WatchList";
import Main from "./Componetns/Main";
import Login from "./Componetns/User/Login";
import { Provider } from "./context/search_MovieInfo_context";

function App() {
	return (
		<Provider>
			<Navbar />
			<Header />
			<WatchList />
			<Main />
			<Login />
		</Provider>
	);
}

export default App;
