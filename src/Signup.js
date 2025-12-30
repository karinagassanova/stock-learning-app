import React, { useState } from "react";
import { auth, googleProvider } from "./firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import logo from "./images/logo.png";
import "./css/Auth.css";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export default function Signup({ onSignupSuccess, onGoogleLogin, onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
  
      const user = userCredential.user;
  
      // Create user document in Firestore
      await setDoc(doc(db, "users", user.uid), {
        userId: user.uid,
        email: user.email,
        name: "",
        profilePicture: "",
        virtualBalance: 100000,
        totalProfitLoss: 0,
        createdAt: new Date()
      });
  
      alert("Signup successful!");
      if (onSignupSuccess) onSignupSuccess();
    } catch (err) {
      alert(err.message);
    }
  };  

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
  
      // Create or update user document in Firestore
      await setDoc(
        doc(db, "users", user.uid),
        {
          userId: user.uid,
          email: user.email,
          name: user.displayName || "",
          profilePicture: user.photoURL || "",
          virtualBalance: 100000,
          totalProfitLoss: 0,
          createdAt: new Date()
        },
        { merge: true } // prevents overwriting existing data
      );
  
      alert("Google Sign-Up successful!");
      if (onGoogleLogin) onGoogleLogin(user);
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
