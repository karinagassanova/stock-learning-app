import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import Signup from "./Signup";
import Login from "./Login";
import StarterGuide from "./StarterGuide";

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [isSigningUp, setIsSigningUp] = useState(false);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      // Don't update user state if we're in the middle of signup
      if (!isSigningUp) {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [isSigningUp]);

  const handleSignupSuccess = () => {
    // Set flag to prevent auth state changes
    setIsSigningUp(true);
    // Clear user immediately
    setUser(null);
    // Switch to login page
    setShowLogin(true);
    // Reset flag after a moment
    setTimeout(() => setIsSigningUp(false), 1000);
  };

  const handleLoginSuccess = () => {
    // After login, set the user to show StarterGuide
    setIsSigningUp(false);
    setUser(auth.currentUser);
  };

  const handleGoogleLogin = (user) => {
    // Google login goes directly to StarterGuide
    setIsSigningUp(false);
    setUser(user);
  };

  const switchToLogin = () => {
    setShowLogin(true);
  };

  const switchToSignup = () => {
    setShowLogin(false);
  };

  // If user is logged in, show StarterGuide
  if (user) {
    return <StarterGuide />;
  }

  // If not logged in, show Login or Signup
  return (
    <div>
      {!showLogin ? (
        <Signup
          onSignupSuccess={handleSignupSuccess}
          onGoogleLogin={handleGoogleLogin}
          onSwitchToLogin={switchToLogin}
        />
      ) : (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onGoogleLogin={handleGoogleLogin}
          onSwitchToSignup={switchToSignup}
        />
      )}
    </div>
  );
}