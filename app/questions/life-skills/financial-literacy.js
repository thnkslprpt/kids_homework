function financialLiteracyQuestion(question, options, answer, difficulty, extras = {}) {
  const normalizedOptions = Array.from(new Set(options.map(String)));
  const normalizedAnswer = String(answer);

  if (!String(question || "").trim()) {
    throw new Error("Financial literacy question is missing question text.");
  }
  if (normalizedOptions.length !== 4 || !normalizedOptions.includes(normalizedAnswer)) {
    throw new Error(`Financial literacy question must have exactly 4 unique options including the answer: ${question}`);
  }

  const level = clampFinancialDifficulty(difficulty);
  return {
    question: String(question),
    options: normalizedOptions,
    answer: normalizedAnswer,
    difficulty: level,
    contentId: extras.contentId || globalThis.HomeworkQuestionUtils?.stableContentId(
      "financial-literacy",
      `${level}|${question}|${normalizedAnswer}`
    ),
    skill: extras.skill || "financial-literacy.applied-decision-making",
    gradeMin: extras.gradeMin ?? level,
    gradeMax: extras.gradeMax ?? level,
    explanation: extras.explanation || extras.reviewText || normalizedAnswer,
    reviewText: extras.reviewText || extras.explanation || normalizedAnswer,
    reviewStatus: extras.reviewStatus || "author-curated",
    ...extras,
  };
}

