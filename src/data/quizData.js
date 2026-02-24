// ─────────────────────────────────────────────────────────────────────────────
// quizData.js — Quiz questions for all 8 lessons
// Format: Mix of MCQ (4 options) and True/False
// Passing score: 70% (7/10 correct)
// ─────────────────────────────────────────────────────────────────────────────

export const quizData = {

    // ═══════════════════════════════════════════════════════════════════════════
    // QUIZ 1 — Introduction to the Stock Market
    // ═══════════════════════════════════════════════════════════════════════════
    1: {
      lessonId: 1,
      title: "Introduction to the Stock Market Quiz",
      passingScore: 70,
      totalQuestions: 10,
      questions: [
        {
          id: 1,
          questionText: "What does buying a share in a company represent?",
          questionType: "MCQ",
          options: [
            "A loan you give to the company",
            "A unit of ownership in the company",
            "A contract to buy products from the company",
            "A government bond"
          ],
          correctAnswer: "A unit of ownership in the company",
          explanation: "A share represents a unit of ownership. When you buy shares, you become a part-owner (shareholder) of that business."
        },
        {
          id: 2,
          questionText: "What is a dividend?",
          questionType: "MCQ",
          options: [
            "A type of stock index",
            "A trading fee charged by brokers",
            "A portion of a company's profits paid to shareholders",
            "The difference between the buy and sell price"
          ],
          correctAnswer: "A portion of a company's profits paid to shareholders",
          explanation: "A dividend is an amount of money paid to shareholders, representing a portion of the company's profits."
        },
        {
          id: 3,
          questionText: "Which index tracks the 500 largest US companies by market capitalisation?",
          questionType: "MCQ",
          options: [
            "FTSE 100",
            "DAX 40",
            "Dow Jones Industrial Average",
            "S&P 500"
          ],
          correctAnswer: "S&P 500",
          explanation: "The S&P 500 tracks the 500 largest US companies by market capitalisation and is the most widely watched benchmark for US equities."
        },
        {
          id: 4,
          questionText: "Forex stands for Foreign Exchange.",
          questionType: "True/False",
          options: ["True", "False"],
          correctAnswer: "True",
          explanation: "Forex (or FX) is short for foreign exchange — the global market for buying and selling currencies."
        },
        {
          id: 5,
          questionText: "In forex trading, currencies are always traded in pairs.",
          questionType: "True/False",
          options: ["True", "False"],
          correctAnswer: "True",
          explanation: "In forex, currencies are always traded in pairs — for example, EUR/USD or GBP/USD. You buy one currency while simultaneously selling another."
        },
        {
          id: 6,
          questionText: "Which of the following is an example of a 'hard commodity'?",
          questionType: "MCQ",
          options: [
            "Coffee",
            "Wheat",
            "Crude oil",
            "Cattle"
          ],
          correctAnswer: "Crude oil",
          explanation: "Hard commodities are mined or extracted from the earth. Examples include gold, silver, crude oil and natural gas."
        },
        {
          id: 7,
          questionText: "What is a stock index?",
          questionType: "MCQ",
          options: [
            "A single company's share price",
            "A measurement of the performance of a group of shares",
            "A government-issued financial instrument",
            "A type of currency pair"
          ],
          correctAnswer: "A measurement of the performance of a group of shares",
          explanation: "A stock index tracks the performance of a group of shares, giving a single figure that represents how a collection of stocks is performing overall."
        },
        {
          id: 8,
          questionText: "Companies that are expanding rapidly usually offer high dividends.",
          questionType: "True/False",
          options: ["True", "False"],
          correctAnswer: "False",
          explanation: "Companies that are expanding rapidly usually don't offer dividends — they reinvest all their profits to sustain growth."
        },
        {
          id: 9,
          questionText: "The FTSE 100 tracks the largest companies listed on which stock exchange?",
          questionType: "MCQ",
          options: [
            "New York Stock Exchange",
            "Frankfurt Stock Exchange",
            "London Stock Exchange",
            "Tokyo Stock Exchange"
          ],
          correctAnswer: "London Stock Exchange",
          explanation: "The FTSE 100 tracks the 100 largest companies listed on the London Stock Exchange."
        },
        {
          id: 10,
          questionText: "Gold is often considered a 'safe haven' asset because investors buy it during periods of uncertainty.",
          questionType: "True/False",
          options: ["True", "False"],
          correctAnswer: "True",
          explanation: "Gold is often considered a 'safe haven' asset — investors flock to it during periods of market uncertainty or economic instability."
        }
      ]
    },
  
    // ═══════════════════════════════════════════════════════════════════════════
    // QUIZ 2 — Trading Mechanics
    // ═══════════════════════════════════════════════════════════════════════════
    2: {
      lessonId: 2,
      title: "Trading Mechanics Quiz",
      passingScore: 70,
      totalQuestions: 10,
      questions: [
        {
          id: 1,
          questionText: "What does 'going long' mean in trading?",
          questionType: "MCQ",
          options: [
            "Selling an asset you don't own, expecting the price to fall",
            "Buying an asset expecting its price to rise",
            "Holding a position overnight",
            "Trading with leverage"
          ],
          correctAnswer: "Buying an asset expecting its price to rise",
          explanation: "Going long means buying an asset expecting its price to rise. You sell it later at a higher price and keep the difference as profit."
        },
        {
          id: 2,
          questionText: "What is the 'spread' in trading?",
          questionType: "MCQ",
          options: [
            "The total profit from a trade",
            "The difference between the buy price and the sell price",
            "The amount of leverage used",
            "The commission charged by a broker"
          ],
          correctAnswer: "The difference between the buy price and the sell price",
          explanation: "The spread is the difference between the buy price (ask) and the sell price (bid). It represents the cost of opening a trade."
        },
        {
          id: 3,
          questionText: "A market order guarantees the exact price at which your trade will be executed.",
          questionType: "True/False",
          options: ["True", "False"],
          correctAnswer: "False",
          explanation: "A market order executes immediately at the best available price, but you don't control the exact price you get."
        },
        {
          id: 4,
          questionText: "What type of order automatically closes your trade when the price reaches a specified level to protect you from further losses?",
          questionType: "MCQ",
          options: [
            "Market order",
            "Limit order",
            "Stop-loss order",
            "Trailing stop"
          ],
          correctAnswer: "Stop-loss order",
          explanation: "A stop-loss order is an instruction to close your trade when the price reaches a specified level, protecting you from further losses."
        },
        {
          id: 5,
          questionText: "With 10:1 leverage, a €1,000 deposit gives you exposure to €10,000 worth of an asset.",
          questionType: "True/False",
          options: ["True", "False"],
          correctAnswer: "True",
          explanation: "Leverage allows you to control a large position with a relatively small deposit. With 10:1 leverage, €1,000 gives you €10,000 worth of exposure."
        },
        {
          id: 6,
          questionText: "What is a trailing stop?",
          questionType: "MCQ",
          options: [
            "A stop-loss that stays fixed at a set price",
            "A stop-loss that moves automatically as the market moves in your favour",
            "An order to buy at a specific price",
            "A limit on how much leverage you can use"
          ],
          correctAnswer: "A stop-loss that moves automatically as the market moves in your favour",
          explanation: "A trailing stop moves automatically as the market moves in your favour, capping losses and also helping to protect profits."
        },
        {
          id: 7,
          questionText: "Leverage can magnify both profits AND losses.",
          questionType: "True/False",
          options: ["True", "False"],
          correctAnswer: "True",
          explanation: "Leverage is a double-edged sword. It magnifies both profits and losses. A 1% move against you with 10:1 leverage means a 10% loss on your deposit."
        },
        {
          id: 8,
          questionText: "Which type of market participant continuously quotes buy and sell prices to provide liquidity?",
          questionType: "MCQ",
          options: [
            "Retail trader",
            "Regulator",
            "Market maker",
            "Hedge fund"
          ],
          correctAnswer: "Market maker",
          explanation: "Market makers are financial institutions that continuously quote buy and sell prices, providing liquidity and ensuring there's always someone to trade with."
        },
        {
          id: 9,
          questionText: "A limit order will always be executed immediately.",
          questionType: "True/False",
          options: ["True", "False"],
          correctAnswer: "False",
          explanation: "A limit order only executes if the market reaches your specified price — giving you more control, but no guarantee of execution."
        },
        {
          id: 10,
          questionText: "What happens when your account balance drops below the required margin level?",
          questionType: "MCQ",
          options: [
            "Your trades automatically become profitable",
            "You receive a margin call requesting more funds or position closure",
            "Your leverage is automatically increased",
            "Nothing happens until you log in"
          ],
          correctAnswer: "You receive a margin call requesting more funds or position closure",
          explanation: "If losses bring your balance below the minimum margin level, you'll receive a margin call — a request to deposit more funds or close positions."
        }
      ]
    },
  
    // ═══════════════════════════════════════════════════════════════════════════
    // QUIZ 3 — Risk Management & Diversification
    // ═══════════════════════════════════════════════════════════════════════════
    3: {
      lessonId: 3,
      title: "Risk Management & Diversification Quiz",
      passingScore: 70,
      totalQuestions: 10,
      questions: [
        {
          id: 1,
          questionText: "According to the 1-2% rule, how much should you risk per trade on a €10,000 account?",
          questionType: "MCQ",
          options: [
            "€500 - €1,000",
            "€100 - €200",
            "€1,000 - €2,000",
            "€50 - €75"
          ],
          correctAnswer: "€100 - €200",
          explanation: "The 1-2% rule states that you should risk no more than 1-2% of your total trading capital per trade. On a €10,000 account, that's €100-€200."
        },
        {
          id: 2,
          questionText: "A risk-to-reward ratio of 1:2 means you risk €100 to potentially make €50.",
          questionType: "True/False",
          options: ["True", "False"],
          correctAnswer: "False",
          explanation: "A 1:2 risk-to-reward ratio means you risk €50 to potentially make €100 — your potential reward is twice your potential loss."
        },
        {
          id: 3,
          questionText: "What does diversification mean in investing?",
          questionType: "MCQ",
          options: [
            "Putting all your money into the best-performing stock",
            "Spreading capital across different assets, sectors and geographies",
            "Trading the same asset on multiple platforms",
            "Using maximum leverage on every trade"
          ],
          correctAnswer: "Spreading capital across different assets, sectors and geographies",
          explanation: "Diversification means spreading your capital across different assets, sectors and geographies so a poor performance in one area won't devastate your entire portfolio."
        },
        {
          id: 4,
          questionText: "Every trade you open should have a stop-loss order attached to it.",
          questionType: "True/False",
          options: ["True", "False"],
          correctAnswer: "True",
          explanation: "A stop-loss order automatically closes your position if the price moves against you. Every open trade should have one — it's the most fundamental risk management tool."
        },
        {
          id: 5,
          questionText: "Which of the following is NOT one of the main types of trading risk?",
          questionType: "MCQ",
          options: [
            "Market risk",
            "Liquidity risk",
            "Dividend risk",
            "Emotional risk"
          ],
          correctAnswer: "Dividend risk",
          explanation: "The main types of trading risk include market risk, liquidity risk, leverage risk, overnight risk, and emotional risk. 'Dividend risk' is not one of the standard categories."
        },
        {
          id: 6,
          questionText: "What does 'position sizing' refer to?",
          questionType: "MCQ",
          options: [
            "The number of different markets you trade",
            "How much of your capital you commit to a single trade",
            "The size of your trading screen",
            "How long you hold a position"
          ],
          correctAnswer: "How much of your capital you commit to a single trade",
          explanation: "Position sizing refers to how much of your capital you commit to a single trade. Smaller position sizes mean smaller losses when you're wrong."
        },
        {
          id: 7,
          questionText: "Good risk management means completely eliminating risk from your trades.",
          questionType: "True/False",
          options: ["True", "False"],
          correctAnswer: "False",
          explanation: "Good risk management doesn't mean eliminating risk entirely — it means understanding and controlling it so no single trade can significantly damage your account."
        },
        {
          id: 8,
          questionText: "What does 'liquidity risk' refer to?",
          questionType: "MCQ",
          options: [
            "The risk that leverage magnifies your losses",
            "The risk that you cannot exit a position quickly at a fair price",
            "The risk of losing money overnight",
            "The risk of making emotional decisions"
          ],
          correctAnswer: "The risk that you cannot exit a position quickly at a fair price",
          explanation: "Liquidity risk is the risk that you cannot exit a position quickly enough at a fair price, particularly in thinly-traded markets."
        },
        {
          id: 9,
          questionText: "A trader who loses 50% of their account needs a 100% return just to get back to their starting balance.",
          questionType: "True/False",
          options: ["True", "False"],
          correctAnswer: "True",
          explanation: "This is why managing risk is so important. A 50% loss requires a 100% gain to recover — losses are much harder to recover from than most traders realise."
        },
        {
          id: 10,
          questionText: "What does SMART stand for in the context of setting trading goals?",
          questionType: "MCQ",
          options: [
            "Safe, Managed, Accurate, Reliable, Tested",
            "Specific, Measurable, Attainable, Relevant, Time-bound",
            "Simple, Meaningful, Active, Risk-free, Timed",
            "Strategic, Motivated, Achievable, Realistic, Technical"
          ],
          correctAnswer: "Specific, Measurable, Attainable, Relevant, Time-bound",
          explanation: "SMART goals are Specific, Measurable, Attainable, Relevant and Time-bound — the framework for building an effective trading plan."
        }
      ]
    },
  
    // ═══════════════════════════════════════════════════════════════════════════
    // QUIZ 4 — Reading Charts & Identifying Patterns
    // ═══════════════════════════════════════════════════════════════════════════
    4: {
      lessonId: 4,
      title: "Reading Charts & Identifying Patterns Quiz",
      passingScore: 70,
      totalQuestions: 10,
      questions: [
        {
          id: 1,
          questionText: "Which chart type is most popular among active traders?",
          questionType: "MCQ",
          options: [
            "Line chart",
            "Bar chart (OHLC)",
            "Candlestick chart",
            "Pie chart"
          ],
          correctAnswer: "Candlestick chart",
          explanation: "Candlestick charts are the most popular chart type among active traders as they make price movement patterns much easier to spot visually."
        },
        {
          id: 2,
          questionText: "In technical analysis, 'support' is described as the market's ceiling where price struggles to rise.",
          questionType: "True/False",
          options: ["True", "False"],
          correctAnswer: "False",
          explanation: "Support is the market's 'floor' — where buying pressure prevents the price from falling further. Resistance is the 'ceiling' where selling pressure prevents further rises."
        },
        {
          id: 3,
          questionText: "What is a 'fakeout' in chart analysis?",
          questionType: "MCQ",
          options: [
            "A genuine breakout through a resistance level",
            "When price briefly moves through a level but then reverses back",
            "A candlestick pattern indicating a trend reversal",
            "A type of moving average crossover"
          ],
          correctAnswer: "When price briefly moves through a level but then reverses back",
          explanation: "A fakeout (false breakout) occurs when the price briefly moves through a support or resistance level but then reverses back. Waiting for confirmation helps filter these out."
        },
        {
          id: 4,
          questionText: "When a resistance level is broken, it often becomes a new support level.",
          questionType: "True/False",
          options: ["True", "False"],
          correctAnswer: "True",
          explanation: "When a resistance level is broken decisively, it often switches roles and becomes a new support level — and vice versa. This is called 'role reversal'."
        },
        {
          id: 5,
          questionText: "What does a 'Hammer' candlestick pattern signal?",
          questionType: "MCQ",
          options: [
            "A potential reversal upward at the bottom of a downtrend",
            "A potential reversal downward at the top of an uptrend",
            "Market indecision with no clear direction",
            "A strong continuation of the current trend"
          ],
          correctAnswer: "A potential reversal upward at the bottom of a downtrend",
          explanation: "A Hammer has a small body at the top and a long lower shadow. It forms at the bottom of a downtrend and signals a potential reversal upward."
        },
        {
          id: 6,
          questionText: "A Head and Shoulders pattern consists of how many peaks?",
          questionType: "MCQ",
          options: [
            "Two equal peaks",
            "Three peaks — a higher middle peak flanked by two lower peaks",
            "Four peaks in a row",
            "One large peak followed by a sharp drop"
          ],
          correctAnswer: "Three peaks — a higher middle peak flanked by two lower peaks",
          explanation: "The Head and Shoulders pattern has three peaks: a higher middle peak (the head) flanked by two lower peaks (the shoulders). It signals a bearish trend reversal."
        },
        {
          id: 7,
          questionText: "An ascending triangle pattern tends to break out to the downside.",
          questionType: "True/False",
          options: ["True", "False"],
          correctAnswer: "False",
          explanation: "Ascending triangles (flat top, rising lows) tend to break higher. Descending triangles (flat bottom, falling highs) tend to break lower."
        },
        {
          id: 8,
          questionText: "What does a 'Doji' candlestick signal?",
          questionType: "MCQ",
          options: [
            "A strong bullish move",
            "A strong bearish move",
            "Market indecision — a potential turning point",
            "A confirmed trend continuation"
          ],
          correctAnswer: "Market indecision — a potential turning point",
          explanation: "A Doji forms when the open and close prices are almost equal, creating a cross shape. It signals indecision in the market and a potential turning point."
        },
        {
          id: 9,
          questionText: "Technical analysis focuses on economic data and company financials to predict price movements.",
          questionType: "True/False",
          options: ["True", "False"],
          correctAnswer: "False",
          explanation: "Technical analysis focuses exclusively on price charts and related data such as volume. It's fundamental analysis that examines economic data and company financials."
        },
        {
          id: 10,
          questionText: "A Double Bottom pattern typically signals which of the following?",
          questionType: "MCQ",
          options: [
            "A continuation of a downtrend",
            "A potential reversal higher at the end of a downtrend",
            "A bearish reversal at the end of an uptrend",
            "A period of sideways price movement"
          ],
          correctAnswer: "A potential reversal higher at the end of a downtrend",
          explanation: "A Double Bottom forms at the end of a downtrend and signals a potential reversal higher. It is the mirror image of a Double Top."
        }
      ]
    },
  
    // ═══════════════════════════════════════════════════════════════════════════
    // QUIZ 5 — Fundamental Analysis
    // ═══════════════════════════════════════════════════════════════════════════
    5: {
      lessonId: 5,
      title: "Fundamental Analysis Quiz",
      passingScore: 70,
      totalQuestions: 10,
      questions: [
        {
          id: 1,
          questionText: "What is the core goal of fundamental analysis?",
          questionType: "MCQ",
          options: [
            "To read candlestick patterns on price charts",
            "To identify assets trading above or below their true fair value",
            "To calculate moving average crossovers",
            "To measure market volatility using Bollinger Bands"
          ],
          correctAnswer: "To identify assets trading above or below their true fair value",
          explanation: "Fundamental analysts aim to discover assets that are currently under-priced or over-priced, then trade to capitalise on movements as the price corrects toward fair value."
        },
        {
          id: 2,
          questionText: "Fundamental analysis looks at what the market IS doing, while technical analysis looks at WHY the market should move.",
          questionType: "True/False",
          options: ["True", "False"],
          correctAnswer: "False",
          explanation: "It's the other way around. Technical analysis looks at what the market is doing (price charts). Fundamental analysis looks at why the market should move (economic data, financials)."
        },
        {
          id: 3,
          questionText: "What does EPS stand for?",
          questionType: "MCQ",
          options: [
            "Equity Per Share",
            "Earnings Per Share",
            "Estimated Price of Stock",
            "Exchange Price Standard"
          ],
          correctAnswer: "Earnings Per Share",
          explanation: "EPS (Earnings Per Share) is net profit divided by the number of shares outstanding — a key measure of a company's profitability per share."
        },
        {
          id: 4,
          questionText: "A high Price-to-Earnings (P/E) ratio always means a stock is overvalued.",
          questionType: "True/False",
          options: ["True", "False"],
          correctAnswer: "False",
          explanation: "A high P/E suggests investors expect strong future growth — not necessarily that the stock is overvalued. Context and industry comparisons are important."
        },
        {
          id: 5,
          questionText: "In the top-down approach to fundamental analysis, what is the first layer to examine?",
          questionType: "MCQ",
          options: [
            "The company's management team",
            "The company's balance sheet",
            "The overall economy",
            "The industry the company operates in"
          ],
          correctAnswer: "The overall economy",
          explanation: "The top-down approach starts with the big picture — the overall economy — then narrows down to the industry, and finally the specific company."
        },
        {
          id: 6,
          questionText: "What does the balance sheet show?",
          questionType: "MCQ",
          options: [
            "A company's revenues and costs over a period",
            "How much cash flows in and out of the business",
            "A company's assets, liabilities and equity at a point in time",
            "The number of shares traded each day"
          ],
          correctAnswer: "A company's assets, liabilities and equity at a point in time",
          explanation: "A balance sheet is a statement of the company's assets, liabilities and capital at the end of a particular reporting period."
        },
        {
          id: 7,
          questionText: "Cash flow statements are considered important because cash is difficult to manipulate through accounting.",
          questionType: "True/False",
          options: ["True", "False"],
          correctAnswer: "True",
          explanation: "As the saying goes, 'cash is king.' Many analysts feel cash in the bank is important because it's something that can't be faked by clever accounting."
        },
        {
          id: 8,
          questionText: "A Price-to-Book (P/B) ratio below 1 may suggest a stock is:",
          questionType: "MCQ",
          options: [
            "Significantly overvalued",
            "Potentially undervalued",
            "Generating high dividends",
            "In a strong uptrend"
          ],
          correctAnswer: "Potentially undervalued",
          explanation: "A P/B ratio below 1 means the stock is trading below its book value, which may suggest it is undervalued — though further analysis is always needed."
        },
        {
          id: 9,
          questionText: "Rising interest rates are generally considered a positive factor for stock prices.",
          questionType: "True/False",
          options: ["True", "False"],
          correctAnswer: "False",
          explanation: "Rising interest rates increase borrowing costs for companies and can reduce consumer spending — they are often considered a headwind for stock prices."
        },
        {
          id: 10,
          questionText: "What does Return on Equity (ROE) measure?",
          questionType: "MCQ",
          options: [
            "The total revenue of a company",
            "How efficiently management generates profits from shareholder capital",
            "The market value of all shares outstanding",
            "The annual dividend paid per share"
          ],
          correctAnswer: "How efficiently management generates profits from shareholder capital",
          explanation: "ROE (Return on Equity) is net profit as a percentage of shareholders' equity. It measures how efficiently management generates profits from the capital shareholders have invested."
        }
      ]
    },
  
    // ═══════════════════════════════════════════════════════════════════════════
    // QUIZ 6 — Technical Indicators & Trading Signals
    // ═══════════════════════════════════════════════════════════════════════════
    6: {
      lessonId: 6,
      title: "Technical Indicators & Trading Signals Quiz",
      passingScore: 70,
      totalQuestions: 10,
      questions: [
        {
          id: 1,
          questionText: "What does a moving average do to price data?",
          questionType: "MCQ",
          options: [
            "It predicts the exact future price of an asset",
            "It smooths out price data to show the underlying trend",
            "It measures the volume of trades",
            "It calculates the spread between buy and sell prices"
          ],
          correctAnswer: "It smooths out price data to show the underlying trend",
          explanation: "A moving average smooths out price data by calculating the average price over a set number of periods, filtering out short-term 'noise' to reveal the underlying trend."
        },
        {
          id: 2,
          questionText: "The Exponential Moving Average (EMA) gives equal weight to all price data points.",
          questionType: "True/False",
          options: ["True", "False"],
          correctAnswer: "False",
          explanation: "The EMA gives MORE weight to recent price data, making it more responsive to current market conditions than the Simple Moving Average (SMA)."
        },
        {
          id: 3,
          questionText: "What is the 'Golden Cross'?",
          questionType: "MCQ",
          options: [
            "When the 50-day MA crosses below the 200-day MA — a bearish signal",
            "When the 50-day MA crosses above the 200-day MA — a bullish signal",
            "When RSI rises above 70 — an overbought signal",
            "When MACD crosses below the signal line — a sell signal"
          ],
          correctAnswer: "When the 50-day MA crosses above the 200-day MA — a bullish signal",
          explanation: "The Golden Cross occurs when the 50-day MA crosses above the 200-day MA. It is a bullish signal suggesting the uptrend has momentum and may continue."
        },
        {
          id: 4,
          questionText: "An RSI reading above 70 suggests an asset may be oversold.",
          questionType: "True/False",
          options: ["True", "False"],
          correctAnswer: "False",
          explanation: "An RSI above 70 suggests the asset may be OVERBOUGHT (a potential signal to sell). An RSI below 30 suggests the asset may be oversold."
        },
        {
          id: 5,
          questionText: "What does the MACD histogram visually represent?",
          questionType: "MCQ",
          options: [
            "The volume of shares traded",
            "The difference between the MACD line and the signal line, showing momentum",
            "The distance between Bollinger Bands",
            "The 200-day simple moving average"
          ],
          correctAnswer: "The difference between the MACD line and the signal line, showing momentum",
          explanation: "The MACD histogram shows the difference between the MACD line and the signal line. A growing histogram indicates strengthening momentum."
        },
        {
          id: 6,
          questionText: "Bollinger Bands expand when market volatility is high and contract when it is low.",
          questionType: "True/False",
          options: ["True", "False"],
          correctAnswer: "True",
          explanation: "Bollinger Bands expand during periods of high volatility and contract during periods of low volatility. A 'squeeze' often precedes a significant price move."
        },
        {
          id: 7,
          questionText: "What does a 'Death Cross' signal?",
          questionType: "MCQ",
          options: [
            "A strong bullish reversal pattern",
            "The 50-day MA crossing below the 200-day MA — a bearish signal",
            "RSI dropping below 30",
            "A Bollinger Band squeeze"
          ],
          correctAnswer: "The 50-day MA crossing below the 200-day MA — a bearish signal",
          explanation: "The Death Cross occurs when the 50-day MA crosses below the 200-day MA — a bearish signal associated with prolonged downtrends."
        },
        {
          id: 8,
          questionText: "According to IG Academy, how many indicators should you ideally use on your chart at one time?",
          questionType: "MCQ",
          options: [
            "As many as possible for the best signals",
            "Just one — keep it simple",
            "2-3 complementary indicators serving different purposes",
            "At least 5 to confirm every signal"
          ],
          correctAnswer: "2-3 complementary indicators serving different purposes",
          explanation: "IG Academy recommends selecting 2-3 complementary indicators — for example, one trend indicator + one momentum indicator. More indicators just create more noise."
        },
        {
          id: 9,
          questionText: "RSI divergence occurs when price makes a new high but RSI makes a lower high, potentially signalling weakness.",
          questionType: "True/False",
          options: ["True", "False"],
          correctAnswer: "True",
          explanation: "RSI divergence is when price makes a new high but RSI fails to confirm it with a higher high. This hidden weakness can precede a price reversal."
        },
        {
          id: 10,
          questionText: "When price is trading below a Simple Moving Average (SMA), it generally indicates:",
          questionType: "MCQ",
          options: [
            "The market is in an uptrend",
            "The market is in a downtrend",
            "Volatility is very low",
            "A Golden Cross is about to form"
          ],
          correctAnswer: "The market is in a downtrend",
          explanation: "When price is below the SMA, the market is generally considered to be in a downtrend. When price is above the SMA, it is in an uptrend."
        }
      ]
    },
  
    // ═══════════════════════════════════════════════════════════════════════════
    // QUIZ 7 — Trading Psychology
    // ═══════════════════════════════════════════════════════════════════════════
    7: {
      lessonId: 7,
      title: "Trading Psychology Quiz",
      passingScore: 70,
      totalQuestions: 10,
      questions: [
        {
          id: 1,
          questionText: "What is 'FOMO' in the context of trading?",
          questionType: "MCQ",
          options: [
            "Fear Of Market Oscillation",
            "Fear Of Missing Out — causing impulsive trades without proper analysis",
            "A type of chart pattern",
            "A risk management strategy"
          ],
          correctAnswer: "Fear Of Missing Out — causing impulsive trades without proper analysis",
          explanation: "FOMO (Fear of Missing Out) causes traders to jump into trades impulsively, without proper analysis, because they are afraid of missing a potential profit."
        },
        {
          id: 2,
          questionText: "Loss aversion means traders feel losses more painfully than they feel equivalent gains pleasurably.",
          questionType: "True/False",
          options: ["True", "False"],
          correctAnswer: "True",
          explanation: "Psychologically, losses feel roughly twice as painful as gains feel pleasurable. This causes traders to hold losing positions too long and cut winners too early."
        },
        {
          id: 3,
          questionText: "What is 'confirmation bias' in trading?",
          questionType: "MCQ",
          options: [
            "Using multiple indicators to confirm a trade signal",
            "Selectively looking for information that supports what you already believe",
            "A broker confirming that your trade has been executed",
            "Verifying a breakout with increased volume"
          ],
          correctAnswer: "Selectively looking for information that supports what you already believe",
          explanation: "Confirmation bias means selectively seeking information that confirms your existing beliefs while ignoring contradictory evidence — a common and dangerous trading mistake."
        },
        {
          id: 4,
          questionText: "After a losing streak, the best approach is to immediately open larger positions to recover your losses quickly.",
          questionType: "True/False",
          options: ["True", "False"],
          correctAnswer: "False",
          explanation: "After a losing streak, you should step away and take a break. Revenge trading — opening larger positions to recover losses — is emotional trading at its most dangerous."
        },
        {
          id: 5,
          questionText: "What is 'anchoring bias' in trading?",
          questionType: "MCQ",
          options: [
            "Using a fixed stop-loss level on every trade",
            "Fixating on a specific price, preventing rational decisions based on current data",
            "Holding positions for too long",
            "Trading only during specific market hours"
          ],
          correctAnswer: "Fixating on a specific price, preventing rational decisions based on current data",
          explanation: "Anchoring bias means fixating on a specific price (like the price you paid for an asset). The market doesn't care about your purchase price — decisions should be based on current data."
        },
        {
          id: 6,
          questionText: "Even the best professional traders in the world lose on 40-50% of their trades.",
          questionType: "True/False",
          options: ["True", "False"],
          correctAnswer: "True",
          explanation: "Even the best traders lose on 40-50% of their trades. What matters is that their winners are bigger than their losers — this is why risk-to-reward ratio is so important."
        },
        {
          id: 7,
          questionText: "What is 'overtrading'?",
          questionType: "MCQ",
          options: [
            "Using too much leverage on a single trade",
            "Trading too frequently, often out of boredom or the desire to always be in the market",
            "Holding a position for too long",
            "Opening too many different accounts with different brokers"
          ],
          correctAnswer: "Trading too frequently, often out of boredom or the desire to always be in the market",
          explanation: "Overtrading means trading too frequently, generating unnecessary costs and increased risk exposure. The best traders are selective — sometimes the best trade is no trade."
        },
        {
          id: 8,
          questionText: "Keeping a trading journal helps you improve because it forces you to review and learn from every trade.",
          questionType: "True/False",
          options: ["True", "False"],
          correctAnswer: "True",
          explanation: "A trading journal records every trade — why you entered, why you exited, what you could have done better. Reviewing it regularly is one of the fastest ways to improve as a trader."
        },
        {
          id: 9,
          questionText: "What causes 'paralysis' in trading psychology?",
          questionType: "MCQ",
          options: [
            "Having too much money in your account",
            "Overthinking and second-guessing to the point of inaction",
            "Overconfidence after a string of wins",
            "Trading during high-volatility market events"
          ],
          correctAnswer: "Overthinking and second-guessing to the point of inaction",
          explanation: "Paralysis means overthinking and second-guessing yourself to the point where you fail to act. Good trades pass you by while you're still deliberating."
        },
        {
          id: 10,
          questionText: "Greed in trading can cause a trader to hold positions too long in the hope of bigger profits.",
          questionType: "True/False",
          options: ["True", "False"],
          correctAnswer: "True",
          explanation: "Greed drives traders to hold positions longer than planned, hoping for even bigger profits — often resulting in giving back gains. The antidote is having clear profit targets and sticking to them."
        }
      ]
    },
  
    // ═══════════════════════════════════════════════════════════════════════════
    // QUIZ 8 — Advanced Strategies & Trading Styles
    // ═══════════════════════════════════════════════════════════════════════════
    8: {
      lessonId: 8,
      title: "Advanced Strategies & Trading Styles Quiz",
      passingScore: 70,
      totalQuestions: 10,
      questions: [
        {
          id: 1,
          questionText: "Which trading style involves holding positions for weeks, months or even years?",
          questionType: "MCQ",
          options: [
            "Scalping",
            "Day trading",
            "Swing trading",
            "Position trading"
          ],
          correctAnswer: "Position trading",
          explanation: "Position traders hold trades for weeks, months or even years. They focus on the big picture and long-term trends, largely ignoring short-term price fluctuations."
        },
        {
          id: 2,
          questionText: "Day traders hold their positions overnight to avoid paying overnight fees.",
          questionType: "True/False",
          options: ["True", "False"],
          correctAnswer: "False",
          explanation: "Day traders open and close ALL their positions within a single trading day — they never hold positions overnight. This eliminates overnight risk."
        },
        {
          id: 3,
          questionText: "Which trading style requires the most time commitment and is considered the most demanding?",
          questionType: "MCQ",
          options: [
            "Position trading",
            "Swing trading",
            "Day trading",
            "Scalping"
          ],
          correctAnswer: "Scalping",
          explanation: "Scalping requires the most time and is the most demanding — scalpers need constant screen time, execute many trades per session, and need lightning-fast execution."
        },
        {
          id: 4,
          questionText: "A trading plan is a written document that outlines your goals, methods, risk rules and review process.",
          questionType: "True/False",
          options: ["True", "False"],
          correctAnswer: "True",
          explanation: "A trading plan is exactly this — a written framework that guides your decisions and keeps your emotions in check so every trade isn't an improvised decision."
        },
        {
          id: 5,
          questionText: "What is the 'mean reversion' trading strategy based on?",
          questionType: "MCQ",
          options: [
            "Trading in the direction of the main trend",
            "The idea that prices tend to return to their historical average after extreme moves",
            "Entering trades when price breaks through key support/resistance",
            "Using moving average crossovers to identify new trends"
          ],
          correctAnswer: "The idea that prices tend to return to their historical average after extreme moves",
          explanation: "Mean reversion is based on the idea that prices tend to snap back to their historical average after extreme moves. Bollinger Bands and RSI are commonly used to identify these opportunities."
        },
        {
          id: 6,
          questionText: "Swing traders typically hold positions for several days to a few weeks.",
          questionType: "True/False",
          options: ["True", "False"],
          correctAnswer: "True",
          explanation: "Swing traders aim to capture medium-term price movements, typically holding positions for several days to a few weeks, 'swinging' between support and resistance levels."
        },
        {
          id: 7,
          questionText: "In breakout trading, where should you set your stop-loss?",
          questionType: "MCQ",
          options: [
            "Far below the breakout level",
            "Just inside the broken support or resistance level",
            "At your entry price",
            "At double the distance of the breakout"
          ],
          correctAnswer: "Just inside the broken support or resistance level",
          explanation: "In breakout trading, set your stop just inside the broken level. If it's a genuine breakout, price should not return below that level — if it does, it may be a fakeout."
        },
        {
          id: 8,
          questionText: "It is recommended to practice your strategy on a demo account before risking real money.",
          questionType: "True/False",
          options: ["True", "False"],
          correctAnswer: "True",
          explanation: "Using a demo account with virtual funds lets you test your approach, get comfortable with the platform and build confidence — all without any financial risk."
        },
        {
          id: 9,
          questionText: "Which of the following is a common trading mistake to avoid?",
          questionType: "MCQ",
          options: [
            "Using a stop-loss on every trade",
            "Setting SMART goals before trading",
            "Letting losses run and cutting profits short",
            "Reviewing your trades in a journal"
          ],
          correctAnswer: "Letting losses run and cutting profits short",
          explanation: "Letting losses run while cutting profits short is one of the most common and damaging trading mistakes. It is the opposite of good risk management."
        },
        {
          id: 10,
          questionText: "Swing trading is best suited to full-time traders who can monitor markets every second of the day.",
          questionType: "True/False",
          options: ["True", "False"],
          correctAnswer: "False",
          explanation: "Swing trading is best suited to those with a full-time job who can analyse charts in the evenings. It only requires checking charts once or twice a day, making it very compatible with a busy schedule."
        }
      ]
    }
  };