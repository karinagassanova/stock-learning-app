import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import "../css/StarterGuide.css";
import "../css/NavMenu.css";

export default function StarterGuide({ onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [menuPhoto, setMenuPhoto] = useState(null);
  const [menuAvatarColor, setMenuAvatarColor] = useState("#8fb9a8");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const snap = await getDoc(doc(db, "profiles", user.uid));
          if (snap.exists()) {
            setMenuPhoto(snap.data().photoData || null);
            setMenuAvatarColor(snap.data().avatarColor || "#8fb9a8");
          }
        } catch (e) { /* silent */ }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
    setMenuOpen(false);
  };

  const handleLogoutConfirm = async () => {
    try {
      await signOut(auth);
      if (onNavigate) onNavigate("landing");
    } catch (err) {
      alert("Error logging out: " + err.message);
    }
  };

  const handleLogoutCancel = () => {
    setShowLogoutConfirm(false);
  };

  const handleMenuClick = (page) => {
    setMenuOpen(false);
    if (onNavigate) onNavigate(page);
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
          <div className="menu-user-info">
            <div className="menu-avatar" style={{ background: menuPhoto ? "transparent" : menuAvatarColor }}>
              {menuPhoto
                ? <img src={menuPhoto} alt="avatar" />
                : <span>{(currentUser?.displayName?.[0] || currentUser?.email?.[0] || "U").toUpperCase()}</span>}
            </div>
            <div className="menu-user-text">
              <p className="menu-user-name">{currentUser?.displayName || "Trader"}</p>
              <p className="menu-user-email">{currentUser?.email}</p>
            </div>
          </div>
          <ul>
            <li className="active" onClick={() => handleMenuClick("starterGuide")}>Starter Guide</li>
            <li onClick={() => handleMenuClick("lessons")}>Lessons</li>
            <li onClick={() => handleMenuClick("trading")}>Trading Simulator</li>
            <li onClick={() => handleMenuClick("profile")}>Profile</li>
            <li onClick={handleLogoutClick}>Logout</li>
          </ul>
        </div>
      )}

      {/* Logout Confirmation Modal */}
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