const FINANCIAL_LITERACY_QUESTIONS = [
  // Level 1: money basics, saving, needs and wants.
  financialLiteracyQuestion("Why is saving some money helpful?", ["It helps you pay for something later", "It makes prices go down", "It means you never spend money", "It turns coins into bigger coins by magic"], "It helps you pay for something later", 1),
  financialLiteracyQuestion("You have 30 shekels and spend 10 shekels. How much money is left?", ["10 shekels", "20 shekels", "30 shekels", "40 shekels"], "20 shekels", 1),
  financialLiteracyQuestion("If you save 10 shekels each week for 4 weeks, how much will you have saved?", ["20 shekels", "30 shekels", "40 shekels", "50 shekels"], "40 shekels", 1),
  financialLiteracyQuestion("Assuming the apples are the same quality, which option has the lowest price per apple?", ["5 apples for 20 shekels", "3 apples for 15 shekels", "2 apples for 12 shekels", "6 apples for 30 shekels"], "5 apples for 20 shekels", 1),
  financialLiteracyQuestion("Which is more like a need than a want when packing for school?", ["Water", "A game console", "A toy drone", "Extra stickers"], "Water", 1),
  financialLiteracyQuestion("What currency is used in Israel?", ["shekel", "dollar", "euro", "pound"], "shekel", 1),
  financialLiteracyQuestion("Why is it useful to compare prices before buying?", ["You can choose the better value", "It makes the items free", "It changes the color of the product", "It makes every store the same"], "You can choose the better value", 1),
  financialLiteracyQuestion("If you spend less than you earn, what can happen to the money you keep?", ["It can grow over time", "It disappears", "It becomes homework", "It always becomes zero"], "It can grow over time", 1),
  financialLiteracyQuestion("Which choice is a want, not a need?", ["A warm coat in winter", "Medicine when sick", "Clean drinking water", "A new toy car"], "A new toy car", 1),
  financialLiteracyQuestion("You have 12 shekels. You get 8 more shekels. How much do you have now?", ["16 shekels", "18 shekels", "20 shekels", "24 shekels"], "20 shekels", 1),
  financialLiteracyQuestion("Which coin pile has the most money?", ["Two 10-shekel coins", "One 10-shekel coin", "Three 1-shekel coins", "Four 2-shekel coins"], "Two 10-shekel coins", 1),
  financialLiteracyQuestion("What should you do before buying something expensive?", ["Think if you really need it", "Buy it as fast as possible", "Ignore the price", "Throw away the receipt"], "Think if you really need it", 1),

  financialLiteracyQuestion("You have 5 shekels and get 5 more shekels. How much do you have now?", ["5 shekels", "8 shekels", "10 shekels", "15 shekels"], "10 shekels", 1),
  financialLiteracyQuestion("A snack costs 6 shekels. You pay with 10 shekels. How much change should you get?", ["2 shekels", "3 shekels", "4 shekels", "6 shekels"], "4 shekels", 1),
  financialLiteracyQuestion("Which item is a need, not a want?", ["Healthy food", "Extra candy", "A toy drone", "A sticker pack"], "Healthy food", 1),
  financialLiteracyQuestion("Which item is a want, not a need?", ["Clean water", "Medicine when sick", "A safe place to live", "Extra candy"], "Extra candy", 1),
  financialLiteracyQuestion("What does a price tag tell you?", ["How much an item costs", "Who made your homework", "How old the store is", "Which shelf is tallest"], "How much an item costs", 1),
  financialLiteracyQuestion("If you save 2 shekels each day for 3 days, how much do you save?", ["4 shekels", "5 shekels", "6 shekels", "8 shekels"], "6 shekels", 1),
  financialLiteracyQuestion("Which choice costs the least?", ["A pencil for 7 shekels", "A pencil for 4 shekels", "A pencil for 9 shekels", "A pencil for 6 shekels"], "A pencil for 4 shekels", 1),
  financialLiteracyQuestion("You want a ball that costs 15 shekels. You have 10 shekels. How much more do you need?", ["3 shekels", "5 shekels", "10 shekels", "25 shekels"], "5 shekels", 1),
  financialLiteracyQuestion("Which is a good saving habit?", ["Put some allowance aside before spending", "Spend all money right away", "Ignore your money", "Buy every toy you see"], "Put some allowance aside before spending", 1),
  financialLiteracyQuestion("What is money mainly used for?", ["Paying for things people buy", "Making the weather sunny", "Changing homework answers", "Making toys clean themselves"], "Paying for things people buy", 1),
  financialLiteracyQuestion("Two same-size notebooks are the same quality. Which is the better price?", ["20 shekels", "25 shekels", "30 shekels", "35 shekels"], "20 shekels", 1),
  financialLiteracyQuestion("Why should you keep your money in a safe place?", ["So it is less likely to get lost", "So it turns into candy", "So prices disappear", "So every item becomes free"], "So it is less likely to get lost", 1),

  // Level 2: budgets, change, simple goals, and planned spending.
  financialLiteracyQuestion("Which is more like a need than a want?", ["A winter coat", "A toy robot", "Extra candy", "A new video game"], "A winter coat", 2),
  financialLiteracyQuestion("Which pencil option has the lowest price per pencil?", ["3 pencils for 12 shekels", "1 pencil for 5 shekels", "2 pencils for 11 shekels", "5 pencils for 30 shekels"], "3 pencils for 12 shekels", 2),
  financialLiteracyQuestion("You have 50 shekels, earn 20 more, and then spend 35 shekels. How much money is left?", ["15 shekels", "25 shekels", "35 shekels", "45 shekels"], "35 shekels", 2),
  financialLiteracyQuestion("What is a simple budget?", ["A plan for how to use money", "A kind of sticker", "A type of snack", "A machine that prints coins"], "A plan for how to use money", 2),
  financialLiteracyQuestion("You want something that costs 60 shekels. You already have 35 shekels. How much more do you need?", ["20 shekels", "25 shekels", "30 shekels", "35 shekels"], "25 shekels", 2),
  financialLiteracyQuestion("Which country uses the yuan?", ["China", "Japan", "India", "Russia"], "China", 2),
  financialLiteracyQuestion("You have 90 shekels. Buy lunch for 24 shekels and juice for 11 shekels. How much is left?", ["45 shekels", "50 shekels", "55 shekels", "60 shekels"], "55 shekels", 2),
  financialLiteracyQuestion("Why is a shopping list useful?", ["It helps you remember what you planned to buy", "It makes the store pay you", "It means everything is a need", "It changes the price tags"], "It helps you remember what you planned to buy", 2),
  financialLiteracyQuestion("A notebook costs 18 shekels. You pay with 20 shekels. How much change should you get?", ["1 shekel", "2 shekels", "3 shekels", "4 shekels"], "2 shekels", 2),
  financialLiteracyQuestion("Which plan reaches 100 shekels fastest?", ["Save 25 shekels each week", "Save 10 shekels each week", "Save 5 shekels each week", "Save 15 shekels every 2 weeks"], "Save 25 shekels each week", 2),
  financialLiteracyQuestion("What is income?", ["Money you receive", "Money you throw away", "A store shelf", "A list of toys"], "Money you receive", 2),
  financialLiteracyQuestion("What is an expense?", ["Money you spend", "A free gift", "A kind of homework", "Money that appears by magic"], "Money you spend", 2),

  financialLiteracyQuestion("You have 40 shekels. You spend 12 shekels on a notebook and 8 shekels on a pen. How much is left?", ["16 shekels", "20 shekels", "24 shekels", "28 shekels"], "20 shekels", 2),
  financialLiteracyQuestion("A pencil costs 7 shekels. You pay with 10 shekels. How much change should you get?", ["1 shekel", "2 shekels", "3 shekels", "4 shekels"], "3 shekels", 2),
  financialLiteracyQuestion("If you save 15 shekels each week for 5 weeks, how much will you save?", ["60 shekels", "65 shekels", "75 shekels", "80 shekels"], "75 shekels", 2),
  financialLiteracyQuestion("You want a backpack that costs 80 shekels. You have 50 shekels. How much more do you need?", ["20 shekels", "25 shekels", "30 shekels", "40 shekels"], "30 shekels", 2),
  financialLiteracyQuestion("Which is the best example of planned spending?", ["Saving for two weeks before buying a game", "Buying candy without checking the price", "Spending all your money by accident", "Choosing the first toy you see"], "Saving for two weeks before buying a game", 2),
  financialLiteracyQuestion("Which item is most like a school need?", ["Notebooks for class", "A giant candy bag", "A toy spaceship", "A new video game"], "Notebooks for class", 2),
  financialLiteracyQuestion("Which is an example of income?", ["Allowance you receive", "Money paid for lunch", "Coins lost on the bus", "A price tag in a store"], "Allowance you receive", 2),
  financialLiteracyQuestion("Which is an example of an expense?", ["Paying 15 shekels for lunch", "Getting 20 shekels as a gift", "Finding a coin", "Saving money in a jar"], "Paying 15 shekels for lunch", 2),
  financialLiteracyQuestion("Which eraser option has the lowest price per eraser?", ["4 erasers for 12 shekels", "3 erasers for 12 shekels", "2 erasers for 10 shekels", "5 erasers for 20 shekels"], "4 erasers for 12 shekels", 2),
  financialLiteracyQuestion("Why is a savings goal useful?", ["It helps you know how much to save", "It makes every item free", "It hides all prices", "It means you never need money"], "It helps you know how much to save", 2),
  financialLiteracyQuestion("You receive 25 shekels, get 15 more shekels, and spend 20 shekels. How much is left?", ["15 shekels", "20 shekels", "25 shekels", "40 shekels"], "20 shekels", 2),
  financialLiteracyQuestion("Which country uses the yen?", ["Japan", "China", "Brazil", "Turkey"], "Japan", 2),

  // Level 3: multi-step spending, discounts, opportunity cost, and value.
  financialLiteracyQuestion("You want a 90-shekel game. If you save 15 shekels each week, about how many weeks will it take?", ["4 weeks", "5 weeks", "6 weeks", "8 weeks"], "6 weeks", 3),
  financialLiteracyQuestion("A snack costs 8 shekels each school day for 5 days. How much is that for one week of school?", ["13 shekels", "32 shekels", "40 shekels", "48 shekels"], "40 shekels", 3),
  financialLiteracyQuestion("A shirt costs 40 shekels and is 50% off. What is the sale price?", ["10 shekels", "20 shekels", "25 shekels", "30 shekels"], "20 shekels", 3),
  financialLiteracyQuestion("A bus card costs 18 shekels and a snack costs 9 shekels. How much do 2 bus cards and 1 snack cost altogether?", ["36 shekels", "45 shekels", "54 shekels", "63 shekels"], "45 shekels", 3),
  financialLiteracyQuestion("Which plan saves the most in 3 months? Assume 1 month = 4 weeks.", ["Save 20 shekels each month", "Save 10 shekels each week", "Save 15 shekels every 2 weeks", "Save 5 shekels each week"], "Save 10 shekels each week", 3),
  financialLiteracyQuestion("What does opportunity cost mean?", ["What you give up when you choose one thing instead of another", "A coupon that never expires", "A price that is always zero", "Money that cannot be counted"], "What you give up when you choose one thing instead of another", 3),
  financialLiteracyQuestion("Which country uses the dirham?", ["United Arab Emirates", "Saudi Arabia", "Switzerland", "Indonesia"], "United Arab Emirates", 3),
  financialLiteracyQuestion("A game costs 80 shekels and is 25% off. What is the sale price?", ["50 shekels", "55 shekels", "60 shekels", "65 shekels"], "60 shekels", 3),
  financialLiteracyQuestion("You can buy a book or a puzzle, but not both. If you choose the book, what is the opportunity cost?", ["The puzzle you did not buy", "The book you bought", "Both items become free", "The store closes"], "The puzzle you did not buy", 3),
  financialLiteracyQuestion("Which pack has the lowest price per marker?", ["4 markers for 16 shekels", "2 markers for 10 shekels", "3 markers for 15 shekels", "5 markers for 25 shekels"], "4 markers for 16 shekels", 3),
  financialLiteracyQuestion("A child earns 25 shekels for chores and spends 9 shekels. How much can be saved?", ["14 shekels", "16 shekels", "25 shekels", "34 shekels"], "16 shekels", 3),
  financialLiteracyQuestion("What is a short-term savings goal?", ["Saving for a book next month", "Saving for retirement", "Buying every candy today", "Ignoring all prices"], "Saving for a book next month", 3),

  financialLiteracyQuestion("A pack of 6 pens costs 24 shekels. What is the price per pen?", ["3 shekels", "4 shekels", "5 shekels", "6 shekels"], "4 shekels", 3),
  financialLiteracyQuestion("You have 120 shekels. You buy 2 books for 35 shekels each and a pencil for 10 shekels. How much is left?", ["30 shekels", "40 shekels", "50 shekels", "80 shekels"], "40 shekels", 3),
  financialLiteracyQuestion("A bag costs 60 shekels and is 25% off. What is the sale price?", ["35 shekels", "40 shekels", "45 shekels", "50 shekels"], "45 shekels", 3),
  financialLiteracyQuestion("A toy costs 100 shekels and is 10% off. What is the sale price?", ["80 shekels", "85 shekels", "90 shekels", "95 shekels"], "90 shekels", 3),
  financialLiteracyQuestion("You want to save 140 shekels. If you save 20 shekels each week, how many weeks will it take?", ["5 weeks", "6 weeks", "7 weeks", "8 weeks"], "7 weeks", 3),
  financialLiteracyQuestion("You can go to a movie or play at the arcade, but not both. If you choose the movie, what is the opportunity cost?", ["Playing at the arcade", "The movie you chose", "Both activities becoming free", "The price of popcorn only"], "Playing at the arcade", 3),
  financialLiteracyQuestion("Which notebook pack has the lowest price per notebook?", ["3 notebooks for 18 shekels", "4 notebooks for 20 shekels", "5 notebooks for 30 shekels", "2 notebooks for 14 shekels"], "4 notebooks for 20 shekels", 3),
  financialLiteracyQuestion("You budget 100 shekels for snacks this month. You spend 18 shekels, 22 shekels, and 25 shekels. How much is left?", ["25 shekels", "30 shekels", "35 shekels", "45 shekels"], "35 shekels", 3),
  financialLiteracyQuestion("Which plan saves the most in 6 weeks?", ["Save 10 shekels each week", "Save 12 shekels each week", "Save 15 shekels each week", "Save 20 shekels every 2 weeks"], "Save 15 shekels each week", 3),
  financialLiteracyQuestion("A price rises from 50 shekels to 55 shekels. How much did the price increase?", ["3 shekels", "5 shekels", "10 shekels", "15 shekels"], "5 shekels", 3),
  financialLiteracyQuestion("What does good value for money mean?", ["The item is useful for its price", "The item is always the biggest", "The item has no price", "The item must be red"], "The item is useful for its price", 3),
  financialLiteracyQuestion("A receipt says subtotal 48 shekels and delivery 7 shekels. What is the total?", ["41 shekels", "48 shekels", "55 shekels", "57 shekels"], "55 shekels", 3),

  // Level 4: percentages, longer budgets, currency codes, and receipts.
  financialLiteracyQuestion("You have 100 shekels. A book costs 35 shekels and a puzzle costs 25 shekels. How much money is left after buying both?", ["30 shekels", "35 shekels", "40 shekels", "65 shekels"], "40 shekels", 4),
  financialLiteracyQuestion("Which plan saves the most money after 2 months? Assume 1 month = 4 weeks.", ["Save 15 shekels each week", "Save 50 shekels each month", "Save 20 shekels every 2 weeks", "Save 5 shekels each week"], "Save 15 shekels each week", 4),
  financialLiteracyQuestion("You buy 2 notebooks that cost 18 shekels each. How much change should you get from 50 shekels?", ["12 shekels", "14 shekels", "16 shekels", "18 shekels"], "14 shekels", 4),
  financialLiteracyQuestion("Which cereal option has the lowest price per gram?", ["500 grams for 20 shekels", "300 grams for 15 shekels", "250 grams for 14 shekels", "750 grams for 33 shekels"], "500 grams for 20 shekels", 4),
  financialLiteracyQuestion("A notebook costs 50 shekels and is 20% off. What is the sale price?", ["30 shekels", "35 shekels", "40 shekels", "45 shekels"], "40 shekels", 4),
  financialLiteracyQuestion("Which currency code belongs to the shekel?", ["ILS", "INR", "IDR", "EGP"], "ILS", 4),
  financialLiteracyQuestion("Germany, France, Italy, and Spain all use which currency?", ["euro", "pound", "franc", "dollar"], "euro", 4),
  financialLiteracyQuestion("What is the safest meaning of the phrase 'pay yourself first'?", ["Set aside savings before spending on wants", "Spend all your money on the first day", "Pay only with coins", "Hide bills in different rooms"], "Set aside savings before spending on wants", 4),
  financialLiteracyQuestion("A receipt says subtotal 70 shekels and delivery 10 shekels. What is the total?", ["60 shekels", "70 shekels", "80 shekels", "90 shekels"], "80 shekels", 4),
  financialLiteracyQuestion("You have 180 shekels. You spend 1/3 of it on a gift. How much do you spend?", ["45 shekels", "60 shekels", "90 shekels", "120 shekels"], "60 shekels", 4),
  financialLiteracyQuestion("Which action helps avoid impulse buying?", ["Wait a day before buying a want", "Buy the first thing you see", "Never read the price", "Only use the biggest bill"], "Wait a day before buying a want", 4),
  financialLiteracyQuestion("If a store offers buy 1, get 1 free on a 12-shekel item, what is the cost for 2 items?", ["6 shekels", "12 shekels", "18 shekels", "24 shekels"], "12 shekels", 4),

  financialLiteracyQuestion("You buy 3 notebooks that cost 16 shekels each. How much change should you get from 60 shekels?", ["8 shekels", "10 shekels", "12 shekels", "16 shekels"], "12 shekels", 4),
  financialLiteracyQuestion("A 200-shekel budget puts 25% into savings. How much is saved?", ["25 shekels", "40 shekels", "50 shekels", "75 shekels"], "50 shekels", 4),
  financialLiteracyQuestion("A jacket costs 120 shekels and is 10% off. What is the sale price?", ["100 shekels", "108 shekels", "110 shekels", "112 shekels"], "108 shekels", 4),
  financialLiteracyQuestion("A game costs 150 shekels and is 20% off. What is the sale price?", ["110 shekels", "115 shekels", "120 shekels", "130 shekels"], "120 shekels", 4),
  financialLiteracyQuestion("A store offers buy 2, get 1 free on a 15-shekel item. What is the cost for 3 items?", ["15 shekels", "30 shekels", "35 shekels", "45 shekels"], "30 shekels", 4),
  financialLiteracyQuestion("Which rice option has the lowest price per gram?", ["400 grams for 16 shekels", "500 grams for 25 shekels", "600 grams for 30 shekels", "300 grams for 15 shekels"], "400 grams for 16 shekels", 4),
  financialLiteracyQuestion("Which currency code belongs to the United States dollar?", ["USD", "ILS", "JPY", "EUR"], "USD", 4),
  financialLiteracyQuestion("You have a 320-shekel budget. You spend 90 shekels on needs and 70 shekels on wants. How much is left for savings?", ["120 shekels", "140 shekels", "160 shekels", "180 shekels"], "160 shekels", 4),
  financialLiteracyQuestion("A receipt shows 95 shekels before a 15-shekel discount. What is the price after the discount?", ["70 shekels", "75 shekels", "80 shekels", "85 shekels"], "80 shekels", 4),
  financialLiteracyQuestion("Which is the best example of a long-term savings goal?", ["Saving for university years from now", "Buying candy after school today", "Spending coins right away", "Ignoring every price tag"], "Saving for university years from now", 4),
  financialLiteracyQuestion("You spend 1/4 of 200 shekels on a gift. How much do you spend?", ["25 shekels", "40 shekels", "50 shekels", "100 shekels"], "50 shekels", 4),
  financialLiteracyQuestion("Which action helps you avoid overspending?", ["Track spending against your budget", "Buy first and count later", "Throw away receipts immediately", "Choose only the brightest package"], "Track spending against your budget", 4),

  // Level 5: tax, subscriptions, recurring spending, and consumer records.
  financialLiteracyQuestion("A toy costs 80 shekels and is 25% off. What is the sale price?", ["55 shekels", "60 shekels", "65 shekels", "70 shekels"], "60 shekels", 5),
  financialLiteracyQuestion("Which juice option has the lowest price per liter?", ["2 liters for 20 shekels", "1 liter for 12 shekels", "500 milliliters for 8 shekels", "3 liters for 33 shekels"], "2 liters for 20 shekels", 5),
  financialLiteracyQuestion("A jacket costs 120 shekels and is 25% off. What is the sale price?", ["80 shekels", "90 shekels", "95 shekels", "100 shekels"], "90 shekels", 5),
  financialLiteracyQuestion("You have 200 shekels. You buy 3 games that each cost 45 shekels. How much money is left?", ["55 shekels", "60 shekels", "65 shekels", "70 shekels"], "65 shekels", 5),
  financialLiteracyQuestion("Which list shows only currencies?", ["yen, peso, euro, naira", "Japan, Brazil, won, euro", "dollar, Mexico, rand, rupee", "yuan, India, lira, franc"], "yen, peso, euro, naira", 5),
  financialLiteracyQuestion("A book costs 100 shekels. Sales tax adds 10 shekels. What is the total price?", ["90 shekels", "100 shekels", "110 shekels", "120 shekels"], "110 shekels", 5),
  financialLiteracyQuestion("A subscription costs 12 shekels per month. How much does it cost for a year?", ["120 shekels", "132 shekels", "144 shekels", "156 shekels"], "144 shekels", 5),
  financialLiteracyQuestion("What is a receipt useful for?", ["Checking what you bought and how much you paid", "Making an item weigh less", "Changing a want into a need", "Making all stores use one price"], "Checking what you bought and how much you paid", 5),
  financialLiteracyQuestion("You budget 300 shekels. You plan 150 for needs, 90 for savings, and the rest for wants. How much is for wants?", ["30 shekels", "45 shekels", "60 shekels", "90 shekels"], "60 shekels", 5),
  financialLiteracyQuestion("A 150-shekel scooter is marked down by 20%. How much money is taken off the price?", ["20 shekels", "25 shekels", "30 shekels", "40 shekels"], "30 shekels", 5),
  financialLiteracyQuestion("A family pays 25 shekels each month for an app they no longer use. What is a good money habit?", ["Cancel unused subscriptions", "Pay forever without checking", "Buy another app first", "Ignore monthly costs"], "Cancel unused subscriptions", 5),
  financialLiteracyQuestion("Which is the best example of a variable expense?", ["Snacks that cost different amounts each week", "Rent that is always the same", "A fixed bus pass", "A yearly school fee already paid"], "Snacks that cost different amounts each week", 5),

  financialLiteracyQuestion("An item costs 250 shekels and 10% tax is added. What is the total price?", ["260 shekels", "275 shekels", "285 shekels", "300 shekels"], "275 shekels", 5),
  financialLiteracyQuestion("A toy costs 80 shekels and is 15% off. What is the sale price?", ["60 shekels", "64 shekels", "68 shekels", "72 shekels"], "68 shekels", 5),
  financialLiteracyQuestion("A subscription costs 18 shekels per month. How much does it cost for 6 months?", ["96 shekels", "100 shekels", "108 shekels", "118 shekels"], "108 shekels", 5),
  financialLiteracyQuestion("You budget 400 shekels. You plan 180 for needs, 100 for savings, and the rest for wants. How much is for wants?", ["100 shekels", "110 shekels", "120 shekels", "140 shekels"], "120 shekels", 5),
  financialLiteracyQuestion("Which cost is most likely a variable expense?", ["Electricity that changes each month", "A rent payment that never changes", "A fixed monthly bus pass", "A yearly fee already paid"], "Electricity that changes each month", 5),
  financialLiteracyQuestion("Which is the best example of a fixed expense?", ["A 45-shekel phone plan paid every month", "Snacks that cost different amounts", "A surprise gift", "A one-time toy purchase"], "A 45-shekel phone plan paid every month", 5),
  financialLiteracyQuestion("A toy costs 100 shekels and is 20% off. Delivery costs 10 shekels. What is the final cost?", ["80 shekels", "85 shekels", "90 shekels", "100 shekels"], "90 shekels", 5),
  financialLiteracyQuestion("Which drink option has the lowest price per liter?", ["1 liter for 9 shekels", "2 liters for 20 shekels", "500 milliliters for 6 shekels", "3 liters for 33 shekels"], "1 liter for 9 shekels", 5),
  financialLiteracyQuestion("Why might you keep a receipt after buying a school bag?", ["To prove what you paid if you need to return it", "To make the bag weigh less", "To change the color of the bag", "To make all bags free"], "To prove what you paid if you need to return it", 5),
  financialLiteracyQuestion("You receive 600 shekels and save 15% of it. How much do you save?", ["60 shekels", "75 shekels", "90 shekels", "120 shekels"], "90 shekels", 5),
  financialLiteracyQuestion("Canceling an unused app saves 25 shekels each month. How much is saved in 4 months?", ["75 shekels", "90 shekels", "100 shekels", "125 shekels"], "100 shekels", 5),
  financialLiteracyQuestion("Which list shows only expenses?", ["Lunch, bus fare, notebook", "Allowance, gift money, wages", "Savings, income, donation received", "Birthday money, interest, prize"], "Lunch, bus fare, notebook", 5),

  // Level 6: income, expenses, simple interest, emergency funds, and planning.
  financialLiteracyQuestion("You earn 300 shekels in a month and spend 210 shekels. How much can you save?", ["70 shekels", "80 shekels", "90 shekels", "110 shekels"], "90 shekels", 6),
  financialLiteracyQuestion("A savings account pays 5% simple interest for one year. If you save 200 shekels, how much interest do you earn?", ["5 shekels", "10 shekels", "15 shekels", "20 shekels"], "10 shekels", 6),
  financialLiteracyQuestion("A phone plan is 40 shekels per month plus a 20-shekel setup fee. What is the total for the first 3 months?", ["100 shekels", "120 shekels", "140 shekels", "160 shekels"], "140 shekels", 6),
  financialLiteracyQuestion("Which is the best example of an emergency fund?", ["Money saved for unexpected important costs", "Money spent on candy right away", "A coupon for a toy store", "A list of dream vacations only"], "Money saved for unexpected important costs", 6),
  financialLiteracyQuestion("A bike costs 400 shekels. You have 160 shekels and save 40 shekels each month. How many more months do you need?", ["4 months", "5 months", "6 months", "8 months"], "6 months", 6),
  financialLiteracyQuestion("Which is a fixed expense?", ["A rent payment that is the same each month", "A surprise toy purchase", "A snack bought once", "A random gift"], "A rent payment that is the same each month", 6),
  financialLiteracyQuestion("You receive 500 shekels. You save 20% of it. How much do you save?", ["50 shekels", "75 shekels", "100 shekels", "120 shekels"], "100 shekels", 6),
  financialLiteracyQuestion("What is a bank account mainly used for?", ["Keeping and managing money", "Making homework disappear", "Changing coins into candy", "Hiding prices in a store"], "Keeping and managing money", 6),
  financialLiteracyQuestion("You plan to spend 240 shekels over 6 weeks. What is the average weekly spending limit?", ["30 shekels", "35 shekels", "40 shekels", "45 shekels"], "40 shekels", 6),
  financialLiteracyQuestion("A class fundraiser earns 900 shekels and has 250 shekels in costs. What is the profit?", ["550 shekels", "600 shekels", "650 shekels", "700 shekels"], "650 shekels", 6),

  financialLiteracyQuestion("You earn 800 shekels in a month and spend 520 shekels. How much can you save?", ["240 shekels", "260 shekels", "280 shekels", "320 shekels"], "280 shekels", 6),
  financialLiteracyQuestion("A savings account pays 4% simple interest for one year. If you save 500 shekels, how much interest do you earn?", ["10 shekels", "20 shekels", "40 shekels", "50 shekels"], "20 shekels", 6),
  financialLiteracyQuestion("A phone plan costs 55 shekels per month plus a 30-shekel setup fee. What is the total for the first 4 months?", ["220 shekels", "240 shekels", "250 shekels", "280 shekels"], "250 shekels", 6),
  financialLiteracyQuestion("Which expense is a good reason to use an emergency fund?", ["An unexpected important bike repair", "A bigger candy bag", "A second video game", "A toy bought because it is shiny"], "An unexpected important bike repair", 6),
  financialLiteracyQuestion("A tablet costs 750 shekels. You have 150 shekels and save 75 shekels each month. How many more months do you need?", ["6 months", "7 months", "8 months", "10 months"], "8 months", 6),
  financialLiteracyQuestion("Which cost is most likely a fixed expense?", ["A rent payment that stays the same", "Ice cream bought once", "A birthday gift chosen today", "Snacks with changing prices"], "A rent payment that stays the same", 6),
  financialLiteracyQuestion("You receive 900 shekels and save 10% of it. How much do you save?", ["90 shekels", "100 shekels", "180 shekels", "810 shekels"], "90 shekels", 6),
  financialLiteracyQuestion("A fundraiser earns 1,200 shekels and has 450 shekels in costs. What is the profit?", ["650 shekels", "700 shekels", "750 shekels", "850 shekels"], "750 shekels", 6),
  financialLiteracyQuestion("You plan to spend 360 shekels over 9 weeks. What is the average weekly spending limit?", ["30 shekels", "35 shekels", "40 shekels", "45 shekels"], "40 shekels", 6),
  financialLiteracyQuestion("What does a bank statement help you check?", ["Money added to and taken from an account", "The color of every coin", "Which store has the tallest door", "How to make homework shorter"], "Money added to and taken from an account", 6),

  // Level 7: borrowing, inflation, unit prices, and risk.
  financialLiteracyQuestion("You borrow 300 shekels and pay back 330 shekels. How much interest did you pay?", ["20 shekels", "30 shekels", "60 shekels", "330 shekels"], "30 shekels", 7),
  financialLiteracyQuestion("If prices rise because of inflation, what happens to the buying power of the same amount of money?", ["It buys less than before", "It always buys more than before", "It becomes a different currency", "It cannot be spent anywhere"], "It buys less than before", 7),
  financialLiteracyQuestion("Which habit can reduce investment risk?", ["Diversifying across different investments", "Putting all money in one risky place", "Ignoring fees", "Spending all savings first"], "Diversifying across different investments", 7),
  financialLiteracyQuestion("A 600-shekel budget puts 25% into savings. How much is saved?", ["100 shekels", "125 shekels", "150 shekels", "200 shekels"], "150 shekels", 7),
  financialLiteracyQuestion("A 12-pack of pens costs 36 shekels. What is the cost per pen?", ["2 shekels", "3 shekels", "4 shekels", "6 shekels"], "3 shekels", 7),
  financialLiteracyQuestion("A price rises from 200 shekels by 10%. What is the new price?", ["210 shekels", "220 shekels", "230 shekels", "240 shekels"], "220 shekels", 7),
  financialLiteracyQuestion("What is credit?", ["Borrowing now and paying later", "Money that cannot be spent", "A discount that is always free", "A receipt with no price"], "Borrowing now and paying later", 7),
  financialLiteracyQuestion("Why can a loan cost more than the amount borrowed?", ["Interest and fees may be added", "The money changes color", "The receipt gets longer", "The store chooses random numbers"], "Interest and fees may be added", 7),
  financialLiteracyQuestion("Which choice is usually the safest online payment habit for a child?", ["Ask a trusted adult before entering payment details", "Share card numbers in a game chat", "Click every prize link", "Save passwords on a public computer"], "Ask a trusted adult before entering payment details", 7),
  financialLiteracyQuestion("A 40-shekel item has a 5-shekel shipping fee. What is the delivered cost?", ["35 shekels", "40 shekels", "45 shekels", "50 shekels"], "45 shekels", 7),

  financialLiteracyQuestion("You borrow 500 shekels and pay back 560 shekels. How much interest did you pay?", ["40 shekels", "50 shekels", "60 shekels", "560 shekels"], "60 shekels", 7),
  financialLiteracyQuestion("A price rises from 100 shekels to 110 shekels. What percent increase is that?", ["5%", "10%", "15%", "20%"], "10%", 7),
  financialLiteracyQuestion("Which example shows diversification?", ["Putting savings into several different investments", "Putting all savings into one company", "Spending all savings today", "Ignoring every fee"], "Putting savings into several different investments", 7),
  financialLiteracyQuestion("An 800-shekel budget puts 15% into savings. How much is saved?", ["80 shekels", "100 shekels", "120 shekels", "150 shekels"], "120 shekels", 7),
  financialLiteracyQuestion("8 notebooks cost 56 shekels. What is the cost per notebook?", ["6 shekels", "7 shekels", "8 shekels", "9 shekels"], "7 shekels", 7),
  financialLiteracyQuestion("A used bike worth 250 shekels loses 20% of its value. What is its new value?", ["180 shekels", "190 shekels", "200 shekels", "230 shekels"], "200 shekels", 7),
  financialLiteracyQuestion("Which action helps build a good credit history?", ["Paying borrowed money back on time", "Missing payments often", "Borrowing without a plan", "Ignoring every bill"], "Paying borrowed money back on time", 7),
  financialLiteracyQuestion("You borrow 1,000 shekels. Fees are 50 shekels and interest is 100 shekels. What is the extra cost of the loan?", ["50 shekels", "100 shekels", "150 shekels", "1,150 shekels"], "150 shekels", 7),
  financialLiteracyQuestion("Which is a safe online buying habit?", ["Use trusted websites with an adult's help", "Share passwords in a chat", "Click unknown prize links", "Enter card details on any pop-up"], "Use trusted websites with an adult's help", 7),
  financialLiteracyQuestion("An online item costs 75 shekels and shipping costs 12 shekels. What is the delivered cost?", ["75 shekels", "82 shekels", "87 shekels", "90 shekels"], "87 shekels", 7),

  // Level 8: compound growth, fees, exchange rates, and spending plans.
  financialLiteracyQuestion("You save 1,000 shekels at 10% compound interest for 2 years. How much do you have?", ["1,100 shekels", "1,200 shekels", "1,210 shekels", "1,220 shekels"], "1,210 shekels", 8),
  financialLiteracyQuestion("An account charges a 5-shekel fee every month. How much is that in a year?", ["50 shekels", "55 shekels", "60 shekels", "65 shekels"], "60 shekels", 8),
  financialLiteracyQuestion("You exchange 100 dollars at 4 shekels per dollar. How many shekels do you receive before fees?", ["250 shekels", "300 shekels", "400 shekels", "500 shekels"], "400 shekels", 8),
  financialLiteracyQuestion("A budget has 2,000 shekels. If 30% goes to rent, how much is rent?", ["300 shekels", "500 shekels", "600 shekels", "700 shekels"], "600 shekels", 8),
  financialLiteracyQuestion("A 500-shekel item has 20% tax added. What is the final price?", ["520 shekels", "550 shekels", "600 shekels", "700 shekels"], "600 shekels", 8),
  financialLiteracyQuestion("Why should you check account fees?", ["Small fees can add up over time", "Fees always make you richer", "Fees are never real", "Fees make prices disappear"], "Small fees can add up over time", 8),
  financialLiteracyQuestion("What does compound interest mean?", ["Interest can earn more interest", "Interest is always zero", "Only coins earn interest", "Prices cannot change"], "Interest can earn more interest", 8),
  financialLiteracyQuestion("A subscription costs 29 shekels per month. About how much is that for 12 months?", ["About 120 shekels", "About 240 shekels", "About 350 shekels", "About 500 shekels"], "About 350 shekels", 8),
  financialLiteracyQuestion("What is an exchange rate?", ["How much one currency is worth in another currency", "A store's opening time", "The number of items in a cart", "A fee for losing a receipt"], "How much one currency is worth in another currency", 8),
  financialLiteracyQuestion("A savings goal is 1,200 shekels in 8 months. How much should be saved each month?", ["100 shekels", "120 shekels", "150 shekels", "200 shekels"], "150 shekels", 8),

  financialLiteracyQuestion("You save 2,000 shekels at 10% compound interest for 2 years. How much do you have?", ["2,200 shekels", "2,300 shekels", "2,400 shekels", "2,420 shekels"], "2,420 shekels", 8),
  financialLiteracyQuestion("An account charges an 8-shekel fee every month. How much is that in a year?", ["80 shekels", "88 shekels", "96 shekels", "108 shekels"], "96 shekels", 8),
  financialLiteracyQuestion("You exchange 50 dollars at 3.6 shekels per dollar. How many shekels do you receive before fees?", ["150 shekels", "160 shekels", "180 shekels", "200 shekels"], "180 shekels", 8),
  financialLiteracyQuestion("A budget has 3,000 shekels. If 25% goes to rent, how much is rent?", ["600 shekels", "700 shekels", "750 shekels", "900 shekels"], "750 shekels", 8),
  financialLiteracyQuestion("A 400-shekel item has 15% tax added. What is the final price?", ["440 shekels", "450 shekels", "460 shekels", "480 shekels"], "460 shekels", 8),
  financialLiteracyQuestion("Why can a small monthly fee matter?", ["It adds up over many months", "It always becomes free", "It makes the account larger by itself", "It removes all other prices"], "It adds up over many months", 8),
  financialLiteracyQuestion("If 1 euro is worth 4 shekels, how many shekels are 10 euros worth before fees?", ["14 shekels", "25 shekels", "40 shekels", "400 shekels"], "40 shekels", 8),
  financialLiteracyQuestion("A subscription costs 49 shekels per month. How much does it cost for 12 months?", ["490 shekels", "548 shekels", "588 shekels", "600 shekels"], "588 shekels", 8),
  financialLiteracyQuestion("A savings goal is 2,400 shekels in 12 months. How much should be saved each month?", ["120 shekels", "150 shekels", "200 shekels", "240 shekels"], "200 shekels", 8),
  financialLiteracyQuestion("What is the usual tradeoff with higher potential investment returns?", ["They often come with higher risk", "They always have no risk", "They remove all fees", "They guarantee the same result"], "They often come with higher risk", 8),

  // Level 9: credit cards, sinking funds, taxes after discounts, and long-term tradeoffs.
  financialLiteracyQuestion("A credit card balance is 1,000 shekels and interest is 3% for the month. How much interest is added?", ["3 shekels", "30 shekels", "100 shekels", "300 shekels"], "30 shekels", 9),
  financialLiteracyQuestion("A family wants 2,400 shekels in 12 months. How much should they save each month?", ["100 shekels", "150 shekels", "200 shekels", "240 shekels"], "200 shekels", 9),
  financialLiteracyQuestion("An item costs 1,000 shekels, gets a 20% discount, and then 10% tax is added. What is the final price?", ["800 shekels", "880 shekels", "900 shekels", "1,100 shekels"], "880 shekels", 9),
  financialLiteracyQuestion("A loan has 6 payments of 220 shekels. What is the total paid?", ["1,220 shekels", "1,320 shekels", "1,420 shekels", "1,520 shekels"], "1,320 shekels", 9),
  financialLiteracyQuestion("A product loses 25% of its value from 800 shekels. What is its new value?", ["500 shekels", "600 shekels", "700 shekels", "775 shekels"], "600 shekels", 9),
  financialLiteracyQuestion("Why can paying only the minimum on a credit card become expensive?", ["Interest can keep adding to the unpaid balance", "The balance automatically becomes zero", "The bank gives free toys", "The receipt disappears"], "Interest can keep adding to the unpaid balance", 9),
  financialLiteracyQuestion("Which choice best describes liquidity?", ["How easy it is to turn something into spendable money", "How heavy a coin is", "How colorful a bank card is", "How loud a cash register is"], "How easy it is to turn something into spendable money", 9),
  financialLiteracyQuestion("A price rises by 20% from 400 shekels. What is the new price?", ["420 shekels", "460 shekels", "480 shekels", "500 shekels"], "480 shekels", 9),
  financialLiteracyQuestion("A 600-shekel bill is split 50% needs, 30% wants, and 20% savings. How much goes to savings?", ["60 shekels", "100 shekels", "120 shekels", "180 shekels"], "120 shekels", 9),
  financialLiteracyQuestion("Which plan has the lowest total cost?", ["10 payments of 55 shekels", "5 payments of 120 shekels", "12 payments of 50 shekels", "1 payment of 575 shekels"], "10 payments of 55 shekels", 9),

  financialLiteracyQuestion("A credit card balance is 1,500 shekels and interest is 2% for the month. How much interest is added?", ["20 shekels", "30 shekels", "50 shekels", "300 shekels"], "30 shekels", 9),
  financialLiteracyQuestion("A family wants 3,600 shekels in 18 months. How much should they save each month?", ["150 shekels", "180 shekels", "200 shekels", "240 shekels"], "200 shekels", 9),
  financialLiteracyQuestion("An item costs 800 shekels, gets a 25% discount, and then 10% tax is added. What is the final price?", ["600 shekels", "640 shekels", "660 shekels", "700 shekels"], "660 shekels", 9),
  financialLiteracyQuestion("A loan has 8 payments of 175 shekels. What is the total paid?", ["1,200 shekels", "1,300 shekels", "1,400 shekels", "1,500 shekels"], "1,400 shekels", 9),
  financialLiteracyQuestion("A product loses 30% of its value from 1,000 shekels. What is its new value?", ["600 shekels", "650 shekels", "700 shekels", "800 shekels"], "700 shekels", 9),
  financialLiteracyQuestion("Why can minimum credit card payments lead to a bigger total cost?", ["Interest may keep adding to the unpaid balance", "The balance always disappears", "The card stops charging money", "The bank pays every bill for you"], "Interest may keep adding to the unpaid balance", 9),
  financialLiteracyQuestion("Which asset is usually the most liquid?", ["Cash in a bank account", "A house", "A rare painting", "A car that must be sold first"], "Cash in a bank account", 9),
  financialLiteracyQuestion("A price rises by 15% from 200 shekels. What is the new price?", ["215 shekels", "220 shekels", "230 shekels", "240 shekels"], "230 shekels", 9),
  financialLiteracyQuestion("A 1,500-shekel budget uses 50% for needs, 30% for wants, and 20% for savings. How much goes to savings?", ["150 shekels", "250 shekels", "300 shekels", "450 shekels"], "300 shekels", 9),
  financialLiteracyQuestion("Which payment plan has the lowest total cost?", ["10 payments of 110 shekels", "24 payments of 50 shekels", "6 payments of 190 shekels", "1 payment of 1,050 shekels"], "1 payment of 1,050 shekels", 9),

  // Level 10: combined real-life finance scenarios.
  financialLiteracyQuestion("You exchange 200 dollars at 3.5 shekels per dollar and pay a 20-shekel fee. How many shekels do you receive?", ["680 shekels", "700 shekels", "720 shekels", "750 shekels"], "680 shekels", 10),
  financialLiteracyQuestion("An item costs 500 shekels, gets a 30% discount, and then 20% tax is added to the discounted price. What is the final price?", ["350 shekels", "400 shekels", "420 shekels", "450 shekels"], "420 shekels", 10),
  financialLiteracyQuestion("A loan has 12 payments of 300 shekels plus a 150-shekel setup fee. What is the total cost?", ["3,450 shekels", "3,600 shekels", "3,750 shekels", "3,900 shekels"], "3,750 shekels", 10),
  financialLiteracyQuestion("A savings account grows from 2,000 shekels to 2,205 shekels after 2 years. How much growth was added?", ["105 shekels", "205 shekels", "220 shekels", "405 shekels"], "205 shekels", 10),
  financialLiteracyQuestion("A family earns 5,000 shekels. They spend 50% on needs, 30% on wants, and save the rest. How much do they save?", ["500 shekels", "750 shekels", "1,000 shekels", "1,500 shekels"], "1,000 shekels", 10),
  financialLiteracyQuestion("A product worth 2,000 shekels loses 40% of its value. What is the new value?", ["800 shekels", "1,000 shekels", "1,200 shekels", "1,600 shekels"], "1,200 shekels", 10),
  financialLiteracyQuestion("Which is the strongest reason to compare total loan cost, not just monthly payment?", ["A lower monthly payment can still cost more overall", "Monthly payments are never real", "All loans cost the same", "Fees only matter for toys"], "A lower monthly payment can still cost more overall", 10),
  financialLiteracyQuestion("A project costs 3,600 shekels in 9 months. How much should be saved each month?", ["300 shekels", "350 shekels", "400 shekels", "450 shekels"], "400 shekels", 10),
  financialLiteracyQuestion("You invest in only one company. What risk is higher than if you diversify?", ["One bad result can hurt all your investment", "You will always earn more", "Your money cannot lose value", "Fees become impossible"], "One bad result can hurt all your investment", 10),
  financialLiteracyQuestion("A 1,200-shekel item has a 15% discount. How much is the discount?", ["120 shekels", "150 shekels", "180 shekels", "240 shekels"], "180 shekels", 10),
  financialLiteracyQuestion("You exchange 300 dollars at 3.4 shekels per dollar and pay a 30-shekel fee. How many shekels do you receive?", ["960 shekels", "990 shekels", "1,020 shekels", "1,050 shekels"], "990 shekels", 10),
  financialLiteracyQuestion("An item costs 800 shekels, gets a 25% discount, and then 20% tax is added to the discounted price. What is the final price?", ["600 shekels", "680 shekels", "720 shekels", "760 shekels"], "720 shekels", 10),
  financialLiteracyQuestion("A loan has 24 payments of 180 shekels plus a 200-shekel setup fee. What is the total cost?", ["4,320 shekels", "4,420 shekels", "4,520 shekels", "4,700 shekels"], "4,520 shekels", 10),
  financialLiteracyQuestion("A savings account grows from 5,000 shekels to 5,525 shekels. How much growth was added?", ["425 shekels", "500 shekels", "525 shekels", "625 shekels"], "525 shekels", 10),
  financialLiteracyQuestion("A family earns 8,000 shekels. They spend 55% on needs, 25% on wants, and save the rest. How much do they save?", ["1,200 shekels", "1,400 shekels", "1,600 shekels", "2,000 shekels"], "1,600 shekels", 10),
  financialLiteracyQuestion("A product worth 3,000 shekels loses 35% of its value. What is the new value?", ["1,650 shekels", "1,800 shekels", "1,950 shekels", "2,100 shekels"], "1,950 shekels", 10),
  financialLiteracyQuestion("Loan A costs 400 shekels per month for 10 months. Loan B costs 350 shekels per month for 12 months. Which loan costs less overall?", ["Loan A", "Loan B", "They cost the same", "There is not enough information"], "Loan A", 10),
  financialLiteracyQuestion("A project costs 7,200 shekels in 18 months. How much should be saved each month?", ["300 shekels", "350 shekels", "400 shekels", "450 shekels"], "400 shekels", 10),
  financialLiteracyQuestion("You put all your savings into one investment instead of several. What risk is higher?", ["One bad result can hurt all of the savings", "The savings cannot lose value", "Fees become impossible", "Returns are guaranteed"], "One bad result can hurt all of the savings", 10),
  financialLiteracyQuestion("A 2,400-shekel item has a 20% discount. How much is the discount?", ["240 shekels", "360 shekels", "480 shekels", "600 shekels"], "480 shekels", 10),
];

