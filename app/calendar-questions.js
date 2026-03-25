const CALENDAR_QUESTIONS = [
  {
    question: "Which month comes after April?",
    options: ["March", "May", "June", "July"],
    answer: "May",
    difficulty: 1,
  },
  {
    question: "How many days are in 1 week?",
    options: ["5", "6", "7", "8"],
    answer: "7",
    difficulty: 1,
  },
  {
    question: "If today is Tuesday, what day will it be in 3 days?",
    options: ["Thursday", "Friday", "Saturday", "Sunday"],
    answer: "Friday",
    difficulty: 2,
  },
  {
    question: "Which month has 28 or 29 days?",
    options: ["January", "February", "March", "April"],
    answer: "February",
    difficulty: 2,
  },
  {
    question: "If today is the 9th and a trip starts on the 15th, how many days are left until the trip?",
    options: ["5 days", "6 days", "7 days", "8 days"],
    answer: "6 days",
    difficulty: 3,
  },
  {
    question: "How many days are in February during a leap year?",
    options: ["28", "29", "30", "31"],
    answer: "29",
    difficulty: 3,
  },
  {
    question: "School starts on Monday and lasts for 5 days. On which day does it end?",
    options: ["Thursday", "Friday", "Saturday", "Sunday"],
    answer: "Friday",
    difficulty: 4,
  },
  {
    question: "What date is 7 days after August 12?",
    options: ["August 17", "August 18", "August 19", "August 20"],
    answer: "August 19",
    difficulty: 4,
  },
  {
    question: "Which month has 30 days?",
    options: ["April", "May", "July", "January"],
    answer: "April",
    difficulty: 5,
  },
  {
    question: "If today is Friday, what day will it be in 10 days?",
    options: ["Sunday", "Monday", "Tuesday", "Wednesday"],
    answer: "Monday",
    difficulty: 5,
  },
  {
    question: "Which month comes before November?",
    options: ["September", "October", "December", "January"],
    answer: "October",
    difficulty: 1,
  },
  {
    question: "How many months are in a year?",
    options: ["10", "11", "12", "13"],
    answer: "12",
    difficulty: 1,
  },
  {
    question: "If today is Thursday, what day will it be in 2 days?",
    options: ["Friday", "Saturday", "Sunday", "Monday"],
    answer: "Saturday",
    difficulty: 2,
  },
  {
    question: "Which month comes after February?",
    options: ["January", "March", "April", "May"],
    answer: "March",
    difficulty: 2,
  },
  {
    question: "How many weeks are in 14 days?",
    options: ["1 week", "2 weeks", "3 weeks", "4 weeks"],
    answer: "2 weeks",
    difficulty: 3,
  },
  {
    question: "What date is 5 days after June 22?",
    options: ["June 25", "June 26", "June 27", "June 28"],
    answer: "June 27",
    difficulty: 3,
  },
  {
    question: "Which month has 31 days?",
    options: ["April", "June", "September", "July"],
    answer: "July",
    difficulty: 4,
  },
  {
    question: "If today is Sunday, what day will it be in 9 days?",
    options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    answer: "Tuesday",
    difficulty: 4,
  },
  {
    question: "How many days are in a normal year?",
    options: ["360", "365", "366", "370"],
    answer: "365",
    difficulty: 5,
  },
  {
    question: "Which month is 2 months after May?",
    options: ["June", "July", "August", "September"],
    answer: "July",
    difficulty: 5,
  },
];

