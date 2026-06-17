const ESTIMATION_QUESTIONS = [
  e(1, "What is the best estimate for 19 + 21?", ["About 20", "About 30", "About 40", "About 60"], "About 40"),
  e(1, "Using estimation, which answer is closest to 48 divided by 5?", ["About 2", "About 5", "About 10", "About 50"], "About 10"),
  e(1, "What is the best estimate for 14 + 16?", ["About 20", "About 30", "About 40", "About 60"], "About 30"),
  e(1, "What is the best estimate for 61 + 39?", ["About 50", "About 80", "About 100", "About 120"], "About 100"),
  e(1, "Which number is closest to 6.1 x 5?", ["20", "30", "40", "50"], "30"),
  e(1, "A class has 28 students. About how many students is that?", ["About 10", "About 20", "About 30", "About 50"], "About 30"),
  e(1, "A snack costs 9 shekels. About how much do 3 snacks cost?", ["About 10 shekels", "About 30 shekels", "About 60 shekels", "About 90 shekels"], "About 30 shekels"),
  e(1, "Using estimation, which answer is closest to 18 divided by 4?", ["About 2", "About 5", "About 10", "About 20"], "About 5"),
  e(1, "What is the best estimate for 22 + 18?", ["About 20", "About 30", "About 40", "About 70"], "About 40"),
  e(1, "What is the best estimate for 27 + 32?", ["About 30", "About 40", "About 60", "About 90"], "About 60"),
  e(1, "Using estimation, which answer is closest to 36 divided by 4?", ["About 4", "About 9", "About 18", "About 40"], "About 9"),
  e(1, "Using estimation, which answer is closest to 41 divided by 8?", ["About 2", "About 5", "About 10", "About 20"], "About 5"),
  e(1, "Which number is closest to 4.9 x 6?", ["10", "20", "30", "60"], "30"),
  e(1, "An apple costs 4 shekels. About how much do 5 apples cost?", ["About 10 shekels", "About 20 shekels", "About 40 shekels", "About 80 shekels"], "About 20 shekels"),
  e(1, "A class has 31 students. About how many students is that?", ["About 10", "About 20", "About 30", "About 50"], "About 30"),
  e(1, "Ten children each need 2 pencils. About how many pencils are needed?", ["About 5", "About 10", "About 20", "About 40"], "About 20"),

  e(2, "What is the best estimate for 198 + 203?", ["About 200", "About 300", "About 400", "About 500"], "About 400"),
  e(2, "Which number is closest to 3.9 x 20?", ["40", "60", "80", "120"], "80"),
  e(2, "Which number is closest to 7.8 x 5?", ["20", "30", "40", "60"], "40"),
  e(2, "If 24 children each get 9 stickers, about how many stickers are needed?", ["About 100", "About 180", "About 220", "About 300"], "About 220"),
  e(2, "Using estimation, which answer is closest to 82 divided by 4?", ["About 5", "About 10", "About 20", "About 40"], "About 20"),
  e(2, "A book is 118 pages and another is 84 pages. About how many pages is that altogether?", ["About 100", "About 150", "About 200", "About 300"], "About 200"),
  e(2, "A water bottle holds 490 milliliters. About how many milliliters is that?", ["About 100 mL", "About 250 mL", "About 500 mL", "About 1,000 mL"], "About 500 mL"),
  e(2, "Which is the best estimate for 6 groups of 49?", ["About 120", "About 200", "About 300", "About 600"], "About 300"),
  e(2, "What is the best estimate for 145 + 54?", ["About 100", "About 150", "About 200", "About 300"], "About 200"),
  e(2, "Which number is closest to 8.2 x 9?", ["40", "60", "80", "100"], "80"),
  e(2, "Using estimation, which answer is closest to 94 divided by 10?", ["About 5", "About 10", "About 20", "About 90"], "About 10"),
  e(2, "If 36 children each get 6 stickers, about how many stickers are needed?", ["About 100", "About 180", "About 220", "About 360"], "About 220"),
  e(2, "A book is 212 pages and another is 87 pages. About how many pages is that altogether?", ["About 150", "About 200", "About 300", "About 500"], "About 300"),
  e(2, "A water bottle holds 760 milliliters. About how many milliliters is that?", ["About 500 mL", "About 750 mL", "About 1,000 mL", "About 1,500 mL"], "About 750 mL"),
  e(2, "Which is the best estimate for 7 groups of 41?", ["About 100", "About 200", "About 300", "About 500"], "About 300"),
  e(2, "A shirt costs 49 shekels. About how much do 4 shirts cost?", ["About 100 shekels", "About 200 shekels", "About 300 shekels", "About 400 shekels"], "About 200 shekels"),

  e(3, "If 9 children each get 5 stickers, about how many stickers are needed?", ["About 20", "About 30", "About 45", "About 90"], "About 45"),
  e(3, "What is the best estimate for 51% of 200?", ["About 50", "About 75", "About 100", "About 150"], "About 100"),
  e(3, "What is the best estimate for 399 + 402 + 198?", ["About 700", "About 900", "About 1,000", "About 1,200"], "About 1,000"),
  e(3, "Using estimation, which answer is closest to 198 divided by 9?", ["About 10", "About 20", "About 40", "About 90"], "About 20"),
  e(3, "What is the best estimate for 49% of 80?", ["About 20", "About 30", "About 40", "About 60"], "About 40"),
  e(3, "A notebook costs 19 shekels. About how much do 6 notebooks cost?", ["About 60 shekels", "About 120 shekels", "About 180 shekels", "About 240 shekels"], "About 120 shekels"),
  e(3, "A recipe needs 245 grams of flour. About how many grams is that?", ["About 100 grams", "About 150 grams", "About 250 grams", "About 500 grams"], "About 250 grams"),
  e(3, "A family drives 48 kilometers each day for 5 days. About how far is that?", ["About 100 km", "About 150 km", "About 250 km", "About 500 km"], "About 250 km"),
  e(3, "What is the best estimate for 312 + 188 + 97?", ["About 400", "About 500", "About 600", "About 800"], "About 600"),
  e(3, "What is the best estimate for 25% of 400?", ["About 50", "About 100", "About 200", "About 300"], "About 100"),
  e(3, "What is the best estimate for 53% of 60?", ["About 10", "About 30", "About 50", "About 90"], "About 30"),
  e(3, "Using estimation, which answer is closest to 301 divided by 6?", ["About 20", "About 50", "About 100", "About 300"], "About 50"),
  e(3, "A ticket costs 21 shekels. About how much do 7 tickets cost?", ["About 70 shekels", "About 150 shekels", "About 210 shekels", "About 300 shekels"], "About 150 shekels"),
  e(3, "If 12 children each get 8 stickers, about how many stickers are needed?", ["About 50", "About 100", "About 160", "About 240"], "About 100"),
  e(3, "A recipe needs 298 grams of sugar. About how many grams is that?", ["About 100 grams", "About 200 grams", "About 300 grams", "About 600 grams"], "About 300 grams"),
  e(3, "A family drives 52 kilometers each day for 4 days. About how far is that?", ["About 100 km", "About 200 km", "About 300 km", "About 500 km"], "About 200 km"),

  e(4, "What is the best estimate for 301 + 198 + 99?", ["About 400", "About 500", "About 600", "About 700"], "About 600"),
  e(4, "A bus ride takes 17 minutes and a walk takes 16 minutes. About how long is that altogether?", ["About 20 minutes", "About 30 minutes", "About 40 minutes", "About 60 minutes"], "About 30 minutes"),
  e(4, "Eleven buses each carry about 48 students. About how many students is that altogether?", ["About 300", "About 400", "About 500", "About 700"], "About 500"),
  e(4, "A movie is 94 minutes long. About how long is that?", ["About 1 hour", "About 1 and a half hours", "About 2 and a half hours", "About 4 hours"], "About 1 and a half hours"),
  e(4, "What is the best estimate for 62% of 50?", ["About 10", "About 20", "About 30", "About 40"], "About 30"),
  e(4, "Using estimation, which answer is closest to 960 divided by 12?", ["About 20", "About 40", "About 80", "About 120"], "About 80"),
  e(4, "A shirt costs 79 shekels. About how much do 5 shirts cost?", ["About 200 shekels", "About 300 shekels", "About 400 shekels", "About 600 shekels"], "About 400 shekels"),
  e(4, "Which estimate is closest to 18% of 200?", ["About 20", "About 40", "About 80", "About 120"], "About 40"),
  e(4, "What is the best estimate for 189 + 205 + 103?", ["About 300", "About 400", "About 500", "About 700"], "About 500"),
  e(4, "A run takes 23 minutes and a walk takes 18 minutes. About how long is that altogether?", ["About 20 minutes", "About 40 minutes", "About 60 minutes", "About 90 minutes"], "About 40 minutes"),
  e(4, "Twelve buses each carry about 52 students. About how many students is that altogether?", ["About 300", "About 600", "About 900", "About 1,200"], "About 600"),
  e(4, "A movie is 118 minutes long. About how long is that?", ["About half an hour", "About 1 hour", "About 2 hours", "About 4 hours"], "About 2 hours"),
  e(4, "What is the best estimate for 75% of 80?", ["About 20", "About 40", "About 60", "About 100"], "About 60"),
  e(4, "Using estimation, which answer is closest to 1,440 divided by 18?", ["About 40", "About 80", "About 120", "About 200"], "About 80"),
  e(4, "A coat costs 101 shekels. About how much do 6 coats cost?", ["About 300 shekels", "About 600 shekels", "About 900 shekels", "About 1,200 shekels"], "About 600 shekels"),
  e(4, "Which estimate is closest to 21% of 300?", ["About 30", "About 60", "About 90", "About 150"], "About 60"),

  e(5, "Which number is closest to 78 x 6?", ["180", "300", "480", "780"], "480"),
  e(5, "One box has 49 pencils and another has 52 pencils. About how many pencils are there altogether?", ["About 70", "About 90", "About 100", "About 120"], "About 100"),
  e(5, "What is the best estimate for 78 + 121 + 203?", ["About 200", "About 300", "About 400", "About 500"], "About 400"),
  e(5, "Which number is closest to 124 x 4?", ["200", "300", "500", "700"], "500"),
  e(5, "What is the best estimate for 38% of 250?", ["About 50", "About 100", "About 150", "About 200"], "About 100"),
  e(5, "Using estimation, which answer is closest to 1,201 divided by 25?", ["About 20", "About 50", "About 80", "About 100"], "About 50"),
  e(5, "A 198-shekel jacket is about 25% off. About how much is the discount?", ["About 25 shekels", "About 50 shekels", "About 100 shekels", "About 150 shekels"], "About 50 shekels"),
  e(5, "A pool has 48 rows with 21 seats in each row. About how many seats are there?", ["About 500", "About 1,000", "About 1,500", "About 2,000"], "About 1,000"),
  e(5, "Which number is closest to 92 x 5?", ["300", "500", "700", "900"], "500"),
  e(5, "One box has 98 pencils and another has 105 pencils. About how many pencils are there altogether?", ["About 100", "About 200", "About 300", "About 500"], "About 200"),
  e(5, "What is the best estimate for 184 + 219 + 397?", ["About 500", "About 600", "About 800", "About 1,200"], "About 800"),
  e(5, "Which number is closest to 149 x 3?", ["300", "450", "600", "900"], "450"),
  e(5, "What is the best estimate for 42% of 500?", ["About 100", "About 200", "About 300", "About 500"], "About 200"),
  e(5, "Using estimation, which answer is closest to 1,980 divided by 40?", ["About 20", "About 50", "About 100", "About 200"], "About 50"),
  e(5, "A 395-shekel bicycle is about 20% off. About how much is the discount?", ["About 40 shekels", "About 80 shekels", "About 120 shekels", "About 200 shekels"], "About 80 shekels"),
  e(5, "A hall has 56 rows with 18 seats in each row. About how many seats are there?", ["About 500", "About 1,000", "About 1,500", "About 3,000"], "About 1,000"),

  e(6, "A 1.9-liter bottle is poured into cups that hold about 250 mL. About how many full cups can it fill?", ["About 4 cups", "About 8 cups", "About 12 cups", "About 20 cups"], "About 8 cups"),
  e(6, "A runner goes 4.8 km each day for 6 days. About how far does the runner go?", ["About 10 km", "About 20 km", "About 30 km", "About 60 km"], "About 30 km"),
  e(6, "Which is closest to 19.8 x 31?", ["About 300", "About 600", "About 900", "About 1,200"], "About 600"),
  e(6, "A store sold 397 tickets at about 50 shekels each. About how much money is that?", ["About 2,000 shekels", "About 10,000 shekels", "About 20,000 shekels", "About 40,000 shekels"], "About 20,000 shekels"),
  e(6, "Three quiz scores are 78, 83, and 89. What is the best estimate of the average?", ["About 60", "About 70", "About 80", "About 100"], "About 80"),
  e(6, "A bill is 237 shekels. You want to leave about a 10% tip. About how much is the tip?", ["About 5 shekels", "About 25 shekels", "About 50 shekels", "About 100 shekels"], "About 25 shekels"),
  e(6, "A rectangular garden is about 19 meters by 11 meters. About what is its area?", ["About 100 square meters", "About 200 square meters", "About 400 square meters", "About 600 square meters"], "About 200 square meters"),
  e(6, "Using estimation, which total is closest to 246 + 389 + 512?", ["About 700", "About 900", "About 1,100", "About 1,500"], "About 1,100"),
  e(6, "A 2.4-liter bottle is poured into cups that hold about 300 mL. About how many full cups can it fill?", ["About 4 cups", "About 8 cups", "About 12 cups", "About 24 cups"], "About 8 cups"),
  e(6, "A runner goes 5.2 km each day for 7 days. About how far does the runner go?", ["About 20 km", "About 40 km", "About 70 km", "About 100 km"], "About 40 km"),
  e(6, "Which is closest to 24.7 x 19?", ["About 200", "About 500", "About 800", "About 1,200"], "About 500"),
  e(6, "A store sold 480 tickets at about 45 shekels each. About how much money is that?", ["About 10,000 shekels", "About 20,000 shekels", "About 40,000 shekels", "About 80,000 shekels"], "About 20,000 shekels"),
  e(6, "Three quiz scores are 68, 72, and 79. What is the best estimate of the average?", ["About 50", "About 70", "About 90", "About 120"], "About 70"),
  e(6, "A bill is 389 shekels. You want to leave about a 15% tip. About how much is the tip?", ["About 20 shekels", "About 40 shekels", "About 60 shekels", "About 100 shekels"], "About 60 shekels"),
  e(6, "A rectangular garden is about 24 meters by 13 meters. About what is its area?", ["About 100 square meters", "About 300 square meters", "About 600 square meters", "About 900 square meters"], "About 300 square meters"),
  e(6, "Using estimation, which total is closest to 321 + 478 + 190?", ["About 700", "About 1,000", "About 1,300", "About 1,800"], "About 1,000"),

  e(7, "A school has 19 classes with about 28 students each. Using estimation, which total is closest?", ["About 200 students", "About 400 students", "About 600 students", "About 1,000 students"], "About 600 students"),
  e(7, "A 799-shekel tablet is 15% off. About how much is the sale price?", ["About 520 shekels", "About 680 shekels", "About 800 shekels", "About 920 shekels"], "About 680 shekels"),
  e(7, "A car travels 92 km each hour for 3.2 hours. About how far does it travel?", ["About 150 km", "About 300 km", "About 450 km", "About 900 km"], "About 300 km"),
  e(7, "Which estimate is closest to 3,980 divided by 41?", ["About 50", "About 100", "About 200", "About 400"], "About 100"),
  e(7, "Ignoring system files and formatting, a phone has 256 GB of storage. About how many 3 GB videos could fit?", ["About 30", "About 80", "About 150", "About 250"], "About 80"),
  e(7, "A recipe for 8 people uses 3.9 cups of rice. About how much rice is needed for 40 people?", ["About 10 cups", "About 20 cups", "About 40 cups", "About 80 cups"], "About 20 cups"),
  e(7, "The numbers 48, 52, 55, and 45 are measured values. Which is the best estimate of their average?", ["About 25", "About 50", "About 75", "About 100"], "About 50"),
  e(7, "A room is 4.9 m by 3.8 m. About how much floor area does it have?", ["About 10 square meters", "About 20 square meters", "About 40 square meters", "About 80 square meters"], "About 20 square meters"),
  e(7, "A school has 24 classes with about 31 students each. Using estimation, which total is closest?", ["About 500 students", "About 700 students", "About 900 students", "About 1,200 students"], "About 700 students"),
  e(7, "A 1,190-shekel laptop is 20% off. About how much is the sale price?", ["About 700 shekels", "About 950 shekels", "About 1,100 shekels", "About 1,400 shekels"], "About 950 shekels"),
  e(7, "A train travels 118 km each hour for 2.5 hours. About how far does it travel?", ["About 150 km", "About 300 km", "About 600 km", "About 1,200 km"], "About 300 km"),
  e(7, "Which estimate is closest to 5,040 divided by 48?", ["About 50", "About 100", "About 200", "About 500"], "About 100"),
  e(7, "A tablet has 128 GB of storage. About how many 4 GB videos could fit?", ["About 10", "About 30", "About 60", "About 100"], "About 30"),
  e(7, "A recipe for 6 people uses 2.8 cups of rice. About how much rice is needed for 30 people?", ["About 5 cups", "About 15 cups", "About 30 cups", "About 60 cups"], "About 15 cups"),
  e(7, "The numbers 94, 102, 98, and 106 are measured values. Which is the best estimate of their average?", ["About 50", "About 80", "About 100", "About 150"], "About 100"),
  e(7, "A room is 6.1 m by 4.8 m. About how much floor area does it have?", ["About 10 square meters", "About 30 square meters", "About 60 square meters", "About 100 square meters"], "About 30 square meters"),

  e(8, "A stadium section has 48 rows with 23 seats per row. Which power-of-10 estimate is closest to the total number of seats?", ["About 100", "About 1,000", "About 10,000", "About 100,000"], "About 1,000"),
  e(8, "A map scale is 1 cm = 25 km. Two cities are 7.8 cm apart. About how far apart are they?", ["About 50 km", "About 100 km", "About 200 km", "About 400 km"], "About 200 km"),
  e(8, "A website gets 19,800 visits per day. About how many visits is that in one week?", ["About 20,000", "About 70,000", "About 140,000", "About 500,000"], "About 140,000"),
  e(8, "A water tank holds 2,950 liters and drains at about 48 liters per minute. About how long until it is empty?", ["About 10 minutes", "About 30 minutes", "About 1 hour", "About 3 hours"], "About 1 hour"),
  e(8, "A laptop costs 3,950 shekels and tax is about 17%. About how much tax is that?", ["About 200 shekels", "About 700 shekels", "About 1,700 shekels", "About 3,000 shekels"], "About 700 shekels"),
  e(8, "A square field is about 49 meters on each side. About what is its area?", ["About 250 square meters", "About 500 square meters", "About 2,500 square meters", "About 25,000 square meters"], "About 2,500 square meters"),
  e(8, "Using estimation, which answer is closest to 0.49 x 798?", ["About 40", "About 200", "About 400", "About 800"], "About 400"),
  e(8, "A fundraiser collects 4,850 shekels from 97 people. About how much did each person give on average?", ["About 5 shekels", "About 50 shekels", "About 100 shekels", "About 500 shekels"], "About 50 shekels"),
  e(8, "A stadium section has 110 rows with 95 seats per row. Which power-of-10 estimate is closest to the total number of seats?", ["About 100", "About 1,000", "About 10,000", "About 100,000"], "About 10,000"),
  e(8, "A map scale is 1 cm = 50 km. Two cities are 4.2 cm apart. About how far apart are they?", ["About 50 km", "About 100 km", "About 200 km", "About 500 km"], "About 200 km"),
  e(8, "A website gets 12,300 visits per day. About how many visits is that in one week?", ["About 40,000", "About 90,000", "About 140,000", "About 500,000"], "About 90,000"),
  e(8, "A water tank holds 4,800 liters and drains at about 95 liters per minute. About how long until it is empty?", ["About 20 minutes", "About 50 minutes", "About 100 minutes", "About 3 hours"], "About 50 minutes"),
  e(8, "A tablet costs 1,980 shekels and tax is about 10%. About how much tax is that?", ["About 100 shekels", "About 200 shekels", "About 500 shekels", "About 1,000 shekels"], "About 200 shekels"),
  e(8, "A square field is about 31 meters on each side. About what is its area?", ["About 100 square meters", "About 500 square meters", "About 1,000 square meters", "About 5,000 square meters"], "About 1,000 square meters"),
  e(8, "Using estimation, which answer is closest to 0.52 x 1,196?", ["About 60", "About 300", "About 600", "About 1,200"], "About 600"),
  e(8, "A fundraiser collects 9,900 shekels from 198 people. About how much did each person give on average?", ["About 5 shekels", "About 50 shekels", "About 100 shekels", "About 500 shekels"], "About 50 shekels"),

  e(9, "A 1,200-shekel price rises by about 9%. Using estimation, which new price is closest?", ["About 1,210 shekels", "About 1,310 shekels", "About 1,800 shekels", "About 2,400 shekels"], "About 1,310 shekels"),
  e(9, "A city has 98,000 people and grows by about 2% in a year. About how many new people is that?", ["About 200", "About 2,000", "About 20,000", "About 50,000"], "About 2,000"),
  e(9, "A box is 31 cm by 19 cm by 11 cm. About what is its volume?", ["About 600 cubic cm", "About 3,000 cubic cm", "About 6,000 cubic cm", "About 60,000 cubic cm"], "About 6,000 cubic cm"),
  e(9, "A school prints 29 pages for each of 412 students. About how many pages is that?", ["About 1,200", "About 6,000", "About 12,000", "About 120,000"], "About 12,000"),
  e(9, "A battery loses about 18% each hour. Starting at 80%, about what charge is left after 1 hour?", ["About 20%", "About 35%", "About 65%", "About 95%"], "About 65%"),
  e(9, "A shop sells 1,980 items per month. About how many items is that in a year?", ["About 2,000", "About 12,000", "About 24,000", "About 240,000"], "About 24,000"),
  e(9, "A 3.9 kg bag is split into 8 equal parts. About how much is each part?", ["About 0.05 kg", "About 0.5 kg", "About 2 kg", "About 8 kg"], "About 0.5 kg"),
  e(9, "Using estimation, which answer is closest to 6.02 x 9.8 x 101?", ["About 60", "About 600", "About 6,000", "About 60,000"], "About 6,000"),
  e(9, "A 2,400-shekel price drops by about 12%. Using estimation, which sale price is closest?", ["About 1,200 shekels", "About 2,100 shekels", "About 2,400 shekels", "About 2,900 shekels"], "About 2,100 shekels"),
  e(9, "A city has 250,000 people and grows by about 5% in a year. About how many new people is that?", ["About 2,500", "About 12,500", "About 50,000", "About 125,000"], "About 12,500"),
  e(9, "A box is 49 cm by 24 cm by 20 cm. About what is its volume?", ["About 5,000 cubic cm", "About 12,000 cubic cm", "About 25,000 cubic cm", "About 100,000 cubic cm"], "About 25,000 cubic cm"),
  e(9, "A factory packs 38 boxes for each of 295 stores. About how many boxes is that?", ["About 1,200", "About 6,000", "About 12,000", "About 120,000"], "About 12,000"),
  e(9, "A battery loses about 22% each hour. Starting at 90%, about what charge is left after 1 hour?", ["About 45%", "About 70%", "About 90%", "About 95%"], "About 70%"),
  e(9, "A club spends 4,850 shekels per month. About how much is that in a year?", ["About 12,000 shekels", "About 60,000 shekels", "About 120,000 shekels", "About 600,000 shekels"], "About 60,000 shekels"),
  e(9, "An 11.9 kg bag is split into 12 equal parts. About how much is each part?", ["About 0.1 kg", "About 0.5 kg", "About 1 kg", "About 5 kg"], "About 1 kg"),
  e(9, "Using estimation, which answer is closest to 5.1 x 198 x 9.8?", ["About 1,000", "About 10,000", "About 100,000", "About 1,000,000"], "About 10,000"),

  e(10, "A school has about 500 students. If each student uses about 2 pencils per month, about how many pencils are used in 10 months?", ["About 1,000", "About 5,000", "About 10,000", "About 100,000"], "About 10,000"),
  e(10, "A person takes about 2,000 steps to walk 1.5 km. About how many steps are in a 6 km walk?", ["About 2,000", "About 4,000", "About 8,000", "About 20,000"], "About 8,000"),
  e(10, "A room is about 5 m by 4 m by 3 m. About what is the room's volume?", ["About 12 cubic meters", "About 30 cubic meters", "About 60 cubic meters", "About 600 cubic meters"], "About 60 cubic meters"),
  e(10, "A city bus carries about 45 people and makes 18 full trips in a day. About how many passenger rides is that?", ["About 80", "About 400", "About 800", "About 8,000"], "About 800"),
  e(10, "A phone photo is about 3 MB. About how many photos fit in 64 GB? Use 1 GB as about 1,000 MB.", ["About 2,000", "About 20,000", "About 200,000", "About 2,000,000"], "About 20,000"),
  e(10, "An answer to 498 x 0.021 should be closest to which value?", ["About 0.1", "About 1", "About 10", "About 100"], "About 10"),
  e(10, "A small country has 9.8 million people. If about 1 in 100 people attend an event, about how many people attend?", ["About 1,000", "About 10,000", "About 100,000", "About 1,000,000"], "About 100,000"),
  e(10, "A satellite orbits Earth about 15 times per day. About how many orbits is that in one year?", ["About 500", "About 5,000", "About 50,000", "About 500,000"], "About 5,000"),
  e(10, "A school has about 750 students. If each student uses about 3 notebooks per month, about how many notebooks are used in 8 months?", ["About 2,000", "About 10,000", "About 20,000", "About 200,000"], "About 20,000"),
  e(10, "A person takes about 2,500 steps to walk 2 km. About how many steps are in a 10 km walk?", ["About 2,500", "About 5,000", "About 12,500", "About 50,000"], "About 12,500"),
  e(10, "A hall is about 12 m by 8 m by 4 m. About what is the hall's volume?", ["About 40 cubic meters", "About 100 cubic meters", "About 400 cubic meters", "About 4,000 cubic meters"], "About 400 cubic meters"),
  e(10, "A ferry carries about 120 people and makes 16 full trips in a day. About how many passenger rides is that?", ["About 200", "About 2,000", "About 20,000", "About 200,000"], "About 2,000"),
  e(10, "A video is about 250 MB. About how many videos fit in 128 GB? Use 1 GB as about 1,000 MB.", ["About 50", "About 500", "About 5,000", "About 50,000"], "About 500"),
  e(10, "An answer to 2,050 x 0.049 should be closest to which value?", ["About 1", "About 10", "About 100", "About 1,000"], "About 100"),
  e(10, "A city has about 9.8 million people. If about 1 in 50 people attend an event, about how many people attend?", ["About 20,000", "About 200,000", "About 2,000,000", "About 20,000,000"], "About 200,000"),
  e(10, "A satellite sends about 480 images per day. About how many images is that in one year?", ["About 50,000", "About 180,000", "About 500,000", "About 2,000,000"], "About 180,000"),
];

