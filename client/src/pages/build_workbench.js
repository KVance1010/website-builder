import React, { useState } from 'react';
// import React from 'react';
import '../styles/build_workbench.css';

const flair = {
	addNavBarSizing: {
		width: '25%',
		minHeight: '100%',
	},
	addNavBarColor: {
		backgroundColor: 'aquamarine',
	},
};

const WRK = () => {
	let codeCompileArr = [];
	const [visibilityNav, setVisibilityNav] = useState(false);
	const [optional, setOptional] = useState(false);
	const [nav, setNav] = useState("add navigation Bar");
	

	const start = () => {
		codeCompileArr = [];
	};

	const addNav = () => {
		if (visibilityNav) {
			setVisibilityNav(false);
			setNav('Add navigation Bar');
		} else {
			setVisibilityNav(true);
			setNav('remove navigation Bar');
		}
	};


	const navSubmit = (e) => {
		e.preventDefault();
		setOptional(true);
		let navColor = document.getElementById('navColor').value;
		let navLinksString = document.getElementById('navLinksString').value;
		let homeTitle = document.getElementById('homeTitle').value;
		let navLinks = navLinksString.split(',');
		let temp = {
			navColor: navColor,
			homeTitle: homeTitle,
			navlinks: [navLinks],
		};
		codeCompileArr.push(temp);
		console.log(codeCompileArr);
		let renderDiv = document.getElementById('renderDiv');
		let header = document.createElement('div');
		let title = document.createElement('div');
		title.textContent = homeTitle;
		let nav = document.createElement('ul');
		for (let i = 0; i < navLinks.length; i++) {
			let navLink = document.createElement('li');
			navLink.textContent = navLinks[i];
			nav.append(navLink);
		}
		header.append(title);
		header.append(nav);
		renderDiv.appendChild(header);
	};

	return (
		<div>
			<h1>Build Workbench Page</h1>
			<div className="outer-container">
				<div style={flair.addNavBarSizing} className="inner-container">
					<button className="startBtn" onClick={start}>
						start
					</button>
					<button onClick={addNav} id="addNavBtn">
						{nav}
					</button>
					{visibilityNav ? (
						<div style={flair.addNavBarColor} className="inner-container">
							<label>
								background color for nav bar
								<input type="text" id="navColor"></input>
							</label>
							<label>
								nav bar links followed by , to separate them
								<input type="text" id="navLinksString"></input>
							</label>
							<label>
								Title of home page
								<input type="text" id="homeTitle"></input>
							</label>
							<button id="navBtn" onClick={navSubmit}>
								submit nav settings
							</button>
						</div>
					) : (
						<div></div>
					)}
				</div>
				<div className="wrk-concept-container">
					<div id="renderDiv"></div>
				</div>
			</div>
		</div>
	);
};

export default WRK;
