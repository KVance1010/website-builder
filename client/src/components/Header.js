import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import logo from '../asset/Images/logo.jpg';
import NavigationLinks from './NavLinks';

function Header() {
	const [dropDown, setDropdown] = useState(false);
	const [active, setActive] = useState('');
	const handleDropDown = () => {
		setDropdown((dropDown) => !dropDown);
		if (active === 'active') {
			setActive('');
		} else {
			setActive('active');
		}
	};

	return (
		<header className="header_container">
			<Link to="/" className="logo_link">
				<img
					className="logo_img"
					src={logo}
					alt="A book called Change by Design is on a table with a watch, tablet, and Iphone."
				/>
				<h1 className=" logo_title">Aspiration Architects</h1>
			</Link>
			<nav className="nav_container">
				<ul className="navbar__nav">
					<NavigationLinks />
				</ul>
				<div className={`hamburger ${active}`} onClick={handleDropDown}>
					<span className="bar"></span>
					<span className="bar"></span>
					<span className="bar"></span>
					{dropDown ? (
						<ul className="navbar_nav2">
							<NavigationLinks />
						</ul>
					) : (
						<div></div>
					)}
				</div>
			</nav>
		</header>
	);
}

export default Header;