function createEstimationGeneratedEntry(difficulty) {
  const level = clampEstimationDifficulty(difficulty);
  const generators = {
    1: [genAdd, genSubtract, genDivide, genSimpleMultiply, genCounting],
    2: [genAdd, genSubtract, genDivide, genSimpleMultiply, genMeasure],
    3: [genMultiAdd, genPercent, genCounting, genMoney, genDivide],
    4: [genElapsedTime, genPercent, genMultiAdd, genSimpleMultiply, genSubtract],
    5: [genLargeMultiply, genPercent, genDiscount, genLargeDivide, genSeatCount],
    6: [genDecimalProduct, genRate, genAverage, genArea, genTip],
    7: [genChange, genTravel, genStorage, genScaleRecipe, genArea],
    8: [genOrderOfMagnitude, genMapScale, genWeeklyRate, genDrainRate, genTax],
    9: [genPercentChange, genVolume, genYearlyRate, genDecimalDivide, genBounds],
    10: [genFermi, genUnitConversion, genOrderOfMagnitude, genSanityCheck, genYearlyRate],
  };
  return pick(generators[level])(level);
}

function e(difficulty, question, options, answer) {
  return { question, options: unique(options), answer, difficulty: clampEstimationDifficulty(difficulty) };
}

function genAdd(d) {
  const max = d <= 1 ? 70 : d <= 2 ? 180 : 450;
  const a = rand(12, max), b = rand(12, max);
  const step = d <= 2 ? 10 : 50;
  const ans = roundNice(a + b, step);
  return q(d, `What is the best estimate for ${a} + ${b}?`, about(ans), aboutOptions(ans, step));
}

