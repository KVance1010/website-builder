import React from 'react';
import '../styles/Projects.css';
import {
	PlusCircle,
	Folder2,
	HouseAdd,
	ArrowDownCircle,
} from 'react-bootstrap-icons';
import MultiCarousel from '../components/Carousel';
import { Link } from 'react-router-dom';

const Projects = () => {
	
	// TODO: add back in for page authorization
	// const token = Auth.loggedIn() ? Auth.getToken() : null;
	// 			if (!token) {
	// 			  return false;
	// 			}

	return (
		<React.Fragment>
			<div className="container-fluid">
				<div className="row">
					<aside
						id="sidebar"
						className="col-3 d-flex flex-column align-items-start"
					>
						<h2 className="mt-3 w-100 text-center">Projects</h2>
						<Link to="/wrk" className="project_link">
							<button
								className="btn project-btn d-flex align-items-center"
								type="button"
							>
								<PlusCircle color="white" size={18} className="me-2" />
								New Project
							</button>
						</Link>
						<Link to="/wrk" className="project_link">
							<button
								className="btn project-btn d-flex align-items-center"
								type="button"
							>
								<Folder2 color="white" size={18} className="me-2" />
								Current Projects
							</button>
						</Link>
						<Link to="/wrk" className="project_link">
							<button
								className="btn project-btn d-flex align-items-center"
								type="button"
							>
								<HouseAdd color="white" size={18} className="me-2" />
								Prebuilt Templates
							</button>
						</Link>
						<Link to="/export" className="project_link">
							<button
								className="btn project-btn d-flex align-items-center"
								type="button"
							>
								<ArrowDownCircle color="white" size={18} className="me-2" />
								Export Project
							</button>
						</Link>
					</aside>
					<div className="col-9">
						<h3 className="mt-3">Templates</h3>
						<MultiCarousel />
						<h3 className="mt-3">Current Projects</h3>
						<div className="container-fluid">
							<div className="row">
								<div className="col-12 col-md-6 col-lg-4 col-xxl-3 d-flex justify-content-center">
									<img
										src="https://via.placeholder.com/200"
										alt="Placeholder"
										className="m-3"
									/>
								</div>
								<div className="col-12 col-md-6 col-lg-4 col-xxl-3 d-flex justify-content-center">
									<img
										src="https://via.placeholder.com/200"
										alt="Placeholder"
										className="m-3"
									/>
								</div>
								<div className="col-12 col-md-6 col-lg-4 col-xxl-3 d-flex justify-content-center">
									<img
										src="https://via.placeholder.com/200"
										alt="Placeholder"
										className="m-3"
									/>
								</div>
								<div className="col-12 col-md-6 col-lg-4 col-xxl-3 d-flex justify-content-center">
									<img
										src="https://via.placeholder.com/200"
										alt="Placeholder"
										className="m-3"
									/>
								</div>
								<div className="col-12 col-md-6 col-lg-4 col-xxl-3 d-flex justify-content-center">
									<img
										src="https://via.placeholder.com/200"
										alt="Placeholder"
										className="m-3"
									/>
								</div>
								<div className="col-12 col-md-6 col-lg-4 col-xxl-3 d-flex justify-content-center">
									<img
										src="https://via.placeholder.com/200"
										alt="Placeholder"
										className="m-3"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Projects;
