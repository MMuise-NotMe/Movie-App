import React, {useState, useEffect} from "react";
import axios from "axios";
import MovieDisplay from "../MovieDisplay/MovieDisplay";
import SearchBar from "../SearchBar/SearchBar";
import "./Home.scss";

const API_KEY = "682c649a52e51fe98ff1e190dfe8c733";
const BASE_URL = "https://api.themoviedb.org/3";

function Home() {
	const [searchQuery, setSearchQuery] = useState("");
	const [movies, setMovies] = useState([]);
	const [popularMovies, setPopularMovies] = useState([]);
	const [isSearching, setIsSearching] = useState(false);

	const [searchPage, setSearchPage] = useState(1);
	const [searchMaxPages, setSearchMaxPages] = useState(1);

	const [popularPage, setPopularPage] = useState(1);

	const moviesPerPage = 10;

	useEffect(() => {
		fetchPopularMovies(1);
	}, []);

	const handleSearch = (e) => {
		e.preventDefault();
		setMovies([]);
		setSearchMaxPages(1);
		setSearchPage(1);
		setIsSearching(true);
		if (searchQuery) {
			fetchSearchResults(searchQuery);
		} else {
			setIsSearching(false);
		}
	};

	const fetchSearchResults = async (searchQuery, page = 1) => {
		if (page > searchMaxPages) {
			setIsSearching(false);
			return;
		}

		try {
			const response = await axios.get(
				`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${page}`
			);
			setMovies((prevMovies) => [
				...prevMovies,
				...response.data.results,
			]);
			setSearchPage(page);
			setSearchMaxPages(response.data.total_pages);
		} catch (error) {
			console.error("Error searching movies:", error);
		} finally {
			setIsSearching(false);
		}
	};

	const fetchPopularMovies = async (page = 1) => {
		if (page == 1) {
			setPopularMovies([]);
		}

		try {
			const response = await axios.get(
				`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
			);
			setPopularMovies((prevPopular) => [
				...prevPopular,
				...response.data.results,
			]);
		} catch (error) {
			console.error("Error fetching popular movies:", error);
		} finally {
			setPopularPage(page);
		}
	};

	const loadMoreSearchResults = () => {
		fetchSearchResults(searchQuery, searchPage + 1);
	};

	const loadMorePopularMovies = () => {
		fetchPopularMovies(popularPage + 1);
	};

	return (
		<div className="home">
			<SearchBar
				handleSearch={handleSearch}
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
			/>

			<h2>Search Results</h2>
			{isSearching === true ? (
				<div className="search-movies-loading">
					<div className="loading-circle"></div>
				</div>
			) : movies.length < 1 ? (
				<div className="search-movies-none">No search results</div>
			) : (
				<div className="search-movies">
					<MovieDisplay
						moviesArray={movies}
						maxMoviesPerPage={moviesPerPage}
					/>
					{searchMaxPages > 2 && isSearching == false ? (
						<button
							className="more-page-btn"
							onClick={loadMoreSearchResults}
						>
							Load More Search Results
						</button>
					) : (
						<div></div>
					)}
				</div>
			)}

			<h2>Popular Movies</h2>
			<div className="popular-movies">
				<MovieDisplay
					moviesArray={popularMovies}
					maxMoviesPerPage={moviesPerPage}
				/>
				<button
					className="more-page-btn"
					onClick={loadMorePopularMovies}
				>
					Load More Search Results
				</button>
			</div>
		</div>
	);
}

export default Home;
