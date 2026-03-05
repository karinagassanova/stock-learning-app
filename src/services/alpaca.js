const KEY    = process.env.REACT_APP_ALPACA_KEY;
const SECRET = process.env.REACT_APP_ALPACA_SECRET;
const DATA   = "https://data.alpaca.markets/v2";

const headers = {
  "APCA-API-KEY-ID":     KEY,
  "APCA-API-SECRET-KEY": SECRET,
};

const cache = new Map();
const getCache = (k, ttl = 5 * 60 * 1000) => {
  const e = cache.get(k);
  return e && Date.now() - e.t < ttl ? e.d : null;
};
const setCache = (k, d) => cache.set(k, { d, t: Date.now() });

export const fetchSnapshot = async (symbol) => {
  const s = symbol.toUpperCase();
  const cached = getCache(`snap_${s}`, 3 * 60 * 1000);
  if (cached) return cached;
  try {
    const res  = await fetch(`${DATA}/stocks/${s}/snapshot?feed=iex`, { headers });
    const json = await res.json();
    if (json.message || !json.latestTrade) return { error: "not_found" };
    const lt = json.latestTrade;
    const lq = json.latestQuote;
    const dp = json.dailyBar;
    const pp = json.prevDailyBar;
    const price     = lt?.p ?? dp?.c ?? 0;
    const prevClose = pp?.c ?? 0;
    const change    = parseFloat((price - prevClose).toFixed(2));
    const changePct = prevClose > 0 ? parseFloat(((change / prevClose) * 100).toFixed(2)) : 0;
    const data = {
      symbol: s, price, change, changePct,
      open: dp?.o ?? 0, high: dp?.h ?? 0, low: dp?.l ?? 0,
      volume: dp?.v ?? 0, vwap: dp?.vw ?? 0, prevClose,
      bid: lq?.bp ?? 0, ask: lq?.ap ?? 0,
    };
    setCache(`snap_${s}`, data);
    return data;
  } catch (err) {
    return { error: "network_error" };
  }
};

export const fetchBars = async (symbol) => {
  const s = symbol.toUpperCase();
  const cached = getCache(`bars_${s}`, 10 * 60 * 1000);
  if (cached) return cached;
  try {
    const start = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    const res   = await fetch(
      `${DATA}/stocks/${s}/bars?timeframe=1Day&start=${start}&limit=90&feed=iex&adjustment=raw`,
      { headers }
    );
    const json = await res.json();
    if (!json.bars || json.bars.length === 0) return [];
    const data = json.bars.map((b) => ({
      date:   new Date(b.t).toLocaleDateString("en-GB", { month: "short", day: "numeric" }),
      open:   parseFloat(b.o.toFixed(2)),
      high:   parseFloat(b.h.toFixed(2)),
      low:    parseFloat(b.l.toFixed(2)),
      close:  parseFloat(b.c.toFixed(2)),
      volume: b.v,
      vwap:   parseFloat((b.vw || b.c).toFixed(2)),
    }));
    setCache(`bars_${s}`, data);
    return data;
  } catch (err) {
    return [];
  }
};