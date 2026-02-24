import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import StarterGuide from "./pages/StarterGuide";
import LandingPage from "./pages/LandingPage";
import Lessons from "./pages/Lessons";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [user, setUser] = useState(null);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [currentPage, setCurrentPage] = useState("starterGuide");

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!isSigningUp) {
        setUser(currentUser);
        if (currentUser) {
          setShowLanding(false);
        }
      }
    });
    return () => unsubscribe();
  }, [isSigningUp]);

  const handleSignupSuccess = () => {
    setIsSigningUp(true);
    setUser(null);
    setShowSignup(false);
    setShowLogin(true);
    setTimeout(() => setIsSigningUp(false), 1000);
  };

  const handleLoginSuccess = () => {
    setIsSigningUp(false);
    setUser(auth.currentUser);
    setShowLogin(false);
    setShowLanding(false);
  };

  const handleGoogleLogin = (user) => {
    setIsSigningUp(false);
    setUser(user);
    setShowLanding(false);
  };

  const handleGetStarted = () => {
    setShowLanding(false);
    setShowSignup(true);
    setShowLogin(false);
  };

  const handleLoginClick = () => {
    setShowLanding(false);
    setShowSignup(false);
    setShowLogin(true);
  };

  const switchToLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  const switchToSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  // Show landing page if not logged in and landing is active
  if (!user && showLanding) {
    return <LandingPage onGetStarted={handleGetStarted} onLogin={handleLoginClick} />;
  }

  // Show signup page
  if (!user && showSignup) {
    return (
      <Signup
        onSignupSuccess={handleSignupSuccess}
        onGoogleLogin={handleGoogleLogin}
        onSwitchToLogin={switchToLogin}
      />
    );
  }

  // Show login page
  if (!user && showLogin) {
    return (
      <Login
        onLoginSuccess={handleLoginSuccess}
        onGoogleLogin={handleGoogleLogin}
        onSwitchToSignup={switchToSignup}
      />
    );
  }

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

  return null;
}