const CALENDAR_DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const CALENDAR_MONTHS = [
  { name: "January", days: 31 },
  { name: "February", days: 28 },
  { name: "March", days: 31 },
  { name: "April", days: 30 },
  { name: "May", days: 31 },
  { name: "June", days: 30 },
  { name: "July", days: 31 },
  { name: "August", days: 31 },
  { name: "September", days: 30 },
  { name: "October", days: 31 },
  { name: "November", days: 30 },
  { name: "December", days: 31 },
];

const CALENDAR_QUESTIONS = [
  // Level 1: basic calendar facts.
  calendarStatic("Which month comes after April?", "May", ["March", "May", "June", "July"], 1),
  calendarStatic("How many days are in 1 week?", "7", ["5", "6", "7", "8"], 1),
  calendarStatic("Which month comes before November?", "October", ["September", "October", "December", "January"], 1),
  calendarStatic("How many months are in a year?", "12", ["10", "11", "12", "13"], 1),
  calendarStatic("Which month comes after July?", "August", ["June", "August", "September", "October"], 1),
  calendarStatic("Which month comes before March?", "February", ["January", "February", "April", "May"], 1),
  calendarStatic("If today is Monday, what day is tomorrow?", "Tuesday", ["Tuesday", "Wednesday", "Thursday", "Friday"], 1),
  calendarStatic("If today is Sunday, what day was yesterday?", "Saturday", ["Friday", "Saturday", "Monday", "Tuesday"], 1),
  calendarStatic("Which days are usually called the weekend?", "Saturday and Sunday", ["Monday and Tuesday", "Saturday and Sunday", "Wednesday and Thursday", "Thursday and Friday"], 1),
  calendarStatic("How many months are in half a year?", "6", ["4", "5", "6", "7"], 1),
  calendarStatic("Which month comes after November?", "December", ["October", "November", "December", "January"], 1),
  calendarStatic("Which month is the first month of the year?", "January", ["January", "March", "June", "December"], 1),

  // Level 2: short offsets, seasons, and simple week conversions.
  calendarStatic("If today is Tuesday, what day will it be in 3 days?", "Friday", ["Thursday", "Friday", "Saturday", "Sunday"], 2),
  calendarStatic("Which month has 28 or 29 days?", "February", ["January", "February", "March", "April"], 2),
  calendarStatic("If today is Thursday, what day will it be in 2 days?", "Saturday", ["Friday", "Saturday", "Sunday", "Monday"], 2),
  calendarStatic("Which month comes after February?", "March", ["January", "March", "April", "May"], 2),
  calendarStatic("How many days are in 2 weeks?", "14", ["7", "10", "14", "21"], 2),
  calendarStatic("Which month comes after September?", "October", ["August", "October", "November", "December"], 2),
  calendarStatic("If today is Friday, what day was it 3 days ago?", "Tuesday", ["Sunday", "Monday", "Tuesday", "Wednesday"], 2),
  calendarStatic("Which month has 30 days and comes after May?", "June", ["May", "June", "July", "August"], 2),
  calendarStatic("Which season comes after winter in many places?", "Spring", ["Spring", "Summer", "Autumn", "Winter"], 2),
  calendarStatic("Which month comes before August?", "July", ["June", "July", "September", "October"], 2),
  calendarStatic("How many weeks are in 28 days?", "4", ["3", "4", "5", "6"], 2),
  calendarStatic("If today is Saturday, what day will it be in 4 days?", "Wednesday", ["Sunday", "Monday", "Tuesday", "Wednesday"], 2),

  // Level 3: date arithmetic inside a month, leap February, and elapsed days.
  calendarStatic("If today is the 9th and a trip starts on the 15th, how many days are left until the trip?", "6 days", ["5 days", "6 days", "7 days", "8 days"], 3),
  calendarStatic("How many days are in February during a leap year?", "29", ["28", "29", "30", "31"], 3),
  calendarStatic("How many weeks are in 14 days?", "2 weeks", ["1 week", "2 weeks", "3 weeks", "4 weeks"], 3),
  calendarStatic("Start on June 22. After 5 full days pass, what date is it?", "June 27", ["June 25", "June 26", "June 27", "June 28"], 3),
  calendarStatic("If today is March 4, after 3 full days pass, what date is it?", "March 7", ["March 5", "March 6", "March 7", "March 8"], 3),
  calendarStatic("How many days are in 6 weeks?", "42", ["35", "40", "42", "45"], 3),
  calendarStatic("If today is Tuesday, what day will it be in 9 days?", "Thursday", ["Tuesday", "Wednesday", "Thursday", "Friday"], 3),
  calendarStatic("How many days are between the 8th and the 13th, not counting the 8th?", "5", ["4", "5", "6", "7"], 3),
  calendarStatic("Which month is the shortest month?", "February", ["January", "February", "March", "April"], 3),
  calendarStatic("Which month has 31 days?", "July", ["April", "June", "September", "July"], 3),
  calendarStatic("If today is Sunday, what day was it 1 week ago?", "Sunday", ["Saturday", "Sunday", "Monday", "Tuesday"], 3),
  calendarStatic("Start on January 5. After 10 full days pass, what date is it?", "January 15", ["January 13", "January 14", "January 15", "January 16"], 3),

  // Level 4: longer offsets, month offsets, and school-week thinking.
  calendarStatic("School starts on Monday. Counting Monday as day 1, it lasts for 5 school days. On which day does it end?", "Friday", ["Thursday", "Friday", "Saturday", "Sunday"], 4),
  calendarStatic("Start on August 12. After 7 full days pass, what date is it?", "August 19", ["August 17", "August 18", "August 19", "August 20"], 4),
  calendarStatic("Which month is 3 months after February?", "May", ["April", "May", "June", "July"], 4),
  calendarStatic("If today is Sunday, what day will it be in 9 days?", "Tuesday", ["Monday", "Tuesday", "Wednesday", "Thursday"], 4),
  calendarStatic("If today is Thursday, what day will it be in 15 days?", "Friday", ["Thursday", "Friday", "Saturday", "Sunday"], 4),
  calendarStatic("Start on January 12. After 10 full days pass, what date is it?", "January 22", ["January 20", "January 21", "January 22", "January 23"], 4),
  calendarStatic("Which month is 4 months after February?", "June", ["April", "May", "June", "July"], 4),
  calendarStatic("How many days are in 7 weeks?", "49", ["42", "45", "49", "56"], 4),
  calendarStatic("Start on April 8. After 14 full days pass, what date is it?", "April 22", ["April 20", "April 21", "April 22", "April 23"], 4),
  calendarStatic("If today is Saturday, what day was it 10 days ago?", "Wednesday", ["Tuesday", "Wednesday", "Thursday", "Friday"], 4),
  calendarStatic("Which month has 31 days and comes after June?", "July", ["June", "July", "August", "September"], 4),
  calendarStatic("Which month comes 4 months after August?", "December", ["November", "December", "January", "February"], 4),

  // Level 5: cross-month movement, common years, and longer cycles.
  calendarStatic("Which month has 30 days?", "April", ["April", "May", "July", "January"], 5),
  calendarStatic("If today is Friday, what day will it be in 10 days?", "Monday", ["Sunday", "Monday", "Tuesday", "Wednesday"], 5),
  calendarStatic("How many days are in a normal year?", "365", ["360", "365", "366", "370"], 5),
  calendarStatic("Which month is 2 months after May?", "July", ["June", "July", "August", "September"], 5),
  calendarStatic("If today is Tuesday, what day will it be in 20 days?", "Monday", ["Sunday", "Monday", "Tuesday", "Wednesday"], 5),
  calendarStatic("Which month is 5 months after August?", "January", ["December", "January", "February", "March"], 5),
  calendarStatic("Start on July 4. After 21 full days pass, what date is it?", "July 25", ["July 23", "July 24", "July 25", "July 26"], 5),
  calendarStatic("Start on November 17. After 14 full days pass, what date is it?", "December 1", ["November 29", "November 30", "December 1", "December 2"], 5),
  calendarStatic("How many days are in 8 weeks?", "56", ["48", "52", "56", "60"], 5),
  calendarStatic("Which month is 5 months after September?", "February", ["January", "February", "March", "April"], 5),
  calendarStatic("If today is Friday, what day was it 17 days ago?", "Tuesday", ["Monday", "Tuesday", "Wednesday", "Thursday"], 5),
  calendarStatic("Start on August 20. After 30 full days pass, what date is it?", "September 19", ["September 17", "September 18", "September 19", "September 20"], 5),

  // Level 6: the useful life lesson that months are not exactly 4 weeks.
  calendarStatic("Why is it usually wrong to say that 1 month is exactly 4 weeks?", "Most months have 30 or 31 days", ["Every month has 28 days", "Most months have 30 or 31 days", "A week has 10 days", "A year has 10 months"], 6),
  calendarStatic("How many days are in exactly 4 weeks?", "28 days", ["27 days", "28 days", "30 days", "31 days"], 6),
  calendarStatic("About how long is the average month in a normal 365-day year?", "About 30.4 days", ["Exactly 28 days", "About 30.4 days", "Exactly 35 days", "About 52 days"], 6),
  calendarStatic("How many days are in 52 weeks?", "364 days", ["360 days", "364 days", "365 days", "366 days"], 6),
  calendarStatic("A normal 365-day year is 52 weeks plus what?", "1 extra day", ["No extra days", "1 extra day", "2 extra days", "7 extra days"], 6),
  calendarStatic("A lesson happens every Tuesday for 5 weeks. How many lessons happen?", "5 lessons", ["4 lessons", "5 lessons", "6 lessons", "7 lessons"], 6),
  calendarStatic("A club meets every other week. About how many meetings are in 8 weeks?", "4 meetings", ["2 meetings", "4 meetings", "6 meetings", "8 meetings"], 6),
  calendarStatic("School days are Monday through Friday. How many school days are in 2 full weeks?", "10 school days", ["7 school days", "10 school days", "12 school days", "14 school days"], 6),
  calendarStatic("Start on March 1. After exactly 4 full weeks pass, what date is it?", "March 29", ["March 28", "March 29", "March 31", "April 1"], 6),
  calendarStatic("A bill is due on the 15th of each month. After March 15, when is the next due date?", "April 15", ["March 29", "April 12", "April 15", "May 15"], 6),
  calendarStatic("Which is longer: February in a normal year or exactly 4 weeks?", "They are the same", ["February is longer", "Exactly 4 weeks is longer", "They are the same", "You cannot compare them"], 6),
  calendarStatic("Which is longer: April or exactly 4 weeks?", "April", ["April", "Exactly 4 weeks", "They are the same", "Neither has days"], 6),

  // Level 7: planning with weeks, months, quarters, and elapsed days.
  calendarStatic("If today is Monday, what day will it be in 45 days?", "Thursday", ["Wednesday", "Thursday", "Friday", "Saturday"], 7),
  calendarStatic("January has 31 days. That is 4 full weeks plus how many extra days?", "3 extra days", ["1 extra day", "2 extra days", "3 extra days", "4 extra days"], 7),
  calendarStatic("How many days are in 3 weeks and 4 days?", "25 days", ["21 days", "24 days", "25 days", "28 days"], 7),
  calendarStatic("About how many months is 90 days?", "About 3 months", ["About 1 month", "About 2 months", "About 3 months", "About 6 months"], 7),
  calendarStatic("A form is due May 20. What date is 14 full days before the due date?", "May 6", ["May 4", "May 5", "May 6", "May 7"], 7),
  calendarStatic("What is the last day of April?", "April 30", ["April 28", "April 29", "April 30", "April 31"], 7),
  calendarStatic("Which months are in the first quarter of the year?", "January, February, March", ["January, February, March", "April, May, June", "July, August, September", "October, November, December"], 7),
  calendarStatic("If practice happens twice a month for 6 months, how many practices is that?", "12 practices", ["6 practices", "8 practices", "12 practices", "18 practices"], 7),
  calendarStatic("An event happens every 10 days. Counting June 1 as the first event, what is the third event date?", "June 21", ["June 11", "June 20", "June 21", "July 1"], 7),
  calendarStatic("How many days are in 13 weeks?", "91 days", ["84 days", "90 days", "91 days", "98 days"], 7),
  calendarStatic("If a reminder repeats every 3 weeks, how many days are between reminders?", "21 days", ["14 days", "21 days", "28 days", "30 days"], 7),
  calendarStatic("A subscription renews every month, not every 4 weeks. What is true?", "The renewal date usually stays on the same day number", ["It always renews every 28 days", "The renewal date usually stays on the same day number", "It renews every 13 days", "It skips all short months"], 7),

  // Level 8: leap-year rules, quarterly schedules, and calendar grids.
  calendarStatic("Which year is a leap year?", "2024", ["2023", "2024", "2025", "2026"], 8),
  calendarStatic("If checkups are quarterly, how many checkups happen in 1 year?", "4", ["2", "3", "4", "6"], 8),
  calendarStatic("A semiannual event happens how often?", "Twice a year", ["Every week", "Every month", "Twice a year", "Every 10 years"], 8),
  calendarStatic("A reminder repeats on the 31st of each month. Which month can cause a problem because it has no 31st?", "April", ["January", "March", "April", "July"], 8),
  calendarStatic("If your birthday is on a Tuesday, what day of the week is it 7 days later?", "Tuesday", ["Monday", "Tuesday", "Wednesday", "Thursday"], 8),
  calendarStatic("In a normal year, start on January 1. After 60 full days pass, what date is it?", "March 2", ["February 28", "March 1", "March 2", "March 3"], 8),
  calendarStatic("Start on April 1. After 100 full days pass, what date is it?", "July 10", ["July 8", "July 9", "July 10", "July 11"], 8),
  calendarStatic("If the 1st day of a month is Friday, what day is the 15th?", "Friday", ["Thursday", "Friday", "Saturday", "Sunday"], 8),
  calendarStatic("If a 31-day month starts on Sunday, how many calendar rows does it use?", "5 rows", ["4 rows", "5 rows", "6 rows", "7 rows"], 8),
  calendarStatic("Which months are in the second quarter of the year?", "April, May, June", ["January, February, March", "April, May, June", "July, August, September", "October, November, December"], 8),
  calendarStatic("What is the basic rule for most leap years?", "A year divisible by 4 is usually a leap year", ["Every even year is a leap year", "A year divisible by 4 is usually a leap year", "Every 5th year is a leap year", "Only years ending in 0 are leap years"], 8),
  calendarStatic("How many months are in 2 quarters?", "6 months", ["3 months", "4 months", "6 months", "8 months"], 8),

  // Level 9: real planning with inclusive counts, business days, and leap dates.
  calendarStatic("In leap year 2024, start on February 28. After 1 full day passes, what date is it?", "February 29", ["February 27", "February 29", "March 1", "March 2"], 9),
  calendarStatic("In common year 2025, start on February 28. After 1 full day passes, what date is it?", "March 1", ["February 29", "March 1", "March 2", "March 3"], 9),
  calendarStatic("School days are Monday through Friday. How many school days are from Wednesday through the next Tuesday, including both days?", "5 school days", ["4 school days", "5 school days", "6 school days", "7 school days"], 9),
  calendarStatic("In 2024, a meeting is every other Friday starting January 5. After the January 19 meeting, what is the next meeting date?", "February 2", ["January 26", "February 1", "February 2", "February 9"], 9),
  calendarStatic("A 30-day project starts on August 20. After 30 full days pass, what date is it?", "September 19", ["September 17", "September 18", "September 19", "September 20"], 9),
  calendarStatic("Start on May 1. After 4 full weeks pass, what date is it?", "May 29", ["May 28", "May 29", "May 31", "June 1"], 9),
  calendarStatic("Why is 2 calendar months usually more than 8 weeks?", "Most pairs of months have more than 56 days", ["8 weeks is 80 days", "Most pairs of months have more than 56 days", "A month has only 20 days", "There are no weeks in months"], 9),
  calendarStatic("How many quarters are in a year?", "4", ["2", "3", "4", "12"], 9),
  calendarStatic("What is true about February 29 birthdays?", "The exact date appears only in leap years", ["The exact date appears every year", "The exact date appears only in leap years", "They happen every month", "They are always on Sunday"], 9),
  calendarStatic("How many days are counted from Monday the 8th through Friday the 12th, including both days?", "5 days", ["3 days", "4 days", "5 days", "6 days"], 9),
  calendarStatic("If a month starts on Saturday and has 31 days, how many calendar rows does it use?", "6 rows", ["4 rows", "5 rows", "6 rows", "7 rows"], 9),
  calendarStatic("A reminder is every 6 weeks. How many days are between reminders?", "42 days", ["35 days", "40 days", "42 days", "48 days"], 9),

  // Level 10: advanced calendar reasoning and Gregorian leap-year exceptions.
  calendarStatic("Why was the year 2000 a leap year?", "It is divisible by 400", ["It is divisible by 3", "It is divisible by 400", "All century years are leap years", "It has 31 days"], 10),
  calendarStatic("Why will 2100 not be a leap year in the Gregorian calendar?", "It is divisible by 100 but not by 400", ["It is divisible by 4 only", "It is divisible by 100 but not by 400", "It has an odd number", "February always has 29 days"], 10),
  calendarStatic("Why was 1900 not a leap year in the Gregorian calendar?", "Century years must be divisible by 400", ["It was not divisible by 4", "Century years must be divisible by 400", "It had no February", "It started on Monday"], 10),
  calendarStatic("Which happens more often in a 52-week year: monthly payments or payments every 4 weeks?", "Payments every 4 weeks", ["Monthly payments", "Payments every 4 weeks", "They are always equal", "Neither happens"], 10),
  calendarStatic("If today is Friday, what day will it be in 10 weeks?", "Friday", ["Monday", "Wednesday", "Friday", "Sunday"], 10),
  calendarStatic("26 weeks is closest to what part of a 52-week year?", "Half a year", ["One month", "One quarter", "Half a year", "Two years"], 10),
  calendarStatic("A project is due March 1, 2024. What date is 1 full day before it?", "February 29, 2024", ["February 28, 2024", "February 29, 2024", "March 0, 2024", "March 2, 2024"], 10),
  calendarStatic("A project is due March 1, 2025. What date is 1 full day before it?", "February 28, 2025", ["February 28, 2025", "February 29, 2025", "March 0, 2025", "March 2, 2025"], 10),
  calendarStatic("An event happens every 15 days, counting January 1, 2025 as the first event. What is the 5th event date?", "March 2, 2025", ["February 28, 2025", "March 1, 2025", "March 2, 2025", "March 3, 2025"], 10),
  calendarStatic("Which statement about a 3-month quarter is true?", "It is not always exactly 13 weeks", ["It is always exactly 90 days", "It is always exactly 13 weeks", "It is not always exactly 13 weeks", "It always has February"], 10),
  calendarStatic("A subscription bills every 4 weeks. About how many bills are there in 52 weeks?", "13 bills", ["10 bills", "12 bills", "13 bills", "14 bills"], 10),
  calendarStatic("A date is moved forward by 400 years in the Gregorian calendar. What usually stays the same?", "The leap-year pattern repeats", ["Every month becomes 28 days", "The leap-year pattern repeats", "Weeks disappear", "The year becomes shorter"], 10),
];

