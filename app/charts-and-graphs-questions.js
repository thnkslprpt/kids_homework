const CHARTS_AND_GRAPHS_QUESTIONS = (() => {
  function makeQuestion(question, options, answer, difficulty) {
    return { question, options, answer, difficulty };
  }

  return [
    makeQuestion("A class voted for pets: dogs 9, cats 6, fish 3, birds 5. Which pet got the most votes?", ["Dogs", "Cats", "Fish", "Birds"], "Dogs", 1),
    makeQuestion("A chart shows books read this month: Noga 4, Gideon 7, Gabriel 5, Eden 6. How many books were read altogether?", ["18", "20", "22", "24"], "22", 1),
    makeQuestion("A fruit chart shows apples 5, bananas 3, grapes 7, oranges 4. Which fruit has the fewest votes?", ["Apples", "Bananas", "Grapes", "Oranges"], "Bananas", 1),
    makeQuestion("A weather chart shows temperatures: Mon 18, Tue 21, Wed 17, Thu 20. What was the temperature on Tuesday?", ["17", "18", "20", "21"], "21", 1),
    makeQuestion("A marble chart shows red 4, blue 4, green 2, yellow 6. Which two colors have the same number?", ["Red and blue", "Blue and green", "Green and yellow", "Red and yellow"], "Red and blue", 1),
    makeQuestion("Snack sales were apples 8, bananas 12, oranges 10, pears 6. Which snack sold the most?", ["Apples", "Bananas", "Oranges", "Pears"], "Bananas", 1),
    makeQuestion("A toy chart shows blocks 6, cars 3, dolls 4, balls 2. How many toys are there altogether?", ["13", "15", "17", "19"], "15", 1),
    makeQuestion("A cup chart shows water cups: Sun 5, Mon 7, Tue 6, Wed 8. How many cups were drunk on Monday?", ["5", "6", "7", "8"], "7", 1),

    makeQuestion("A weather chart shows temperatures: Mon 18, Tue 21, Wed 17, Thu 20. Which day was the coldest?", ["Monday", "Tuesday", "Wednesday", "Thursday"], "Wednesday", 2),
    makeQuestion("Snack sales were apples 8, bananas 12, oranges 10, pears 6. How many more bananas than pears were sold?", ["4", "5", "6", "8"], "6", 2),
    makeQuestion("A chart shows pencils: red 6, blue 9, green 6, yellow 4. Which statement is true?", ["Blue has the most", "Yellow has the most", "Red and yellow are equal", "There are 20 pencils total"], "Blue has the most", 2),
    makeQuestion("A table shows game scores: Team A 14, Team B 11, Team C 16, Team D 9. How many points did Team C score?", ["9", "11", "14", "16"], "16", 2),
    makeQuestion("A class survey shows 10 students like soccer, 6 like basketball, 8 like swimming, and 4 like tennis. Which sport did the fewest students choose?", ["Soccer", "Basketball", "Swimming", "Tennis"], "Tennis", 2),
    makeQuestion("A bar chart shows library visits: Mon 20, Tue 25, Wed 15, Thu 30. How many visits were there on Monday and Tuesday together?", ["35", "40", "45", "55"], "45", 2),
    makeQuestion("A chore chart shows minutes: dishes 12, sweeping 8, laundry 15, trash 5. Which chore took the least time?", ["Dishes", "Sweeping", "Laundry", "Trash"], "Trash", 2),
    makeQuestion("A chart shows stickers: stars 9, hearts 7, circles 5, squares 7. Which two shapes are tied?", ["Stars and hearts", "Hearts and squares", "Circles and squares", "Stars and circles"], "Hearts and squares", 2),

    makeQuestion("A step-count table shows Noga 3,000, Gideon 4,500, Gabriel 3,500, Teva 2,500. Who walked the most steps?", ["Noga", "Gideon", "Gabriel", "Teva"], "Gideon", 3),
    makeQuestion("Water cups drunk each day were Sun 5, Mon 7, Tue 6, Wed 8. Which statement is true?", ["Monday had the most cups", "Wednesday had the most cups", "Sunday and Tuesday were equal", "The total was 20 cups"], "Wednesday had the most cups", 3),
    makeQuestion("A chart shows pages read: Mon 12, Tue 18, Wed 15, Thu 20. How many more pages were read on Thursday than Monday?", ["6", "8", "10", "12"], "8", 3),
    makeQuestion("A table shows coins saved: Week 1: 8, Week 2: 12, Week 3: 11, Week 4: 15. How many coins were saved in all?", ["42", "44", "46", "48"], "46", 3),
    makeQuestion("A plant-height chart shows Plant A 9 cm, Plant B 12 cm, Plant C 10 cm, Plant D 7 cm. Which plant is second tallest?", ["Plant A", "Plant B", "Plant C", "Plant D"], "Plant C", 3),
    makeQuestion("A lunch chart shows pizza 14, pasta 10, salad 8, soup 6. How many more students chose pizza than soup?", ["6", "8", "10", "12"], "8", 3),
    makeQuestion("A line graph shows points scored by a team: Game 1: 5, Game 2: 8, Game 3: 12, Game 4: 11. Between which two games did the score increase the most?", ["Game 1 to Game 2", "Game 2 to Game 3", "Game 3 to Game 4", "It never increased"], "Game 2 to Game 3", 3),
    makeQuestion("A chart shows bus riders: Stop A 18, Stop B 24, Stop C 15, Stop D 21. Which stop had 3 fewer riders than Stop A?", ["Stop A", "Stop B", "Stop C", "Stop D"], "Stop C", 3),

    makeQuestion("A chart shows red marbles 4, blue 9, green 7, yellow 2. How many marbles are there in total?", ["20", "21", "22", "23"], "22", 4),
    makeQuestion("A graph shows 10 students chose soccer, 6 chose swimming, 8 chose basketball, and 4 chose tennis. Which sport was chosen by the fewest students?", ["Soccer", "Swimming", "Basketball", "Tennis"], "Tennis", 4),
    makeQuestion("A table shows tree heights: oak 12 m, pine 15 m, palm 9 m, maple 11 m. What is the range, meaning tallest minus shortest?", ["3 m", "4 m", "5 m", "6 m"], "6 m", 4),
    makeQuestion("A bar graph uses a scale of 2 votes per tick. Starting at 0, the bar reaches the tick labeled 14. How many votes is that?", ["7", "9", "14", "21"], "14", 4),
    makeQuestion("A chart shows practice minutes: Mon 20, Tue 30, Wed 25, Thu 35. What is the average number of minutes?", ["25", "27.5", "30", "35"], "27.5", 4),
    makeQuestion("A table shows fruit sold: apples 18, bananas 12, oranges 15, pears 9. Which two fruits together sold 30?", ["Apples and bananas", "Bananas and oranges", "Apples and pears", "Oranges and pears"], "Apples and bananas", 4),
    makeQuestion("A line graph shows temperature: 8 AM 12, 10 AM 16, 12 PM 20, 2 PM 22. What is the total increase from 8 AM to 2 PM?", ["6 degrees", "8 degrees", "10 degrees", "12 degrees"], "10 degrees", 4),
    makeQuestion("A pictograph key says one star means 5 books. If Mia has 4 stars, how many books did she read?", ["9", "15", "20", "25"], "20", 4),

    makeQuestion("A table shows tree heights: oak 12 m, pine 15 m, palm 9 m, maple 11 m. Which two trees together are 23 meters tall?", ["Oak and pine", "Oak and maple", "Palm and maple", "Pine and palm"], "Oak and maple", 5),
    makeQuestion("Library visitors were Week 1: 40, Week 2: 55, Week 3: 50, Week 4: 65. How many more visitors came in Week 4 than Week 1?", ["15", "20", "25", "30"], "25", 5),
    makeQuestion("A line graph shows savings: Jan 20, Feb 35, Mar 50, Apr 70. How much did savings increase from February to April?", ["20", "25", "30", "35"], "35", 5),
    makeQuestion("A pie chart has 4 equal parts. One part is labeled cycling. What fraction of the pie is cycling?", ["1/2", "1/3", "1/4", "3/4"], "1/4", 5),
    makeQuestion("A table shows test scores: 80, 90, 85, 95. What is the average score?", ["85", "87.5", "90", "92.5"], "87.5", 5),
    makeQuestion("A bar chart shows cans collected: Red 32, Blue 28, Green 35, Yellow 25. Which team collected 7 more cans than Blue?", ["Red", "Blue", "Green", "Yellow"], "Green", 5),
    makeQuestion("A chart shows rainfall: Mon 5 mm, Tue 0 mm, Wed 12 mm, Thu 8 mm. Which statement is best supported by the chart?", ["Tuesday had no rain", "Monday had the most rain", "Thursday had no rain", "The total rain was 30 mm"], "Tuesday had no rain", 5),
    makeQuestion("A double bar chart compares boys and girls in clubs. Chess: boys 8 girls 6. Art: boys 5 girls 9. Music: boys 7 girls 7. Which club has the same number of boys and girls?", ["Chess", "Art", "Music", "None"], "Music", 5),

    makeQuestion("A pictograph key says one icon means 4 students. A row has 6 icons. How many students does the row show?", ["10", "18", "24", "28"], "24", 6),
    makeQuestion("A line graph shows cumulative pages read: Mon 10, Tue 25, Wed 45, Thu 60. The total went from 25 pages on Tuesday to 45 pages on Wednesday. How many new pages were read on Wednesday?", ["15", "20", "35", "45"], "20", 6),
    makeQuestion("A table shows daily steps: Mon 4,200, Tue 5,100, Wed 4,800, Thu 5,900. What is the range, meaning largest value minus smallest value?", ["700", "1,100", "1,700", "10,100"], "1,700", 6),
    makeQuestion("A bar graph has a vertical axis labeled by 10s. A bar halfway between 40 and 50 is about what value?", ["42", "45", "50", "55"], "45", 6),
    makeQuestion("A chart shows book types in a class library: fiction 18, nonfiction 12, comics 6, poetry 4. What fraction of the 40 books are nonfiction?", ["3/10", "1/2", "3/5", "12/18"], "3/10", 6),
    makeQuestion("A table shows bike rides: Week 1: 6 km, Week 2: 9 km, Week 3: 12 km, Week 4: 15 km. What pattern does the chart show?", ["It increases by 3 km each week", "It decreases by 3 km each week", "It doubles each week", "It stays the same"], "It increases by 3 km each week", 6),
    makeQuestion("A pie chart shows favorite drinks: water 50%, juice 25%, milk 15%, soda 10%. Which drink got one quarter of the votes?", ["Water", "Juice", "Milk", "Soda"], "Juice", 6),
    makeQuestion("A graph shows temperatures: 16, 18, 20, 22, 24 from Monday to Friday. What is the best prediction for Saturday if the pattern continues?", ["22", "24", "26", "28"], "26", 6),

    makeQuestion("A school survey has 200 students. A bar chart shows 35% chose soccer. How many students chose soccer?", ["35", "50", "70", "100"], "70", 7),
    makeQuestion("A line graph shows plant height: Day 1: 4 cm, Day 3: 8 cm, Day 5: 12 cm. What is the growth rate per day?", ["1 cm per day", "2 cm per day", "4 cm per day", "8 cm per day"], "2 cm per day", 7),
    makeQuestion("A double bar chart shows apples sold. Morning: 24, afternoon: 36. What percent of the day's apples were sold in the afternoon?", ["36%", "50%", "60%", "75%"], "60%", 7),
    makeQuestion("A table shows quiz scores: 70, 80, 80, 90, 100. What is the median score?", ["80", "84", "90", "100"], "80", 7),
    makeQuestion("A histogram shows ages: 6-7 has 4 children, 8-9 has 9 children, 10-11 has 6 children, 12-13 has 1 child. Which age group has the highest frequency?", ["6-7", "8-9", "10-11", "12-13"], "8-9", 7),
    makeQuestion("A stacked bar shows 30 total lunches: 12 pizza, 9 pasta, 6 salad, 3 soup. What percent were pizza?", ["12%", "30%", "40%", "60%"], "40%", 7),
    makeQuestion("A chart shows temperatures for a week: 18, 20, 19, 21, 22, 20, 19. Which temperature is the mode?", ["18", "19", "20", "22"], "19", 7),
    makeQuestion("A line graph shows a plant grew from 10 cm to 25 cm in 5 days. What was the average growth per day?", ["2 cm per day", "3 cm per day", "5 cm per day", "15 cm per day"], "3 cm per day", 7),

    makeQuestion("A graph's y-axis starts at 90 instead of 0, making small differences look huge. What should a careful reader notice?", ["The axis is truncated", "The title is missing vowels", "The graph cannot have bars", "The data must be false"], "The axis is truncated", 8),
    makeQuestion("A line graph shows cumulative total money saved: Week 1: 10, Week 2: 25, Week 3: 45, Week 4: 70. How much was saved during Week 4 only?", ["20", "25", "45", "70"], "25", 8),
    makeQuestion("A table compares two classes. Class A has 12 out of 24 students who bike. Class B has 15 out of 30 students who bike. Which class has a larger biking rate?", ["Class A", "Class B", "They are equal", "Not enough information"], "They are equal", 8),
    makeQuestion("A scatter plot shows that students who practice more tend to score higher. What can you safely say?", ["There is a positive association", "Practice always causes a perfect score", "Scores cause practice time", "The graph shows no pattern"], "There is a positive association", 8),
    makeQuestion("A pie chart shows 40% dogs, 25% cats, 20% fish, 15% birds. If 80 people voted, how many voted for dogs?", ["20", "24", "32", "40"], "32", 8),
    makeQuestion("A graph shows daily visitors: Mon 100, Tue 120, Wed 180, Thu 160. Which day had the largest increase from the day before?", ["Tuesday", "Wednesday", "Thursday", "Monday"], "Wednesday", 8),
    makeQuestion("A table has values 3, 5, 7, 100. Which measure is pulled upward the most by the outlier 100?", ["Mean", "Median", "Mode", "Minimum"], "Mean", 8),
    makeQuestion("A bar chart compares two snacks. Snack A costs 10 shekels for 5 bars. Snack B costs 12 shekels for 8 bars. Which is cheaper per bar?", ["Snack A", "Snack B", "They cost the same", "Cannot tell from the chart"], "Snack B", 8),

    makeQuestion("A survey chart says 90% of voters liked the new playground, but only 10 people answered. What is the main weakness?", ["The sample is small", "Percentages are never useful", "Playgrounds cannot be surveyed", "90% is always wrong"], "The sample is small", 9),
    makeQuestion("A table shows runners' times in minutes: 8, 9, 10, 11, 27. Which measure best describes a typical time without being pulled by the outlier?", ["Median", "Mean", "Maximum", "Range"], "Median", 9),
    makeQuestion("A store chart shows sales rose from 80 to 100. What was the percent increase?", ["20%", "25%", "80%", "100%"], "25%", 9),
    makeQuestion("A line graph shows a car traveled 0 km at 0 min, 30 km at 30 min, and 60 km at 60 min. What speed does the graph show?", ["30 km per hour", "60 km per hour", "90 km per hour", "120 km per hour"], "60 km per hour", 9),
    makeQuestion("A histogram shows scores 0-49: 2 students, 50-69: 5, 70-89: 12, 90-100: 6. How many students scored 70 or higher?", ["12", "18", "20", "25"], "18", 9),
    makeQuestion("A graph compares total books read: Class A 120 books with 30 students, Class B 90 books with 15 students. Which class read more books per student?", ["Class A", "Class B", "They are equal", "Cannot tell"], "Class B", 9),
    makeQuestion("A line graph is almost straight from 10 to 20 to 30 to 40. Which value would be most reasonable next?", ["25", "40", "50", "100"], "50", 9),
    makeQuestion("A chart shows two groups. Group A improved from 40 to 60. Group B improved from 80 to 90. Which group had the larger percent increase?", ["Group A", "Group B", "They are equal", "Cannot tell"], "Group A", 9),

    makeQuestion("A city chart shows Neighborhood A has 50 bike crashes and 10,000 riders. Neighborhood B has 20 crashes and 2,000 riders. Which has the higher crash rate per rider?", ["Neighborhood A", "Neighborhood B", "They are equal", "Cannot tell"], "Neighborhood B", 10),
    makeQuestion("A graph shows ice cream sales and temperature rise together. Which conclusion is best supported by the graph?", ["They are associated", "Ice cream causes hot weather", "Hot weather is impossible", "The graph proves nothing exists"], "They are associated", 10),
    makeQuestion("A stacked chart shows a class has 12 boys and 18 girls. In another class, 10 boys and 10 girls. Which class has the higher percentage of girls?", ["First class", "Second class", "They are equal", "Cannot tell"], "First class", 10),
    makeQuestion("A chart shows test averages: small group 95 with 4 students, large group 80 with 16 students. What is the combined average?", ["83", "85", "87.5", "90"], "83", 10),
    makeQuestion("A graph uses different scales on two axes, making a weak pattern look strong. What should you check first?", ["Axis scales", "Favorite color", "Font name", "Whether bars are blue"], "Axis scales", 10),
    makeQuestion("A table shows revenue rose from 200 to 260, while costs rose from 150 to 240. What happened to profit?", ["Profit rose from 50 to 60", "Profit fell from 50 to 20", "Profit stayed 50", "Profit became 260"], "Profit fell from 50 to 20", 10),
    makeQuestion("A survey chart says 70% prefer tablets, but the survey was taken only at a tablet store. What problem should you notice?", ["Sampling bias", "The percent is over 50", "Charts cannot show opinions", "The sample is too colorful"], "Sampling bias", 10),
    makeQuestion("A cumulative graph rises by 5, then 5, then 5 each day. What would the daily bar chart for those same days show?", ["Equal bars of 5 each day", "Bars doubling every day", "Bars falling below zero", "One bar for the whole month only"], "Equal bars of 5 each day", 10),

    // Additional questions added to double each difficulty level from 8 to 16.
    makeQuestion("A color chart shows red 7, blue 5, green 2, purple 4. Which color got the most votes?", ["Red", "Blue", "Green", "Purple"], "Red", 1),
    makeQuestion("A cookie chart shows chocolate 6, vanilla 4, oatmeal 3, lemon 2. How many cookies are there altogether?", ["12", "14", "15", "17"], "15", 1),
    makeQuestion("A table shows pencils: Noga 5, Gideon 2, Eden 7, Teva 4. Who has the fewest pencils?", ["Noga", "Gideon", "Eden", "Teva"], "Gideon", 1),
    makeQuestion("A weather chart shows temperatures: Fri 19, Sat 22, Sun 20, Mon 18. What was the temperature on Saturday?", ["18", "19", "20", "22"], "22", 1),
    makeQuestion("A sticker chart shows stars 5, hearts 5, moons 3, suns 6. Which two shapes have the same number?", ["Stars and hearts", "Moons and suns", "Stars and suns", "Hearts and moons"], "Stars and hearts", 1),
    makeQuestion("A class chart shows apples 4, grapes 8, pears 6, plums 3. Which fruit got the most votes?", ["Apples", "Grapes", "Pears", "Plums"], "Grapes", 1),
    makeQuestion("A toy car chart shows red 2, blue 6, green 5, yellow 1. How many blue cars are shown?", ["1", "2", "5", "6"], "6", 1),
    makeQuestion("A reading chart shows Amir 3, Maya 5, Leo 4, Sara 2. How many books did Maya read?", ["2", "3", "4", "5"], "5", 1),
    makeQuestion("A fruit table shows apples 11, bananas 7, oranges 9, pears 5. How many more apples than pears are there?", ["4", "5", "6", "7"], "6", 2),
    makeQuestion("A pet survey shows dogs 8, cats 8, fish 4, birds 6. Which two pets are tied?", ["Dogs and cats", "Cats and fish", "Fish and birds", "Dogs and birds"], "Dogs and cats", 2),
    makeQuestion("A game-score chart shows Blue 13, Red 15, Green 10, Yellow 8. Which team scored the most?", ["Blue", "Red", "Green", "Yellow"], "Red", 2),
    makeQuestion("A water chart shows cups drunk: Mon 6, Tue 5, Wed 8, Thu 7. How many cups were drunk on Wednesday and Thursday together?", ["13", "14", "15", "16"], "15", 2),
    makeQuestion("A library chart shows visits: Class A 18, Class B 12, Class C 16, Class D 9. Which class had the fewest visits?", ["Class A", "Class B", "Class C", "Class D"], "Class D", 2),
    makeQuestion("A fruit chart shows bananas 10, grapes 7, apples 10, oranges 5. Which statement is true?", ["Bananas and apples are equal", "Grapes have the most", "Oranges and apples are equal", "There are 20 fruits total"], "Bananas and apples are equal", 2),
    makeQuestion("A chore chart shows minutes: dishes 10, sweeping 14, laundry 12, trash 4. Which chore took the least time?", ["Dishes", "Sweeping", "Laundry", "Trash"], "Trash", 2),
    makeQuestion("A sticker chart shows Raul 9, Mina 11, David 7, Lila 8. How many stickers did Mina collect?", ["7", "8", "9", "11"], "11", 2),
    makeQuestion("A bike-rider chart shows Stop A 12, Stop B 18, Stop C 15, Stop D 9. Which stop had the second most riders?", ["Stop A", "Stop B", "Stop C", "Stop D"], "Stop C", 3),
    makeQuestion("A line graph shows pages read: Mon 10, Tue 14, Wed 19, Thu 25. How many more pages were read on Thursday than Tuesday?", ["9", "10", "11", "15"], "11", 3),
    makeQuestion("A table shows coins saved: Week 1: 7, Week 2: 10, Week 3: 14, Week 4: 19. How many coins were saved in all?", ["40", "45", "50", "55"], "50", 3),
    makeQuestion("A lunch chart shows tacos 16, pizza 13, pasta 9, salad 6. How many more students chose tacos than salad?", ["8", "10", "12", "16"], "10", 3),
    makeQuestion("A plant-height chart shows Plant A 8 cm, Plant B 11 cm, Plant C 14 cm, Plant D 12 cm. Which plant is second tallest?", ["Plant A", "Plant B", "Plant C", "Plant D"], "Plant D", 3),
    makeQuestion("A temperature chart shows Mon 16, Tue 20, Wed 18, Thu 23. Which day was the warmest?", ["Monday", "Tuesday", "Wednesday", "Thursday"], "Thursday", 3),
    makeQuestion("A team chart shows points: Game 1: 6, Game 2: 9, Game 3: 9, Game 4: 13. Which two games had the same score?", ["Game 1 and Game 2", "Game 2 and Game 3", "Game 3 and Game 4", "Game 1 and Game 4"], "Game 2 and Game 3", 3),
    makeQuestion("A bus chart shows riders: Stop A 20, Stop B 17, Stop C 23, Stop D 14. Which stop had 3 fewer riders than Stop A?", ["Stop A", "Stop B", "Stop C", "Stop D"], "Stop B", 3),
    makeQuestion("A pictograph key says one circle means 3 students. If a row has 7 circles, how many students does it show?", ["10", "18", "21", "24"], "21", 4),
    makeQuestion("A table shows money saved: Jan 15, Feb 20, Mar 25, Apr 30. What is the average amount saved?", ["20", "22.5", "25", "30"], "22.5", 4),
    makeQuestion("A table shows tree heights: birch 10 m, cedar 16 m, palm 8 m, oak 12 m. What is the range, meaning tallest minus shortest?", ["6 m", "7 m", "8 m", "10 m"], "8 m", 4),
    makeQuestion("A bar graph uses a scale of 5 votes per tick. Starting at 0, the bar reaches the tick labeled 25. How many votes is that?", ["5", "20", "25", "30"], "25", 4),
    makeQuestion("A chart shows books: fiction 18, nonfiction 14, comics 8, poetry 10. How many books are there in total?", ["40", "45", "50", "55"], "50", 4),
    makeQuestion("A table shows fruit sold: apples 22, bananas 18, pears 12, grapes 8. How many apples and bananas were sold together?", ["30", "36", "40", "44"], "40", 4),
    makeQuestion("A line graph shows temperature: 9 AM 15, 11 AM 18, 1 PM 24, 3 PM 21. Between which two times did the temperature increase the most?", ["9 AM to 11 AM", "11 AM to 1 PM", "1 PM to 3 PM", "It never increased"], "11 AM to 1 PM", 4),
    makeQuestion("A chart shows practice minutes: Mon 16, Tue 24, Wed 20, Thu 28. What is the difference between the highest and lowest values?", ["8", "10", "12", "14"], "12", 4),
    makeQuestion("A pie chart has 5 equal parts. One part is labeled art. What fraction of the pie is art?", ["1/2", "1/3", "1/5", "2/5"], "1/5", 5),
    makeQuestion("A table shows test scores: 75, 85, 90, 90. What is the average score?", ["82.5", "85", "87.5", "90"], "85", 5),
    makeQuestion("A bar chart shows cans collected: Red 30, Blue 42, Green 36, Yellow 28. Which team collected 6 fewer cans than Blue?", ["Red", "Blue", "Green", "Yellow"], "Green", 5),
    makeQuestion("A rainfall chart shows Mon 4 mm, Tue 10 mm, Wed 0 mm, Thu 6 mm. How much rain fell in all?", ["16 mm", "18 mm", "20 mm", "24 mm"], "20 mm", 5),
    makeQuestion("A double bar chart compares boys and girls in clubs. Robotics: boys 6 girls 8. Art: boys 9 girls 9. Drama: boys 5 girls 7. Which club has the same number of boys and girls?", ["Robotics", "Art", "Drama", "None"], "Art", 5),
    makeQuestion("A line graph shows savings: Jan 25, Feb 40, Mar 55, Apr 80. How much did savings increase from January to April?", ["45", "50", "55", "60"], "55", 5),
    makeQuestion("A table shows tree heights: oak 14 m, pine 18 m, maple 9 m, palm 12 m. Which two trees together are 26 meters tall?", ["Oak and palm", "Pine and maple", "Oak and maple", "Pine and palm"], "Oak and palm", 5),
    makeQuestion("Library visitors were Week 1: 45, Week 2: 60, Week 3: 58, Week 4: 72. How many more visitors came in Week 4 than Week 2?", ["10", "12", "14", "27"], "12", 5),
    makeQuestion("A pictograph key says one icon means 6 students. A row has 5 icons. How many students does the row show?", ["11", "24", "30", "36"], "30", 6),
    makeQuestion("A cumulative distance graph shows Mon 2 km, Tue 7 km, Wed 11 km, Thu 18 km. How many kilometers were added on Thursday only?", ["5", "7", "11", "18"], "7", 6),
    makeQuestion("A table shows daily steps: Mon 3,800, Tue 4,600, Wed 5,200, Thu 4,100. What is the range, meaning largest value minus smallest value?", ["800", "1,100", "1,400", "9,000"], "1,400", 6),
    makeQuestion("A bar graph has a vertical axis labeled by 20s. A bar halfway between 60 and 80 is about what value?", ["65", "70", "75", "80"], "70", 6),
    makeQuestion("A chart shows book types in a class library: fiction 20, nonfiction 15, comics 10, poetry 5. What fraction of the 50 books are poetry?", ["1/10", "1/5", "1/4", "5/20"], "1/10", 6),
    makeQuestion("A table shows bike rides: Week 1: 4 km, Week 2: 8 km, Week 3: 12 km, Week 4: 16 km. What pattern does the chart show?", ["It increases by 4 km each week", "It decreases by 4 km each week", "It doubles each week", "It stays the same"], "It increases by 4 km each week", 6),
    makeQuestion("A pie chart shows favorite drinks: water 40%, juice 30%, milk 20%, soda 10%. Which drink got 3/10 of the votes?", ["Water", "Juice", "Milk", "Soda"], "Juice", 6),
    makeQuestion("A graph shows temperatures: 14, 17, 20, 23 from Monday to Thursday. What is the best prediction for Friday if the pattern continues?", ["23", "24", "26", "29"], "26", 6),
    makeQuestion("A school survey has 150 students. A bar chart shows 40% chose music. How many students chose music?", ["40", "50", "60", "75"], "60", 7),
    makeQuestion("A line graph shows plant height: Day 2: 6 cm, Day 4: 10 cm, Day 6: 14 cm. What is the growth rate per day?", ["1 cm per day", "2 cm per day", "4 cm per day", "6 cm per day"], "2 cm per day", 7),
    makeQuestion("A double bar chart shows cupcakes sold. Morning: 30, afternoon: 20. What percent of the day's cupcakes were sold in the morning?", ["40%", "50%", "60%", "75%"], "60%", 7),
    makeQuestion("A table shows quiz scores: 65, 75, 85, 95, 100. What is the median score?", ["75", "85", "90", "95"], "85", 7),
    makeQuestion("A histogram shows books read: 0-2 has 3 students, 3-5 has 8 students, 6-8 has 12 students, 9-11 has 5 students. Which group has the highest frequency?", ["0-2", "3-5", "6-8", "9-11"], "6-8", 7),
    makeQuestion("A stacked bar shows 40 total lunches: 10 pizza, 12 pasta, 8 salad, 10 soup. What percent were pasta?", ["12%", "25%", "30%", "40%"], "30%", 7),
    makeQuestion("A chart shows temperatures for a week: 21, 23, 21, 24, 25, 23, 21. Which temperature is the mode?", ["21", "23", "24", "25"], "21", 7),
    makeQuestion("A line graph shows a plant grew from 12 cm to 30 cm in 6 days. What was the average growth per day?", ["2 cm per day", "3 cm per day", "5 cm per day", "18 cm per day"], "3 cm per day", 7),
    makeQuestion("A graph's y-axis starts at 95 instead of 0, making the difference between 98 and 100 look very large. What should a careful reader notice?", ["The axis is truncated", "The numbers must be wrong", "The graph has no title", "Bars cannot show votes"], "The axis is truncated", 8),
    makeQuestion("A line graph shows cumulative total money saved: Week 1: 15, Week 2: 35, Week 3: 60, Week 4: 90. How much was saved during Week 3 only?", ["20", "25", "35", "60"], "25", 8),
    makeQuestion("A table compares two classes. Class A has 9 out of 18 students who walk. Class B has 10 out of 25 students who walk. Which class has the larger walking rate?", ["Class A", "Class B", "They are equal", "Not enough information"], "Class A", 8),
    makeQuestion("A scatter plot shows that students who sleep more tend to have higher quiz scores. What can you safely say?", ["There is a positive association", "Sleep always guarantees a perfect score", "Quiz scores cause sleep", "There is no pattern"], "There is a positive association", 8),
    makeQuestion("A pie chart shows 25% cats, 35% dogs, 20% fish, 20% birds. If 120 people voted, how many voted for cats?", ["25", "30", "35", "40"], "30", 8),
    makeQuestion("A graph shows daily visitors: Mon 80, Tue 95, Wed 90, Thu 125. Which day had the largest increase from the day before?", ["Tuesday", "Wednesday", "Thursday", "Monday"], "Thursday", 8),
    makeQuestion("A table has values 4, 6, 7, 8, 80. Which measure is pulled upward the most by the outlier 80?", ["Mean", "Median", "Mode", "Minimum"], "Mean", 8),
    makeQuestion("A bar chart compares two notebook packs. Pack A costs 15 shekels for 3 notebooks. Pack B costs 18 shekels for 6 notebooks. Which is cheaper per notebook?", ["Pack A", "Pack B", "They cost the same", "Cannot tell from the chart"], "Pack B", 8),
    makeQuestion("A survey chart says 85% of students liked the new lunch, but only 8 students answered. What is the main weakness?", ["The sample is small", "Percentages are never useful", "Lunch cannot be surveyed", "85% is always wrong"], "The sample is small", 9),
    makeQuestion("A table shows runners' times in minutes: 6, 7, 8, 9, 30. Which measure best describes a typical time without being pulled by the outlier?", ["Median", "Mean", "Maximum", "Range"], "Median", 9),
    makeQuestion("A store chart shows sales rose from 120 to 150. What was the percent increase?", ["20%", "25%", "30%", "50%"], "25%", 9),
    makeQuestion("A line graph shows a car traveled 0 km at 0 min, 40 km at 30 min, and 80 km at 60 min. What speed does the graph show?", ["40 km per hour", "60 km per hour", "80 km per hour", "120 km per hour"], "80 km per hour", 9),
    makeQuestion("A histogram shows scores 0-59: 4 students, 60-69: 6, 70-79: 10, 80-100: 5. How many students scored 70 or higher?", ["10", "15", "21", "25"], "15", 9),
    makeQuestion("A graph compares total pages read: Class A 150 pages with 25 students, Class B 108 pages with 18 students. Which class read more pages per student?", ["Class A", "Class B", "They are equal", "Cannot tell"], "They are equal", 9),
    makeQuestion("A line graph is almost straight from 5 to 15 to 25 to 35. Which value would be most reasonable next?", ["30", "35", "45", "70"], "45", 9),
    makeQuestion("A chart shows two groups. Group A improved from 50 to 75. Group B improved from 40 to 60. Which group had the larger percent increase?", ["Group A", "Group B", "They are equal", "Cannot tell"], "They are equal", 9),
    makeQuestion("A city chart shows Neighborhood A has 40 bike crashes and 8,000 riders. Neighborhood B has 30 crashes and 3,000 riders. Which has the higher crash rate per rider?", ["Neighborhood A", "Neighborhood B", "They are equal", "Cannot tell"], "Neighborhood B", 10),
    makeQuestion("A graph shows umbrella sales and rainy days rise together. Which conclusion is best supported by the graph?", ["They are associated", "Umbrellas cause rain", "Rain is impossible", "The graph proves there is no relationship"], "They are associated", 10),
    makeQuestion("A stacked chart shows one class has 16 boys and 24 girls. Another class has 9 boys and 11 girls. Which class has the higher percentage of girls?", ["First class", "Second class", "They are equal", "Cannot tell"], "First class", 10),
    makeQuestion("A chart shows test averages: Group A 90 with 10 students, Group B 70 with 30 students. What is the combined average?", ["75", "80", "82.5", "85"], "75", 10),
    makeQuestion("A graph uses uneven spacing on the time axis, making changes look faster or slower than they were. What should you check first?", ["Axis intervals", "Favorite color", "Font name", "Whether bars are blue"], "Axis intervals", 10),
    makeQuestion("A table shows revenue rose from 500 to 650, while costs rose from 420 to 600. What happened to profit?", ["Profit rose from 80 to 100", "Profit fell from 80 to 50", "Profit stayed 80", "Profit became 650"], "Profit fell from 80 to 50", 10),
    makeQuestion("A survey chart says 80% prefer soccer, but the survey was taken only at a soccer game. What problem should you notice?", ["Sampling bias", "The percent is over 50", "Charts cannot show opinions", "The sample is too colorful"], "Sampling bias", 10),
    makeQuestion("A cumulative graph rises by 12, then 8, then 10 across three days. What would the daily bar chart for those same days show?", ["Bars of 12, 8, and 10", "Equal bars of 10 each day", "Bars doubling every day", "One bar for the whole month only"], "Bars of 12, 8, and 10", 10),
  ];
})();


