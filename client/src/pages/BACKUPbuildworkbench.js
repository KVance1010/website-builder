import React, { useState, Component } from "react";
// import React from 'react';
// import uploadImage from "../../../server/utils/images";
import { Cloudinary } from '@cloudinary/url-gen';

import { AdvancedImage } from '@cloudinary/react';
import { CloudinaryImage } from "@cloudinary/url-gen";
import { URLConfig } from "@cloudinary/url-gen";
import { CloudConfig } from "@cloudinary/url-gen";

import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { scale } from '@cloudinary/transformation-builder-sdk/actions/resize';

import "../styles/Build_workbench.css";
// import Header from "../components/Header"

// var cl = new cloudinary.Cloudinary({cloud_name: "dokk84fdh", secure: true});
// cloudinary.uploader().upload(new File("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg"),
//   ObjectUtils.asMap("public_id", "olympic_flag"));
// cloudinary.imageTag('sneaker.png', {crop: "scale", width: 150 }).toHtml();



import { PopoverPicker } from "../components/PopoverPicker";

import {uploadImage, getAssetInfo, createImageTag} from '../utils/images'

const flair = {
	addNavBarSizing: {
		width: "25%",
		minHeight: "100%",
	},
	addNavBarColor: {
		backgroundColor: "aquamarine",
	},
	className: {
		display: 'flex',

	}
	// templateWrapper: {
	// 	padding: "10px",
	// 	backgroundColor: 'blue'
	// },
};

