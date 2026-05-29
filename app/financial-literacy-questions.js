function financialLiteracyQuestion(question, options, answer, difficulty) {
  const normalizedOptions = Array.from(new Set(options.map(String)));
  const normalizedAnswer = String(answer);

  if (!String(question || "").trim()) {
    throw new Error("Financial literacy question is missing question text.");
  }
  if (normalizedOptions.length !== 4 || !normalizedOptions.includes(normalizedAnswer)) {
    throw new Error(`Financial literacy question must have exactly 4 unique options including the answer: ${question}`);
  }

  return {
    question: String(question),
    options: normalizedOptions,
    answer: normalizedAnswer,
    difficulty: clampFinancialDifficulty(difficulty),
  };
}

const FINANCIAL_LITERACY_QUESTIONS = [
  // Level 1: money basics, saving, needs and wants.
  financialLiteracyQuestion("Why is saving some money helpful?", ["It helps you pay for something later", "It makes prices go down", "It means you never spend money", "It turns coins into bigger coins by magic"], "It helps you pay for something later", 1),
  financialLiteracyQuestion("You have 30 shekels and spend 10 shekels. How much money is left?", ["10 shekels", "20 shekels", "30 shekels", "40 shekels"], "20 shekels", 1),
  financialLiteracyQuestion("If you save 10 shekels each week for 4 weeks, how much will you have saved?", ["20 shekels", "30 shekels", "40 shekels", "50 shekels"], "40 shekels", 1),
  financialLiteracyQuestion("Which apple deal is the best value?", ["5 apples for 20 shekels", "3 apples for 15 shekels", "2 apples for 12 shekels", "6 apples for 30 shekels"], "5 apples for 20 shekels", 1),
  financialLiteracyQuestion("Which is more like a need than a want when packing for school?", ["Water", "A game console", "A toy drone", "Extra stickers"], "Water", 1),
  financialLiteracyQuestion("What currency is used in Israel?", ["shekel", "dollar", "euro", "pound"], "shekel", 1),
  financialLiteracyQuestion("Why is it useful to compare prices before buying?", ["You can choose the better value", "It makes the items free", "It changes the color of the product", "It makes every store the same"], "You can choose the better value", 1),
  financialLiteracyQuestion("If you spend less than you earn, what can happen to the money you keep?", ["It can grow over time", "It disappears", "It becomes homework", "It always becomes zero"], "It can grow over time", 1),
  financialLiteracyQuestion("Which choice is a want, not a need?", ["A warm coat in winter", "Medicine when sick", "Clean drinking water", "A new toy car"], "A new toy car", 1),
  financialLiteracyQuestion("You have 12 shekels. You get 8 more shekels. How much do you have now?", ["16 shekels", "18 shekels", "20 shekels", "24 shekels"], "20 shekels", 1),
  financialLiteracyQuestion("Which coin pile has the most money?", ["Two 10-shekel coins", "One 10-shekel coin", "Three 1-shekel coins", "Four 2-shekel coins"], "Two 10-shekel coins", 1),
  financialLiteracyQuestion("What should you do before buying something expensive?", ["Think if you really need it", "Buy it as fast as possible", "Ignore the price", "Throw away the receipt"], "Think if you really need it", 1),

  // Level 2: budgets, change, simple goals, and planned spending.
  financialLiteracyQuestion("Which is more like a need than a want?", ["A winter coat", "A toy robot", "Extra candy", "A new video game"], "A winter coat", 2),
  financialLiteracyQuestion("Which is the better deal for pencils?", ["3 pencils for 12 shekels", "1 pencil for 5 shekels", "2 pencils for 11 shekels", "5 pencils for 30 shekels"], "3 pencils for 12 shekels", 2),
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

  // Level 3: multi-step spending, discounts, opportunity cost, and value.
  financialLiteracyQuestion("You want a 90-shekel game. If you save 15 shekels each week, about how many weeks will it take?", ["4 weeks", "5 weeks", "6 weeks", "8 weeks"], "6 weeks", 3),
  financialLiteracyQuestion("A snack costs 8 shekels each school day for 5 days. How much is that for one week of school?", ["13 shekels", "32 shekels", "40 shekels", "48 shekels"], "40 shekels", 3),
  financialLiteracyQuestion("A shirt costs 40 shekels and is 50% off. What is the sale price?", ["10 shekels", "20 shekels", "25 shekels", "30 shekels"], "20 shekels", 3),
  financialLiteracyQuestion("A bus card costs 18 shekels and a snack costs 9 shekels. How much do 2 bus cards and 1 snack cost altogether?", ["36 shekels", "45 shekels", "54 shekels", "63 shekels"], "45 shekels", 3),
  financialLiteracyQuestion("Which plan saves the most in 3 months?", ["Save 20 shekels each month", "Save 10 shekels each week", "Save 15 shekels every 2 weeks", "Save 5 shekels each week"], "Save 10 shekels each week", 3),
  financialLiteracyQuestion("What does opportunity cost mean?", ["What you give up when you choose one thing instead of another", "A coupon that never expires", "A price that is always zero", "Money that cannot be counted"], "What you give up when you choose one thing instead of another", 3),
  financialLiteracyQuestion("Which country uses the dirham?", ["United Arab Emirates", "Saudi Arabia", "Switzerland", "Indonesia"], "United Arab Emirates", 3),
  financialLiteracyQuestion("A game costs 80 shekels and is 25% off. What is the sale price?", ["50 shekels", "55 shekels", "60 shekels", "65 shekels"], "60 shekels", 3),
  financialLiteracyQuestion("You can buy a book or a puzzle, but not both. If you choose the book, what is the opportunity cost?", ["The puzzle you did not buy", "The book you bought", "Both items become free", "The store closes"], "The puzzle you did not buy", 3),
  financialLiteracyQuestion("Which pack has the lowest price per marker?", ["4 markers for 16 shekels", "2 markers for 10 shekels", "3 markers for 15 shekels", "5 markers for 25 shekels"], "4 markers for 16 shekels", 3),
  financialLiteracyQuestion("A child earns 25 shekels for chores and spends 9 shekels. How much can be saved?", ["14 shekels", "16 shekels", "25 shekels", "34 shekels"], "16 shekels", 3),
  financialLiteracyQuestion("What is a short-term savings goal?", ["Saving for a book next month", "Saving for retirement", "Buying every candy today", "Ignoring all prices"], "Saving for a book next month", 3),

  // Level 4: percentages, longer budgets, currency codes, and receipts.
  financialLiteracyQuestion("You have 100 shekels. A book costs 35 shekels and a puzzle costs 25 shekels. How much money is left after buying both?", ["30 shekels", "35 shekels", "40 shekels", "65 shekels"], "40 shekels", 4),
  financialLiteracyQuestion("Which plan saves the most money after 2 months?", ["Save 15 shekels each week", "Save 50 shekels each month", "Save 20 shekels every 2 weeks", "Save 5 shekels each week"], "Save 15 shekels each week", 4),
  financialLiteracyQuestion("You buy 2 notebooks that cost 18 shekels each. How much change should you get from 50 shekels?", ["12 shekels", "14 shekels", "16 shekels", "18 shekels"], "14 shekels", 4),
  financialLiteracyQuestion("Which cereal is the best value?", ["500 grams for 20 shekels", "300 grams for 15 shekels", "250 grams for 14 shekels", "750 grams for 33 shekels"], "500 grams for 20 shekels", 4),
  financialLiteracyQuestion("A notebook costs 50 shekels and is 20% off. What is the sale price?", ["30 shekels", "35 shekels", "40 shekels", "45 shekels"], "40 shekels", 4),
  financialLiteracyQuestion("Which currency code belongs to the shekel?", ["ILS", "INR", "IDR", "EGP"], "ILS", 4),
  financialLiteracyQuestion("Germany, France, Italy, and Spain all use which currency?", ["euro", "pound", "franc", "dollar"], "euro", 4),
  financialLiteracyQuestion("What is the safest meaning of the phrase 'pay yourself first'?", ["Set aside savings before spending on wants", "Spend all your money on the first day", "Pay only with coins", "Hide bills in different rooms"], "Set aside savings before spending on wants", 4),
  financialLiteracyQuestion("A receipt says subtotal 70 shekels and delivery 10 shekels. What is the total?", ["60 shekels", "70 shekels", "80 shekels", "90 shekels"], "80 shekels", 4),
  financialLiteracyQuestion("You have 180 shekels. You spend 1/3 of it on a gift. How much do you spend?", ["45 shekels", "60 shekels", "90 shekels", "120 shekels"], "60 shekels", 4),
  financialLiteracyQuestion("Which action helps avoid impulse buying?", ["Wait a day before buying a want", "Buy the first thing you see", "Never read the price", "Only use the biggest bill"], "Wait a day before buying a want", 4),
  financialLiteracyQuestion("If a store offers buy 1, get 1 free on a 12-shekel item, what is the cost for 2 items?", ["6 shekels", "12 shekels", "18 shekels", "24 shekels"], "12 shekels", 4),

  // Level 5: tax, subscriptions, recurring spending, and consumer records.
  financialLiteracyQuestion("A toy costs 80 shekels and is 25% off. What is the sale price?", ["55 shekels", "60 shekels", "65 shekels", "70 shekels"], "60 shekels", 5),
  financialLiteracyQuestion("Which juice is the best value?", ["2 liters for 20 shekels", "1 liter for 12 shekels", "500 milliliters for 8 shekels", "3 liters for 33 shekels"], "2 liters for 20 shekels", 5),
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
];

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