// Practical literacy expansion: real checkout totals, receipt checks, and account comparisons.
FINANCIAL_LITERACY_QUESTIONS.push(
  // Unit price and total cost.
  financialLiteracyQuestion(
    "You need 6 yogurt cups. Store A charges 30 shekels with free delivery. Store B charges 27 shekels plus 5 shekels delivery. Which has the lower total cost?",
    ["Store A: 30 shekels", "Store B: 27 shekels", "Store B: 32 shekels", "They both cost 30 shekels"],
    "Store A: 30 shekels",
    3
  ),
  financialLiteracyQuestion(
    "Two bags of the same rice cost 12 shekels for 500 g and 16.50 shekels for 750 g. Which has the lower price per 100 g?",
    ["The 500 g bag at 2.40 shekels per 100 g", "The 750 g bag at 2.20 shekels per 100 g", "They have the same unit price", "The 750 g bag at 3 shekels per 100 g"],
    "The 750 g bag at 2.20 shekels per 100 g",
    5
  ),
  financialLiteracyQuestion(
    "You need exactly 12 rolls of paper. Which option has the lowest total cost?",
    ["Three 4-packs at 14 shekels each", "Two 6-packs at 19 shekels each", "One 12-pack at 40 shekels", "Twelve single rolls at 3.50 shekels each"],
    "Two 6-packs at 19 shekels each",
    6
  ),
  financialLiteracyQuestion(
    "You need 3 notebooks. One notebook costs 9 shekels, or the multi-buy offer is 3 for 24 shekels. How much do you save with the offer?",
    ["3 shekels", "6 shekels", "9 shekels", "24 shekels"],
    "3 shekels",
    4
  ),
  financialLiteracyQuestion(
    "An online jacket costs 90 shekels, is 20% off, and has an 8-shekel delivery fee. What is the delivered cost?",
    ["72 shekels", "80 shekels", "82 shekels", "98 shekels"],
    "80 shekels",
    6
  ),
  financialLiteracyQuestion(
    "You need 2 bottles of shampoo. Shop A charges 28 shekels each plus 8 shekels delivery. Shop B offers 2 for 60 shekels with free delivery. Which is cheaper, and by how much?",
    ["Shop A by 4 shekels", "Shop B by 4 shekels", "Shop B by 8 shekels", "They cost the same"],
    "Shop B by 4 shekels",
    7
  ),

  // Receipts and transaction checking.
  financialLiteracyQuestion(
    "You bought 3 juices, but the receipt lists a quantity of 4. Which part of the receipt is incorrect?",
    ["The item quantity", "The payment method", "The store address", "The receipt date"],
    "The item quantity",
    3
  ),
  financialLiteracyQuestion(
    "A notebook was marked 18 shekels on the shelf, but the receipt charges 21 shekels for one notebook. What should you check with the cashier?",
    ["The notebook's charged price", "The number of receipt lines", "The time the store opened", "The color of the price tag"],
    "The notebook's charged price",
    4
  ),
  financialLiteracyQuestion(
    "A receipt shows a 58-shekel subtotal, a 10-shekel coupon, and a 7-shekel delivery fee. What should the final total be?",
    ["41 shekels", "48 shekels", "55 shekels", "75 shekels"],
    "55 shekels",
    5
  ),
  financialLiteracyQuestion(
    "A receipt has an 80-shekel subtotal and says 10% tax is added. What total should appear?",
    ["82 shekels", "88 shekels", "90 shekels", "96 shekels"],
    "88 shekels",
    6
  ),
  financialLiteracyQuestion(
    "Your total is 67 shekels. You pay 100 shekels and receive 23 shekels change. What is wrong?",
    ["The change is 10 shekels too little", "The change is 10 shekels too much", "The change is correct", "The total should be 77 shekels"],
    "The change is 10 shekels too little",
    5
  ),
  financialLiteracyQuestion(
    "Your bank activity shows the same 32-shekel card purchase twice at the same shop and time, but you bought only once. What should you report?",
    ["A possible duplicate transaction", "A missing cash withdrawal", "An incorrect account name", "A late delivery"],
    "A possible duplicate transaction",
    7
  ),

  // Bank fees and simple interest.
  financialLiteracyQuestion(
    "A savings account pays 3% simple interest per year. How much interest does 1,000 shekels earn in 2 years?",
    ["30 shekels", "60 shekels", "90 shekels", "1,060 shekels"],
    "60 shekels",
    6
  ),
  financialLiteracyQuestion(
    "Account A charges 4 shekels each month. Account B charges 40 shekels once per year. Which costs less over one year, and by how much?",
    ["Account A by 8 shekels", "Account B by 8 shekels", "Account B by 40 shekels", "They cost the same"],
    "Account B by 8 shekels",
    7
  ),
  financialLiteracyQuestion(
    "You keep 1,000 shekels for one year. Account A pays 2% interest with no fee. Account B pays 3% interest but charges a 15-shekel yearly fee. Which gives the higher net gain?",
    ["Account A by 5 shekels", "Account B by 5 shekels", "Account B by 15 shekels", "They give the same net gain"],
    "Account A by 5 shekels",
    8
  ),
  financialLiteracyQuestion(
    "An account charges a 7-shekel maintenance fee every month. How much do the fees total in one year?",
    ["49 shekels", "70 shekels", "77 shekels", "84 shekels"],
    "84 shekels",
    6
  ),
  financialLiteracyQuestion(
    "An account starts at 200 shekels. No money is added or spent, but it ends the month at 194 shekels. What most likely explains the difference?",
    ["A 6-shekel account fee", "A 6-shekel interest payment", "A 194-shekel deposit", "A 200-shekel purchase"],
    "A 6-shekel account fee",
    5
  ),
  financialLiteracyQuestion(
    "You expect to keep an average balance of 600 shekels for one year. Account A has no fee and pays no interest. Account B pays 1% yearly interest but charges 5 shekels per month. Which costs you less overall?",
    ["Account A", "Account B", "They have the same net cost", "There is not enough information"],
    "Account A",
    9
  )
);