function genSubtract(d) {
  const a = rand(d <= 1 ? 45 : 90, d <= 1 ? 180 : 900);
  const b = rand(10, Math.max(10, Math.floor(a * 0.6)));
  const step = d <= 2 ? 10 : 50;
  const ans = roundNice(a - b, step);
  return q(d, `Which is closest to ${a} - ${b}?`, about(ans), aboutOptions(ans, step));
}

function genDivide(d) {
  const divisor = pick(d <= 1 ? [4, 5, 10] : [4, 5, 8, 9, 10, 12]);
  const quotient = pick(d <= 1 ? [4, 5, 8, 10] : [8, 10, 12, 15, 20, 25]);
  const dividend = divisor * quotient + pick([-2, -1, 0, 1, 2]);
  const ans = roundNice(dividend / divisor, d <= 2 ? 5 : 10);
  return q(d, `Using estimation, which answer is closest to ${dividend} divided by ${divisor}?`, about(ans), aboutOptions(ans, d <= 2 ? 5 : 10));
}

function genSimpleMultiply(d) {
  const a = d <= 2 ? Number(pick([3.1, 4.2, 5.8, 6.1, 7.4, 8.3]).toFixed(1)) : rand(12, 88);
  const b = pick(d <= 2 ? [4, 5, 6, 7, 8, 9, 10] : [4, 5, 6, 7, 8, 9, 12]);
  const step = d <= 2 ? 10 : 50;
  const ans = roundNice(a * b, step);
  return q(d, `Which number is closest to ${a} x ${b}?`, fmt(ans), numericOptions(ans, step));
}

