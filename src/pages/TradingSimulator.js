import React, { useState, useEffect, useCallback } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  doc, getDoc, setDoc, collection, getDocs,
  query, where, serverTimestamp,
} from "firebase/firestore";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer,
  ReferenceLine, CartesianGrid,
} from "recharts";
import { fetchSnapshot, fetchBars } from "../services/alpaca";
import "../css/TradingSimulator.css";
import "../css/NavMenu.css";

const STARTING_BALANCE = 10000;
const TOPUP_AMOUNTS = [1000, 2500, 5000, 10000];

const POPULAR = [
  { symbol: "AAPL", name: "Apple Inc." },
  { symbol: "TSLA", name: "Tesla Inc." },
  { symbol: "MSFT", name: "Microsoft Corp." },
  { symbol: "GOOGL", name: "Alphabet Inc." },
  { symbol: "AMZN", name: "Amazon.com Inc." },
  { symbol: "NVDA", name: "NVIDIA Corp." },
  { symbol: "META", name: "Meta Platforms" },
  { symbol: "NFLX", name: "Netflix Inc." },
  { symbol: "AMD",  name: "Advanced Micro Devices" },
  { symbol: "SPY",  name: "S&P 500 ETF" },
];

const fmt  = (n) => (n ?? 0).toFixed(2);
const fmtV = (n) => n >= 1e6 ? `${(n / 1e6).toFixed(2)}M` : n >= 1e3 ? `${(n / 1e3).toFixed(1)}K` : String(n);

const PriceTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <p className="tt-date">{label}</p>
      <p className="tt-price">${fmt(payload[0].value)}</p>
    </div>
  );
};

const VolumeTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <p className="tt-date">{label}</p>
      <p className="tt-price">{fmtV(payload[0].value)}</p>
    </div>
  );
};

