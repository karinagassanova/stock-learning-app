import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import Signup from "./Signup";
import Login from "./Login";
import StarterGuide from "./StarterGuide";

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignupSuccess = () => {
    setUser(auth.currentUser);
  };

  const handleLoginSuccess = () => {
    setUser(auth.currentUser);
  };

  const handleGoogleLogin = (user) => {
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