function createCalendarGeneratedEntry(difficulty) {
  const level = calendarClampDifficulty(difficulty);
  const generators = {
    1: [
      calendarGenerateAdjacentMonth,
      calendarGenerateTomorrow,
      calendarGenerateYesterday,
      calendarGenerateBasicFact,
    ],
    2: [
      calendarGenerateShortDayOffset,
      calendarGenerateAdjacentMonth,
      calendarGenerateWeeksToDays,
      calendarGenerateDragPlanner,
      calendarGenerateSeasonQuestion,
    ],
    3: [
      calendarGenerateDateShiftWithinMonth,
      calendarGenerateWeeksToDays,
      calendarGenerateDaysBetween,
      calendarGenerateMonthlyPatternHunt,
      calendarGenerateLeapFebruary,
    ],
    4: [
      calendarGenerateLongDayOffset,
      calendarGenerateMonthOffset,
      calendarGenerateDateShiftWithinMonth,
      calendarGenerateSchoolWeekQuestion,
    ],
    5: [
      calendarGenerateCrossMonthDateShift,
      calendarGenerateMonthOffset,
      calendarGenerateCommonYear,
      calendarGenerateLongDayOffset,
    ],
    6: [
      calendarGenerateMonthNotFourWeeks,
      calendarGenerateWeeksToDays,
      calendarGenerateEveryOtherWeek,
      calendarGenerateTransitTimetable,
      calendarGenerateSchoolDaysInWeeks,
    ],
    7: [
      calendarGenerateAdvancedWeekOffset,
      calendarGenerateDeadlineBefore,
      calendarGenerateQuarterQuestion,
      calendarGenerateDragPlanner,
      calendarGenerateRecurringDays,
    ],
    8: [
      calendarGenerateLeapYearChoice,
      calendarGenerateQuarterlySchedule,
      calendarGenerateCalendarGridRows,
      calendarGenerateTransitTimetable,
      calendarGenerateDateShiftWithYear,
    ],
    9: [
      calendarGenerateLeapDayShift,
      calendarGenerateBusinessDaysRange,
      calendarGenerateBiweeklyDate,
      calendarGenerateMonthlyPatternHunt,
      calendarGenerateCalendarGridRows,
    ],
    10: [
      calendarGenerateCenturyLeapRule,
      calendarGenerateEveryFourWeeksVsMonthly,
      calendarGenerateDateShiftWithYear,
      calendarGenerateAdvancedRecurringEvent,
    ],
  };

  return calendarRandomChoice(generators[level])(level);
}

