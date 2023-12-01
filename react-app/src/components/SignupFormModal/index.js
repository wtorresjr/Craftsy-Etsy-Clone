import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp, login } from "../../store/session";
import "./SignupForm.css";
import { getCart } from "../../store/cart";

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
	const [backendErrors, setBackendErrors] = useState({});
	const [showErrors, setShowErrors] = useState(false);
	const { closeModal } = useModal();


	const firstNameInputCN = showErrors && frontendErrors.firstName ? "error-input" : ""
	const lastNameInputCN = showErrors && frontendErrors.lastName ? "error-input" : ""
	const usernameInputCN = showErrors && (frontendErrors.username || backendErrors.username) ? "error-input" : ""
	const emailInputCN = showErrors && (frontendErrors.email || backendErrors.email) ? "error-input" : ""
	const passwordInputCN = showErrors && frontendErrors.password ? "error-input" : ""
	const confirmPasswordInputCN = showErrors && frontendErrors.confirmPassword ? "error-input" : ""


	const errorObj = {};
	errors?.forEach(error => {
	  const [key, value] = error.split(':')
	  errorObj[key.trim()] = value.trim()
	});

	console.log('current backend errors', backendErrors)
	console.log('current frontend errors', frontendErrors)
	console.log("show error status", showErrors)



	useEffect(() => {
		const frontendErrs = {};
		if (firstName.startsWith(" ")) frontendErrs.firstName = "Input cannot begin with a space.";
		if (lastName.startsWith(" ")) frontendErrs.lastName = "Input cannot begin with a space.";
		if (email.startsWith(" ")) frontendErrs.email= "Input cannot begin with a space.";
		if (username.startsWith(" ")) frontendErrs.username = "Input cannot begin with a space.";
		if (password.startsWith(" ")) frontendErrs.password = "Input cannot begin with a space.";
		if (confirmPassword.startsWith(" ")) frontendErrs.confirmPassword = "Input cannot begin with a space.";;
		if (email && !(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/).test(email)) frontendErrs.email = "Not a valid email."
		if (password && password.length < 6) frontendErrs.password = "Must be at least 6 characters.";
		if (password !== confirmPassword) frontendErrs.confirmPassword = "Confirm Password field must be the same as the Password field.";
		setFrontendErrors(frontendErrs)
	}, [firstName, lastName, email, username, password, confirmPassword, errors])


	useEffect(() => {
		const backendErrs = {};
		if (errorObj.firstName) backendErrs.firstName = errorObj.firstName
		if (errorObj.lastName) backendErrs.lastName = errorObj.lastName
		if (errorObj.email) backendErrs.email = errorObj.email
		if (errorObj.username) backendErrs.username = errorObj.username
		if (errorObj.password) backendErrs.password= errorObj.password
		if (errorObj.confirmPassword) backendErrs.confirmPassword= errorObj.confirmPassword
		setBackendErrors(backendErrs)
	}, [errorObj.firstName, errorObj.lastName, errorObj.email, errorObj.username, errorObj.password, errorObj.confirmPassword])



	const handleDemoUser = () => {
		dispatch(login(email="demo@aa.io", password="password"));
		closeModal();
	  };


	const handleSubmit = async (e) => {
		e.preventDefault();
		setShowErrors(true)
		const data = await dispatch(signUp(username, email, password, firstName, lastName));
		dispatch(getCart())

		if (data || Object.values(frontendErrors).length) {
			setErrors(data)
		}
		else {
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
					{showErrors && backendErrors?.email}
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
					{showErrors && backendErrors?.username}
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
					:  <button className="disabled-signup-submit-button" type="submit" disabled={true}>Register</button>}
					<button className="demo-user-button" type="submit" onClick={handleDemoUser}>Demo User</button>
				</div>
			</form>
		</div>
		</>
	);
}

export default SignupFormModal;
