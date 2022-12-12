import React, { useState, Component } from "react";
// import React from 'react';
// import uploadImage from "../../../server/utils/images";
import { Cloudinary } from '@cloudinary/url-gen';
import Save from '../components/Save_wrk';
import { AdvancedImage } from '@cloudinary/react';
import { CloudinaryImage } from "@cloudinary/url-gen";
import { URLConfig } from "@cloudinary/url-gen";
import { CloudConfig } from "@cloudinary/url-gen";

import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { scale } from '@cloudinary/transformation-builder-sdk/actions/resize';

import "../styles/Workbench_build.css";

import { PopoverPicker } from "../components/PopoverPicker";
import CardComponent from '../components/CardComponent';
import Dustbin from '../components/Dustbin';

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

// var cl = new cloudinary.Cloudinary({cloud_name: "dokk84fdh", secure: true});
// cloudinary.uploader().upload(new File("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg"),
//   ObjectUtils.asMap("public_id", "olympic_flag"));
// cloudinary.imageTag('sneaker.png', {crop: "scale", width: 150 }).toHtml();


import UploadWidget from "../components/UploadWidget";

import { uploadImage, getAssetInfo, createImageTag } from '../utils/images'
import { Position } from "@cloudinary/transformation-builder-sdk/qualifiers";

const flair = {
	addNavBarSizing: {
		width: "25%",
		minHeight: "100%",
	},
	addNavBarColor: {
		backgroundColor: "#77C3EC",
	},
	className: {
		display: 'flex',

	},
	componentBar: {
		minHeight: 200
	}
	// templateWrapper: {
	// 	padding: "10px",
	// 	backgroundColor: 'blue'
	// },
};

