import React, { useState, useEffect, useCallback } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, setDoc, collection, getDocs, query, where, getDoc } from "firebase/firestore";
import { lessonsData } from "../data/lessonsData";
import LessonView from "./LessonView";
import Quiz from "./Quiz";
import "../css/Lessons.css";
import "../css/NavMenu.css";

const LESSON_LIST = [
  { id: 1, title: "Introduction to the Stock Market", description: "Understand what stocks are, how the market works, and why people invest", difficulty: "Beginner", duration: "20 min" },
  { id: 2, title: "How Stock Trading Works", description: "Learn about stock exchanges, buying and selling, and market orders", difficulty: "Beginner", duration: "35 min" },
  { id: 3, title: "Understanding Risk and Diversification", description: "Explore investment risk, portfolio diversification, and risk management strategies", difficulty: "Beginner", duration: "20 min" },
  { id: 4, title: "Reading Stock Charts and Prices", description: "Master candlestick charts, price movements, and volume indicators", difficulty: "Intermediate", duration: "35 min" },
  { id: 5, title: "Fundamental Analysis Basics", description: "Analyze company financials, P/E ratios, earnings reports, and balance sheets", difficulty: "Intermediate", duration: "50 min" },
  { id: 6, title: "Technical Analysis & Indicators", description: "Study moving averages, RSI, MACD, and other technical trading tools", difficulty: "Intermediate", duration: "30 min" },
  { id: 7, title: "Trading Psychology & Discipline", description: "Control emotions, avoid common mistakes, and develop a trading mindset", difficulty: "Advanced", duration: "60 min" },
  { id: 8, title: "Advanced Trading Strategies", description: "Learn swing trading, day trading, position trading, and strategy development", difficulty: "Advanced", duration: "25 min" },
];