(() => {
  const questionUtils = globalThis.HomeworkQuestionUtils;
  if (!questionUtils) {
    return;
  }
  const {
    entry,
    numberOptions,
    pickGeneratedEntry,
    randomChoice,
    randomInt,
    renderLineGraph,
    renderPieTable,
    renderTable,
    shuffle,
  } = questionUtils;

  const DAILY_DATA_CONTEXTS = [
    {
      title: "Chore minutes",
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      unit: "minutes",
      low: 8,
      high: 34,
      trendQuestion: "What trend do the chore minutes show?",
    },
    {
      title: "Reading minutes",
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      unit: "minutes",
      low: 12,
      high: 48,
      trendQuestion: "What trend do the reading minutes show?",
    },
    {
      title: "Basketball shots made",
      labels: ["Game 1", "Game 2", "Game 3", "Game 4", "Game 5"],
      unit: "shots",
      low: 4,
      high: 22,
      trendQuestion: "What trend do the shots made show?",
    },
    {
      title: "Weather over days",
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      unit: "degrees",
      low: 12,
      high: 31,
      trendQuestion: "What trend do the temperatures show?",
    },
    {
      title: "Savings",
      labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
      unit: "shekels",
      low: 5,
      high: 75,
      trendQuestion: "What trend do the savings show?",
    },
    {
      title: "Screen time",
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      unit: "minutes",
      low: 15,
      high: 95,
      trendQuestion: "What trend do the screen time data show?",
    },
    {
      title: "Bean plant science experiment",
      labels: ["Day 1", "Day 3", "Day 5", "Day 7", "Day 9"],
      unit: "cm",
      low: 2,
      high: 24,
      trendQuestion: "What trend do the plant heights show?",
    },
    {
      title: "School vote results",
      labels: ["Art", "Sports", "Music", "Games", "Science"],
      unit: "votes",
      low: 8,
      high: 44,
      trendQuestion: "Which statement describes the vote counts?",
    },
    {
      title: "Bus wait times",
      labels: ["Stop A", "Stop B", "Stop C", "Stop D", "Stop E"],
      unit: "minutes",
      low: 3,
      high: 24,
      trendQuestion: "Which statement describes the bus wait times?",
    },
  ];

  const TWO_CHART_CONTEXTS = [
    {
      title: "Reading minutes: two weeks",
      labels: ["Mon", "Tue", "Wed", "Thu"],
      leftName: "Week 1",
      rightName: "Week 2",
      unit: "minutes",
      low: 12,
      high: 42,
    },
    {
      title: "Chore minutes: two kids",
      labels: ["Dishes", "Laundry", "Trash", "Sweep"],
      leftName: "Noga",
      rightName: "Gideon",
      unit: "minutes",
      low: 5,
      high: 30,
    },
    {
      title: "Soccer practice: two teams",
      labels: ["Passing", "Dribbling", "Shooting", "Defense"],
      leftName: "Blue",
      rightName: "Green",
      unit: "minutes",
      low: 8,
      high: 36,
    },
    {
      title: "Screen time: school days and weekend",
      labels: ["Games", "Videos", "Reading", "Messages"],
      leftName: "School days",
      rightName: "Weekend",
      unit: "minutes",
      low: 10,
      high: 70,
    },
    {
      title: "Bus schedule riders",
      labels: ["7:30", "7:45", "8:00", "8:15"],
      leftName: "Route A",
      rightName: "Route B",
      unit: "riders",
      low: 6,
      high: 34,
    },
  ];

  function makeSeries(context, difficulty, pattern = "mixed") {
    const spread = Math.max(5, Math.min(context.high - context.low, difficulty * 4 + 8));
    const start = randomInt(context.low, Math.max(context.low, context.high - spread));
    let current = start;
    return context.labels.map((label, index) => {
      if (pattern === "up") {
        current = index === 0 ? start : current + randomInt(2, 7);
      } else if (pattern === "down") {
        current = index === 0 ? start + spread : current - randomInt(2, 7);
      } else {
        current = randomInt(context.low, context.high);
      }
      return { label, value: Math.max(1, current) };
    });
  }

  function makeOutlierSeries(context, difficulty) {
    const center = randomInt(context.low + 3, Math.min(context.high - 3, context.low + 16));
    const values = context.labels.map((label) => ({ label, value: center + randomInt(-2, 2) }));
    const outlierIndex = randomInt(0, values.length - 1);
    const direction = Math.random() < 0.75 ? 1 : -1;
    values[outlierIndex].value = Math.max(1, center + direction * randomInt(12 + difficulty, 20 + difficulty * 3));
    return values;
  }

  function valuesSummary(values, unit = "") {
    return values.map((point) => `${point.label}: ${point.value}${unit ? ` ${unit}` : ""}`).join(", ");
  }

  function mean(values) {
    const total = values.reduce((sum, value) => sum + value, 0);
    return total / values.length;
  }

  function median(values) {
    const sorted = [...values].sort((left, right) => left - right);
    const middle = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
  }

  function formatNumber(value) {
    return Number.isInteger(value) ? String(value) : String(Math.round(value * 10) / 10);
  }

  function labelOptions(labels, answer) {
    return shuffle([answer, ...shuffle(labels.filter((label) => label !== answer)).slice(0, 3)]);
  }

  function createLineGraphQuestion(difficulty) {
    const context = randomChoice(DAILY_DATA_CONTEXTS);
    const values = makeSeries(context, difficulty, difficulty <= 3 ? "up" : "mixed");
    const askChange = difficulty >= 4 && Math.random() < 0.45;
    const first = values[0];
    const last = values[values.length - 1];
    if (askChange) {
      const answer = Math.abs(last.value - first.value);
      return entry({
        topic: "data-line-graphs",
        difficulty,
        question: `What is the difference between the first and last values?`,
        visualHtml: renderLineGraph(context.title, values),
        visualSummary: valuesSummary(values, context.unit),
        answer,
        options: numberOptions(answer, [-4, -2, -1, 1, 2, 4], 0),
      });
    }
    const answer = values.reduce((best, point) => (point.value > best.value ? point : best), values[0]).label;
    return entry({
      topic: "data-line-graphs",
      difficulty,
      question: `Which label has the highest value?`,
      visualHtml: renderLineGraph(context.title, values),
      visualSummary: valuesSummary(values, context.unit),
      answer,
      options: labelOptions(values.map((point) => point.label), answer),
    });
  }

  function createPieChartQuestion(difficulty) {
    const contexts = [
      { title: "After-school time", parts: ["Reading", "Math", "Art", "Sports"] },
      { title: "Class pet votes", parts: ["Fish", "Hamster", "Rabbit", "Lizard"] },
      { title: "Snack choices", parts: ["Apple", "Yogurt", "Crackers", "Carrots"] },
    ];
    const context = randomChoice(contexts);
    const rawValues = [randomInt(2, 5), randomInt(5, 9), randomInt(1, 4), randomInt(3, 7)];
    const parts = context.parts.map((label, index) => ({ label, value: rawValues[index] + index }));
    const askLargest = Math.random() < 0.65;
    const sorted = [...parts].sort((left, right) => right.value - left.value);
    return entry({
      topic: "data-pie-charts",
      difficulty,
      question: askLargest ? "Which category takes the largest share?" : "Which category takes the smallest share?",
      visualHtml: renderPieTable(context.title, parts),
      visualSummary: parts.map((part) => `${part.label}: ${part.value}`).join(", "),
      answer: askLargest ? sorted[0].label : sorted[sorted.length - 1].label,
      options: parts.map((part) => part.label),
    });
  }

  function createScatterplotQuestion(difficulty) {
    const contexts = [
      {
        title: "Study time and score",
        x: "Hours",
        y: "Score",
        rows: [[1, 62], [2, 70], [3, 78], [4, 85]],
        answer: "Scores tend to rise as study time rises",
      },
      {
        title: "Temperature and coat sales",
        x: "Temperature",
        y: "Coats sold",
        rows: [[35, 18], [45, 13], [55, 8], [65, 4]],
        answer: "Coat sales tend to fall as temperature rises",
      },
      {
        title: "Shoe size and quiz score",
        x: "Shoe size",
        y: "Score",
        rows: [[2, 81], [4, 77], [5, 86], [7, 79]],
        answer: "There is no clear pattern",
      },
    ];
    const picked = randomChoice(contexts);
    return entry({
      topic: "data-scatterplots",
      difficulty,
      question: "What pattern does the scatterplot data show?",
      visualHtml: renderTable(picked.title, [[picked.x, picked.y], ...picked.rows]),
      visualSummary: picked.rows.map((row) => `${row[0]}: ${row[1]}`).join(", "),
      answer: picked.answer,
      options: [
        picked.answer,
        "The second value always stays exactly the same",
        "There is no data to compare",
        picked.answer.includes("rise") ? "Scores tend to fall as study time rises" : "The values always rise together",
      ],
    });
  }

  function createTwoWayTableQuestion(difficulty) {
    const topLeft = randomInt(4, 12);
    const topRight = randomInt(3, 10);
    const bottomLeft = randomInt(2, 9);
    const bottomRight = randomInt(2, 9);
    const ask = randomChoice(["cell", "row", "column"]);
    if (ask === "row") {
      const answer = topLeft + topRight;
      return entry({
        topic: "data-two-way-tables",
        difficulty,
        question: "How many students took the bus in all?",
        visualHtml: renderTable("Class survey", [["", "Soccer", "Art"], ["Bus", topLeft, topRight], ["Walk", bottomLeft, bottomRight]]),
        answer,
        options: numberOptions(answer, [-topRight, -topLeft, -1, 1, bottomLeft, bottomRight], 0),
      });
    }
    if (ask === "column") {
      const answer = topLeft + bottomLeft;
      return entry({
        topic: "data-two-way-tables",
        difficulty,
        question: "How many students chose soccer in all?",
        visualHtml: renderTable("Class survey", [["", "Soccer", "Art"], ["Bus", topLeft, topRight], ["Walk", bottomLeft, bottomRight]]),
        answer,
        options: numberOptions(answer, [-bottomLeft, -topLeft, -1, 1, topRight, bottomRight], 0),
      });
    }
    return entry({
      topic: "data-two-way-tables",
      difficulty,
      question: "How many students chose bus and soccer?",
      visualHtml: renderTable("Class survey", [["", "Soccer", "Art"], ["Bus", topLeft, topRight], ["Walk", bottomLeft, bottomRight]]),
      answer: topLeft,
      options: numberOptions(topLeft, [-3, -2, -1, 1, 2, 3], 0),
    });
  }

  function createMisleadingGraphQuestion(difficulty) {
    const examples = [
      {
        displayText: "A bar graph comparing 48 votes and 50 votes starts its y-axis at 45 instead of 0.",
        answer: "The small difference can look much larger than it is",
      },
      {
        displayText: "A pictograph says one icon equals 5 students, but the last icon is half-size and not explained.",
        answer: "The symbol scale is unclear",
      },
      {
        displayText: "A graph title says 'Best snack,' but it only surveyed one small class.",
        answer: "The title makes a broad claim from a small sample",
      },
    ];
    const picked = randomChoice(examples);
    return entry({
      topic: "data-misleading-graphs",
      difficulty,
      question: "Why could this graph be misleading?",
      displayText: picked.displayText,
      answer: picked.answer,
      options: [
        picked.answer,
        "Graphs are never useful",
        "The title must always be one word",
        "Numbers cannot be shown in graphs",
      ],
    });
  }

  function createSamplingBiasQuestion(difficulty) {
    const examples = [
      {
        question: "Which sample is least biased for asking what the whole school wants for lunch?",
        answer: "Ask randomly chosen students from every grade",
        wrong: ["Ask only the pizza club", "Ask only one best friend", "Ask only students already in the taco line"],
      },
      {
        question: "Which sample is best for learning how families get to school?",
        answer: "Ask a random mix of families from all grades",
        wrong: ["Ask only bus riders", "Ask only walkers", "Ask only the teacher's family"],
      },
      {
        question: "Which survey plan is fairest for choosing a school event?",
        answer: "Give every class a similar chance to answer",
        wrong: ["Ask only students already at chess club", "Ask only the loudest table", "Ask only people who agree with you"],
      },
    ];
    const picked = randomChoice(examples);
    return entry({
      topic: "data-sampling-bias",
      difficulty,
      question: picked.question,
      answer: picked.answer,
      options: [picked.answer, ...picked.wrong],
    });
  }

  function createOutlierAverageQuestion(difficulty) {
    const middle = randomInt(7, 12);
    const values = [middle - 1, middle, middle, middle + 1];
    const outlier = difficulty >= 6 ? middle + randomInt(25, 45) : middle + randomInt(12, 20);
    const mean = Math.round((values.reduce((sum, value) => sum + value, 0) + outlier) / 5);
    const median = middle;
    const askMean = difficulty >= 5 && Math.random() < 0.45;
    return entry({
      topic: "data-averages-outliers",
      difficulty,
      question: askMean ? "Which statement about the mean is true?" : "Which statement best describes the average with an outlier?",
      displayText: `Scores: ${[...values, outlier].join(", ")}`,
      answer: askMean ? `The mean is about ${mean}, pulled upward by ${outlier}` : `The median ${median} better describes the typical score`,
      options: askMean
        ? [`The mean is about ${mean}, pulled upward by ${outlier}`, `The mean is exactly ${median}`, "The outlier has no effect on the mean", "The mean must be the largest number"]
        : [`The median ${median} better describes the typical score`, `The median is ${outlier}`, "There is no outlier", "All scores are close together"],
    });
  }

  function createTrendQuestion(difficulty) {
    const context = randomChoice(DAILY_DATA_CONTEXTS);
    const pattern = randomChoice(["up", "down", "mixed"]);
    const values = makeSeries(context, difficulty, pattern);
    const answer =
      pattern === "up"
        ? "The values mostly increase"
        : pattern === "down"
          ? "The values mostly decrease"
          : "The values go up and down";
    return entry({
      topic: "data-trends",
      difficulty,
      question: context.trendQuestion,
      visualHtml: renderLineGraph(context.title, values),
      visualSummary: valuesSummary(values, context.unit),
      answer,
      options: [
        answer,
        "The values stay exactly the same",
        pattern === "up" ? "The values mostly decrease" : "The values mostly increase",
        "The graph has no data points",
      ],
    });
  }
  createTrendQuestion.minLevel = 3;

  function createOutlierQuestion(difficulty) {
    const context = randomChoice(DAILY_DATA_CONTEXTS);
    const values = makeOutlierSeries(context, difficulty);
    const sorted = [...values].sort((left, right) => left.value - right.value);
    const lowGap = sorted[1].value - sorted[0].value;
    const highGap = sorted[sorted.length - 1].value - sorted[sorted.length - 2].value;
    const outlier = highGap >= lowGap ? sorted[sorted.length - 1] : sorted[0];
    return entry({
      topic: "data-outliers",
      difficulty,
      question: "Which data point is the outlier?",
      visualHtml: renderTable(context.title, [["Label", context.unit], ...values.map((point) => [point.label, point.value])]),
      visualSummary: valuesSummary(values, context.unit),
      answer: outlier.label,
      options: labelOptions(values.map((point) => point.label), outlier.label),
    });
  }
  createOutlierQuestion.minLevel = 5;

  function createMeanMedianQuestion(difficulty) {
    const context = randomChoice(DAILY_DATA_CONTEXTS.filter((item) => item.labels.length >= 5));
    const values = makeSeries(context, difficulty, "mixed").slice(0, 5);
    const numericValues = values.map((point) => point.value);
    const askMedian = difficulty >= 6 && Math.random() < 0.5;
    const answerValue = askMedian ? median(numericValues) : mean(numericValues);
    const answer = formatNumber(answerValue);
    return entry({
      topic: "data-mean-median",
      difficulty,
      question: askMedian ? "What is the median value?" : "What is the mean value?",
      visualHtml: renderTable(context.title, [["Label", context.unit], ...values.map((point) => [point.label, point.value])]),
      visualSummary: valuesSummary(values, context.unit),
      answer,
      options: numberOptions(answerValue, [-4, -2, -1, 1, 2, 4], 0).map(formatNumber),
    });
  }
  createMeanMedianQuestion.minLevel = 4;

  function createCompareTwoChartsQuestion(difficulty) {
    const context = randomChoice(TWO_CHART_CONTEXTS);
    const leftValues = makeSeries(context, difficulty, "mixed").slice(0, 4);
    const deltas = shuffle([-6, -2, 3, 7]);
    const rightValues = leftValues.map((point, index) => ({
      label: point.label,
      value: Math.max(1, point.value + deltas[index]),
    }));
    const rows = leftValues.map((point, index) => [
      point.label,
      point.value,
      rightValues[index].value,
    ]);
    const differences = rows.map((row) => ({
      label: row[0],
      change: row[2] - row[1],
    }));
    const answer = [...differences].sort((left, right) => right.change - left.change)[0].label;
    return entry({
      topic: "data-compare-two-charts",
      difficulty,
      question: `Compare the two charts. Which category increased the most from ${context.leftName} to ${context.rightName}?`,
      visualHtml: renderTable(context.title, [["Category", context.leftName, context.rightName], ...rows]),
      visualSummary: rows.map((row) => `${row[0]}: ${context.leftName} ${row[1]}, ${context.rightName} ${row[2]}`).join(", "),
      answer,
      options: rows.map((row) => row[0]),
    });
  }
  createCompareTwoChartsQuestion.minLevel = 5;

  function createMisleadingAxisQuestion(difficulty) {
    const examples = [
      {
        title: "School vote results",
        rows: [["Choice", "Votes"], ["Movie", 48], ["Game day", 50]],
        displayText: "The bar graph starts its vote axis at 45 instead of 0.",
        answer: "The small difference can look much larger than it is",
      },
      {
        title: "Weather over days",
        rows: [["Day", "Degrees"], ["Monday", 68], ["Tuesday", 70]],
        displayText: "The temperature graph zooms in from 67 to 71 degrees.",
        answer: "The zoomed axis can exaggerate a small change",
      },
      {
        title: "Bus schedule riders",
        rows: [["Route", "Riders"], ["Route A", 92], ["Route B", 96]],
        displayText: "The rider chart labels only 90 to 100 on its axis.",
        answer: "The truncated axis makes the bars look very different",
      },
    ];
    const picked = randomChoice(examples);
    return entry({
      topic: "data-misleading-axis",
      difficulty,
      question: "What should a careful reader notice about the axis?",
      displayText: picked.displayText,
      visualHtml: renderTable(picked.title, picked.rows),
      answer: picked.answer,
      options: [
        picked.answer,
        "The data must be fake because it uses numbers",
        "The title should be ignored",
        "The graph proves one choice is twice as large",
      ],
    });
  }
  createMisleadingAxisQuestion.minLevel = 6;

  const dataGenerators = [
    createLineGraphQuestion,
    createPieChartQuestion,
    createScatterplotQuestion,
    createTwoWayTableQuestion,
    createMisleadingGraphQuestion,
    createSamplingBiasQuestion,
    createOutlierAverageQuestion,
    createTrendQuestion,
    createOutlierQuestion,
    createMeanMedianQuestion,
    createCompareTwoChartsQuestion,
    createMisleadingAxisQuestion,
  ];

  globalThis.createChartsAndGraphsGeneratedEntry = (difficulty) =>
    pickGeneratedEntry(dataGenerators, difficulty);
  globalThis.CHARTS_AND_GRAPHS_GENERATOR_COVERAGE = {
    line: createLineGraphQuestion,
    trend: createTrendQuestion,
    outlier: createOutlierQuestion,
    meanMedian: createMeanMedianQuestion,
    compareTwoCharts: createCompareTwoChartsQuestion,
    misleadingAxis: createMisleadingAxisQuestion,
  };
})();