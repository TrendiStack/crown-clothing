import React from "react";
import SignUpForm from "../../components/sign-up-form/SignUpForm.jsx";
import SignInForm from "../../components/sign-in-form/SignInForm.jsx";
// import { getRedirectResult } from "firebase/auth";
// import {
//   auth,
//   signInWithGooglePopup,
//   createUserDocumentFromAuth,
//   signInWithGoogleRedirect,
// } from "../../utils/firebase/firebase.js";

import "./authentication.styles.scss";

const Authentication = () => {
  // useEffect(async () => {
  //   const response = await getRedirectResult(auth);
  //   if (null) {
  //     const userDocRef = await createUserDocumentFromAuth(response.user);
  //   }
  // }, []);
  // const logGoogleRedirectUser = async () => {
  //   const { user } = await signInWithGoogleRedirect();
  //   const userDocRef = await createUserDocumentFromAuth(user);
  // };

  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
