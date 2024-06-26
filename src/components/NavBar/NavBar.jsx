import React, {useState} from "react";
import {Link} from "react-router-dom";
import "./NavBar.scss";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const handleMenu = () => {
        setIsOpen(!isOpen);
    }

	return (
		<nav className="navbar">
			<div className="navbar-title">
				<Link to="/">Movie App</Link>
                <i className="fa fa-bars navbar-open" onClick={handleMenu}></i>
			</div>
			<div className={"navbar-links " + (isOpen ? "open" : "closed")}>
				<Link to="/" className="nav-link">
					<div className="link-element">Home</div>
				</Link>
                <Link to="/categories" className="nav-link">
					<div className="link-element">Categories</div>
				</Link>
			</div>
		</nav>
	);
}

export default Navbar;
