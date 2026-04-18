import React, { useState, useEffect } from "react";
import { auth, db } from "../services/firebase";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import "../css/StarterGuide.css";
import "../css/NavMenu.css";

export default function StarterGuide({ onNavigate }) {
  const [menuOpen, setMenuOpen]                 = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [currentUser, setCurrentUser]           = useState(null);
  const [menuPhoto, setMenuPhoto]               = useState(null);
  const [menuAvatarColor, setMenuAvatarColor]   = useState("#8fb9a8");

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
        } catch (e) {}
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogoutClick   = () => { setShowLogoutConfirm(true); setMenuOpen(false); };
  const handleLogoutCancel  = () => setShowLogoutConfirm(false);
  const handleLogoutConfirm = async () => {
    try { await signOut(auth); if (onNavigate) onNavigate("landing"); }
    catch (err) { alert("Error logging out: " + err.message); }
  };
  const handleMenuClick = (page) => { setMenuOpen(false); if (onNavigate) onNavigate(page); };

  return (
    <div className="sg-container">
      <header className="sg-header">
        <div className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="line" /><div className="line" /><div className="line" />
        </div>
        <div className="sg-header-logo">
          <span className="sg-kg">K.G</span>
          <span className="sg-logo-divider" />
          <span className="sg-ltg">Learn Trade Grow</span>
        </div>
        <button className="sg-header-btn" onClick={() => handleMenuClick("lessons")}>
          Go to Lessons →
        </button>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          <div className="menu-user-info">
            <div className="menu-avatar" style={{ background: menuPhoto ? "transparent" : menuAvatarColor }}>
              {menuPhoto ? <img src={menuPhoto} alt="avatar" /> : <span>{(currentUser?.displayName?.[0] || currentUser?.email?.[0] || "U").toUpperCase()}</span>}
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

      {showLogoutConfirm && (
        <div className="modal-overlay" onClick={handleLogoutCancel}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <p>Are you sure you want to log out?</p>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={handleLogoutCancel}>Cancel</button>
              <button className="confirm-btn" onClick={handleLogoutConfirm}>Yes, Logout</button>
            </div>
          </div>
        </div>
      )}

      <div className="sg-hero">
        <div className="sg-hero-inner">
          <p className="sg-hero-label">Getting started</p>
          <h1 className="sg-hero-title">Welcome to K.G</h1>
          <p className="sg-hero-sub">Here is everything you need to know before you begin. The platform works in three stages: learn, test, then trade.</p>
        </div>
      </div>

      <main className="sg-main">

        <div className="sg-step">
          <div className="sg-step-num">01</div>
          <div className="sg-step-body">
            <h2>Work through the lessons</h2>
            <p>There are eight lessons available, starting from the basics of the stock market and building up to more advanced trading strategies. They unlock one at a time, you need to complete a lesson and pass its quiz before the next one becomes available. This makes sure you actually understand each topic before moving on.</p>
            <div className="sg-tip"><strong>Good to know:</strong> Lessons unlock in order. Each one builds on the last.</div>
          </div>
        </div>

        <div className="sg-step">
          <div className="sg-step-num">02</div>
          <div className="sg-step-body">
            <h2>Pass the quiz to progress</h2>
            <p>After each lesson you will be given a quiz. Ten questions are selected at random from a pool of fifteen, so the questions will be different each time you attempt it. You need to score 70% or above to unlock the next lesson. If you do not pass, you can go back through the lesson and try again.</p>
            <div className="sg-tip"><strong>Good to know:</strong> After finishing a quiz you can review it to see which questions you got right or wrong with an explanation for each one.</div>
          </div>
        </div>

        <div className="sg-step">
          <div className="sg-step-num">03</div>
          <div className="sg-step-body">
            <h2>Practice in the trading simulator</h2>
            <p>Once you have worked through the lessons, you can apply what you have learned in the trading simulator. You start with €10,000 of virtual funds and can search for any US-listed stock, view a live 90-day price chart and place buy and sell orders. Everything is powered by real market data, but there is no real money involved, so you can practise freely without any financial risk.</p>
            <div className="sg-tip"><strong>Good to know:</strong> Your portfolio, transaction history and balance are all saved to your account so you can pick up where you left off.</div>
          </div>
        </div>

        <div className="sg-step">
          <div className="sg-step-num">04</div>
          <div className="sg-step-body">
            <h2>Track your progress</h2>
            <p>Your lessons page always shows where you are across all eight lessons. Your portfolio tab in the simulator shows your current holdings, virtual balance, total return and every trade you have made.</p>
          </div>
        </div>

        <div className="sg-cta">
          <button className="sg-cta-btn" onClick={() => handleMenuClick("lessons")}>
            Start First Lesson →
          </button>
        </div>

      </main>
    </div>
  );
}