function genCounting(d) {
  const groups = rand(d <= 3 ? 6 : 12, d <= 3 ? 28 : 75);
  const each = pick([3, 4, 5, 6, 8, 9, 12]);
  const step = d <= 3 ? 20 : 50;
  const ans = roundNice(groups * each, step);
  return q(d, `If ${groups} children each get ${each} stickers, about how many stickers are needed?`, about(ans), aboutOptions(ans, step));
}

function genMeasure(d) {
  const value = pick([245, 390, 490, 520, 750, 980]);
  const step = value < 600 ? 50 : 100;
  const ans = roundNice(value, step);
  return q(d, `A bottle holds ${value} milliliters. About how many milliliters is that?`, about(ans, "mL"), aboutOptions(ans, step, "mL"));
}

function genMultiAdd(d) {
  const values = [rand(80, d <= 3 ? 450 : 900), rand(80, d <= 3 ? 450 : 900), rand(80, d <= 3 ? 450 : 900)];
  const total = values.reduce((sum, value) => sum + value, 0);
  const step = total >= 1000 ? 100 : 50;
  const ans = roundNice(total, step);
  return q(d, `What is the best estimate for ${values.join(" + ")}?`, about(ans), aboutOptions(ans, step));
}

function genPercent(d) {
  const percent = pick(d <= 4 ? [18, 24, 49, 51, 62, 72] : [12, 15, 18, 24, 38, 62, 72, 88]);
  const whole = pick(d <= 4 ? [50, 80, 100, 150, 200, 250] : [150, 200, 250, 400, 800, 1200]);
  const exact = percent * whole / 100;
  const step = exact >= 500 ? 100 : exact >= 100 ? 50 : 10;
  const ans = roundNice(exact, step);
  return q(d, `What is the best estimate for ${percent}% of ${fmt(whole)}?`, about(ans), aboutOptions(ans, step));
}