function calendarStatic(question, answer, options, difficulty) {
  return calendarBuildEntry({ question, answer, options, difficulty, family: "static" });
}

function calendarBuildEntry({
  question,
  answer,
  options,
  difficulty,
  family = "calendar",
  displayText = "",
  visualHtml = "",
  visualSummary = "",
  extraText = "",
  extraHtml = "",
  reviewText = "",
}) {
  const normalizedQuestion = String(question || "").trim();
  const normalizedAnswer = String(answer);
  const normalizedOptions = calendarUniqueStrings(options || []);
  const normalizedDifficulty = calendarClampDifficulty(difficulty);

  if (!normalizedQuestion) {
    throw new Error("Calendar questions must have question text.");
  }

  if (normalizedOptions.length !== 4 || !normalizedOptions.includes(normalizedAnswer)) {
    throw new Error(`Calendar question must have exactly 4 unique options including the answer: ${normalizedQuestion}`);
  }

  return {
    question: normalizedQuestion,
    options: normalizedOptions,
    answer: normalizedAnswer,
    difficulty: normalizedDifficulty,
    category: "Calendar",
    type: "calendar-choice",
    family,
    displayText,
    visualHtml,
    visualSummary,
    extraText,
    extraHtml,
    reviewText,
  };
}

function calendarBuildGeneratedEntry({ question, answer, distractors, difficulty, family, ...rest }) {
  return calendarBuildEntry({
    question,
    answer,
    options: calendarMakeChoiceOptions(answer, distractors),
    difficulty,
    family,
    ...rest,
  });
}

function calendarGenerateAdjacentMonth(level) {
  const monthIndex = calendarRandomInt(0, CALENDAR_MONTHS.length - 1);
  const direction = calendarRandomChoice(level <= 1 ? [1] : [-1, 1]);
  const answerIndex = calendarWrap(monthIndex + direction, CALENDAR_MONTHS.length);
  const word = direction === 1 ? "after" : "before";
  const answer = CALENDAR_MONTHS[answerIndex].name;

  return calendarBuildGeneratedEntry({
    question: `Which month comes ${word} ${CALENDAR_MONTHS[monthIndex].name}?`,
    answer,
    distractors: calendarMonthDistractors(answer),
    difficulty: level,
    family: "adjacent-month",
  });
}

