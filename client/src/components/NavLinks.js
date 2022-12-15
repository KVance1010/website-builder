import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import '../styles/Header.css';

const NavigationLinks = () => {
	return (
		<>
			<li className="">
				{Auth.loggedIn() ? (
					<a className="header_link">
						<p id="logout_button" className="nav_link" onClick={Auth.logout}>
							Logout
						</p>
					</a>
				) : (
					<Link to="/login" className="header_link">
						<p className="nav_link">Login</p>
					</Link>
				)}
			</li>
			<li>
				{Auth.loggedIn() ? (
					<Link to="/projects" className="header_link">
						<p className="nav_link">Projects</p>
					</Link>
				) : (
					<Link to="/login" className="header_link">
						<p className="nav_link">Projects</p>
					</Link>
				)}
			</li>
			<li>
				{Auth.loggedIn() ? (
					<Link to="/export" className="header_link">
						<p className="nav_link">Export</p>
					</Link>
				) : (
					<Link to="/login" className="header_link">
						<p className="nav_link">Export</p>
					</Link>
				)}
			</li>
		</>
	);
};

export default NavigationLinks;
