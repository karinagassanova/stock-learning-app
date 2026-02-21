import React from "react";
import dividendsImg from "../assets/images/original-size.webp";
import trailingImg from "../assets/images/original-size-2.webp";
import supportresistanceImg from "../assets/images/original-size-3.webp";
// ─────────────────────────────────────────────────────────────────────────────
// lessonsData.jsx — Content sourced from IG Academy (ig.com/en/learn-to-trade)
// Courses mapped:
//  Lesson 1  → Introducing the Financial Markets 
//  Lesson 2  → How Does Trading Work? + Orders, Execution & Leverage 
//  Lesson 3  → Planning & Risk Management + Understanding Risk & Reward
//  Lesson 4  → The Basics of Technical Analysis — Charts & Patterns
//  Lesson 5  → Fundamental Analysis 
//  Lesson 6  → The Basics of Technical Analysis — Indicators
//  Lesson 7  → Trading Psychology 
//  Lesson 8  → Planning & Risk Management — Trading Styles & Advanced Strategies
// ─────────────────────────────────────────────────────────────────────────────

export const lessonsData = {
  // ═══════════════════════════════════════════════════════════════════════════
  // LESSON 1 — Introducing the Financial Markets
  // Source: ig.com/en/learn-to-trade/ig-academy/introducing-the-financial-markets
  // ═══════════════════════════════════════════════════════════════════════════
  1: {
    id: 1,
    title: "Introduction to the Stock Market",
    description: "Take a tour of the financial markets, discover how they operate, what drives them and how you can capitalise on their movements.",
    difficulty: "Beginner",
    duration: "20 min",
    content: (
      <>
    

        <h2>What is Financial Trading?</h2>
        <p>
          Financial trading involves buying and selling assets, such as shares, indices, currencies and 
          commodities, with the aim of making a profit. Traders seek to capitalise on price movements 
          in these markets, whether prices are rising or falling.
        </p>
        <p>
          The goal is simple: buy at a lower price and sell at a higher price (or, in some cases, 
          sell first and then buy back lower). The difference between the two prices represents 
          your profit or loss.
        </p>

        <div className="info-box">
          <h4>💡 Why Trade Financial Markets?</h4>
          <p>
            Financial markets offer the opportunity to profit from price movements across thousands 
            of global assets, 24 hours a day, five days a week. Unlike traditional investing, 
            trading also allows you to profit when markets fall, by "going short".
          </p>
        </div>

        <h2>What are Shares?</h2>
        <p>
          A share represents a unit of ownership in a company. When you buy shares, you become 
          a part-owner (or shareholder) of that business. As the company grows, your shares 
          may increase in value, and the company may pay you a regular income in the form of dividends.
        </p>

        <img
          src="https://a.c-dn.net/c/content/dam/publicsites/igcom/shared/academy/introducing-the-financial-markets/1__L4__005.png"
          alt="Dividends explained — IG Academy"
          className="lesson-image"
          onError={e => { e.target.src = "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80"; }}
        />

        <h3>Dividends</h3>
        <p>
          A key advantage to investing in shares is the potential for dividends. A dividend is 
          an amount of money paid to shareholders, representing a portion of the company's profits.
        </p>
        <p>
          When a company makes a profit, the management decide how much to put back into the 
          business and how much to pay to shareholders as a dividend. Dividends can compensate 
          for a share price that isn't moving much, giving shareholders an income instead. 
          Companies that are expanding rapidly usually don't offer dividends, choosing instead 
          to reinvest all their profits to sustain growth. The reward for shareholders in this 
          case is a higher expected share price in the long run.
        </p>

        <div className="video-container">
          <iframe
            src="https://www.youtube.com/embed/p7HKvqRI_Bo"
            title="How Does the Stock Market Work? – TED-Ed"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className="video-caption">▶ TED-Ed: "How does the stock market work?" — A beautifully animated primer covering the fundamentals every investor needs to know.</p>

        <h2>What are Stock Indices?</h2>
        <p>
          A stock index is a measurement of the performance of a group of shares. It acts as 
          a single figure that represents how a collection of stocks is performing overall, making it much easier to gauge the health of a particular market or economy.
        </p>
        <ul>
          <li><strong>S&amp;P 500:</strong> Tracks the 500 largest US companies by market capitalisation. The most widely watched benchmark for US equities.</li>
          <li><strong>Dow Jones Industrial Average (DJIA):</strong> Tracks 30 major US blue-chip companies, including Apple, Goldman Sachs and Boeing.</li>
          <li><strong>NASDAQ Composite:</strong> Heavily weighted toward technology companies. Includes giants like Apple, Microsoft, Amazon and Meta.</li>
          <li><strong>FTSE 100:</strong> The 100 largest companies listed on the London Stock Exchange.</li>
          <li><strong>DAX 40:</strong> Germany's benchmark index, tracking 40 of the largest companies on the Frankfurt Stock Exchange.</li>
        </ul>

        <h2>What is Forex?</h2>
        <p>
          Forex (or FX) is short for foreign exchange, the global market for buying and selling 
          currencies. It is the world's largest and most liquid financial market, with over 
          $7.5 trillion traded every day.
        </p>
        <p>
          In forex, currencies are always traded in pairs, for example, EUR/USD, GBP/USD or USD/JPY. 
          You buy one currency while simultaneously selling another. The price of a currency pair 
          reflects how much of the second currency (the quote currency) you need to buy one unit 
          of the first currency (the base currency).
        </p>

        <div className="info-box">
          <h4>🌍 What Moves Forex Markets?</h4>
          <p>
            Currency values are primarily driven by interest rate decisions, economic data releases 
            (such as GDP growth and employment figures), political events and central bank policy. 
            Stronger economies typically see their currencies appreciate against weaker ones.
          </p>
        </div>

        <h2>What are Commodities?</h2>
        <p>
          Commodities are raw materials or primary goods used to produce other products. 
          They are divided into two main categories:
        </p>
        <ul>
          <li>
            <strong>Hard commodities:</strong> Mined or extracted from the earth. Examples include 
            gold, silver, crude oil and natural gas. Gold is often considered a "safe haven" 
            asset — investors flock to it during periods of uncertainty.
          </li>
          <li>
            <strong>Soft commodities:</strong> Agricultural or livestock products. Examples include 
            wheat, corn, coffee, cocoa and cattle. Their prices are influenced by weather conditions, 
            seasonal patterns and global supply chains.
          </li>
        </ul>

        <div className="key-takeaways">
          <h4>📌 Key Takeaways — Lesson 1</h4>
          <ul>
            <li>Shares represent ownership in a company; their price rises and falls with the company's fortunes</li>
            <li>Dividends provide shareholders with a share of the company's profits as regular income</li>
            <li>Stock indices track groups of shares, giving a snapshot of overall market performance</li>
            <li>Forex is the world's largest market, where currencies are traded in pairs 24/5</li>
            <li>Commodities include physical goods like oil, gold and agricultural products</li>
          </ul>
        </div>
      </>
    ),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LESSON 2 — Trading Mechanics
  // Source: ig.com/en/learn-to-trade/ig-academy/how-trading-works
  //       + ig.com/en/learn-to-trade/ig-academy/orders-execution-and-leverage
  // ═══════════════════════════════════════════════════════════════════════════
  2: {
    id: 2,
    title: "Trading Mechanics: How It All Works",
    description: "Discover the mechanisms behind market prices, types of orders, leverage and how trades are executed.",
    difficulty: "Beginner",
    duration: "35 min",
    content: (
      <>

        <h2>Who's Involved in Trading?</h2>
        <p>
          Financial markets are made up of many different types of participants, all with different 
          goals and strategies. Understanding who's who helps you understand why prices move the way they do.
        </p>
        <ul>
          <li><strong>Retail traders:</strong> Individual traders like you, accessing markets through an online broker or platform.</li>
          <li><strong>Institutional investors:</strong> Large organisations such as banks, pension funds, insurance companies and hedge funds. They trade enormous volumes and can move markets.</li>
          <li><strong>Market makers:</strong> Financial institutions that continuously quote buy and sell prices, providing liquidity to markets and ensuring there's always someone to trade with.</li>
          <li><strong>Regulators:</strong> Bodies like the FCA (UK) and SEC (US) that oversee markets and protect traders from fraud and manipulation.</li>
        </ul>

        <h2>How Are Prices Set? Supply and Demand</h2>
        <p>
          In the same way a rare, sought-after car commands a high price, financial market prices are 
          determined by the balance of supply and demand. If more traders want to buy an asset than sell 
          it, the price rises. If more want to sell, the price falls.
        </p>

        <img
  src={dividendsImg}
  alt="Dividends explained"
  className="lesson-image"
/>

        <h2>Buying and Selling: Going Long and Short</h2>
        <p>
          One of the most important concepts in trading is the ability to profit from both rising 
          <strong> and</strong> falling markets.
        </p>
        <ul>
          <li>
            <strong>Going long (buying):</strong> You buy an asset expecting its price to rise. 
            If it does, you sell it later at the higher price and keep the difference as profit. 
            This is the traditional way most people think about investing.
          </li>
          <li>
            <strong>Going short (selling):</strong> You sell an asset you don't yet own, expecting 
            the price to fall. If it does, you buy it back at the lower price. The difference 
            between what you sold it for and what you bought it back for is your profit.
          </li>
        </ul>

        <div className="info-box">
          <h4>📖 What is the Spread?</h4>
          <p>
            The "spread" is the difference between the buy price (ask) and the sell price (bid) 
            of an asset. It represents the cost of opening a trade. Tighter spreads mean lower 
            trading costs. Major currency pairs like EUR/USD tend to have very tight spreads due 
            to high trading volume.
          </p>
        </div>

        <div className="video-container">
          <iframe
           src="https://www.youtube.com/embed/gJv8d514DWI"
            title="Stock Market Order Types Explained"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className="video-caption">▶ Order types explained — market orders, limit orders, stop orders and how they're used in real trading situations.</p>

        <h2>What is an Order?</h2>
        <p>
          An order is an instruction to your broker to buy or sell an asset. There are several 
          types, each suited to different situations:
        </p>
        <ul>
          <li>
            <strong>Market order:</strong> An instruction to buy or sell immediately at the current 
            best available price. Fast execution, but you don't control the exact price you get.
          </li>
          <li>
            <strong>Limit order:</strong> An instruction to buy or sell at a specific price or better. 
            Your trade will only execute if the market reaches your specified price, giving you 
            more control, but no guarantee of execution.
          </li>
          <li>
            <strong>Stop order (stop-loss):</strong> An instruction to close your trade when the 
            price reaches a specified level, protecting you from further losses. Essential for 
            managing risk.
          </li>
          <li>
            <strong>Trailing stop:</strong> A special type of stop-loss that moves automatically 
            as the market moves in your favour. It not only caps your losses, it also helps 
            protect any profits you make.
          </li>
        </ul>

        <img
  src={trailingImg}
  alt="Dividends explained"
  className="lesson-image"
/>
        <p className="image-caption">A trailing stop follows the market price upward, locking in profit as the trade moves in your favour.</p>

        <h2>What is Leverage?</h2>
        <p>
          Leverage allows you to control a large position with a relatively small deposit (called margin). 
          For example, with 10:1 leverage, a $1,000 deposit gives you exposure to $10,000 worth of an asset.
        </p>
        <p>
          Leverage magnifies both your profits and your losses. If the market moves 1% in your favour 
          with 10:1 leverage, you make a 10% return on your deposit. But if it moves 1% against you, 
          you lose 10% of your deposit.
        </p>

        <div className="warning-box">
          <h4>⚠️ Leverage Risk Warning</h4>
          <p>
            Leverage is a double-edged sword. It can significantly increase profits, but it can also 
            result in losses that exceed your initial deposit. <strong>71% of retail client accounts 
            lose money when trading CFDs.</strong> Always use stop-loss orders and never risk more 
            than you can afford to lose.
          </p>
        </div>

        <h2>Margin Calls</h2>
        <p>
          When you trade on margin (using leverage), your broker requires you to maintain a minimum 
          level of funds in your account. If your losses bring your balance below this level, you'll 
          receive a "margin call", a request to deposit more funds or close positions. If you don't 
          act, your broker may automatically close your positions to limit further losses.
        </p>

        <div className="key-takeaways">
          <h4>📌 Key Takeaways — Lesson 2</h4>
          <ul>
            <li>Prices are set by supply and demand, more buyers = higher price; more sellers = lower price</li>
            <li>Going long = buying (profit when price rises); going short = selling (profit when price falls)</li>
            <li>The spread is the cost of trading, the difference between the buy and sell price</li>
            <li>Order types include market, limit, stop-loss and trailing stop, each serving a different purpose</li>
            <li>Leverage amplifies both profits and losses, always manage risk carefully</li>
          </ul>
        </div>
      </>
    ),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LESSON 3 — Risk & Diversification
  // Source: ig.com/en/learn-to-trade/ig-academy/planning-and-risk-management
  //       + ig.com/en/learn-to-trade/ig-academy/money-management
  // ═══════════════════════════════════════════════════════════════════════════
  3: {
    id: 3,
    title: "Risk Management & Diversification",
    description: "Learn how to manage risk effectively, protect your capital and build a diversified portfolio.",
    difficulty: "Beginner",
    duration: "20 min",
    content: (
      <>

        <h2>What is Risk Management?</h2>
        <p>
          Risk management is the process of identifying, assessing and controlling the threats to 
          your trading capital. Every trade involves a degree of risk, the market might move 
          against you. Good risk management doesn't mean eliminating risk entirely; it means 
          understanding and controlling it so that no single trade can significantly damage your account.
        </p>
        <p>
          Ask any successful trader for their top tips, and one of them will always be to manage 
          your risk carefully. A trader who loses 50% of their account needs to make a 100% return 
          just to get back to where they started.
        </p>

        <div className="info-box">
          <h4>📐 The 1-2% Rule</h4>
          <p>
            Many professional traders limit each individual trade's risk to 1-2% of their total 
            trading capital. With a $10,000 account, that means risking no more than $100-$200 
            per trade. This ensures a string of losing trades won't wipe out your account.
          </p>
        </div>

        <img
          src="https://a.c-dn.net/c/content/dam/publicsites/igcom/shared/academy/Planning_and_risk_managment/4__L1__002.png"
          alt="SMART goal setting for trading — IG Academy"
          className="lesson-image"
          onError={e => { e.target.src = "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop&q=80"; }}
        />
        <p className="image-caption">SMART trading goals: Specific, Measurable, Attainable, Relevant and Time-bound, the framework for building an effective trading plan.</p>

        <h2>Ways to Manage Risk</h2>

        <h3>1. Stop-Loss Orders</h3>
        <p>
          A stop-loss order automatically closes your position if the price moves against you 
          by a specified amount. It's the most fundamental risk management tool available, 
          and every trade you open should have a stop-loss attached to it.
        </p>

        <h3>2. Position Sizing</h3>
        <p>
          Position sizing refers to how much of your capital you commit to a single trade. 
          Smaller position sizes mean smaller losses when you're wrong, and over time, 
          this discipline is what separates consistent traders from gamblers.
        </p>

        <h3>3. Risk-to-Reward Ratio</h3>
        <p>
          Before entering a trade, always calculate your potential profit versus your potential loss. 
          A risk-to-reward ratio of 1:2 means you risk $50 to potentially make $100. Even if you're 
          only right 40% of the time, a consistent 1:2 ratio means you'll be profitable overall.
        </p>

        <h3>4. Diversification</h3>
        <p>
          Don't put all your eggs in one basket. Spreading your capital across different assets, 
          sectors and geographies means a poor performance in one area won't devastate your 
          entire portfolio. A properly diversified portfolio reduces your overall risk without 
          necessarily reducing your expected returns.
        </p>

        <div className="video-container">
          <iframe
            src="https://www.youtube.com/embed/jg_MflByI3Y"
            title="Diversification and Portfolio Risk Management"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className="video-caption">▶ Understanding diversification and how spreading risk across different assets protects your portfolio from major losses.</p>

        <h2>Understanding Risk and Reward</h2>
        <p>
          Every trade involves a trade-off between risk and reward. Higher potential returns 
          generally come with higher risk. The key is to find an acceptable balance:
        </p>
        <ul>
          <li><strong>Risk tolerance:</strong> How much of a loss can you emotionally and financially handle?</li>
          <li><strong>Time horizon:</strong> Longer-term investors can typically absorb more short-term volatility.</li>
          <li><strong>Capital at risk:</strong> Never trade with money you cannot afford to lose.</li>
        </ul>

        <div className="info-box">
          <h4>📊 Five Simple Risk Management Rules (IG Academy)</h4>
          <ol>
            <li>Decide your position size carefully before every trade</li>
            <li>Always use a stop-loss to cap your downside</li>
            <li>Aim for a minimum 1:2 risk-to-reward ratio</li>
            <li>Diversify across multiple uncorrelated markets</li>
            <li>Review and learn from every trade — winning and losing</li>
          </ol>
        </div>

        <h2>What are the Types of Risk?</h2>
        <ul>
          <li><strong>Market risk:</strong> The risk that the price of an asset will move against your position due to broad market movements.</li>
          <li><strong>Liquidity risk:</strong> The risk that you cannot exit a position quickly enough at a fair price, particularly in thinly-traded markets.</li>
          <li><strong>Leverage risk:</strong> The risk that leverage magnifies your losses beyond your initial deposit.</li>
          <li><strong>Overnight risk:</strong> The risk that the market moves significantly while you're not actively watching, for instance, overnight or over a weekend.</li>
          <li><strong>Emotional risk:</strong> The risk that fear, greed or overconfidence causes you to make irrational trading decisions.</li>
        </ul>

        <div className="key-takeaways">
          <h4>📌 Key Takeaways — Lesson 3</h4>
          <ul>
            <li>Risk management is about controlling how much you can lose, not eliminating risk</li>
            <li>Stop-loss orders are essential; every open trade should have one</li>
            <li>Always calculate your risk-to-reward ratio before entering a trade</li>
            <li>Position sizing and diversification are the cornerstones of long-term success</li>
            <li>Set SMART goals and review every trade to continuously improve</li>
          </ul>
        </div>
      </>
    ),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LESSON 4 — Chart Reading
  // Source: ig.com/en/learn-to-trade/ig-academy/the-basics-of-technical-analysis
  //         (Types of charts, Support/Resistance, Chart Patterns, Candlesticks)
  // ═══════════════════════════════════════════════════════════════════════════
  4: {
    id: 4,
    title: "Reading Charts & Identifying Patterns",
    description: "Learn how to read financial charts, identify support and resistance, and recognise key chart patterns.",
    difficulty: "Intermediate",
    duration: "35 min",
    content: (
      <>

        <h2>Introduction to Technical Analysis</h2>
        <p>
          Technical analysis is the study of past price movements to forecast future market behaviour. 
          The core assumption is that all relevant information about an asset is already reflected 
          in its price, and that price patterns tend to repeat themselves over time, because human 
          psychology is consistent.
        </p>
        <p>
          Unlike fundamental analysis (which examines economic data and company financials), 
          technical analysis focuses exclusively on price charts and related data such as volume.
        </p>

        <h2>Types of Charts</h2>
        <p>There are three main chart types used by traders:</p>
        <ul>
          <li>
            <strong>Line chart:</strong> The simplest type, plots a single line connecting closing 
            prices over time. Good for spotting overall trends but lacks detail about intraday price movement.
          </li>
          <li>
            <strong>Bar chart (OHLC):</strong> Shows the Open, High, Low and Close price for each time 
            period. Provides much more detail than a line chart.
          </li>
          <li>
            <strong>Candlestick chart:</strong> Similar to a bar chart but displayed in a way that 
            makes price movement patterns much easier to spot visually. The most popular chart type 
            among active traders.
          </li>
        </ul>

        <div className="video-container">
          <iframe
            src="https://www.youtube.com/embed/L9mZoxSAmjM"
            title="How to Read Stock Charts for Beginners"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className="video-caption">▶ How to read stock charts — a beginner's guide covering line charts, bar charts and candlestick charts.</p>

        <h2>Support and Resistance</h2>
        <p>
          Support and resistance are key concepts in technical analysis. They represent price levels 
          where the market has historically struggled to move beyond.
        </p>

        <img
  src={supportresistanceImg}
  alt="Dividends explained"
  className="lesson-image"
/>
        <p className="image-caption">
          <strong>Resistance</strong> is the ceiling the price struggles to break through. 
          <strong> Support</strong> is the floor where the price tends to stop declining. 
          When a resistance level is broken, it often becomes a new support level, and vice versa.
        </p>

        <ul>
          <li>
            <strong>Support:</strong> A price level where buying pressure is strong enough to prevent 
            the price from falling further. Think of it as the market's "floor". When price reaches 
            support, it has a tendency to bounce back up.
          </li>
          <li>
            <strong>Resistance:</strong> A price level where selling pressure prevents the price from 
            rising further. Think of it as the market's "ceiling". When price reaches resistance, 
            it tends to reverse or stall.
          </li>
        </ul>

        <h2>Breakouts and Fakeouts</h2>
        <p>
          A breakout occurs when the price moves decisively through a support or resistance level. 
          This is a significant event, it often signals the start of a new trend, and many traders 
          look to enter positions in the direction of the breakout.
        </p>
        <p>
          However, not all breakouts are real. A "fakeout" (or false breakout) occurs when the price 
          briefly moves through a level but then reverses back. Waiting for confirmation 
          (such as a candle close beyond the level, or increased volume) can help filter out fakeouts.
        </p>

        <h2>Trends and Trend Channels</h2>
        <p>
          A trend is the general direction in which a market is moving. Trends can be upward 
          (uptrend), downward (downtrend) or sideways (ranging). Identifying the trend is the 
          first step of any technical analysis, the old trading adage says <em>"the trend is your friend"</em>.
        </p>
        <p>
          Trend channels are formed by drawing parallel lines along the highs and lows of a trending 
          market. Price tends to oscillate between these two boundaries, offering traders opportunities 
          to buy near the lower channel line and sell near the upper channel line.
        </p>

        <h2>Key Chart Patterns</h2>

        <h3>Head and Shoulders</h3>
        <p>
          One of the most reliable reversal patterns. It consists of three peaks: a higher middle 
          peak (the "head") flanked by two lower peaks (the "shoulders"). When price breaks below 
          the neckline (the support connecting the two troughs), it typically signals a trend reversal 
          from bullish to bearish.
        </p>

        <h3>Double Top &amp; Double Bottom</h3>
        <p>
          A double top forms after an uptrend, price reaches a high, pulls back, then tests the 
          same high again before reversing lower. It signals the market is running out of buying 
          momentum. A double bottom is the mirror image, forming at the end of a downtrend and 
          signalling a potential reversal higher.
        </p>

        <h3>Triangles</h3>
        <p>
          Triangles form as price makes progressively smaller swings, squeezing into a tighter 
          range before an eventual breakout. Ascending triangles (flat top, rising lows) tend to 
          break higher; descending triangles (flat bottom, falling highs) tend to break lower; 
          symmetrical triangles can break either way.
        </p>

        <h2>Candlestick Patterns</h2>
        <p>
          Candlestick patterns are short-term formations that can signal potential reversals or 
          continuations in price direction:
        </p>
        <ul>
          <li><strong>Doji:</strong> Open and close are almost equal, forming a cross shape. Signals indecision — a potential turning point.</li>
          <li><strong>Hammer:</strong> Small body at the top, long lower shadow. Forms at the bottom of a downtrend, signals potential reversal upward.</li>
          <li><strong>Shooting Star:</strong> Small body at the bottom, long upper shadow. Forms at the top of an uptrend, signals potential reversal downward.</li>
          <li><strong>Bullish Engulfing:</strong> A large green candle that completely engulfs the previous red candle — strong bullish reversal signal.</li>
          <li><strong>Bearish Engulfing:</strong> A large red candle that completely engulfs the previous green candle — strong bearish reversal signal.</li>
        </ul>

        <div className="key-takeaways">
          <h4>📌 Key Takeaways — Lesson 4</h4>
          <ul>
            <li>Technical analysis uses historical price data and chart patterns to forecast future price movement</li>
            <li>Candlestick charts are the most popular chart type among active traders</li>
            <li>Support = price floor; Resistance = price ceiling, and they can swap roles when broken</li>
            <li>Breakouts through support/resistance levels often signal new trends, but watch for fakeouts</li>
            <li>Chart patterns (Head &amp; Shoulders, double tops, triangles) are reliable trading signals when confirmed</li>
          </ul>
        </div>
      </>
    ),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LESSON 5 — Fundamental Analysis
  // Source: ig.com/en/learn-to-trade/ig-academy/fundamental-analysis
  // ═══════════════════════════════════════════════════════════════════════════
  5: {
    id: 5,
    title: "Fundamental Analysis",
    description: "Learn how to identify stocks with potential by analysing economic factors and scrutinising company financials.",
    difficulty: "Intermediate",
    duration: "50 min",
    content: (
      <>

        <h2>What is Fundamental Analysis?</h2>
        <p>
          Fundamental analysis is based on the notion that every asset has a real, fair value. 
          However, at certain times, for example, when traders have not yet taken account of new 
          factors affecting this value, the market may not necessarily reflect the asset's true worth. 
          This results in the price being higher or lower than it really should be.
        </p>
        <p>
          If you can identify when an asset is trading at a price that differs from its real value, 
          you may have an opportunity to profit. Fundamental analysts believe the price will tend to 
          naturally "correct" over time, gravitating towards its real, fair value.
        </p>
        <p>
          So in fundamental analysis your aim is to discover assets that are currently under-priced 
          or over-priced, then place trades to capitalise on their potential movements as the value corrects.
        </p>

        <div className="info-box">
          <h4>💡 Fundamental vs Technical Analysis</h4>
          <p>
            Technical analysis focuses on price charts and patterns, it looks at what the market 
            <em> is doing</em>. Fundamental analysis examines economic data and company financials, it looks at <em>why</em> the market should move. Many traders use both approaches together.
          </p>
        </div>

        <h2>Evaluating a Company</h2>
        <p>
          When analysing a company as an investment, there are several layers to examine. A fundamental 
          analyst drills down through these layers to uncover opportunities others may have missed.
        </p>

        <h3>1. The Economy</h3>
        <p>
          Start with the big picture. The overall economic environment has a significant impact on 
          how companies perform. Key indicators to watch include:
        </p>
        <ul>
          <li><strong>GDP growth:</strong> A growing economy generally means growing corporate profits.</li>
          <li><strong>Interest rates:</strong> Rising rates increase borrowing costs for companies and can reduce consumer spending, often a headwind for stocks.</li>
          <li><strong>Inflation:</strong> Moderate inflation is healthy, but high inflation erodes purchasing power and corporate margins.</li>
          <li><strong>Employment data:</strong> Low unemployment supports consumer spending and economic growth.</li>
        </ul>

        <h3>2. The Industry</h3>
        <p>
          Not all industries perform the same way at the same time. Some sectors (e.g., technology, 
          healthcare) have structural tailwinds supporting long-term growth. Others are cyclical 
          (e.g., mining, construction) and perform best during economic booms.
        </p>

        <h3>3. The Company</h3>
        <p>
          The most granular level of fundamental analysis examines the company itself:
        </p>

        <div className="video-container">
          <iframe
            src="https://www.youtube.com/embed/iiRncjZWjXk"
            title="Fundamental Analysis Explained"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className="video-caption">▶ Fundamental analysis explained — how to evaluate a company's financial health, management quality and growth prospects.</p>

        <h2>Evaluating Management Quality</h2>
        <p>
          A company's management team is one of its most important assets. Strong leadership with 
          a clear strategy and a track record of executing on promises is a hugely positive signal. 
          Look for:
        </p>
        <ul>
          <li>The CEO's track record and tenure</li>
          <li>Alignment of management incentives with shareholder interests (e.g., do they own significant shares?)</li>
          <li>The company's stated strategy and how well they've executed it historically</li>
          <li>Transparency in communications and earnings guidance</li>
        </ul>

        <h2>Reading Financial Statements</h2>

        <h3>The Income Statement</h3>
        <p>
          The income statement shows a company's revenues, costs and profits over a specific period. 
          Key metrics include:
        </p>
        <ul>
          <li><strong>Revenue (turnover):</strong> Total income generated from sales.</li>
          <li><strong>Gross profit:</strong> Revenue minus the cost of goods sold.</li>
          <li><strong>Operating profit (EBIT):</strong> Gross profit minus operating expenses.</li>
          <li><strong>Net profit:</strong> The "bottom line", what's left after all expenses, interest and tax.</li>
          <li><strong>Earnings per share (EPS):</strong> Net profit divided by the number of shares outstanding, a key measure of profitability per share.</li>
        </ul>

        <h3>The Balance Sheet</h3>
        <p>
          A balance sheet is a statement of the company's assets, liabilities and capital at the 
          end of a particular reporting period. It typically includes:
        </p>
        <ul>
          <li><strong>Assets:</strong> Cash, inventory, accounts receivable, fixed assets (land, equipment, machinery), intangible assets (intellectual property, brand value)</li>
          <li><strong>Liabilities:</strong> Short-term debt, accounts payable, long-term bonds and loans</li>
          <li><strong>Equity (shareholders' funds):</strong> What's left after subtracting liabilities from assets, the net worth of the company</li>
        </ul>

        <h3>Cash Flow Statements</h3>
        <p>
          The cash flow statement shows how much cash flows in and out of the business over a period. 
          As the saying goes, "cash is king." Many analysts feel that cash in the bank is an important 
          asset, particularly because it's something that can't be faked by clever accounting.
        </p>
        <p>
          The financing section of the cash flow statement shows details of the company's corporate 
          bonds and shares that have been issued or repurchased. Dividend payments to shareholders 
          are also listed here.
        </p>

        <h2>Key Valuation Ratios</h2>
        <ul>
          <li><strong>Price-to-Earnings (P/E) ratio:</strong> Share price divided by earnings per share. A high P/E suggests investors expect strong future growth; a low P/E may indicate the stock is cheap or the company is struggling.</li>
          <li><strong>Price-to-Book (P/B) ratio:</strong> Share price divided by book value per share. A ratio below 1 may suggest the stock is undervalued.</li>
          <li><strong>Dividend yield:</strong> Annual dividend per share divided by share price. Higher yields can be attractive but may also signal risk if the company is struggling to grow.</li>
          <li><strong>Return on Equity (ROE):</strong> Net profit as a percentage of shareholders' equity. Measures how efficiently management generates profits from shareholder capital.</li>
        </ul>

        <div className="key-takeaways">
          <h4>📌 Key Takeaways — Lesson 5</h4>
          <ul>
            <li>Fundamental analysis seeks to find assets trading above or below their true fair value</li>
            <li>Start from the top down: economy → industry → company</li>
            <li>Strong management, healthy cash flow and consistent earnings growth are key positives</li>
            <li>Financial statements (income statement, balance sheet, cash flow) are the core tools of fundamental analysis</li>
            <li>Valuation ratios (P/E, P/B, ROE) help you compare companies and assess whether a stock is cheap or expensive</li>
          </ul>
        </div>
      </>
    ),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LESSON 6 — Technical Analysis Indicators
  // Source: ig.com/en/learn-to-trade/ig-academy/the-basics-of-technical-analysis
  //         (Moving Averages, Using Moving Averages, Choosing Tools)
  // ═══════════════════════════════════════════════════════════════════════════
  6: {
    id: 6,
    title: "Technical Indicators & Trading Signals",
    description: "Discover how to use moving averages, oscillators and other technical indicators to identify trading opportunities.",
    difficulty: "Intermediate",
    duration: "30 min",
    content: (
      <>

        <h2>Technical Indicators: What Are They?</h2>
        <p>
          Technical indicators are mathematical calculations based on a security's historical price 
          and/or volume data. They're designed to help traders identify trends, momentum, volatility 
          and potential reversal points, providing objective signals that remove emotion from 
          trading decisions.
        </p>
        <p>
          Indicators are typically displayed directly on the price chart (overlay indicators) or 
          in a separate panel below the chart (oscillators). No single indicator is perfect, the 
          real power comes from using multiple indicators together to confirm signals.
        </p>

        <h2>Moving Averages</h2>
        <p>
          A moving average smooths out price data by calculating the average price over a set 
          number of periods. It filters out short-term "noise" so traders can see the underlying trend.
        </p>

        <div className="video-container">
          <iframe
            src="https://www.youtube.com/embed/P7qikc4439g"
            title="Technical Analysis Indicators Explained"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className="video-caption">▶ Technical indicators explained — moving averages, RSI, MACD and Bollinger Bands, with real chart examples.</p>

        <h3>Simple Moving Average (SMA)</h3>
        <p>
          The SMA calculates the average closing price over a specified number of periods. 
          Common settings include the 50-day SMA (medium-term trend) and 200-day SMA (long-term trend).
        </p>
        <ul>
          <li>When price is above the SMA, the market is in an uptrend</li>
          <li>When price is below the SMA, the market is in a downtrend</li>
          <li>The SMA itself can act as a dynamic support or resistance level</li>
        </ul>

        <h3>Exponential Moving Average (EMA)</h3>
        <p>
          The EMA gives more weight to recent price data, making it more responsive to current 
          market conditions than the SMA. It reacts more quickly to price changes, which can be 
          advantageous for shorter-term traders.
        </p>

        <h2>Using Moving Averages: The Crossover Signal</h2>
        <p>
          One of the most popular technical signals is the moving average crossover:
        </p>
        <ul>
          <li>
            <strong>Golden Cross:</strong> The 50-day MA crosses above the 200-day MA. This is a 
            bullish signal, suggesting the uptrend has momentum and may continue. Historically, 
            the Golden Cross has preceded some of the market's strongest rallies.
          </li>
          <li>
            <strong>Death Cross:</strong> The 50-day MA crosses below the 200-day MA. This is a 
            bearish signal, suggesting the downtrend may continue. Associated with the 2008 financial 
            crisis and 2020 COVID crash.
          </li>
        </ul>

        <div className="info-box">
          <h4>💡 Choosing Your Analysis Tools</h4>
          <p>
            Don't overload your chart with every indicator available. IG Academy recommends selecting 
            2-3 complementary indicators that serve different purposes, for example, one trend 
            indicator (moving average) + one momentum indicator (RSI) + one volume indicator. 
            More indicators don't mean better signals, they just create more noise.
          </p>
        </div>

        <h2>The Relative Strength Index (RSI)</h2>
        <p>
          The RSI is a momentum oscillator that measures the speed and magnitude of recent price 
          changes to evaluate overbought or oversold conditions. It ranges from 0 to 100.
        </p>
        <ul>
          <li><strong>RSI above 70:</strong> The asset may be overbought — a potential signal to sell or avoid buying.</li>
          <li><strong>RSI below 30:</strong> The asset may be oversold — a potential signal to buy or look for a reversal.</li>
          <li><strong>RSI divergence:</strong> When price makes a new high but RSI makes a lower high — this hidden weakness can precede a reversal.</li>
        </ul>

        <h2>Moving Average Convergence Divergence (MACD)</h2>
        <p>
          MACD is a trend-following momentum indicator that shows the relationship between two 
          exponential moving averages. It consists of:
        </p>
        <ul>
          <li><strong>MACD line:</strong> The difference between the 12-day and 26-day EMA</li>
          <li><strong>Signal line:</strong> A 9-day EMA of the MACD line</li>
          <li><strong>Histogram:</strong> The difference between the MACD line and the signal line, visually showing momentum</li>
        </ul>
        <p>
          A buy signal is generated when the MACD line crosses above the signal line. 
          A sell signal occurs when it crosses below. A growing histogram indicates strengthening momentum.
        </p>

        <h2>Bollinger Bands</h2>
        <p>
          Bollinger Bands consist of a simple moving average with two bands plotted at standard 
          deviations above and below it. They expand when volatility is high and contract when 
          it is low.
        </p>
        <ul>
          <li><strong>Band squeeze:</strong> When the bands narrow dramatically, it signals low volatility and often precedes a significant price move (though not the direction).</li>
          <li><strong>Price touching the upper band:</strong> May signal overbought conditions in a ranging market.</li>
          <li><strong>Price touching the lower band:</strong> May signal oversold conditions in a ranging market.</li>
          <li><strong>Band riding:</strong> In a strong trend, price can hug the upper (uptrend) or lower (downtrend) band for extended periods, this is normal and should not automatically be treated as a sell signal.</li>
        </ul>

        <div className="key-takeaways">
          <h4>📌 Key Takeaways — Lesson 6</h4>
          <ul>
            <li>Technical indicators are mathematical tools that help identify trends, momentum and potential reversals</li>
            <li>Moving averages smooth price data, the Golden Cross (bullish) and Death Cross (bearish) are key signals</li>
            <li>RSI measures overbought/oversold conditions on a 0-100 scale; watch for divergence with price</li>
            <li>MACD crossovers signal changes in momentum, confirm with other indicators</li>
            <li>Use 2-3 complementary indicators, avoid overloading your chart</li>
          </ul>
        </div>
      </>
    ),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LESSON 7 — Trading Psychology
  // Source: ig.com/en/learn-to-trade/ig-academy/trading-psychology
  // ═══════════════════════════════════════════════════════════════════════════
  7: {
    id: 7,
    title: "Trading Psychology",
    description: "Prepare yourself to handle the emotions you'll experience while trading. Learn to keep a cool head and avoid common mistakes.",
    difficulty: "Beginner",
    duration: "60 min",
    content: (
      <>

        <h2>Why Psychology Matters in Trading</h2>
        <p>
          Psychology can have a surprisingly powerful influence over your success as a trader. 
          Emotional responses can even undo all the good work you've put into studying the markets 
          and planning your strategy, so it's important to know how to stop this happening.
        </p>
        <p>
          In this lesson you'll learn how to recognise when your feelings are getting in your way, 
          damaging your judgement or driving you to trade in a way you shouldn't. We'll explain 
          some ways to handle those emotions and minimise their effect.
        </p>

        <img
          src="https://a.c-dn.net/c/content/dam/publicsites/igcom/shared/academy/Psychology/6__L7__002.jpg"
          alt="Trading psychology — misunderstanding trends (Dow Jones example) — IG Academy"
          className="lesson-image"
          onError={e => { e.target.src = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80"; }}
        />
        <p className="image-caption">
          Misunderstanding trends is a common psychological trap. If the Dow Jones has been steadily 
          rising long-term, then tumbles on a single bad report, inexperienced traders might assume 
          the uptrend is over. But in most cases, a single event doesn't reverse a major trend.
        </p>

        <h2>Emotions That Hold You Back</h2>

        <h3>Fear</h3>
        <p>
          Fear is the most common emotion in trading. It manifests as:
        </p>
        <ul>
          <li><strong>Fear of losing:</strong> Causes traders to exit winning trades too early, before they've reached their target.</li>
          <li><strong>Fear of missing out (FOMO):</strong> Causes traders to jump into trades impulsively, without proper analysis.</li>
          <li><strong>Fear of being wrong:</strong> Prevents traders from cutting losing positions, letting small losses turn into catastrophic ones.</li>
        </ul>

        <h3>Paralysis</h3>
        <p>
          Overthinking and second-guessing yourself to the point of inaction. Good trades have 
          a way of passing you by while you're still deliberating. Having a clear trading plan 
          removes the need to make decisions in the moment.
        </p>

        <h2>Emotions That Entice You to Trade</h2>

        <h3>Greed</h3>
        <p>
          Greed drives traders to take on too much risk, hold positions too long (hoping for 
          bigger profits) or overtrade. The antidote is having clear profit targets and sticking 
          to them, once you've hit your target, take it.
        </p>

        <h3>Overconfidence</h3>
        <p>
          After a string of wins, it's easy to believe you've "cracked the market." This 
          overconfidence leads to larger position sizes, less rigorous analysis and greater 
          vulnerability to large losses. Markets are humbling, always remember that past 
          performance doesn't guarantee future results.
        </p>

        <div className="video-container">
          <iframe
            src="https://www.youtube.com/embed/XQNu1goMFcI"
            title="Trading Psychology — Master Your Emotions"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className="video-caption">▶ Trading psychology — how emotions like fear and greed affect your decisions, and practical techniques to keep them under control.</p>

        <h2>Emotions That Cloud Your Judgment</h2>

        <h3>Confirmation Bias</h3>
        <p>
          Selectively looking for information that supports what you already believe, while 
          ignoring evidence to the contrary. If you're convinced a stock is going up, you'll 
          find reasons to buy it even when the charts suggest otherwise.
        </p>

        <h3>Anchoring Bias</h3>
        <p>
          Fixating on a specific price, often the price you paid for an asset or a recent 
          high/low. This can prevent you from making rational decisions based on current data. 
          The market doesn't care about your purchase price.
        </p>

        <h3>Loss Aversion</h3>
        <p>
          Psychologically, losses feel roughly twice as painful as gains feel pleasurable. 
          This causes traders to hold losing positions too long (hoping they'll come back) 
          and cut winners too early (protecting gains). The solution is predetermined exit 
          rules, set your stop and target before the trade, and stick to them.
        </p>

        <h2>Developing an Unbiased, Positive Approach</h2>
        <p>
          To trade successfully over the long term, you need to cultivate a professional mindset:
        </p>
        <ul>
          <li><strong>Follow your plan:</strong> Write down your trading rules and follow them consistently. Deviating from the plan is almost always driven by emotion, not logic.</li>
          <li><strong>Accept losses as part of the process:</strong> Even the best traders in the world lose on 40-50% of their trades. What matters is that your winners are bigger than your losers.</li>
          <li><strong>Keep a trading journal:</strong> Record every trade, why you entered, why you exited, what you could have done better. Reviewing your journal regularly is one of the fastest ways to improve.</li>
          <li><strong>Take breaks:</strong> If you're on a losing streak, step away. Trading while emotionally frustrated leads to revenge trading and bigger losses.</li>
        </ul>

        <h2>Common Trading Mistakes to Avoid</h2>

        <h3>Misunderstanding Trends</h3>
        <p>
          Imagine the Dow Jones has been steadily moving upwards over the long term, when a 
          worse-than-expected report causes it to tumble. Does that mean it's now in a downtrend? 
          Inexperienced traders might assume "yes", but in fact that's unlikely to be the case. 
          A single event rarely reverses a major trend. Always look at the bigger picture.
        </p>

        <h3>Revenge Trading</h3>
        <p>
          After a loss, some traders immediately open a new (often larger) position to try to 
          win back their money. This is emotional trading at its most dangerous. Every new trade 
          should be taken on its own merits, your recent profit or loss is irrelevant.
        </p>

        <h3>Overtrading</h3>
        <p>
          Trading too frequently, sometimes out of boredom or the desire to "always be in the 
          market", generates unnecessary costs (spreads and commissions) and increases your 
          exposure to risk. The best traders are selective. Sometimes the best trade is no trade.
        </p>

        <div className="key-takeaways">
          <h4>📌 Key Takeaways — Lesson 7</h4>
          <ul>
            <li>Emotions (fear, greed, overconfidence) are the #1 enemy of consistent profitable trading</li>
            <li>Loss aversion causes traders to hold losers too long and cut winners too early, use preset stops and targets</li>
            <li>Confirmation bias and anchoring cloud judgment, always evaluate trades on current data alone</li>
            <li>Keep a trading journal and review your trades regularly, it's the fastest path to improvement</li>
            <li>After a losing streak, step away. Never revenge trade, every new trade stands on its own merits</li>
          </ul>
        </div>
      </>
    ),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LESSON 8 — Advanced Strategies & Trading Styles
  // Source: ig.com/en/learn-to-trade/ig-academy/planning-and-risk-management
  //         (Trading Styles: Position, Swing, Day Trading, Scalping)
  // ═══════════════════════════════════════════════════════════════════════════
  8: {
    id: 8,
    title: "Advanced Strategies & Trading Styles",
    description: "Discover the four main trading styles and how to build a complete, systematic trading approach tailored to your goals.",
    difficulty: "Advanced",
    duration: "25 min",
    content: (
      <>

        <h2>Building a Trading Plan</h2>
        <p>
          Ask any successful trader for their top tips, and one of them will always be: stick to 
          a clear trading strategy. A trading plan is a written document that outlines your 
          approach to trading, your goals, your methods, your risk rules and your review process.
        </p>
        <p>
          Without a plan, every trade becomes an improvised decision made in the heat of the moment. 
          With a plan, you have a framework that guides your decisions and keeps your emotions in check.
        </p>

        <div className="info-box">
          <h4>📋 SMART Trading Goals</h4>
          <p>
            To be effective, trading goals need to be <strong>S</strong>pecific, 
            <strong> M</strong>easurable, <strong>A</strong>ttainable, <strong>R</strong>elevant 
            and <strong>T</strong>ime-bound. Not "I want to make money", but "I aim to achieve 
            a 15% return on my trading capital over the next 12 months, risking no more than 2% 
            per trade."
          </p>
        </div>

        <h2>Choosing Your Trading Style</h2>
        <p>
          There are four main trading styles. The right one for you depends on your personality, 
          available time, risk tolerance and financial goals. Most professional traders eventually 
          settle into the style that suits them best, and stick with it.
        </p>

        <div className="video-container">
          <iframe
            src="https://www.youtube.com/embed/B_jcKAvJ6ic"
            title="4 Types of Trading Styles Explained"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className="video-caption">▶ The four main trading styles — position trading, swing trading, day trading and scalping — compared and explained.</p>

        <h2>1. Position Trading</h2>
        <p>
          Position traders hold trades for weeks, months or even years. They focus on the big 
          picture, identifying long-term trends driven by fundamental factors, and are largely 
          unconcerned with short-term price fluctuations.
        </p>
        <ul>
          <li><strong>Time commitment:</strong> Low — perhaps a few hours per week analysing markets</li>
          <li><strong>Typical tools:</strong> Fundamental analysis, weekly/monthly charts, long-term moving averages</li>
          <li><strong>Main advantage:</strong> Less time-intensive; allows large trends to unfold without constant attention</li>
          <li><strong>Main challenge:</strong> Requires patience and the ability to stomach significant drawdowns; capital is tied up for long periods</li>
          <li><strong>Best suited to:</strong> Investors with long time horizons; those who can't monitor markets constantly</li>
        </ul>

        <h2>2. Swing Trading</h2>
        <p>
          Swing traders aim to capture medium-term price movements, typically holding positions 
          for several days to a few weeks. They seek to "swing" between support and resistance 
          levels or ride a trend in defined waves.
        </p>
        <ul>
          <li><strong>Time commitment:</strong> Moderate — checking charts once or twice a day</li>
          <li><strong>Typical tools:</strong> Daily and 4-hour charts; technical patterns (support/resistance, candlestick patterns); momentum indicators (MACD, RSI)</li>
          <li><strong>Main advantage:</strong> Balances the frequency of opportunities against the size of price moves captured</li>
          <li><strong>Main challenge:</strong> Overnight and weekend risk; requires understanding of both technical and fundamental factors</li>
          <li><strong>Best suited to:</strong> Those with a full-time job who can analyse charts in the evenings; traders who want a balance between active and passive trading</li>
        </ul>

        <h2>3. Day Trading</h2>
        <p>
          Day traders open and close all their positions within a single trading day, they never 
          hold positions overnight. This eliminates overnight risk but requires intense focus 
          and quick decision-making.
        </p>
        <ul>
          <li><strong>Time commitment:</strong> High — full-time commitment during market hours</li>
          <li><strong>Typical tools:</strong> 5-minute and 15-minute charts; Level 2 order flow; intraday technical indicators; economic calendar</li>
          <li><strong>Main advantage:</strong> No overnight risk; can profit in both trending and ranging markets</li>
          <li><strong>Main challenge:</strong> Extremely demanding psychologically; high transaction costs (commissions and spreads) due to frequent trading</li>
          <li><strong>Best suited to:</strong> Full-time traders with strong discipline, fast reflexes and a high tolerance for stress</li>
        </ul>

        <h2>4. Scalping</h2>
        <p>
          Scalpers aim to profit from tiny, short-term price movements, holding positions for 
          seconds to minutes. They execute many trades per session, each targeting small gains 
          that accumulate over time.
        </p>
        <ul>
          <li><strong>Time commitment:</strong> Very high, requires constant screen time during the session</li>
          <li><strong>Typical tools:</strong> Tick charts and 1-minute charts; Level 2 data; direct market access (DMA); very tight spreads essential</li>
          <li><strong>Main advantage:</strong> Very limited market exposure per trade; can be highly profitable with the right system</li>
          <li><strong>Main challenge:</strong> Exceptionally demanding; high transaction costs relative to small gains; requires lightning-fast execution</li>
          <li><strong>Best suited to:</strong> Experienced traders with exceptional discipline and the ability to execute rapidly without hesitation</li>
        </ul>

        <div className="info-box">
          <h4>📊 Comparing the Four Trading Styles</h4>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9em" }}>
            <thead>
              <tr style={{ background: "#1a3c5e", color: "white" }}>
                <th style={{ padding: "8px", border: "1px solid #ddd", textAlign: "left" }}>Style</th>
                <th style={{ padding: "8px", border: "1px solid #ddd", textAlign: "left" }}>Hold Time</th>
                <th style={{ padding: "8px", border: "1px solid #ddd", textAlign: "left" }}>Time Required</th>
                <th style={{ padding: "8px", border: "1px solid #ddd", textAlign: "left" }}>Stress Level</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>Position</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>Weeks–Years</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>Low</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>Low</td>
              </tr>
              <tr style={{ background: "#f5f9ff" }}>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>Swing</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>Days–Weeks</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>Moderate</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>Moderate</td>
              </tr>
              <tr>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>Day Trading</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>Minutes–Hours</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>High</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>High</td>
              </tr>
              <tr style={{ background: "#f5f9ff" }}>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>Scalping</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>Seconds–Minutes</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>Very High</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>Very High</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Common Trading Strategies</h2>

        <h3>Trend Following</h3>
        <p>
          The simplest and most well-proven strategy: identify the direction of the trend and 
          trade in that direction. Use moving average crossovers, trendlines or price action 
          to confirm the trend. "The trend is your friend, until it ends."
        </p>

        <h3>Breakout Trading</h3>
        <p>
          Wait for price to break through a key support or resistance level, then trade in the 
          direction of the breakout. Use increased volume as confirmation. Set a stop just inside 
          the broken level in case of a fakeout.
        </p>

        <h3>Mean Reversion</h3>
        <p>
          Based on the idea that prices tend to return to their historical average after extreme 
          moves. Use Bollinger Bands or RSI to identify when price has moved too far from the mean, 
          then trade the anticipated "snap back."
        </p>

        <h3>Strategy and Planning: Avoiding Common Mistakes</h3>
        <ul>
          <li>Not having a plan, and improvising under pressure</li>
          <li>Risking too much on a single trade</li>
          <li>Letting losses run and cutting profits short</li>
          <li>Overtrading, looking for trades that aren't there</li>
          <li>Ignoring the trend and trading against it without strong justification</li>
        </ul>

        <div className="info-box">
          <h4>🎓 Use a Demo Account First</h4>
          <p>
            Before risking real money, practice your strategy on a demo account with virtual funds. 
            IG Academy recommends using a demo account to test your approach, get comfortable 
            with the platform and build confidence, all without any financial risk.
          </p>
        </div>

        <div className="key-takeaways">
          <h4>📌 Key Takeaways — Lesson 8</h4>
          <ul>
            <li>A written trading plan is essential, it removes emotion and keeps you consistent</li>
            <li>Set SMART goals: Specific, Measurable, Attainable, Relevant, Time-bound</li>
            <li>The four trading styles (Position, Swing, Day, Scalping) suit different personalities and lifestyles</li>
            <li>Choose the style that matches your available time, risk tolerance and temperament, then master it</li>
            <li>Practice on a demo account before committing real capital to any strategy</li>
          </ul>
        </div>
      </>
    ),
  },
};
