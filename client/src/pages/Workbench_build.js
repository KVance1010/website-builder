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
let codeCompileArr = [];
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

	// TODO: add back in for page authorization
	// const token = Auth.loggedIn() ? Auth.getToken() : null;
	// 			if (!token) {
	// 			  return false;
	// 			}

	const cld = new Cloudinary({
		cloud: {
			cloudName: 'dkc5agj8u'
		}
	});

	const [cards, setCards] = useState([
		{
			top: 20,
			left: 20,
			header: {
				text: "Greetings from state!",
				style: {
					backgroundColor: {
						r: 13,
						g: 110,
						b: 253
					},
					color: 'white'
				}
			},
			body: {
				style: {
					r: 255,
					g: 255,
					b: 255
				}
			},
			bodyStyles: [
				{
					text: "Hello!",
					style: {
						fontSize: 50,
						color: {
							r: 0,
							g: 0,
							b: 0
						}
					}
				}
			]
		}
	]);

	const [visibilityNav, setVisibilityNav] = useState(false);
	const [visibilityMain, setVisibilityMain] = useState(false);
	const [visibilityComp, setVisibilityComp] = useState(false);
	const [visibilityFooter, setVisibilityFooter] = useState(false);

	const [nav, setNav] = useState("Add Navigation Bar");
	const [main, setMain] = useState("Add Main Content Section");
	const [comp, setComp] = useState("Add Components");
	const [Footer, setFooter] = useState("Add Footer Section");

	const [visibilityUpload, setVisibilityUpload] = useState(false);
	const [visibilityUpload2, setVisibilityUpload2] = useState(false);
	const [visibilityUpload3, setVisibilityUpload3] = useState(false);
	const [visibilityUpload4, setVisibilityUpload4] = useState(false);


