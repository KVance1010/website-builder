import downloadProject from '../file/test/test.txt';
import downloadProject1 from '../file/test/test2.txt';
import Footer from '../components/Footer';
import '../styles/Download_build.css';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';

const Download_build = () => {
	// const [downloadClicked, setDownloadClicked] = useState(false);
	const downloadProjectFolder = async () => {
		// setDownloadClicked(true);
	};
	useEffect(() => {
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
	  }, []);

	return (
		<>
			<div class="download_container">
				<div class="card text-center container px-0 download_card">
					<div class="card-header">Current</div>
					<div class="card-body">
						<h5 class="card-title">Name of project</h5>

						<p class="card-text">how to download info</p>
						{/* href={downloadProject} need to add this to download link */}
						{/* <a class="btn btn-primary" download> */}
						<a class="btn btn-primary" onclick={downloadProjectFolder}>
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


// ******************* this works for downloading a string to a file ****************************/
// let zip = new JSZip();
// let downloads = zip.folder('random');
// downloads.file("index.html", "hello world\n");
// 	downloads.file("project.html", downloadProject1);
// 	downloads.file("project.html", downloadProject);
// 	downloads.generateAsync({ type: 'blob' }).then(function (content) {
// 		saveAs(content, 'example.zip');
// 	});


//******************************this works for downloading more than one file ************************************************/
	// let zip = new JSZip();
	// let downloads = zip.folder('random');
	//  downloads.file('project.html', downloadProject1, { binary: true });
	//  downloads.file('project1.html', downloadProject, { binary: true });
	//  downloads.file('index.html', 'hello world\n');
	//  downloads.generateAsync({ type: 'blob' }).then(function (content) {
	// 	saveAs(content, 'example.zip');
	// });


	//************************ this downloads a file and allows you to read it *******************************/
	// let zip = new JSZip();
	// let count = 0;
	// let zipFilename = "zipNAMEname.zip";
	// let urls = [
	// 	downloadProject,
	// 	downloadProject1
	// ];

	// urls.forEach(function(url) {
	//   let filename = "filename";
	//   // loading a file and add it in a zip file
	//   JSZipUtils.getBinaryContent(url, function(err, data) {
	// 	if (err) {
	// 	  throw err; // or handle the error
	// 	}
	// 	zip.file(filename, data, { binary: true });
	// 	count++;
	// 	if (count === urls.length) {
	// 	  zip.generateAsync({ type: "blob" }).then(function(content) {
	// 		saveAs(content, zipFilename);
	// 	  });
	// 	}
	//   });
	// });
	// let zip = new JSZip();
	// let count = 0;
	// let zipFilename = "zipNAMEname.zip";
	// let urls = [
	// 	downloadProject,
	// 	downloadProject1
	// ];

	// urls.forEach(function(url) {
	//   let filename = "filename";
	//   // loading a file and add it in a zip file
	//   JSZipUtils.getBinaryContent(url, function(err, data) {
	// 	if (err) {
	// 	  throw err; // or handle the error
	// 	}
	// 	zip.file(filename, data, { binary: true });
	// 	count++;
	// 	if (count === urls.length) {
	// 	  zip.generateAsync({ type: "blob" }).then(function(content) {
	// 		saveAs(content, zipFilename);
	// 	  });
	// 	}
	//   });
	// });
