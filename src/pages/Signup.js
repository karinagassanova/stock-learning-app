import React, { useState } from "react";
import { auth, googleProvider, db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import logo from "../assets/images/logo.png";
import { doc, setDoc } from "firebase/firestore";
import "../css/Auth.css";
import "../firebase";

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
  
      // Sign out IMMEDIATELY to prevent showing starter guide
      await signOut(auth);

      // Switch to login page right away
      if (onSignupSuccess) onSignupSuccess();

      // Create user document in Firestore (in background after redirect)
      setDoc(doc(db, "users", user.uid), {
        userId: user.uid,
        email: user.email,
        name: "",
        profilePicture: "",
        virtualBalance: 100000,
        totalProfitLoss: 0,
        createdAt: new Date()
      }).catch(err => {
        console.error("Error creating user data:", err);
      });

      alert("Account created successfully! Please login to continue.");
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
        { merge: true }
      );
  
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