CALENDAR_QUESTIONS.push(
  ...[
    {
      question: "Which month comes after July?",
      options: ["June", "August", "September", "October"],
      answer: "August",
      difficulty: 1,
    },
    {
      question: "How many days are in 2 weeks?",
      options: ["7", "10", "14", "21"],
      answer: "14",
      difficulty: 1,
    },
    {
      question: "Which month comes before March?",
      options: ["January", "February", "April", "May"],
      answer: "February",
      difficulty: 1,
    },
    {
      question: "How many days are in 3 weeks?",
      options: ["14", "18", "21", "24"],
      answer: "21",
      difficulty: 1,
    },
    {
      question: "If today is Monday, what day will it be in 4 days?",
      options: ["Thursday", "Friday", "Saturday", "Sunday"],
      answer: "Friday",
      difficulty: 2,
    },
    {
      question: "Which month comes after September?",
      options: ["August", "October", "November", "December"],
      answer: "October",
      difficulty: 2,
    },
    {
      question: "If today is Saturday, what day was it yesterday?",
      options: ["Thursday", "Friday", "Sunday", "Monday"],
      answer: "Friday",
      difficulty: 2,
    },
    {
      question: "Which month has only 28 or 29 days?",
      options: ["January", "February", "March", "December"],
      answer: "February",
      difficulty: 2,
    },
    {
      question: "What date is 3 days after May 7?",
      options: ["May 8", "May 9", "May 10", "May 11"],
      answer: "May 10",
      difficulty: 3,
    },
    {
      question: "How many days are in 4 weeks?",
      options: ["24", "28", "30", "31"],
      answer: "28",
      difficulty: 3,
    },
    {
      question: "If a trip starts on the 12th and ends on the 16th, how many days are between those dates?",
      options: ["3", "4", "5", "6"],
      answer: "4",
      difficulty: 3,
    },
    {
      question: "What date is 10 days after January 5?",
      options: ["January 13", "January 14", "January 15", "January 16"],
      answer: "January 15",
      difficulty: 3,
    },
    {
      question: "If today is Wednesday, what day will it be in 12 days?",
      options: ["Sunday", "Monday", "Tuesday", "Thursday"],
      answer: "Monday",
      difficulty: 4,
    },
    {
      question: "Which month is 3 months after February?",
      options: ["April", "May", "June", "July"],
      answer: "May",
      difficulty: 4,
    },
    {
      question: "What date is 14 days after March 3?",
      options: ["March 15", "March 16", "March 17", "March 18"],
      answer: "March 17",
      difficulty: 4,
    },
    {
      question: "Which month has 31 days and comes after June?",
      options: ["June", "July", "August", "September"],
      answer: "July",
      difficulty: 4,
    },
    {
      question: "If today is Tuesday, what day will it be in 20 days?",
      options: ["Sunday", "Monday", "Tuesday", "Wednesday"],
      answer: "Monday",
      difficulty: 5,
    },
    {
      question: "Which month is 5 months after August?",
      options: ["December", "January", "February", "March"],
      answer: "January",
      difficulty: 5,
    },
    {
      question: "What date is 21 days after July 4?",
      options: ["July 23", "July 24", "July 25", "July 26"],
      answer: "July 25",
      difficulty: 5,
    },
    {
      question: "If today is Sunday, what day will it be in 15 days?",
      options: ["Sunday", "Monday", "Tuesday", "Wednesday"],
      answer: "Monday",
      difficulty: 5,
    },
    {
      question: "Which month comes after January?",
      options: ["February", "March", "April", "May"],
      answer: "February",
      difficulty: 1,
    },
    {
      question: "If today is Monday, what day is tomorrow?",
      options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
      answer: "Tuesday",
      difficulty: 1,
    },
    {
      question: "Which month comes before August?",
      options: ["June", "July", "September", "October"],
      answer: "July",
      difficulty: 1,
    },
    {
      question: "How many days are in a week?",
      options: ["5", "6", "7", "8"],
      answer: "7",
      difficulty: 1,
    },
    {
      question: "If today is Sunday, what day was yesterday?",
      options: ["Friday", "Saturday", "Monday", "Tuesday"],
      answer: "Saturday",
      difficulty: 1,
    },
    {
      question: "Which season comes after winter?",
      options: ["Spring", "Summer", "Autumn", "Winter"],
      answer: "Spring",
      difficulty: 1,
    },
    {
      question: "How many months are in half a year?",
      options: ["4", "5", "6", "7"],
      answer: "6",
      difficulty: 1,
    },
    {
      question: "Which month comes after November?",
      options: ["October", "November", "December", "January"],
      answer: "December",
      difficulty: 1,
    },
    {
      question: "If today is Wednesday, what day will it be in 2 days?",
      options: ["Thursday", "Friday", "Saturday", "Sunday"],
      answer: "Friday",
      difficulty: 2,
    },
    {
      question: "Which month comes after October?",
      options: ["September", "October", "November", "December"],
      answer: "November",
      difficulty: 2,
    },
    {
      question: "How many days are in 5 weeks?",
      options: ["28", "30", "35", "40"],
      answer: "35",
      difficulty: 2,
    },
    {
      question: "If today is Friday, what day was 3 days ago?",
      options: ["Sunday", "Monday", "Tuesday", "Wednesday"],
      answer: "Tuesday",
      difficulty: 2,
    },
    {
      question: "Which month has 30 days and comes after May?",
      options: ["May", "June", "July", "August"],
      answer: "June",
      difficulty: 2,
    },
    {
      question: "If today is Saturday, what day will it be in 4 days?",
      options: ["Sunday", "Monday", "Tuesday", "Wednesday"],
      answer: "Wednesday",
      difficulty: 2,
    },
    {
      question: "How many weeks are in 28 days?",
      options: ["3", "4", "5", "6"],
      answer: "4",
      difficulty: 2,
    },
    {
      question: "Which season comes after summer?",
      options: ["Winter", "Autumn", "Spring", "Summer"],
      answer: "Autumn",
      difficulty: 2,
    },
    {
      question: "If today is March 4, what date is 3 days later?",
      options: ["March 5", "March 6", "March 7", "March 8"],
      answer: "March 7",
      difficulty: 3,
    },
    {
      question: "How many days are in 6 weeks?",
      options: ["35", "40", "42", "45"],
      answer: "42",
      difficulty: 3,
    },
    {
      question: "If today is Tuesday, what day will it be in 9 days?",
      options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
      answer: "Thursday",
      difficulty: 3,
    },
    {
      question: "Which month is 3 months after March?",
      options: ["May", "June", "July", "August"],
      answer: "June",
      difficulty: 3,
    },
    {
      question: "What date is 5 days after June 10?",
      options: ["June 12", "June 13", "June 14", "June 15"],
      answer: "June 15",
      difficulty: 3,
    },
    {
      question: "How many days are between the 8th and the 13th?",
      options: ["4", "5", "6", "7"],
      answer: "5",
      difficulty: 3,
    },
    {
      question: "If today is Sunday, what day was it 1 week ago?",
      options: ["Saturday", "Sunday", "Monday", "Tuesday"],
      answer: "Sunday",
      difficulty: 3,
    },
    {
      question: "Which month is the shortest month?",
      options: ["January", "February", "March", "April"],
      answer: "February",
      difficulty: 3,
    },
    {
      question: "If today is Thursday, what day will it be in 15 days?",
      options: ["Thursday", "Friday", "Saturday", "Sunday"],
      answer: "Friday",
      difficulty: 4,
    },
    {
      question: "What date is 10 days after January 12?",
      options: ["January 20", "January 21", "January 22", "January 23"],
      answer: "January 22",
      difficulty: 4,
    },
    {
      question: "Which month is 4 months after February?",
      options: ["April", "May", "June", "July"],
      answer: "June",
      difficulty: 4,
    },
    {
      question: "If today is Monday, what day will it be in 18 days?",
      options: ["Thursday", "Friday", "Saturday", "Sunday"],
      answer: "Friday",
      difficulty: 4,
    },
    {
      question: "How many days are in 7 weeks?",
      options: ["42", "45", "49", "56"],
      answer: "49",
      difficulty: 4,
    },
    {
      question: "What date is 14 days after April 8?",
      options: ["April 20", "April 21", "April 22", "April 23"],
      answer: "April 22",
      difficulty: 4,
    },
    {
      question: "Which month comes 4 months after August?",
      options: ["November", "December", "January", "February"],
      answer: "December",
      difficulty: 4,
    },
    {
      question: "If today is Saturday, what day was 10 days ago?",
      options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
      answer: "Wednesday",
      difficulty: 4,
    },
    {
      question: "If today is Tuesday, what day will it be in 29 days?",
      options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      answer: "Wednesday",
      difficulty: 5,
    },
    {
      question: "Which month is 6 months after January?",
      options: ["June", "July", "August", "September"],
      answer: "July",
      difficulty: 5,
    },
    {
      question: "What date is 21 days after October 4?",
      options: ["October 24", "October 25", "October 26", "October 27"],
      answer: "October 25",
      difficulty: 5,
    },
    {
      question: "If today is Friday, what day was 17 days ago?",
      options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      answer: "Tuesday",
      difficulty: 5,
    },
    {
      question: "What date is 14 days after November 17?",
      options: ["November 29", "November 30", "December 1", "December 2"],
      answer: "December 1",
      difficulty: 5,
    },
    {
      question: "How many days are in 8 weeks?",
      options: ["48", "52", "56", "60"],
      answer: "56",
      difficulty: 5,
    },
    {
      question: "If today is Sunday, what day will it be in 22 days?",
      options: ["Sunday", "Monday", "Tuesday", "Wednesday"],
      answer: "Monday",
      difficulty: 5,
    },
    {
      question: "Which month is 5 months after September?",
      options: ["January", "February", "March", "April"],
      answer: "February",
      difficulty: 5,
    },
  ]
);

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