function calendarGenerateTomorrow(level) {
  const dayIndex = calendarRandomInt(0, CALENDAR_DAY_NAMES.length - 1);
  const answer = calendarDayName(dayIndex + 1);
  return calendarBuildGeneratedEntry({
    question: `If today is ${calendarDayName(dayIndex)}, what day is tomorrow?`,
    answer,
    distractors: calendarDayDistractors(answer),
    difficulty: level,
    family: "tomorrow",
  });
}

function calendarGenerateYesterday(level) {
  const dayIndex = calendarRandomInt(0, CALENDAR_DAY_NAMES.length - 1);
  const answer = calendarDayName(dayIndex - 1);
  return calendarBuildGeneratedEntry({
    question: `If today is ${calendarDayName(dayIndex)}, what day was yesterday?`,
    answer,
    distractors: calendarDayDistractors(answer),
    difficulty: level,
    family: "yesterday",
  });
}

function calendarGenerateBasicFact(level) {
  const facts = [
    ["How many days are in 1 week?", "7", ["5", "6", "8", "10"]],
    ["How many months are in 1 year?", "12", ["10", "11", "13", "14"]],
    ["How many months are in half a year?", "6", ["3", "4", "5", "12"]],
    ["Which month is the first month of the year?", "January", ["February", "March", "June", "December"]],
  ];
  const [question, answer, distractors] = calendarRandomChoice(facts);
  return calendarBuildGeneratedEntry({ question, answer, distractors, difficulty: level, family: "basic-fact" });
}

function calendarGenerateShortDayOffset(level) {
  const startIndex = calendarRandomInt(0, CALENDAR_DAY_NAMES.length - 1);
  const offset = calendarRandomInt(2, 6);
  const answer = calendarDayName(startIndex + offset);
  return calendarBuildGeneratedEntry({
    question: `If today is ${calendarDayName(startIndex)}, what day will it be in ${offset} days?`,
    answer,
    distractors: calendarDayDistractors(answer),
    difficulty: level,
    family: "short-day-offset",
  });
}

function calendarGenerateLongDayOffset(level) {
  const startIndex = calendarRandomInt(0, CALENDAR_DAY_NAMES.length - 1);
  const offset = calendarRandomChoice(level >= 5 ? [9, 10, 12, 15, 17, 18, 20, 22, 29] : [8, 9, 10, 12, 14, 15]);
  const answer = calendarDayName(startIndex + offset);
  return calendarBuildGeneratedEntry({
    question: `If today is ${calendarDayName(startIndex)}, what day will it be in ${offset} days?`,
    answer,
    distractors: calendarDayDistractors(answer),
    difficulty: level,
    family: "long-day-offset",
  });
}

function calendarGenerateAdvancedWeekOffset(level) {
  const startIndex = calendarRandomInt(0, CALENDAR_DAY_NAMES.length - 1);
  const offset = calendarRandomChoice([25, 31, 38, 45, 52, 73, 91]);
  const answer = calendarDayName(startIndex + offset);
  return calendarBuildGeneratedEntry({
    question: `If today is ${calendarDayName(startIndex)}, what day will it be in ${offset} days?`,
    answer,
    distractors: calendarDayDistractors(answer),
    difficulty: level,
    family: "advanced-week-offset",
  });
}

function calendarGenerateWeeksToDays(level) {
  const weeks = calendarRandomChoice(level >= 6 ? [4, 5, 6, 8, 10, 13, 26, 52] : [2, 3, 4, 5, 6, 7, 8]);
  const answer = `${weeks * 7} days`;
  const distractors = calendarNearbyNumbers(weeks * 7, [weeks * 7 - 7, weeks * 7 + 7, weeks * 6, weeks * 8]).map((value) => `${value} days`);
  return calendarBuildGeneratedEntry({
    question: `How many days are in ${weeks} weeks?`,
    answer,
    distractors,
    difficulty: level,
    family: "weeks-to-days",
  });
}

function calendarGenerateSeasonQuestion(level) {
  const seasons = ["winter", "spring", "summer", "autumn"];
  const next = { winter: "spring", spring: "summer", summer: "autumn", autumn: "winter" };
  const season = calendarRandomChoice(seasons);
  const answer = calendarTitleCase(next[season]);
  return calendarBuildGeneratedEntry({
    question: `Which season comes after ${season} in many places?`,
    answer,
    distractors: seasons.map(calendarTitleCase).filter((candidate) => candidate !== answer),
    difficulty: level,
    family: "season-order",
  });
}

function calendarGenerateDateShiftWithinMonth(level) {
  const monthIndex = calendarRandomInt(0, CALENDAR_MONTHS.length - 1);
  const shift = calendarRandomChoice([3, 4, 5, 7, 10, 14]);
  const day = calendarRandomInt(1, CALENDAR_MONTHS[monthIndex].days - shift);
  const answer = `${CALENDAR_MONTHS[monthIndex].name} ${day + shift}`;
  const distractors = [shift - 1, shift + 1, shift + 2, shift - 2]
    .map((candidateShift) => `${CALENDAR_MONTHS[monthIndex].name} ${day + candidateShift}`)
    .filter((candidate) => candidate !== answer);
  const startText = `${CALENDAR_MONTHS[monthIndex].name} ${day}`;
  const promptStart = monthIndex === 1
    ? `In a normal year, start on ${startText}`
    : `Start on ${startText}`;
  return calendarBuildGeneratedEntry({
    question: `${promptStart}. After ${shift} full days pass, what date is it?`,
    answer,
    distractors,
    difficulty: level,
    family: "date-shift-within-month",
  });
}

function calendarGenerateDragPlanner(level) {
  const blueprints = [
    {
      minLevel: 2,
      maxLevel: 4,
      title: "March Planner",
      year: 2026,
      monthIndex: 2,
      startDayIndex: 0,
      days: 31,
      clues: [
        { event: "Soccer practice", day: 5, clue: "Soccer is 3 days after Monday, March 2." },
        { event: "Library visit", day: 10, clue: "The library visit is the Tuesday after March 9." },
        { event: "Dentist", day: 13, clue: "The dentist is on Friday the 13th." },
      ],
    },
    {
      minLevel: 4,
      maxLevel: 7,
      title: "April Planner",
      year: 2026,
      monthIndex: 3,
      startDayIndex: 3,
      days: 30,
      clues: [
        { event: "Science fair", day: 8, clue: "The science fair is 1 week after April 1." },
        { event: "Piano lesson", day: 14, clue: "Piano is the Tuesday after April 13." },
        { event: "Field trip", day: 24, clue: "The field trip is 10 days after piano." },
      ],
    },
    {
      minLevel: 7,
      maxLevel: 10,
      title: "June Planner",
      year: 2026,
      monthIndex: 5,
      startDayIndex: 1,
      days: 30,
      clues: [
        { event: "Project checkpoint", day: 9, clue: "The checkpoint is 8 days after Monday, June 1." },
        { event: "Bus-card pickup", day: 16, clue: "Bus-card pickup is 1 week after the checkpoint." },
        { event: "Camp starts", day: 22, clue: "Camp starts on the Monday after June 21." },
        { event: "Pack bags", day: 28, clue: "Pack bags 6 days after camp starts." },
      ],
    },
  ];
  const blueprint = calendarChooseByLevel(blueprints, level);
  const events = level >= 7 ? blueprint.clues : blueprint.clues.slice(0, 3);
  const choices = events.map((event) => event.event);
  const targets = events.map((event) => ({
    html: calendarRenderDateTarget(blueprint, event.day),
    reviewLabel: calendarFormatMonthDay(blueprint.monthIndex, event.day),
  }));

  return calendarBuildTargetsDragQuestion({
    difficulty: level,
    family: "calendar-drag-planner",
    questionText: "Calendar Drag Planner: put each event on the correct date.",
    extraText: `${blueprint.title}\n${events.map((event) => `- ${event.clue}`).join("\n")}`,
    visualHtml: calendarRenderMiniCalendar(blueprint, events.map((event) => event.day)),
    visualSummary: `${blueprint.title}: ${events.map((event) => `${event.event} on ${calendarFormatMonthDay(blueprint.monthIndex, event.day)}`).join(", ")}.`,
    targets,
    answer: choices,
    choices,
    answerLabel: events.map((event) => `${calendarFormatMonthDay(blueprint.monthIndex, event.day)}: ${event.event}`).join(" | "),
    dragPlaceholderText: "Drop event",
  });
}

