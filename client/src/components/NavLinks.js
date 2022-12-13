import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import '../styles/Header.css';

const NavigationLinks = () => {
	return (
			<>
				<li className="">
					{Auth.loggedIn() ? (
						<p className="header_link">
							<p className="nav_link" onClick={Auth.logout}>
								Logout
							</p>
						</p>
					) : (
						<Link to="/login" className="header_link">
							<p className="nav_link">
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
			</>
	);
};

export default NavigationLinks;