const FINANCIAL_CURRENCY_FACTS = [
  { country: "Israel", currency: "shekel", code: "ILS" },
  { country: "United States", currency: "dollar", code: "USD" },
  { country: "United Kingdom", currency: "pound", code: "GBP" },
  { country: "Japan", currency: "yen", code: "JPY" },
  { country: "China", currency: "yuan", code: "CNY" },
  { country: "India", currency: "rupee", code: "INR" },
  { country: "Mexico", currency: "peso", code: "MXN" },
  { country: "Brazil", currency: "real", code: "BRL" },
  { country: "South Africa", currency: "rand", code: "ZAR" },
  { country: "Nigeria", currency: "naira", code: "NGN" },
  { country: "Turkey", currency: "lira", code: "TRY" },
  { country: "Switzerland", currency: "franc", code: "CHF" },
  { country: "European Union countries such as Germany and France", currency: "euro", code: "EUR" },
  { country: "United Arab Emirates", currency: "dirham", code: "AED" },
];

const FINANCIAL_UNIQUE_CURRENCY_FACTS = FINANCIAL_CURRENCY_FACTS.filter(
  (entry, index, entries) => entries.findIndex((candidate) => candidate.currency === entry.currency) === index
);

const FINANCIAL_NEEDS = ["water", "healthy food", "medicine", "a safe place to live", "warm clothing", "school supplies"];
const FINANCIAL_WANTS = ["extra candy", "a toy drone", "a game console", "stickers", "a fancy backpack", "a new video game"];
const FINANCIAL_VALUE_ITEMS = ["apples", "pencils", "notebooks", "markers", "juice boxes", "erasers", "stickers", "snack bars"];
const FINANCIAL_PURCHASE_TEMPLATES = [
  { items: ["a notebook", "a pencil case"], prices: [18, 27] },
  { items: ["lunch", "juice"], prices: [24, 11] },
  { items: ["a book", "a bookmark"], prices: [35, 8] },
  { items: ["a bus card", "a snack"], prices: [18, 9] },
  { items: ["a puzzle", "markers"], prices: [42, 28] },
  { items: ["a game", "a drink"], prices: [65, 10] },
];
const FINANCIAL_GROCERY_ITEMS = [
  { singular: "apple", plural: "apples" },
  { singular: "banana", plural: "bananas" },
  { singular: "juice box", plural: "juice boxes" },
  { singular: "yogurt cup", plural: "yogurt cups" },
  { singular: "snack bar", plural: "snack bars" },
  { singular: "roll", plural: "rolls" },
  { singular: "pita", plural: "pitas" },
  { singular: "cucumber", plural: "cucumbers" },
  { singular: "cheese stick", plural: "cheese sticks" },
];
const FINANCIAL_BACKPACK_ITEMS = [
  { item: "water bottle", price: 8, priority: "need", clue: "staying hydrated" },
  { item: "sandwich", price: 14, priority: "need", clue: "lunch" },
  { item: "bus card", price: 12, priority: "need", clue: "getting home" },
  { item: "notebook", price: 10, priority: "need", clue: "class notes" },
  { item: "rain poncho", price: 9, priority: "need", clue: "rainy forecast" },
  { item: "map printout", price: 4, priority: "need", clue: "finding the meeting point" },
  { item: "bandage pack", price: 6, priority: "need", clue: "small first-aid need" },
  { item: "extra candy", price: 11, priority: "want", clue: "treat" },
  { item: "sticker pack", price: 7, priority: "want", clue: "decoration" },
  { item: "toy keychain", price: 13, priority: "want", clue: "souvenir" },
  { item: "arcade card", price: 18, priority: "want", clue: "game time" },
  { item: "fancy pen", price: 16, priority: "want", clue: "style upgrade" },
  { item: "comic book", price: 15, priority: "want", clue: "extra entertainment" },
  { item: "mini puzzle", price: 17, priority: "want", clue: "optional game" },
];
const FINANCIAL_CASH_DENOMINATIONS = [50, 20, 10, 5, 2, 1];

