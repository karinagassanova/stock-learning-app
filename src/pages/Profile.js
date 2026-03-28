import React, { useState, useEffect, useRef } from "react";
import { auth, db } from "../services/firebase";
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import "../css/Profile.css";
import "../css/NavMenu.css";

const AVATAR_COLORS = [
  "#1a3c5e", "#8fb9a8", "#2ecc71", "#e74c3c",
  "#9b59b6", "#f39c12", "#1abc9c", "#e67e22",
];

export default function Profile({ onNavigate }) {
  const [currentUser, setCurrentUser]   = useState(null);
  const [menuOpen, setMenuOpen]         = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [loading, setLoading]           = useState(true);
  const [saving, setSaving]             = useState(false);
  const [saveMsg, setSaveMsg]           = useState(null);

  const [displayName, setDisplayName]   = useState("");
  const [avatarColor, setAvatarColor]   = useState(AVATAR_COLORS[0]);
  const [avatarLetter, setAvatarLetter] = useState("U");
  const [photoData, setPhotoData]       = useState(null); // base64 — Firestore only
  const [memberSince, setMemberSince]   = useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setCurrentUser(u);
      if (u) loadProfile(u);
    });
  }, []);

  const loadProfile = async (user) => {
    setLoading(true);
    try {
      const snap = await getDoc(doc(db, "profiles", user.uid));
      if (snap.exists()) {
        const d = snap.data();
        setAvatarColor(d.avatarColor || AVATAR_COLORS[0]);
        setPhotoData(d.photoData || null);
      }
      setDisplayName(user.displayName || "");
      setAvatarLetter((user.displayName?.[0] || user.email?.[0] || "U").toUpperCase());
      if (user.metadata?.creationTime) {
        setMemberSince(new Date(user.metadata.creationTime)
          .toLocaleDateString("en-IE", { day: "numeric", month: "long", year: "numeric" }));
      }
    } catch (err) {
      console.error("Error loading profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setSaveMsg({ type: "error", text: "Image too large — max 2MB." });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPhotoData(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) return;
    setSaving(true);
    setSaveMsg(null);
    try {
      const newName = displayName.trim() || user.email.split("@")[0];

      // Only update displayName in Firebase Auth, NOT photoURL (base64 is too long)
      await updateProfile(user, { displayName: newName });

      // Store everything (including base64 photo) in Firestore only
      await setDoc(doc(db, "profiles", user.uid), {
        userId: user.uid,
        displayName: newName,
        avatarColor,
        photoData: photoData || null,
        updatedAt: serverTimestamp(),
      }, { merge: true });

      setAvatarLetter((newName[0] || "U").toUpperCase());
      setSaveMsg({ type: "success", text: "✓ Profile saved!" });
    } catch (err) {
      console.error(err);
      setSaveMsg({ type: "error", text: "Failed to save. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  const handleLogoutClick  = () => { setShowLogoutConfirm(true); setMenuOpen(false); };
  const handleLogoutCancel = () => setShowLogoutConfirm(false);
  const handleLogoutConfirm = async () => {
    try {
      await signOut(auth);
      if (onNavigate) onNavigate("landing");
    } catch (err) { console.error(err); }
  };
  const handleMenuClick = (page) => { setMenuOpen(false); if (onNavigate) onNavigate(page); };

  if (loading) {
    return (
      <div className="profile-wrap">
        <div className="profile-loading"><div className="spin" /><span>Loading...</span></div>
      </div>
    );
  }

  const avatarSrc = photoData;

  return (
    <div className="profile-wrap">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="profile-header">
        <div className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div className="header-logo"><h1>K.G</h1><p>Learn Trade Grow</p></div>
      </header>

      {/* ── Mobile Menu ────────────────────────────────────────────────── */}
      {menuOpen && (
        <div className="mobile-menu">
          {/* User info at top of menu */}
          <div className="menu-user-info">
            <div className="menu-avatar" style={{ background: avatarSrc ? "transparent" : avatarColor }}>
              {avatarSrc
                ? <img src={avatarSrc} alt="avatar" />
                : <span>{avatarLetter}</span>}
            </div>
            <div className="menu-user-text">
              <p className="menu-user-name">{currentUser?.displayName || "Trader"}</p>
              <p className="menu-user-email">{currentUser?.email}</p>
            </div>
          </div>
          <ul>
            <li onClick={() => handleMenuClick("starterGuide")}>Starter Guide</li>
            <li onClick={() => handleMenuClick("lessons")}>Lessons</li>
            <li onClick={() => handleMenuClick("trading")}>Trading Simulator</li>
            <li className="active">Profile</li>
            <li onClick={handleLogoutClick}>Logout</li>
          </ul>
        </div>
      )}

      {/* ── Logout Modal ───────────────────────────────────────────────── */}
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

      {/* ── Page Content ───────────────────────────────────────────────── */}
      <div className="profile-content">
        <h2 className="profile-page-title">My Profile</h2>

        <div className="profile-grid">

          {/* ── Avatar Card ──────────────────────────────────────────── */}
          <div className="profile-card">
            <h3>Profile Picture</h3>

            <div className="avatar-preview-wrap">
              <div
                className="avatar-preview"
                style={{ background: avatarSrc ? "transparent" : avatarColor }}
                onClick={() => fileInputRef.current?.click()}
              >
                {avatarSrc
                  ? <img src={avatarSrc} alt="profile" className="avatar-img" />
                  : <span className="avatar-initials">{avatarLetter}</span>}
                <div className="avatar-overlay"><span>📷</span><p>Change</p></div>
              </div>
              <input type="file" accept="image/*" ref={fileInputRef}
                style={{ display: "none" }} onChange={handlePhotoChange} />
            </div>

            <p className="avatar-hint">Click to upload (max 2MB)</p>

            {avatarSrc && (
              <button className="remove-photo-btn" onClick={() => setPhotoData(null)}>
                Remove Photo
              </button>
            )}

            <div className="avatar-color-section">
              <p className="color-label">Colour when no photo</p>
              <div className="color-swatches">
                {AVATAR_COLORS.map((c) => (
                  <button key={c}
                    className={`color-swatch ${avatarColor === c ? "selected" : ""}`}
                    style={{ background: c }}
                    onClick={() => setAvatarColor(c)} />
                ))}
              </div>
            </div>
          </div>

          {/* ── Account Details Card ─────────────────────────────────── */}
          <div className="profile-card">
            <h3>Account Details</h3>

            <div className="form-group">
              <label>Display Name</label>
              <input type="text" className="profile-input"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your name" maxLength={40} />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input type="email" className="profile-input readonly"
                value={currentUser?.email || ""} readOnly />
              <p className="field-hint">Email cannot be changed</p>
            </div>

            <div className="form-group">
              <label>Member Since</label>
              <input type="text" className="profile-input readonly"
                value={memberSince || "—"} readOnly />
            </div>

            {saveMsg && (
              <div className={`save-msg ${saveMsg.type}`}>{saveMsg.text}</div>
            )}

            <button className="save-btn" onClick={handleSave} disabled={saving}>
              {saving ? <><div className="spin-sm" /> Saving...</> : "Save Changes"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}