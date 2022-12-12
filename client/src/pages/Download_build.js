import downloadProject from '../file/test/test3.txt';
import downloadProject1 from '../file/test/test2.txt';
import Footer from '../components/Footer';
import '../styles/Download_build.css';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import { saveAs } from 'file-saver';
import React from 'react';

const Download_build = () => {
	const downloadProjectFolder = async () => {
		console.log('button clicked');
		let zip = new JSZip();
		let count = 0;
		let zipFilename = 'zipFilename.zip';
		let urls = [downloadProject1, downloadProject];

		urls.forEach(function (url, i) {
			let filename = 'filename' + i;
			JSZipUtils.getBinaryContent(url, function (err, data) {
				if (err) {
					throw err;
				}
				zip.file(filename, data, { binary: true });
				count++;
				if (count === urls.length) {
					zip.generateAsync({ type: 'blob' }).then(function (content) {
						saveAs(content, zipFilename);
					});
				}
			});
		});
	};

	return (
		<>
			<div className="download_container">
				<div className="card text-center container px-0 download_card">
					<div className="card-header">Download Your Project</div>
					<div className="card-body">
						<h5 className="card-title">Select Project</h5>
						<div className="dropdown">
							<select className="btn btn-secondary dropdown-toggle btn-lg">
								<option value="Project 1">Project 1</option>
								<option value="Project 2">Project 2</option>
								<option value="Project 3">Project 3</option>
							</select>
						</div>
						<p className="card-text">how to download info</p>
						<button className="btn btn-dark" onClick={downloadProjectFolder}>
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
