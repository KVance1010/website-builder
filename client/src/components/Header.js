import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import Auth from '../utils/auth';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "../styles/Header.css";

function Header() {
    // TODO: set active state on the nav bar and work on toggle drop down
    const [selected, setSelected] = useState("Home");

    return (
        <header className="d-flex justify-content-between align-items-center">
            <h1 className="ms-5">Aspiration Architects</h1>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/">
                                    <p className="nav-link active text-white fw-bold" aria-current="page">Home</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Projects">
                                    <p className="nav-link text-white fw-bold" >Projects</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Export">
                                    <p className="nav-link text-white fw-bold" >Export</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;

