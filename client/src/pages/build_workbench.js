import React, { useState } from "react";
// import React from 'react';
import "../styles/build_workbench.css";

import { PopoverPicker } from "../components/PopoverPicker";

const flair = {
	addNavBarSizing: {
		width: "25%",
		minHeight: "100%",
	},
	addNavBarColor: {
		backgroundColor: "aquamarine",
	},
	// templateWrapper: {
	// 	padding: "10px",
	// 	backgroundColor: 'blue'
	// },
};

const WRK = () => {
	let codeCompileArr = [];
	const [visibilityNav, setVisibilityNav] = useState(false);
	const [optional, setOptional] = useState(false);
	const [nav, setNav] = useState("Add Navigation Bar");

	const [color, setColor] = useState("#aabbcc");

	const start = () => {
		codeCompileArr = [];
	};

	const addNav = () => {
		if (visibilityNav) {
			setVisibilityNav(false);
			setNav("Add Navigation Bar");
		} else {
			setVisibilityNav(true);
			setNav("Remove Navigation Bar");
		}
	};

	const navSubmit = (e) => {
		e.preventDefault();
		const clickedBtn = e.target
		// if (!clickedBtn.getAttribute('count'))
		setOptional(true);
		let navColor = document.getElementById("navColor").value;
		let navLinksString = document.getElementById("navLinksString").value;
		let homeTitle = document.getElementById("homeTitle").value;
		let navLinks = navLinksString.split(",");
		let temp = {
			navColor: navColor,
			homeTitle: homeTitle,
			navlinks: [navLinks],
		};
		codeCompileArr.push(temp);
		console.log(codeCompileArr);
		let renderDiv = document.getElementById("renderDiv");
		console.log(renderDiv.childrenOf(), "string here")
		let header = document.createElement("div");
		let title = document.createElement("div");
		title.textContent = homeTitle;
		let nav = document.createElement("ul");
		for (let i = 0; i < navLinks.length; i++) {
			let navLink = document.createElement("li");
			navLink.textContent = navLinks[i];
			nav.append(navLink);
		}
		header.append(title);
		header.append(nav);
		renderDiv.appendChild(header);
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<aside id="sidebar" className="col-3 d-flex flex-column align-items-center">
					<h2 className="mt-3">Workbench</h2>
					<button className="btn btn-success w-100" type="button">
						Start
					</button>
					<button
						className="btn dropdown-toggle w-100"
						type="button"
						onClick={addNav}
						id="addNavBtn"
					>
						{nav}
					</button>
					{visibilityNav ? (
						<div style={flair.addNavBarColor} className="inner-container">
							<div className="d-flex justify-content-between">
								<label>
									background color for nav bar
								</label>
								{<PopoverPicker color={color} onChange={setColor} />}
							</div>
							<label>
								nav bar links followed by , to separate them
								<input type="text" id="navLinksString"></input>
							</label>
							<label>
								Title of home page
								<input type="text" id="homeTitle"></input>
							</label>
							<button className="btn btn-primary m-3" id="navBtn" onClick={navSubmit}>
								Submit Nav Settings
							</button>

						</div>
					) : (
						<div></div>
					)}
					<button className="btn dropdown-toggle w-100" type="button">
						Dropdown button
					</button>
				</aside>
				<main className="col-9 wrk-concept-container" style={{ backgroundColor: color }}>
					<div id="renderDiv"></div>
				</main>
			</div>
		</div>

		// <div >
		// 	<h1>Build Workbench Page</h1>
		// 	<div className="d-flex">
		// 		<div style={flair.addNavBarSizing} className="inner-container">
		// 			<button className="startBtn" onClick={start}>
		// 				start
		// 			</button>
		// 			<button onClick={addNav} id="addNavBtn">
		// 				{nav}
		// 			</button>
		// 			{visibilityNav ? (
		// 				<div style={flair.addNavBarColor} className="inner-container">
		// 					<label>
		// 						background color for nav bar
		// 						<input type="text" id="navColor"></input>
		// 					</label>
		// 					<label>
		// 						nav bar links followed by , to separate them
		// 						<input type="text" id="navLinksString"></input>
		// 					</label>
		// 					<label>
		// 						Title of home page
		// 						<input type="text" id="homeTitle"></input>
		// 					</label>
		// 					<button id="navBtn" onClick={navSubmit}>
		// 						submit nav settings
		// 					</button>

		// 				</div>
		// 			) : (
		// 				<div></div>
		// 			)}

		// 		</div>
		// 		<div style={flair.templateWrapper} className="wrk-concept-container">
		// 			<div id="renderDiv"></div>
		// 		</div>
		// 	</div>

		// </div>
	);
};

export default WRK;