function createCalendarGeneratedEntry(difficulty) {
  const level = calendarClampDifficulty(difficulty);
  const generators = {
    1: [
      createCalendarNextMonthQuestion,
      createCalendarTomorrowQuestion,
      createCalendarDaysInWeekQuestion,
      createCalendarMonthCountQuestion,
    ],
    2: [
      createCalendarDayOffsetQuestion,
      createCalendarMonthRelationQuestion,
      createCalendarYesterdayQuestion,
      createCalendarFebruaryQuestion,
    ],
    3: [
      createCalendarDaysBetweenDatesQuestion,
      createCalendarWeeksQuestion,
      createCalendarDateShiftQuestion,
      createCalendarLeapYearQuestion,
    ],
    4: [
      createCalendarDayOffsetQuestion,
      createCalendarMonthOffsetQuestion,
      createCalendarDateShiftQuestion,
      createCalendarWeeksQuestion,
    ],
    5: [
      createCalendarDateShiftQuestion,
      createCalendarMonthOffsetQuestion,
      createCalendarCommonYearQuestion,
      createCalendarDaysBetweenDatesQuestion,
    ],
  };

  return calendarRandomChoice(generators[level])();
}

function createCalendarNextMonthQuestion() {
  const monthIndex = calendarRandomInt(0, CALENDAR_MONTHS.length - 2);
  const answer = CALENDAR_MONTHS[monthIndex + 1].name;
  return {
    question: `Which month comes after ${CALENDAR_MONTHS[monthIndex].name}?`,
    options: calendarMakeMonthOptions(answer),
    answer,
    difficulty: 1,
  };
}