function calendarGenerateDaysBetween(level) {
  const start = calendarRandomInt(1, 20);
  const distance = calendarRandomInt(3, level >= 7 ? 14 : 8);
  const end = start + distance;
  const answer = `${distance} days`;
  return calendarBuildGeneratedEntry({
    question: `How many days are between the ${calendarFormatOrdinal(start)} and the ${calendarFormatOrdinal(end)}, not counting the ${calendarFormatOrdinal(start)}?`,
    answer,
    distractors: [`${distance - 1} days`, `${distance + 1} days`, `${distance + 2} days`, `${Math.max(1, distance - 2)} days`],
    difficulty: level,
    family: "days-between",
  });
}

function calendarGenerateLeapFebruary(level) {
  return calendarBuildGeneratedEntry({
    question: "How many days are in February during a leap year?",
    answer: "29 days",
    distractors: ["28 days", "30 days", "31 days", "32 days"],
    difficulty: level,
    family: "leap-february",
  });
}

function calendarGenerateMonthOffset(level) {
  const monthIndex = calendarRandomInt(0, CALENDAR_MONTHS.length - 1);
  const offset = calendarRandomChoice(level >= 7 ? [2, 3, 4, 5, 6, 9] : [2, 3, 4, 5, 6]);
  const answer = CALENDAR_MONTHS[calendarWrap(monthIndex + offset, CALENDAR_MONTHS.length)].name;
  return calendarBuildGeneratedEntry({
    question: `Which month is ${offset} months after ${CALENDAR_MONTHS[monthIndex].name}?`,
    answer,
    distractors: calendarMonthDistractors(answer),
    difficulty: level,
    family: "month-offset",
  });
}

function calendarGenerateSchoolWeekQuestion(level) {
  const weeks = calendarRandomChoice([1, 2, 3, 4]);
  const answer = `${weeks * 5} school days`;
  return calendarBuildGeneratedEntry({
    question: `School days are Monday through Friday. How many school days are in ${weeks} full weeks?`,
    answer,
    distractors: [`${weeks * 7} school days`, `${weeks * 4} school days`, `${weeks * 5 + 1} school days`, `${weeks * 5 - 1} school days`],
    difficulty: level,
    family: "school-week",
  });
}

function calendarGenerateCrossMonthDateShift(level) {
  const year = calendarRandomChoice([2025, 2026, 2027]);
  const monthIndex = calendarRandomInt(0, 11);
  const shift = calendarRandomChoice([10, 14, 21, 28, 30, 35]);
  const maxStartDay = Math.min(calendarDaysInMonth(year, monthIndex), 24);
  const day = calendarRandomInt(Math.max(1, maxStartDay - 8), maxStartDay);
  const answerDate = calendarAddDaysToDate(year, monthIndex, day, shift);
  const answer = calendarFormatMonthDay(answerDate.monthIndex, answerDate.day);
  const distractors = calendarBuildDateDistractors(answerDate.year, answerDate.monthIndex, answerDate.day, false);
  return calendarBuildGeneratedEntry({
    question: `In ${year}, start on ${calendarFormatMonthDay(monthIndex, day)}. After ${shift} full days pass, what date is it?`,
    answer,
    distractors,
    difficulty: level,
    family: "cross-month-date-shift",
  });
}

function calendarGenerateCommonYear(level) {
  return calendarBuildGeneratedEntry({
    question: "How many days are in a normal common year?",
    answer: "365 days",
    distractors: ["360 days", "364 days", "366 days", "370 days"],
    difficulty: level,
    family: "common-year",
  });
}

function calendarGenerateMonthNotFourWeeks(level) {
  const facts = [
    ["Why is 1 calendar month usually not exactly 4 weeks?", "Most months have 30 or 31 days", ["Most months have 30 or 31 days", "Every month has 28 days", "A week has 8 days", "A year has 10 months"]],
    ["Exactly 4 weeks is how many days?", "28 days", ["21 days", "28 days", "30 days", "31 days"]],
    ["Which month in a normal year is exactly 4 weeks long?", "February", ["January", "February", "March", "April"]],
    ["A normal 365-day year is 52 weeks plus what?", "1 extra day", ["No extra days", "1 extra day", "2 extra days", "12 extra days"]],
  ];
  const [question, answer, options] = calendarRandomChoice(facts);
  return calendarBuildEntry({ question, answer, options, difficulty: level, family: "month-not-four-weeks" });
}

function calendarGenerateEveryOtherWeek(level) {
  const weeks = calendarRandomChoice([6, 8, 10, 12]);
  const answer = `${weeks / 2} meetings`;
  return calendarBuildGeneratedEntry({
    question: `A club meets every other week. How many meetings are there in ${weeks} weeks?`,
    answer,
    distractors: [`${weeks} meetings`, `${Math.max(1, weeks / 2 - 1)} meetings`, `${weeks / 2 + 1} meetings`, `${weeks / 2 + 2} meetings`],
    difficulty: level,
    family: "every-other-week",
  });
}

function calendarGenerateSchoolDaysInWeeks(level) {
  const weeks = calendarRandomChoice([2, 3, 4, 5]);
  const answer = `${weeks * 5} school days`;
  return calendarBuildGeneratedEntry({
    question: `If school is Monday through Friday, how many school days are in ${weeks} full weeks?`,
    answer,
    distractors: [`${weeks * 7} school days`, `${weeks * 5 - 1} school days`, `${weeks * 5 + 1} school days`, `${weeks * 4} school days`],
    difficulty: level,
    family: "school-days-in-weeks",
  });
}

function calendarGenerateMonthlyPatternHunt(level) {
  const patterns = [
    {
      minLevel: 3,
      maxLevel: 5,
      title: "May 2026",
      year: 2026,
      monthIndex: 4,
      startDayIndex: 5,
      days: 31,
      prompt: "Monthly Pattern Hunt: drag every Tuesday into the Pattern Days bucket.",
      patternLabel: "Tuesdays",
      patternDays: [5, 12, 19, 26],
      distractorDays: [3, 8, 17, 24],
    },
    {
      minLevel: 4,
      maxLevel: 7,
      title: "February 2026",
      year: 2026,
      monthIndex: 1,
      startDayIndex: 0,
      days: 28,
      prompt: "Monthly Pattern Hunt: drag every weekend date into the Weekend bucket.",
      patternLabel: "Weekend dates",
      patternDays: [1, 7, 8, 14, 15, 21, 22, 28],
      distractorDays: [2, 5, 10, 18],
    },
    {
      minLevel: 7,
      maxLevel: 10,
      title: "July 2026",
      year: 2026,
      monthIndex: 6,
      startDayIndex: 3,
      days: 31,
      prompt: "Monthly Pattern Hunt: sort the dates that fit an every-other-day plan starting July 3.",
      patternLabel: "Every other day from July 3",
      patternDays: [3, 5, 7, 9, 11, 13],
      distractorDays: [4, 6, 8, 10, 12, 14],
    },
  ];
  const pattern = calendarChooseByLevel(patterns, level);
  const patternCount = level >= 7 ? 6 : level >= 4 ? 4 : 3;
  const selectedPatternDays = pattern.patternDays.slice(0, patternCount);
  const selectedDistractorDays = pattern.distractorDays.slice(0, Math.min(patternCount, pattern.distractorDays.length));
  const patternAnswers = selectedPatternDays.map((day) => calendarFormatMonthDay(pattern.monthIndex, day));
  const distractorAnswers = selectedDistractorDays.map((day) => calendarFormatMonthDay(pattern.monthIndex, day));

  return calendarBuildBucketsDragQuestion({
    difficulty: level,
    family: "monthly-pattern-hunt",
    questionText: pattern.prompt,
    extraText: `${pattern.title}. Use the calendar to find the dates that match the pattern.`,
    visualHtml: calendarRenderMiniCalendar(pattern, [...selectedPatternDays, ...selectedDistractorDays]),
    visualSummary: `${pattern.patternLabel}: ${patternAnswers.join(", ")}.`,
    buckets: [
      { label: pattern.patternLabel, answers: patternAnswers },
      { label: "Not in the pattern", answers: distractorAnswers },
    ],
    dragPlaceholderText: "Drop date",
  });
}