const WRK = () => {
	const cld = new Cloudinary({
		cloud: {
			cloudName: 'dkc5agj8u'
		}
	});


	let codeCompileArr = [];
	const [visibilityNav, setVisibilityNav] = useState(false);
	const [visibilityComp, setVisibilityComp] = useState(false);

	const [nav, setNav] = useState("Add Navigation Bar");

	const [visibilityUpload, setVisibilityUpload] = useState(false);



	const [color, setColor] = useState("#aabbcc");
	const [colorNavTitle, setColor1] = useState("#aabbcc");
	const [colorNavLinks, setColor2] = useState("#aabbcc");

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

	const addComp = () => {
		setVisibilityComp(!visibilityComp);
	}

	const navDir = () => {
		let navDirVal = document.getElementById("navDir").textContent;
		if (navDirVal === "Right") {
			document.getElementById("navDir").innerHTML = "Left";
		}
		if (navDirVal === "Left") {
			document.getElementById("navDir").innerHTML = "Right";
		}
	};

	const [imageName, setImageName] = useState("");
	const handleImageName = (e) => {
		let imgname = e.target.value
		setImageName(imgname)
		console.log(imageName, "kyle66")
	};

	const [navImgLink, setNavImgLink] = useState("")

	const [imageSubmitVisibility, setImageSubmitVisibility] = useState(true)

	const imageSubmit = (e) => {
		e.preventDefault();
		let inputVal = document.getElementById('imgName').value
		let regEx = "^[a-zA-Z0-9_ ]*$"
		if (inputVal.match(regEx)) {
			setVisibilityUpload(true);
			setImageSubmitVisibility(false)
			console.log(imageName)
			
			setNavImgLink('https://res.cloudinary.com/dkc5agj8u/image/upload/' + encodeURIComponent(imageName.trim()) + '.png')			
		} else { alert("Invalid name, please use alphanumeric characters.") }
	};

	const navSubmit = async (e) => {
		e.preventDefault();
		setVisibilityUpload(false);
		setImageSubmitVisibility(true);
		// let navImgBtn = document.getElementById('imageBtn');
		let navSubmitBtn = document.getElementById('navBtn');
		// navImgBtn.text("Try Another Image");

		// if (!clickedBtn.getAttribute('count'))
		//render object
		let fontTitle = document.getElementsByName('fontTitle');
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
			navImgLink: navImgLink,
			navImgPubId: imageName,
			navTitleColor: colorNavTitle,
			navLinksColor: colorNavLinks
		};
		codeCompileArr.push(temp);
		console.log(codeCompileArr);
		let renderDiv = document.getElementById("renderDiv");
		renderDiv.innerHTML = "";


		//render page
		let navObj = -1
		for (let i = 0; i < codeCompileArr.length; i++) {
			if (codeCompileArr[i].contentTitle === "navbar") {
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
				color: ${navRenderObj.navTitleColor};
				font-family: ${navRenderObj.fontTitle}`
			);
			title.textContent = navRenderObj.homeTitle;
			let navImg = document.createElement("img");
			navImg.setAttribute(
				"style",
				`width: 150px;
				height: 150px;
				font-size: 40px;
				text-align: center;`
			);
			navImg.setAttribute(
				"src",
				`${navRenderObj.navImgLink}`
			)
			navImg.setAttribute(
				"public_id",
				`${navRenderObj.navImgPubId}`
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
					color: ${navRenderObj.navLinksColor};
					font-family: ${navRenderObj.fontNavLinks};`)

				navLink.textContent = navRenderObj.navlinks[0][i];
				nav.append(navLink);
			}

			// let navImage = uploadImage(image, )	

			navSubmitBtn.textContent = "Update NavBar Settings";

			header.append(title);
			header.append(navImg);
			header.append(nav);
			renderDiv.appendChild(header);
		}
	};

	return (
		<React.Fragment>
			<div className="container-fluid">
				<div className="row">
					<aside
						id="sidebar"
						className="col-3 d-flex flex-column align-items-center"
					>	<div className="navInputWrapper">
							<div className="row d-flex">
								<div className="col">
									<h2 className="mt-3 workbenchTitle">Workbench</h2>
								</div>
								<div className="col">
									<button
										style={{ position: 'relative', top: '15px' }}
										className="btn btn-success"
										type="button"
										onClick={start}
									>
										Start
									</button>
								</div>
							</div>
							<button
								style={{ color: 'white' }}
								className="btn dropdown-toggle w-100"
								type="button"
								onClick={addNav}
								id="addNavBtn"
							>
								{nav}
							</button>
							{visibilityNav ? (

								<div style={flair.addNavBarColor} className="col-12 inner-container">

									<div className="row">
										<div className="d-flex justify-content-between">
											<label className="labelText">Select background color: </label>
											{<PopoverPicker color={color} onChange={setColor} />}
										</div>
									</div>

									<hr className="navBenchBreak"></hr>

									<div className="row-12">
										<label className="col-6 labelText">
											Title of home page
										</label>
										<input className="col-6" type="text" id="homeTitle"></input>
									</div>

									<hr className="navBenchBreak"></hr>

									<div className="row labelText">
										<p>Select a font for header Title:</p>
									</div>

									<div className="row">
										<div className="col-4">
											<label className="labelText" htmlFor="serif" style={{ fontFamily: 'Serif' }}>Serif
												<input type="radio" name="fontTitle" value="Serif" style={{ fontFamily: 'Serif' }} />
											</label>
											<label className="labelText" htmlFor="comic sans MS" style={{ fontFamily: 'Cursive' }}>Comic Sans
												<input type="radio" name="fontTitle" value="comic sans MS" style={{ fontFamily: 'Cursive' }} />
											</label>
											<label className="labelText" htmlFor="fantasy" style={{ fontFamily: 'Fantasy' }}>Impact
												<input type="radio" name="fontTitle" value="Fantasy" style={{ fontFamily: 'Fantasy' }} />
											</label>
										</div>

										<div className="col-4">
											<label className="labelText" htmlFor="arial" style={{ fontFamily: 'sans-serif' }}>Arial
												<input type="radio" name="fontTitle" value="arial" style={{ fontFamily: 'sans-serif' }} />
											</label>
											<label className="labelText" htmlFor="Courier" style={{ fontFamily: 'monospace' }}>Courier
												<input type="radio" name="fontTitle" value="Courier" style={{ fontFamily: 'monospace' }} />
											</label>
											<label className="labelText" htmlFor="Tahoma" style={{ fontFamily: 'sans-serif' }}>Tahoma
												<input type="radio" name="fontTitle" value="Tahoma" style={{ fontFamily: 'sans-serif' }} />
											</label>
										</div>

										<div className="col-4">
											<label className="labelText" htmlFor="Monaco" style={{ fontFamily: 'Monospace' }}>Monaco
												<input type="radio" name="fontTitle" value="Monaco" style={{ fontFamily: 'Monospace' }} />
											</label>
											<label className="labelText" htmlFor="brush script mt, cursive" style={{ fontFamily: 'brush script mt, cursive' }}>Brush
												<input type="radio" name="fontTitle" value="brush script mt, cursive" style={{ fontFamily: 'brush script mt, cursive' }} />
											</label>
											<label className="labelText" htmlFor="lucida" style={{ fontFamily: 'Monospace' }}>Lucida
												<input type="radio" name="fontTitle" value="lucida" style={{ fontFamily: 'Monospace' }} />
											</label>
										</div>
									</div>

									<hr className="navBenchBreak"></hr>

									<div className="row">
										<div className="d-flex justify-content-between">
											<label className="labelText">Select Title Color: </label>
											{<PopoverPicker color={colorNavTitle} onChange={setColor1} />}
										</div>
									</div>

									<hr className="navBenchBreak"></hr>

									<div className="row-12">
										<label className="col-6 labelText">
											Add profile image/logo:
											{imageSubmitVisibility ? (
												<button
													className="btn btn-primary col-9 labelText"
													id="imageBtn"
													onClick={imageSubmit}
												>
													Submit / Update Image
												</button>
											) : <div></div>}
											{visibilityUpload ? (
												<UploadWidget imageName={imageName} />
											) : <div></div>}
										</label>
										<input className="col-6" type="text" id="imgName" onKeyUp={handleImageName} placeholder="img name here"></input>
									</div>
																
									<hr className="navBenchBreak"></hr>

									<div className="row-12">
										<label className="col-6 labelText">
											Input navLinks <br /> (<i>Separate by ','!</i>):
										</label>
										<input className="col-6" type="text" id="navLinksString"></input>
									</div>

									<hr className="navBenchBreak"></hr>

									<div className="row-12">
										<label className="col-6 labelText">Anchor nav links left/right: </label>
										<button className="col-6 btn btn-primary" id="navDir" onClick={navDir}>
											Right
										</button>
									</div>

									

									

									<hr className="navBenchBreak"></hr>

									
									

									

									<div className="row labelText">
										<p>What font would you like to use for your nav links:</p>
									</div>

									<div className="row">
										<div className="col-4">
											<label className="labelText" htmlFor="serif" style={{ fontFamily: 'Serif' }}>Serif
												<input type="radio" name="fontNav" value="Serif" style={{ fontFamily: 'Serif' }} />
											</label>
											<label className="labelText" htmlFor="comic sans MS" style={{ fontFamily: 'Cursive' }}>Comic Sans
												<input type="radio" name="fontNav" value="comic sans MS" style={{ fontFamily: 'Cursive' }} />
											</label>
											<label className="labelText" htmlFor="fantasy" style={{ fontFamily: 'Fantasy' }}>Impact
												<input type="radio" name="fontNav" value="Fantasy" style={{ fontFamily: 'Fantasy' }} />
											</label>
										</div>

										<div className="col-4">
											<label className="labelText" htmlFor="arial" style={{ fontFamily: 'sans-serif' }}>Arial
												<input type="radio" name="fontNav" value="arial" style={{ fontFamily: 'sans-serif' }} />
											</label>
											<label className="labelText" htmlFor="Courier" style={{ fontFamily: 'monospace' }}>Courier
												<input type="radio" name="fontNav" value="Courier" style={{ fontFamily: 'monospace' }} />
											</label>
											<label className="labelText" htmlFor="Tahoma" style={{ fontFamily: 'sans-serif' }}>Tahoma
												<input type="radio" name="fontNav" value="Tahoma" style={{ fontFamily: 'sans-serif' }} />
											</label>
										</div>

										<div className="col-4">
											<label className="labelText" htmlFor="Monaco" style={{ fontFamily: 'Monospace' }}>Monaco
												<input type="radio" name="fontNav" value="Monaco" style={{ fontFamily: 'Monospace' }} />
											</label>
											<label className="labelText" htmlFor="brush script mt, cursive" style={{ fontFamily: 'brush script mt, cursive' }}>Brush
												<input type="radio" name="fontNav" value="brush script mt, cursive" style={{ fontFamily: 'brush script mt, cursive' }} />
											</label>
											<label className="labelText" htmlFor="lucida" style={{ fontFamily: 'Monospace' }}>Lucida
												<input type="radio" name="fontNav" value="lucida" style={{ fontFamily: 'Monospace' }} />
											</label>
										</div>
									</div>

									<hr className="navBenchBreak"></hr>

									<div className="row">
										<div className="d-flex justify-content-between">
											<label className="labelText">Select NavLink Color: </label>
											{<PopoverPicker color={colorNavLinks} onChange={setColor2} />}
										</div>
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
						</div>
						<button
							style={{ color: 'white' }}
							className="btn dropdown-toggle w-100"
							type="button"
							onClick={addComp}
							id="addComponentBtn"
						>
							Add Components
						</button>
						{visibilityComp ? (
							<div style={flair.componentBar} className="inner-container">
								<CardComponent />
							</div>
						) : (
							<div></div>
						)}
						<Save myProp = {codeCompileArr}/>
					</aside>
					<main
						className="col-9 wrk-concept-container" style={{ padding: '0px' }}>

						<Dustbin />
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