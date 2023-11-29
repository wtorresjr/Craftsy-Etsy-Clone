import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp, login } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	let [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	let [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const [frontendErrors, setFrontendErrors] = useState({});
	const [showErrors, setShowErrors] = useState(false);
	const { closeModal } = useModal();


	const firstNameInputCN = showErrors && frontendErrors.firstName ? "error-input" : ""
	const lastNameInputCN = showErrors && frontendErrors.lastName ? "error-input" : ""
	const usernameInputCN = showErrors && frontendErrors.username ? "error-input" : ""
	const emailInputCN = showErrors && frontendErrors.email ? "error-input" : ""
	const passwordInputCN = showErrors && frontendErrors.password ? "error-input" : ""
	const confirmPasswordInputCN = showErrors && frontendErrors.confirmPassword ? "error-input" : ""


	const errorObj = {};
	errors.forEach(error => {
	  const [key, value] = error.split(':')
	  errorObj[key.trim()] = value.trim()
	});


	useEffect(() => {
		const validationErrors = {};
		if (email && !(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/).test(email)) validationErrors.email = "Not a valid email."
		if (errorObj.email) validationErrors.email = errorObj.email
		if (errorObj.username) validationErrors.username = errorObj.username
		if (password && password.length < 6) validationErrors.password = "Must be at least 6 characters.";
		if (password !== confirmPassword) validationErrors.confirmPassword = "Confirm Password field must be the same as the Password field.";
		setFrontendErrors(validationErrors)
	}, [email, username, password, confirmPassword, errors])


	const handleDemoUser = () => {
		dispatch(login(email="demo@aa.io", password="password"));
		closeModal();
	  };


	const handleSubmit = async (e) => {
		e.preventDefault();
		setShowErrors(true)
		const data = await dispatch(signUp(username, email, password, firstName, lastName));
		if (data || Object.values(frontendErrors).length) {
		  setErrors(data);
		//   setFirstName("")
		//   setLastName("")
		//   setEmail("")
		//   setUsername("")
		//   setPassword("")
		//   setConfirmPassword("")
		} else {
			closeModal()
		}
	  };


	return (
		<>
		<div className="signup-container">
			<h1>Create your account</h1>
			<h2>Registration is easy.</h2>
			<form className="signup-form" onSubmit={handleSubmit}>
				<div className="firstname-div">
					<label>First name<span style={{"color": "#B64B59"}}>*</span></label>
					<input
						type="text"
						title="Please fill out this field."
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						className={firstNameInputCN}
						required
					/>
				</div>
				<div className="errors-div">
					{showErrors && frontendErrors?.firstName}
				</div>

				<div className="lastname-div">
					<label>Last name<span style={{"color": "#B64B59"}}> *</span></label>
					<input
						type="text"
						title="Please fill out this field."
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						className={lastNameInputCN}
						required
					/>
				</div>
				<div className="errors-div">
					{showErrors && frontendErrors?.lastName}
				</div>

				<div className="email-div">
					<label>Email address<span style={{"color": "#B64B59"}}> *</span></label>
					<input
						type="text"
						title="Please fill out this field."
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className={emailInputCN}
						required
					/>
				</div>
				<div className="errors-div">
					{showErrors && frontendErrors?.email}
				</div>

				<div className="username-div">
					<label>Username<span style={{"color": "#B64B59"}}> *</span></label>
					<input
						type="text"
						title="Please fill out this field."
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className={usernameInputCN}
						required
					/>
				</div>
				<div className="errors-div">
					{showErrors && frontendErrors?.username}
				</div>

				<div className="password-div">
					<label>Password<span style={{"color": "#B64B59"}}> *</span></label>
					<input
						type="password"
						title="Please fill out this field."
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className={passwordInputCN}
						required
					/>
				</div>
				<div className="errors-div">
					{showErrors && frontendErrors?.password}
				</div>

				<div className="confirm-password-div">
					<label>Confirm password<span style={{"color": "#B64B59"}}> *</span></label>
					<input
						type="password"
						title="Please fill out this field."
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						className={confirmPasswordInputCN}
						required
					/>
				</div>
				<div className="errors-div">
					{showErrors && frontendErrors?.confirmPassword}
				</div>

				<div className="signup-button-divs">
					{(firstName && lastName && email && username && password && confirmPassword)
					? <button className="signup-submit-button" type="submit">Register</button>
					:  <button className="disabled-signup-submit-button" type="submit" disabled="true">Register</button>}
					<button className="demo-user-button" type="submit" onClick={handleDemoUser}>Demo User</button>
				</div>
			</form>
		</div>
		</>
	);
}

export default SignupFormModal;
