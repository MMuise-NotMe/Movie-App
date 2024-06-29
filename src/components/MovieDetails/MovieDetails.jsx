import React, {useState, useEffect} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import "./MovieDetails.scss";

const API_KEY = "682c649a52e51fe98ff1e190dfe8c733";
const BASE_URL = "https://api.themoviedb.org/3";

function MovieDetails({movieDetails}) {
	const {id} = useParams();
	const [movie, setMovie] = useState(movieDetails);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		console.log(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
		axios
			.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
			.then((response) => {
                setIsError(false);
				setMovie(response.data);
			})
			.catch((error) => {
                setIsError(true);
				console.error("Error fetching movie details:", error);
			});
	}, [id]);

	if (!movie && !isError) {
		return <div className="non-movie-details loading"></div>;
	}
    else if (isError) {
        return <div className="non-movie-details non-existent">Movie ID not recognised</div>
    }

	return (
		<div
			className="movie-details"
			style={{
				backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
			}}
		>
			<div className="movie-details-content">
				<div className="poster">
					<img
						src={
							movie.poster_path
								? `https://image.tmdb.org/t/p/w342/${movie.poster_path}`
								: "https://via.placeholder.com/342x513?text=No+Image"
						}
						alt={`${movie.title} poster`}
					/>
				</div>
				<div className="details">
					<h2>{movie.title}</h2>
					<div className="metadata">
						<p>
							<strong>Release Date: </strong>
							{movie.release_date}
						</p>
						<p>
							<strong>Rating: </strong>
							{movie.vote_average.toFixed(2)}
						</p>
						<p>
							<strong>Runtime: </strong>
							{movie.runtime} minutes
						</p>
						<p>
							<strong>Genres: </strong>
							{movie.genres.map((genre) => genre.name).join(", ")}
						</p>
					</div>
					<p className="overview">{movie.overview}</p>
				</div>
			</div>
		</div>
	);
}

export default MovieDetails;
