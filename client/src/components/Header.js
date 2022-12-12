import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import '../styles/Header.css';
import logo from '../asset/Images/logo.jpg';

function Header() {
	// TODO: set active state on the nav bar and work on toggle drop down also need to save logged in state
	const [selected, setSelected] = useState('Home');

	return (
		<header className="header_container">
			<Link to="/" className="logo_link">
				<h1 className="ms-5 logo_title">
					<img className="logo_img" src={logo} /> Aspiration Architects
				</h1>
			</Link>
			<nav className="nav_container">
				<ul className="navbar_nav">
					<li className="">
						{Auth.loggedIn() ? (
							<a className="header_link">
								<p className="nav_link" onClick={Auth.logout}>
									Logout
								</p>
							</a>
						) : (
							<Link to="/login" className="header_link">
								<p className="nav_link" aria-current="page">
									Login
								</p>
							</Link>
						)}
					</li>
					<li>
						<Link to="/projects" className="header_link">
							<p className="nav_link">Projects</p>
						</Link>
					</li>
					<li>
						<Link to="/export" className="header_link">
							<p className="nav_link">Export</p>
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
