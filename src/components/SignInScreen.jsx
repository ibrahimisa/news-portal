import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Container } from "react-bootstrap";
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyCiFkPOlJRrte5CV75AFgHWfgLNt9QBjgc",
//   authDomain: "news-portal-123.firebaseapp.com",
//   projectId: "news-portal-123",
//   storageBucket: "news-portal-123.appspot.com",
//   messagingSenderId: "215947503843",
//   appId: "1:215947503843:web:6f6778b6a921f0f2717dd6",
// };

// // Initialize Firebase

// const app = firebase.initializeApp(firebaseConfig);

// const uiConfig = {
//   signInFlow: "popup",
//   signInOptions: [
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//   ],
//   callbacks: {
//     signInSuccess: () => {},
//   },
// };

function SignInScreen({ uiConfig, firebaseAuth }) {
  return (
    <Container className="text-center p-5">
      <h1>Welcome to NewsPortal</h1>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />
    </Container>
  );
}

export default SignInScreen;
