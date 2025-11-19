import React, { useState } from "react";
import { auth, googleProvider } from "./firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

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
      alert("Google Sign-In successful!");
      if (onGoogleLogin) onGoogleLogin(result.user);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input 
        type="email" 
        placeholder="Email" 
        onChange={(e) => setEmail(e.target.value)} 
      /><br /><br />
      <input 
        type="password" 
        placeholder="Password" 
        onChange={(e) => setPassword(e.target.value)} 
      /><br /><br />
      <button onClick={handleSignup}>Sign Up</button>
      <hr />
      <button onClick={handleGoogleSignup}>Continue with Google</button>

      <p style={{ marginTop: 15 }}>
        Already have an account?{" "}
        <span 
          style={{ color: "blue", cursor: "pointer" }} 
          onClick={onSwitchToLogin}
        >
          Log In
        </span>
      </p>
    </div>
  );
}