function createCalendarTomorrowQuestion() {
  const dayIndex = calendarRandomInt(0, CALENDAR_DAY_NAMES.length - 1);
  const answer = CALENDAR_DAY_NAMES[(dayIndex + 1) % CALENDAR_DAY_NAMES.length];
  return {
    question: `If today is ${CALENDAR_DAY_NAMES[dayIndex]}, what day will it be tomorrow?`,
    options: calendarMakeDayOptions(answer),
    answer,
    difficulty: 1,
  };
}

function createCalendarDaysInWeekQuestion() {
  return {
    question: "How many days are in 1 week?",
    options: calendarMakeNumberOptions("7", [5, 6, 8, 9]),
    answer: "7",
    difficulty: 1,
  };
}

function createCalendarMonthCountQuestion() {
  return {
    question: "How many months are in a year?",
    options: calendarMakeNumberOptions("12", [10, 11, 13, 14]),
    answer: "12",
    difficulty: 1,
  };
}

function createCalendarDayOffsetQuestion() {
  const startIndex = calendarRandomInt(0, CALENDAR_DAY_NAMES.length - 1);
  const offset = calendarRandomInt(2, 6);
  const answer = CALENDAR_DAY_NAMES[(startIndex + offset) % CALENDAR_DAY_NAMES.length];
  return {
    question: `If today is ${CALENDAR_DAY_NAMES[startIndex]}, what day will it be in ${offset} days?`,
    options: calendarMakeDayOptions(answer),
    answer,
    difficulty: 2,
  };
}

