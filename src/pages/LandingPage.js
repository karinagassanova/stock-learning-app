import React from "react";
import "../css/LandingPage.css";

export default function LandingPage({ onGetStarted, onLogin }) {
  return (
    <div className="landing-container">

      {/* ── NAV ── */}
      <nav className="landing-nav">
        <div className="nav-logo">
          <span className="nav-kg">K.G</span>
          <span className="nav-divider" />
          <span className="nav-ltg">Learn Trade Grow</span>
        </div>
        <div className="nav-actions">
          <button className="nav-login" onClick={onLogin}>Log In</button>
          <button className="nav-signup" onClick={onGetStarted}>Get Started</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <header className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">Free · No credit card required</div>
          <h1 className="hero-title">
            Learn to trade.<br />
            <span className="hero-title-accent">Without the risk.</span>
          </h1>
          <p className="hero-subtitle">
            Structured lessons, interactive quizzes and a live trading simulator,
            everything you need to go from complete beginner to confident trader.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={onGetStarted}>
              Get Started Free
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
            <button className="btn-ghost" onClick={onLogin}>
              Already have an account? Log in
            </button>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><strong>8</strong><span>Lessons</span></div>
            <div className="hero-stat-divider" />
            <div className="hero-stat"><strong>€10K</strong><span>Virtual Funds</span></div>
            <div className="hero-stat-divider" />
            <div className="hero-stat"><strong>Live</strong><span>Market Data</span></div>
          </div>
        </div>
      </header>

      {/* ── FEATURES ── */}
      <section className="features-section">
        <div className="section-inner">
          <p className="section-label">What you get</p>
          <h2 className="section-title">Everything in one place</h2>
          <div className="features-grid">

            <div className="feature-card">
              <div className="feature-icon-wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
              </div>
              <h3>Structured Lessons</h3>
              <p>Eight lessons that take you from stock market basics all the way through to advanced trading strategies, unlocked step by step.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                </svg>
              </div>
              <h3>Gated Quizzes</h3>
              <p>Every lesson ends with a quiz. Score 70% or above to unlock the next one, so you actually learn before moving on.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              </div>
              <h3>Live Trading Simulator</h3>
              <p>Buy and sell real stocks using €10,000 of virtual funds. Powered by live Alpaca Markets data. No real money, no real risk.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
              </div>
              <h3>Personal Portfolio</h3>
              <p>Track your holdings, virtual balance, overall return and full transaction history, all updated in real time.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="how-section">
        <div className="section-inner">
          <p className="section-label">Simple process</p>
          <h2 className="section-title">How it works</h2>
          <div className="steps-grid">

            <div className="step">
              <div className="step-num">01</div>
              <h3>Create a free account</h3>
              <p>Sign up in seconds with your email or Google account. No payment details needed.</p>
            </div>
            <div className="step-connector" />
            <div className="step">
              <div className="step-num">02</div>
              <h3>Work through the lessons</h3>
              <p>Go through each lesson and pass the quiz before the next one unlocks.</p>
            </div>
            <div className="step-connector" />
            <div className="step">
              <div className="step-num">03</div>
              <h3>Start trading</h3>
              <p>Apply what you have learned in the simulator using live market data and virtual funds.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── WHY ── */}
      <section className="why-section">
        <div className="section-inner why-inner">
          <div className="why-text">
            <p className="section-label">Why K.G</p>
            <h2 className="section-title left">Built for people who want to start, not just read about it</h2>
            <p className="why-body">Most trading platforms expect you to already know what you are doing. Most courses cost hundreds of euros and give you nothing to practice with. K.G was built to close that gap — a place where you can actually learn the fundamentals and then immediately put them into practice, for free.</p>
          </div>
          <div className="why-cards">
            <div class="why-card">
              <strong>Completely free</strong>
              <span>No subscription, no hidden fees. Everything is available from day one.</span>
            </div>
            <div class="why-card">
              <strong>Learn then do</strong>
              <span>The simulator only opens once you have worked through the lessons, so you are prepared before you trade.</span>
            </div>
            <div class="why-card">
              <strong>No financial risk</strong>
              <span>All trading is done with virtual funds. You can practise as much as you want without losing a cent.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="cta-inner">
          <h2>Ready to start learning?</h2>
          <p>Create your free account and begin your first lesson today.</p>
          <button className="btn-primary large" onClick={onGetStarted}>
            Get Started Free
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="landing-footer">
        <div className="footer-logo">
          <span className="nav-kg" style={{fontSize:"18px"}}>K.G</span>
          <span className="nav-ltg" style={{fontSize:"12px"}}>Learn Trade Grow</span>
        </div>
        <p>&copy; 2026 K.G — Learn Trade Grow. All rights reserved.</p>
      </footer>

    </div>
  );
}