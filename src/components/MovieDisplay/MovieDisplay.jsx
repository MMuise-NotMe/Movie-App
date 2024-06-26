import React, {useState, useRef} from "react";
import "./MovieDisplay.scss";
import Movie from "../Movie/Movie";

const MovieDisplay = ({moviesArray, maxMoviesPerPage}) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [inTransition, setInTransition] = useState(false);
	const divRef = useRef(null);
	const moviesPerPage = maxMoviesPerPage;

	const totalPages = Math.ceil(moviesArray.length / moviesPerPage);

	// Get the movies for the current page
	const currentMovies = moviesArray.slice(
		(currentPage - 1) * moviesPerPage,
		currentPage * moviesPerPage
	);

	const handlePrevPage = () => {
		if (currentPage > 1) {
			setInTransition(true);
			setTimeout(() => {
				setInTransition(false);
				setCurrentPage(currentPage - 1);
				scrollToTop();
			}, 300);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setInTransition(true);
			setTimeout(() => {
				setInTransition(false);
				setCurrentPage(currentPage + 1);
				scrollToTop();
			}, 300);
		}
	};

	const scrollToTop = () => {
		if (divRef.current) {
			divRef.current.scrollTop = 0;
		}
	};

	return (
		<div className="movies-display" ref={divRef}>
			<div
				className={
					"movies " +
					(inTransition === false ? "" : "transition-phase")
				}
			>
				{currentMovies.map((movie) => (
					<Movie key={movie.id} movie={movie} />
				))}
			</div>
			{totalPages > 1 ? (
				<div className="page-buttons">
					<button
						onClick={handlePrevPage}
						disabled={currentPage === 1}
					>
						←
					</button>
					<span>
						Page {currentPage} of {totalPages}
					</span>
					<button
						onClick={handleNextPage}
						disabled={currentPage === totalPages}
					>
						→
					</button>
				</div>
			) : (
				<div></div>
			)}
		</div>
	);
};

export default MovieDisplay;
