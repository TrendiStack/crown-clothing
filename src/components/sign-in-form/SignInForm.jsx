import React, { useState } from "react";
import FormInput from "../form-input/FormInput";
import {
  signInUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase";
import Button, { BUTTON_TYPE_CLASSES } from "../button/Button";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = ({ googleLogin }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [loginError, setLoginError] = useState("");
  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const logGoogleUser = async () => {
    await signInWithGooglePopup();
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      await signInUserWithEmailAndPassword(email, password);
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          setLoginError((prev) => (prev = "Wrong password!"));
          break;
        case "auth/user-not-found":
          setLoginError((prev) => (prev = "User not found!"));
          break;
        default:
          console.log("Failed to sign in to account", error.message);
      }
    }
  };
  return (
    <div className="sign-in-container">
      <h2>already have an account?</h2>
      <span>Sign in with your email and password</span>
      {loginError && <p>{loginError}</p>}
      <form onSubmit={handleSignIn}>
        <FormInput
          label="Email"
          onChange={handleChange}
          type="email"
          name="email"
          value={email}
          required
        />

        <FormInput
          label="Password"
          onChange={handleChange}
          type="password"
          name="password"
          value={password}
          required
        />
        <div className="form-button-container">
          <Button type="submit">SIGN IN</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={logGoogleUser}
          >
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
