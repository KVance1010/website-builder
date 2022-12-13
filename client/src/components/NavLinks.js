import React from 'react';
import { NavLink } from 'react-router-dom';
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
						<NavLink activeClassName="active" to="/login" className="header_link">
							<p className="nav_link">
								Login
							</p>
						</NavLink>
					)}
				</li>
				<li>
					<NavLink activeClassName="active" to="/projects" className="header_link">
						<p className="nav_link">Projects</p>
					</NavLink>
				</li>
				<li>
					<NavLink activeClassName="active" to="/export" className="header_link">
						<p className="nav_link">Export</p>
					</NavLink>
				</li>
			</>
	);
};

export default NavigationLinks;
