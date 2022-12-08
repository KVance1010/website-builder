import React, { useState } from 'react';
import { createUser } from '../utils/api';
import Auth from '../utils/auth';

const Signup = () => {
	const [userFormData, setUserFormData] = useState({
		username: '',
		email: '',
		password: '',
		passwordValidation: '',
	});
	const [match, setMatch] = useState(false);
	const [validated] = useState(false);

  // useEffect((event) => {
  //   let passwordVal = event.target.value;
  //     console.log(passwordVal);
  //   	let userPassword = userFormData.password;
  //     console.log(userPassword);
  //   	if (userPassword.includes(passwordVal)) {
  //   		setMatch(true);
  //   	}else{
  //   	setMatch(false);
  //     }
  //   }


  // }, [userFormData.passwordValidation]); 

	const handlePwMatchValidation = (event) => {
		let passwordVal = event.target.value;
    console.log(passwordVal);
		let userPassword = userFormData.password;
    console.log(userPassword);
		if (userPassword.includes(passwordVal)) {
			setMatch(true);
		}else{
		setMatch(false);
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
			console.log(user);
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
		<div className="container mt-5">
			<div className="row d-flex justify-content-center w-100">
				<div className="col-6">
					<div className="card shadow">
						<div className="card-header">
							<h2>Signup</h2>
						</div>
						<div className="card-body">
							<form
								noValidate
								validated={validated}
								onSubmit={handleFormSubmit}
							>
								<div className="mb-3">
									<label className="form-label w-100">
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
									<label className="form-label w-100">
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
									<label className="form-label w-100">
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
									<label className="form-label w-100">
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
                {/* <div>{}</div> */}
								{match ? <div>Matching</div> : <div> Invalid Input</div>}
								<button
									className="btn btn-primary"
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
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Signup;
