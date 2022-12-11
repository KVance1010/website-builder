import downloadProject from '../file/test/test.txt';
import downloadProject1 from '../file/test/test2.txt';
import Footer from '../components/Footer';
import '../styles/Download_build.css';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import { saveAs } from 'file-saver';
import React from 'react';

const Download_build = () => {
	const downloadProjectFolder = async () => {
		console.log("button clicked")
		let zip = new JSZip();
		let count = 0;
		let zipFilename = "zipFilename.zip";
		let urls = [
		  downloadProject1,
		  downloadProject
		];

		urls.forEach(function(url, i) {
			let filename = 'filename' + i;
		  JSZipUtils.getBinaryContent(url, function(err, data) {
			if (err) {
			  throw err;
			}
			zip.file(filename, data, { binary: true });
			count++;
			if (count === urls.length) {
			  zip.generateAsync({ type: "blob" }).then(function(content) {
				saveAs(content, zipFilename);
			  });
			}
		  });
		});
	};

	return (
		<>
			<div class="download_container">
				<div class="card text-center container px-0 download_card">
					<div class="card-header">Current</div>
					<div class="card-body">
						<h5 class="card-title">Name of project</h5>

						<p class="card-text">how to download info</p>
						<a class="btn btn-primary" onClick={downloadProjectFolder}>
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