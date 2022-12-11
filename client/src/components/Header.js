import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import '../styles/Header.css';
import logo from '../asset/Images/logo.jpg';

function Header() {
    // TODO: set active state on the nav bar and work on toggle drop down also need to save logged in state
    const [selected, setSelected] = useState('Home');

    return (
        <header className="d-flex justify-content-between align-items-center header_container">
            <Link to="/" className="logo_link">
                <h1 className="ms-5 logo_title">
                    <img className="logo_img" src={logo} /> Aspiration Architects
                </h1>
            </Link>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                {Auth.loggedIn() ? (
                                    <a>
                                        <p
                                            className="nav-link active text-white fw-bold"
                                            aria-current="page"
                                            onClick={Auth.logout}
                                        >
                                            Logout
                                        </p>
                                    </a>
                                ) : (
                                    <Link to="/login">
                                        <p
                                            className="nav-link active text-white fw-bold"
                                            aria-current="page"
                                        >
                                            Login
                                        </p>
                                    </Link>
                                )}
                            </li>
                            <li className="nav-item">
                                <Link to="/projects">
                                    <p className="nav-link text-white fw-bold">Projects</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/export">
                                    <p className="nav-link text-white fw-bold">Export</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