function calendarGenerateDeadlineBefore(level) {
  const year = 2026;
  const monthIndex = calendarRandomInt(2, 10);
  const day = calendarRandomInt(15, 26);
  const daysBefore = calendarRandomChoice([7, 10, 14, 21]);
  const answerDate = calendarAddDaysToDate(year, monthIndex, day, -daysBefore);
  const answer = calendarFormatMonthDay(answerDate.monthIndex, answerDate.day);
  return calendarBuildGeneratedEntry({
    question: `In ${year}, a deadline is ${calendarFormatMonthDay(monthIndex, day)}. What date is ${daysBefore} full days before the deadline?`,
    answer,
    distractors: calendarBuildDateDistractors(answerDate.year, answerDate.monthIndex, answerDate.day, false),
    difficulty: level,
    family: "deadline-before",
  });
}

function calendarGenerateQuarterQuestion(level) {
  const quarter = calendarRandomInt(1, 4);
  const quarterMonths = [
    ["January", "February", "March"],
    ["April", "May", "June"],
    ["July", "August", "September"],
    ["October", "November", "December"],
  ];
  const answer = quarterMonths[quarter - 1].join(", ");
  const distractors = quarterMonths.filter((_, index) => index !== quarter - 1).map((months) => months.join(", "));
  return calendarBuildGeneratedEntry({
    question: `Which months are in quarter ${quarter} of the year?`,
    answer,
    distractors,
    difficulty: level,
    family: "quarter-months",
  });
}

function calendarGenerateRecurringDays(level) {
  const interval = calendarRandomChoice([10, 14, 15, 21]);
  const occurrence = calendarRandomChoice([3, 4, 5]);
  const elapsed = interval * (occurrence - 1);
  const startYear = 2026;
  const startMonth = calendarRandomChoice([0, 2, 5, 8]);
  const startDay = calendarRandomChoice([1, 3, 5]);
  const answerDate = calendarAddDaysToDate(startYear, startMonth, startDay, elapsed);
  const answer = calendarFormatMonthDay(answerDate.monthIndex, answerDate.day);
  return calendarBuildGeneratedEntry({
    question: `In ${startYear}, an event happens every ${interval} days, counting ${calendarFormatMonthDay(startMonth, startDay)} as the first event. What is the ${calendarFormatOrdinal(occurrence)} event date?`,
    answer,
    distractors: calendarBuildDateDistractors(answerDate.year, answerDate.monthIndex, answerDate.day, false),
    difficulty: level,
    family: "recurring-days",
  });
}

function calendarGenerateLeapYearChoice(level) {
  const leapYear = calendarRandomChoice([2024, 2028, 2032, 2036]);
  return calendarBuildGeneratedEntry({
    question: "Which of these years is a leap year?",
    answer: String(leapYear),
    distractors: [String(leapYear - 1), String(leapYear + 1), String(leapYear + 2), String(leapYear + 3)],
    difficulty: level,
    family: "leap-year-choice",
  });
}

function calendarGenerateQuarterlySchedule(level) {
  const facts = [
    ["If a checkup is quarterly, how many checkups happen in 1 year?", "4", ["2", "3", "4", "6"]],
    ["A semiannual event happens how often?", "Twice a year", ["Every month", "Twice a year", "Four times a year", "Every 2 weeks"]],
    ["How many months are in 2 quarters?", "6 months", ["3 months", "4 months", "6 months", "8 months"]],
  ];
  const [question, answer, options] = calendarRandomChoice(facts);
  return calendarBuildEntry({ question, answer, options, difficulty: level, family: "schedule-vocabulary" });
}

function calendarGenerateTransitTimetable(level) {
  const routes = [
    {
      minLevel: 5,
      maxLevel: 7,
      title: "Bus 42 to Swim Class",
      deadline: 16 * 60 + 10,
      rows: [
        { route: "Bus A", depart: 15 * 60 + 20, arrive: 15 * 60 + 55 },
        { route: "Bus B", depart: 15 * 60 + 35, arrive: 16 * 60 + 5 },
        { route: "Bus C", depart: 15 * 60 + 50, arrive: 16 * 60 + 18 },
        { route: "Bus D", depart: 16 * 60 + 0, arrive: 16 * 60 + 30 },
      ],
      answer: "Bus B",
      question: "Transit Timetable Challenge: which bus arrives before swim class starts and leaves latest?",
    },
    {
      minLevel: 6,
      maxLevel: 9,
      title: "Train to the Museum",
      deadline: 10 * 60,
      rows: [
        { route: "Train A", depart: 8 * 60 + 35, arrive: 9 * 60 + 25 },
        { route: "Train B", depart: 8 * 60 + 55, arrive: 9 * 60 + 45 },
        { route: "Train C", depart: 9 * 60 + 20, arrive: 10 * 60 + 5 },
        { route: "Train D", depart: 9 * 60 + 35, arrive: 10 * 60 + 20 },
      ],
      answer: "Train B",
      question: "Transit Timetable Challenge: choose the latest train that still arrives before the museum tour.",
    },
    {
      minLevel: 8,
      maxLevel: 10,
      title: "Bus to the Robotics Club",
      deadline: 18 * 60 + 15,
      rows: [
        { route: "Bus A", depart: 17 * 60 + 5, arrive: 17 * 60 + 48 },
        { route: "Bus B", depart: 17 * 60 + 30, arrive: 18 * 60 + 9 },
        { route: "Bus C", depart: 17 * 60 + 50, arrive: 18 * 60 + 16 },
        { route: "Bus D", depart: 18 * 60 + 3, arrive: 18 * 60 + 31 },
      ],
      answer: "Bus B",
      question: "Transit Timetable Challenge: pick the latest option that arrives before robotics begins.",
    },
  ];
  const timetable = calendarChooseByLevel(routes, level);
  const answerRow = timetable.rows.find((row) => row.route === timetable.answer);

  return calendarBuildGeneratedEntry({
    question: `${timetable.question} Deadline: ${calendarFormatTime(timetable.deadline)}.`,
    answer: timetable.answer,
    distractors: timetable.rows.map((row) => row.route).filter((route) => route !== timetable.answer),
    difficulty: level,
    family: "transit-timetable",
    displayText: `${timetable.title}\n${timetable.rows.map((row) => `${row.route}: leaves ${calendarFormatTime(row.depart)}, arrives ${calendarFormatTime(row.arrive)}`).join("\n")}`,
    visualHtml: calendarRenderTransitTable(timetable),
    visualSummary: `${timetable.title}: ${timetable.answer} arrives at ${calendarFormatTime(answerRow.arrive)}, before ${calendarFormatTime(timetable.deadline)}.`,
    reviewText: `${timetable.answer} is the latest option that arrives before ${calendarFormatTime(timetable.deadline)}.`,
  });
}

function calendarGenerateCalendarGridRows(level) {
  const startDayIndex = calendarRandomInt(0, 6);
  const daysInMonth = calendarRandomChoice(level >= 9 ? [30, 31] : [28, 30, 31]);
  const rows = Math.ceil((startDayIndex + daysInMonth) / 7);
  const answer = `${rows} rows`;
  return calendarBuildGeneratedEntry({
    question: `If a ${daysInMonth}-day month starts on ${calendarDayName(startDayIndex)}, how many calendar rows does it use?`,
    answer,
    distractors: ["4 rows", "5 rows", "6 rows", "7 rows"].filter((option) => option !== answer),
    difficulty: level,
    family: "calendar-grid-rows",
  });
}