export default function Lessons({ onNavigate }) {
  const [currentUser, setCurrentUser]         = useState(null);
  const [menuOpen, setMenuOpen]               = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [selectedLesson, setSelectedLesson]   = useState(null);
  const [reviewQuizId, setReviewQuizId]       = useState(null);
  const [progress, setProgress]               = useState({});
  const [loading, setLoading]                 = useState(true);

  // Profile photo for menu
  const [menuPhoto, setMenuPhoto]             = useState(null);
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

  const fetchProgress = useCallback(async (user) => {
    if (!user) return;
    setLoading(true);
    try {
      const progressMap = {};
      const q = query(collection(db, "lessonProgress"), where("userId", "==", user.uid));
      const snapshot = await getDocs(q);
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        progressMap[data.lessonId] = data;
      });

      if (!progressMap[1]) {
        const lesson1Doc = { userId: user.uid, lessonId: 1, status: "unlocked", quizScore: null, passedQuiz: false, startedAt: null, completedAt: null };
        await setDoc(doc(db, "lessonProgress", `${user.uid}_lesson1`), lesson1Doc);
        progressMap[1] = lesson1Doc;
      }
      if (progressMap[1].status === "locked") {
        await setDoc(doc(db, "lessonProgress", `${user.uid}_lesson1`), { status: "unlocked" }, { merge: true });
        progressMap[1] = { ...progressMap[1], status: "unlocked" };
      }
      LESSON_LIST.forEach(({ id }) => {
        if (!progressMap[id]) progressMap[id] = { lessonId: id, status: "locked" };
      });
      setProgress(progressMap);
    } catch (err) {
      console.error("Error fetching progress:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { if (currentUser) fetchProgress(currentUser); }, [currentUser, fetchProgress]);

  const handleStartLesson = async (lesson) => {
    if (!lesson) {
      setSelectedLesson(null);
      if (currentUser) await fetchProgress(currentUser);
      return;
    }
    const lessonProgress = progress[lesson.id];
    if (!lessonProgress || lessonProgress.status === "locked") return;
    if (lessonProgress.status === "unlocked" && currentUser) {
      try {
        await setDoc(doc(db, "lessonProgress", `${currentUser.uid}_lesson${lesson.id}`), { status: "in-progress", startedAt: new Date() }, { merge: true });
        setProgress((prev) => ({ ...prev, [lesson.id]: { ...prev[lesson.id], status: "in-progress" } }));
      } catch (err) { console.error("Error marking in-progress:", err); }
    }
    const fullLesson = lessonsData[lesson.id];
    if (fullLesson) setSelectedLesson(fullLesson);
  };

  const handleLogoutClick   = () => { setShowLogoutConfirm(true); setMenuOpen(false); };
  const handleLogoutCancel  = () => setShowLogoutConfirm(false);
  const handleLogoutConfirm = async () => {
    try {
      await signOut(auth);
      if (onNavigate) onNavigate("landing");
    } catch (err) { alert("Error logging out: " + err.message); }
  };
  const handleMenuClick = (page) => { setMenuOpen(false); if (onNavigate) onNavigate(page); };

  const getStatus     = (id) => progress[id]?.status || "locked";
  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":   return <span className="status-badge completed">✓ Completed</span>;
      case "in-progress": return <span className="status-badge in-progress">▶ In Progress</span>;
      case "unlocked":    return <span className="status-badge unlocked">● Unlocked</span>;
      default:            return <span className="status-badge locked">🔒 Locked</span>;
    }
  };
  const getDifficultyColor = (d) => ({ Beginner: "#4caf50", Intermediate: "#ff9800", Advanced: "#f44336" }[d] || "#999");
  const getBtnLabel = (status) => ({ unlocked: "Start Lesson →", "in-progress": "Continue Lesson →", completed: "Review Lesson" }[status] || "🔒 Locked");

  const completedCount   = Object.values(progress).filter((p) => p.status === "completed").length;
  const progressPercent  = Math.round((completedCount / LESSON_LIST.length) * 100);
  const avatarLetter     = (currentUser?.displayName?.[0] || currentUser?.email?.[0] || "U").toUpperCase();

  if (reviewQuizId) {
    return <Quiz lessonId={reviewQuizId} reviewMode={true} onBackToLesson={() => setReviewQuizId(null)} />;
  }
  if (selectedLesson) {
    return <LessonView lesson={selectedLesson} onBack={() => handleStartLesson(null)} onNavigate={onNavigate} />;
  }

  return (
    <div className="lessons-container">
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

      {menuOpen && (
        <div className="mobile-menu">
          <div className="menu-user-info">
            <div className="menu-avatar" style={{ background: menuPhoto ? "transparent" : menuAvatarColor }}>
              {menuPhoto
                ? <img src={menuPhoto} alt="avatar" />
                : <span>{avatarLetter}</span>}
            </div>
            <div className="menu-user-text">
              <p className="menu-user-name">{currentUser?.displayName || "Trader"}</p>
              <p className="menu-user-email">{currentUser?.email}</p>
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

      <main className="lessons-content">
        <h2 className="lessons-title">My Lessons</h2>
        <p className="lessons-subtitle">Pass each quiz with 70% or above to unlock the next lesson</p>

        {!loading && (
          <div className="overall-progress">
            <div className="overall-progress-header">
              <span>Overall Progress</span>
              <span>{completedCount} / {LESSON_LIST.length} lessons completed</span>
            </div>
            <div className="overall-progress-bar">
              <div className="overall-progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
            <span className="overall-progress-percent">{progressPercent}%</span>
          </div>
        )}

        {loading ? (
          <div className="loading-lessons">
            <div className="loading-spinner"></div>
            <p>Loading your progress...</p>
          </div>
        ) : (
          <div className="lessons-grid">
            {LESSON_LIST.map((lesson) => {
              const status   = getStatus(lesson.id);
              const isLocked = status === "locked";
              const quizScore = progress[lesson.id]?.quizScore;
              return (
                <div key={lesson.id} className={`lesson-card ${isLocked ? "locked" : ""} ${status === "completed" ? "completed" : ""}`}>
                  <div className="lesson-card-header">
                    <div className="lesson-number">Lesson {lesson.id}</div>
                    <div className="lesson-difficulty" style={{ backgroundColor: getDifficultyColor(lesson.difficulty) }}>{lesson.difficulty}</div>
                  </div>
                  <h3 className="lesson-title">{lesson.title}</h3>
                  <p className="lesson-description">{lesson.description}</p>
                  <div className="lesson-meta">
                    <span className="lesson-duration">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      {lesson.duration}
                    </span>
                    {getStatusBadge(status)}
                  </div>
                  {quizScore !== null && quizScore !== undefined && (
                    <div className="quiz-score-row">
                      <span>Quiz Score:</span>
                      <span className={`quiz-score-value ${quizScore >= 70 ? "pass" : "fail"}`}>
                        {quizScore}% {quizScore >= 70 ? "✓ Passed" : "✗ Failed"}
                      </span>
                    </div>
                  )}
                  <button
                    className={`start-lesson-btn ${isLocked ? "btn-locked" : ""} ${status === "completed" ? "btn-completed" : ""}`}
                    onClick={() => !isLocked && handleStartLesson(lesson)}
                    disabled={isLocked}
                  >
                    {getBtnLabel(status)}
                  </button>
                  {status === "completed" && (
                    <button className="review-quiz-btn" onClick={() => setReviewQuizId(lesson.id)}>Review Quiz</button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}