const WRK = () => {

	let codeCompileArr = [];
	const [visibilityNav, setVisibilityNav] = useState(false);

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
	const navDir = () => {
		let navDirVal = document.getElementById("navDir").textContent;
		if (navDirVal === "Right") {
			document.getElementById("navDir").innerHTML = "Left";
		}
		if (navDirVal === "Left") {
			document.getElementById("navDir").innerHTML = "Right";
		}
	};

	const imageSubmit = (e) => {
		e.preventDefault();
		let navImage = document.getElementById('imgLink').value;
		let navPubId = document.getElementById('imgName').value;
		// if (codeCompileArr.map(function(x){if (x == navImage || x == navPubId){
		// 	let indexOfImg = codeCompileArr.indexOf(navImage)
		// 	let indexOfPubId = codeCompileArr.indexOf(navPubId)
		// 	codeCompileArr.splice(indexOfImg, 0)
		// 	codeCompileArr.splice(indexOfPubId, 0)
		// }}));
		// let savedImage = await uploadImage(codeCompileArr.navImgUrl, codeCompileArr.navPublicId)		
		let tempImg = {
			navImage: navImage,
			navPubId: navPubId
		};
		console.log(tempImg, "temp1")
		codeCompileArr.push(tempImg);
		console.log(codeCompileArr, "temp2")
		// return temp;
	}


	const navSubmit = (e) => {
		e.preventDefault();


		// if (!clickedBtn.getAttribute('count'))
		//render object
		let fontTitle = document.getElementsByName('fontTitle')
		let titleFontVal
		for (let i = 0; i < fontTitle.length; i++) {
			if (fontTitle[i].checked) {
				titleFontVal = fontTitle[i].value
			}
		}
		let fontNav = document.getElementsByName('fontNav')
		let navFontVal
		for (let i = 0; i < fontNav.length; i++) {
			if (fontNav[i].checked) {
				navFontVal = fontNav[i].value
			}
		}
		console.log(navFontVal)
		
		
		let navDirVal = document.getElementById("navDir").textContent;
		let navColor = color;
		let navLinksString = document.getElementById("navLinksString").value;
		let homeTitle = document.getElementById("homeTitle").value;
		let navLinks = navLinksString.split(",");
		let temp = {
			contentTitle: "navbar",
			navColor: navColor,
			homeTitle: homeTitle,
			navlinks: [navLinks],
			navDir: navDirVal,
			fontTitle: titleFontVal,
			fontNavLinks: navFontVal,
			
		};
		codeCompileArr.push(temp);
		console.log(codeCompileArr);
		let renderDiv = document.getElementById("renderDiv");
		renderDiv.innerHTML = "";


		//render page
		let navObj = -1
		for (let i = 0; i < codeCompileArr.length; i++) {
			if (codeCompileArr[i].contentTitle === "navbar") {
				console.log('yes')
				navObj = i;
			}
		}
		if (navObj === -1) {
		} else {
			let navRenderObj = codeCompileArr[navObj];
			let header = document.createElement("div");
			header.setAttribute(
				"style",
				`width: 100%;
				background-color: ${navRenderObj.navColor};`
			);
			let title = document.createElement("div");
			title.setAttribute(
				"style",
				`width: 100%;
				font-size: 40px;
				text-align: center;
				font-family: ${navRenderObj.fontTitle}`
			);
			title.textContent = navRenderObj.homeTitle;
			let navImg = document.createElement("div");
			navImg.setAttribute(
				"style",
				`width: 150px;
				height: 150px;
				font-size: 40px;
				text-align: center;`
			);
			navImg.setAttribute(
				"href",
				`${navRenderObj.navImage}`
			)
			navImg.setAttribute(
				"public_id",
				`${navRenderObj.navPubId}`
			)
			let nav = document.createElement("ul");
			if (navRenderObj.navDir === 'Left') {
				nav.setAttribute(
					"style",
					`width: 100%;
					display: flex;
					margin-right: 15px;
					justify-content: start;`
				)
			}
			if (navRenderObj.navDir === 'Right') {
				nav.setAttribute(
					"style",
					`width: 100%;
				display: flex;
				margin-right: 15px;
				justify-content: end;`
				)
			}

			let tempLinks = navRenderObj.navlinks[0]
			for (let i = 0; i < tempLinks.length; i++) {
				let navLink = document.createElement("li");
				navLink.setAttribute(
					"style",
					`margin-right: 15px;
					font-family: ${navRenderObj.fontNavLinks};`)

				navLink.textContent = navRenderObj.navlinks[0][i];
				nav.append(navLink);
			}

			// let navImage = uploadImage(image, )	
			
			
			header.append(title);
			header.append(navImg);
			header.append(nav);
			renderDiv.appendChild(header);
		}
	};

	return (
		<React.Fragment>
			{/* <Header /> */}
			<div className="container-fluid">
				<div className="row">
					<aside
						id="sidebar"
						className="col-3 d-flex flex-column align-items-center"
					>
						<h2 className="mt-3">Workbench</h2>
						<button
							className="btn btn-success w-100"
							type="button"
							onClick={start}
						>
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
									<label>background color for nav bar</label>
									{<PopoverPicker color={color} onChange={setColor} />}
								</div>
								<label>
									nav bar links (seperate with a comma)
									<input type="text" id="navLinksString"></input>
								</label>
								<label>
									Title of home page
									<input type="text" id="homeTitle"></input>
								</label>
								<button id="navDir" onClick={navDir}>
									Right
								</button>
								<label>
									Add profile image/logo
									<input type="text" id="imgLink" placeholder="URL of image here"></input>
									<input type="text" id="imgName" placeholder="what is this image called?"></input>
								</label>
								<button
									className="btn btn-primary m-3"
									id="imageBtn"
									onClick={imageSubmit}
								>
									Submit Image
								</button>
								<div className="outer-container" style={{ flexDirection: 'column' }} >
									<p>What font would you like to use for your title:</p>
									<label htmlFor="sarif" style={{ fontFamily: 'Serif' }}>Sarif
										<input type="radio" id="font-1" name="fontTitle" value="Sarif" />
									</label>
									<label htmlFor="cursive" style={{ fontFamily: 'Cursive' }}>Cursive
										<input type="radio" id="font-2" name="fontTitle" value="Cursive" style={{ fontFamily: 'Cursive' }} />
									</label>
									<label htmlFor="fantasy" style={{ fontFamily: 'Fantasy' }}>Fantasy
										<input type="radio" id="font-3" name="fontTitle" value="Fantasy" style={{ fontFamily: 'Fantasy' }} />
									</label>
								</div>
								<div className="outer-container" style={{ flexDirection: 'column' }} >
									<p>What font would you like to use for your nav links:</p>
									<label htmlFor="sarif" style={{ fontFamily: 'Serif' }}>Sarif
										<input type="radio" name="fontNav" value="Sarif" />
									</label>
									<label htmlFor="cursive" style={{ fontFamily: 'Cursive' }}>Cursive
										<input type="radio" name="fontNav" value="Cursive" style={{ fontFamily: 'Cursive' }} />
									</label>
									<label htmlFor="fantasy" style={{ fontFamily: 'Fantasy' }}>Fantasy
										<input type="radio" name="fontNav" value="Fantasy" style={{ fontFamily: 'Fantasy' }} />
									</label>
								</div>
								<button
									className="btn btn-primary m-3"
									id="navBtn"
									onClick={navSubmit}
								>
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
					<main
						className="col-9 wrk-concept-container" style={{ padding: '0px' }}>
						<div id="renderDiv"></div>
					</main>
				</div>
			</div>
		</React.Fragment>

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