function calendarGenerateDateShiftWithYear(level) {
  const year = level >= 10 ? calendarRandomChoice([2024, 2025, 2028, 2100]) : calendarRandomChoice([2024, 2025, 2026]);
  const monthIndex = calendarRandomChoice(level >= 10 ? [0, 1, 2, 10, 11] : [0, 2, 3, 6, 9]);
  const maxDay = Math.min(24, calendarDaysInMonth(year, monthIndex));
  const day = calendarRandomInt(1, maxDay);
  const shift = calendarRandomChoice(level >= 10 ? [30, 45, 60, 75, 100] : [30, 45, 60, 90, 100]);
  const answerDate = calendarAddDaysToDate(year, monthIndex, day, shift);
  const answer = calendarFormatFullDate(answerDate.year, answerDate.monthIndex, answerDate.day);
  return calendarBuildGeneratedEntry({
    question: `Start on ${calendarFormatFullDate(year, monthIndex, day)}. After ${shift} full days pass, what date is it?`,
    answer,
    distractors: calendarBuildDateDistractors(answerDate.year, answerDate.monthIndex, answerDate.day, true),
    difficulty: level,
    family: "date-shift-with-year",
  });
}

function calendarGenerateLeapDayShift(level) {
  const year = calendarRandomChoice([2024, 2025]);
  const answer = year === 2024 ? "February 29, 2024" : "March 1, 2025";
  return calendarBuildGeneratedEntry({
    question: `Start on February 28, ${year}. After 1 full day passes, what date is it?`,
    answer,
    distractors: year === 2024
      ? ["February 27, 2024", "March 1, 2024", "March 2, 2024"]
      : ["February 29, 2025", "March 2, 2025", "February 27, 2025"],
    difficulty: level,
    family: "leap-day-shift",
  });
}

function calendarGenerateBusinessDaysRange(level) {
  const starts = ["Monday", "Tuesday", "Wednesday"];
  const startName = calendarRandomChoice(starts);
  const startIndex = CALENDAR_DAY_NAMES.indexOf(startName);
  const span = calendarRandomChoice([5, 6, 7, 8]);
  let businessDays = 0;
  for (let offset = 0; offset < span; offset += 1) {
    const index = calendarWrap(startIndex + offset, 7);
    if (index >= 1 && index <= 5) {
      businessDays += 1;
    }
  }
  const endName = calendarDayName(startIndex + span - 1);
  return calendarBuildGeneratedEntry({
    question: `School days are Monday through Friday. How many school days are from ${startName} through ${endName}, including both days?`,
    answer: `${businessDays} school days`,
    distractors: [`${businessDays - 1} school days`, `${businessDays + 1} school days`, `${span} school days`, `${Math.max(1, businessDays - 2)} school days`],
    difficulty: level,
    family: "business-days-range",
  });
}

function calendarGenerateBiweeklyDate(level) {
  const year = 2026;
  const monthIndex = calendarRandomChoice([0, 2, 5, 8]);
  const startDay = calendarRandomChoice([1, 3, 5, 7]);
  const meetingsAfterStart = calendarRandomChoice([1, 2, 3]);
  const answerDate = calendarAddDaysToDate(year, monthIndex, startDay, meetingsAfterStart * 14);
  const answer = calendarFormatMonthDay(answerDate.monthIndex, answerDate.day);
  return calendarBuildGeneratedEntry({
    question: `In ${year}, a meeting happens every other week starting ${calendarFormatMonthDay(monthIndex, startDay)}. What is the date of the meeting ${meetingsAfterStart} meeting${meetingsAfterStart === 1 ? "" : "s"} after the starting meeting?`,
    answer,
    distractors: calendarBuildDateDistractors(answerDate.year, answerDate.monthIndex, answerDate.day, false),
    difficulty: level,
    family: "biweekly-date",
  });
}

function calendarGenerateCenturyLeapRule(level) {
  const examples = [
    ["Why was 2000 a leap year?", "It is divisible by 400", ["It is divisible by 400", "Every century year is a leap year", "It has 30 months", "It starts on Monday"]],
    ["Why was 1900 not a leap year in the Gregorian calendar?", "Century years must be divisible by 400", ["Century years must be divisible by 400", "It was not divisible by 4", "February did not exist", "It had 364 days because all years do"]],
    ["Why will 2100 not be a leap year in the Gregorian calendar?", "It is divisible by 100 but not by 400", ["It is divisible by 100 but not by 400", "It is not divisible by 4", "All future years are common years", "It has 13 months"]],
  ];
  const [question, answer, options] = calendarRandomChoice(examples);
  return calendarBuildEntry({ question, answer, options, difficulty: level, family: "century-leap-rule" });
}

function calendarGenerateEveryFourWeeksVsMonthly(level) {
  const facts = [
    ["Which happens more often in 52 weeks: monthly payments or payments every 4 weeks?", "Payments every 4 weeks", ["Monthly payments", "Payments every 4 weeks", "They are always equal", "Neither happens"]],
    ["How many 4-week periods fit into 52 weeks?", "13", ["10", "12", "13", "14"]],
    ["Why can every-4-weeks billing happen 13 times in a year?", "52 weeks divided by 4 is 13", ["52 weeks divided by 4 is 13", "A year has 13 months", "A week has 13 days", "February has 13 days"]],
  ];
  const [question, answer, options] = calendarRandomChoice(facts);
  return calendarBuildEntry({ question, answer, options, difficulty: level, family: "four-weeks-vs-monthly" });
}

function calendarGenerateAdvancedRecurringEvent(level) {
  const year = 2025;
  const interval = calendarRandomChoice([15, 20, 30]);
  const occurrence = calendarRandomChoice([4, 5, 6]);
  const elapsed = interval * (occurrence - 1);
  const answerDate = calendarAddDaysToDate(year, 0, 1, elapsed);
  const answer = calendarFormatFullDate(answerDate.year, answerDate.monthIndex, answerDate.day);
  return calendarBuildGeneratedEntry({
    question: `An event happens every ${interval} days, counting January 1, ${year} as the first event. What is the ${calendarFormatOrdinal(occurrence)} event date?`,
    answer,
    distractors: calendarBuildDateDistractors(answerDate.year, answerDate.monthIndex, answerDate.day, true),
    difficulty: level,
    family: "advanced-recurring-event",
  });
}

function calendarBuildTargetsDragQuestion({
  difficulty,
  family,
  questionText,
  extraText = "",
  visualHtml = "",
  visualSummary = "",
  targets,
  answer,
  choices,
  answerLabel = "",
  dragPlaceholderText = "",
}) {
  const normalizedTargets = targets.map((target) => ({
    text: String(target?.text || ""),
    html: String(target?.html || ""),
    reviewLabel: String(target?.reviewLabel || ""),
  }));
  const normalizedAnswer = answer.map(String);
  const normalizedChoices = calendarUniqueStrings([...choices.map(String), ...normalizedAnswer]);

  return {
    type: "calendar-drag",
    category: "Calendar",
    family,
    difficulty,
    mode: "drag",
    questionText,
    displayText: "",
    extraText,
    extraHtml: "",
    visualHtml,
    visualSummary,
    dragLayout: "targets",
    dragTargetArrangement: "rows",
    dragTargets: normalizedTargets,
    dragChoices: calendarBuildDragChoiceTokens(normalizedChoices),
    dragAnswerTokens: normalizedAnswer,
    dragPlaceholderText,
    reviewText: answerLabel,
    answerValue: normalizedAnswer.join(" | "),
    answerLabel,
    isHebrew: false,
  };
}