function genMoney(d) {
  const count = rand(3, 8), price = rand(16, 79);
  const ans = roundNice(count * price, 50);
  return q(d, `A notebook costs ${price} shekels. About how much do ${count} notebooks cost?`, about(ans, "shekels"), aboutOptions(ans, 50, "shekels"));
}

function genElapsedTime(d) {
  const targets = d <= 4 ? [30, 60, 90, 120] : [60, 90, 120, 150, 180];
  const target = pick(targets), total = target + pick([-8, -6, -5, -4, 0, 4, 5, 6, 8]);
  const left = rand(Math.max(15, total - 85), Math.min(85, total - 15));
  return q(d, `A walk takes ${left} minutes and a bus ride takes ${total - left} minutes. About how long is that altogether?`, duration(target), durationOptions(target, targets));
}

function genLargeMultiply(d) {
  const a = rand(45, d <= 5 ? 160 : 450), b = pick(d <= 5 ? [4, 5, 6, 7, 8, 9] : [8, 9, 12, 15, 18, 24]);
  const exact = a * b, step = exact >= 2000 ? 500 : 100, ans = roundNice(exact, step);
  return q(d, `Which number is closest to ${a} x ${b}?`, fmt(ans), numericOptions(ans, step));
}

function genDiscount(d) {
  const price = pick([198, 249, 395, 520, 799, 1190]), percent = pick([10, 15, 20, 25, 30]);
  const step = price >= 700 ? 100 : 50, ans = roundNice(price * percent / 100, step);
  return q(d, `A ${fmt(price)}-shekel item is about ${percent}% off. About how much is the discount?`, about(ans, "shekels"), aboutOptions(ans, step, "shekels"));
}

