import React, { useState } from "react";
import { auth, googleProvider } from "./firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import logo from "./images/logo.png";
import "./Auth.css";

export default function Signup({ onSignupSuccess, onGoogleLogin, onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup successful!");
      if (onSignupSuccess) onSignupSuccess();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      alert("Google Sign-Up successful!");
      if (onGoogleLogin) onGoogleLogin(result.user);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src={logo} alt="KG Logo" className="logo-image" />

        <h2>Create an account</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="primary-btn" onClick={handleSignup}>
          Sign Up
        </button>

        <button className="google-btn" onClick={handleGoogleSignup}>
          Continue with Google
        </button>

        <p className="switch-text">
          Already have an account?{" "}
          <span onClick={onSwitchToLogin}>Log In</span>
        </p>
      </div>
    </div>
  );
}
