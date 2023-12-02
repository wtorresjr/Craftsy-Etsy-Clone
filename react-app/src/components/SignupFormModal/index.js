import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp, login } from "../../store/session";
import "./SignupForm.css";
import { getCart } from "../../store/cart";


function SignupFormModal() {
	const dispatch = useDispatch();
	const { closeModal } = useModal();

	//setting state
	const initialValues = { firstName: "", lastName: "", email: "", username: "", password: "", confirmPassword: ""};
	const [formValues, setFormValues] = useState(initialValues);
	const [formErrors, setFormErrors] = useState({});
	const [backendErrors, setBackendErrors] = useState({});
	const [canSubmit, setCanSubmit] = useState(false);
	const [showErrors, setShowErrors] = useState(false);

	//sets dynamic input classname
	const toggleInputCN = (formField) => showErrors && formErrors[formField] ? "error-input" : "";

	//handles input change
	const handleInputChange = (e) => {
		const {name, value} = e.target;
		setFormValues({...formValues, [name]:value});
	};

	//handles demo user log in
	const handleDemoUser = () => {
		dispatch(login(formValues.email="demo@aa.io", formValues.password="password"));
		closeModal();
	};

	//handles form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		setCanSubmit(true);
		setShowErrors(true);
		const {username, email, password, firstName, lastName} = formValues;
		const data = await dispatch(signUp(username, email, password, firstName, lastName));
		dispatch(getCart())
		if (data) {
			const dataErrors = {};
			data?.forEach(error => {
			const [key, value] = error.split(':')
			dataErrors[key.trim()] = value.trim()
			});
			setBackendErrors(dataErrors);
		}
		else {
			closeModal();
		}
	};

	// useEffect to track frontend validations
	useEffect(() => {
		const errors = {};
		const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
		if (!formValues.firstName) errors.firstName = "First name is required.";
		if (!formValues.lastName) errors.lastName = "Last name is required.";
		if (!formValues.email) errors.email = "Email is required.";
		if (!formValues.username) errors.username = "Username is required.";
		if (!formValues.password) errors.password = "Password is required.";
		if (!formValues.confirmPassword) errors.confirmPassword = "Confirm password is required.";

		if (formValues.firstName.startsWith(" ")) errors.firstName = "Input cannot begin with a space.";
		if (formValues.lastName.startsWith(" ")) errors.lastName = "Input cannot begin with a space.";
		if (formValues.email.startsWith(" ")) errors.email = "Input cannot begin with a space.";
		if (formValues.username.startsWith(" ")) errors.username = "Input cannot begin with a space.";
		if (formValues.password.startsWith(" ")) errors.password = "Input cannot begin with a space.";
		if (formValues.confirmPassword.startsWith(" ")) errors.confirmPassword = "Input cannot begin with a space."

		if (formValues.firstName.length > 15) errors.firstName = "Input must not exceed 15 characters.";
		if (formValues.lastName.length > 15) errors.lastName = "Input must not exceed 15 characters.";
		if (formValues.email.length > 255) errors.email = "Input must not exceed 255 characters.";
		if (formValues.username.length > 40) errors.username = "Input must not exceed 40 characters.";
		if (formValues.password.length > 255) errors.password = "Input must not exceed 255 characters.";
		if (formValues.confirmPassword.length > 255) errors.confirmPassword = "Input must not exceed 255 characters.";
		if (formValues.password.length < 6) errors.password = "Must be at least 6 characters.";

		if (!email_pattern.test(formValues.email)) errors.email = "Not a valid email.";
		if (formValues.password !== formValues.confirmPassword) errors.confirmPassword = "Confirm Password field must be the same as the Password field.";

		if (backendErrors.email) errors.email = backendErrors.email;
		if (backendErrors.username) errors.username = backendErrors.username;

		setFormErrors(errors);
	}, [formValues, backendErrors])


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
						name="firstName"
						title="Please fill out this field."
						value={formValues.firstName}
						onChange={handleInputChange}
						className={toggleInputCN("firstName")}
						required
					/>
				</div>
				{showErrors && <p className="errors-text">{formErrors.firstName}</p>}


				<div className="lastname-div">
					<label>Last name<span style={{"color": "#B64B59"}}> *</span></label>
					<input
						type="text"
						name="lastName"
						title="Please fill out this field."
						value={formValues.lastName}
						onChange={handleInputChange}
						className={toggleInputCN("lastName")}
						required
					/>
				</div>
				{showErrors && <p className="errors-text">{formErrors.lastName}</p>}


				<div className="email-div">
					<label>Email address<span style={{"color": "#B64B59"}}> *</span></label>
					<input
						type="text"
						name="email"
						title="Please fill out this field."
						value={formValues.email}
						onChange={handleInputChange}
						onFocus={() => {if (backendErrors.hasOwnProperty("email")) delete backendErrors["email"]}}
						className={toggleInputCN("email")}
						required
					/>
				</div>
				{showErrors && <p className="errors-text">{formErrors.email}</p>}


				<div className="username-div">
					<label>Username<span style={{"color": "#B64B59"}}> *</span></label>
					<input
						type="text"
						name="username"
						title="Please fill out this field."
						value={formValues.username}
						onChange={handleInputChange}
						onFocus={()=> {if (backendErrors.hasOwnProperty("username")) delete backendErrors["username"]}}
						className={toggleInputCN("username")}
						required
					/>
				</div>
				{showErrors && <p className="errors-text">{formErrors.username}</p>}


				<div className="password-div">
					<label>Password<span style={{"color": "#B64B59"}}> *</span></label>
					<input
						type="password"
						name="password"
						title="Please fill out this field."
						value={formValues.password}
						onChange={handleInputChange}
						className={toggleInputCN("password")}
						required
					/>
				</div>
				{showErrors && <p className="errors-text">{formErrors.password}</p>}


				<div className="confirm-password-div">
					<label>Confirm password<span style={{"color": "#B64B59"}}> *</span></label>
					<input
						type="password"
						name="confirmPassword"
						title="Please fill out this field."
						value={formValues.confirmPassword}
						onChange={handleInputChange}
						className={toggleInputCN("confirmPassword")}
						required
					/>
				</div>
				{showErrors && <p className="errors-text">{formErrors.confirmPassword}</p>}


				<div className="signup-button-divs">
					{(formValues.firstName && formValues.lastName && formValues.email && formValues.username && formValues.password && formValues.confirmPassword)
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
