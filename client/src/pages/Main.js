import React from 'react';
import '../styles/Main.css';
import hero from '.././asset/Images/heroImg.jpg';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
//
const Home = () => {
	return (
		<>
			<section className="hero_section">
				<div className="constainer-fluid hero_content">
					<div className="row w-100 m-0">
						<div className="hero_content_background ms-3 m-0 d-flex flex-column align-items-start col-10 col-sm-8 col-lg-9 col-xl-9 p-3 p-sm-4 p-lg-5">
							<h1 className="me-0">Building Better Websites</h1>
							<h2 className="me-0">Design and developed your website today!</h2>
							<Link to="/login">
								<button className="hero_btn">Start</button>
							</Link>
						</div>
					</div>
				</div>
				{/* <img className="hero_img" src={hero} alt="" /> */}
			</section>
			<Footer />
		</>
	);
};

export default Home;