function createFinancialLiteracyGeneratedEntry(difficulty) {
  const level = clampFinancialDifficulty(difficulty);
  const generatorsByDifficulty = {
    1: [createFinancialGroceryShelfQuestion, createFinancialNeedWantQuestion, createFinancialSavingsQuestion, createFinancialSpendingQuestion, createFinancialCurrencyQuestion, createFinancialBackpackQuestion, createFinancialChangeMakingQuestion, createFinancialGoalThermometerQuestion, createFinancialBestValueQuestion, createFinancialBudgetConceptQuestion],
    2: [createFinancialGroceryShelfQuestion, createFinancialNeedWantQuestion, createFinancialSavingsQuestion, createFinancialSpendingQuestion, createFinancialGoalQuestion, createFinancialBackpackQuestion, createFinancialChangeMakingQuestion, createFinancialReceiptDetectiveQuestion, createFinancialCurrencyQuestion, createFinancialBudgetConceptQuestion],
    3: [createFinancialGroceryShelfQuestion, createFinancialCurrencyQuestion, createFinancialSavingsQuestion, createFinancialSpendingQuestion, createFinancialBestValueQuestion, createFinancialDiscountQuestion, createFinancialChangeMakingQuestion, createFinancialGoalThermometerQuestion, createFinancialReceiptDetectiveQuestion, createFinancialOpportunityCostQuestion],
    4: [createFinancialGroceryShelfQuestion, createFinancialCurrencyCodeQuestion, createFinancialSpendingQuestion, createFinancialBestValueQuestion, createFinancialDiscountQuestion, createFinancialSaleSignDecoderQuestion, createFinancialReceiptDetectiveQuestion, createFinancialPlanComparisonQuestion, createFinancialBudgetPercentQuestion],
    5: [createFinancialGroceryShelfQuestion, createFinancialCurrencyCodeQuestion, createFinancialBestValueQuestion, createFinancialDiscountQuestion, createFinancialSaleSignDecoderQuestion, createFinancialReceiptDetectiveQuestion, createFinancialPlanComparisonQuestion, createFinancialSpendingQuestion, createFinancialSubscriptionTrapQuestion, createFinancialTaxQuestion],
    6: [createFinancialGroceryShelfQuestion, createFinancialNetIncomeQuestion, createFinancialSimpleInterestQuestion, createFinancialSubscriptionQuestion, createFinancialGoalQuestion, createFinancialSaleSignDecoderQuestion, createFinancialReceiptDetectiveQuestion, createFinancialSubscriptionTrapQuestion, createFinancialDiscountQuestion, createFinancialSafetyQuestion, createFinancialFixedExpenseQuestion],
    7: [createFinancialGroceryShelfQuestion, createFinancialLoanInterestQuestion, createFinancialSubscriptionQuestion, createFinancialInflationQuestion, createFinancialNetIncomeQuestion, createFinancialRiskQuestion, createFinancialUnitPriceQuestion, createFinancialReceiptDetectiveQuestion, createFinancialSubscriptionTrapQuestion, createFinancialBudgetPercentQuestion],
    8: [createFinancialGroceryShelfQuestion, createFinancialCompoundInterestQuestion, createFinancialFeeQuestion, createFinancialBudgetPercentQuestion, createFinancialExchangeQuestion, createFinancialTaxQuestion, createFinancialReceiptDetectiveQuestion, createFinancialSubscriptionTrapQuestion, createFinancialRiskQuestion, createFinancialInflationQuestion],
    9: [createFinancialGroceryShelfQuestion, createFinancialCompoundInterestQuestion, createFinancialCreditCardInterestQuestion, createFinancialLoanPaymentQuestion, createFinancialSinkingFundQuestion, createFinancialInflationQuestion, createFinancialTaxDiscountQuestion, createFinancialReceiptDetectiveQuestion, createFinancialSubscriptionTrapQuestion, createFinancialRiskQuestion],
    10: [createFinancialGroceryShelfQuestion, createFinancialCompoundInterestQuestion, createFinancialLoanPaymentQuestion, createFinancialBudgetPercentQuestion, createFinancialTaxDiscountQuestion, createFinancialExchangeQuestion, createFinancialReceiptDetectiveQuestion, createFinancialSubscriptionTrapQuestion, createFinancialRiskQuestion, createFinancialDepreciationQuestion, createFinancialSubscriptionQuestion],
  };

  return randomFinancialChoice(generatorsByDifficulty[level])(level);
}

function createFinancialGroceryShelfQuestion(difficulty) {
  if (difficulty >= 5 && Math.random() < 0.55) {
    return createFinancialGrocerySaleShelfQuestion(difficulty);
  }

  const item = randomFinancialChoice(FINANCIAL_GROCERY_ITEMS);
  const counts = shuffleFinancialArray(difficulty <= 2 ? [2, 3, 4, 5] : [3, 4, 5, 6]);
  const unitPrices = shuffleFinancialArray(difficulty >= 7 ? [4, 5, 6, 7] : difficulty >= 4 ? [3, 4, 5, 6] : [2, 3, 4, 5]);
  const labels = ["A", "B", "C", "D"];
  const deals = counts.map((count, index) => ({
    label: labels[index],
    itemText: count === 1 ? item.singular : item.plural,
    count,
    price: count * unitPrices[index],
    unitPrice: unitPrices[index],
  }));
  const answerDeal = deals.reduce((best, deal) => (deal.unitPrice < best.unitPrice ? deal : best));
  const answer = `${answerDeal.label}: ${answerDeal.count} ${answerDeal.itemText} for ${formatFinancialShekels(answerDeal.price)}`;

  return financialLiteracyQuestion(
    "Best Deal Grocery Shelf: same quality items. Which deal has the lowest price for one item?",
    deals.map((deal) => `${deal.label}: ${deal.count} ${deal.itemText} for ${formatFinancialShekels(deal.price)}`),
    answer,
    difficulty,
    {
      visualHtml: buildFinancialShelfHtml("Grocery shelf", deals.map((deal) => [deal.label, `${deal.count} ${deal.itemText}`, formatFinancialShekels(deal.price)]), ["Deal", "Size", "Shelf price"]),
      visualSummary: deals.map((deal) => `${deal.label}: ${deal.count} for ${formatFinancialShekels(deal.price)}`).join("; "),
      reviewText: `${answer} costs ${formatFinancialShekels(answerDeal.unitPrice)} per item.`,
    }
  );
}