export default function TradingSimulator({ onNavigate }) {
  const [currentUser, setCurrentUser]     = useState(null);
  const [balance, setBalance]             = useState(null);
  const [totalDeposited, setTotalDeposited] = useState(STARTING_BALANCE);
  const [holdings, setHoldings]           = useState([]);
  const [transactions, setTransactions]   = useState([]);
  const [loading, setLoading]             = useState(true);

  const [tickerInput, setTickerInput]     = useState("");
  const [stock, setStock]                 = useState(null);
  const [bars, setBars]                   = useState([]);
  const [loadingStock, setLoadingStock]   = useState(false);
  const [stockError, setStockError]       = useState("");

  const [shares, setShares]               = useState("");
  const [tradeMsg, setTradeMsg]           = useState(null);
  const [activeTab, setActiveTab]         = useState("trade");
  const [chartView, setChartView]         = useState("price");
  const [menuOpen, setMenuOpen]           = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [menuPhoto, setMenuPhoto]         = useState(null);
  const [menuAvatarColor, setMenuAvatarColor] = useState("#8fb9a8");

  // Top-up state
  const [topupAmount, setTopupAmount]     = useState(1000);
  const [topupMsg, setTopupMsg]           = useState(null);
  const [topupLoading, setTopupLoading]   = useState(false);
  const [showTopup, setShowTopup]         = useState(false);

  // ── Auth ──────────────────────────────────────────────────────────────
  useEffect(() => {
    return onAuthStateChanged(auth, async (u) => {
      setCurrentUser(u);
      if (u) {
        try {
          const snap = await getDoc(doc(db, "profiles", u.uid));
          if (snap.exists()) {
            setMenuPhoto(snap.data().photoData || null);
            setMenuAvatarColor(snap.data().avatarColor || "#8fb9a8");
          }
        } catch (e) { /* silent */ }
      }
    });
  }, []);

  // ── Load portfolio ─────────────────────────────────────────────────────
  const loadPortfolio = useCallback(async (user) => {
    if (!user) return;
    setLoading(true);
    try {
      const balSnap = await getDoc(doc(db, "portfolios", user.uid));
      if (balSnap.exists()) {
        const data = balSnap.data();
        setBalance(data.balance);
        setTotalDeposited(data.totalDeposited || STARTING_BALANCE);
      } else {
        await setDoc(doc(db, "portfolios", user.uid), {
          userId: user.uid,
          balance: STARTING_BALANCE,
          totalDeposited: STARTING_BALANCE,
          createdAt: serverTimestamp(),
        });
        setBalance(STARTING_BALANCE);
        setTotalDeposited(STARTING_BALANCE);
      }

      const hSnap = await getDocs(query(collection(db, "holdings"), where("userId", "==", user.uid)));
      setHoldings(hSnap.docs.map((d) => d.data()));

      const tSnap = await getDocs(query(collection(db, "transactions"), where("userId", "==", user.uid)));
      const txs = tSnap.docs.map((d) => d.data())
        .sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
      setTransactions(txs.slice(0, 30));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { if (currentUser) loadPortfolio(currentUser); }, [currentUser, loadPortfolio]);

  // ── Logout ─────────────────────────────────────────────────────────────
  const handleLogoutClick = () => { setShowLogoutConfirm(true); setMenuOpen(false); };
  const handleLogoutCancel = () => setShowLogoutConfirm(false);
  const handleLogoutConfirm = async () => {
    try {
      await signOut(auth);
      if (onNavigate) onNavigate("landing");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // ── Load stock ─────────────────────────────────────────────────────────
  const handleLoadStock = async (sym) => {
    const symbol = (sym || tickerInput).toUpperCase().trim();
    if (!symbol) return;
    setStock(null); setBars([]); setStockError(""); setShares(""); setTradeMsg(null);
    setLoadingStock(true);
    const [snapshot, candleBars] = await Promise.all([
      fetchSnapshot(symbol),
      fetchBars(symbol),
    ]);
    setLoadingStock(false);
    if (snapshot?.error) {
      setStockError(`Could not find "${symbol}". Check the ticker and try again.`);
      return;
    }
    setStock(snapshot);
    setBars(Array.isArray(candleBars) ? candleBars : []);
    setTickerInput(symbol);
  };

  // ── Top Up ─────────────────────────────────────────────────────────────
  const handleTopUp = async () => {
    const user = auth.currentUser;
    if (!user || topupLoading) return;
    setTopupLoading(true);
    setTopupMsg(null);
    try {
      const newBalance   = parseFloat((balance + topupAmount).toFixed(2));
      const newDeposited = parseFloat((totalDeposited + topupAmount).toFixed(2));

      await setDoc(doc(db, "portfolios", user.uid), {
        balance: newBalance,
        totalDeposited: newDeposited,
      }, { merge: true });

      await setDoc(doc(db, "transactions", `${user.uid}_topup_${Date.now()}`), {
        userId: user.uid,
        type: "topup",
        symbol: "—",
        name: "Virtual Balance Top Up",
        shares: 0,
        price: 0,
        total: topupAmount,
        createdAt: serverTimestamp(),
      });

      setBalance(newBalance);
      setTotalDeposited(newDeposited);
      setTopupMsg({ type: "success", text: `✓ €${topupAmount.toLocaleString()} added to your balance!` });
      setShowTopup(false);
      setTransactions((prev) => [{
        type: "topup", symbol: "—", name: "Virtual Balance Top Up",
        shares: 0, price: 0, total: topupAmount, createdAt: null,
      }, ...prev].slice(0, 30));
    } catch (err) {
      setTopupMsg({ type: "error", text: "Top up failed. Please try again." });
    } finally {
      setTopupLoading(false);
    }
  };

  // ── Trade ──────────────────────────────────────────────────────────────
  const handleTrade = async (type) => {
    const qty = parseFloat(shares);
    if (!qty || qty <= 0 || !stock) return;
    const user = auth.currentUser;
    if (!user) return;
    const total    = parseFloat((qty * stock.price).toFixed(2));
    const existing = holdings.find((h) => h.symbol === stock.symbol && h.shares > 0);

    if (type === "buy" && total > balance) {
      setTradeMsg({ type: "error", text: `Insufficient balance — need €${fmt(total)}, have €${fmt(balance)}` });
      return;
    }
    if (type === "sell" && (!existing || existing.shares < qty)) {
      setTradeMsg({ type: "error", text: `You only own ${existing?.shares ?? 0} shares of ${stock.symbol}` });
      return;
    }

    const holdingId  = `${user.uid}_${stock.symbol}`;
    const newBalance = type === "buy"
      ? parseFloat((balance - total).toFixed(2))
      : parseFloat((balance + total).toFixed(2));

    let newShares, newAvg;
    if (type === "buy") {
      newShares = parseFloat(((existing?.shares || 0) + qty).toFixed(4));
      newAvg    = existing
        ? parseFloat((((existing.avgBuyPrice * existing.shares) + (stock.price * qty)) / newShares).toFixed(4))
        : stock.price;
    } else {
      newShares = parseFloat((existing.shares - qty).toFixed(4));
      newAvg    = existing.avgBuyPrice;
    }

    try {
      await setDoc(doc(db, "portfolios", user.uid), { balance: newBalance }, { merge: true });
      await setDoc(doc(db, "holdings", holdingId), {
        userId: user.uid, symbol: stock.symbol, name: stock.symbol,
        shares: newShares, avgBuyPrice: newAvg,
      });
      await setDoc(doc(db, "transactions", `${user.uid}_${Date.now()}`), {
        userId: user.uid, type, symbol: stock.symbol, name: stock.symbol,
        shares: qty, price: stock.price, total, createdAt: serverTimestamp(),
      });
      setBalance(newBalance);
      setHoldings((prev) => {
        const filtered = prev.filter((h) => h.symbol !== stock.symbol);
        return newShares > 0
          ? [...filtered, { userId: user.uid, symbol: stock.symbol, name: stock.symbol, shares: newShares, avgBuyPrice: newAvg }]
          : filtered;
      });
      setShares("");
      setTradeMsg({ type: "success", text: `${type === "buy" ? "✓ Bought" : "✓ Sold"} ${qty} share${qty !== 1 ? "s" : ""} of ${stock.symbol} — €${fmt(total)}` });
    } catch {
      setTradeMsg({ type: "error", text: "Trade failed. Please try again." });
    }
  };

  // ── Derived ────────────────────────────────────────────────────────────
  const activeHoldings = holdings.filter((h) => h.shares > 0);
  const invested       = activeHoldings.reduce((s, h) => s + h.avgBuyPrice * h.shares, 0);
  const portfolioValue = (balance || 0) + invested;

  // P&L only reflects trading gains/losses — not top-up deposits
  const totalReturn    = portfolioValue - totalDeposited;
  const returnPct      = totalDeposited > 0 ? ((totalReturn / totalDeposited) * 100).toFixed(2) : "0.00";

  const sharesNum  = parseFloat(shares) || 0;
  const tradeCost  = stock ? sharesNum * stock.price : 0;
  const myHolding  = stock ? holdings.find((h) => h.symbol === stock.symbol && h.shares > 0) : null;

  const isUp       = bars.length > 1 && bars[bars.length - 1].close >= bars[0].close;
  const chartColor = isUp ? "#27ae60" : "#e74c3c";
  const chartMin   = bars.length ? Math.min(...bars.map((b) => b.close)) * 0.98 : 0;
  const chartMax   = bars.length ? Math.max(...bars.map((b) => b.close)) * 1.02 : 0;

  if (loading) {
    return (
      <div className="sim-wrap">
        <div className="sim-loading"><div className="spin" /><span>Loading portfolio...</span></div>
      </div>
    );
  }

  return (
    <div className="sim-wrap">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="sim-header">
        <div className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div className="header-logo">
          <h1>K.G</h1>
          <p>Learn Trade Grow</p>
        </div>
        <div className="header-balance">
          <span className="hb-label">Portfolio</span>
          <span className="hb-value">€{fmt(portfolioValue)}</span>
          <span className={`hb-return ${totalReturn >= 0 ? "pos" : "neg"}`}>
            {totalReturn >= 0 ? "▲" : "▼"} {Math.abs(returnPct)}%
          </span>
        </div>
      </header>

      {/* ── Mobile Menu ──────── */}
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
            <li onClick={() => { setMenuOpen(false); if (onNavigate) onNavigate("starterGuide"); }}>Starter Guide</li>
            <li onClick={() => { setMenuOpen(false); if (onNavigate) onNavigate("lessons"); }}>Lessons</li>
            <li className="active">Trading Simulator</li>
            <li onClick={() => { setMenuOpen(false); if (onNavigate) onNavigate("profile"); }}>Profile</li>
            <li onClick={handleLogoutClick}>Logout</li>
          </ul>
        </div>
      )}

      {/* ── Logout Confirmation Modal ─────────────── */}
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

      <div className="sim-body">
        {/* ── Sidebar ──────────────────────────────────────────────────── */}
        <aside className="sim-sidebar">
          <div className="sidebar-stats">
            <div className="stat-row"><span>Cash</span><strong>€{fmt(balance)}</strong></div>
            <div className="stat-row"><span>Invested</span><strong>€{fmt(invested)}</strong></div>
            <div className="stat-row"><span>Total Value</span><strong>€{fmt(portfolioValue)}</strong></div>
            <div className="stat-row">
              <span>Trading P&L</span>
              <strong className={totalReturn >= 0 ? "pos" : "neg"}>
                {totalReturn >= 0 ? "+" : ""}€{fmt(totalReturn)}
              </strong>
            </div>
          </div>

          <div className="sidebar-section-title">Holdings</div>
          {activeHoldings.length === 0 ? (
            <p className="sidebar-empty">No positions yet</p>
          ) : (
            activeHoldings.map((h) => (
              <div key={h.symbol} className="sidebar-holding" onClick={() => handleLoadStock(h.symbol)}>
                <div className="sh-left">
                  <span className="sh-sym">{h.symbol}</span>
                  <span className="sh-shares">{h.shares} shares</span>
                </div>
                <div className="sh-right">
                  <span className="sh-val">€{fmt(h.avgBuyPrice * h.shares)}</span>
                </div>
              </div>
            ))
          )}

          <div className="sidebar-section-title" style={{ marginTop: 20 }}>Watchlist</div>
          {POPULAR.map((p) => (
            <div key={p.symbol} className="sidebar-watch" onClick={() => handleLoadStock(p.symbol)}>
              <span className="sw-sym">{p.symbol}</span>
              <span className="sw-name">{p.name}</span>
            </div>
          ))}
        </aside>

        {/* ── Main Panel ───────────────────────────────────────────────── */}
        <main className="sim-main">
          <div className="main-tabs">
            {[["trade","Trade"],["portfolio","Portfolio"],["history","History"]].map(([k,l]) => (
              <button key={k} className={`main-tab ${activeTab === k ? "active" : ""}`} onClick={() => setActiveTab(k)}>{l}</button>
            ))}
          </div>

          {/* ── TRADE ──────────────────────────────────────────────────── */}
          {activeTab === "trade" && (
            <div className="trade-area">
              <div className="ticker-bar">
                <input
                  className="ticker-input"
                  type="text"
                  placeholder="Enter ticker symbol (e.g. AAPL, TSLA, MSFT)"
                  value={tickerInput}
                  onChange={(e) => setTickerInput(e.target.value.toUpperCase())}
                  onKeyDown={(e) => e.key === "Enter" && handleLoadStock()}
                />
                <button className="ticker-btn" onClick={() => handleLoadStock()} disabled={loadingStock}>
                  {loadingStock ? <div className="spin-sm" /> : "Search"}
                </button>
              </div>

              {stockError && <div className="stock-error">{stockError}</div>}

              {!stock && !loadingStock && (
                <div className="welcome-area">
                  <h2>Virtual Trading Simulator</h2>
                  <p>Start with €{STARTING_BALANCE.toLocaleString()} virtual cash. Search any US stock ticker above or pick from below.</p>
                  <div className="quick-picks">
                    {POPULAR.map((p) => (
                      <button key={p.symbol} className="quick-pick" onClick={() => handleLoadStock(p.symbol)}>
                        <span className="qp-sym">{p.symbol}</span>
                        <span className="qp-name">{p.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {stock && !loadingStock && (
                <>
                  {/* Stock Header */}
                  <div className="stock-header">
                    <div className="stock-hl">
                      <h2 className="stock-sym">{stock.symbol}</h2>
                      <div className="stock-price-row">
                        <span className="stock-price">${fmt(stock.price)}</span>
                        <span className={`stock-chg ${stock.change >= 0 ? "pos" : "neg"}`}>
                          {stock.change >= 0 ? "▲" : "▼"} ${Math.abs(stock.change)} ({stock.change >= 0 ? "+" : ""}{stock.changePct}%)
                        </span>
                      </div>
                    </div>
                    <div className="stock-meta-pills">
                      <div className="meta-pill"><span>Open</span><strong>${fmt(stock.open)}</strong></div>
                      <div className="meta-pill"><span>High</span><strong>${fmt(stock.high)}</strong></div>
                      <div className="meta-pill"><span>Low</span><strong>${fmt(stock.low)}</strong></div>
                      <div className="meta-pill"><span>Prev Close</span><strong>${fmt(stock.prevClose)}</strong></div>
                      <div className="meta-pill"><span>Volume</span><strong>{fmtV(stock.volume)}</strong></div>
                      <div className="meta-pill"><span>VWAP</span><strong>${fmt(stock.vwap)}</strong></div>
                      <div className="meta-pill"><span>Bid</span><strong>${fmt(stock.bid)}</strong></div>
                      <div className="meta-pill"><span>Ask</span><strong>${fmt(stock.ask)}</strong></div>
                    </div>
                  </div>

                  {/* Chart */}
                  {bars.length > 0 && (
                    <div className="chart-card">
                      <div className="chart-toolbar">
                        <h4>90-Day Price History</h4>
                        <div className="chart-toggle">
                          <button className={chartView === "price" ? "active" : ""} onClick={() => setChartView("price")}>Price</button>
                          <button className={chartView === "volume" ? "active" : ""} onClick={() => setChartView("volume")}>Volume</button>
                        </div>
                      </div>

                      {chartView === "price" && (
                        <>
                          <ResponsiveContainer width="100%" height={260}>
                            <AreaChart data={bars} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                              <defs>
                                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%"  stopColor={chartColor} stopOpacity={0.25} />
                                  <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="#e8eef4" vertical={false} />
                              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#aaa" }} interval={14} tickLine={false} axisLine={false} />
                              <YAxis domain={[chartMin, chartMax]} tick={{ fontSize: 10, fill: "#aaa" }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} width={60} />
                              <Tooltip content={<PriceTooltip />} />
                              <ReferenceLine y={bars[0]?.close} stroke="#ccc" strokeDasharray="4 4" />
                              <Area type="monotone" dataKey="close" stroke={chartColor} strokeWidth={2} fill="url(#grad)" dot={false} activeDot={{ r: 5, fill: chartColor, stroke: "#fff", strokeWidth: 2 }} />
                            </AreaChart>
                          </ResponsiveContainer>
                          <div className="chart-legend">
                            <span className="cl-item"><span className="cl-dash" />Starting price</span>
                            <span className="cl-item cl-trend" style={{ color: chartColor }}>
                              {isUp ? "▲" : "▼"} {Math.abs(((bars[bars.length-1].close - bars[0].close) / bars[0].close) * 100).toFixed(1)}% over 90 days
                            </span>
                          </div>
                        </>
                      )}

                      {chartView === "volume" && (
                        <ResponsiveContainer width="100%" height={260}>
                          <BarChart data={bars} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e8eef4" vertical={false} />
                            <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#aaa" }} interval={14} tickLine={false} axisLine={false} />
                            <YAxis tick={{ fontSize: 10, fill: "#aaa" }} tickLine={false} axisLine={false} tickFormatter={fmtV} width={52} />
                            <Tooltip content={<VolumeTooltip />} />
                            <Bar dataKey="volume" fill="#1a3c5e" radius={[2, 2, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                  )}

                  {/* My Position */}
                  {myHolding && (
                    <div className="position-card">
                      <h4>My Position</h4>
                      <div className="pos-row">
                        <div className="pos-stat"><span>Shares Owned</span><strong>{myHolding.shares}</strong></div>
                        <div className="pos-stat"><span>Avg Buy Price</span><strong>${fmt(myHolding.avgBuyPrice)}</strong></div>
                        <div className="pos-stat"><span>Total Cost</span><strong>€{fmt(myHolding.avgBuyPrice * myHolding.shares)}</strong></div>
                        <div className="pos-stat">
                          <span>Unrealised P&L</span>
                          <strong className={(stock.price - myHolding.avgBuyPrice) >= 0 ? "pos" : "neg"}>
                            {(stock.price - myHolding.avgBuyPrice) >= 0 ? "+" : ""}€{fmt((stock.price - myHolding.avgBuyPrice) * myHolding.shares)}
                          </strong>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Order Box */}
                  <div className="order-card">
                    <h4>Place Order</h4>
                    <div className="order-balance">Available: <strong>€{fmt(balance)}</strong></div>
                    <div className="order-row">
                      <div className="order-field">
                        <label>Shares</label>
                        <input
                          type="number" min="0.01" step="0.01"
                          placeholder="0"
                          value={shares}
                          onChange={(e) => setShares(e.target.value)}
                          className="order-input"
                        />
                      </div>
                      <div className="order-field">
                        <label>Est. Total</label>
                        <div className="order-total">{sharesNum > 0 ? `€${fmt(tradeCost)}` : "—"}</div>
                      </div>
                    </div>
                    {tradeCost > balance && sharesNum > 0 && (
                      <p className="order-warn">⚠ Insufficient balance —{" "}
                        <button className="inline-topup-link" onClick={() => { setActiveTab("portfolio"); setShowTopup(true); }}>
                          top up your balance
                        </button>
                      </p>
                    )}
                    <div className="order-btns">
                      <button className="order-btn buy" onClick={() => handleTrade("buy")} disabled={!sharesNum || tradeCost > balance}>
                        Buy {sharesNum > 0 ? `${sharesNum} shares` : ""}
                      </button>
                      <button className="order-btn sell" onClick={() => handleTrade("sell")} disabled={!sharesNum || !myHolding}>
                        Sell {sharesNum > 0 ? `${sharesNum} shares` : ""}
                      </button>
                    </div>
                    {tradeMsg && <div className={`trade-msg ${tradeMsg.type}`}>{tradeMsg.text}</div>}
                  </div>
                </>
              )}
            </div>
          )}

          {/* ── PORTFOLIO ──────────────────────────────────────────────── */}
          {activeTab === "portfolio" && (
            <div className="tab-content">
              <div className="port-summary">
                <div className="ps-card"><span>Cash</span><strong>€{fmt(balance)}</strong></div>
                <div className="ps-card"><span>Invested</span><strong>€{fmt(invested)}</strong></div>
                <div className="ps-card"><span>Total Value</span><strong>€{fmt(portfolioValue)}</strong></div>
                <div className="ps-card">
                  <span>Trading P&L</span>
                  <strong className={totalReturn >= 0 ? "pos" : "neg"}>
                    {totalReturn >= 0 ? "+" : ""}€{fmt(totalReturn)} ({returnPct}%)
                  </strong>
                </div>
              </div>

              {/* Top Up */}
              <div className="topup-section">
                <div className="topup-header" onClick={() => setShowTopup(!showTopup)}>
                  <div className="topup-header-left">
                    <span className="topup-icon">💳</span>
                    <div>
                      <h4>Top Up Virtual Balance</h4>
                      <p>Running low on cash? Add more virtual funds to keep trading.</p>
                    </div>
                  </div>
                  <span className="topup-chevron">{showTopup ? "▲" : "▼"}</span>
                </div>

                {showTopup && (
                  <div className="topup-body">
                    <p className="topup-current">Current balance: <strong>€{fmt(balance)}</strong></p>
                    <div className="topup-amounts">
                      {TOPUP_AMOUNTS.map((amt) => (
                        <button
                          key={amt}
                          className={`topup-amt-btn ${topupAmount === amt ? "active" : ""}`}
                          onClick={() => setTopupAmount(amt)}
                        >
                          +€{amt.toLocaleString()}
                        </button>
                      ))}
                    </div>
                    <div className="topup-preview">
                      After top up: <strong>€{(balance + topupAmount).toLocaleString("en-IE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                    </div>
                    <button className="topup-confirm-btn" onClick={handleTopUp} disabled={topupLoading}>
                      {topupLoading ? <><div className="spin-sm" /> Adding funds...</> : `Add €${topupAmount.toLocaleString()} to my balance`}
                    </button>
                    {topupMsg && <div className={`trade-msg ${topupMsg.type}`}>{topupMsg.text}</div>}
                  </div>
                )}
              </div>

              {activeHoldings.length === 0 ? (
                <div className="empty-msg">
                  <p>📊 No holdings yet.</p>
                  <p>Go to Trade to buy your first stock.</p>
                </div>
              ) : (
                <table className="port-table">
                  <thead>
                    <tr><th>Symbol</th><th>Shares</th><th>Avg Buy</th><th>Total Cost</th></tr>
                  </thead>
                  <tbody>
                    {activeHoldings.map((h) => (
                      <tr key={h.symbol} onClick={() => { setActiveTab("trade"); handleLoadStock(h.symbol); }} className="port-row">
                        <td className="td-sym">{h.symbol}</td>
                        <td>{h.shares}</td>
                        <td>${fmt(h.avgBuyPrice)}</td>
                        <td>€{fmt(h.avgBuyPrice * h.shares)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* ── HISTORY ────────────────────────────────────────────────── */}
          {activeTab === "history" && (
            <div className="tab-content">
              {transactions.length === 0 ? (
                <div className="empty-msg"><p>📋 No transactions yet.</p></div>
              ) : (
                <table className="port-table">
                  <thead>
                    <tr><th>Type</th><th>Symbol</th><th>Shares</th><th>Price</th><th>Total</th><th>Date</th></tr>
                  </thead>
                  <tbody>
                    {transactions.map((t, i) => (
                      <tr key={i}>
                        <td>
                          <span className={`tx-badge ${t.type}`}>
                            {t.type === "topup" ? "TOP UP" : t.type.toUpperCase()}
                          </span>
                        </td>
                        <td className="td-sym">{t.symbol}</td>
                        <td>{t.shares || "—"}</td>
                        <td>{t.price ? `$${fmt(t.price)}` : "—"}</td>
                        <td className={t.type === "buy" ? "neg" : "pos"}>
                          {t.type === "buy" ? "−" : "+"}€{fmt(t.total)}
                        </td>
                        <td className="td-date">{t.createdAt?.toDate?.()?.toLocaleDateString?.() || "Today"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}