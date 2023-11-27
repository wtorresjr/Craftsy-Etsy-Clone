import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});
	const [canSubmit, setCanSubmit] = useState(true);
	const { closeModal } = useModal();


	const firstNameInputCN = !canSubmit && errors.firstName ? "error-input" : ""
	const lastNameInputCN = !canSubmit && errors.lastName ? "error-input" : ""
	const usernameInputCN = !canSubmit && errors.username ? "error-input" : ""
	const emailInputCN = !canSubmit && errors.email ? "error-input" : ""
	const passwordInputCN = !canSubmit && errors.password ? "error-input" : ""
	const confirmPasswordInputCN = !canSubmit && errors.confirmPassword ? "error-input" : ""



	useEffect(() => {
		const validationErrors = {};

		if (email && !(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/).test(email)) validationErrors.email = "Not a valid email."
		if (password && password.length < 6) validationErrors.password = "Must be at least 6 characters.";
		if (password !== confirmPassword) validationErrors.confirmPassword = "Confirm Password field must be the same as the Password field.";
		setErrors(validationErrors)
	}, [email, password, confirmPassword])

	// console.log('validation errors present?', Object.values(errors))


	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!Object.values(errors)) {
			const data = await dispatch(signUp(username, email, password, firstName, lastName));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setCanSubmit(false)
		}
	};


	return (
		<>
		<div className="signup-container">
			<h1>Create your account</h1>
			<h2>Registration is easy.</h2>
			<form className="signup-form" onSubmit={handleSubmit}>
				<div className="firstname-div">
					<label>First Name<span style={{"color": "#B64B59"}}>*</span></label>
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
					{!canSubmit && errors && errors.firstName}
				</div>
				<div className="lastname-div">
					<label>Last Name<span style={{"color": "#B64B59"}}> *</span></label>
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
					{!canSubmit && errors && errors.lastName}
				</div>
				<div className="email-div">
					<label>Email<span style={{"color": "#B64B59"}}> *</span></label>
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
					{!canSubmit && errors && errors.email}
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
					{!canSubmit && errors && errors.username}
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
					{!canSubmit && errors && errors.password}
				</div>
				<div className="confirm-password-div">
					<label>Confirm Password<span style={{"color": "#B64B59"}}> *</span></label>
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
					{!canSubmit && errors && errors.confirmPassword}
				</div>
				<div className="signup-submit-button-div">
					<button className="signup-submit-button" type="submit" disabled={(firstName && lastName && email && username && password && confirmPassword) ? false : true}>Register</button>
				</div>
			</form>
		</div>
		</>
	);
}

export default SignupFormModal;
