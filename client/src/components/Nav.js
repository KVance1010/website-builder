import React from 'react';

function Nav({ currentPage, handlePageChange }) {
	return (
		<nav>
			<ul className="nav_list">
				<li className="nav_item">
					<a
						href="#home"
						onClick={() => handlePageChange('Home')}
						className={currentPage === 'Home' ? 'nav_link active' : 'nav_link'}
					>
						Home
					</a>
				</li>
				<li className="nav_item">
					<a
						href="#news"
						onClick={() => handlePageChange('News')}
						className={
							currentPage === 'New' ? 'nav_link active' : 'nav_link'
						}
					>
						News
					</a>
				</li>
				<li className="">
					<a
						href="#about"
						onClick={() => handlePageChange('About')}
						className={
							currentPage === 'About' ? 'nav_link active' : 'nav_link'
						}
					>
						About
					</a>
				</li>
				<li className="nav_item">
					<a
						href="#contact"
						onClick={() => handlePageChange('Contact')}
						className={
							currentPage === 'Contact' ? 'nav_link active' : 'nav_link'
						}
					>
						Contact
					</a>
				</li>
			</ul>
		</nav>
	);
}

export default Nav;

