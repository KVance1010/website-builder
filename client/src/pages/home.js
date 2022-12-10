import React from 'react';
import '../styles/Home.css';
import hero from '.././asset/images/heroImg.jpg';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Home = () => {
	return (
		<>
			<section className="hero_section">
				<div className="hero_content">
					<div className="hero_content_background">
						<h1>Building Better Websites</h1>
						<h2>Designed and developed your website today!</h2>
						<Link to="/login">
							<button>Start</button>
						</Link>
					</div>
				</div>
				<img className="hero_img" src={hero} alt="" />
			</section>
			<Footer />
		</>
	);
};

export default Home;
