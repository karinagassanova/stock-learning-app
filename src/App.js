import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  const handleSignupSuccess = () => {
    setShowLogin(true);
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

  if (user) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Welcome, {user.email}</h1>
        <p>You are now logged in!</p>
      </div>
    );
  }

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
          onGoogleLogin={handleGoogleLogin}
          onSwitchToSignup={switchToSignup}
        />
      )}
    </div>
  );
}
