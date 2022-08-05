import React, { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase";
import Button from "../button/Button";
import FormInput from "../form-input/FormInput";

import "./sign-up.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [loginError, setLoginError] = useState("");
  const { displayName, email, password, confirmPassword } = formFields;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields((prev) => (prev = defaultFormFields));
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setLoginError((prev) => (prev = "Your password did not match!"));
      return;
    }
    try {
      resetFormFields();
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      const userDocRef = await createUserDocumentFromAuth(user, {
        displayName,
      });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        return setLoginError(
          (prev) => (prev = "Cannot create user, email already in use")
        );
      }
      console.log("there was an error signing up", error.message);
      //   setLoginError((prev) => (prev = error.message));
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      {loginError && <p>{loginError}</p>}
      <form onSubmit={handleSignUp}>
        <FormInput
          label="Display Name"
          onChange={handleChange}
          type="text"
          name="displayName"
          value={displayName}
          required
        />
        {/* Other option for input state */}
        {/* <FormInput
          label="Display Name"
          inputOptions={{
            onChange: handleChange,
            type: "text",
            nam: "displayName",
            value: displayName,
            required: true,
          }}
        /> */}
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

        <FormInput
          label="Confirm Password"
          onChange={handleChange}
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          required
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