//colorFooterGrad
	const [color, setColor] = useState("#aabbcc");
	const [colorFooterGrad, setcolorFooterGrad] = useState("#aabbcc");
	const [colorGrad, setColorGrad] = useState("#aabbcc");
	const [colorNavTitle, setColor1] = useState("#aabbcc");
	const [colorNavLinks, setColor2] = useState("#aabbcc");
	const [colorMainBackground, setColor3] = useState("#aabbcc");
	const [colorMainHeaders, setColor4] = useState("#aabbcc");
	const [colorMainText, setColor5] = useState("#aabbcc");
	const [colorBody, setColor6] = useState("#aabbcc");
	const [colorFooter, setColor7] = useState("#aabbcc");
	const [colorFooterLinks, setColor8] = useState("#aabbcc");
	const [colorFooterText, setColor9] = useState("#aabbcc");


	const start = () => {
		codeCompileArr = [];
	};

	const addNav = () => {
		if (visibilityNav) {
			setVisibilityNav(false);
			setNav("Add Navigation Bar");
		} else {
			setVisibilityNav(true);
			setNav("Collapse NavBar Bench");
		}
	};

	const addMain = () => {
		if (visibilityMain) {
			setVisibilityMain(false);
			setMain("Add Main Content Section");
		} else {
			setVisibilityMain(true);
			setMain("Collapse Main Bench");
		}
	};

	const addFooter = () => {
		if (visibilityFooter) {
			setVisibilityFooter(false);
			setFooter("Add Footer");
		} else {
			setVisibilityFooter(true);
			setFooter("Collapse Footer Bench");
		}
	};


	const addComp = () => {
		if (visibilityComp) {
			setVisibilityComp(false);
			setComp("Add Components");
		} else {
			setVisibilityComp(true);
			setComp("Collapse Component Bench");
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

	const footerDir = () => {
		let footerDirVal = document.getElementById("footerLinkDir").textContent;
		if (footerDirVal === "Right") {
			document.getElementById("footerLinkDir").innerHTML = "Left";
		}
		if (footerDirVal === "Left") {
			document.getElementById("footerLinkDir").innerHTML = "Right";
		}
	};
	const navgrad = () => {
		let navGradVal = document.getElementById("navGrad").textContent;
		if (navGradVal === "No") {
			document.getElementById("navGrad").innerHTML = "Yes";
		}
		if (navGradVal === "Yes") {
			document.getElementById("navGrad").innerHTML = "No";
		}
	};
	const footerGrad = () => {
		let footerGradVal = document.getElementById("footerGrad").textContent;
		if (footerGradVal === "No") {
			document.getElementById("footerGrad").innerHTML = "Yes";
		}
		if (footerGradVal === "Yes") {
			document.getElementById("footerGrad").innerHTML = "No";
		}
	};
	//footerGrad
	const [imageName, setImageName] = useState("");
	const handleImageName = (e) => {
		let imgname = e.target.value
		setImageName(imgname)
		console.log(imageName)
	};

	const [imageName2, setImageName2] = useState("");
	const handleImageName2 = (e) => {
		let imgname2 = e.target.value
		setImageName2(imgname2)
		console.log(imageName2, "img2")
	};

	const [imageName3, setImageName3] = useState("");
	const handleImageName3 = (e) => {
		let imgname3 = e.target.value
		setImageName3(imgname3)
		console.log(imageName3, "img3")
	};

	const [imageName4, setImageName4] = useState("");
	const handleImageName4 = (e) => {
		let imgname4 = e.target.value
		setImageName4(imgname4)
		console.log(imageName4, "img4")
	};

	const [navImgLink, setNavImgLink] = useState("")
	const [mainImgLink, setMainImgLink] = useState("")
	const [bodyImgLink, setBodyImgLink] = useState("")
	const [footerImgLink, setFooterImgLink] = useState("")

	const [imageSubmitVisibility, setImageSubmitVisibility] = useState(true)
	const [imageSubmitVisibility2, setImageSubmitVisibility2] = useState(true)
	const [imageSubmitVisibility3, setImageSubmitVisibility3] = useState(true)
	const [imageSubmitVisibility4, setImageSubmitVisibility4] = useState(true)

	const imageSubmit = (e) => {
		e.preventDefault();
		let inputVal = document.getElementById('imgName').value
		let regEx = "^[a-zA-Z0-9_ ]*$"
		if (inputVal.match(regEx)) {
			setVisibilityUpload(true);
			setImageSubmitVisibility(false)
			setNavImgLink('https://res.cloudinary.com/dkc5agj8u/image/upload/' + encodeURIComponent(imageName.trim()) + '.png')
		} else { alert("Invalid name, please use alphanumeric characters.") }
	};

	const imageSubmit2 = (e) => {
		e.preventDefault();
		let inputVal2 = document.getElementById('imgName2').value
		let regEx = "^[a-zA-Z0-9_ ]*$"
		if (inputVal2.match(regEx)) {
			setVisibilityUpload2(true);
			setImageSubmitVisibility2(false)
			setMainImgLink('https://res.cloudinary.com/dkc5agj8u/image/upload/' + encodeURIComponent(imageName2.trim()) + '.png')
		} else { alert("Invalid name, please use alphanumeric characters.") }
	};

	const imageSubmit3 = (e) => {
		e.preventDefault();
		let inputVal3 = document.getElementById('imgName3').value
		let regEx = "^[a-zA-Z0-9_ ]*$"
		if (inputVal3.match(regEx)) {
			setVisibilityUpload3(true);
			setImageSubmitVisibility3(false)
			setBodyImgLink('https://res.cloudinary.com/dkc5agj8u/image/upload/' + encodeURIComponent(imageName3.trim()) + '.png')
		} else { alert("Invalid name, please use alphanumeric characters.") }
	};

	const imageSubmit4 = (e) => {
		e.preventDefault();
		let inputVal4 = document.getElementById('imgName4').value
		let regEx = "^[a-zA-Z0-9_ ]*$"
		if (inputVal4.match(regEx)) {
			setVisibilityUpload4(true);
			setImageSubmitVisibility4(false)
			setFooterImgLink('https://res.cloudinary.com/dkc5agj8u/image/upload/' + encodeURIComponent(imageName4.trim()) + '.png')
		} else { alert("Invalid name, please use alphanumeric characters.") }
	};

const navRender = () => {
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
			let headBack
			if (navRenderObj.gradVal == 'Yes') {
				headBack = ` background-image: linear-gradient(to bottom right, ${navRenderObj.navColor}, ${navRenderObj.navgradColor});`
			}
			if (navRenderObj.gradVal == 'No') {
				headBack = `background-color: ${navRenderObj.navColor};`
			}
			header.setAttribute(
				"style",
				`width: 100%;
				${headBack};`
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
					margin-bottom: 0px;
					justify-content: start;`
				)
			}
			if (navRenderObj.navDir === 'Right') {
				nav.setAttribute(
					"style",
					`width: 100%;
				display: flex;
				margin-right: 15px;
				margin-bottom: 0px;
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
			let renderNavDiv = document.getElementById("renderNavDiv");
			let navSubmitBtn = document.getElementById('navBtn');
			navSubmitBtn.textContent = "Update NavBar Settings";

			header.append(title);
			header.append(navImg);
			header.append(nav);
			renderNavDiv.appendChild(header);
}}



	const navSubmit = async (e) => {
		e.preventDefault();
		setVisibilityUpload(false);
		setImageSubmitVisibility(true);
		// let navImgBtn = document.getElementById('imageBtn');
		
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
		let NavGradVal = document.getElementById("navGrad").textContent;
		let temp = {
			contentTitle: "navbar",
			gradVal: NavGradVal,
			navColor: navColor,
			navgradColor: colorGrad,
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
		let renderNavDiv = document.getElementById("renderNavDiv");
		renderNavDiv.innerHTML = "";

		//add gradiant here
		//render page
		navRender()


	};

	const mainSubmit = async (e) => {
		e.preventDefault();
		setVisibilityUpload2(false);
		setVisibilityUpload3(false);
		setImageSubmitVisibility2(true);
		setImageSubmitVisibility3(true);
		// let navImgBtn = document.getElementById('imageBtn');
		let mainSubmitBtn = document.getElementById('mainBtn');
		// navImgBtn.text("Try Another Image");

		// if (!clickedBtn.getAttribute('count'))
		//render object
		let fontMainHeaders = document.getElementsByName('fontMainHeaders');
		let fontMainHeadersVal
		for (let i = 0; i < fontMainHeaders.length; i++) {
			if (fontMainHeaders[i].checked) {
				fontMainHeadersVal = fontMainHeaders[i].value
			}
		}
		let fontMainText = document.getElementsByName('fontMainText')
		let fontMainTextVal
		for (let i = 0; i < fontMainText.length; i++) {
			if (fontMainText[i].checked) {
				fontMainTextVal = fontMainText[i].value
			}
		}

		let mainTitle = document.getElementById("mainTitle").value;

		let temp = {
			contentTitle: "body",
			colorBody: colorBody,
			mainTitle: mainTitle,
			colorMainBackground: colorMainBackground,
			fontMainHeadersVal: fontMainHeadersVal,
			fontMainTextVal: fontMainTextVal,
			bodyBackgroundImagePubID: imageName3,
			mainImagePubID: imageName2,
			bodyImgLink: bodyImgLink,
			mainImgLink: mainImgLink,
			colorMain: colorMainBackground,
			colorMainHeaders: colorMainHeaders,
			mainTextColor: colorMainText
		};
		codeCompileArr.push(temp);
		console.log(codeCompileArr);
		let renderBodyDiv = document.getElementById("renderBodyDiv");
		renderBodyDiv.innerHTML = "";


		//render page
		let navObj = -1
		for (let i = 0; i < codeCompileArr.length; i++) {
			if (codeCompileArr[i].contentTitle === "body") {
				navObj = i;
			}
		}
		if (navObj === -1) {
		} else {
			let navMainObj = codeCompileArr[navObj];
			let body = document.createElement("div");
			body.setAttribute(
				"style",
				`width: 100%;
				height: 100vh;
				background-image: url(${navMainObj.bodyImgLink});
				color: ${navMainObj.colorMainText};
				background-color: ${navMainObj.colorBody};`
			);
			body.setAttribute(
				"public_id",
				`${navMainObj.bodyBackgroundImagePubID}`
			);
			let mainHeader = document.createElement("div");
			mainHeader.setAttribute(
				"style",
				`width: 100%;
				font-size: 30px;
				text-align: center;
				color: ${navMainObj.colorMainHeaders};
				font-family: ${navMainObj.fontMainHeadersVal}`
			);
			mainHeader.textContent = navMainObj.mainTitle;
			let mainImg = document.createElement("img");
			mainImg.setAttribute(
				"style",
				`width: 300px;
				height: 300px;
				font-size: 40px;
				text-align: center;`
			);
			mainImg.setAttribute(
				"src",
				`${navMainObj.mainImgLink}`
			)
			mainImg.setAttribute(
				"public_id",
				`${navMainObj.imageName2}`
			)



			// let navImage = uploadImage(image, )	

			mainSubmitBtn.textContent = "Update Main Settings";

			body.append(mainHeader);
			body.append(mainImg);
			renderBodyDiv.appendChild(body);
		}
	};

	const footerSubmit = async (e) => {
		e.preventDefault();
		setVisibilityUpload4(false);
		setImageSubmitVisibility4(true);
		// let navImgBtn = document.getElementById('imageBtn');
		let footerSubmitBtn = document.getElementById('footerBtn');
		// navImgBtn.text("Try Another Image");

		// if (!clickedBtn.getAttribute('count'))
		//render object
		let fontFooter = document.getElementsByName('fontFooter');
		let footerFontVal
		for (let i = 0; i < fontFooter.length; i++) {
			if (fontFooter[i].checked) {
				footerFontVal = fontFooter[i].value
			}
		}

		let fontFooterLinks = document.getElementsByName('fontFooterLinks')
		let footerLinkFontVal
		for (let i = 0; i < fontFooterLinks.length; i++) {
			if (fontFooterLinks[i].checked) {
				footerLinkFontVal = fontFooterLinks[i].value
			}
		}

		let footerLinkDirVal = document.getElementById("footerLinkDir").textContent;
		let footerLinksString = document.getElementById("footerLinksString").value;
		let footerBottomText = document.getElementById("bottomText").value;
		let footerGradVal = document.getElementById("footerGrad").textContent;
		let footerLinks = footerLinksString.split(",");
		let temp = {
			contentTitle: "footer",
			footerGradVal: footerGradVal,
			footerColor: colorFooter,
			footerColorGrad: colorFooterGrad,
			footerBottomText: footerBottomText,
			footerlinks: [footerLinks],
			footerLinksDir: footerLinkDirVal,
			fontFooter: footerFontVal,
			fontFooterLinks: footerLinkFontVal,
			footerImgLink: footerImgLink,
			footerImgPubId: imageName4,
			footerFontColor: colorFooterText,
			footerLinksColor: colorFooterLinks
		};
		codeCompileArr.push(temp);
		console.log(codeCompileArr);
		let renderFooterDiv = document.getElementById("renderFooterDiv");
		renderFooterDiv.innerHTML = "";


		//render page
		let navObj = -1
		for (let i = 0; i < codeCompileArr.length; i++) {
			if (codeCompileArr[i].contentTitle === "footer") {
				navObj = i;
			}
		}
		if (navObj === -1) {
		} else {
			let navRenderObj = codeCompileArr[navObj];
			let footer = document.createElement("div");
			footer.setAttribute(
				"style",
				`width: 100%;
				background-color: ${navRenderObj.footerColor};`
			);
			let bottomText = document.createElement("div");
			bottomText.setAttribute(
				"style",
				`width: 100%;
				font-size: 18px;
				font-style: italic;
				text-align: center;
				color: ${navRenderObj.footerFontColor};
				font-family: ${navRenderObj.fontFooter}`
			);
			bottomText.textContent = navRenderObj.footerBottomText;
			let footerImg = document.createElement("img");
			footerImg.setAttribute(
				"style",
				`width: 150px;
				height: 150px;
				font-size: 40px;
				text-align: center;`
			);
			footerImg.setAttribute(
				"src",
				`${navRenderObj.footerImgLink}`
			)
			footerImg.setAttribute(
				"public_id",
				`${navRenderObj.footerImgPubId}`
			)
			let links = document.createElement("ul");
			if (navRenderObj.footerLinksDir === 'Left') {
				links.setAttribute(
					"style",
					`width: 100%;
					display: flex;
					flex-direction: column;
					margin-right: 15px;
					align-items: flex-start;`
				)
			}
			if (navRenderObj.footerLinksDir === 'Right') {
				links.setAttribute(
					"style",
					`width: 100%;
				display: flex;
				flex-direction: column;
				margin-right: 15px;
				align-items: flex-end;`
				)
			}

			let tempLinks = navRenderObj.footerlinks[0]
			for (let i = 0; i < tempLinks.length; i++) {
				let footerLink = document.createElement("li");
				footerLink.setAttribute(
					"style",
					`margin-right: 15px;
					color: ${navRenderObj.footerLinksColor};
					font-family: ${navRenderObj.fontFooterLinks};`)

				footerLink.textContent = navRenderObj.footerlinks[0][i];
				links.append(footerLink);
			}

			// let navImage = uploadImage(image, )	

			footerSubmitBtn.textContent = "Update Footer Settings";

			footer.append(bottomText);
			footer.append(footerImg);
			footer.append(links);
			renderFooterDiv.appendChild(footer);
		}
	};

	return (
		<React.Fragment>
			<div className="container-fluid">
				<div className="row">
					<aside
						id="sidebar"
						className="col-3 d-flex flex-column align-items-center"
					>	<div className="container-fluid workbenchColumnWrapper">
							<div className="row d-flex align-items-center">
								<div className="col">
									<h2 className="mt-3 workbenchTitle">Workbench</h2>
								</div>
								<div className="col d-flex flex-row justify-content-end">
									<button
										className="btn btn-success"
										id={'startButton'}
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
										<p>If you would like a solid backgrouond select no to gradiant and only select one color::</p>
										<label className="col-6 labelText">Would you like a gradiant: </label>
										<button className="col-6 btn btn-primary" id="navGrad" onClick={navgrad}>
											No
										</button>
										<div className="d-flex justify-content-between">
											<label className="labelText">Select background color: </label>
											{<PopoverPicker color={color} onChange={setColor} />}
										</div>
										<div className="d-flex justify-content-between">
											<label className="labelText">Select background color: </label>
											{<PopoverPicker color={colorGrad} onChange={setColorGrad} />}
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
											<label className="labelText" htmlFor='arial black, sans-serif' style={{ fontFamily: 'arial black, sans-serif' }}>Arial Black
												<input type="radio" name="fontTitle" value='arial black, sans-serif' style={{ fontFamily: 'arial black, sans-serif' }} />
											</label>
											<label className="labelText" htmlFor='trebuchet ms, sans-serif' style={{ fontFamily: 'trebuchet ms, sans-serif' }}>Trebuchet MS
												<input type="radio" name="fontTitle" value='trebuchet ms, sans-serif' style={{ fontFamily: 'trebuchet ms, sans-serif' }} />
											</label>
											<label className="labelText" htmlFor='verdana, sans-serif' style={{ fontFamily: 'verdana, sans-serif' }}>Verdana
												<input type="radio" name="fontTitle" value='verdana, sans-serif' style={{ fontFamily: 'verdana, sans-serif' }} />
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
											<label className="labelText" htmlFor='arial black, sans-serif' style={{ fontFamily: 'arial black, sans-serif' }}>Arial Black
												<input type="radio" name="fontNav" value='arial black, sans-serif' style={{ fontFamily: 'arial black, sans-serif' }} />
											</label>
											<label className="labelText" htmlFor='trebuchet ms, sans-serif' style={{ fontFamily: 'trebuchet ms, sans-serif' }}>Trebuchet MS
												<input type="radio" name="fontNav" value='trebuchet ms, sans-serif' style={{ fontFamily: 'trebuchet ms, sans-serif' }} />
											</label>
											<label className="labelText" htmlFor='verdana, sans-serif' style={{ fontFamily: 'verdana, sans-serif' }}>Verdana
												<input type="radio" name="fontNav" value='verdana, sans-serif' style={{ fontFamily: 'verdana, sans-serif' }} />
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

							<button
								style={{ color: 'white' }}
								className="btn dropdown-toggle w-100"
								type="button"
								onClick={addComp}
								id="addComponentBtn"
							>
								{comp}
							</button>
							{visibilityComp ? (
								<div style={flair.componentBar} className="inner-container">
									<CardComponent />
								</div>
							) : (
								<div></div>
							)}
							<button
								style={{ color: 'white' }}
								className="btn dropdown-toggle w-100"
								type="button"
								onClick={addMain}
								id="addMainBtn"
							>
								{main}
							</button>
							{visibilityMain ? (
								<div style={flair.addNavBarColor} className="col-12 inner-container">
									<div className="row">
										<div className="d-flex justify-content-between">
											<label className="labelText">Select entire page background-color: </label>
											{<PopoverPicker color={colorBody} onChange={setColor6} />}
										</div>
									</div>

									<hr className="navBenchBreak"></hr>

									<div className="row-12">
										<label className="col-6 labelText">
											Add Background Image for entire page:
											{imageSubmitVisibility3 ? (
												<button
													className="btn btn-primary col-9 labelText"
													id="imageBtn3"
													onClick={imageSubmit3}
												>
													Submit / Update Image
												</button>
											) : <div></div>}
											{visibilityUpload3 ? (
												<UploadWidget imageName={imageName3} />
											) : <div></div>}
										</label>
										<input className="col-6" type="text" id="imgName3" onKeyUp={handleImageName3} placeholder="img name here"></input>
									</div>

									<hr className="navBenchBreak"></hr>

									<div className="row">
										<div className="d-flex justify-content-between">
											<label className="labelText">Select background color: </label>
											{<PopoverPicker color={colorMainBackground} onChange={setColor3} />}
										</div>
									</div>

									<hr className="navBenchBreak"></hr>

									<div className="row-12">
										<label className="col-6 labelText">
											Header for main section(optional)
										</label>
										<input className="col-6" type="text" id="mainTitle"></input>
									</div>

									<hr className="navBenchBreak"></hr>

									<div className="row labelText">
										<p>Select a font for Main Headers: </p>
									</div>

									<div className="row">
										<div className="col-4">
											<label className="labelText" htmlFor="serif" style={{ fontFamily: 'Serif' }}>Serif
												<input type="radio" name="fontMainHeaders" value="Serif" style={{ fontFamily: 'Serif' }} />
											</label>

											<label className="labelText" htmlFor="comic sans MS" style={{ fontFamily: 'Cursive' }}>Comic Sans
												<input type="radio" name="fontMainHeaders" value="comic sans MS" style={{ fontFamily: 'Cursive' }} />
											</label>
											<br></br>
											<label className="labelText" htmlFor="fantasy" style={{ fontFamily: 'Fantasy' }}>Impact
												<input type="radio" name="fontMainHeaders" value="Fantasy" style={{ fontFamily: 'Fantasy' }} />
											</label>
										</div>

										<div className="col-4">
											<label className="labelText" htmlFor="arial" style={{ fontFamily: 'sans-serif' }}>Arial
												<input type="radio" name="fontMainHeaders" value="arial" style={{ fontFamily: 'sans-serif' }} />
											</label>
											<br></br>
											<label className="labelText" htmlFor="Courier" style={{ fontFamily: 'monospace' }}>Courier
												<input type="radio" name="fontMainHeaders" value="Courier" style={{ fontFamily: 'monospace' }} />
											</label>
											<label className="labelText" htmlFor="Tahoma" style={{ fontFamily: 'sans-serif' }}>Tahoma
												<input type="radio" name="fontMainHeaders" value="Tahoma" style={{ fontFamily: 'sans-serif' }} />
											</label>
										</div>

										<div className="col-4">
											<label className="labelText" htmlFor='arial black, sans-serif' style={{ fontFamily: 'arial black, sans-serif' }}>Arial Black
												<input type="radio" name="fontMainHeaders" value='arial black, sans-serif' style={{ fontFamily: 'arial black, sans-serif' }} />
											</label>
											<label className="labelText" htmlFor='trebuchet ms, sans-serif' style={{ fontFamily: 'trebuchet ms, sans-serif' }}>Trebuchet MS
												<input type="radio" name="fontMainHeaders" value='trebuchet ms, sans-serif' style={{ fontFamily: 'trebuchet ms, sans-serif' }} />
											</label>
											<label className="labelText" htmlFor='verdana, sans-serif' style={{ fontFamily: 'verdana, sans-serif' }}>Verdana
												<input type="radio" name="fontMainHeaders" value='verdana, sans-serif' style={{ fontFamily: 'verdana, sans-serif' }} />
											</label>
										</div>
									</div>

									<hr className="navBenchBreak"></hr>

									<div className="row">
										<div className="d-flex justify-content-between">
											<label className="labelText">Select Main Headers Color: </label>
											{<PopoverPicker color={colorMainHeaders} onChange={setColor4} />}
										</div>
									</div>

									<hr className="navBenchBreak"></hr>

									<div className="row-12">
										<label className="col-6 labelText">
											Add Image to main:
											{imageSubmitVisibility2 ? (
												<button
													className="btn btn-primary col-9 labelText"
													id="imageBtn2"
													onClick={imageSubmit2}
												>
													Submit / Update Image
												</button>
											) : <div></div>}
											{visibilityUpload2 ? (
												<UploadWidget imageName={imageName2} />
											) : <div></div>}
										</label>
										<input className="col-6" type="text" id="imgName2" onKeyUp={handleImageName2} placeholder="img name here"></input>
									</div>

									<hr className="navBenchBreak"></hr>

									<div className="row labelText">
										<p>Select a font for all Text in Main: </p>
									</div>

									<div className="row">
										<div className="col-4">
											<label className="labelText" htmlFor="serif" style={{ fontFamily: 'Serif' }}>Serif
												<input type="radio" name="fontMainText" value="Serif" style={{ fontFamily: 'Serif' }} />
											</label>

											<label className="labelText" htmlFor="comic sans MS" style={{ fontFamily: 'Cursive' }}>Comic Sans
												<input type="radio" name="fontMainText" value="comic sans MS" style={{ fontFamily: 'Cursive' }} />
											</label>
											<br></br>
											<label className="labelText" htmlFor="fantasy" style={{ fontFamily: 'Fantasy' }}>Impact
												<input type="radio" name="fontMainText" value="Fantasy" style={{ fontFamily: 'Fantasy' }} />
											</label>
										</div>

										<div className="col-4">
											<label className="labelText" htmlFor="arial" style={{ fontFamily: 'sans-serif' }}>Arial
												<input type="radio" name="fontMainText" value="arial" style={{ fontFamily: 'sans-serif' }} />
											</label>
											<br></br>
											<label className="labelText" htmlFor="Courier" style={{ fontFamily: 'monospace' }}>Courier
												<input type="radio" name="fontMainText" value="Courier" style={{ fontFamily: 'monospace' }} />
											</label>
											<label className="labelText" htmlFor="Tahoma" style={{ fontFamily: 'sans-serif' }}>Tahoma
												<input type="radio" name="fontMainText" value="Tahoma" style={{ fontFamily: 'sans-serif' }} />
											</label>
										</div>

										<div className="col-4">
											<label className="labelText" htmlFor='arial black, sans-serif' style={{ fontFamily: 'arial black, sans-serif' }}>Arial Black
												<input type="radio" name="fontMainText" value='arial black, sans-serif' style={{ fontFamily: 'arial black, sans-serif' }} />
											</label>
											<label className="labelText" htmlFor='trebuchet ms, sans-serif' style={{ fontFamily: 'trebuchet ms, sans-serif' }}>Trebuchet MS
												<input type="radio" name="fontMainText" value='trebuchet ms, sans-serif' style={{ fontFamily: 'trebuchet ms, sans-serif' }} />
											</label>
											<label className="labelText" htmlFor='verdana, sans-serif' style={{ fontFamily: 'verdana, sans-serif' }}>Verdana
												<input type="radio" name="fontMainText" value='verdana, sans-serif' style={{ fontFamily: 'verdana, sans-serif' }} />
											</label>
										</div>
									</div>

									<hr className="navBenchBreak"></hr>

									<div className="row">
										<div className="d-flex justify-content-between">
											<label className="labelText">Select Main Text Color: </label>
											{<PopoverPicker color={colorMainText} onChange={setColor5} />}
										</div>
									</div>

									<hr className="navBenchBreak"></hr>

									<button
										className="btn btn-primary m-3"
										id="mainBtn"
										onClick={mainSubmit}
									>
										Submit Main Settings
									</button>
								</div>

							) : (
								<div></div>
							)}
							<button
								style={{ color: 'white' }}
								className="btn dropdown-toggle w-100"
								type="button"
								onClick={addFooter}
								id="addFooterBtn"
							>
								{Footer}
							</button>
							{visibilityFooter ? (

								<div style={flair.addNavBarColor} className="col-12 inner-container">

									<div className="row">
									<p>If you would like a solid backgrouond select no to gradiant and only select one color::</p>
										<label className="col-6 labelText">Would you like a gradiant: </label>
										<button className="col-6 btn btn-primary" id="footerGrad" onClick={footerGrad}>
											No
										</button>
										<div className="d-flex justify-content-between">
											<label className="labelText">Select footer background color: </label>
											{<PopoverPicker color={colorFooter} onChange={setColor7} />}
										</div>
										<div className="d-flex justify-content-between">
											<label className="labelText">Select background color for gradiant: </label>
											{<PopoverPicker color={colorFooterGrad} onChange={setcolorFooterGrad} />}
										</div>
										
									</div>

									<hr className="navBenchBreak"></hr>

									<div className="row-12">
										<label className="col-6 labelText">
											Bottom Text of footer
										</label>
										<input className="col-6" type="text" id="bottomText"></input>
									</div>

									<hr className="navBenchBreak"></hr>

									<div className="row labelText">
										<p>Select a font for bottom text</p>
									</div>

									<div className="row">
										<div className="col-4">
											<label className="labelText" htmlFor="serif" style={{ fontFamily: 'Serif' }}>Serif
												<input type="radio" name="fontFooter" value="Serif" style={{ fontFamily: 'Serif' }} />
											</label>
											<label className="labelText" htmlFor="comic sans MS" style={{ fontFamily: 'Cursive' }}>Comic Sans
												<input type="radio" name="fontFooter" value="comic sans MS" style={{ fontFamily: 'Cursive' }} />
											</label>
											<label className="labelText" htmlFor="fantasy" style={{ fontFamily: 'Fantasy' }}>Impact
												<input type="radio" name="fontFooter" value="Fantasy" style={{ fontFamily: 'Fantasy' }} />
											</label>
										</div>

										<div className="col-4">
											<label className="labelText" htmlFor="arial" style={{ fontFamily: 'sans-serif' }}>Arial
												<input type="radio" name="fontFooter" value="arial" style={{ fontFamily: 'sans-serif' }} />
											</label>
											<label className="labelText" htmlFor="Courier" style={{ fontFamily: 'monospace' }}>Courier
												<input type="radio" name="fontFooter" value="Courier" style={{ fontFamily: 'monospace' }} />
											</label>
											<label className="labelText" htmlFor="Tahoma" style={{ fontFamily: 'sans-serif' }}>Tahoma
												<input type="radio" name="fontFooter" value="Tahoma" style={{ fontFamily: 'sans-serif' }} />
											</label>
										</div>

										<div className="col-4">
											<label className="labelText" htmlFor='arial black, sans-serif' style={{ fontFamily: 'arial black, sans-serif' }}>Arial Black
												<input type="radio" name="fontFooter" value='arial black, sans-serif' style={{ fontFamily: 'arial black, sans-serif' }} />
											</label>
											<label className="labelText" htmlFor='trebuchet ms, sans-serif' style={{ fontFamily: 'trebuchet ms, sans-serif' }}>Trebuchet MS
												<input type="radio" name="fontFooter" value='trebuchet ms, sans-serif' style={{ fontFamily: 'trebuchet ms, sans-serif' }} />
											</label>
											<label className="labelText" htmlFor='verdana, sans-serif' style={{ fontFamily: 'verdana, sans-serif' }}>Verdana
												<input type="radio" name="fontFooter" value='verdana, sans-serif' style={{ fontFamily: 'verdana, sans-serif' }} />
											</label>
										</div>
									</div>

									<hr className="navBenchBreak"></hr>

									<div className="row">
										<div className="d-flex justify-content-between">
											<label className="labelText">Select Bottom Text Color: </label>
											{<PopoverPicker color={colorFooterText} onChange={setColor9} />}
										</div>
									</div>

									<hr className="navBenchBreak"></hr>

									<div className="row-12">
										<label className="col-6 labelText">
											Add Image for Footer:
											{imageSubmitVisibility4 ? (
												<button
													className="btn btn-primary col-9 labelText"
													id="imageBtn4"
													onClick={imageSubmit4}
												>
													Submit / Update Image
												</button>
											) : <div></div>}
											{visibilityUpload4 ? (
												<UploadWidget imageName={imageName4} />
											) : <div></div>}
										</label>
										<input className="col-6" type="text" id="imgName4" onKeyUp={handleImageName4} placeholder="img name here"></input>
									</div>

									<hr className="navBenchBreak"></hr>

									<div className="row-12">
										<label className="col-6 labelText">
											Input Footer Links <br /> (<i>Separate by ','!</i>):
										</label>
										<input className="col-6" type="text" id="footerLinksString"></input>
									</div>

									<hr className="navBenchBreak"></hr>

									<div className="row-12">
										<label className="col-6 labelText">Anchor footer links left/right: </label>
										<button className="col-6 btn btn-primary" id="footerLinkDir" onClick={footerDir}>
											Right
										</button>
									</div>

									<hr className="navBenchBreak"></hr>

									<div className="row labelText">
										<p>Footer Link Fonts: </p>
									</div>

									<div className="row">
										<div className="col-4">
											<label className="labelText" htmlFor="serif" style={{ fontFamily: 'Serif' }}>Serif
												<input type="radio" name="fontFooterLinks" value="Serif" style={{ fontFamily: 'Serif' }} />
											</label>
											<label className="labelText" htmlFor="comic sans MS" style={{ fontFamily: 'Cursive' }}>Comic Sans
												<input type="radio" name="fontFooterLinks" value="comic sans MS" style={{ fontFamily: 'Cursive' }} />
											</label>
											<label className="labelText" htmlFor="fantasy" style={{ fontFamily: 'Fantasy' }}>Impact
												<input type="radio" name="fontFooterLinks" value="Fantasy" style={{ fontFamily: 'Fantasy' }} />
											</label>
										</div>

										<div className="col-4">
											<label className="labelText" htmlFor="arial" style={{ fontFamily: 'sans-serif' }}>Arial
												<input type="radio" name="fontFooterLinks" value="arial" style={{ fontFamily: 'sans-serif' }} />
											</label>
											<label className="labelText" htmlFor="Courier" style={{ fontFamily: 'monospace' }}>Courier
												<input type="radio" name="fontFooterLinks" value="Courier" style={{ fontFamily: 'monospace' }} />
											</label>
											<label className="labelText" htmlFor="Tahoma" style={{ fontFamily: 'sans-serif' }}>Tahoma
												<input type="radio" name="fontFooterLinks" value="Tahoma" style={{ fontFamily: 'sans-serif' }} />
											</label>
										</div>

										<div className="col-4">
											<label className="labelText" htmlFor='arial black, sans-serif' style={{ fontFamily: 'arial black, sans-serif' }}>Arial Black
												<input type="radio" name="fontFooterLinks" value='arial black, sans-serif' style={{ fontFamily: 'arial black, sans-serif' }} />
											</label>
											<label className="labelText" htmlFor='trebuchet ms, sans-serif' style={{ fontFamily: 'trebuchet ms, sans-serif' }}>Trebuchet MS
												<input type="radio" name="fontFooterLinks" value='trebuchet ms, sans-serif' style={{ fontFamily: 'trebuchet ms, sans-serif' }} />
											</label>
											<label className="labelText" htmlFor='verdana, sans-serif' style={{ fontFamily: 'verdana, sans-serif' }}>Verdana
												<input type="radio" name="fontFooterLinks" value='verdana, sans-serif' style={{ fontFamily: 'verdana, sans-serif' }} />
											</label>
										</div>
									</div>

									<hr className="navBenchBreak"></hr>

									<div className="row">
										<div className="d-flex justify-content-between">
											<label className="labelText">Select Footer Links Color: </label>
											{<PopoverPicker color={colorFooterLinks} onChange={setColor8} />}
										</div>
									</div>

									<button
										className="btn btn-primary m-3"
										id="footerBtn"
										onClick={footerSubmit}
									>
										Submit Footer Settings
									</button>
								</div>
							) : (
								<div></div>
							)}
						</div>
            
						<Save myProp = {codeCompileArr} cards={cards}/>

					</aside>
					<main
						className="col-9 wrk-concept-container" style={{ padding: '0px' }}>

						<Dustbin
							cards={cards}
							setCards={setCards}
						/>
					</main>
				</div>
			</div>
		</React.Fragment>

		
	);
};

export default WRK;