function createFinancialLiteracyGeneratedEntry(difficulty) {
  const level = clampFinancialDifficulty(difficulty);
  const generatorsByDifficulty = {
    1: [createFinancialNeedWantQuestion, createFinancialSavingsQuestion, createFinancialSpendingQuestion, createFinancialCurrencyQuestion, createFinancialBestValueQuestion, createFinancialBudgetConceptQuestion],
    2: [createFinancialNeedWantQuestion, createFinancialSavingsQuestion, createFinancialSpendingQuestion, createFinancialGoalQuestion, createFinancialCurrencyQuestion, createFinancialBudgetConceptQuestion],
    3: [createFinancialCurrencyQuestion, createFinancialSavingsQuestion, createFinancialSpendingQuestion, createFinancialBestValueQuestion, createFinancialDiscountQuestion, createFinancialOpportunityCostQuestion],
    4: [createFinancialCurrencyCodeQuestion, createFinancialSpendingQuestion, createFinancialBestValueQuestion, createFinancialDiscountQuestion, createFinancialPlanComparisonQuestion, createFinancialBudgetPercentQuestion],
    5: [createFinancialCurrencyCodeQuestion, createFinancialBestValueQuestion, createFinancialDiscountQuestion, createFinancialPlanComparisonQuestion, createFinancialSpendingQuestion, createFinancialSubscriptionQuestion, createFinancialTaxQuestion],
    6: [createFinancialNetIncomeQuestion, createFinancialSimpleInterestQuestion, createFinancialSubscriptionQuestion, createFinancialGoalQuestion, createFinancialDiscountQuestion, createFinancialSafetyQuestion, createFinancialFixedExpenseQuestion],
    7: [createFinancialLoanInterestQuestion, createFinancialSubscriptionQuestion, createFinancialInflationQuestion, createFinancialNetIncomeQuestion, createFinancialRiskQuestion, createFinancialUnitPriceQuestion, createFinancialBudgetPercentQuestion],
    8: [createFinancialCompoundInterestQuestion, createFinancialFeeQuestion, createFinancialBudgetPercentQuestion, createFinancialExchangeQuestion, createFinancialTaxQuestion, createFinancialRiskQuestion, createFinancialInflationQuestion],
    9: [createFinancialCompoundInterestQuestion, createFinancialCreditCardInterestQuestion, createFinancialLoanPaymentQuestion, createFinancialSinkingFundQuestion, createFinancialInflationQuestion, createFinancialTaxDiscountQuestion, createFinancialRiskQuestion],
    10: [createFinancialCompoundInterestQuestion, createFinancialLoanPaymentQuestion, createFinancialBudgetPercentQuestion, createFinancialTaxDiscountQuestion, createFinancialExchangeQuestion, createFinancialRiskQuestion, createFinancialDepreciationQuestion, createFinancialSubscriptionQuestion],
  };

  return randomFinancialChoice(generatorsByDifficulty[level])(level);
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
  return financialLiteracyQuestion(`Which ${item} deal is the best value?`, packs.map((pack) => pack.text), answer, difficulty);
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