import React, { useState } from "react";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import "./css/StarterGuide.css";

export default function StarterGuide() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
    setMenuOpen(false);
  };

  const handleLogoutConfirm = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
    } catch (err) {
      alert("Error logging out: " + err.message);
    }
  };

  const handleLogoutCancel = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <div className="starter-guide-container">
      {/* Header */}
      <header className="guide-header">
        <div className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div className="header-logo">
          <h1>K.G</h1>
          <p>Learn Trade Grow</p>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <ul>
            <li onClick={handleLogoutClick}>Logout</li>
          </ul>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Are you sure?</h3>
            <p>Do you want to log out?</p>
            <div className="modal-buttons">
              <button className="confirm-btn" onClick={handleLogoutConfirm}>
                Yes
              </button>
              <button className="cancel-btn" onClick={handleLogoutCancel}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="guide-content">
        <h2 className="welcome-title">Welcome</h2>
        <h3 className="starter-title">Starter Guide</h3>

        {/* Section 1 */}
        <section className="guide-section">
          <h4>1. Learn with Interactive Lessons</h4>
          <p>Our platform provides a series of beginner-friendly lessons.</p>
          <p className="important-text">
            <strong>Important:</strong> Lessons are unlocked in sequential order. You must complete each lesson and pass its quiz to unlock the next lesson. This ensures you build your knowledge step by step.
          </p>
        </section>

        {/* Section 2 */}
        <section className="guide-section">
          <h4>2. Test Your Knowledge with Quizzes</h4>
          <p>After completing each lesson, take the quiz to test your understanding.</p>
          <ul>
            <li>Passing the quiz unlocks the next lesson</li>
            <li>Quiz results are automatically stored in your account</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="guide-section">
          <h4>3. Practice with the Virtual Trading Simulator</h4>
          <p>Use your virtual balance to buy and sell real-time stocks without risking real money.</p>
          <ul>
            <li>Track your portfolio and virtual profits/losses</li>
            <li>Make trading decisions based on real market data</li>
            <li>Gain practical experience while safely experimenting</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="guide-section">
          <h4>4. Track Your Progress</h4>
          <p>Your personal dashboard shows:</p>
          <ul>
            <li>Completed lessons and quiz scores</li>
            <li>Virtual portfolio performance</li>
            <li>Learning and trading milestones</li>
          </ul>
        </section>
      </main>
    </div>
  );
}