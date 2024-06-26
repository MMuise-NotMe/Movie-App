import "./App.scss";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home/Home";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import Categories from "./components/Categories/Categories";
import NavBar from "./components/NavBar/NavBar";

function App() {
	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/categories" element={<Categories />} />
				<Route path="/movie/:id" element={<MovieDetails />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
