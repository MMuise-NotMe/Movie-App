import React, {useState, useEffect} from "react";
import axios from "axios";
import MovieDisplay from "../MovieDisplay/MovieDisplay";
import "./Categories.scss";

const API_KEY = "682c649a52e51fe98ff1e190dfe8c733";
const BASE_URL = "https://api.themoviedb.org/3";

const Categories = () => {
	const [categories, setCategories] = useState([]);
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [searchResults, setSearchResults] = useState([]);
	const [isPanelOpen, setIsPanelOpen] = useState(false);

	const [searchMaxPages, setSearchMaxPages] = useState(1);

	const moviesPerPage = 10;

	// get categories
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await axios.get(
					`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
				);
				setCategories(response.data.genres);
			} catch (error) {
				console.error("Error fetching genre categories:", error);
			}
		};

		fetchCategories();
	}, []);

	// for movies
	useEffect(() => {
		fetchMovies();
	}, [selectedCategories]);

	const fetchMovies = async () => {
		if (selectedCategories.length > 0) {
			try {
				const joinedCategories = selectedCategories.join("|");
				const response = await axios.get(
					`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${joinedCategories}`
				);
				setSearchResults(response.data.results);
			} catch (error) {
				console.error("Error getting movies:", error);
			}
		} else {
			console.log("yay 0");
			setSearchResults([]);
		}
	};

	// Toggle panel open/close
	const togglePanel = () => {
		setIsPanelOpen(!isPanelOpen);
	};

	const handleCheckboxChange = (categoryID) => {
		const currentIndex = selectedCategories.indexOf(categoryID);
		const updatedCategories = [...selectedCategories];

		if (currentIndex == -1) {
			updatedCategories.push(categoryID);
		} else {
			updatedCategories.splice(currentIndex, 1);
		}

		setSelectedCategories(updatedCategories);
	};


	return (
		<div className="categories-container">
			<button className="filter-button" onClick={togglePanel}>
				Filter Movies
			</button>
			<div
				className={
					"categories-panel " +
					(isPanelOpen == true ? "open" : "closed")
				}
			>
				<h3>Search by Category</h3>
				<div className="category-list">
					{categories.map((category) => (
						<label key={category.id} className="category-label">
							<input
								type="checkbox"
								value={category.id}
								onChange={() =>
									handleCheckboxChange(category.id)
								}
							/>
							{category.name}
						</label>
					))}
				</div>
			</div>
			<div className="movie-display-area">
				{searchResults.length > 0 ? (
					<div>
						<MovieDisplay
							moviesArray={searchResults}
							maxMoviesPerPage={moviesPerPage}
						/>
					</div>
				) : (
					<div>No Movies</div>
				)}
			</div>
		</div>
	);
};

export default Categories;