function calendarBuildBucketsDragQuestion({
  difficulty,
  family,
  questionText,
  extraText = "",
  visualHtml = "",
  visualSummary = "",
  buckets,
  dragPlaceholderText = "",
}) {
  const normalizedBuckets = buckets.map((bucket) => ({
    label: String(bucket.label),
    answers: calendarUniqueStrings(bucket.answers.map(String)),
  }));
  const flatAnswers = normalizedBuckets.flatMap((bucket) => bucket.answers);

  return {
    type: "calendar-drag",
    category: "Calendar",
    family,
    difficulty,
    mode: "drag",
    questionText,
    displayText: "",
    extraText,
    extraHtml: "",
    visualHtml,
    visualSummary,
    dragLayout: "buckets",
    dragBucketColumns: normalizedBuckets,
    dragChoices: calendarBuildDragChoiceTokens(flatAnswers),
    dragAnswerTokens: flatAnswers,
    dragPlaceholderText,
    reviewText: normalizedBuckets.map((bucket) => `${bucket.label}: ${bucket.answers.join(", ")}`).join(" | "),
    answerValue: flatAnswers.join(" | "),
    answerLabel: normalizedBuckets.map((bucket) => `${bucket.label}: ${bucket.answers.join(", ")}`).join(" | "),
    isHebrew: false,
  };
}

function calendarBuildDragChoiceTokens(values) {
  return calendarShuffle(calendarUniqueStrings(values)).map((text, index) => ({
    id: `calendar-drag-${index}-${calendarSlugify(text)}`,
    text,
  }));
}

function calendarRenderMiniCalendar(config, markedDays = []) {
  const marked = new Set(markedDays.map(Number));
  const leading = config.startDayIndex;
  const cells = [];
  for (let index = 0; index < leading; index += 1) {
    cells.push('<span class="calendar-mini-day empty" aria-hidden="true"></span>');
  }
  for (let day = 1; day <= config.days; day += 1) {
    const markedClass = marked.has(day) ? " marked" : "";
    cells.push(`<span class="calendar-mini-day${markedClass}">${day}</span>`);
  }

  return `
    <div class="calendar-mini-card">
      <div class="calendar-mini-title">${calendarEscapeHtml(config.title)}</div>
      <div class="calendar-mini-weekdays" aria-hidden="true">${CALENDAR_DAY_NAMES.map((day) => `<span>${day.slice(0, 3)}</span>`).join("")}</div>
      <div class="calendar-mini-grid">${cells.join("")}</div>
    </div>
  `;
}

function calendarRenderDateTarget(config, day) {
  const dayIndex = calendarWrap(config.startDayIndex + day - 1, 7);
  return `
    <div class="calendar-date-target">
      <span>${CALENDAR_DAY_NAMES[dayIndex].slice(0, 3)}</span>
      <strong>${CALENDAR_MONTHS[config.monthIndex].name.slice(0, 3)} ${day}</strong>
    </div>
  `;
}

function calendarRenderTransitTable(timetable) {
  const rows = timetable.rows.map((row) => `
    <tr>
      <th scope="row">${calendarEscapeHtml(row.route)}</th>
      <td>${calendarFormatTime(row.depart)}</td>
      <td>${calendarFormatTime(row.arrive)}</td>
    </tr>
  `).join("");

  return `
    <div class="calendar-transit-card">
      <div class="calendar-transit-title">${calendarEscapeHtml(timetable.title)}</div>
      <table class="calendar-transit-table">
        <thead>
          <tr><th scope="col">Option</th><th scope="col">Leaves</th><th scope="col">Arrives</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="calendar-transit-deadline">Deadline: ${calendarFormatTime(timetable.deadline)}</div>
    </div>
  `;
}

function calendarMakeChoiceOptions(answer, candidates) {
  return calendarBuildOptions(answer, candidates);
}

function calendarBuildOptions(answer, candidates) {
  const normalizedAnswer = String(answer);
  const options = [normalizedAnswer];
  const uniqueCandidates = calendarShuffle(calendarUniqueStrings(candidates || []).filter((candidate) => candidate !== normalizedAnswer));

  while (options.length < 4 && uniqueCandidates.length) {
    options.push(uniqueCandidates.shift());
  }

  let fallbackIndex = 1;
  while (options.length < 4) {
    const fallback = `${normalizedAnswer} (${fallbackIndex})`;
    if (!options.includes(fallback)) {
      options.push(fallback);
    }
    fallbackIndex += 1;
  }

  return calendarShuffle(options);
}

function calendarDayDistractors(answer) {
  return CALENDAR_DAY_NAMES.filter((day) => day !== answer);
}

function calendarMonthDistractors(answer) {
  return CALENDAR_MONTHS.map((month) => month.name).filter((month) => month !== answer);
}

function calendarBuildDateDistractors(year, monthIndex, day, includeYear) {
  return [-2, -1, 1, 2, 3, -3].map((offset) => {
    const date = calendarAddDaysToDate(year, monthIndex, day, offset);
    return includeYear
      ? calendarFormatFullDate(date.year, date.monthIndex, date.day)
      : calendarFormatMonthDay(date.monthIndex, date.day);
  });
}

function calendarNearbyNumbers(answer, candidates) {
  return calendarUniqueStrings(candidates.map((candidate) => String(Math.max(1, Number(candidate)))));
}

function calendarAddDaysToDate(year, monthIndex, day, delta) {
  const date = new Date(Date.UTC(year, monthIndex, day + delta));
  return {
    year: date.getUTCFullYear(),
    monthIndex: date.getUTCMonth(),
    day: date.getUTCDate(),
  };
}

function calendarDaysInMonth(year, monthIndex) {
  return new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
}

function calendarFormatMonthDay(monthIndex, day) {
  return `${CALENDAR_MONTHS[monthIndex].name} ${day}`;
}

function calendarFormatFullDate(year, monthIndex, day) {
  return `${CALENDAR_MONTHS[monthIndex].name} ${day}, ${year}`;
}

function calendarFormatTime(totalMinutes) {
  const normalized = calendarWrap(totalMinutes, 24 * 60);
  const hour24 = Math.floor(normalized / 60);
  const minute = normalized % 60;
  const suffix = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 || 12;
  return `${hour12}:${String(minute).padStart(2, "0")} ${suffix}`;
}

function calendarFormatOrdinal(day) {
  const remainder100 = day % 100;
  if (remainder100 >= 11 && remainder100 <= 13) {
    return `${day}th`;
  }

  const suffixes = {
    1: "st",
    2: "nd",
    3: "rd",
  };

  return `${day}${suffixes[day % 10] ?? "th"}`;
}

function calendarClampDifficulty(difficulty) {
  const value = Number(difficulty);
  if (!Number.isInteger(value)) {
    return 1;
  }

  return Math.min(10, Math.max(1, value));
}

function calendarDayName(index) {
  return CALENDAR_DAY_NAMES[calendarWrap(index, CALENDAR_DAY_NAMES.length)];
}

function calendarWrap(value, size) {
  return ((value % size) + size) % size;
}

function calendarTitleCase(value) {
  const text = String(value);
  return `${text.slice(0, 1).toUpperCase()}${text.slice(1)}`;
}

function calendarUniqueStrings(values) {
  return Array.from(new Set(values.map((value) => String(value))));
}

function calendarChooseByLevel(blueprints, level) {
  const available = blueprints.filter((blueprint) =>
    level >= (blueprint.minLevel || 1) && level <= (blueprint.maxLevel || 10)
  );
  return calendarRandomChoice(available.length ? available : blueprints);
}

function calendarEscapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function calendarSlugify(value) {
  const slug = String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "token";
}

function calendarRandomChoice(values) {
  return values[calendarRandomInt(0, values.length - 1)];
}

function calendarRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calendarShuffle(values) {
  const shuffled = [...values];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = calendarRandomInt(0, index);
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

globalThis.HomeworkQuestions?.register({
  id: "calendar",
  label: "Calendar",
  getStaticQuestions: () => CALENDAR_QUESTIONS,
  generatedEntryFactory: createCalendarGeneratedEntry,
  generatedShare: 0.9,
});

globalThis.CALENDAR_GENERATOR_COVERAGE = {
  dragPlanner: calendarGenerateDragPlanner,
  monthlyPatternHunt: calendarGenerateMonthlyPatternHunt,
  transitTimetable: calendarGenerateTransitTimetable,
};