function genLargeDivide(d) {
  const divisor = pick([12, 20, 24, 25, 40, 50]), quotient = pick([20, 30, 40, 50, 80, 100, 120]);
  const dividend = divisor * quotient + rand(-8, 8), ans = roundNice(dividend / divisor, 10);
  return q(d, `Using estimation, which answer is closest to ${fmt(dividend)} divided by ${divisor}?`, about(ans), aboutOptions(ans, 10));
}

function genSeatCount(d) {
  const rows = rand(18, 52), seats = rand(16, 32), ans = roundNice(rows * seats, 100);
  return q(d, `A theater has ${rows} rows with ${seats} seats in each row. About how many seats are there?`, about(ans), aboutOptions(ans, 100));
}

function genDecimalProduct(d) {
  const a = pick([9.8, 12.2, 19.8, 24.7, 31.2, 49.5]), b = pick([6, 8, 12, 15, 21, 31]);
  const exact = a * b, step = exact >= 1000 ? 500 : 100, ans = roundNice(exact, step);
  return q(d, `Which is closest to ${a} x ${b}?`, about(ans), aboutOptions(ans, step));
}

function genRate(d) {
  const total = pick([1900, 2400, 2950, 3600, 4800]), rate = pick([48, 95, 120, 240]);
  const ans = roundNice(total / rate, 10);
  return q(d, `A tank has ${fmt(total)} liters and empties at about ${rate} liters per minute. About how many minutes will it take?`, about(ans, "minutes"), aboutOptions(ans, 10, "minutes"));
}

