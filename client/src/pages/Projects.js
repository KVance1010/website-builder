import React from 'react';
import '../styles/Projects.css'
import Header from "../components/header";
import { PlusCircle, Folder2, HouseAdd, ArrowDownCircle } from 'react-bootstrap-icons';
import MultiCarousel from '../components/carousel';

const Projects = () => {

    return (
        <React.Fragment>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <aside id="sidebar" className="col-3 d-flex flex-column align-items-start">
                        <h2 className="mt-3 w-100 text-center">Projects</h2>
                        <button className="btn project-btn d-flex align-items-center" type="button">
                            <PlusCircle
                                color="white"
                                size={18}
                                className="me-2"
                            />
                            New Project
                        </button>
                        <button className="btn project-btn d-flex align-items-center" type="button">
                            <Folder2
                                color="white"
                                size={18}
                                className="me-2"
                            />
                            Current Projects
                        </button>
                        <button className="btn project-btn d-flex align-items-center" type="button">
                            <HouseAdd
                                color="white"
                                size={18}
                                className="me-2"
                            />
                            Prebuilt Templates
                        </button>
                        <button className="btn project-btn d-flex align-items-center" type="button">
                            <ArrowDownCircle
                                color="white"
                                size={18}
                                className="me-2"
                            />
                            Export Project
                        </button>
                    </aside>
                    <div className="col-9">
                        <h3 className="mt-3">Templates</h3>
                        <MultiCarousel />
                        <h3 className="mt-3">Current Projects</h3>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12 col-md-6 col-lg-4 col-xxl-3 d-flex justify-content-center">
                                    <img src="https://via.placeholder.com/200" alt="Placeholder" className="m-3" />
                                </div>
                                <div className="col-12 col-md-6 col-lg-4 col-xxl-3 d-flex justify-content-center">
                                    <img src="https://via.placeholder.com/200" alt="Placeholder" className="m-3" />
                                </div>
                                <div className="col-12 col-md-6 col-lg-4 col-xxl-3 d-flex justify-content-center">
                                    <img src="https://via.placeholder.com/200" alt="Placeholder" className="m-3" />
                                </div>
                                <div className="col-12 col-md-6 col-lg-4 col-xxl-3 d-flex justify-content-center">
                                    <img src="https://via.placeholder.com/200" alt="Placeholder" className="m-3" />
                                </div>
                                <div className="col-12 col-md-6 col-lg-4 col-xxl-3 d-flex justify-content-center">
                                    <img src="https://via.placeholder.com/200" alt="Placeholder" className="m-3" />
                                </div>
                                <div className="col-12 col-md-6 col-lg-4 col-xxl-3 d-flex justify-content-center">
                                    <img src="https://via.placeholder.com/200" alt="Placeholder" className="m-3" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Projects;