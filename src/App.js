import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import Signup from "./Signup";
import Login from "./Login";
import StarterGuide from "./StarterGuide";
import Lessons from "./Lessons";

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [currentPage, setCurrentPage] = useState("starterGuide"); // Track current page

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!isSigningUp) {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [isSigningUp]);

  const handleSignupSuccess = () => {
    setIsSigningUp(true);
    setUser(null);
    setShowLogin(true);
    setTimeout(() => setIsSigningUp(false), 1000);
  };

  const handleLoginSuccess = () => {
    setIsSigningUp(false);
    setUser(auth.currentUser);
  };

  const handleGoogleLogin = (user) => {
    setIsSigningUp(false);
    setUser(user);
  };

  const switchToLogin = () => {
    setShowLogin(true);
  };

  const switchToSignup = () => {
    setShowLogin(false);
  };

  // Navigation function to switch between pages
  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  // If user is logged in, show the appropriate page
  if (user) {
    switch(currentPage) {
      case "lessons":
        return <Lessons onNavigate={navigateTo} />;
      case "starterGuide":
      default:
        return <StarterGuide onNavigate={navigateTo} />;
    }
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