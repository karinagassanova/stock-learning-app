import React, { useState, useEffect } from "react";
import { auth, db } from "../services/firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import "../css/LessonView.css";
import "../css/PageHeader.css";
import "../css/NavMenu.css";
import "../css/PageHeader.css";
import Quiz from "./Quiz";

export default function LessonView({ lesson, onBack, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [menuPhoto, setMenuPhoto] = useState(null);
  const [menuAvatarColor, setMenuAvatarColor] = useState("#8fb9a8");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      getDoc(doc(db, "profiles", user.uid)).then((snap) => {
        if (snap.exists()) {
          setMenuPhoto(snap.data().photoData || null);
          setMenuAvatarColor(snap.data().avatarColor || "#8fb9a8");
        }
      }).catch(() => {});
    }
  }, []);

  // Guard: if lesson is undefined, don't crash
  if (!lesson) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <p>Lesson not found.</p>
        <button onClick={onBack} style={{ marginTop: "16px", padding: "10px 24px", cursor: "pointer" }}>
          ← Back to Lessons
        </button>
      </div>
    );
  }

  const handleLogoutClick = () => { setShowLogoutConfirm(true); setMenuOpen(false); };
  const handleLogoutCancel = () => setShowLogoutConfirm(false);
  const handleLogoutConfirm = async () => {
    try { await signOut(auth); } catch (err) { alert("Error logging out: " + err.message); }
  };
  const handleMenuClick = (page) => { setMenuOpen(false); if (onNavigate) onNavigate(page); };
  const handleQuizComplete = (score) => { setShowQuiz(false); if (score.passed) onBack(); };

  // Show Quiz
  if (showQuiz) {
    return (
      <Quiz
        lessonId={lesson.id}
        onBackToLesson={() => setShowQuiz(false)}
        onQuizComplete={handleQuizComplete}
      />
    );
  }

  return (
    <div className="lesson-view-container">
      <header className="app-header">
        <div className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div className="app-header-logo">
          <span className="app-kg">K.G</span>
          <span className="app-divider" />
          <span className="app-ltg">Learn Trade Grow</span>
        </div>
        <div className="app-header-right"></div>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          <div className="menu-user-info">
            <div className="menu-avatar" style={{ background: menuPhoto ? "transparent" : menuAvatarColor }}>
              {menuPhoto
                ? <img src={menuPhoto} alt="avatar" />
                : <span>{(auth.currentUser?.displayName?.[0] || auth.currentUser?.email?.[0] || "U").toUpperCase()}</span>}
            </div>
            <div className="menu-user-text">
              <p className="menu-user-name">{auth.currentUser?.displayName || "Trader"}</p>
              <p className="menu-user-email">{auth.currentUser?.email}</p>
            </div>
          </div>
          <ul>
            <li onClick={() => handleMenuClick("starterGuide")}>Starter Guide</li>
            <li className="active">Lessons</li>
            <li onClick={() => handleMenuClick("trading")}>Trading Simulator</li>
            <li onClick={() => handleMenuClick("profile")}>Profile</li>
            <li onClick={handleLogoutClick}>Logout</li>
          </ul>
        </div>
      )}

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

        <div className="lesson-rich-content">{lesson.content}</div>

        <div className="lesson-navigation">
          <button className="nav-btn secondary" onClick={onBack}>
            Back to Lessons
          </button>
          <button className="nav-btn primary" onClick={() => setShowQuiz(true)}>
            Take Quiz →
          </button>
        </div>
      </main>
    </div>
  );
}