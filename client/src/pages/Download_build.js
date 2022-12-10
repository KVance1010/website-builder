import React from 'react';
// import downloadProject from '../utils/filename';
import Footer from '../components/Footer';
import '../styles/Download_build.css';

const Download_build = () => {
	return (
		<>
			<div class="download_container">
					<div class="card text-center container px-0 download_card">
						<div class="card-header">Current</div>
						<div class="card-body">
							<h5 class="card-title">Name of project</h5>

							<p class="card-text">how to download info</p>
							{/* href={downloadProject} need to add this to download link */}
							<a class="btn btn-primary" download>
								Download
							</a>
						</div>
						<div class="card-footer"></div>
					</div>
				</div>
			<Footer />
		</>
	);
};

export default Download_build;
