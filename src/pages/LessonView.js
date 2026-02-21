import React, { useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import "../css/LessonView.css";

export default function LessonView({ lesson, onBack, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
    setMenuOpen(false);
  };

  const handleLogoutConfirm = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      alert("Error logging out: " + err.message);
    }
  };

  const handleLogoutCancel = () => {
    setShowLogoutConfirm(false);
  };

  const handleMenuClick = (page) => {
    setMenuOpen(false);
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <div className="lesson-view-container">
      {/* Header */}
      <header className="lesson-header">
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
            <li onClick={() => handleMenuClick("starterGuide")}>Starter Guide</li>
            <li className="active">Lessons</li>
            <li>Trading Simulator</li>
            <li>Profile</li>
            <li onClick={handleLogoutClick}>Logout</li>
          </ul>
        </div>
      )}

      {/* Logout Modal */}
      {showLogoutConfirm && (
        <div className="modal-overlay" onClick={handleLogoutCancel}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </div>
            <h3>Logout Confirmation</h3>
            <p>Are you sure you want to logout?</p>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={handleLogoutCancel}>Cancel</button>
              <button className="confirm-btn" onClick={handleLogoutConfirm}>Yes, Logout</button>
            </div>
          </div>
        </div>
      )}

      {/* Lesson Content */}
      <main className="lesson-content-main">
        <button className="back-button" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Lessons
        </button>

        <div className="lesson-header-info">
          <span className="lesson-badge">{lesson.difficulty}</span>
          <span className="lesson-duration">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            {lesson.duration}
          </span>
        </div>

        <h1 className="lesson-main-title">{lesson.title}</h1>
        <p className="lesson-intro">{lesson.description}</p>

        {/* Render lesson content */}
        <div className="lesson-rich-content">
          {lesson.content}
        </div>

        {/* Navigation Buttons */}
        <div className="lesson-navigation">
          <button className="nav-btn secondary" onClick={onBack}>
            Back to Lessons
          </button>
          <button className="nav-btn primary">
            Take Quiz
          </button>
        </div>
      </main>
    </div>
  );
}