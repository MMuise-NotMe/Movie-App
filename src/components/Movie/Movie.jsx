import React from "react";
import {Link} from "react-router-dom";
import "./Movie.scss";
import variables from "../../styles/filename.module.scss";

function Movie({movie}) {
	let releaseYear = new Date(movie.release_date).getFullYear();

	function getBackgroundColor(rating) {
		if (rating >= 8) {
			return variables.ratingGood;
		} else if (rating >= 5) {
			return variables.ratingOkay;
		} else {
			return variables.ratingBad;
		}
	}

	return (
		<div className="movie">
			<Link to={`/movie/${movie.id}`}>
				<div className="movie-title-rating">
					<img
						src={
							movie.poster_path
								? `https://image.tmdb.org/t/p/w185/${movie.poster_path}`
								: "https://via.placeholder.com/185x278?text=No+Image"
						}
						alt={movie.title + " picture"}
					/>
					<div className="rating">
						<p
							style={{
								backgroundColor: getBackgroundColor(
									movie.vote_average.toFixed(0)
								),
							}}
						>
							{movie.vote_average.toFixed(2)}
						</p>
					</div>
				</div>
				<p className="movie-title">{movie.title}</p>
				<p className="movie-release">{releaseYear}</p>
			</Link>
		</div>
	);
}

export default Movie;
