//work
import React from 'react';
import '../styles/home.css'
import Header from "../components/Header";

const Home = () => {


    return (
        <React.Fragment>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <aside id="sidebar" className="col-3 d-flex flex-column align-items-center">
                        <h2 className="mt-3">Workbench</h2>
                        <button className="btn dropdown-toggle w-100" type="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Add Navigation Bar
                        </button>
                        <button className="btn dropdown-toggle w-100" type="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Dropdown button
                        </button>
                    </aside>
                    <div className="col-9">

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Home;