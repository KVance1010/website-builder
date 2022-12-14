import React, { useState } from 'react';
import { createUser } from '../utils/api';
import Auth from '../utils/auth';
import '.././styles/SignupLogin.css';
import loginImg from '../asset/Images/loginBackground.jpg';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const Signup = () => {
	const [userFormData, setUserFormData] = useState({
		username: '',
		email: '',
		password: '',
		passwordValidation: '',
	});

	const [match, setMatch] = useState('');
	const [matchComment, setMatchComment] = useState('');
	const [validated] = useState(false);

	const handlePwMatchValidation = (event) => {
		let passwordVal = event.target.value;
		console.log(passwordVal);
		let userPassword = userFormData.password;
		console.log(userPassword);
		if (userPassword.includes(passwordVal)) {
			setMatch(true);
			setMatchComment('Matching');
		} else {
			setMatch(false);
			setMatchComment('Invalid Input');
		}
	};

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
			const response = await createUser(userFormData);

			if (!response.ok) {
				throw new Error('something went wrong!');
			}

			const { token, user } = await response.json();
			Auth.setUserId(user._id);
			Auth.login(token);
		} catch (err) {
			console.error(err);
		}

		setUserFormData({
			username: '',
			email: '',
			password: '',
			passwordValidation: '',
		});
	};

	return (
		<>
			<div className="login-signup-section">
				{/* <img className="img_login" src={loginImg} alt="Buildings in the background."/> */}
				<div className="container-fluid m-3">
					<div className="row d-flex justify-content-center card_container m-0">
						<div className="col-12 col-md-10 col-lg-8 col-xl-6 p-0">
							<div className="card shadow card_body">
								<div className="card-body">
									<h2>Signup</h2>
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
													placeholder="Your username"
													name="username"
													onChange={handleInputChange}
													value={userFormData.username}
													required
												/>
											</label>
										</div>
										<div className="mb-3">
											<label className="form-label w-100 label_input">
												Email
												<input
													type="email"
													className="form-control"
													placeholder="name@example.com"
													name="email"
													onChange={handleInputChange}
													value={userFormData.email}
													required
												/>
											</label>
										</div>
										<div className=" mb-3">
											<label className="form-label w-100 label_input">
												Password
												<input
													type="password"
													className="form-control"
													placeholder="Your password"
													name="password"
													onChange={handleInputChange}
													value={userFormData.password}
													required
												/>
											</label>
										</div>
										<div className="mb-3">
											<label className="form-label w-100 label_input">
												Verify Password
												<input
													type="password"
													className="form-control"
													placeholder="Your password"
													name="passwordValidation"
													onChange={handleInputChange}
													onKeyUp={handlePwMatchValidation}
													value={userFormData.passwordValidation}
													required
												/>
											</label>
										</div>
										{match ? (
											<div className="label_input">{matchComment}</div>
										) : (
											<div className="labelInput"> {matchComment}</div>
										)}
										<button
											className="btn btn-dark"
											disabled={
												!(
													userFormData.username &&
													userFormData.email &&
													userFormData.password &&
													userFormData.passwordValidation
												)
											}
											type="submit"
											variant="success"
										>
											Submit
										</button>
										<Link to="/login">
											<button className="btn btn-dark signUp_btn">Login</button>
										</Link>
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
export default Signup;
