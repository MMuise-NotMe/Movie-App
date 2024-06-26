import React from "react";
import "./SearchBar.scss";

const SearchBar = ({handleSearch, searchQuery, setSearchQuery}) => {
	return (
		<div className="search-bar">
			<form className="form-div" onSubmit={handleSearch}>
				<h3>Welcome to my Movie App</h3>
				<div className="input-area">
					<div className="input-con">
						<input
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							onSubmit={handleSearch}
                            className={(searchQuery && ("has-words"))}
							placeholder="Search for movies"
						/>
						<button type="submit" className={"search-button " + (searchQuery && ("active"))}>
							<i className="fa fa-arrow-right"></i>
						</button>
						{searchQuery && (
							<button type="submit" className="search-button">
								<i className="fa fa-arrow-right"></i>
							</button>
						)}
					</div>
				</div>
			</form>
		</div>
	);
};

export default SearchBar;
