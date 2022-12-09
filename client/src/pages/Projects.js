import React from 'react';
import '../styles/Projects.css'
import Header from "../components/Header";
import { PlusCircle, Folder2, HouseAdd, ArrowDownCircle } from 'react-bootstrap-icons';

const Projects = () => {


    return (
        <React.Fragment>
            <Header />
            <div class="container-fluid">
                <div class="row">
                    <aside id="sidebar" class="col-3 d-flex flex-column align-items-start">
                        <h2 class="mt-3 w-100 text-center">Projects</h2>
                        <button class="btn project-btn" type="button">
                            <PlusCircle
                                color="white"
                                size={18}
                                className="me-2"
                            />
                            New Project
                        </button>
                        <button class="btn project-btn" type="button">
                            <Folder2
                                color="white"
                                size={18}
                                className="me-2"
                            />
                            Current Projects
                        </button>
                        <button class="btn project-btn" type="button">
                            <HouseAdd
                                color="white"
                                size={18}
                                className="me-2"
                            />
                            Prebuilt Templates
                        </button>
                        <button class="btn project-btn" type="button">
                            <ArrowDownCircle
                                color="white"
                                size={18}
                                className="me-2"
                            />
                            Export Project
                        </button>
                    </aside>
                    <div class="col-9">

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Projects;