function genAverage(d) {
  const center = pick([50, 60, 70, 80, 90]);
  const values = [center - rand(5, 12), center + rand(0, 6), center + rand(7, 14)];
  const ans = roundNice(values.reduce((sum, value) => sum + value, 0) / values.length, 10);
  return q(d, `Three scores are ${values.join(", ")}. What is the best estimate of the average?`, about(ans), aboutOptions(ans, 10));
}

function genArea(d) {
  const length = pick(d <= 6 ? [11, 19, 24, 31] : [3.8, 4.9, 11.8, 24.2, 48.5]);
  const width = pick(d <= 6 ? [8, 11, 14, 21] : [2.9, 3.8, 9.7, 19.4, 31.2]);
  const exact = length * width, step = exact >= 1000 ? 500 : exact >= 250 ? 100 : 10, ans = roundNice(exact, step);
  return q(d, `A rectangular garden is about ${length} meters by ${width} meters. About what is its area?`, about(ans, "square meters"), aboutOptions(ans, step, "square meters"));
}

function genTip(d) {
  const bill = pick([118, 237, 389, 520, 940]), percent = pick([10, 15, 20]);
  const exact = bill * percent / 100, step = exact >= 100 ? 50 : 10, ans = roundNice(exact, step);
  return q(d, `A bill is ${bill} shekels. You want to leave about a ${percent}% tip. About how much is the tip?`, about(ans, "shekels"), aboutOptions(ans, step, "shekels"));
}

function genChange(d) {
  const count = rand(4, 9), price = rand(38, 88);
  const paid = roundNice(count * price + rand(20, 90), 50), change = Math.max(0, roundNice(paid - count * price, 10));
  return q(d, `You buy ${count} items that each cost about ${price} shekels and pay with ${paid} shekels. About how much change should you expect?`, about(change, "shekels"), aboutOptions(change, 10, "shekels"));
}

function genTravel(d) {
  const speed = pick([58, 74, 92, 118, 240]), hours = pick([1.8, 2.5, 3.2, 4.1]);
  const ans = roundNice(speed * hours, 50);
  return q(d, `A vehicle travels ${speed} km each hour for ${hours} hours. About how far does it travel?`, about(ans, "km"), aboutOptions(ans, 50, "km"));
}

function genStorage(d) {
  const storage = pick([64, 128, 256, 512]), fileSize = pick([2, 3, 4, 8, 12]);
  const ans = roundNice(storage * 1000 / fileSize, 1000);
  return q(d, `A device has ${storage} GB of storage. About how many ${fileSize} MB files could fit? Use 1 GB as about 1,000 MB.`, about(ans), aboutOptions(ans, 1000));
}

function genScaleRecipe(d) {
  const people = pick([4, 6, 8]), targetPeople = people * pick([4, 5, 6]), cups = pick([1.9, 2.8, 3.9, 4.2]);
  const ans = roundNice(cups / people * targetPeople, 5);
  return q(d, `A recipe for ${people} people uses ${cups} cups of rice. About how much rice is needed for ${targetPeople} people?`, about(ans, "cups"), aboutOptions(ans, 5, "cups"));
}

function genOrderOfMagnitude(d) {
  return pick([
    q(d, "A stadium section has 48 rows with 23 seats per row. Which power-of-10 estimate is closest to the total number of seats?", "About 1,000", ["About 100", "About 1,000", "About 10,000", "About 100,000"]),
    q(d, "A school has 505 students using about 20 sheets of paper each week. Which power-of-10 estimate is closest to the weekly paper use?", "About 10,000", ["About 100", "About 1,000", "About 10,000", "About 100,000"]),
    q(d, "A town has about 19,000 homes, and each home has about 4 people. Which power-of-10 estimate is closest to the population?", "About 100,000", ["About 1,000", "About 10,000", "About 100,000", "About 1,000,000"]),
  ]);
}

function genMapScale(d) {
  const scale = pick([10, 25, 50, 100]), distance = pick([3.8, 7.8, 12.2, 19.7]);
  const ans = roundNice(scale * distance, 50);
  return q(d, `A map scale is 1 cm = ${scale} km. Two places are ${distance} cm apart. About how far apart are they?`, about(ans, "km"), aboutOptions(ans, 50, "km"));
}

function genWeeklyRate(d) {
  const perDay = pick([1980, 4850, 19800, 52000]), days = pick([5, 7, 14]);
  const step = perDay >= 10000 ? 10000 : 1000, ans = roundNice(perDay * days, step);
  return q(d, `A website gets ${fmt(perDay)} visits per day. About how many visits is that in ${days} days?`, about(ans), aboutOptions(ans, step));
}

function genDrainRate(d) {
  const liters = pick([2950, 4800, 7200, 11800]), rate = pick([48, 95, 120, 240]);
  const ans = roundNice(liters / rate, 10);
  return q(d, `A water tank holds ${fmt(liters)} liters and drains at about ${rate} liters per minute. About how long until it is empty?`, about(ans, "minutes"), aboutOptions(ans, 10, "minutes"));
}

function genTax(d) {
  const price = pick([950, 1980, 3950, 7200]), percent = pick([8, 10, 17, 20]);
  const exact = price * percent / 100, step = exact >= 1000 ? 500 : 100, ans = roundNice(exact, step);
  return q(d, `An item costs ${fmt(price)} shekels and tax is about ${percent}%. About how much tax is that?`, about(ans, "shekels"), aboutOptions(ans, step, "shekels"));
}

function genPercentChange(d) {
  const start = pick([1200, 4800, 98000, 250000]), percent = pick([2, 5, 9, 12, 18]);
  const step = start >= 50000 ? 1000 : 100, ans = roundNice(start * percent / 100, step);
  return q(d, `A value of ${fmt(start)} changes by about ${percent}%. About how large is the change?`, about(ans), aboutOptions(ans, step));
}

function genVolume(d) {
  const length = pick([11, 19, 31, 49]), width = pick([9, 19, 24]), height = pick([6, 11, 20]);
  const exact = length * width * height, step = exact >= 10000 ? 5000 : 1000, ans = roundNice(exact, step);
  return q(d, `A box is ${length} cm by ${width} cm by ${height} cm. About what is its volume?`, about(ans, "cubic cm"), aboutOptions(ans, step, "cubic cm"));
}

