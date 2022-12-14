import React, { useState } from 'react';
import { login } from '../utils/api';
import Auth from '../utils/auth';
import loginImg from '../asset/Images/loginBackground.jpg';
import { Link } from 'react-router-dom';
import '../styles/LoginSignup.css';
import Footer from './Footer';

const Login = () => {
	const [userFormData, setUserFormData] = useState({
		username: '',
		password: '',
	});
	const [validated] = useState(false);
	const [userLoginError, setUserLoginError] = useState(false);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setUserFormData({ ...userFormData, [name]: value });
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}

		try {
			const response = await login(userFormData);

			if (!response.ok) {
				throw new Error('something went wrong!');
			}
			const { token, user } = await response.json();
			Auth.setUserId(user._id);
			Auth.login(token);
		} catch (err) {
			console.error(err);
			setUserLoginError(true);
		}

		setUserFormData({
			username: '',
			email: '',
			password: '',
		});
	};
	return (
		<>
			<div>
				<img
					className="img_login"
					src={loginImg}
					alt="Buildings in the background."
				/>
				<div className="container">
					<div className="row d-flex justify-content-center w-100 card_container">
						<div className="col-6 ">
							<div className="card shadow card_body">
								<div className="card-body ">
									<h2>Login</h2>
									<form
										noValidate
										validated={validated}
										onSubmit={handleFormSubmit}
									>
										<div className="mb-3">
											<label className="form-label w-100 label_input">
												Username
												<input
													className="form-control"
													type="text"
													placeholder="Username"
													name="username"
													onChange={handleInputChange}
													value={userFormData.username}
													required
												/>
											</label>
										</div>
										<div className="mb-3">
											<label className="form-label w-100 label_input">
												Password
												<input
													type="password"
													className="form-control "
													placeholder="Your password"
													name="password"
													onChange={handleInputChange}
													value={userFormData.password}
													required
												/>
											</label>
											{userLoginError ? (
												<div className="label_input">Wrong username or password</div>
											) : (
												<div></div>
											)}
										</div>
										<div>
											<button
												className="btn btn-dark"
												disabled={
													!(userFormData.username && userFormData.password)
												}
												type="submit"
												variant="success"
											>
												Submit
											</button>
											<Link to="/signup">
												<button className="btn btn-dark signUp_btn">
													Signup
												</button>
											</Link>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Login;