function createFinancialGrocerySaleShelfQuestion(difficulty) {
  const item = randomFinancialChoice(["granola bar", "yogurt cup", "juice box", "notebook", "marker"]);
  const basePrice = randomFinancialChoice(difficulty >= 8 ? [12, 15, 20, 24] : [6, 8, 10, 12]);
  const fourPackDiscount = randomFinancialChoice([2, 4, 6]);
  const deals = [
    {
      label: "A",
      text: `1 ${item} at ${formatFinancialShekels(basePrice)} each`,
      quantity: 1,
      total: basePrice,
    },
    {
      label: "B",
      text: `20% off 1 ${item} priced ${formatFinancialShekels(basePrice + 5)}`,
      quantity: 1,
      total: (basePrice + 5) * 0.8,
    },
    {
      label: "C",
      text: `Buy 2, get 1 free at ${formatFinancialShekels(basePrice - 1)} each`,
      quantity: 3,
      total: (basePrice - 1) * 2,
    },
    {
      label: "D",
      text: `4-pack for ${formatFinancialShekels(basePrice * 4 - fourPackDiscount)}`,
      quantity: 4,
      total: basePrice * 4 - fourPackDiscount,
    },
  ];
  const rankedDeals = deals.map((deal) => ({ ...deal, unitPrice: deal.total / deal.quantity }));
  const answerDeal = rankedDeals.reduce((best, deal) => (deal.unitPrice < best.unitPrice ? deal : best));
  const answer = `${answerDeal.label}: ${answerDeal.text}`;

  return financialLiteracyQuestion(
    "Best Deal Grocery Shelf: compare the sale signs. Which deal has the lowest price for one item?",
    rankedDeals.map((deal) => `${deal.label}: ${deal.text}`),
    answer,
    difficulty,
    {
      visualHtml: buildFinancialShelfHtml("Sale shelf", rankedDeals.map((deal) => [deal.label, deal.text, `${formatFinancialShekels(deal.total)} total`]), ["Deal", "Sale sign", "Cost before tax"]),
      visualSummary: rankedDeals.map((deal) => `${deal.label}: ${deal.text}`).join("; "),
      reviewText: `${answer} is lowest at about ${formatFinancialShekels(answerDeal.unitPrice)} per item.`,
    }
  );
}

function createFinancialBackpackQuestion(difficulty) {
  const needItems = shuffleFinancialArray(FINANCIAL_BACKPACK_ITEMS.filter((item) => item.priority === "need")).slice(0, 3);
  const wantItems = shuffleFinancialArray(FINANCIAL_BACKPACK_ITEMS.filter((item) => item.priority === "want")).slice(0, 3);
  const choices = shuffleFinancialArray([...needItems, ...wantItems]);
  const budget = needItems.reduce((sum, item) => sum + item.price, 0) + (difficulty >= 3 ? 4 : 0);
  const answerIndexes = choices
    .map((item, index) => (item.priority === "need" ? index : -1))
    .filter((index) => index >= 0);
  const answerLabel = needItems.map((item) => item.item).join(", ");

  return financialInteractiveQuestion({
    difficulty,
    question: `Needs/Wants Backpack: pack the needed trip items without going over ${formatFinancialShekels(budget)}.`,
    answerLabel,
    visualHtml: buildFinancialShelfHtml("Backpack choices", choices.map((item) => [item.item, formatFinancialShekels(item.price), item.clue]), ["Item", "Price", "Clue"]),
    visualSummary: choices.map((item) => `${item.item}: ${formatFinancialShekels(item.price)} (${item.clue})`).join("; "),
    reviewText: `The needed items cost ${formatFinancialShekels(needItems.reduce((sum, item) => sum + item.price, 0))}: ${answerLabel}.`,
    interactive: {
      layout: "part-select",
      prompt: "Tap the items that are needs for the trip.",
      minSelected: answerIndexes.length,
      maxSelected: answerIndexes.length,
      answerIndexes,
      parts: choices.map((item) => ({
        label: item.item,
        summary: `${item.item}: ${formatFinancialShekels(item.price)}`,
      })),
    },
  });
}

function createFinancialChangeMakingQuestion(difficulty) {
  const cases = difficulty <= 2
    ? [
        { price: 15, paid: 20, answer: [5] },
        { price: 17, paid: 20, answer: [2, 1] },
        { price: 13, paid: 20, answer: [5, 2] },
      ]
    : difficulty <= 5
      ? [
          { price: 34, paid: 50, answer: [10, 5, 1] },
          { price: 47, paid: 60, answer: [10, 2, 1] },
          { price: 68, paid: 100, answer: [20, 10, 2] },
        ]
      : [
          { price: 118, paid: 200, answer: [50, 20, 10, 2] },
          { price: 137, paid: 200, answer: [50, 10, 2, 1] },
          { price: 245, paid: 300, answer: [50, 5] },
        ];
  const entry = randomFinancialChoice(cases);
  const change = entry.paid - entry.price;
  const answerTokens = entry.answer.map(formatFinancialCashToken);
  const choices = buildFinancialCashChoices(entry.answer);
  const answerIndexes = choices
    .map((choice, index) => (answerTokens.includes(choice.token) ? index : -1))
    .filter((index) => index >= 0);

  return financialInteractiveQuestion({
    difficulty,
    question: `Change-Making Cash Register: an item costs ${formatFinancialShekels(entry.price)}. You pay ${formatFinancialShekels(entry.paid)}. Tap the bills or coins for the change.`,
    answerLabel: answerTokens.join(" + "),
    visualHtml: buildFinancialReceiptHtml("Cash register", [["Price", formatFinancialShekels(entry.price)], ["Paid", formatFinancialShekels(entry.paid)], ["Change", formatFinancialShekels(change)]]),
    visualSummary: `Price ${formatFinancialShekels(entry.price)}, paid ${formatFinancialShekels(entry.paid)}, change ${formatFinancialShekels(change)}.`,
    reviewText: `The change is ${formatFinancialShekels(change)}: ${answerTokens.join(" + ")}.`,
    interactive: {
      layout: "part-select",
      prompt: `Make exactly ${formatFinancialShekels(change)} in change.`,
      minSelected: answerIndexes.length,
      maxSelected: answerIndexes.length,
      answerIndexes,
      parts: choices.map((choice) => ({ label: choice.token, summary: choice.token })),
    },
  });
}

function createFinancialSaleSignDecoderQuestion(difficulty) {
  const price = randomFinancialChoice(difficulty >= 6 ? [30, 45, 60, 90] : [12, 15, 20, 24]);
  const quantity = randomFinancialChoice([3, 4]);
  const percentOff = randomFinancialChoice([10, 20, 25, 50]);
  const percentTotal = price * quantity * (1 - percentOff / 100);
  const bundleFreeCount = quantity >= 3 ? 1 : 0;
  const bundleTotal = price * (quantity - bundleFreeCount);
  const answer =
    percentTotal < bundleTotal
      ? `${percentOff}% off`
      : bundleTotal < percentTotal
        ? `Buy ${quantity - bundleFreeCount}, get ${bundleFreeCount} free`
        : "They cost the same";

  return financialLiteracyQuestion(
    `Sale Sign Decoder: you need ${quantity} items at ${formatFinancialShekels(price)} each. Which sale costs less before tax?`,
    buildFinancialOptions(answer, [
      `${percentOff}% off`,
      `Buy ${quantity - bundleFreeCount}, get ${bundleFreeCount} free`,
      "No sale",
      "The highest original price",
    ].filter((option) => option !== answer)),
    answer,
    difficulty,
    {
      visualHtml: buildFinancialShelfHtml("Sale signs", [["Percent sale", `${percentOff}% off`, formatFinancialShekels(percentTotal)], ["Bundle sale", `Pay for ${quantity - bundleFreeCount} of ${quantity}`, formatFinancialShekels(bundleTotal)]], ["Option", "Sign", "Cost"]),
      visualSummary: `${percentOff}% off costs ${formatFinancialShekels(percentTotal)}; bundle costs ${formatFinancialShekels(bundleTotal)}.`,
      reviewText: `The lower total is ${answer}.`,
    }
  );
}

function createFinancialSubscriptionTrapQuestion(difficulty) {
  const monthly = randomFinancialChoice(difficulty >= 8 ? [19, 29, 49, 79] : [8, 12, 15, 20]);
  const months = difficulty >= 7 ? 12 : randomFinancialChoice([3, 6, 12]);
  const budgetItems = [
    { label: "Music app", cost: `${formatFinancialShekels(monthly)} each month`, recurring: true },
    { label: "Book", cost: formatFinancialShekels(monthly + 6), recurring: false },
    { label: "Snack", cost: formatFinancialShekels(9), recurring: false },
    { label: "Art set", cost: formatFinancialShekels(monthly * 2), recurring: false },
  ];
  const answerIndex = budgetItems.findIndex((item) => item.recurring);

  return financialInteractiveQuestion({
    difficulty,
    question: "Subscription Trap: which budget item keeps charging again and again?",
    answerLabel: `${budgetItems[answerIndex].label}: ${formatFinancialShekels(monthly * months)} over ${months} months`,
    visualHtml: buildFinancialShelfHtml("Pretend budget", budgetItems.map((item) => [item.label, item.cost]), ["Item", "Cost"]),
    visualSummary: budgetItems.map((item) => `${item.label}: ${item.cost}`).join("; "),
    reviewText: `${budgetItems[answerIndex].label} is recurring, so ${formatFinancialShekels(monthly)} each month costs ${formatFinancialShekels(monthly * months)} over ${months} months.`,
    interactive: {
      layout: "option-select",
      prompt: "Tap the recurring cost.",
      answerIndexes: [answerIndex],
      choices: budgetItems.map((item) => ({
        label: item.label,
        summary: `${item.label}: ${item.cost}`,
      })),
    },
  });
}

function createFinancialGoalThermometerQuestion(difficulty) {
  const weekly = randomFinancialChoice(difficulty >= 6 ? [20, 25, 30, 40, 50] : [5, 10, 15, 20]);
  const weeks = randomFinancialChoice(difficulty >= 6 ? [6, 8, 10, 12] : [3, 4, 5, 6]);
  const saved = randomFinancialChoice(difficulty >= 6 ? [40, 60, 80, 100] : [5, 10, 15, 20]);
  const goal = saved + weekly * weeks;
  const percent = Math.round((saved / goal) * 100);

  return financialLiteracyQuestion(
    `Goal Thermometer: you have ${formatFinancialShekels(saved)} saved for a goal of ${formatFinancialShekels(goal)}. If you save ${formatFinancialShekels(weekly)} each week, how many more weeks are needed?`,
    buildFinancialOptions(`${weeks} weeks`, makeFinancialNumberWordDistractors(weeks, "weeks")),
    `${weeks} weeks`,
    difficulty,
    {
      visualHtml: buildFinancialThermometerHtml(percent, saved, goal),
      visualSummary: `${formatFinancialShekels(saved)} saved out of ${formatFinancialShekels(goal)}.`,
      reviewText: `${formatFinancialShekels(goal - saved)} left divided by ${formatFinancialShekels(weekly)} per week is ${weeks} weeks.`,
    }
  );
}

function createFinancialReceiptDetectiveQuestion(difficulty) {
  const itemA = randomFinancialChoice([
    ["Notebook", 18],
    ["Book", 35],
    ["Lunch", 24],
    ["Markers", 28],
    ["Water bottle", 32],
    ["Headphones", 45],
    ["Art pad", 22],
  ]);
  const itemB = randomFinancialChoice([
    ["Pencil", 7],
    ["Juice", 11],
    ["Bookmark", 8],
    ["Bus card", 18],
    ["Eraser", 5],
    ["Snack", 9],
    ["Sticker sheet", 6],
  ]);
  const discount = difficulty >= 4 ? randomFinancialChoice([0, 5, 10, 15]) : 0;
  const tax = difficulty >= 6 ? randomFinancialChoice([0, 5, 10]) : 0;
  const subtotal = itemA[1] + itemB[1];
  const afterDiscount = subtotal - discount;
  const taxAmount = (afterDiscount * tax) / 100;
  const total = afterDiscount + taxAmount;
  const questionType = randomFinancialChoice(tax ? ["total", "tax", "discount"] : discount ? ["total", "discount"] : ["total"]);
  const answers = {
    total: formatFinancialShekels(total),
    tax: formatFinancialShekels(taxAmount),
    discount: formatFinancialShekels(discount),
  };
  const prompts = {
    total: "What should the receipt total be?",
    tax: "How much tax was added?",
    discount: "How much was subtracted as a discount?",
  };

  return financialLiteracyQuestion(
    `Receipt Detective: ${prompts[questionType]}`,
    buildFinancialMoneyOptions(Number(answers[questionType].split(" ")[0]), [5, 10, -5, -10, subtotal]),
    answers[questionType],
    difficulty,
    {
      visualHtml: buildFinancialReceiptHtml("Receipt", [
        [itemA[0], formatFinancialShekels(itemA[1])],
        [itemB[0], formatFinancialShekels(itemB[1])],
        ["Subtotal", formatFinancialShekels(subtotal)],
        ["Discount", `-${formatFinancialShekels(discount)}`],
        ["Tax", formatFinancialShekels(taxAmount)],
      ]),
      visualSummary: `${itemA[0]} ${formatFinancialShekels(itemA[1])}; ${itemB[0]} ${formatFinancialShekels(itemB[1])}; discount ${formatFinancialShekels(discount)}; tax ${formatFinancialShekels(taxAmount)}.`,
      reviewText: `The correct ${questionType} is ${answers[questionType]}.`,
    }
  );
}