function genYearlyRate(d) {
  const perPeriod = pick(d >= 10 ? [2050, 4850, 19800, 52000] : [490, 1980, 4850, 19800]);
  const periods = pick(d >= 10 ? [50, 100, 365] : [12, 24, 52]);
  const exact = perPeriod * periods, step = exact >= 1000000 ? 100000 : exact >= 100000 ? 10000 : 1000, ans = roundNice(exact, step);
  return q(d, `A place makes or uses ${fmt(perPeriod)} items each period. About how many items is that in ${periods} periods?`, about(ans), aboutOptions(ans, step));
}

function genDecimalDivide(d) {
  const amount = pick([3.9, 7.8, 11.9, 24.5]), parts = pick([4, 6, 8, 12]);
  const ans = roundNice(amount / parts, 0.5);
  return q(d, `A ${amount} kg bag is split into ${parts} equal parts. About how much is each part?`, about(ans, "kg"), aboutOptions(ans, 0.5, "kg"));
}

function genBounds(d) {
  const a = pick([4.8, 5.1, 5.2]), b = pick([190, 198, 210]);
  return q(d, `A number is close to ${a} x ${b}. Which estimate best describes it?`, "About 1,000", ["About 100", "About 500", "About 1,000", "About 5,000"]);
}

function genFermi(d) {
  return pick([
    q(d, "A school has about 500 students. If each student uses about 2 pencils per month, about how many pencils are used in 10 months?", "About 10,000", ["About 1,000", "About 5,000", "About 10,000", "About 100,000"]),
    q(d, "A city bus carries about 45 people and makes 18 full trips in a day. About how many passenger rides is that?", "About 800", ["About 80", "About 400", "About 800", "About 8,000"]),
    q(d, "A jar holds about 950 small beads. About how many beads are in 48 similar jars?", "About 50,000", ["About 5,000", "About 50,000", "About 500,000", "About 5,000,000"]),
  ]);
}

function genUnitConversion(d) {
  const gb = pick([32, 64, 128, 256]), mb = pick([3, 4, 8, 12]);
  const ans = roundNice(gb * 1000 / mb, 1000);
  return q(d, `A file is about ${mb} MB. About how many such files fit in ${gb} GB? Use 1 GB as about 1,000 MB.`, about(ans), aboutOptions(ans, 1000));
}

function genSanityCheck(d) {
  const left = pick([498, 980, 2050]), right = pick([0.021, 0.049, 0.102]);
  const ans = about(10 ** Math.round(Math.log10(left * right)));
  return q(d, `An answer to ${left} x ${right} should be closest to which value?`, ans, buildOptions(ans, ["About 0.1", "About 1", "About 10", "About 100", "About 1,000"]));
}

function q(difficulty, question, answer, options) {
  const normalizedOptions = unique(options.map(String));
  if (normalizedOptions.length !== 4 || !normalizedOptions.includes(String(answer))) {
    throw new Error(`Estimation question must have exactly 4 unique options including the answer: ${question}`);
  }
  return { question, options: shuffle(normalizedOptions), answer: String(answer), difficulty: clampEstimationDifficulty(difficulty) };
}

function aboutOptions(answerNumber, step, unit = "") {
  return buildOptions(about(answerNumber, unit), near(answerNumber, step).map((value) => about(value, unit)));
}

function numericOptions(answerNumber, step) {
  return buildOptions(fmt(answerNumber), near(answerNumber, step).map(fmt));
}

function durationOptions(answerMinutes, candidates) {
  return buildOptions(duration(answerMinutes), candidates.filter((value) => value !== answerMinutes).map(duration));
}

function buildOptions(answer, candidates) {
  const options = [String(answer)];
  const pool = shuffle(unique(candidates.map(String))).filter((candidate) => candidate !== String(answer));
  while (options.length < 4 && pool.length) {
    options.push(pool.shift());
  }
  let fallback = 1;
  while (options.length < 4) {
    const candidate = `${answer} ${fallback}`;
    fallback += 1;
    if (!options.includes(candidate)) {
      options.push(candidate);
    }
  }
  return shuffle(options);
}

function near(center, step) {
  return unique([
    center - step * 3,
    center - step * 2,
    center - step,
    center + step,
    center + step * 2,
    center + step * 3,
    center * 2,
    center / 2,
  ])
    .map(Number)
    .filter((value) => Number.isFinite(value) && value > 0)
    .map((value) => roundNice(value, step));
}

function roundNice(value, step = 10) {
  const numeric = Number(value);
  const safeStep = Number(step) || 10;
  if (!Number.isFinite(numeric)) {
    return 0;
  }
  const decimals = safeStep < 1 ? 1 : 0;
  return Number(Math.max(safeStep, Math.round(numeric / safeStep) * safeStep).toFixed(decimals));
}

function about(value, unit = "") {
  return unit ? `About ${fmt(value)} ${unit}` : `About ${fmt(value)}`;
}

function duration(minutes) {
  if (minutes === 30) {
    return "About half an hour";
  }
  if (minutes % 60 === 0) {
    const hours = minutes / 60;
    return `About ${hours} hour${hours === 1 ? "" : "s"}`;
  }
  if (minutes % 60 === 30 && minutes > 60) {
    return `About ${Math.floor(minutes / 60)} and a half hours`;
  }
  return `About ${minutes} minutes`;
}

function fmt(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return String(value);
  }
  if (Math.abs(numeric) < 1 && numeric !== 0) {
    return String(Number(numeric.toFixed(2)));
  }
  if (!Number.isInteger(numeric)) {
    return String(Number(numeric.toFixed(1)));
  }
  return numeric.toLocaleString("en-US");
}

function clampEstimationDifficulty(value) {
  const difficulty = Number(value);
  if (!Number.isInteger(difficulty)) {
    return 1;
  }
  return Math.max(1, Math.min(10, difficulty));
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(values) {
  return values[rand(0, values.length - 1)];
}

function shuffle(values) {
  const copy = [...values];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = rand(0, index);
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function unique(values) {
  return Array.from(new Set(values.map((value) => String(value))));
}
