import React from "react";
import logo from "./images/logo.png";
import "./css/LandingPage.css";

export default function LandingPage({ onGetStarted, onLogin }) {
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <img src={logo} alt="K.G Logo" className="hero-logo" />
          <h1 className="hero-title">K.G - Learn Trade Grow</h1>
          <p className="hero-subtitle">
            Your gateway to mastering the stock market, learn, practice, and grow with confidence
          </p>
          <div className="hero-buttons">
            <button className="cta-button primary" onClick={onGetStarted}>
              Get Started Free
            </button>
            <button className="cta-button secondary" onClick={onLogin}>
              Login
            </button>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="about-section">
        <div className="section-content">
          <h2 className="section-title">Why K.G?</h2>
          <p className="section-text">
            The rise of trading platforms and cryptocurrency has made financial markets more accessible than ever. 
            However, many people dive into trading without the proper knowledge and end up losing money. 
          </p>
          <p className="section-text">
            <strong>K.G</strong> was created to solve this problem. We provide a complete learning platform where 
            beginners can gain the financial education they need before risking real money. Our mission is to make 
            trading education accessible to everyone, completely free.
          </p>
          <p className="section-text">
            Most trading courses cost hundreds or even thousands of euros. We believe that shouldn't be a barrier 
            to learning how to trade. With K.G, you get professional-quality education at no cost.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-content">
          <h2 className="section-title">What You'll Get</h2>
          <div className="features-grid">
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#8fb9a8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                  <line x1="10" y1="10" x2="14" y2="10"></line>
                  <line x1="10" y1="14" x2="14" y2="14"></line>
                </svg>
              </div>
              <h3 className="feature-title">Structured Lessons</h3>
              <p className="feature-description">
                Start with beginner-friendly topics and progress to advanced trading concepts. 
                Each lesson is carefully structured to build your knowledge step by step.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#8fb9a8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 11l3 3L22 4"></path>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
              </div>
              <h3 className="feature-title">Interactive Quizzes</h3>
              <p className="feature-description">
                Test your understanding after each lesson with quizzes. Pass the quiz to unlock 
                the next lesson and ensure you've mastered the material.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#8fb9a8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <h3 className="feature-title">Trading Simulator</h3>
              <p className="feature-description">
                Practice trading with €100,000 in virtual money. Buy and sell real stocks in a 
                risk-free environment using real-time market data.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#8fb9a8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <h3 className="feature-title">Personal Portfolio</h3>
              <p className="feature-description">
                Track your learning progress, quiz scores, virtual balance, and trading history 
                all in one place. See how you're improving over time.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="section-content">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-container">
            
            <div className="step">
              <div className="step-number">1</div>
              <h3 className="step-title">Create Free Account</h3>
              <p className="step-description">
                Sign up in seconds with your email or Google account. No credit card required.
              </p>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <h3 className="step-title">Learn the Basics</h3>
              <p className="step-description">
                Start with beginner lessons covering stocks, trading, and market fundamentals.
              </p>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <h3 className="step-title">Test Your Knowledge</h3>
              <p className="step-description">
                Complete quizzes to prove you understand each topic before moving forward.
              </p>
            </div>

            <div className="step">
              <div className="step-number">4</div>
              <h3 className="step-title">Practice Trading</h3>
              <p className="step-description">
                Use the simulator to practice with virtual money and real market conditions.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Start Your Trading Journey?</h2>
          <p className="cta-text">
            Join K.G today and get access to everything you need to learn trading, completely free.
          </p>
          <button className="cta-button primary large" onClick={onGetStarted}>
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>&copy; 2025 K.G - Learn Trade Grow. All rights reserved.</p>
      </footer>
    </div>
  );
}