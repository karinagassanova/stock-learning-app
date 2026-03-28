import React, { useState, useEffect } from "react";
import { db, auth } from "../services/firebase";
import { doc, setDoc, serverTimestamp, collection, query, where, getDocs } from "firebase/firestore";
import { quizData } from "../data/quizData";
import "../css/Quiz.css";

export default function Quiz({ lessonId, onQuizComplete, onBackToLesson, reviewMode = false }) {
  const id = Number(lessonId);
  const quiz = quizData[id];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  // Review mode state
  const [reviewAnswers, setReviewAnswers] = useState(null);
  const [reviewScore, setReviewScore] = useState(null);
  const [reviewLoading, setReviewLoading] = useState(reviewMode);

  // ── Fetch the user's last attempt from Firestore when in review mode ──────
  useEffect(() => {
    if (!reviewMode) return;

    const fetchLastAttempt = async () => {
      const user = auth.currentUser;
      if (!user) { setReviewLoading(false); return; }

      try {
        const q = query(
          collection(db, "quizResults"),
          where("userId", "==", user.uid),
          where("lessonId", "==", id)
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          // Sort client-side to get most recent attempt
          const sorted = snapshot.docs
            .map(d => d.data())
            .sort((a, b) => {
              const aTime = a.completedAt?.toMillis?.() || 0;
              const bTime = b.completedAt?.toMillis?.() || 0;
              return bTime - aTime;
            });
          const data = sorted[0];

          const normalised = {};
          Object.entries(data.answers || {}).forEach(([k, v]) => {
            normalised[String(k)] = v;
          });
          setReviewAnswers(normalised);
          setReviewScore({ percentage: data.percentage, correct: data.score, total: data.totalQuestions, passed: data.passed });
        } else {
          console.warn("No quiz results found for lesson", id);
        }
      } catch (err) {
        console.error("Error fetching quiz review:", err);
      } finally {
        setReviewLoading(false);
      }
    };

    fetchLastAttempt();
  }, [reviewMode, id]);

  if (!quiz) {
    return (
      <div className="quiz-container">
        <p>No quiz found for this lesson.</p>
        <button className="quiz-back-btn" onClick={onBackToLesson}>← Back</button>
      </div>
    );
  }

  // ── Review Mode ───────────────────────────────────────────────────────────
  if (reviewMode) {
    if (reviewLoading) {
      return (
        <div className="quiz-container">
          <div className="loading-lessons" style={{ paddingTop: "80px" }}>
            <div className="loading-spinner"></div>
            <p>Loading your quiz results...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="quiz-container">
        <div className="quiz-header">
          <button className="quiz-back-btn" onClick={onBackToLesson}>← Back to Lessons</button>
          <h2 className="quiz-title">{quiz.title} — Review</h2>
          <span className="quiz-counter">{quiz.totalQuestions} Qs</span>
        </div>

        {/* Score summary banner */}
        {reviewScore && (
          <div className={`review-score-banner ${reviewScore.passed ? "passed" : "failed"}`}>
            <span>Your Score: <strong>{reviewScore.percentage}%</strong></span>
            <span>{reviewScore.correct}/{reviewScore.total} correct</span>
            <span>{reviewScore.passed ? "✓ Passed" : "✗ Failed"}</span>
          </div>
        )}

        <div className="review-banner">
          📖 Review Mode — green = correct answer, red = your wrong answer
        </div>

        {quiz.questions.map((q, idx) => {
          const userAnswer = reviewAnswers ? reviewAnswers[String(idx)] : null;
          const isCorrect = userAnswer === q.correctAnswer;

          return (
            <div key={idx} className="quiz-card" style={{ marginBottom: "16px" }}>
              <div className="question-type-badge">
                {q.questionType === "True/False" ? "True / False" : "Multiple Choice"}
              </div>
              <h3 className="question-text">
                <span className="question-number">Q{idx + 1}.</span> {q.questionText}
              </h3>

              <div className="options-list">
                {q.options.map((option, oidx) => {
                  const isCorrectAnswer = option === q.correctAnswer;
                  const isUserWrongAnswer = option === userAnswer && !isCorrect;

                  let cls = "option-btn";
                  if (isCorrectAnswer) cls += " correct";
                  else if (isUserWrongAnswer) cls += " incorrect";

                  return (
                    <div key={oidx} className={cls} style={{ cursor: "default" }}>
                      <span className="option-label">{["A", "B", "C", "D"][oidx]}</span>
                      <span className="option-text">{option}</span>
                      {isCorrectAnswer && <span className="option-icon correct-icon">✓</span>}
                      {isUserWrongAnswer && <span className="option-icon incorrect-icon">✗ Your answer</span>}
                    </div>
                  );
                })}
              </div>

              <div className={`explanation-box ${isCorrect ? "correct" : "incorrect"}`}>
                {!isCorrect && userAnswer && (
                  <p style={{ marginBottom: "6px" }}>
                    <strong>You answered:</strong> {userAnswer}
                  </p>
                )}
                <strong>Explanation: </strong>{q.explanation}
              </div>
            </div>
          );
        })}

        <div style={{ textAlign: "center", marginTop: "24px", paddingBottom: "40px" }}>
          <button className="quiz-btn secondary" onClick={onBackToLesson}>
            ← Back to Lessons
          </button>
        </div>
      </div>
    );
  }

  // ── Normal Quiz Mode ──────────────────────────────────────────────────────
  const question = quiz.questions[currentQuestion];
  const totalQuestions = quiz.totalQuestions;
  const progressPercent = ((currentQuestion + 1) / totalQuestions) * 100;
  const isAnswered = selectedAnswers[currentQuestion] !== undefined;
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const allAnswered = Object.keys(selectedAnswers).length === totalQuestions;

  const handleSelect = (answer) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentQuestion]: answer }));
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSubmitted(false);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setSubmitted(false);
    }
  };

  const handleSubmitAnswer = () => {
    if (!isAnswered) return;
    setSubmitted(true);
  };

  const handleFinishQuiz = async () => {
    // Get the current user at save time
    const user = auth.currentUser;
    if (!user) {
      setSaveError("You must be logged in to save your progress.");
      return;
    }

    // Calculate score
    let correct = 0;
    quiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) correct++;
    });
    const percentage = Math.round((correct / totalQuestions) * 100);
    const passed = percentage >= quiz.passingScore;

    setSaving(true);
    setSaveError(null);

    try {
      // Save quiz result with the answers so review mode can fetch them
      const resultId = `${user.uid}_lesson${id}_${Date.now()}`;
      await setDoc(doc(db, "quizResults", resultId), {
        userId: user.uid,
        lessonId: id,
        score: correct,
        totalQuestions,
        percentage,
        passed,
        answers: selectedAnswers,  
        completedAt: serverTimestamp(),
      });

      // Mark lesson completed for THIS user
      await setDoc(
        doc(db, "lessonProgress", `${user.uid}_lesson${id}`),
        {
          userId: user.uid,
          lessonId: id,
          status: "completed",
          quizScore: percentage,
          passedQuiz: passed,
          completedAt: serverTimestamp(),
        },
        { merge: true }
      );

      // Unlock next lesson for THIS user if passed
      if (passed && id < 8) {
        await setDoc(
          doc(db, "lessonProgress", `${user.uid}_lesson${id + 1}`),
          {
            userId: user.uid,
            lessonId: id + 1,
            status: "unlocked",
            quizScore: null,
            passedQuiz: false,
            startedAt: null,
            completedAt: null,
          },
          { merge: true }
        );
      }

      // Safety: lesson 1 always stays unlocked
      await setDoc(
        doc(db, "lessonProgress", `${user.uid}_lesson1`),
        { userId: user.uid, lessonId: 1 },
        { merge: true }
      );

    } catch (err) {
      console.error("Error saving quiz result:", err);
      setSaveError("Could not save progress. Check your connection and try again.");
    }

    setSaving(false);
    setScore({ correct, percentage, passed });
    setShowResults(true);
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setCurrentQuestion(0);
    setSubmitted(false);
    setShowResults(false);
    setScore(null);
    setSaveError(null);
  };

  // ── Results Screen ────────────────────────────────────────────────────────
  if (showResults && score) {
    return (
      <div className="quiz-container">
        <div className="quiz-results">
          <div className={`results-icon ${score.passed ? "passed" : "failed"}`}>
            {score.passed ? "🏆" : "📚"}
          </div>

          <h2 className="results-title">
            {score.passed ? "Quiz Passed!" : "Not Quite There Yet"}
          </h2>

          <p className="results-subtitle">
            {score.passed
              ? id < 8 ? `Lesson ${id + 1} is now unlocked!` : "You've completed all 8 lessons! 🎉"
              : `You need ${quiz.passingScore}% to pass. Review the lesson and try again!`}
          </p>

          {saveError && <p className="save-error">⚠️ {saveError}</p>}

          <div className="results-score-circle">
            <span className="results-percentage">{score.percentage}%</span>
            <span className="results-fraction">{score.correct}/{totalQuestions} correct</span>
          </div>

          <div className="results-breakdown">
            {quiz.questions.map((q, idx) => {
              const userAnswer = selectedAnswers[idx];
              const isCorrect = userAnswer === q.correctAnswer;
              return (
                <div key={idx} className={`result-item ${isCorrect ? "correct" : "incorrect"}`}>
                  <span className="result-icon">{isCorrect ? "✓" : "✗"}</span>
                  <div className="result-content">
                    <p className="result-question">Q{idx + 1}: {q.questionText}</p>
                    <p className="result-answer">Your answer: <strong>{userAnswer || "Not answered"}</strong></p>
                    {!isCorrect && <p className="result-correct-answer">Correct: <strong>{q.correctAnswer}</strong></p>}
                    <p className="result-explanation">{q.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="results-actions">
            {score.passed ? (
              <button className="quiz-btn primary" onClick={() => onQuizComplete && onQuizComplete(score)}>
                {id < 8 ? "Back to Lessons →" : "🎉 All Done!"}
              </button>
            ) : (
              <button className="quiz-btn primary" onClick={handleRetry}>Retry Quiz</button>
            )}
            <button className="quiz-btn secondary" onClick={onBackToLesson}>← Back to Lesson</button>
          </div>
        </div>
      </div>
    );
  }

  // ── Question Screen ───────────────────────────────────────────────────────
  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <button className="quiz-back-btn" onClick={onBackToLesson}>← Back</button>
        <h2 className="quiz-title">{quiz.title}</h2>
        <span className="quiz-counter">{currentQuestion + 1} / {totalQuestions}</span>
      </div>

      <div className="quiz-progress-bar">
        <div className="quiz-progress-fill" style={{ width: `${progressPercent}%` }} />
      </div>

      <div className="quiz-card">
        <div className="question-type-badge">
          {question.questionType === "True/False" ? "True / False" : "Multiple Choice"}
        </div>
        <h3 className="question-text">
          <span className="question-number">Q{currentQuestion + 1}.</span> {question.questionText}
        </h3>

        <div className="options-list">
          {question.options.map((option, idx) => {
            const selected = selectedAnswers[currentQuestion] === option;
            const isCorrect = option === question.correctAnswer;
            let cls = "option-btn";
            if (submitted) {
              if (isCorrect) cls += " correct";
              else if (selected) cls += " incorrect";
            } else if (selected) {
              cls += " selected";
            }
            return (
              <button key={idx} className={cls} onClick={() => handleSelect(option)} disabled={submitted}>
                <span className="option-label">{["A", "B", "C", "D"][idx]}</span>
                <span className="option-text">{option}</span>
                {submitted && isCorrect && <span className="option-icon correct-icon">✓</span>}
                {submitted && selected && !isCorrect && <span className="option-icon incorrect-icon">✗</span>}
              </button>
            );
          })}
        </div>

        {submitted && (
          <div className={`explanation-box ${selectedAnswers[currentQuestion] === question.correctAnswer ? "correct" : "incorrect"}`}>
            <strong>{selectedAnswers[currentQuestion] === question.correctAnswer ? "✓ Correct! " : "✗ Incorrect. "}</strong>
            {question.explanation}
          </div>
        )}
      </div>

      <div className="quiz-navigation">
        <button className="quiz-btn secondary" onClick={handlePrev} disabled={currentQuestion === 0}>← Previous</button>

        <div className="quiz-dots">
          {quiz.questions.map((_, idx) => (
            <span
              key={idx}
              className={`quiz-dot ${idx === currentQuestion ? "active" : ""} ${selectedAnswers[idx] !== undefined ? "answered" : ""}`}
              onClick={() => { setCurrentQuestion(idx); setSubmitted(false); }}
            />
          ))}
        </div>

        {!submitted ? (
          <button className="quiz-btn primary" onClick={handleSubmitAnswer} disabled={!isAnswered}>Check Answer</button>
        ) : isLastQuestion ? (
          <button className="quiz-btn primary" onClick={handleFinishQuiz} disabled={!allAnswered || saving}>
            {saving ? "Saving..." : "Finish Quiz →"}
          </button>
        ) : (
          <button className="quiz-btn primary" onClick={handleNext}>Next →</button>
        )}
      </div>

      <p className="answers-tracker">{Object.keys(selectedAnswers).length} of {totalQuestions} questions answered</p>
    </div>
  );
}