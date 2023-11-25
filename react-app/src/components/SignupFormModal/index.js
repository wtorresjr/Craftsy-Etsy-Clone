import React, { useState } from "react";
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
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password, firstName, lastName));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<>
		<div className="signup-container">
			<h1>Create your account</h1>
			<h2>Registration is easy.</h2>
			<form className="signup-form" onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>

        		<label>First Name<span style={{"color": "#B64B59"}}> *</span></label>
				<input
					type="text"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					required
				/>

				<label>Last Name<span style={{"color": "#B64B59"}}> *</span></label>
				<input
					type="text"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					required
				/>

				<label>Email<span style={{"color": "#B64B59"}}> *</span></label>
				<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
				/>

				<label>Username<span style={{"color": "#B64B59"}}> *</span></label>
					<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
					/>

				<label>Password<span style={{"color": "#B64B59"}}> *</span></label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<label>Confirm Password<span style={{"color": "#B64B59"}}> *</span></label>
				<input
					type="password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
				/>
				<button className="signup-submit-button" type="submit">Register</button>
			</form>
		</div>
		</>
	);
}

export default SignupFormModal;
