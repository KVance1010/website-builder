import Footer from '../components/Footer';
import '../styles/Download_build.css';
import React, { useState, useEffect } from 'react';
import CreateProject from '../utils/createUserProject';
// import JSZip from 'jszip';
// import JSZipUtils from 'jszip-utils';
// import { saveAs } from 'file-saver';
// import downloadProject from '../file/reset.txt';
// import downloadProject1 from '../file/index.txt';
// import Render from '../components/render_file';

const Download_build = ({projects}) => {
	const [projectSelected, setProjectSelected] = useState(false);

	// we only need to save this if we can not get the files to save to ./file
	const [value, setValue] = useState();

	const selectedProject = async (e) => {
		const value1 = e.target.value;
		if (value1) {
			console.log('project selected');
			setValue(value1 - 1);

			//use this if we can not get the files to save to ./file
			// const project = projects[value]
			// CreateProject.renderFiles(project);
			setProjectSelected(true);
		}
	};
	//use this if we can not get the files to save to ./file
	// const downloadProjectFolder = async () => {
	// 	console.log('button clicked');
	// 	let zip = new JSZip();
	// 	let count = 0;
	// 	const zipFilename = 'zipFilename.zip';
	// 	const urls = [downloadProject1, downloadProject];
	// 	urls.forEach(function (url, i) {
	// 		let filename;
	// 		if (i === 0) {
	// 			filename = 'index.html';
	// 		} else {
	// 			filename = 'filename' + i;
	// 		}
	// 		JSZipUtils.getBinaryContent(url, function (err, data) {
	// 			if (err) {
	// 				throw err;
	// 			}
	// 			zip.file(filename, data, { binary: true });
	// 			count++;
	// 			if (count === urls.length) {
	// 				zip.generateAsync({ type: 'blob' }).then(function (content) {
	// 					saveAs(content, zipFilename);
	// 				});
	// 			}
	// 		});
	// 	});
	// };

	const downloadProjectFolder = async () => {
		const project = projects[value];
		CreateProject.renderFiles(project);
	};

	return (
		<>
			<div className="download_container">
				<div className="card text-center container px-0 download_card">
					<div className="card-header">Download Your Project</div>
					<div className="card-body">
						<h5 className="card-title">Select Project</h5>
						<div className="dropdown">
							<select
								className="btn btn-secondary dropdown-toggle btn-lg"
								onChange={selectedProject}
							>
								<option value="">--select--</option>
								{projects.map((project, index) => (
									<option value={index + 1}>{project.title}</option>
								))}
							</select>
						</div>
						<p className="card-text">how to download info</p>
						<button
							disabled={!projectSelected}
							type="submit"
							variant="success"
							className="btn btn-dark"
							onClick={downloadProjectFolder}
						>
							Download
						</button>
					</div>
					<div className="card-footer"></div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Download_build;