function createFinancialCurrencyQuestion(difficulty) {
  const entry = randomFinancialChoice(FINANCIAL_CURRENCY_FACTS);
  if (Math.random() < 0.5) {
    const distractors = shuffleFinancialArray(uniqueFinancialStrings(FINANCIAL_CURRENCY_FACTS.filter((item) => item.currency !== entry.currency).map((item) => item.currency))).slice(0, 3);
    return financialLiteracyQuestion(`What currency is used in ${formatFinancialCurrencyCountry(entry.country)}?`, buildFinancialOptions(entry.currency, distractors), entry.currency, difficulty);
  }

  const reverseEntry = randomFinancialChoice(FINANCIAL_UNIQUE_CURRENCY_FACTS);
  const distractors = shuffleFinancialArray(FINANCIAL_CURRENCY_FACTS.filter((item) => item.country !== reverseEntry.country).map((item) => item.country)).slice(0, 3);
  return financialLiteracyQuestion(`Which country or area uses the ${reverseEntry.currency}?`, buildFinancialOptions(reverseEntry.country, distractors), reverseEntry.country, difficulty);
}

function createFinancialCurrencyCodeQuestion(difficulty) {
  const entry = randomFinancialChoice(FINANCIAL_CURRENCY_FACTS);
  if (Math.random() < 0.5) {
    const distractors = shuffleFinancialArray(uniqueFinancialStrings(FINANCIAL_CURRENCY_FACTS.filter((item) => item.code !== entry.code).map((item) => item.code))).slice(0, 3);
    return financialLiteracyQuestion(`Which currency code is used in ${formatFinancialCurrencyCountry(entry.country)} for the ${entry.currency}?`, buildFinancialOptions(entry.code, distractors), entry.code, difficulty);
  }

  const distractors = shuffleFinancialArray(uniqueFinancialStrings(FINANCIAL_CURRENCY_FACTS.filter((item) => item.currency !== entry.currency).map((item) => item.currency))).slice(0, 3);
  return financialLiteracyQuestion(`Which currency does the code ${entry.code} mean?`, buildFinancialOptions(entry.currency, distractors), entry.currency, difficulty);
}

function createFinancialNeedWantQuestion(difficulty) {
  const answer = randomFinancialChoice(FINANCIAL_NEEDS);
  return financialLiteracyQuestion(
    randomFinancialChoice(["Which is more like a need than a want?", "Which item is a need, not a want?", "Which thing is something people really need?"]),
    buildFinancialOptions(answer, shuffleFinancialArray(FINANCIAL_WANTS).slice(0, 3)),
    answer,
    difficulty
  );
}

function createFinancialSavingsQuestion(difficulty) {
  const weekly = randomFinancialChoice(difficulty >= 6 ? [15, 18, 20, 25, 30, 40] : difficulty >= 4 ? [8, 10, 12, 15, 18, 20] : [5, 6, 8, 10, 12, 15]);
  const weeks = randomFinancialChoice(difficulty <= 2 ? [2, 3, 4] : difficulty <= 5 ? [4, 5, 6, 8] : [6, 8, 10, 12]);
  const answerValue = weekly * weeks;
  return financialLiteracyQuestion(
    `If you save ${formatFinancialShekels(weekly)} each week for ${weeks} weeks, how much will you save?`,
    buildFinancialMoneyOptions(answerValue, [weekly, weeks, weekly + weeks, weekly * 2, -weekly]),
    formatFinancialShekels(answerValue),
    difficulty
  );
}

function createFinancialSpendingQuestion(difficulty) {
  const template = randomFinancialChoice(FINANCIAL_PURCHASE_TEMPLATES);
  const reserve = randomFinancialChoice(difficulty >= 6 ? [20, 25, 30, 35, 40, 50] : difficulty >= 4 ? [12, 15, 18, 20, 25] : [10, 12, 15, 18, 20]);
  const totalSpent = template.prices.reduce((sum, price) => sum + price, 0);
  const purchases = template.items.map((item, index) => `${item} for ${formatFinancialShekels(template.prices[index])}`).join(" and ");
  return financialLiteracyQuestion(
    `You have ${formatFinancialShekels(totalSpent + reserve)}. You buy ${purchases}. How much money is left?`,
    buildFinancialMoneyOptions(reserve, [5, 10, 15, 20, -5]),
    formatFinancialShekels(reserve),
    difficulty
  );
}

function createFinancialBestValueQuestion(difficulty) {
  const item = randomFinancialChoice(FINANCIAL_VALUE_ITEMS);
  const counts = shuffleFinancialArray([2, 3, 4, 5]);
  const unitPrices = shuffleFinancialArray(difficulty >= 7 ? [5, 6, 7, 8] : difficulty >= 4 ? [4, 5, 6, 7] : difficulty === 3 ? [3, 4, 5, 6] : [2, 3, 4, 5]);
  const packs = counts.map((count, index) => ({
    text: `${count} ${item} for ${formatFinancialShekels(count * unitPrices[index])}`,
    unitPrice: unitPrices[index],
  }));
  const answer = packs.reduce((best, pack) => (pack.unitPrice < best.unitPrice ? pack : best)).text;
  return financialLiteracyQuestion(`Which ${item} deal has the lowest price per item?`, packs.map((pack) => pack.text), answer, difficulty);
}

function createFinancialUnitPriceQuestion(difficulty) {
  const count = randomFinancialChoice([3, 4, 5, 6, 8, 10, 12]);
  const unitPrice = randomFinancialChoice([3, 4, 5, 6, 7, 8, 9, 10, 12]);
  return financialLiteracyQuestion(
    `${count} notebooks cost ${formatFinancialShekels(count * unitPrice)}. What is the price per notebook?`,
    buildFinancialMoneyOptions(unitPrice, [2, 3, 4, -2, -1]),
    formatFinancialShekels(unitPrice),
    difficulty
  );
}

function createFinancialDiscountQuestion(difficulty) {
  const discount = randomFinancialChoice(difficulty >= 7 ? [10, 15, 20, 25, 30, 50] : [10, 20, 25, 50]);
  const originalPrice = randomFinancialChoice(discount === 15 ? [200, 400, 600] : discount === 30 ? [100, 200, 300] : discount === 50 ? [20, 30, 40, 60, 80, 100, 120] : [40, 50, 60, 80, 100, 120, 150, 200]);
  const answerValue = (originalPrice * (100 - discount)) / 100;
  return financialLiteracyQuestion(
    `An item costs ${formatFinancialShekels(originalPrice)} and is ${discount}% off. What is the sale price?`,
    buildFinancialMoneyOptions(answerValue, [5, 10, 15, -5, -10]),
    formatFinancialShekels(answerValue),
    difficulty
  );
}

function createFinancialPlanComparisonQuestion(difficulty) {
  const answerWeekly = randomFinancialChoice([10, 12, 15, 18, 20]);
  const plans = [
    { text: `Save ${answerWeekly} shekels each week`, total: answerWeekly * 4 },
    { text: `Save ${Math.max(5, answerWeekly - 3)} shekels each week`, total: Math.max(5, answerWeekly - 3) * 4 },
    { text: `Save ${answerWeekly + 2} shekels every 2 weeks`, total: (answerWeekly + 2) * 2 },
    { text: `Save ${answerWeekly * 2 - 2} shekels each month`, total: answerWeekly * 2 - 2 },
  ];
  const answer = plans.reduce((best, plan) => (plan.total > best.total ? plan : best)).text;
  return financialLiteracyQuestion("Which plan saves the most after 4 weeks?", plans.map((plan) => plan.text), answer, difficulty);
}

function createFinancialBudgetConceptQuestion(difficulty) {
  return financialLiteracyQuestion("What is a budget?", ["A plan for how to use money", "A way to make prices disappear", "A type of coin", "A receipt that pays itself"], "A plan for how to use money", difficulty);
}

function createFinancialOpportunityCostQuestion(difficulty) {
  return financialLiteracyQuestion("What does opportunity cost mean?", ["What you give up when you choose one option", "A price that is always free", "A code printed on money", "A coupon for every store"], "What you give up when you choose one option", difficulty);
}

function createFinancialGoalQuestion(difficulty) {
  const goal = randomFinancialChoice(difficulty >= 6 ? [240, 360, 480, 600] : [60, 80, 90, 120, 150]);
  const saved = randomFinancialChoice(difficulty >= 6 ? [60, 80, 120, 160] : [10, 20, 25, 30, 35, 40]);
  const weekly = randomFinancialChoice(difficulty >= 6 ? [20, 30, 40, 50] : [5, 10, 15, 20]);
  const remaining = Math.max(weekly, goal - saved);
  const weeks = Math.ceil(remaining / weekly);
  return financialLiteracyQuestion(
    `You want ${formatFinancialShekels(goal)} and already have ${formatFinancialShekels(goal - remaining)}. If you save ${formatFinancialShekels(weekly)} each week, how many weeks are needed?`,
    buildFinancialOptions(`${weeks} ${weeks === 1 ? "week" : "weeks"}`, makeFinancialNumberWordDistractors(weeks, "weeks")),
    `${weeks} ${weeks === 1 ? "week" : "weeks"}`,
    difficulty
  );
}

function createFinancialSubscriptionQuestion(difficulty) {
  const monthly = randomFinancialChoice(difficulty >= 8 ? [19, 29, 39, 49] : [8, 10, 12, 15, 20, 30]);
  const months = difficulty >= 8 ? 12 : randomFinancialChoice([3, 6, 8, 12]);
  const total = monthly * months;
  return financialLiteracyQuestion(
    `A subscription costs ${formatFinancialShekels(monthly)} per month. How much does it cost for ${months} months?`,
    buildFinancialMoneyOptions(total, [monthly, months, monthly * 2, -monthly, 10]),
    formatFinancialShekels(total),
    difficulty
  );
}

function createFinancialTaxQuestion(difficulty) {
  const price = randomFinancialChoice([50, 100, 200, 500]);
  const tax = randomFinancialChoice([5, 10, 20]);
  const total = price + (price * tax) / 100;
  return financialLiteracyQuestion(
    `An item costs ${formatFinancialShekels(price)} and ${tax}% tax is added. What is the total price?`,
    buildFinancialMoneyOptions(total, [tax, 10, 20, -10, -20]),
    formatFinancialShekels(total),
    difficulty
  );
}

function createFinancialNetIncomeQuestion(difficulty) {
  const income = randomFinancialChoice(difficulty >= 8 ? [1000, 1500, 2000, 3000] : [200, 300, 400, 500, 600]);
  const expenses = randomFinancialChoice(difficulty >= 8 ? [450, 700, 900, 1200] : [80, 120, 150, 210, 250]);
  const saved = income - expenses;
  return financialLiteracyQuestion(
    `You receive ${formatFinancialShekels(income)} and spend ${formatFinancialShekels(expenses)}. How much is left to save or use later?`,
    buildFinancialMoneyOptions(saved, [50, 100, -50, -100, expenses / 2]),
    formatFinancialShekels(saved),
    difficulty
  );
}

function createFinancialSimpleInterestQuestion(difficulty) {
  const principal = randomFinancialChoice([100, 200, 300, 500, 1000]);
  const rate = randomFinancialChoice([5, 10]);
  const years = randomFinancialChoice(difficulty >= 7 ? [1, 2] : [1]);
  const interest = (principal * rate * years) / 100;
  return financialLiteracyQuestion(
    `A savings account pays ${rate}% simple interest for ${years} ${years === 1 ? "year" : "years"}. If you save ${formatFinancialShekels(principal)}, how much interest do you earn?`,
    buildFinancialMoneyOptions(interest, [5, 10, 20, -5, principal / 10]),
    formatFinancialShekels(interest),
    difficulty
  );
}

function createFinancialSafetyQuestion(difficulty) {
  return financialLiteracyQuestion("What is the safest online payment habit for a child?", ["Ask a trusted adult before entering payment details", "Share card numbers in a game chat", "Click every prize link", "Save passwords on a public computer"], "Ask a trusted adult before entering payment details", difficulty);
}

function createFinancialFixedExpenseQuestion(difficulty) {
  return financialLiteracyQuestion("Which is a fixed expense?", ["A rent payment that is the same each month", "A surprise toy purchase", "A snack bought once", "A random gift"], "A rent payment that is the same each month", difficulty);
}

function createFinancialLoanInterestQuestion(difficulty) {
  const borrowed = randomFinancialChoice([200, 300, 500, 800, 1000]);
  const interest = randomFinancialChoice([20, 30, 50, 80, 100]);
  const repaid = borrowed + interest;
  return financialLiteracyQuestion(
    `You borrow ${formatFinancialShekels(borrowed)} and pay back ${formatFinancialShekels(repaid)}. How much interest did you pay?`,
    buildFinancialMoneyOptions(interest, [10, 20, borrowed, -10, 50]),
    formatFinancialShekels(interest),
    difficulty
  );
}

function createFinancialInflationQuestion(difficulty) {
  if (Math.random() < 0.5) {
    return financialLiteracyQuestion("If prices rise because of inflation, what happens to the buying power of the same amount of money?", ["It buys less than before", "It always buys more than before", "It becomes a different currency", "It cannot be spent anywhere"], "It buys less than before", difficulty);
  }

  const oldPrice = randomFinancialChoice([100, 200, 400, 500]);
  const percent = randomFinancialChoice([5, 10, 20]);
  const newPrice = oldPrice + (oldPrice * percent) / 100;
  return financialLiteracyQuestion(
    `A price rises from ${formatFinancialShekels(oldPrice)} by ${percent}%. What is the new price?`,
    buildFinancialMoneyOptions(newPrice, [oldPrice, percent, -percent, 20, -20]),
    formatFinancialShekels(newPrice),
    difficulty
  );
}

