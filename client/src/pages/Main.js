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
				<div className="hero_content">
					<div className="hero_content_background ms-3">
						<h1 className="me-0">Building Better Websites</h1>
						<h2 className="me-0">Design and developed your website today!</h2>
						<Link to="/login">
							<button className="hero_btn">Start</button>
						</Link>
					</div>
				</div>
				{/* <img className="hero_img" src={hero} alt="" /> */}
			</section>
			<Footer />
		</>
	);
};

export default Home;