import React, { useState } from "react";
import { auth, googleProvider } from "./firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default function Login({ onGoogleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      alert("Google Login successful!");
      if (onGoogleLogin) onGoogleLogin(result.user); // log in immediately
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br /><br />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br /><br />
      <button onClick={handleLogin}>Login</button>
      <hr />
      <button onClick={handleGoogleLogin}>Continue with Google</button>
    </div>
  );
}
