import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import SignupFormModal from "../SignupFormModal";
import OpenModalButton from "../OpenModalButton";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  //setting state
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [backendErrors, setBackendErrors] = useState({});
  const [canSubmit, setCanSubmit] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  //sets dynamic input classname
  const toggleInputCN = (formField) =>
    showErrors && backendErrors[formField] ? "error-input" : "";


  //handles input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  //handles demo user log in
  const handleDemoUser = () => {
    dispatch(
      login(
        (formValues.email = "demo@aa.io"),
        (formValues.password = "password")
      )
    );
    closeModal();
  };

  //handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCanSubmit(true);
    setShowErrors(true);
    const { email, password } = formValues;
    const data = await dispatch(login(email, password));
    if (data) {
      const dataErrors = {};
      data?.forEach((error) => {
        const [key, value] = error.split(":");
        dataErrors[key.trim()] = value.trim();
      });
      setBackendErrors(dataErrors);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-header-div">
          <h1>Sign In</h1>
          <div className="register-button">
            <OpenModalButton
              buttonText="Register"
              modalComponent={<SignupFormModal />}
            />
          </div>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="email-div">
            <label>Email address</label>
            <input
              type="text"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              className={toggleInputCN("email")}
              onFocus={() => {
                if (backendErrors.hasOwnProperty("email"))
                  delete backendErrors["email"];
              }}
              required
            />
          </div>
          {backendErrors?.email && showErrors && <p className="errors-text">{backendErrors.email}</p>}

          <div className="password-div">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleInputChange}
              onFocus={() => {
                if (backendErrors.hasOwnProperty("password"))
                  delete backendErrors["password"];
              }}
              className={toggleInputCN("password")}
              required
            />
          </div>
          {backendErrors?.password && showErrors && <p className="errors-text">{backendErrors.password}</p>}

          <div className="login-buttons-div">
            <button className="login-submit-button" type="submit">
              Log In
            </button>
            <button
              className="demo-user-button"
              type="submit"
              onClick={handleDemoUser}
            >
              Demo User
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginFormModal;