function createCalendarMonthRelationQuestion() {
  const monthIndex = calendarRandomInt(1, CALENDAR_MONTHS.length - 2);
  const direction = calendarRandomChoice(["before", "after"]);
  const answerIndex = direction === "before" ? monthIndex - 1 : monthIndex + 1;
  const answer = CALENDAR_MONTHS[answerIndex].name;
  return {
    question: `Which month comes ${direction} ${CALENDAR_MONTHS[monthIndex].name}?`,
    options: calendarMakeMonthOptions(answer),
    answer,
    difficulty: 2,
  };
}

function createCalendarYesterdayQuestion() {
  const dayIndex = calendarRandomInt(0, CALENDAR_DAY_NAMES.length - 1);
  const answer = CALENDAR_DAY_NAMES[(dayIndex + CALENDAR_DAY_NAMES.length - 1) % CALENDAR_DAY_NAMES.length];
  return {
    question: `If today is ${CALENDAR_DAY_NAMES[dayIndex]}, what day was it yesterday?`,
    options: calendarMakeDayOptions(answer),
    answer,
    difficulty: 2,
  };
}

function createCalendarFebruaryQuestion() {
  return {
    question: "Which month has 28 or 29 days?",
    options: calendarMakeMonthOptions("February"),
    answer: "February",
    difficulty: 2,
  };
}

function createCalendarDaysBetweenDatesQuestion() {
  const startMonth = calendarRandomInt(0, CALENDAR_MONTHS.length - 2);
  const startDay = calendarRandomInt(1, Math.min(20, CALENDAR_MONTHS[startMonth].days - 1));
  const endDay = startDay + calendarRandomInt(3, 7);
  const answer = String(endDay - startDay);
  return {
    question: `If a trip starts on the ${calendarFormatOrdinal(startDay)} and ends on the ${calendarFormatOrdinal(endDay)}, how many days are between those dates?`,
    options: calendarMakeNumberOptions(answer, calendarBuildNearbyNumbers(answer, 3, 1)),
    answer,
    difficulty: 3,
  };
}

function createCalendarWeeksQuestion() {
  const weeks = calendarRandomChoice([2, 3, 4, 5, 6, 8]);
  const answer = String(weeks * 7);
  return {
    question: `How many days are in ${weeks} weeks?`,
    options: calendarMakeNumberOptions(answer, calendarBuildNearbyNumbers(answer, 14, 7)),
    answer,
    difficulty: 3,
  };
}

function createCalendarDateShiftQuestion() {
  const monthIndex = calendarRandomInt(0, CALENDAR_MONTHS.length - 1);
  const day = calendarRandomInt(1, Math.min(20, CALENDAR_MONTHS[monthIndex].days - 7));
  const shift = calendarRandomChoice([3, 5, 7, 10, 14, 21]);
  const answerDate = calendarAddDays(monthIndex, day, shift);
  const answer = calendarFormatDate(answerDate.monthIndex, answerDate.day);
  const options = calendarBuildDateOptions(answerDate.monthIndex, answerDate.day, [1, 2, 3, -1, -2, -3]);

  return {
    question: `What date is ${shift} days after ${CALENDAR_MONTHS[monthIndex].name} ${day}?`,
    options,
    answer,
    difficulty: 3,
  };
}

