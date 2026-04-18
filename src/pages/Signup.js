import React, { useState } from "react";
import { auth, googleProvider, db } from "../services/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "../css/Auth.css";

export default function Signup({ onSignupSuccess, onGoogleLogin, onSwitchToLogin }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleSignup = async () => {
    if (!email || !password) { setError("Please enter your email and password."); return; }
    if (password.length < 6)  { setError("Password must be at least 6 characters."); return; }
    setLoading(true); setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await signOut(auth);
      if (onSignupSuccess) onSignupSuccess();
      setDoc(doc(db, "users", user.uid), {
        userId: user.uid, email: user.email,
        name: "", profilePicture: "",
        virtualBalance: 10000, totalProfitLoss: 0,
        createdAt: new Date()
      }).catch(err => console.error("Error creating user data:", err));
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("An account with this email already exists.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await setDoc(doc(db, "users", user.uid), {
        userId: user.uid, email: user.email,
        name: user.displayName || "", profilePicture: user.photoURL || "",
        virtualBalance: 10000, totalProfitLoss: 0, createdAt: new Date()
      }, { merge: true });
      if (onGoogleLogin) onGoogleLogin(user);
    } catch (err) {
      setError("Google sign-in failed. Please try again.");
    }
  };

  return (
    <div className="auth-page">

      {/* Top wordmark */}
      <div className="auth-wordmark" onClick={() => window.location.reload()}>
        <span className="auth-kg">K.G</span>
        <span className="auth-divider" />
        <span className="auth-ltg">Learn Trade Grow</span>
      </div>

      <div className="auth-card">
        <div className="auth-card-header">
          <h2>Create your account</h2>
          <p>Free forever. No credit card required.</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <div className="auth-fields">
          <div className="auth-field">
            <label>Email address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSignup()}
            />
          </div>
        </div>

        <button className="auth-btn-primary" onClick={handleSignup} disabled={loading}>
          {loading ? <span className="auth-spinner" /> : "Create Account"}
        </button>

        <div className="auth-separator"><span>or</span></div>

        <button className="auth-btn-google" onClick={handleGoogleSignup}>
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Continue with Google
        </button>

        <p className="auth-switch">
          Already have an account?{" "}
          <button onClick={onSwitchToLogin}>Log in</button>
        </p>
      </div>

    </div>
  );
}