function createFinancialRiskQuestion(difficulty) {
  return financialLiteracyQuestion(
    randomFinancialChoice(["What is diversification?", "Which habit can reduce investment risk?"]),
    ["Spreading money across different places to reduce risk", "Putting all money into one risky company", "Spending everything immediately", "Ignoring all fees and receipts"],
    "Spreading money across different places to reduce risk",
    difficulty
  );
}

function createFinancialFeeQuestion(difficulty) {
  const fee = randomFinancialChoice([3, 5, 8, 10]);
  const months = randomFinancialChoice([6, 12]);
  const total = fee * months;
  return financialLiteracyQuestion(
    `An account charges a ${formatFinancialShekels(fee)} fee every month. How much is that in ${months} months?`,
    buildFinancialMoneyOptions(total, [fee, months, fee + months, -fee, 10]),
    formatFinancialShekels(total),
    difficulty
  );
}

function createFinancialBudgetPercentQuestion(difficulty) {
  const budget = randomFinancialChoice(difficulty >= 8 ? [1000, 2000, 4000, 5000] : [300, 600, 900, 1200]);
  const percent = randomFinancialChoice([10, 20, 25, 30, 50]);
  const amount = (budget * percent) / 100;
  return financialLiteracyQuestion(
    `A budget is ${formatFinancialShekels(budget)}. If ${percent}% goes to savings, how much is saved?`,
    buildFinancialMoneyOptions(amount, [percent, budget / 10, -percent, 100, -100]),
    formatFinancialShekels(amount),
    difficulty
  );
}

function createFinancialExchangeQuestion(difficulty) {
  const dollars = randomFinancialChoice([50, 100, 200]);
  const rate = randomFinancialChoice([3, 3.5, 4]);
  const fee = difficulty >= 10 ? randomFinancialChoice([10, 20, 30]) : 0;
  const shekels = dollars * rate - fee;
  const feeText = fee ? ` after a ${formatFinancialShekels(fee)} fee` : " before fees";
  return financialLiteracyQuestion(
    `You exchange ${dollars} dollars at ${rate} shekels per dollar${feeText}. How many shekels do you receive?`,
    buildFinancialMoneyOptions(shekels, [fee || 10, dollars, 20, -20, 50]),
    formatFinancialShekels(shekels),
    difficulty
  );
}

function createFinancialCompoundInterestQuestion(difficulty) {
  const cases = [
    { principal: 1000, rate: 10, years: 1, amount: 1100 },
    { principal: 1000, rate: 10, years: 2, amount: 1210 },
    { principal: 2000, rate: 5, years: 2, amount: 2205 },
    { principal: 500, rate: 10, years: 2, amount: 605 },
  ];
  const entry = randomFinancialChoice(cases.filter((item) => difficulty >= 9 || item.years === 1));
  return financialLiteracyQuestion(
    `You save ${formatFinancialShekels(entry.principal)} at ${entry.rate}% compound interest for ${entry.years} ${entry.years === 1 ? "year" : "years"}. How much do you have?`,
    buildFinancialMoneyOptions(entry.amount, [entry.principal / 10, 100, -100, 50, -50]),
    formatFinancialShekels(entry.amount),
    difficulty
  );
}

function createFinancialCreditCardInterestQuestion(difficulty) {
  const balance = randomFinancialChoice([500, 1000, 1500, 2000]);
  const rate = randomFinancialChoice([2, 3, 4]);
  const interest = (balance * rate) / 100;
  return financialLiteracyQuestion(
    `A credit card balance is ${formatFinancialShekels(balance)} and interest is ${rate}% for the month. How much interest is added?`,
    buildFinancialMoneyOptions(interest, [10, 20, balance / 10, -10, 30]),
    formatFinancialShekels(interest),
    difficulty
  );
}

function createFinancialLoanPaymentQuestion(difficulty) {
  const payment = randomFinancialChoice([200, 220, 300, 500, 750]);
  const months = randomFinancialChoice([3, 6, 10, 12]);
  const fee = difficulty >= 10 ? randomFinancialChoice([50, 100, 150]) : 0;
  const total = payment * months + fee;
  const feeText = fee ? ` plus a ${formatFinancialShekels(fee)} setup fee` : "";
  return financialLiteracyQuestion(
    `A loan has ${months} payments of ${formatFinancialShekels(payment)}${feeText}. What is the total cost?`,
    buildFinancialMoneyOptions(total, [payment, months * 10, fee || 100, -payment, 50]),
    formatFinancialShekels(total),
    difficulty
  );
}

function createFinancialSinkingFundQuestion(difficulty) {
  const goal = randomFinancialChoice([1200, 2400, 3600, 6000]);
  const months = randomFinancialChoice([6, 8, 10, 12]);
  const monthly = goal / months;
  return financialLiteracyQuestion(
    `A family wants ${formatFinancialShekels(goal)} in ${months} months. How much should they save each month?`,
    buildFinancialMoneyOptions(monthly, [50, 100, -50, months, -100]),
    formatFinancialShekels(monthly),
    difficulty
  );
}

function createFinancialTaxDiscountQuestion(difficulty) {
  const price = randomFinancialChoice([100, 200, 500, 1000]);
  const discount = randomFinancialChoice([10, 20, 30]);
  const tax = randomFinancialChoice([10, 20]);
  const total = price * (1 - discount / 100) * (1 + tax / 100);
  return financialLiteracyQuestion(
    `An item costs ${formatFinancialShekels(price)}, gets a ${discount}% discount, and then ${tax}% tax is added to the discounted price. What is the final price?`,
    buildFinancialMoneyOptions(total, [price * 0.1, 50, -50, 100, -100]),
    formatFinancialShekels(total),
    difficulty
  );
}

function createFinancialDepreciationQuestion(difficulty) {
  const price = randomFinancialChoice([500, 1000, 1200, 2000]);
  const lossPercent = randomFinancialChoice([20, 25, 40]);
  const newValue = price * (1 - lossPercent / 100);
  return financialLiteracyQuestion(
    `A product loses ${lossPercent}% of its value from ${formatFinancialShekels(price)}. What is its new value?`,
    buildFinancialMoneyOptions(newValue, [price * 0.1, 100, -100, lossPercent, 200]),
    formatFinancialShekels(newValue),
    difficulty
  );
}

function financialInteractiveQuestion({ difficulty, question, answerLabel, interactive, ...extras }) {
  const answer = String(answerLabel || "").trim();
  if (!String(question || "").trim() || !answer || !interactive || typeof interactive !== "object") {
    throw new Error("Financial interactive question is missing required fields.");
  }

  return {
    question: String(question),
    answer,
    answerLabel: answer,
    difficulty: clampFinancialDifficulty(difficulty),
    mode: "interactive",
    interactive,
    ...extras,
  };
}

function buildFinancialShelfHtml(title, rows, headers) {
  const headerHtml = headers
    .map((header) => `<th scope="col">${escapeFinancialHtml(header)}</th>`)
    .join("");
  const rowHtml = rows
    .map((row) => `<tr>${row.map((cell) => `<td>${escapeFinancialHtml(cell)}</td>`).join("")}</tr>`)
    .join("");
  return `
    <div class="financial-visual-card">
      <div class="financial-visual-title">${escapeFinancialHtml(title)}</div>
      <table class="financial-table">
        <thead><tr>${headerHtml}</tr></thead>
        <tbody>${rowHtml}</tbody>
      </table>
    </div>
  `;
}

function buildFinancialReceiptHtml(title, rows) {
  const rowHtml = rows
    .map(([label, value]) => `<tr><th scope="row">${escapeFinancialHtml(label)}</th><td>${escapeFinancialHtml(value)}</td></tr>`)
    .join("");
  return `
    <div class="financial-visual-card financial-receipt">
      <div class="financial-visual-title">${escapeFinancialHtml(title)}</div>
      <table class="financial-table">
        <tbody>${rowHtml}</tbody>
      </table>
    </div>
  `;
}

function buildFinancialThermometerHtml(percent, saved, goal) {
  const cappedPercent = Math.max(0, Math.min(100, Number(percent) || 0));
  return `
    <div class="financial-visual-card financial-thermometer-card">
      <div class="financial-visual-title">Savings goal</div>
      <div class="financial-thermometer" aria-hidden="true">
        <span class="financial-thermometer-fill" style="width: ${cappedPercent}%"></span>
      </div>
      <div class="financial-thermometer-labels">
        <span>${escapeFinancialHtml(formatFinancialShekels(saved))}</span>
        <span>${escapeFinancialHtml(formatFinancialShekels(goal))}</span>
      </div>
    </div>
  `;
}

function buildFinancialCashChoices(answerValues) {
  const answerTokens = answerValues.map(formatFinancialCashToken);
  const distractorTokens = FINANCIAL_CASH_DENOMINATIONS
    .map(formatFinancialCashToken)
    .filter((token) => !answerTokens.includes(token));
  const tokens = shuffleFinancialArray(uniqueFinancialStrings([...answerTokens, ...distractorTokens]).slice(0, 4));
  return tokens.map((token) => ({ token }));
}

function formatFinancialCashToken(value) {
  return `${value} ${value === 1 ? "shekel" : "shekels"}`;
}

function escapeFinancialHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildFinancialMoneyOptions(answerValue, preferredOffsets) {
  const answer = formatFinancialShekels(answerValue);
  const offsets = [...preferredOffsets, -500, -250, -200, -100, -50, -25, -20, -15, -10, -5, 5, 10, 15, 20, 25, 50, 100, 200, 250, 500];
  const distractors = [];

  for (const offset of offsets) {
    const candidateValue = Number(answerValue) + Number(offset);
    const candidate = formatFinancialShekels(candidateValue);
    if (candidateValue > 0 && candidate !== answer && !distractors.includes(candidate)) {
      distractors.push(candidate);
    }
    if (distractors.length === 3) {
      break;
    }
  }

  return buildFinancialOptions(answer, distractors);
}

function buildFinancialOptions(answer, distractors) {
  const normalizedAnswer = String(answer);
  const genericFallbacks = [
    "Not enough information",
    "It depends only on color",
    "The answer is always zero",
    "All choices are the same",
    "None of these",
  ];
  const options = uniqueFinancialStrings([normalizedAnswer, ...distractors, ...genericFallbacks]);

  if (options.length < 4 || !options.includes(normalizedAnswer)) {
    throw new Error(`Financial generator produced invalid options for answer ${normalizedAnswer}`);
  }

  return shuffleFinancialArray(options.slice(0, 4));
}

function makeFinancialNumberWordDistractors(answerValue, unit) {
  const singular = unit.replace(/s$/, "");
  const distractors = [];
  for (const candidate of [answerValue - 2, answerValue - 1, answerValue + 1, answerValue + 2, answerValue + 3, answerValue + 4]) {
    if (candidate > 0 && candidate !== answerValue) {
      const labelUnit = candidate === 1 ? singular : unit;
      const option = `${candidate} ${labelUnit}`;
      if (!distractors.includes(option)) {
        distractors.push(option);
      }
    }
    if (distractors.length === 3) {
      break;
    }
  }
  return distractors;
}

function formatFinancialShekels(value) {
  const rounded = Math.round(Number(value) * 100) / 100;
  const formatted = Number.isInteger(rounded)
    ? String(rounded)
    : rounded.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
  return `${formatted} ${rounded === 1 ? "shekel" : "shekels"}`;
}

function formatFinancialCurrencyCountry(country) {
  return ["Netherlands", "United Arab Emirates", "United Kingdom", "United States"].includes(country) ? `the ${country}` : country;
}

function clampFinancialDifficulty(value) {
  const level = Number.parseInt(value, 10);
  if (!Number.isFinite(level)) {
    return 3;
  }
  return Math.max(1, Math.min(10, level));
}

function randomFinancialChoice(values) {
  return values[Math.floor(Math.random() * values.length)];
}

function shuffleFinancialArray(values) {
  const copy = [...values];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function uniqueFinancialStrings(values) {
  return Array.from(new Set(values.map((value) => String(value)).filter((value) => value.trim())));
}

globalThis.FINANCIAL_LITERACY_GENERATOR_COVERAGE = {
  groceryShelf: createFinancialGroceryShelfQuestion,
  backpack: createFinancialBackpackQuestion,
  changeMaking: createFinancialChangeMakingQuestion,
  saleSign: createFinancialSaleSignDecoderQuestion,
  subscriptionTrap: createFinancialSubscriptionTrapQuestion,
  goalThermometer: createFinancialGoalThermometerQuestion,
  receiptDetective: createFinancialReceiptDetectiveQuestion,
};

globalThis.HomeworkQuestions?.register({
  id: "financial-literacy",
  label: "Financial Literacy",
  getStaticQuestions: () => FINANCIAL_LITERACY_QUESTIONS,
  generatedEntryFactory: createFinancialLiteracyGeneratedEntry,
  generatedShare: 0.85,
});