function createCalendarLeapYearQuestion() {
  return {
    question: "How many days are in February during a leap year?",
    options: calendarMakeNumberOptions("29", [28, 30, 31, 32]),
    answer: "29",
    difficulty: 3,
  };
}

function createCalendarMonthOffsetQuestion() {
  const monthIndex = calendarRandomInt(0, CALENDAR_MONTHS.length - 1);
  const offset = calendarRandomChoice([2, 3, 4, 5]);
  const answer = CALENDAR_MONTHS[(monthIndex + offset) % CALENDAR_MONTHS.length].name;
  return {
    question: `Which month is ${offset} months after ${CALENDAR_MONTHS[monthIndex].name}?`,
    options: calendarMakeMonthOptions(answer),
    answer,
    difficulty: 4,
  };
}

function createCalendarCommonYearQuestion() {
  return {
    question: "How many days are in a normal year?",
    options: calendarMakeNumberOptions("365", [360, 364, 366, 370]),
    answer: "365",
    difficulty: 5,
  };
}

function calendarMakeDayOptions(answer) {
  return calendarBuildOptions(answer, CALENDAR_DAY_NAMES);
}

function calendarMakeMonthOptions(answer) {
  return calendarBuildOptions(answer, CALENDAR_MONTHS.map((month) => month.name));
}

function calendarMakeNumberOptions(answer, candidates) {
  return calendarBuildOptions(answer, candidates.map(String));
}

function calendarBuildNearbyNumbers(answer, spread, step) {
  const value = Number(answer);
  if (!Number.isFinite(value)) {
    return [];
  }

  return [value - spread, value - step, value + step, value + spread]
    .map((number) => String(Math.max(1, Math.round(number))))
    .filter((option) => option !== String(answer));
}

function calendarBuildDateOptions(monthIndex, day, offsets) {
  const answer = calendarFormatDate(monthIndex, day);
  return calendarBuildOptions(
    answer,
    offsets.map((offset) => {
      const date = calendarAddDays(monthIndex, day, offset);
      return calendarFormatDate(date.monthIndex, date.day);
    })
  );
}

function calendarBuildOptions(answer, candidates) {
  const options = [String(answer)];
  const uniqueCandidates = Array.from(new Set(candidates.map(String))).filter((candidate) => candidate !== String(answer));
  const shuffledCandidates = calendarShuffle(uniqueCandidates);

  while (options.length < 4 && shuffledCandidates.length) {
    options.push(shuffledCandidates.shift());
  }

  while (options.length < 4) {
    const fallback = `${answer} ${options.length}`;
    if (!options.includes(fallback)) {
      options.push(fallback);
    }
  }

  return calendarShuffle(options);
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

function calendarAddDays(monthIndex, day, delta) {
  let currentMonth = monthIndex;
  let currentDay = day + delta;

  while (currentDay > CALENDAR_MONTHS[currentMonth].days) {
    currentDay -= CALENDAR_MONTHS[currentMonth].days;
    currentMonth = (currentMonth + 1) % CALENDAR_MONTHS.length;
  }

  while (currentDay < 1) {
    currentMonth = (currentMonth - 1 + CALENDAR_MONTHS.length) % CALENDAR_MONTHS.length;
    currentDay += CALENDAR_MONTHS[currentMonth].days;
  }

  return { monthIndex: currentMonth, day: currentDay };
}

function calendarFormatDate(monthIndex, day) {
  return `${CALENDAR_MONTHS[monthIndex].name} ${day}`;
}

function calendarClampDifficulty(difficulty) {
  const value = Number(difficulty);
  if (!Number.isInteger(value)) {
    return 1;
  }

  return Math.min(5, Math.max(1, value));
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
