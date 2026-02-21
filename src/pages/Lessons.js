import React, { useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import "../css/Lessons.css";
import { lessonsData } from "../data/lessonsData";
import LessonView from "./LessonView";

export default function Lessons({ onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);

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

  const handleStartLesson = (lessonId) => {
    const lesson = lessonsData[lessonId];
    if (lesson) {
      setSelectedLesson(lesson);
    }
  };

  const handleBackToLessons = () => {
    setSelectedLesson(null);
  };

  // If a lesson is selected, show the LessonView
  if (selectedLesson) {
    return (
      <LessonView 
        lesson={selectedLesson}
        onBack={handleBackToLessons}
        onNavigate={onNavigate}
      />
    );
  }

  const lessons = [
    {
      id: 1,
      title: "Introduction to the Stock Market",
      description: "Understand what stocks are, how the market works, and why people invest",
      difficulty: "Beginner",
      duration: "20 min",
      quizComplete: false
    },
    {
      id: 2,
      title: "How Stock Trading Works",
      description: "Learn about stock exchanges, buying and selling, and market orders",
      difficulty: "Beginner",
      duration: "35 min",
      quizComplete: false
    },
    {
      id: 3,
      title: "Understanding Risk and Diversification",
      description: "Explore investment risk, portfolio diversification, and risk management strategies",
      difficulty: "Beginner",
      duration: "20 min",
      quizComplete: false
    },
    {
      id: 4,
      title: "Reading Stock Charts and Prices",
      description: "Master candlestick charts, price movements, and volume indicators",
      difficulty: "Intermediate",
      duration: "35 min",
      quizComplete: false
    },
    {
      id: 5,
      title: "Fundamental Analysis Basics",
      description: "Analyze company financials, P/E ratios, earnings reports, and balance sheets",
      difficulty: "Intermediate",
      duration: "50 min",
      quizComplete: false
    },
    {
      id: 6,
      title: "Technical Analysis & Indicators",
      description: "Study moving averages, RSI, MACD, and other technical trading tools",
      difficulty: "Intermediate",
      duration: "30 min",
      quizComplete: false
    },
    {
      id: 7,
      title: "Trading Psychology & Discipline",
      description: "Control emotions, avoid common mistakes, and develop a trading mindset",
      difficulty: "Advanced",
      duration: "60 min",
      quizComplete: false
    },
    {
      id: 8,
      title: "Advanced Trading Strategies",
      description: "Learn swing trading, day trading, position trading, and strategy development",
      difficulty: "Advanced",
      duration: "25 min",
      quizComplete: false
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case "Beginner": return "#4caf50";
      case "Intermediate": return "#ff9800";
      case "Advanced": return "#f44336";
      default: return "#999";
    }
  };

  return (
    <div className="lessons-container">
      {/* Header */}
      <header className="lessons-header">
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
              <button className="cancel-btn" onClick={handleLogoutCancel}>
                Cancel
              </button>
              <button className="confirm-btn" onClick={handleLogoutConfirm}>
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="lessons-content">
        <h2 className="lessons-title">My Lessons</h2>
        <p className="lessons-subtitle">Start from the basics and progress to advanced trading strategies</p>

        <div className="lessons-grid">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="lesson-card">
              <div className="lesson-header">
                <div className="lesson-number">Lesson {lesson.id}</div>
                <div 
                  className="lesson-difficulty"
                  style={{ backgroundColor: getDifficultyColor(lesson.difficulty) }}
                >
                  {lesson.difficulty}
                </div>
              </div>
              
              <h3 className="lesson-title">{lesson.title}</h3>
              <p className="lesson-description">{lesson.description}</p>
              
              <div className="lesson-meta">
                <span className="lesson-duration">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  {lesson.duration}
                </span>
                <span className="lesson-status incomplete">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                  </svg>
                  Incomplete
                </span>
              </div>

              <button 
                className="start-lesson-btn"
                onClick={() => handleStartLesson(lesson.id)}
              >
                Start Lesson
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}