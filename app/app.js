const OPTION_LABELS = ["A", "B", "C", "D"];
const SESSION_HISTORY_STORAGE_KEY = "homework-session-history-v2";
const SELECTED_USER_STORAGE_KEY = "homework-selected-user-v1";
const MAX_SAVED_SESSIONS = 10;
const QUESTION_COUNT_OPTIONS = [20, 30, 40];
const DEFAULT_HEBREW_WRITING_TAIL_COUNT = 3;
const HEBREW_ONLY_WRITING_TAIL_COUNT = 5;
const MAP_QUESTION_INTERVAL = 30;
const RESERVED_MAP_CATEGORY = "geography-map";
const LANGUAGE_DRAG_INTERVAL = 4;
const HEBREW_FINAL_LETTER_INTERVAL = 14;
const HEBREW_IMAGE_DRAG_SHARE = 0.3;
const GENERATED_CATEGORY_DRAG_SHARES = {
  "reading-comprehension": 0.32,
  fractions: 0.28,
  "fractions-and-ratios": 0.24,
  science: 0.2,
  nutrition: 0.22,
  estimation: 0.22,
  measurement: 0.26,
  "visual-measurement": 0.3,
  "maps-and-directions": 0.3,
};
const REVIEW_FOCUS_SHARE = 0.2;
const REVIEW_RECENCY_DECAY = 0.82;
const SNAPSHOT_DATE_PATTERN = /^Snapshot date:\s*(\d{4}-\d{2}-\d{2})\.$/;
const CORE_SESSION_CATEGORIES = ["math", "hebrew"];
const NON_CORE_SESSION_CATEGORIES = [
  "science",
  "science-evidence",
  "time",
  "statistics",
  "algebra",
  "applied-word-problems",
  "visual-math",
  "visual-measurement",
  "logic",
  "rationality",
  "general-knowledge",
  "geography",
  "population",
  "financial-literacy",
  "measurement",
  "charts-and-graphs",
  "calendar",
  "estimation",
  "probability",
  "reading-comprehension",
  "vocabulary-grammar",
  "maps-and-directions",
  "digital-safety",
  "health-and-first-aid",
  "nutrition",
  "household-problem-solving",
  "fractions",
  "fractions-and-ratios",
  "spatial-reasoning",
];
const RARE_NON_CORE_CATEGORY_TARGET_OVERALL_SHARES = {
  "digital-safety": 1 / 50,
  "health-and-first-aid": 1 / 50,
  "household-problem-solving": 1 / 50,
  "nutrition": 1 / 50,
  "rationality": 1 / 50,
};
const REVIEW_FOCUS_ALLOWED_CATEGORIES = new Set([
  "math",
  "hebrew",
  "time",
  "statistics",
  "algebra",
  "applied-word-problems",
  "visual-math",
  "visual-measurement",
  "measurement",
  "charts-and-graphs",
  "calendar",
  "estimation",
  "probability",
  "vocabulary-grammar",
  "maps-and-directions",
  "fractions",
  "fractions-and-ratios",
  "spatial-reasoning",
]);
const SESSION_CATEGORY_ORDER = [...CORE_SESSION_CATEGORIES, ...NON_CORE_SESSION_CATEGORIES];
const CORE_CATEGORY_SHARE = 0.45;
const USER_PROFILES = [
  {
    id: "noga",
    name: "Noga",
    defaultDifficulty: 3,
    avatarStyle: "longHair",
    palette: {
      sky: "#fff1d2",
      shirt: "#e28a63",
      hair: "#e1be5a",
      accent: "#8fb8ff",
      eyes: "#3e8a57",
    },
  },
  {
    id: "gideon",
    name: "Gideon",
    defaultDifficulty: 4,
    avatarStyle: "curlyHair",
    palette: {
      sky: "#e6f6ff",
      shirt: "#4f92d8",
      hair: "#3f2f2a",
      accent: "#f4c869",
      eyes: "#243649",
    },
  },
  {
    id: "gabriel",
    name: "Gabriel",
    defaultDifficulty: 1,
    avatarStyle: "lightCurls",
    palette: {
      sky: "#ecf7ea",
      shirt: "#5ea96f",
      hair: "#9b7653",
      accent: "#ff9a84",
      eyes: "#3a4f63",
    },
  },
];
const CATEGORY_LABELS = {
  math: "Math",
  hebrew: "Hebrew",
  "hebrew-writing": "Hebrew Writing",
  science: "Science",
  "science-evidence": "Science Evidence",
  time: "Time",
  statistics: "Statistics",
  algebra: "Algebra",
  "applied-word-problems": "Applied Word Problems",
  "visual-math": "Visual Math",
  "visual-measurement": "Visual Measurement",
  logic: "Logic",
  rationality: "Rationality",
  "general-knowledge": "General Knowledge",
  geography: "Geography",
  "geography-map": "Geography Map",
  population: "Population",
  "financial-literacy": "Financial Literacy",
  measurement: "Measurement",
  "charts-and-graphs": "Charts and Graphs",
  calendar: "Calendar",
  estimation: "Estimation",
  probability: "Probability",
  "reading-comprehension": "Reading Comprehension",
  "vocabulary-grammar": "Vocabulary / Grammar",
  "maps-and-directions": "Maps and Directions",
  "digital-safety": "Digital Safety",
  "health-and-first-aid": "Health and First Aid",
  nutrition: "Nutrition",
  "household-problem-solving": "Household Problem Solving",
  fractions: "Fractions",
  "fractions-and-ratios": "Fractions and Ratios",
  "spatial-reasoning": "Spatial Reasoning",
};
const USER_PROFILE_MAP = Object.fromEntries(USER_PROFILES.map((profile) => [profile.id, profile]));
const NON_HEBREW_DIFFICULTY_WEIGHTS = {
  1: { 1: 1 },
  2: { 2: 0.75, 1: 0.25 },
  3: { 3: 0.7, 2: 0.2, 1: 0.1 },
  4: { 4: 0.6, 3: 0.25, 2: 0.1, 1: 0.05 },
  5: { 5: 0.7, 4: 0.2, 3: 0.05, 2: 0.05 },
};
const CATEGORY_MAX_DIFFICULTIES = {
  population: 3,
};
const CHART_BAR_TEMPLATES = [
  {
    title: "Favorite Fruits",
    labels: ["Apples", "Bananas", "Grapes", "Oranges"],
    prompts: {
      most: () => "Which fruit got the most votes?",
      secondMost: () => "Which fruit got the second most votes?",
      fewest: () => "Which fruit got the fewest votes?",
      exact: (label) => `How many votes did ${label.toLowerCase()} get?`,
      total: () => "How many votes were there altogether?",
      difference: (larger, smaller) =>
        `How many more votes did ${larger.toLowerCase()} get than ${smaller.toLowerCase()}?`,
    },
    summaryItem: (item) => `${item.label} got ${formatUnitCount(item.value, "vote")}`,
  },
  {
    title: "Pet Votes",
    labels: ["Dogs", "Cats", "Fish", "Birds"],
    prompts: {
      most: () => "Which pet got the most votes?",
      secondMost: () => "Which pet got the second most votes?",
      fewest: () => "Which pet got the fewest votes?",
      exact: (label) => `How many votes did ${label.toLowerCase()} get?`,
      total: () => "How many votes were there altogether?",
      difference: (larger, smaller) =>
        `How many more votes did ${larger.toLowerCase()} get than ${smaller.toLowerCase()}?`,
    },
    summaryItem: (item) => `${item.label} got ${formatUnitCount(item.value, "vote")}`,
  },
  {
    title: "Toy Boxes",
    labels: ["Blocks", "Cars", "Balls", "Dolls"],
    prompts: {
      most: () => "Which toy type has the most pieces?",
      secondMost: () => "Which toy type has the second most pieces?",
      fewest: () => "Which toy type has the fewest pieces?",
      exact: (label) => `How many ${label.toLowerCase()} are there?`,
      total: () => "How many toy pieces are there altogether?",
      difference: (larger, smaller) =>
        `How many more ${larger.toLowerCase()} are there than ${smaller.toLowerCase()}?`,
    },
    summaryItem: (item) => `${item.label}: ${formatUnitCount(item.value, "piece")}`,
  },
  {
    title: "Snack Sales",
    labels: ["Crackers", "Yogurt", "Cheese", "Apples"],
    prompts: {
      most: () => "Which snack sold the most?",
      secondMost: () => "Which snack sold the second most?",
      fewest: () => "Which snack sold the fewest?",
      exact: (label) => `How many ${label.toLowerCase()} were sold?`,
      total: () => "How many snacks were sold altogether?",
      difference: (larger, smaller) =>
        `How many more ${larger.toLowerCase()} were sold than ${smaller.toLowerCase()}?`,
    },
    summaryItem: (item) => `${item.label}: ${formatUnitCount(item.value, "snack")} sold`,
  },
  {
    title: "Books Read",
    labels: ["Noga", "Gideon", "Gabriel", "Eden"],
    prompts: {
      most: () => "Who read the most books?",
      secondMost: () => "Who read the second most books?",
      fewest: () => "Who read the fewest books?",
      exact: (label) => `How many books did ${label} read?`,
      total: () => "How many books were read altogether?",
      difference: (larger, smaller) => `How many more books did ${larger} read than ${smaller}?`,
    },
    summaryItem: (item) => `${item.label} read ${formatUnitCount(item.value, "book")}`,
  },
  {
    title: "Sticker Colors",
    labels: ["Red", "Blue", "Green", "Yellow"],
    prompts: {
      most: () => "Which color has the most stickers?",
      secondMost: () => "Which color has the second most stickers?",
      fewest: () => "Which color has the fewest stickers?",
      exact: (label) => `How many ${label.toLowerCase()} stickers are there?`,
      total: () => "How many stickers are there altogether?",
      difference: (larger, smaller) =>
        `How many more ${larger.toLowerCase()} stickers are there than ${smaller.toLowerCase()}?`,
    },
    summaryItem: (item) => `${item.label}: ${formatUnitCount(item.value, "sticker")}`,
  },
  {
    title: "Favorite Ice Creams",
    labels: ["Vanilla", "Chocolate", "Strawberry", "Mint"],
    prompts: {
      most: () => "Which ice cream got the most votes?",
      secondMost: () => "Which ice cream got the second most votes?",
      fewest: () => "Which ice cream got the fewest votes?",
      exact: (label) => `How many votes did ${label.toLowerCase()} get?`,
      total: () => "How many votes were there altogether?",
      difference: (larger, smaller) =>
        `How many more votes did ${larger.toLowerCase()} get than ${smaller.toLowerCase()}?`,
    },
    summaryItem: (item) => `${item.label} got ${formatUnitCount(item.value, "vote")}`,
  },
  {
    title: "Recess Games",
    labels: ["Tag", "Soccer", "Hopscotch", "Four Square"],
    prompts: {
      most: () => "Which recess game got the most votes?",
      secondMost: () => "Which recess game got the second most votes?",
      fewest: () => "Which recess game got the fewest votes?",
      exact: (label) => `How many votes did ${label.toLowerCase()} get?`,
      total: () => "How many votes were there altogether?",
      difference: (larger, smaller) =>
        `How many more votes did ${larger.toLowerCase()} get than ${smaller.toLowerCase()}?`,
    },
    summaryItem: (item) => `${item.label} got ${formatUnitCount(item.value, "vote")}`,
  },
  {
    title: "Backpack Items",
    labels: ["Pencils", "Crayons", "Markers", "Erasers"],
    prompts: {
      most: () => "Which backpack item appears the most?",
      secondMost: () => "Which backpack item appears the second most?",
      fewest: () => "Which backpack item appears the fewest times?",
      exact: (label) => `How many ${label.toLowerCase()} are in the backpack?`,
      total: () => "How many backpack items are there altogether?",
      difference: (larger, smaller) =>
        `How many more ${larger.toLowerCase()} are there than ${smaller.toLowerCase()}?`,
    },
    summaryItem: (item) => `${item.label}: ${formatUnitCount(item.value, "item")}`,
  },
  {
    title: "Garden Flowers",
    labels: ["Roses", "Tulips", "Daisies", "Sunflowers"],
    prompts: {
      most: () => "Which flower has the most blooms?",
      secondMost: () => "Which flower has the second most blooms?",
      fewest: () => "Which flower has the fewest blooms?",
      exact: (label) => `How many ${label.toLowerCase()} are in the garden?`,
      total: () => "How many flowers are there altogether?",
      difference: (larger, smaller) =>
        `How many more ${larger.toLowerCase()} are in the garden than ${smaller.toLowerCase()}?`,
    },
    summaryItem: (item) => `${item.label}: ${formatUnitCount(item.value, "flower")}`,
  },
  {
    title: "Lunch Orders",
    labels: ["Pizza", "Pasta", "Salad", "Soup"],
    prompts: {
      most: () => "Which lunch got the most orders?",
      secondMost: () => "Which lunch got the second most orders?",
      fewest: () => "Which lunch got the fewest orders?",
      exact: (label) => `How many ${label.toLowerCase()} lunches were ordered?`,
      total: () => "How many lunches were ordered altogether?",
      difference: (larger, smaller) =>
        `How many more ${larger.toLowerCase()} lunches were ordered than ${smaller.toLowerCase()}?`,
    },
    summaryItem: (item) => `${item.label}: ${formatUnitCount(item.value, "order")}`,
  },
  {
    title: "Craft Beads",
    labels: ["Red", "Blue", "Green", "Gold"],
    prompts: {
      most: () => "Which bead color appears the most?",
      secondMost: () => "Which bead color appears the second most?",
      fewest: () => "Which bead color appears the fewest times?",
      exact: (label) => `How many ${label.toLowerCase()} beads are there?`,
      total: () => "How many beads are there altogether?",
      difference: (larger, smaller) =>
        `How many more ${larger.toLowerCase()} beads are there than ${smaller.toLowerCase()}?`,
    },
    summaryItem: (item) => `${item.label}: ${formatUnitCount(item.value, "bead")}`,
  },
  {
    title: "Playground Climbs",
    labels: ["Ava", "Leo", "Mia", "Noah"],
    prompts: {
      most: () => "Who climbed the ladder the most times?",
      secondMost: () => "Who climbed the ladder the second most times?",
      fewest: () => "Who climbed the ladder the fewest times?",
      exact: (label) => `How many times did ${label} climb the ladder?`,
      total: () => "How many climbs were there altogether?",
      difference: (larger, smaller) => `How many more climbs did ${larger} have than ${smaller}?`,
    },
    summaryItem: (item) => `${item.label}: ${formatUnitCount(item.value, "climb")}`,
  },
  {
    title: "Treasure Chest",
    labels: ["Coins", "Gems", "Keys", "Maps"],
    prompts: {
      most: () => "Which treasure appears the most?",
      secondMost: () => "Which treasure appears the second most?",
      fewest: () => "Which treasure appears the fewest times?",
      exact: (label) => `How many ${label.toLowerCase()} are in the treasure chest?`,
      total: () => "How many treasures are there altogether?",
      difference: (larger, smaller) =>
        `How many more ${larger.toLowerCase()} are there than ${smaller.toLowerCase()}?`,
    },
    summaryItem: (item) => `${item.label}: ${formatUnitCount(item.value, "treasure")}`,
  },
  {
    title: "Favorite Instruments",
    labels: ["Drums", "Piano", "Guitar", "Flute"],
    prompts: {
      most: () => "Which instrument got the most votes?",
      secondMost: () => "Which instrument got the second most votes?",
      fewest: () => "Which instrument got the fewest votes?",
      exact: (label) => `How many votes did ${label.toLowerCase()} get?`,
      total: () => "How many votes were there altogether?",
      difference: (larger, smaller) =>
        `How many more votes did ${larger.toLowerCase()} get than ${smaller.toLowerCase()}?`,
    },
    summaryItem: (item) => `${item.label} got ${formatUnitCount(item.value, "vote")}`,
  },
  {
    title: "Farm Animals",
    labels: ["Cows", "Pigs", "Sheep", "Goats"],
    prompts: {
      most: () => "Which farm animal is shown the most?",
      secondMost: () => "Which farm animal is shown the second most?",
      fewest: () => "Which farm animal is shown the fewest times?",
      exact: (label) => `How many ${label.toLowerCase()} are there?`,
      total: () => "How many farm animals are there altogether?",
      difference: (larger, smaller) =>
        `How many more ${larger.toLowerCase()} are there than ${smaller.toLowerCase()}?`,
    },
    summaryItem: (item) => `${item.label}: ${formatUnitCount(item.value, "animal")}`,
  },
  {
    title: "Reading Corner Books",
    labels: ["Space", "Animals", "Mystery", "Sports"],
    prompts: {
      most: () => "Which book bin has the most books?",
      secondMost: () => "Which book bin has the second most books?",
      fewest: () => "Which book bin has the fewest books?",
      exact: (label) => `How many ${label.toLowerCase()} books are in the bin?`,
      total: () => "How many books are there altogether?",
      difference: (larger, smaller) =>
        `How many more ${larger.toLowerCase()} books are there than ${smaller.toLowerCase()} books?`,
    },
    summaryItem: (item) => `${item.label}: ${formatUnitCount(item.value, "book")}`,
  },
  {
    title: "Block Towers",
    labels: ["Tower A", "Tower B", "Tower C", "Tower D"],
    prompts: {
      most: () => "Which tower is tallest?",
      secondMost: () => "Which tower is the second tallest?",
      fewest: () => "Which tower is shortest?",
      exact: (label) => `How many blocks tall is ${label}?`,
      total: () => "How many blocks are there altogether?",
      difference: (larger, smaller) => `How many more blocks tall is ${larger} than ${smaller}?`,
    },
    summaryItem: (item) => `${item.label}: ${formatUnitCount(item.value, "block")} tall`,
  },
];
const CHART_TABLE_TEMPLATES = [
  {
    title: "Library Visits",
    leftLabel: "Day",
    rightLabel: "Visitors",
    labels: ["Mon", "Tue", "Wed", "Thu"],
    prompts: {
      most: () => "Which day had the most visitors?",
      secondMost: () => "Which day had the second most visitors?",
      fewest: () => "Which day had the fewest visitors?",
      exact: (label) => `How many visitors were there on ${label}?`,
      total: () => "How many visitors were there altogether?",
      combined: (left, right) => `How many visitors were there on ${left} and ${right} altogether?`,
      difference: (larger, smaller) =>
        `How many more visitors were there on ${larger} than ${smaller}?`,
    },
    summaryItem: (item) => `${item.label}: ${formatUnitCount(item.value, "visitor")}`,
  },
  {
    title: "Water Cups",
    leftLabel: "Day",
    rightLabel: "Cups",
    labels: ["Sun", "Mon", "Tue", "Wed"],
    prompts: {
      most: () => "Which day had the most cups of water?",
      secondMost: () => "Which day had the second most cups of water?",
      fewest: () => "Which day had the fewest cups of water?",
      exact: (label) => `How many cups of water were drunk on ${label}?`,
      total: () => "How many cups of water were drunk altogether?",
      combined: (left, right) =>
        `How many cups of water were drunk on ${left} and ${right} altogether?`,
      difference: (larger, smaller) =>
        `How many more cups of water were drunk on ${larger} than ${smaller}?`,
    },
    summaryItem: (item) => `${item.label}: ${formatUnitCount(item.value, "cup")} of water`,
  },
  {
    title: "Tree Heights",
    leftLabel: "Tree",
    rightLabel: "Meters",
    labels: ["Oak", "Pine", "Palm", "Maple"],
    prompts: {
      most: () => "Which tree is tallest?",
      secondMost: () => "Which tree is the second tallest?",
      fewest: () => "Which tree is shortest?",
      exact: (label) => `How tall is ${label} in meters?`,
      total: () => "What is the total height of all the trees in meters?",
      combined: (left, right) => `What is the total height of ${left} and ${right} in meters?`,
      difference: (larger, smaller) => `How many meters taller is ${larger} than ${smaller}?`,
    },
    summaryItem: (item) => `${item.label}: ${formatUnitCount(item.value, "meter")}`,
  },
  {
    title: "Team Points",
    leftLabel: "Team",
    rightLabel: "Points",
    labels: ["Red", "Blue", "Green", "Yellow"],
    prompts: {
      most: () => "Which team scored the most points?",
      secondMost: () => "Which team scored the second most points?",
      fewest: () => "Which team scored the fewest points?",
      exact: (label) => `How many points did the ${label} team score?`,
      total: () => "How many points were scored altogether?",
      combined: (left, right) =>
        `How many points did the ${left} and ${right} teams score altogether?`,
      difference: (larger, smaller) =>
        `How many more points did the ${larger} team score than the ${smaller} team?`,
    },
    summaryItem: (item) => `${item.label}: ${formatUnitCount(item.value, "point")}`,
  },
  {
    title: "Class Jobs",
    leftLabel: "Job",
    rightLabel: "Students",
    labels: ["Clean", "Read", "Draw", "Build"],
    prompts: {
      most: () => "Which job had the most students?",
      secondMost: () => "Which job had the second most students?",
      fewest: () => "Which job had the fewest students?",
      exact: (label) => `How many students had the ${label.toLowerCase()} job?`,
      total: () => "How many students are shown altogether?",
      combined: (left, right) =>
        `How many students had the ${left.toLowerCase()} and ${right.toLowerCase()} jobs altogether?`,
      difference: (larger, smaller) =>
        `How many more students had the ${larger.toLowerCase()} job than the ${smaller.toLowerCase()} job?`,
    },
    summaryItem: (item) => `${item.label}: ${formatUnitCount(item.value, "student")}`,
  },
  {
    title: "Plant Heights",
    leftLabel: "Plant",
    rightLabel: "Cm",
    labels: ["A", "B", "C", "D"],
    prompts: {
      most: () => "Which plant is tallest?",
      secondMost: () => "Which plant is the second tallest?",
      fewest: () => "Which plant is shortest?",
      exact: (label) => `How tall is plant ${label} in centimeters?`,
      total: () => "What is the total height of all the plants in centimeters?",
      combined: (left, right) =>
        `What is the total height of plants ${left} and ${right} in centimeters?`,
      difference: (larger, smaller) =>
        `How many centimeters taller is plant ${larger} than plant ${smaller}?`,
    },
    summaryItem: (item) => `${item.label}: ${formatUnitCount(item.value, "centimeter")}`,
  },
  {
    title: "Backyard Birds",
    leftLabel: "Bird",
    rightLabel: "Sightings",
    labels: ["Robin", "Crow", "Sparrow", "Bluejay"],
    prompts: {
      most: () => "Which bird had the most sightings?",
      secondMost: () => "Which bird had the second most sightings?",
      fewest: () => "Which bird had the fewest sightings?",
      exact: (label) => `How many times was a ${label.toLowerCase()} seen?`,
      total: () => "How many bird sightings were there altogether?",
      combined: (left, right) =>
        `How many bird sightings were there for ${left.toLowerCase()} and ${right.toLowerCase()} altogether?`,
      difference: (larger, smaller) =>
        `How many more sightings were there for ${larger.toLowerCase()} than ${smaller.toLowerCase()}?`,
    },
    summaryItem: (item) => `${item.label}: ${formatUnitCount(item.value, "sighting")}`,
  },
  {
    title: "Homework Pages",
    leftLabel: "Subject",
    rightLabel: "Pages",
    labels: ["Math", "Reading", "Science", "Writing"],
    prompts: {
      most: () => "Which subject had the most pages?",
      secondMost: () => "Which subject had the second most pages?",
      fewest: () => "Which subject had the fewest pages?",
      exact: (label) => `How many pages were finished in ${label.toLowerCase()}?`,
      total: () => "How many homework pages were finished altogether?",
      combined: (left, right) =>
        `How many homework pages were finished in ${left.toLowerCase()} and ${right.toLowerCase()} altogether?`,
      difference: (larger, smaller) =>
        `How many more pages were finished in ${larger.toLowerCase()} than ${smaller.toLowerCase()}?`,
    },
    summaryItem: (item) => `${item.label}: ${formatUnitCount(item.value, "page")}`,
  },
  {
    title: "Bus Stop Riders",
    leftLabel: "Stop",
    rightLabel: "Riders",
    labels: ["Oak", "Pine", "Maple", "Lake"],
    prompts: {
      most: () => "Which stop had the most riders?",
      secondMost: () => "Which stop had the second most riders?",
      fewest: () => "Which stop had the fewest riders?",
      exact: (label) => `How many riders got on at ${label} stop?`,
      total: () => "How many riders were there altogether?",
      combined: (left, right) =>
        `How many riders got on at ${left} and ${right} stops altogether?`,
      difference: (larger, smaller) =>
        `How many more riders got on at ${larger} stop than ${smaller} stop?`,
    },
    summaryItem: (item) => `${item.label}: ${formatUnitCount(item.value, "rider")}`,
  },
  {
    title: "Chore Minutes",
    leftLabel: "Chore",
    rightLabel: "Minutes",
    labels: ["Sweep", "Dust", "Wash", "Fold"],
    prompts: {
      most: () => "Which chore took the most minutes?",
      secondMost: () => "Which chore took the second most minutes?",
      fewest: () => "Which chore took the fewest minutes?",
      exact: (label) => `How many minutes were spent on ${label.toLowerCase()}?`,
      total: () => "How many chore minutes are shown altogether?",
      combined: (left, right) =>
        `How many minutes were spent on ${left.toLowerCase()} and ${right.toLowerCase()} altogether?`,
      difference: (larger, smaller) =>
        `How many more minutes were spent on ${larger.toLowerCase()} than ${smaller.toLowerCase()}?`,
    },
    summaryItem: (item) => `${item.label}: ${formatUnitCount(item.value, "minute")}`,
  },
  {
    title: "Cupcake Trays",
    leftLabel: "Tray",
    rightLabel: "Cupcakes",
    labels: ["A", "B", "C", "D"],
    prompts: {
      most: () => "Which tray has the most cupcakes?",
      secondMost: () => "Which tray has the second most cupcakes?",
      fewest: () => "Which tray has the fewest cupcakes?",
      exact: (label) => `How many cupcakes are on tray ${label}?`,
      total: () => "How many cupcakes are there altogether?",
      combined: (left, right) => `How many cupcakes are on trays ${left} and ${right} altogether?`,
      difference: (larger, smaller) =>
        `How many more cupcakes are on tray ${larger} than tray ${smaller}?`,
    },
    summaryItem: (item) => `${item.label}: ${formatUnitCount(item.value, "cupcake")}`,
  },
  {
    title: "Can Collection",
    leftLabel: "Team",
    rightLabel: "Cans",
    labels: ["Red", "Blue", "Green", "Gold"],
    prompts: {
      most: () => "Which team collected the most cans?",
      secondMost: () => "Which team collected the second most cans?",
      fewest: () => "Which team collected the fewest cans?",
      exact: (label) => `How many cans did the ${label.toLowerCase()} team collect?`,
      total: () => "How many cans were collected altogether?",
      combined: (left, right) =>
        `How many cans did the ${left.toLowerCase()} and ${right.toLowerCase()} teams collect altogether?`,
      difference: (larger, smaller) =>
        `How many more cans did the ${larger.toLowerCase()} team collect than the ${smaller.toLowerCase()} team?`,
    },
    summaryItem: (item) => `${item.label}: ${formatUnitCount(item.value, "can")}`,
  },
  {
    title: "Jump Rope Counts",
    leftLabel: "Student",
    rightLabel: "Jumps",
    labels: ["Lia", "Omar", "Ruth", "Ben"],
    prompts: {
      most: () => "Which student had the most jumps?",
      secondMost: () => "Which student had the second most jumps?",
      fewest: () => "Which student had the fewest jumps?",
      exact: (label) => `How many jumps did ${label} do?`,
      total: () => "How many jumps were there altogether?",
      combined: (left, right) => `How many jumps did ${left} and ${right} do altogether?`,
      difference: (larger, smaller) =>
        `How many more jumps did ${larger} do than ${smaller}?`,
    },
    summaryItem: (item) => `${item.label}: ${formatUnitCount(item.value, "jump")}`,
  },
  {
    title: "Pencil Lengths",
    leftLabel: "Pencil",
    rightLabel: "Cm",
    labels: ["Red", "Blue", "Green", "Yellow"],
    prompts: {
      most: () => "Which pencil is longest?",
      secondMost: () => "Which pencil is the second longest?",
      fewest: () => "Which pencil is shortest?",
      exact: (label) => `How long is the ${label.toLowerCase()} pencil in centimeters?`,
      total: () => "What is the total length of all the pencils in centimeters?",
      combined: (left, right) =>
        `What is the total length of the ${left.toLowerCase()} and ${right.toLowerCase()} pencils in centimeters?`,
      difference: (larger, smaller) =>
        `How many centimeters longer is the ${larger.toLowerCase()} pencil than the ${smaller.toLowerCase()} pencil?`,
    },
    summaryItem: (item) => `${item.label}: ${formatUnitCount(item.value, "centimeter")}`,
  },
  {
    title: "Zoo Gate Counts",
    leftLabel: "Gate",
    rightLabel: "Visitors",
    labels: ["North", "South", "East", "West"],
    prompts: {
      most: () => "Which gate had the most visitors?",
      secondMost: () => "Which gate had the second most visitors?",
      fewest: () => "Which gate had the fewest visitors?",
      exact: (label) => `How many visitors came through the ${label.toLowerCase()} gate?`,
      total: () => "How many visitors came through all the gates altogether?",
      combined: (left, right) =>
        `How many visitors came through the ${left.toLowerCase()} and ${right.toLowerCase()} gates altogether?`,
      difference: (larger, smaller) =>
        `How many more visitors came through the ${larger.toLowerCase()} gate than the ${smaller.toLowerCase()} gate?`,
    },
    summaryItem: (item) => `${item.label}: ${formatUnitCount(item.value, "visitor")}`,
  },
  {
    title: "Soccer Practice Goals",
    leftLabel: "Player",
    rightLabel: "Goals",
    labels: ["Ava", "Leo", "Mia", "Noah"],
    prompts: {
      most: () => "Which player scored the most goals?",
      secondMost: () => "Which player scored the second most goals?",
      fewest: () => "Which player scored the fewest goals?",
      exact: (label) => `How many goals did ${label} score?`,
      total: () => "How many goals were scored altogether?",
      combined: (left, right) => `How many goals did ${left} and ${right} score altogether?`,
      difference: (larger, smaller) =>
        `How many more goals did ${larger} score than ${smaller}?`,
    },
    summaryItem: (item) => `${item.label}: ${formatUnitCount(item.value, "goal")}`,
  },
  {
    title: "Snack Table",
    leftLabel: "Snack",
    rightLabel: "Pieces",
    labels: ["Pretzels", "Carrots", "Crackers", "Cheese"],
    prompts: {
      most: () => "Which snack has the most pieces?",
      secondMost: () => "Which snack has the second most pieces?",
      fewest: () => "Which snack has the fewest pieces?",
      exact: (label) => `How many pieces of ${label.toLowerCase()} are there?`,
      total: () => "How many snack pieces are there altogether?",
      combined: (left, right) =>
        `How many pieces of ${left.toLowerCase()} and ${right.toLowerCase()} are there altogether?`,
      difference: (larger, smaller) =>
        `How many more pieces of ${larger.toLowerCase()} are there than ${smaller.toLowerCase()}?`,
    },
    summaryItem: (item) => `${item.label}: ${formatUnitCount(item.value, "piece")}`,
  },
  {
    title: "Toy Car Distances",
    leftLabel: "Car",
    rightLabel: "Meters",
    labels: ["Red", "Blue", "Green", "Yellow"],
    prompts: {
      most: () => "Which toy car rolled the farthest?",
      secondMost: () => "Which toy car rolled the second farthest?",
      fewest: () => "Which toy car rolled the shortest distance?",
      exact: (label) => `How far did the ${label.toLowerCase()} car roll in meters?`,
      total: () => "What is the total distance rolled by all the toy cars in meters?",
      combined: (left, right) =>
        `What is the total distance rolled by the ${left.toLowerCase()} and ${right.toLowerCase()} cars in meters?`,
      difference: (larger, smaller) =>
        `How many meters farther did the ${larger.toLowerCase()} car roll than the ${smaller.toLowerCase()} car?`,
    },
    summaryItem: (item) => `${item.label}: ${formatUnitCount(item.value, "meter")}`,
  },
];

const HEBREW_NIKKUD_OVERRIDES = {
  "ב-": "בְּ-",
  "כ-": "כְּ-",
  "ל-": "לְ-",
  "מ-": "מִ-",
  "ו-": "וְ-",
  "ה-": "הַ-",
  "אבא": "אַבָּא",
  "אדום": "אָדוֹם",
  "אוכל": "אוֹכֶל",
  "אחות": "אָחוֹת",
  "אח": "אָח",
  "איך": "אֵיךְ",
  "אישה": "אִשָּׁה",
  "איש": "אִישׁ",
  "אמא": "אִמָּא",
  "אני": "אֲנִי",
  "את": "אַתְ",
  "אתה": "אַתָּה",
  "אתם": "אַתֶּם",
  "אתן": "אַתֶּן",
  "איפה": "אֵיפֹה",
  "בית": "בַּיִת",
  "ביצה": "בֵּיצָה",
  "בוקר": "בֹּקֶר",
  "ביחד": "בְּיַחַד",
  "בפנים": "בִּפְנִים",
  "בבקשה": "בְּבַקָּשָׁה",
  "בן": "בֵּן",
  "בת": "בַּת",
  "דנה": "דָּנָה",
  "דג": "דָּג",
  "דרך": "דֶּרֶךְ",
  "דלת": "דֶּלֶת",
  "דף": "דַּף",
  "הבא": "הַבָּא",
  "הוא": "הוּא",
  "היא": "הִיא",
  "הם": "הֵם",
  "הן": "הֵן",
  "היום": "הַיּוֹם",
  "הרים": "הָרִים",
  "וילון": "וִילוֹן",
  "זמן": "זְמַן",
  "חבר": "חָבֵר",
  "חיות": "חַיּוֹת",
  "חתול": "חָתוּל",
  "חולה": "חוֹלֶה",
  "ילד": "יֶלֶד",
  "ילדה": "יַלְדָּה",
  "ים": "יָם",
  "ירח": "יָרֵחַ",
  "יש": "יֵשׁ",
  "ישראל": "יִשְׂרָאֵל",
  "כדור": "כַּדּוּר",
  "כולם": "כּוּלָּם",
  "כלב": "כֶּלֶב",
  "כלום": "כְּלוּם",
  "כסא": "כִּסֵּא",
  "כסף": "כֶּסֶף",
  "כן": "כֵּן",
  "לחם": "לֶחֶם",
  "לילה": "לַיְלָה",
  "למה": "לָמָּה",
  "מה": "מָה",
  "מהר": "מַהֵר",
  "מים": "מַיִם",
  "מי": "מִי",
  "מלך": "מֶלֶךְ",
  "מלכה": "מַלְכָּה",
  "מיטה": "מִטָּה",
  "מכונית": "מְכוֹנִית",
  "מעניין": "מְעַנְיֵן",
  "מפתח": "מַפְתֵּחַ",
  "מראה": "מַרְאָה",
  "מתי": "מָתַי",
  "ספר": "סֵפֶר",
  "סלון": "סָלוֹן",
  "סליחה": "סְלִיחָה",
  "סיפור": "סִיפּוּר",
  "עוגה": "עוּגָה",
  "עוף": "עוֹף",
  "עיר": "עִיר",
  "עין": "עַיִן",
  "עכבר": "עַכְבָּר",
  "עץ": "עֵץ",
  "צבעים": "צְבָעִים",
  "פה": "פֹּה",
  "פנים": "פָּנִים",
  "פרח": "פֶּרַח",
  "ציפור": "צִפּוֹר",
  "קפה": "קָפֶה",
  "קצת": "קְצָת",
  "רגל": "רֶגֶל",
  "שולחן": "שֻׁלְחָן",
  "שלום": "שָׁלוֹם",
  "שבוע": "שָׁבוּעַ",
  "שמש": "שֶׁמֶשׁ",
  "שם": "שָׁם",
  "תודה": "תּוֹדָה",
};

// These forms appear in the Hebrew sentence-drag questions but are not covered by
// the transliterated vocabulary bank.
const HEBREW_SENTENCE_NIKKUD_OVERRIDES = {
  "את": "אֶת",
  "אוכלים": "אוֹכְלִים",
  "אוטובוס": "אוֹטוֹבּוּס",
  "אוהב": "אוֹהֵב",
  "אופה": "אוֹפָה",
  "אופים": "אוֹפִים",
  "אורזת": "אוֹרֶזֶת",
  "אותה": "אוֹתָהּ",
  "אותם": "אוֹתָם",
  "אחר": "אַחֵר",
  "אחרי": "אַחֲרֵי",
  "ארוחת": "אֲרוּחַת",
  "בבוקר": "בַּבֹּקֶר",
  "בגינה": "בַּגִּינָה",
  "בודקת": "בּוֹדֶקֶת",
  "בוחרת": "בּוֹחֶרֶת",
  "בונה": "בּוֹנָה",
  "בונים": "בּוֹנִים",
  "בועט": "בּוֹעֵט",
  "בזהירות": "בִּזְהִירוּת",
  "באוטובוס": "בָּאוֹטוֹבּוּס",
  "בחצר": "בֶּחָצֵר",
  "בכיתה": "בַּכִּיתָה",
  "במטבח": "בַּמִּטְבָּח",
  "במפה": "בְּמַפָּה",
  "במשפט": "בַּמִּשְׁפָּט",
  "בננות": "בָּנָנוֹת",
  "בספריה": "בַּסִּפְרִיָּה",
  "בפארק": "בַּפַּארְק",
  "בקצה": "בַּקָּצֶה",
  "בשקט": "בְּשֶׁקֶט",
  "בתוך": "בְּתוֹךְ",
  "גררו": "גִּרְרוּ",
  "האוכל": "הָאֹכֶל",
  "הארוחה": "הָאֲרוּחָה",
  "הדפים": "הַדַּפִּים",
  "הדרך": "הַדֶּרֶךְ",
  "ההוראות": "הַהוֹרָאוֹת",
  "ההפסקה": "הַהַפְסָקָה",
  "ההצגה": "הַהַצָּגָה",
  "הווילון": "הַוִּילוֹן",
  "הולכים": "הוֹלְכִים",
  "הולכת": "הוֹלֶכֶת",
  "הולכות": "הוֹלְכוֹת",
  "החברות": "הַחֲבֵרוֹת",
  "החברים": "הַחֲבֵרִים",
  "החדש": "הֶחָדָשׁ",
  "החוקר": "הַחוֹקֵר",
  "החלון": "הַחַלּוֹן",
  "החתול": "הֶחָתוּל",
  "הטיול": "הַטִּיּוּל",
  "הילד": "הַיֶּלֶד",
  "הילדה": "הַיַּלְדָה",
  "הילדים": "הַיְלָדִים",
  "הכדור": "הַכַּדּוּר",
  "הכוס": "הַכּוֹס",
  "הכיסא": "הַכִּסֵּא",
  "הכיסאות": "הַכִּסְאוֹת",
  "הכלב": "הַכֶּלֶב",
  "הלוח": "הַלּוּחַ",
  "הלימודים": "הַלִּמּוּדִים",
  "הלך": "הָלַךְ",
  "המדף": "הַמַּדָּף",
  "המורה": "הַמּוֹרָה",
  "המילים": "הַמִּלִּים",
  "המטבח": "הַמִּטְבָּח",
  "המים": "הַמַּיִם",
  "המסקנה": "הַמַּסְקָנָה",
  "המפה": "הַמַּפָּה",
  "המשפחה": "הַמִּשְׁפָּחָה",
  "המשפט": "הַמִּשְׁפָּט",
  "הנהר": "הַנָּהָר",
  "הנכון": "הַנָּכוֹן",
  "הנכונה": "הַנְּכוֹנָה",
  "הספה": "הַסַּפָּה",
  "הספר": "הַסֵּפֶר",
  "הספרים": "הַסְּפָרִים",
  "הקבוצה": "הַקְּבוּצָה",
  "הקשיבה": "הִקְשִׁיבָה",
  "הרצפה": "הָרִצְפָּה",
  "השולחן": "הַשֻּׁלְחָן",
  "השינה": "הַשֵּׁנָה",
  "השיעור": "הַשִּׁעוּר",
  "השלטים": "הַשְּׁלָטִים",
  "השלימו": "הַשְׁלִימוּ",
  "התוצאות": "הַתּוֹצָאוֹת",
  "התיק": "הַתִּיק",
  "התיקים": "הַתִּיקִים",
  "התלמידים": "הַתַּלְמִידִים",
  "ו": "וְ",
  "ואז": "וְאָז",
  "ובננות": "וּבָנָנוֹת",
  "וגדעון": "וְגִדְעוֹן",
  "ובוחרת": "וּבוֹחֶרֶת",
  "וכתבה": "וְכָתְבָה",
  "וכותב": "וְכוֹתֵב",
  "ויושבים": "וְיוֹשְׁבִים",
  "ולשים": "וְלָשִׂים",
  "ומביאה": "וּמְבִיאָה",
  "ומסבירה": "וּמַסְבִּירָה",
  "ומוצאים": "וּמוֹצְאִים",
  "ומטאטאים": "וּמְטַאֲטְאִים",
  "ומניחה": "וּמַנִּיחָה",
  "ומסדרים": "וּמְסַדְּרִים",
  "זורק": "זוֹרֵק",
  "זורקים": "זוֹרְקִים",
  "זורקת": "זוֹרֶקֶת",
  "חוזרים": "חוֹזְרִים",
  "חוזר": "חוֹזֵר",
  "חוזרת": "חוֹזֶרֶת",
  "חוזרות": "חוֹזְרוֹת",
  "חילקה": "חִלְּקָה",
  "טובה": "טוֹבָה",
  "טובים": "טוֹבִים",
  "טסות": "טָסוֹת",
  "טסים": "טָסִים",
  "זה": "זֶה",
  "ידיים": "יָדַיִם",
  "יוצא": "יוֹצֵא",
  "יושב": "יוֹשֵׁב",
  "יושבים": "יוֹשְׁבִים",
  "יחד": "יַחַד",
  "ישב": "יָשַׁב",
  "ישנים": "יְשֵׁנִים",
  "כבדים": "כְּבֵדִים",
  "כדאי": "כְּדַאי",
  "כדי": "כְּדֵי",
  "גדולה": "גְּדוֹלָה",
  "גדולים": "גְּדוֹלִים",
  "גדולות": "גְּדוֹלוֹת",
  "כותב": "כּוֹתֵב",
  "כותבת": "כּוֹתֶבֶת",
  "כי": "כִּי",
  "כתבה": "כָּתְבָה",
  "לאכול": "לֶאֱכֹל",
  "לאחיה": "לְאַחֶיהָ",
  "לבית": "לְבֵית",
  "הביתה": "הַבַּיְתָה",
  "להרים": "לְהָרִים",
  "לוקחת": "לוֹקַחַת",
  "לטיול": "לְטִיּוּל",
  "ליד": "לְיַד",
  "לכיתה": "לַכִּיתָה",
  "למקום": "לַמָּקוֹם",
  "למצוא": "לִמְצֹא",
  "לפארק": "לַפַּארְק",
  "לצייר": "לְצַיֵּר",
  "לקפוץ": "לִקְפֹּץ",
  "לרוץ": "לָרוּץ",
  "לשיעור": "לַשִּׁעוּר",
  "לשיר": "לָשִׁיר",
  "מביאה": "מְבִיאָה",
  "מבשלים": "מְבַשְּׁלִים",
  "מגלים": "מְגַלִּים",
  "מדברים": "מְדַבְּרִים",
  "מודד": "מוֹדֵד",
  "מול": "מוּל",
  "מוצאים": "מוֹצְאִים",
  "מוצאת": "מוֹצֵאת",
  "מטאטאים": "מְטַאֲטְאִים",
  "מטפס": "מְטַפֵּס",
  "מטפסת": "מְטַפֶּסֶת",
  "מכבסים": "מְכַבְּסִים",
  "מכין": "מֵכִין",
  "מכינה": "מְכִינָה",
  "מכינים": "מְכִינִים",
  "מניחה": "מַנִּיחָה",
  "מנפחת": "מְנַפַּחַת",
  "מנקה": "מְנַקָּה",
  "מנקים": "מְנַקִּים",
  "מסדרים": "מְסַדְּרִים",
  "מספרת": "מְסַפֶּרֶת",
  "מסתירה": "מַסְתִּירָה",
  "מעלים": "מַעֲלִים",
  "מצחצחים": "מְצַחְצְחִים",
  "מצייר": "מְצַיֵּר",
  "מציירות": "מְצַיְּרוֹת",
  "מציירים": "מְצַיְּרִים",
  "מציירת": "מְצַיֶּרֶת",
  "מקשיבים": "מַקְשִׁיבִים",
  "מרימה": "מְרִימָה",
  "מרימות": "מְרִימוֹת",
  "מרימים": "מְרִימִים",
  "משאירה": "מַשְׁאִירָה",
  "משחקים": "מְשַׂחֲקִים",
  "משתמשים": "מִשְׁתַּמְּשִׁים",
  "מתחת": "מִתַּחַת",
  "נוגה": "נוֹגָהּ",
  "נוסעים": "נוֹסְעִים",
  "נועה": "נוֹעָה",
  "נכנסים": "נִכְנָסִים",
  "נמצא": "נִמְצָא",
  "סוגר": "סוֹגֵר",
  "סוגרת": "סוֹגֶרֶת",
  "עובדים": "עוֹבְדִים",
  "עושים": "עוֹשִׂים",
  "עם": "עִם",
  "פותח": "פּוֹתֵחַ",
  "פותחת": "פּוֹתַחַת",
  "פתרון": "פִּתְרוֹן",
  "צובעים": "צוֹבְעִים",
  "צלחת": "צַלַּחַת",
  "ציירה": "צִיְּרָה",
  "קוטפת": "קוֹטֶפֶת",
  "קונה": "קוֹנָה",
  "קופץ": "קוֹפֵץ",
  "קופצים": "קוֹפְצִים",
  "קופצת": "קוֹפֶצֶת",
  "קורא": "קוֹרֵא",
  "קוראים": "קוֹרְאִים",
  "קוראת": "קוֹרֵאת",
  "קוראות": "קוֹרְאוֹת",
  "קרה": "קָרָה",
  "קפץ": "קָפַץ",
  "קראה": "קָרְאָה",
  "קרים": "קָרִים",
  "רוקדים": "רוֹקְדִים",
  "רושם": "רוֹשֵׁם",
  "רעיונות": "רַעְיוֹנוֹת",
  "רעש": "רַעַשׁ",
  "רץ": "רָץ",
  "רצים": "רָצִים",
  "שהמשימה": "שֶׁהַמְּשִׂימָה",
  "שהתברר": "שֶׁהִתְבָּרֵר",
  "שובר": "שׁוֹבֵר",
  "שוברות": "שׁוֹבְרוֹת",
  "שוברים": "שׁוֹבְרִים",
  "שוברת": "שׁוֹבֶרֶת",
  "שוחה": "שָׂחָה",
  "שוחים": "שָׂחִים",
  "שוטף": "שׁוֹטֵף",
  "שוטפים": "שׁוֹטְפִים",
  "שומע": "שׁוֹמֵעַ",
  "שומעת": "שׁוֹמַעַת",
  "שרות": "שָׁרוֹת",
  "שורק": "שׁוֹרֵק",
  "שותה": "שׁוֹתָה",
  "שלו": "שֶׁלּוֹ",
  "שלנו": "שֶׁלָּנוּ",
  "שמעה": "שָׁמְעָה",
  "שמח": "שָׂמֵחַ",
  "שמחה": "שְׂמֵחָה",
  "שמחים": "שְׂמֵחִים",
  "שמחות": "שְׂמֵחוֹת",
  "שקטה": "שְׁקֵטָה",
  "שרים": "שָׁרִים",
  "תולים": "תּוֹלִים",
  "תפוחים": "תַּפּוּחִים",
};

const HEBREW_WRITING_LETTERS = [
  "א",
  "ב",
  "ג",
  "ד",
  "ה",
  "ו",
  "ז",
  "ח",
  "ט",
  "י",
  "כ",
  "ל",
  "מ",
  "נ",
  "ס",
  "ע",
  "פ",
  "צ",
  "ק",
  "ר",
  "ש",
  "ת",
];

const HEBREW_WRITING_WORD_FALLBACKS = [
  "אמא",
  "אבא",
  "בית",
  "מים",
  "שלום",
  "חתול",
  "כלב",
  "ספר",
  "חבר",
  "ילדה",
  "ילד",
  "כדור",
  "חלון",
  "דלת",
  "שולחן",
  "משפחה",
];

const HEBREW_WRITING_SHORT_SENTENCES = [
  "אני אוהב לקרוא ספר.",
  "הילדה שותה מים.",
  "אמא מכינה ארוחת ערב.",
  "הילדים משחקים בחצר.",
  "המורה כותבת על הלוח.",
  "הכלב ישן ליד הדלת.",
  "אנחנו הולכים לבית הספר.",
  "החתול קופץ על הכיסא.",
];

const HEBREW_WRITING_LONG_SENTENCES = [
  "בתחילת השיעור הילדים מסדרים את המחברות על השולחן.",
  "לפני הארוחה אנחנו שוטפים ידיים ומכינים את הצלחות.",
  "התלמידים מקשיבים להוראות ואז מתחילים לפתור את המשימה.",
  "גבריאל בודק את המפה כדי למצוא את הדרך הקצרה לפארק.",
  "המשפחה נסעה לטיול קצר וראתה ציפורים ליד הנהר.",
  "נוגה קוראת סיפור מעניין ומסבירה לאחיה מה קרה.",
  "החברים אוספים מידע חדש וכותבים יחד מסקנה ברורה.",
  "המורה ביקשה מהתלמידים לענות במשפט מלא ומדויק.",
];

const HEBREW_AGREEMENT_BLUEPRINTS = [
  {
    difficulty: 1,
    displayText: "הילד קטן. ___ שמח.",
    options: ["הוא", "היא", "הם", "הן"],
    answer: "הוא",
    reviewText: "הילד קטן. הוא שמח.",
  },
  {
    difficulty: 1,
    displayText: "הילדה קוראת. ___ שקטה.",
    options: ["הוא", "היא", "הם", "הן"],
    answer: "היא",
    reviewText: "הילדה קוראת. היא שקטה.",
  },
  {
    difficulty: 1,
    displayText: "הילד ___.",
    options: ["גדול", "גדולה", "גדולים", "גדולות"],
    answer: "גדול",
    reviewText: "הילד גדול.",
  },
  {
    difficulty: 1,
    displayText: "הילדה ___.",
    options: ["גדול", "גדולה", "גדולים", "גדולות"],
    answer: "גדולה",
    reviewText: "הילדה גדולה.",
  },
  {
    difficulty: 2,
    displayText: "אבא ___ לבית.",
    options: ["הולך", "הולכת", "הולכים", "הולכות"],
    answer: "הולך",
    reviewText: "אבא הולך לבית.",
  },
  {
    difficulty: 2,
    displayText: "אמא ___ ספר.",
    options: ["קורא", "קוראת", "קוראים", "קוראות"],
    answer: "קוראת",
    reviewText: "אמא קוראת ספר.",
  },
  {
    difficulty: 2,
    displayText: "הילדים ___.",
    options: ["גדול", "גדולה", "גדולים", "גדולות"],
    answer: "גדולים",
    reviewText: "הילדים גדולים.",
  },
  {
    difficulty: 2,
    displayText: "הילדות ___.",
    options: ["גדול", "גדולה", "גדולים", "גדולות"],
    answer: "גדולות",
    reviewText: "הילדות גדולות.",
  },
  {
    difficulty: 3,
    displayText: "הילדים ___ לבית הספר.",
    options: ["הולך", "הולכת", "הולכים", "הולכות"],
    answer: "הולכים",
    reviewText: "הילדים הולכים לבית הספר.",
  },
  {
    difficulty: 3,
    displayText: "הילדות ___ לבית.",
    options: ["הולך", "הולכת", "הולכים", "הולכות"],
    answer: "הולכות",
    reviewText: "הילדות הולכות לבית.",
  },
  {
    difficulty: 3,
    displayText: "הבנים ___ ספר.",
    options: ["קורא", "קוראת", "קוראים", "קוראות"],
    answer: "קוראים",
    reviewText: "הבנים קוראים ספר.",
  },
  {
    difficulty: 3,
    displayText: "הבנות ___ ספר.",
    options: ["קורא", "קוראת", "קוראים", "קוראות"],
    answer: "קוראות",
    reviewText: "הבנות קוראות ספר.",
  },
  {
    difficulty: 4,
    displayText: "דני ויוסי ___ לשיעור.",
    options: ["חוזר", "חוזרת", "חוזרים", "חוזרות"],
    answer: "חוזרים",
    reviewText: "דני ויוסי חוזרים לשיעור.",
  },
  {
    difficulty: 4,
    displayText: "נועה ויעל ___ הביתה.",
    options: ["חוזר", "חוזרת", "חוזרים", "חוזרות"],
    answer: "חוזרות",
    reviewText: "נועה ויעל חוזרות הביתה.",
  },
  {
    difficulty: 5,
    displayText: "הילדים משחקים. ___ שמחים.",
    options: ["הוא", "היא", "הם", "הן"],
    answer: "הם",
    reviewText: "הילדים משחקים. הם שמחים.",
  },
  {
    difficulty: 5,
    displayText: "הילדות שרות. ___ שמחות.",
    options: ["הוא", "היא", "הם", "הן"],
    answer: "הן",
    reviewText: "הילדות שרות. הן שמחות.",
  },
];

const HEBREW_CATEGORY_SORT_GROUPS = [
  { label: "אוכל", words: ["תפוח", "לחם", "בננה", "חלב", "עוגה", "גבינה", "אורז", "עגבניה", "לימון", "תה"] },
  { label: "חיות", words: ["כלב", "חתול", "ציפור", "דג", "נמלה", "עכביש", "יתוש"] },
  { label: "בית ספר", words: ["ספר", "מחברת", "עט", "עפרון", "כיסא", "כיתה", "מורה", "שולחן"] },
  { label: "צבעים", words: ["כחול", "אדום", "צהוב", "כתום", "שחור", "לבן"] },
  { label: "מטבח", words: ["כף", "צלחת", "כוס", "מקרר", "תנור", "קערה", "סכין"] },
];

const HEBREW_CATEGORY_SORT_LEVEL_CONFIG = {
  1: { labels: ["אוכל", "חיות"], itemsPerBucket: 2 },
  2: { labels: ["אוכל", "חיות", "בית ספר"], itemsPerBucket: 2 },
  3: { labels: ["אוכל", "חיות", "צבעים"], itemsPerBucket: 2 },
  4: { labels: ["אוכל", "חיות", "בית ספר", "מטבח"], itemsPerBucket: 2 },
  5: { labels: ["אוכל", "חיות", "בית ספר", "צבעים", "מטבח"], itemsPerBucket: 2 },
};

const HEBREW_FINAL_LETTER_DRILLS = [
  { difficulty: 1, middleLetter: "כ", finalLetter: "ך", middleWord: "מכונית", finalWord: "נמוך" },
  { difficulty: 1, middleLetter: "מ", finalLetter: "ם", middleWord: "ימינה", finalWord: "לחם" },
  { difficulty: 1, middleLetter: "נ", finalLetter: "ן", middleWord: "בננה", finalWord: "קטן" },
  { difficulty: 1, middleLetter: "פ", finalLetter: "ף", middleWord: "ציפור", finalWord: "חוף" },
  { difficulty: 1, middleLetter: "צ", finalLetter: "ץ", middleWord: "ביצה", finalWord: "עץ" },
  { difficulty: 2, middleLetter: "כ", finalLetter: "ך", middleWord: "מכתב", finalWord: "מלך" },
  { difficulty: 2, middleLetter: "מ", finalLetter: "ם", middleWord: "למעלה", finalWord: "אדום" },
  { difficulty: 2, middleLetter: "נ", finalLetter: "ן", middleWord: "גבינה", finalWord: "שעון" },
  { difficulty: 2, middleLetter: "פ", finalLetter: "ף", middleWord: "מלפפון", finalWord: "כסף" },
  { difficulty: 2, middleLetter: "צ", finalLetter: "ץ", middleWord: "חצי", finalWord: "מיץ" },
  { difficulty: 3, middleLetter: "כ", finalLetter: "ך", middleWord: "ברכה", finalWord: "דרך" },
  { difficulty: 3, middleLetter: "מ", finalLetter: "ם", middleWord: "שמאלה", finalWord: "חם" },
  { difficulty: 3, middleLetter: "נ", finalLetter: "ן", middleWord: "ענבים", finalWord: "לבן" },
  { difficulty: 3, middleLetter: "פ", finalLetter: "ף", middleWord: "מאפייה", finalWord: "אף" },
  { difficulty: 3, middleLetter: "צ", finalLetter: "ץ", middleWord: "קבוצה", finalWord: "קיץ" },
];

const HEBREW_READING_BLUEPRINTS = [
  {
    difficulty: 1,
    lines: ["דנה אוכלת תפוח."],
    question: "מה דנה אוכלת?",
    options: ["תפוח", "ספר", "כדור", "מים"],
    answer: "תפוח",
    images: [{ asset: "apple.svg", alt: "תפוח" }],
  },
  {
    difficulty: 1,
    lines: ["הכלב רץ."],
    question: "מי רץ?",
    options: ["הכלב", "החתול", "הילד", "הספר"],
    answer: "הכלב",
    images: [{ asset: "dog.svg", alt: "כלב" }],
  },
  {
    difficulty: 2,
    lines: ["נועם שותה חלב.", "הכוס על השולחן."],
    question: "מה נועם שותה?",
    options: ["חלב", "מיץ", "מים", "תה"],
    answer: "חלב",
    images: [{ asset: "milk.svg", alt: "חלב" }],
  },
  {
    difficulty: 2,
    lines: ["מיה קוראת ספר.", "הספר חדש."],
    question: "מה מיה קוראת?",
    options: ["ספר", "עוגה", "כדור", "מיטה"],
    answer: "ספר",
    images: [{ asset: "book.svg", alt: "ספר" }],
  },
  {
    difficulty: 3,
    lines: ["אורי משחק בכדור.", "הכדור אדום."],
    question: "במה אורי משחק?",
    options: ["כדור", "ספר", "כיסא", "לחם"],
    answer: "כדור",
    images: [{ asset: "ball.svg", alt: "כדור" }],
  },
  {
    difficulty: 3,
    lines: ["יעל רואה חתול.", "החתול יושב על כיסא."],
    question: "איפה החתול יושב?",
    options: ["על כיסא", "במיטה", "במכונית", "על ספר"],
    answer: "על כיסא",
    images: [
      { asset: "cat.svg", alt: "חתול" },
      { asset: "chair.svg", alt: "כיסא" },
    ],
  },
  {
    difficulty: 4,
    lines: ["אמא מכינה עוגה.", "דנה מביאה צלחת.", "כולם יושבים במטבח."],
    question: "איפה כולם יושבים?",
    options: ["במטבח", "בחצר", "בכיתה", "באוטובוס"],
    answer: "במטבח",
    images: [{ asset: "cake.svg", alt: "עוגה" }],
  },
  {
    difficulty: 4,
    lines: ["יונתן לוקח ספר.", "הוא הולך לכיסא.", "אחר כך הוא קורא בשקט."],
    question: "מה יונתן לוקח?",
    options: ["ספר", "תפוח", "כדור", "דלת"],
    answer: "ספר",
    images: [
      { asset: "book.svg", alt: "ספר" },
      { asset: "chair.svg", alt: "כיסא" },
    ],
  },
  {
    difficulty: 5,
    lines: [
      "תמר יוצאת לבית הספר עם תיק וספר.",
      "בדרך היא רואה אוטובוס גדול.",
      "בכיתה היא מוציאה מחברת ועפרון.",
    ],
    question: "מה תמר מוציאה בכיתה?",
    options: ["מחברת ועפרון", "חלב ולחם", "כדור וכיסא", "עוגה ומיץ"],
    answer: "מחברת ועפרון",
    images: [
      { asset: "bag.svg", alt: "תיק" },
      { asset: "book.svg", alt: "ספר" },
      { asset: "notebook.svg", alt: "מחברת" },
    ],
  },
  {
    difficulty: 5,
    lines: [
      "אדם ואחותו הולכים למטבח אחרי המשחק.",
      "הם שותים מים ואוכלים תפוח.",
      "אחר כך הם חוזרים לחדר עם הספר החדש.",
    ],
    question: "מה הם עושים במטבח?",
    options: ["שותים מים ואוכלים תפוח", "נוסעים באוטובוס", "כותבים במחברת", "ישנים במיטה"],
    answer: "שותים מים ואוכלים תפוח",
    images: [
      { asset: "apple.svg", alt: "תפוח" },
      { asset: "book.svg", alt: "ספר" },
    ],
  },
];

const SCIENCE_EXCLUDED_PATTERNS = [
  /north celestial pole/i,
  /Sputnik/i,
  /Rhinoplasty/i,
  /LASER/i,
  /thermodynamics/i,
  /belly button/i,
  /Apollo mission/i,
  /Curium/i,
  /Gregory Mendel/i,
  /synthesis of DNA/i,
  /bacterial pathogen/i,
];

const state = {
  currentUserId: USER_PROFILES[0].id,
  totalQuestions: 0,
  difficulty: 3,
  hebrewOnly: false,
  currentIndex: 0,
  viewIndex: 0,
  answeredCount: 0,
  correctCount: 0,
  answerResults: [],
  answerSelections: [],
  questions: [],
  sessionRecords: [],
  sessionStartedAt: null,
  feedbackMessage: "",
  feedbackTone: "",
  dragState: null,
};

const confettiRuntime = {
  cleanupTimerId: null,
  frameId: null,
  layer: null,
  lastFrameTime: 0,
  moveHandler: null,
  pieces: [],
  pointer: null,
  startTime: 0,
};

const elements = {
  startScreen: document.getElementById("start-screen"),
  quizScreen: document.getElementById("quiz-screen"),
  resultsScreen: document.getElementById("results-screen"),
  historyScreen: document.getElementById("history-screen"),
  startForm: document.getElementById("start-form"),
  userSelector: document.getElementById("user-selector"),
  startFeedback: document.getElementById("start-feedback"),
  historyButton: document.getElementById("history-button"),
  historyBackButton: document.getElementById("history-back-button"),
  historyList: document.getElementById("history-list"),
  historyEmpty: document.getElementById("history-empty"),
  questionCount: document.getElementById("question-count"),
  questionCountButtons: Array.from(document.querySelectorAll(".question-count-button")),
  hebrewOnly: document.getElementById("hebrew-only"),
  hebrewOnlyButton: document.getElementById("hebrew-only-button"),
  difficultyLevel: document.getElementById("difficulty-level"),
  difficultyButtons: Array.from(document.querySelectorAll(".difficulty-button")),
  progressTracker: document.getElementById("progress-tracker"),
  scoreText: document.getElementById("score-text"),
  feedback: document.getElementById("feedback"),
  questionNumber: document.getElementById("question-number"),
  questionPrompt: document.getElementById("question-prompt"),
  questionMain: document.getElementById("question-main"),
  questionVisual: document.getElementById("question-visual"),
  questionExtra: document.getElementById("question-extra"),
  answerForm: document.getElementById("answer-form"),
  inputArea: document.getElementById("input-area"),
  answerInput: document.getElementById("answer-input"),
  choicesArea: document.getElementById("choices-area"),
  dragArea: document.getElementById("drag-area"),
  quizBackButton: document.getElementById("quiz-back-button"),
  quizForwardButton: document.getElementById("quiz-forward-button"),
  resultsTitle: document.getElementById("results-title"),
  resultsSummary: document.getElementById("results-summary"),
  resultsCategorySummary: document.getElementById("results-category-summary"),
  resultsReviewList: document.getElementById("results-review-list"),
  resultsBackButton: document.getElementById("results-back-button"),
  resultsForwardButton: document.getElementById("results-forward-button"),
  restartButton: document.getElementById("restart-button"),
};

const rawHebrewWordEntries = typeof HEBREW_WORDS !== "undefined" ? HEBREW_WORDS : [];
const hebrewQuestionBank = buildHebrewQuestionBank(rawHebrewWordEntries);
const hebrewReverseQuestionBank = buildHebrewReverseQuestionBank(rawHebrewWordEntries);
const hebrewHomographQuestionBank = buildHebrewHomographQuestionBank(rawHebrewWordEntries);
const hebrewImageQuestionBank = buildHebrewImageQuestionBank(
  typeof HEBREW_IMAGE_WORD_BANK !== "undefined" ? HEBREW_IMAGE_WORD_BANK : [],
  hebrewQuestionBank
);
const hebrewMeanings = hebrewQuestionBank.map((entry) => entry.english);
const HEBREW_POINTED_WORD_LOOKUP = new Map(
  hebrewQuestionBank.map((entry) => [entry.hebrew, entry.hebrewDisplay])
);
const scienceQuestionBank = buildScienceQuestionBank(
  typeof SCIENCE_QUESTIONS !== "undefined" ? SCIENCE_QUESTIONS : []
);
const staticChoiceBankSources = [
  {
    category: "general-knowledge",
    entries: typeof GENERAL_KNOWLEDGE_QUESTIONS !== "undefined" ? GENERAL_KNOWLEDGE_QUESTIONS : [],
  },
  {
    category: "algebra",
    entries: typeof ALGEBRA_QUESTIONS !== "undefined" ? ALGEBRA_QUESTIONS : [],
  },
  {
    category: "applied-word-problems",
    entries:
      typeof APPLIED_WORD_PROBLEMS_QUESTIONS !== "undefined" ? APPLIED_WORD_PROBLEMS_QUESTIONS : [],
  },
  {
    category: "reading-comprehension",
    entries:
      typeof READING_COMPREHENSION_QUESTIONS !== "undefined" ? READING_COMPREHENSION_QUESTIONS : [],
  },
  {
    category: "science-evidence",
    entries:
      typeof SCIENCE_EVIDENCE_QUESTIONS !== "undefined" ? SCIENCE_EVIDENCE_QUESTIONS : [],
  },
  {
    category: "visual-math",
    entries: typeof VISUAL_MATH_QUESTIONS !== "undefined" ? VISUAL_MATH_QUESTIONS : [],
  },
  {
    category: "visual-measurement",
    entries: typeof VISUAL_MEASUREMENT_QUESTIONS !== "undefined" ? VISUAL_MEASUREMENT_QUESTIONS : [],
  },
  {
    category: "vocabulary-grammar",
    entries:
      typeof VOCABULARY_GRAMMAR_QUESTIONS !== "undefined" ? VOCABULARY_GRAMMAR_QUESTIONS : [],
  },
  { category: "logic", entries: typeof LOGIC_QUESTIONS !== "undefined" ? LOGIC_QUESTIONS : [] },
  {
    category: "rationality",
    entries: typeof RATIONALITY_QUESTIONS !== "undefined" ? RATIONALITY_QUESTIONS : [],
  },
  {
    category: "geography",
    entries: typeof GEOGRAPHY_QUESTIONS !== "undefined" ? GEOGRAPHY_QUESTIONS : [],
  },
  {
    category: "population",
    entries: typeof POPULATION_QUESTIONS !== "undefined" ? POPULATION_QUESTIONS : [],
  },
  {
    category: "financial-literacy",
    entries:
      typeof FINANCIAL_LITERACY_QUESTIONS !== "undefined" ? FINANCIAL_LITERACY_QUESTIONS : [],
  },
  {
    category: "measurement",
    entries: typeof MEASUREMENT_QUESTIONS !== "undefined" ? MEASUREMENT_QUESTIONS : [],
  },
  {
    category: "charts-and-graphs",
    entries:
      typeof CHARTS_AND_GRAPHS_QUESTIONS !== "undefined" ? CHARTS_AND_GRAPHS_QUESTIONS : [],
  },
  { category: "calendar", entries: typeof CALENDAR_QUESTIONS !== "undefined" ? CALENDAR_QUESTIONS : [] },
  {
    category: "estimation",
    entries: typeof ESTIMATION_QUESTIONS !== "undefined" ? ESTIMATION_QUESTIONS : [],
  },
  {
    category: "probability",
    entries: typeof PROBABILITY_QUESTIONS !== "undefined" ? PROBABILITY_QUESTIONS : [],
  },
  {
    category: "maps-and-directions",
    entries:
      typeof MAPS_AND_DIRECTIONS_QUESTIONS !== "undefined" ? MAPS_AND_DIRECTIONS_QUESTIONS : [],
  },
  {
    category: "digital-safety",
    entries: typeof DIGITAL_SAFETY_QUESTIONS !== "undefined" ? DIGITAL_SAFETY_QUESTIONS : [],
  },
  {
    category: "health-and-first-aid",
    entries:
      typeof HEALTH_AND_FIRST_AID_QUESTIONS !== "undefined"
        ? HEALTH_AND_FIRST_AID_QUESTIONS
        : [],
  },
  {
    category: "nutrition",
    entries: typeof NUTRITION_QUESTIONS !== "undefined" ? NUTRITION_QUESTIONS : [],
  },
  {
    category: "household-problem-solving",
    entries:
      typeof HOUSEHOLD_PROBLEM_SOLVING_QUESTIONS !== "undefined"
        ? HOUSEHOLD_PROBLEM_SOLVING_QUESTIONS
        : [],
  },
  {
    category: "fractions",
    entries: typeof FRACTIONS_QUESTIONS !== "undefined" ? FRACTIONS_QUESTIONS : [],
  },
  {
    category: "fractions-and-ratios",
    entries:
      typeof FRACTIONS_AND_RATIOS_QUESTIONS !== "undefined" ? FRACTIONS_AND_RATIOS_QUESTIONS : [],
  },
  {
    category: "spatial-reasoning",
    entries: typeof SPATIAL_REASONING_QUESTIONS !== "undefined" ? SPATIAL_REASONING_QUESTIONS : [],
  },
];
const staticChoiceBanks = Object.fromEntries(
  staticChoiceBankSources.map(({ category, entries }) => [
    category,
    buildStaticChoiceBank(entries, category),
  ])
);
const sentenceDragEnglishEntries =
  typeof SENTENCE_DRAG_ENGLISH_QUESTIONS !== "undefined"
    ? SENTENCE_DRAG_ENGLISH_QUESTIONS
    : typeof SENTENCE_DRAG_QUESTIONS !== "undefined"
      ? SENTENCE_DRAG_QUESTIONS.filter((entry) => !entry?.isHebrew)
      : [];
const sentenceDragHebrewEntries =
  typeof SENTENCE_DRAG_HEBREW_QUESTIONS !== "undefined"
    ? SENTENCE_DRAG_HEBREW_QUESTIONS
    : typeof SENTENCE_DRAG_QUESTIONS !== "undefined"
      ? SENTENCE_DRAG_QUESTIONS.filter((entry) => entry?.isHebrew)
      : [];
const sentenceDragEnglishQuestionBank = buildStaticDragQuestionBank(
  sentenceDragEnglishEntries,
  "vocabulary-grammar-drag"
);
const sentenceDragHebrewQuestionBank = buildStaticDragQuestionBank(
  sentenceDragHebrewEntries,
  "hebrew-drag"
);
const choiceCategoryConfigs = {
  hebrew: {
    bank: hebrewQuestionBank,
    createQuestion: createHebrewChoiceQuestion,
  },
  science: {
    bank: scienceQuestionBank,
    createQuestion: (entry) => createBankChoiceQuestion(entry, "science-choice"),
  },
  ...Object.fromEntries(
    staticChoiceBankSources.map(({ category }) => [
      category,
      {
        bank: staticChoiceBanks[category],
        createQuestion: (entry) => createBankChoiceQuestion(entry, `${category}-choice`),
      },
    ])
  ),
};
const generatedChoiceCategoryConfigs = {
  algebra: {
    share: 0.85,
    factory: typeof createAlgebraGeneratedEntry === "function" ? createAlgebraGeneratedEntry : null,
  },
  "applied-word-problems": {
    share: 0.85,
    factory:
      typeof createAppliedWordProblemGeneratedEntry === "function"
        ? createAppliedWordProblemGeneratedEntry
        : null,
  },
  "reading-comprehension": {
    share: 0.85,
    factory:
      typeof createReadingComprehensionGeneratedEntry === "function"
        ? createReadingComprehensionGeneratedEntry
        : null,
  },
  "science-evidence": {
    share: 0.85,
    factory:
      typeof createScienceEvidenceGeneratedEntry === "function"
        ? createScienceEvidenceGeneratedEntry
        : null,
  },
  "visual-math": {
    share: 0.85,
    factory:
      typeof createVisualMathGeneratedEntry === "function" ? createVisualMathGeneratedEntry : null,
  },
  "visual-measurement": {
    share: 0.85,
    factory:
      typeof createVisualMeasurementGeneratedEntry === "function"
        ? createVisualMeasurementGeneratedEntry
        : null,
  },
  "vocabulary-grammar": {
    share: 0.85,
    factory:
      typeof createVocabularyGrammarGeneratedEntry === "function"
        ? createVocabularyGrammarGeneratedEntry
        : null,
  },
  "financial-literacy": {
    share: 0.85,
    factory:
      typeof createFinancialLiteracyGeneratedEntry === "function"
        ? createFinancialLiteracyGeneratedEntry
        : null,
  },
  geography: {
    share: 0.85,
    factory: typeof createGeographyGeneratedEntry === "function" ? createGeographyGeneratedEntry : null,
  },
  population: {
    share: 0.8,
    factory: typeof createPopulationGeneratedEntry === "function" ? createPopulationGeneratedEntry : null,
  },
  measurement: {
    share: 0.85,
    factory:
      typeof createMeasurementGeneratedEntry === "function" ? createMeasurementGeneratedEntry : null,
  },
  estimation: {
    share: 0.85,
    factory:
      typeof createEstimationGeneratedEntry === "function" ? createEstimationGeneratedEntry : null,
  },
  probability: {
    share: 0.85,
    factory:
      typeof createProbabilityGeneratedEntry === "function" ? createProbabilityGeneratedEntry : null,
  },
  logic: {
    share: 0.6,
    factory: typeof createLogicGeneratedEntry === "function" ? createLogicGeneratedEntry : null,
  },
  rationality: {
    share: 0.7,
    factory:
      typeof createRationalityGeneratedEntry === "function" ? createRationalityGeneratedEntry : null,
  },
  "general-knowledge": {
    share: 0.6,
    factory:
      typeof createGeneralKnowledgeGeneratedEntry === "function"
        ? createGeneralKnowledgeGeneratedEntry
        : null,
  },
  science: {
    share: 0.45,
    factory: typeof createScienceGeneratedEntry === "function" ? createScienceGeneratedEntry : null,
  },
  calendar: {
    share: 0.9,
    factory: typeof createCalendarGeneratedEntry === "function" ? createCalendarGeneratedEntry : null,
  },
  "fractions-and-ratios": {
    share: 0.85,
    factory:
      typeof createFractionsAndRatiosGeneratedEntry === "function"
        ? createFractionsAndRatiosGeneratedEntry
        : null,
  },
  "maps-and-directions": {
    share: 0.85,
    factory:
      typeof createMapsAndDirectionsGeneratedEntry === "function"
        ? createMapsAndDirectionsGeneratedEntry
        : null,
  },
  "digital-safety": {
    share: 0.6,
    factory:
      typeof createDigitalSafetyGeneratedEntry === "function"
        ? createDigitalSafetyGeneratedEntry
        : null,
  },
  "health-and-first-aid": {
    share: 0.4,
    factory:
      typeof createHealthAndFirstAidGeneratedEntry === "function"
        ? createHealthAndFirstAidGeneratedEntry
        : null,
  },
  nutrition: {
    share: 0.55,
    factory: typeof createNutritionGeneratedEntry === "function" ? createNutritionGeneratedEntry : null,
  },
  "household-problem-solving": {
    share: 0.6,
    factory:
      typeof createHouseholdProblemSolvingGeneratedEntry === "function"
        ? createHouseholdProblemSolvingGeneratedEntry
        : null,
  },
  fractions: {
    share: 0.8,
    factory: typeof createFractionsGeneratedEntry === "function" ? createFractionsGeneratedEntry : null,
  },
  "spatial-reasoning": {
    share: 0.85,
    factory:
      typeof createSpatialReasoningGeneratedEntry === "function"
        ? createSpatialReasoningGeneratedEntry
        : null,
  },
};

const mathInputGenerators = [
  createAdditionInputQuestion,
  createSubtractionInputQuestion,
  createMultiplicationInputQuestion,
  createDivisionInputQuestion,
  createMissingNumberInputQuestion,
  createDecimalOperationInputQuestion,
  createPlaceValueInputQuestion,
  createRectangleMeasureInputQuestion,
  createMoneyInputQuestion,
  createPercentageInputQuestion,
];

const mathChoiceGenerators = [
  createAdditionChoiceQuestion,
  createSubtractionChoiceQuestion,
  createMultiplicationChoiceQuestion,
  createDivisionChoiceQuestion,
  createMissingNumberChoiceQuestion,
  createSkipCountingChoiceQuestion,
  createNumberPatternChoiceQuestion,
  createComparisonChoiceQuestion,
  createDecimalComparisonChoiceQuestion,
  createDecimalOperationChoiceQuestion,
  createPlaceValueChoiceQuestion,
  createRoundingChoiceQuestion,
  createRectangleMeasureChoiceQuestion,
  createPrimeCompositeChoiceQuestion,
  createMoneyChoiceQuestion,
  createPercentageChoiceQuestion,
];

const statisticsGeneratorsByDifficulty = {
  1: [
    createStatisticsMiddleNumberQuestion,
    createStatisticsHighestNumberQuestion,
    createStatisticsLowestNumberQuestion,
  ],
  2: [
    createStatisticsMiddleNumberQuestion,
    createStatisticsHighestNumberQuestion,
    createStatisticsLowestNumberQuestion,
  ],
  3: [
    createStatisticsMiddleNumberQuestion,
    createStatisticsHighestNumberQuestion,
    createStatisticsLowestNumberQuestion,
    createStatisticsMeanQuestion,
    createStatisticsRangeQuestion,
    createStatisticsDataQuestion,
  ],
  4: [
    createStatisticsMeanQuestion,
    createStatisticsMedianQuestion,
    createStatisticsModeQuestion,
    createStatisticsRangeQuestion,
    createStatisticsDataQuestion,
  ],
  5: [
    createStatisticsMeanQuestion,
    createStatisticsMedianQuestion,
    createStatisticsModeQuestion,
    createStatisticsRangeQuestion,
    createStatisticsDataQuestion,
  ],
};

const PLACE_VALUE_NAMES = [
  "ones",
  "tens",
  "hundreds",
  "thousands",
  "ten-thousands",
  "hundred-thousands",
];

const PRIME_NUMBER_POOL = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47,
  53, 59, 61, 67, 71, 73, 79, 83, 89, 97,
];

elements.startForm.addEventListener("submit", startSession);
elements.answerForm.addEventListener("submit", submitTypedAnswer);
elements.restartButton.addEventListener("click", showStartScreen);
elements.historyButton.addEventListener("click", showHistoryScreen);
elements.historyBackButton.addEventListener("click", showStartScreen);
elements.quizBackButton.addEventListener("click", showPreviousQuizQuestion);
elements.quizForwardButton.addEventListener("click", showNextQuizQuestion);
elements.resultsBackButton.addEventListener("click", showPreviousQuizQuestion);
elements.resultsForwardButton.addEventListener("click", showNextQuizQuestion);

initializeUserSelector();
initializeQuestionCountButtons();
initializeHebrewOnlyButton();
initializeDifficultyButtons();

function buildHebrewQuestionBank(entries) {
  const groupedEntries = new Map();

  for (const entry of entries) {
    const key = String(entry.hebrew || "").trim();
    const difficulty = getEntryDifficulty(entry.difficulty);
    if (!key || difficulty === null) {
      continue;
    }

    if (!groupedEntries.has(key)) {
      groupedEntries.set(key, {
        hebrew: key,
        englishSet: new Set(),
        transliteration: entry.transliteration,
        difficulty,
      });
    }

    groupedEntries.get(key).englishSet.add(String(entry.english || "").trim());
  }

  const baseEntries = Array.from(groupedEntries.values()).map((entry) => ({
    hebrew: entry.hebrew,
    hebrewDisplay: buildHebrewDisplay(entry.hebrew, entry.transliteration),
    english: Array.from(entry.englishSet).join(" / "),
    transliteration: entry.transliteration || "",
    difficulty: entry.difficulty,
  }));

  return baseEntries;
}

function buildHebrewReverseQuestionBank(entries) {
  const groupedEntries = new Map();

  for (const entry of entries) {
    const english = String(entry?.english || "").trim();
    const hebrew = String(entry?.hebrew || "").trim();
    const difficulty = getEntryDifficulty(entry?.difficulty);
    if (!english || !hebrew || difficulty === null) {
      continue;
    }

    const englishKey = english.toLowerCase();
    if (!groupedEntries.has(englishKey)) {
      groupedEntries.set(englishKey, {
        english,
        forms: new Map(),
        difficulty,
      });
    }

    const group = groupedEntries.get(englishKey);
    if (!group.forms.has(hebrew)) {
      group.forms.set(hebrew, {
        hebrew,
        transliteration: String(entry?.transliteration || "").trim(),
        difficulty,
      });
    }
    group.difficulty = Math.min(group.difficulty, difficulty);
  }

  return Array.from(groupedEntries.values())
    .filter((group) => group.forms.size === 1)
    .map((group) => {
      const [onlyForm] = Array.from(group.forms.values());
      return {
        english: group.english,
        hebrew: onlyForm.hebrew,
        hebrewDisplay: buildHebrewDisplay(onlyForm.hebrew, onlyForm.transliteration),
        transliteration: onlyForm.transliteration,
        difficulty: group.difficulty,
      };
    })
    .filter((entry) => entry.hebrewDisplay);
}

function buildHebrewHomographQuestionBank(entries) {
  const groupedEntries = new Map();

  for (const entry of entries) {
    const english = String(entry?.english || "").trim();
    const hebrew = String(entry?.hebrew || "").trim();
    const difficulty = getEntryDifficulty(entry?.difficulty);
    if (!english || !hebrew || difficulty === null) {
      continue;
    }

    const strippedHebrew = stripHebrewDiacritics(hebrew).trim();
    if (!strippedHebrew) {
      continue;
    }

    if (!groupedEntries.has(strippedHebrew)) {
      groupedEntries.set(strippedHebrew, []);
    }

    groupedEntries.get(strippedHebrew).push({
      strippedHebrew,
      english,
      hebrew,
      hebrewDisplay: buildHebrewDisplay(hebrew, entry?.transliteration || ""),
      difficulty,
    });
  }

  return Array.from(groupedEntries.values()).flatMap((entriesForWord) => {
    const uniqueEntries = [];
    const seen = new Set();

    entriesForWord.forEach((entry) => {
      const identity = `${entry.hebrewDisplay}||${entry.english}`;
      if (seen.has(identity)) {
        return;
      }

      seen.add(identity);
      uniqueEntries.push(entry);
    });

    if (new Set(uniqueEntries.map((entry) => entry.hebrewDisplay)).size < 2) {
      return [];
    }

    const family = uniqueEntries.map((entry) => ({
      strippedHebrew: entry.strippedHebrew,
      english: entry.english,
      hebrewDisplay: entry.hebrewDisplay,
      difficulty: entry.difficulty,
    }));

    return uniqueEntries.map((entry) => ({
      strippedHebrew: entry.strippedHebrew,
      english: entry.english,
      hebrewDisplay: entry.hebrewDisplay,
      difficulty: entry.difficulty,
      family,
    }));
  });
}

function buildHebrewImageQuestionBank(entries, hebrewEntries) {
  const hebrewLookup = new Map(
    hebrewEntries.map((entry) => [buildHebrewImageWordKey(entry.hebrew, entry.english), entry])
  );

  return entries
    .map((entry) => {
      const hebrew = String(entry?.hebrew || "").trim();
      const english = String(entry?.english || "").trim();
      const asset = String(entry?.asset || "").trim();
      const imageAlt = String(entry?.alt || english).trim() || english;
      if (!hebrew || !english || !asset) {
        return null;
      }

      const match = hebrewLookup.get(buildHebrewImageWordKey(hebrew, english));
      if (!match) {
        return null;
      }

      return {
        ...match,
        imageSrc: `app/assets/hebrew-images/${asset}`,
        imageAlt,
      };
    })
    .filter(Boolean);
}

function buildHebrewImageWordKey(hebrew, english) {
  return `${stripHebrewDiacritics(hebrew).trim()}||${String(english || "").trim()}`;
}

function stripHebrewDiacritics(value) {
  return String(value || "").replace(/[\u0591-\u05C7]/g, "");
}

function buildHebrewDisplay(hebrew, transliteration) {
  const rawHebrew = String(hebrew || "").trim();
  if (!rawHebrew) {
    return "";
  }

  if (/[\u0591-\u05C7]/.test(rawHebrew)) {
    return rawHebrew;
  }

  if (HEBREW_NIKKUD_OVERRIDES[rawHebrew]) {
    return HEBREW_NIKKUD_OVERRIDES[rawHebrew];
  }

  const transliterationWords = String(transliteration || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const hebrewWords = rawHebrew.split(/\s+/).filter(Boolean);

  if (hebrewWords.length && hebrewWords.length === transliterationWords.length) {
    return hebrewWords
      .map((word, index) => buildHebrewWordWithNikkud(word, transliterationWords[index]))
      .join(" ");
  }

  return buildHebrewWordWithNikkud(rawHebrew, transliteration);
}

function buildHebrewWordWithNikkud(word, transliteration) {
  const rawWord = String(word || "").trim();
  if (!rawWord) {
    return "";
  }

  if (HEBREW_NIKKUD_OVERRIDES[rawWord]) {
    return HEBREW_NIKKUD_OVERRIDES[rawWord];
  }

  const letters = Array.from(rawWord);
  const tokens = tokenizeHebrewTransliterationWord(transliteration);
  if (!tokens.length) {
    return rawWord;
  }

  const pointedLetters = [];
  let tokenIndex = 0;

  for (let index = 0; index < letters.length; index += 1) {
    const letter = letters[index];
    if (!isHebrewLetter(letter)) {
      pointedLetters.push(letter);
      continue;
    }

    const nextLetter = letters[index + 1] || "";
    const currentToken = tokens[tokenIndex];
    let renderedLetter = letter;

    if (currentToken?.type === "c" && matchesHebrewConsonant(letter, currentToken.value)) {
      tokenIndex += 1;
    }

    const vowelToken = tokens[tokenIndex];
    const vowelInfo =
      vowelToken?.type === "v" ? describeHebrewVowel(vowelToken.value, nextLetter) : null;

    if (vowelInfo) {
      renderedLetter += vowelInfo.mark || "";
      pointedLetters.push(renderedLetter);

      if (vowelInfo.consumeNext === "yod" && nextLetter === "י") {
        pointedLetters.push("י");
        index += 1;
      } else if (vowelInfo.consumeNext === "vav" && nextLetter === "ו") {
        pointedLetters.push(vowelInfo.nextLetterText || "ו");
        index += 1;
      }

      tokenIndex += 1;
      continue;
    }

    if (tokens[tokenIndex]?.type === "c" && nextLetter && shouldAddHebrewSheva(letter, nextLetter)) {
      renderedLetter += "ְ";
    }

    pointedLetters.push(renderedLetter);
  }

  return pointedLetters.join("");
}

function tokenizeHebrewTransliterationWord(value) {
  const normalized = String(value || "")
    .split(",")[0]
    .toLowerCase()
    .replaceAll("’", "'")
    .replaceAll("‘", "'")
    .replaceAll("sch", "sh")
    .replaceAll("tsh", "ch")
    .replaceAll("-", " ")
    .replaceAll("'", "")
    .replace(/[^a-z\s]/g, " ")
    .trim();

  if (!normalized) {
    return [];
  }

  const tokens = [];
  const chunks = normalized.split(/\s+/).filter(Boolean);

  chunks.forEach((chunk) => {
    let index = 0;
    while (index < chunk.length) {
      if (isLatinVowel(chunk[index])) {
        let vowelEnd = index + 1;
        while (vowelEnd < chunk.length && isLatinVowel(chunk[vowelEnd])) {
          vowelEnd += 1;
        }
        tokens.push({ type: "v", value: chunk.slice(index, vowelEnd) });
        index = vowelEnd;
        continue;
      }

      let consonantEnd = index + 1;
      while (consonantEnd < chunk.length && !isLatinVowel(chunk[consonantEnd])) {
        consonantEnd += 1;
      }

      splitHebrewConsonantRun(chunk.slice(index, consonantEnd)).forEach((cluster) => {
        tokens.push({ type: "c", value: cluster });
      });
      index = consonantEnd;
    }
  });

  return tokens;
}

function splitHebrewConsonantRun(value) {
  const clusters = [];
  let index = 0;
  while (index < value.length) {
    const remaining = value.slice(index);
    if (remaining.startsWith("sh")) {
      clusters.push("sh");
      index += 2;
      continue;
    }
    if (remaining.startsWith("kh")) {
      clusters.push("kh");
      index += 2;
      continue;
    }
    if (remaining.startsWith("ch")) {
      clusters.push("ch");
      index += 2;
      continue;
    }
    if (remaining.startsWith("ts")) {
      clusters.push("ts");
      index += 2;
      continue;
    }
    if (remaining.startsWith("tz")) {
      clusters.push("tz");
      index += 2;
      continue;
    }

    clusters.push(remaining[0]);
    index += 1;
  }

  return clusters;
}

function isLatinVowel(character) {
  return ["a", "e", "i", "o", "u"].includes(character);
}

function isHebrewLetter(value) {
  return /^[\u05d0-\u05ea]$/.test(value);
}

function matchesHebrewConsonant(letter, cluster) {
  const normalizedLetter = normalizeHebrewLetterForMatch(letter);
  switch (normalizedLetter) {
    case "א":
    case "ע":
      return false;
    case "ב":
      return cluster === "b" || cluster === "v";
    case "ג":
      return cluster === "g" || cluster === "j";
    case "ד":
      return cluster === "d";
    case "ה":
      return cluster === "h";
    case "ו":
      return cluster === "v" || cluster === "w";
    case "ז":
      return cluster === "z";
    case "ח":
      return cluster === "ch" || cluster === "kh" || cluster === "h";
    case "ט":
      return cluster === "t";
    case "י":
      return cluster === "y";
    case "כ":
      return cluster === "k" || cluster === "kh" || cluster === "ch";
    case "ל":
      return cluster === "l";
    case "מ":
      return cluster === "m";
    case "נ":
      return cluster === "n";
    case "ס":
      return cluster === "s";
    case "פ":
      return cluster === "p" || cluster === "f";
    case "צ":
      return cluster === "ts" || cluster === "tz" || cluster === "z";
    case "ק":
      return cluster === "k" || cluster === "q" || cluster === "c";
    case "ר":
      return cluster === "r";
    case "ש":
      return cluster === "sh" || cluster === "s";
    case "ת":
      return cluster === "t";
    default:
      return false;
  }
}

function normalizeHebrewLetterForMatch(letter) {
  switch (letter) {
    case "ך":
      return "כ";
    case "ם":
      return "מ";
    case "ן":
      return "נ";
    case "ף":
      return "פ";
    case "ץ":
      return "צ";
    default:
      return letter;
  }
}

function describeHebrewVowel(value, nextLetter) {
  const normalized = String(value || "").toLowerCase();
  if (!normalized) {
    return null;
  }

  if ((normalized.startsWith("ei") || normalized.startsWith("ey")) && nextLetter === "י") {
    return { mark: "ֵ", consumeNext: "yod" };
  }

  if ((normalized.startsWith("ai") || normalized.startsWith("ay")) && nextLetter === "י") {
    return { mark: "ַ", consumeNext: "yod" };
  }

  if ((normalized.startsWith("oi") || normalized.startsWith("oy")) && nextLetter === "י") {
    return { mark: "ֹ", consumeNext: "yod" };
  }

  if (normalized.startsWith("o") && nextLetter === "ו") {
    return { mark: "", consumeNext: "vav", nextLetterText: "וֹ" };
  }

  if (normalized.startsWith("u") && nextLetter === "ו") {
    return { mark: "", consumeNext: "vav", nextLetterText: "וּ" };
  }

  if (normalized.startsWith("i") && nextLetter === "י") {
    return { mark: "ִ", consumeNext: "yod" };
  }

  if (normalized.startsWith("a")) {
    return { mark: "ַ" };
  }

  if (normalized.startsWith("e")) {
    return { mark: "ֶ" };
  }

  if (normalized.startsWith("i")) {
    return { mark: "ִ" };
  }

  if (normalized.startsWith("o")) {
    return { mark: "ֹ" };
  }

  if (normalized.startsWith("u")) {
    return { mark: "ֻ" };
  }

  return null;
}

function shouldAddHebrewSheva(letter, nextLetter) {
  return isHebrewLetter(letter) && isHebrewLetter(nextLetter);
}

function applyHebrewSentenceNikkud(value) {
  const rawText = String(value || "");
  if (!rawText || /[\u0591-\u05C7]/.test(rawText) || !/[\u05D0-\u05EA]/.test(rawText)) {
    return rawText;
  }

  if (HEBREW_SENTENCE_NIKKUD_OVERRIDES[rawText]) {
    return HEBREW_SENTENCE_NIKKUD_OVERRIDES[rawText];
  }

  if (HEBREW_POINTED_WORD_LOOKUP.has(rawText)) {
    return HEBREW_POINTED_WORD_LOOKUP.get(rawText);
  }

  if (HEBREW_NIKKUD_OVERRIDES[rawText]) {
    return HEBREW_NIKKUD_OVERRIDES[rawText];
  }

  return rawText.replace(/[\u05D0-\u05EA]+/g, (word) => {
    if (HEBREW_SENTENCE_NIKKUD_OVERRIDES[word]) {
      return HEBREW_SENTENCE_NIKKUD_OVERRIDES[word];
    }

    if (HEBREW_POINTED_WORD_LOOKUP.has(word)) {
      return HEBREW_POINTED_WORD_LOOKUP.get(word);
    }

    if (HEBREW_NIKKUD_OVERRIDES[word]) {
      return HEBREW_NIKKUD_OVERRIDES[word];
    }

    return word;
  });
}

function applyHebrewSentenceNikkudList(values) {
  return Array.isArray(values) ? values.map((value) => applyHebrewSentenceNikkud(value)) : [];
}

function shouldHideHebrewDragPrompt(questionText) {
  const normalized = String(questionText || "").trim();
  if (!normalized) {
    return false;
  }

  return [
    "השלימו את המשפט.",
    "הַשְׁלִימוּ אֶת הַמִּשְׁפָּט.",
    "גררו את המילים למקום הנכון במשפט.",
    "גִּרְרוּ אֶת הַמִּלִּים לַמָּקוֹם הַנָּכוֹן בַּמִּשְׁפָּט.",
  ].includes(normalized);
}

function buildScienceQuestionBank(entries) {
  return entries
    .filter((entry) => Array.isArray(entry.incorrectAnswers) && entry.incorrectAnswers.length === 3)
    .filter((entry) => !SCIENCE_EXCLUDED_PATTERNS.some((pattern) => pattern.test(entry.question)))
    .map((entry) => {
      const difficulty = getEntryDifficulty(entry.difficulty);
      const options = shuffleArray([entry.correctAnswer, ...entry.incorrectAnswers]).map(String);
      if (difficulty === null) {
        return null;
      }

      if (!hasDistinctChoiceMeanings(options)) {
        return null;
      }

      return {
        question: entry.question,
        options,
        answer: entry.correctAnswer,
        difficulty,
        type: "science-choice",
      };
    })
    .filter(Boolean);
}

function buildStaticChoiceBank(entries, type) {
  return entries
    .map((entry) => normalizeChoiceBankEntry(entry, type))
    .filter(Boolean);
}

function buildStaticDragQuestionBank(entries, type) {
  return entries
    .map((entry) => normalizeDragQuestionEntry(entry, type))
    .filter(Boolean);
}

function normalizeChoiceBankEntry(entry, type) {
  const difficulty = getEntryDifficulty(entry?.difficulty);
  const options = Array.from(new Set((entry?.options || []).map(String)));
  const answer = String(entry?.answer || "");
  if (
    difficulty === null ||
    !answer ||
    options.length !== 4 ||
    !options.includes(answer) ||
    !hasDistinctChoiceMeanings(options)
  ) {
    return null;
  }

  return {
    question: String(entry?.question || ""),
    options,
    answer,
    difficulty,
    type,
    visualHtml: typeof entry?.visualHtml === "string" ? entry.visualHtml : "",
    visualSummary:
      typeof entry?.visualSummary === "string"
        ? entry.visualSummary
        : typeof entry?.passage === "string"
          ? entry.passage
          : "",
    displayText: typeof entry?.displayText === "string" ? entry.displayText : "",
    extraText: typeof entry?.extraText === "string" ? entry.extraText : "",
    extraHtml: typeof entry?.extraHtml === "string" ? entry.extraHtml : "",
    reviewText:
      typeof entry?.reviewText === "string"
        ? entry.reviewText
        : typeof entry?.passage === "string"
          ? entry.passage
          : "",
  };
}

function normalizeDragQuestionEntry(entry, type) {
  const difficulty = getEntryDifficulty(entry?.difficulty);
  const templateParts = Array.isArray(entry?.templateParts)
    ? entry.templateParts.map((item) => String(item))
    : [];
  const choices = Array.isArray(entry?.choices)
    ? Array.from(new Set(entry.choices.map((item) => String(item))))
    : [];
  const answer = Array.isArray(entry?.answer) ? entry.answer.map((item) => String(item)) : [];
  const reviewText =
    typeof entry?.reviewText === "string"
      ? entry.reviewText
      : typeof entry?.displayText === "string"
      ? entry.displayText
      : buildDragTemplateText(templateParts);

  if (
    difficulty === null ||
    !String(entry?.question || "").trim() ||
    templateParts.length !== answer.length + 1 ||
    answer.length < 1 ||
    choices.length < answer.length ||
    !answer.every((token) => choices.includes(token))
  ) {
    return null;
  }

  return {
    question: String(entry.question),
    difficulty,
    type,
    templateParts,
    choices,
    answer,
    extraText: typeof entry?.extraText === "string" ? entry.extraText : "",
    reviewText,
    isHebrew: Boolean(entry?.isHebrew),
  };
}

function hasDistinctChoiceMeanings(options) {
  return new Set(options.map(getChoiceMeaningKey)).size === options.length;
}

function getChoiceMeaningKey(value) {
  const normalized = String(value)
    .trim()
    .toLowerCase()
    .replaceAll(",", "")
    .replace(/\s+/g, " ");

  const minutesMatch = normalized.match(/^(about )?(\d+) minutes?$/);
  if (minutesMatch) {
    return `duration:${Number(minutesMatch[2])}`;
  }

  const hoursMatch = normalized.match(/^(about )?(\d+) hours?$/);
  if (hoursMatch) {
    return `duration:${Number(hoursMatch[2]) * 60}`;
  }

  const halfHoursMatch = normalized.match(/^(about )?(\d+) and a half hours?$/);
  if (halfHoursMatch) {
    return `duration:${Number(halfHoursMatch[2]) * 60 + 30}`;
  }

  if (/^(about )?half an hour$/.test(normalized) || /^(about )?half hour$/.test(normalized)) {
    return "duration:30";
  }

  return normalized;
}

function getEntryDifficulty(value) {
  const difficulty = Number(value);
  if (!Number.isInteger(difficulty) || difficulty < 1 || difficulty > 5) {
    return null;
  }

  return difficulty;
}

function initializeUserSelector() {
  state.currentUserId = loadSelectedUserId();
  applyUserDefaultDifficulty(state.currentUserId);
  renderUserSelector();
}

function renderUserSelector() {
  if (!elements.userSelector) {
    return;
  }

  elements.userSelector.innerHTML = "";

  USER_PROFILES.forEach((profile) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "user-card";
    button.dataset.userId = profile.id;
    button.setAttribute("aria-pressed", profile.id === state.currentUserId ? "true" : "false");
    button.classList.toggle("active", profile.id === state.currentUserId);
    button.innerHTML = `
      <span class="user-card-avatar" aria-hidden="true">${buildUserAvatarMarkup(profile)}</span>
      <span class="user-card-name">${escapeHtml(profile.name)}</span>
    `;
    button.addEventListener("click", () => selectUser(profile.id));
    elements.userSelector.appendChild(button);
  });
}

function selectUser(userId) {
  if (!USER_PROFILES.some((profile) => profile.id === userId)) {
    return;
  }

  state.currentUserId = userId;
  writeSelectedUserId(userId);
  applyUserDefaultDifficulty(userId);
  renderUserSelector();

  if (!elements.historyScreen.hidden) {
    renderHistoryScreen();
  }
}

function applyUserDefaultDifficulty(userId) {
  const profile = USER_PROFILE_MAP[userId];
  const difficulty = Number(profile?.defaultDifficulty);
  elements.difficultyLevel.value =
    Number.isInteger(difficulty) && difficulty >= 1 && difficulty <= 5
      ? String(difficulty)
      : "3";
  updateDifficultyButtons();
}

function loadSelectedUserId() {
  const storage = getSessionStorage();
  if (!storage) {
    return USER_PROFILES[0].id;
  }

  try {
    const rawValue = String(storage.getItem(SELECTED_USER_STORAGE_KEY) || "");
    return USER_PROFILES.some((profile) => profile.id === rawValue) ? rawValue : USER_PROFILES[0].id;
  } catch {
    return USER_PROFILES[0].id;
  }
}

function writeSelectedUserId(userId) {
  const storage = getSessionStorage();
  if (!storage) {
    return;
  }

  try {
    storage.setItem(SELECTED_USER_STORAGE_KEY, userId);
  } catch {}
}

function getCurrentUserProfile() {
  return USER_PROFILES.find((profile) => profile.id === state.currentUserId) || USER_PROFILES[0];
}

function buildUserAvatarMarkup(profile) {
  const palette = profile.palette;
  const hairMarkupByStyle = {
    longHair: `
      <path d="M22 36c0-14 9-24 22-24s22 10 22 24v19c-4 7-12 13-22 13S26 62 22 55z" fill="${palette.hair}" opacity="0.95"></path>
      <path d="M24 36c2-12 10-21 20-21 11 0 19 7 21 18-4-4-10-6-17-6-9 0-16 4-24 9z" fill="${palette.hair}"></path>
    `,
    curlyHair: `
      <g fill="${palette.hair}">
        <circle cx="29" cy="24" r="6"></circle>
        <circle cx="37" cy="20" r="7"></circle>
        <circle cx="46" cy="19" r="7"></circle>
        <circle cx="55" cy="21" r="6"></circle>
        <circle cx="61" cy="27" r="5"></circle>
        <circle cx="27" cy="30" r="5"></circle>
      </g>
      <path d="M25 37c2-9 9-15 19-15 10 0 18 6 20 16-5-4-10-6-17-6-9 0-15 2-22 5z" fill="${palette.hair}"></path>
    `,
    lightCurls: `
      <g fill="${palette.hair}">
        <circle cx="30" cy="24" r="5"></circle>
        <circle cx="38" cy="20" r="6"></circle>
        <circle cx="46" cy="19" r="6"></circle>
        <circle cx="54" cy="21" r="5"></circle>
        <circle cx="59" cy="27" r="4.5"></circle>
        <circle cx="28" cy="29" r="4.5"></circle>
        <circle cx="34" cy="17" r="4"></circle>
      </g>
      <path d="M26 37c2-10 9-16 18-16 10 0 18 6 19 16-4-3-10-5-17-5s-14 2-20 5z" fill="${palette.hair}"></path>
    `,
  };
  const hairMarkup = hairMarkupByStyle[profile.avatarStyle] || hairMarkupByStyle.curlyHair;
  return `
    <svg viewBox="0 0 88 88" class="user-avatar-svg" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="avatar-${profile.id}-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${palette.sky}"></stop>
          <stop offset="100%" stop-color="#ffffff"></stop>
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="80" height="80" rx="24" fill="url(#avatar-${profile.id}-bg)"></rect>
      ${hairMarkup}
      <circle cx="44" cy="38" r="19" fill="#f4c9a8"></circle>
      <circle cx="37" cy="39" r="2" fill="${palette.eyes}"></circle>
      <circle cx="51" cy="39" r="2" fill="${palette.eyes}"></circle>
      <path d="M38 48c2 3 10 3 12 0" fill="none" stroke="#9b5c4d" stroke-width="2" stroke-linecap="round"></path>
      <path d="M24 70c4-12 13-18 20-18 8 0 17 6 20 18" fill="${palette.shirt}"></path>
      <circle cx="67" cy="20" r="7" fill="${palette.accent}"></circle>
    </svg>
  `;
}

function initializeQuestionCountButtons() {
  elements.questionCountButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const questionCount = button.dataset.questionCount;
      if (!questionCount) {
        return;
      }

      elements.questionCount.value = questionCount;
      updateQuestionCountButtons();
    });
  });

  updateQuestionCountButtons();
}

function updateQuestionCountButtons() {
  const selectedCount = String(elements.questionCount.value || "30");

  elements.questionCountButtons.forEach((button) => {
    const isActive = button.dataset.questionCount === selectedCount;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

function initializeDifficultyButtons() {
  elements.difficultyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const difficulty = button.dataset.difficulty;
      if (!difficulty) {
        return;
      }

      elements.difficultyLevel.value = difficulty;
      updateDifficultyButtons();
    });
  });

  updateDifficultyButtons();
}

function initializeHebrewOnlyButton() {
  elements.hebrewOnlyButton?.addEventListener("click", () => {
    elements.hebrewOnly.value = String(!isHebrewOnlySelected());
    updateHebrewOnlyButton();
  });

  updateHebrewOnlyButton();
}

function updateDifficultyButtons() {
  const selectedDifficulty = String(elements.difficultyLevel.value || "3");

  elements.difficultyButtons.forEach((button) => {
    const isActive = button.dataset.difficulty === selectedDifficulty;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

function isHebrewOnlySelected() {
  return String(elements.hebrewOnly?.value || "").toLowerCase() === "true";
}

function updateHebrewOnlyButton() {
  const isActive = isHebrewOnlySelected();
  elements.hebrewOnlyButton?.classList.toggle("active", isActive);
  elements.hebrewOnlyButton?.setAttribute("aria-pressed", isActive ? "true" : "false");
}

function startSession(event) {
  event.preventDefault();

  const totalQuestions = Number.parseInt(elements.questionCount.value, 10);
  const difficulty = Number.parseInt(elements.difficultyLevel.value, 10);
  const hebrewOnly = isHebrewOnlySelected();

  if (!Number.isFinite(totalQuestions) || !QUESTION_COUNT_OPTIONS.includes(totalQuestions)) {
    showStartMessage("Please choose one of the question counts shown.", "error");
    return;
  }

  if (!Number.isFinite(difficulty) || difficulty < 1 || difficulty > 5) {
    showStartMessage("Please choose a difficulty from 1 to 5.", "error");
    return;
  }

  const requiredChoiceBanks = hebrewOnly
    ? [choiceCategoryConfigs.hebrew]
    : Object.values(choiceCategoryConfigs);
  if (requiredChoiceBanks.some(({ bank }) => !bank.length)) {
    showStartMessage(
      hebrewOnly ? "The Hebrew question bank is missing." : "One of the offline question files is missing.",
      "error"
    );
    return;
  }

  clearStartMessage();
  stopConfetti();
  state.totalQuestions = totalQuestions;
  state.difficulty = difficulty;
  state.hebrewOnly = hebrewOnly;
  state.currentIndex = 0;
  state.viewIndex = 0;
  state.answeredCount = 0;
  state.correctCount = 0;
  state.answerResults = [];
  state.answerSelections = [];
  state.sessionRecords = [];
  state.sessionStartedAt = new Date();
  state.feedbackMessage = "";
  state.feedbackTone = "";
  state.questions = injectHebrewWritingPracticeTail(
    buildSessionQuestions(totalQuestions, difficulty, { hebrewOnly }),
    difficulty,
    { hebrewOnly }
  );

  switchScreen(elements.quizScreen);
  renderCurrentQuestion();
}

function buildSessionQuestions(totalQuestions, difficulty, options = {}) {
  const hebrewOnly = Boolean(options.hebrewOnly);
  const categorySequence = hebrewOnly
    ? Array.from({ length: totalQuestions }, () => "hebrew")
    : buildDefaultSessionCategorySequence(totalQuestions);
  const resources = Object.fromEntries(
    Object.entries(choiceCategoryConfigs).map(([category, config]) => [
      category,
      createPool(config.bank),
    ])
  );
  resources.sentenceDragEnglish = createPool(sentenceDragEnglishQuestionBank);
  resources.sentenceDragHebrew = createPool(sentenceDragHebrewQuestionBank);
  resources.hebrewImage = createPool(hebrewImageQuestionBank);
  resources.hebrewReverse = createPool(hebrewReverseQuestionBank);
  resources.hebrewHomograph = createPool(hebrewHomographQuestionBank);
  const hebrewQuestionCount = categorySequence.filter((category) => category === "hebrew").length;
  const nonHebrewQuestionCount = categorySequence.length - hebrewQuestionCount;
  const nonHebrewDifficultyQueue = buildDifficultyQueue(
    nonHebrewQuestionCount,
    NON_HEBREW_DIFFICULTY_WEIGHTS[difficulty] || { [difficulty]: 1 }
  );
  const hebrewDifficultyQueue = buildHebrewDifficultyQueue(
    hebrewQuestionCount,
    difficulty,
    hebrewQuestionBank
  );

  const runtime = {
    mathModeIndex: 0,
    languageQuestionIndex: 0,
    hebrewQuestionIndex: 0,
    hebrewStandardQuestionIndex: 0,
    mapCountries: new Set(),
  };

  return categorySequence.map((category) =>
    createSessionQuestionForCategory(category, difficulty, resources, nonHebrewDifficultyQueue, hebrewDifficultyQueue, runtime)
  );
}

function injectHebrewWritingPracticeTail(questions, difficulty, options = {}) {
  const requestedTailCount = Math.min(
    questions.length,
    options.hebrewOnly ? HEBREW_ONLY_WRITING_TAIL_COUNT : DEFAULT_HEBREW_WRITING_TAIL_COUNT
  );
  const practiceCount = Math.min(requestedTailCount, Math.max(0, questions.length - 1));
  const readingQuestion =
    questions.length > 0 ? createHebrewReadingComprehensionQuestion(difficulty) : null;
  if (!practiceCount && !readingQuestion) {
    return questions;
  }

  const practiceQuestions = buildHebrewWritingPracticeQuestions(practiceCount, difficulty);
  const prefixCount = Math.max(
    0,
    questions.length - practiceQuestions.length - (readingQuestion ? 1 : 0)
  );

  return [
    ...questions.slice(0, prefixCount),
    ...(readingQuestion ? [readingQuestion] : []),
    ...practiceQuestions,
  ];
}

function buildHebrewWritingPracticeQuestions(totalCount, difficulty) {
  const normalizedDifficulty = Math.max(2, Math.min(5, Number(difficulty) || 2));
  if (normalizedDifficulty <= 2) {
    return takeRepeatedRandomItems(HEBREW_WRITING_LETTERS, totalCount).map((letter) =>
      createHebrewWritingPracticeQuestion(letter, normalizedDifficulty, "letter")
    );
  }

  if (normalizedDifficulty === 3) {
    return takeRepeatedRandomItems(buildHebrewWritingWordPool(), totalCount).map((word) =>
      createHebrewWritingPracticeQuestion(word, normalizedDifficulty, "word")
    );
  }

  if (normalizedDifficulty === 4) {
    return takeRepeatedRandomItems(HEBREW_WRITING_SHORT_SENTENCES, totalCount).map((sentence) =>
      createHebrewWritingPracticeQuestion(sentence, normalizedDifficulty, "short-sentence")
    );
  }

  return takeRepeatedRandomItems(HEBREW_WRITING_LONG_SENTENCES, totalCount).map((sentence) =>
    createHebrewWritingPracticeQuestion(sentence, normalizedDifficulty, "long-sentence")
  );
}

function buildHebrewWritingWordPool() {
  const seen = new Set();
  const bankWords = hebrewQuestionBank
    .map((entry) => stripHebrewDiacritics(entry.hebrew))
    .filter((word) => /^[\u05D0-\u05EA]{2,7}$/.test(word))
    .filter((word) => !seen.has(word) && seen.add(word));

  if (bankWords.length >= 12) {
    return bankWords;
  }

  return Array.from(new Set([...bankWords, ...HEBREW_WRITING_WORD_FALLBACKS]));
}

function takeRepeatedRandomItems(values, count) {
  if (!Array.isArray(values) || !values.length || count <= 0) {
    return [];
  }

  const result = [];
  let pool = [];

  while (result.length < count) {
    if (!pool.length) {
      pool = shuffleArray([...values]);
    }

    result.push(pool.pop());
  }

  return result;
}

function buildDefaultSessionCategorySequence(totalQuestions) {
  const reviewCategorySequence = buildReviewCategorySequence(totalQuestions);
  const mapQuestionCount = getReservedMapQuestionCount(totalQuestions);
  const regularQuestionCount = Math.max(
    0,
    totalQuestions - reviewCategorySequence.length - mapQuestionCount
  );
  const categoryCounts = allocateCategoryCounts(regularQuestionCount);
  const regularCategorySequence = buildCategorySequence(regularQuestionCount, categoryCounts);

  return [
    ...reviewCategorySequence,
    ...insertReservedMapCategories(regularCategorySequence, mapQuestionCount),
  ];
}

function hasGeographyMapSupport() {
  return (
    typeof createGeographyMapGeneratedEntry === "function" &&
    Array.isArray(globalThis.GEOGRAPHY_MAP_COUNTRIES) &&
    globalThis.GEOGRAPHY_MAP_COUNTRIES.length > 0
  );
}

function getReservedMapQuestionCount(totalQuestions) {
  if (!hasGeographyMapSupport() || totalQuestions <= 0) {
    return 0;
  }

  return Math.max(1, Math.round(totalQuestions / MAP_QUESTION_INTERVAL));
}

function insertReservedMapCategories(sequence, mapQuestionCount) {
  if (!mapQuestionCount) {
    return sequence;
  }

  const result = sequence.slice();
  const finalLength = sequence.length + mapQuestionCount;

  for (let index = 0; index < mapQuestionCount; index += 1) {
    const targetIndex = Math.max(
      0,
      Math.min(
        result.length,
        Math.round(((index + 1) * finalLength) / (mapQuestionCount + 1)) - 1
      )
    );
    result.splice(targetIndex, 0, RESERVED_MAP_CATEGORY);
  }

  return result;
}

function createSessionQuestionForCategory(
  category,
  difficulty,
  resources,
  nonHebrewDifficultyQueue,
  hebrewDifficultyQueue,
  runtime
) {
  if (category === "math") {
    const effectiveDifficulty = drawNextDifficulty(nonHebrewDifficultyQueue, difficulty);
    const question =
      runtime.mathModeIndex % 2 === 0
        ? createMathInputQuestion(effectiveDifficulty)
        : createMathChoiceQuestion(effectiveDifficulty);
    runtime.mathModeIndex += 1;
    return question;
  }

  if (category === "hebrew") {
    const effectiveDifficulty = drawNextDifficulty(hebrewDifficultyQueue, difficulty);
    const hebrewQuestionIndex = Number(runtime?.hebrewQuestionIndex || 0);
    if (runtime) {
      runtime.hebrewQuestionIndex = hebrewQuestionIndex + 1;
    }

    if (shouldCreateHebrewFinalLetterQuestion(hebrewQuestionIndex)) {
      const finalLetterQuestion = createHebrewFinalLetterQuestion(effectiveDifficulty);
      if (finalLetterQuestion) {
        return finalLetterQuestion;
      }
    }

    const dragQuestion = maybeCreateSessionDragQuestion(category, resources, effectiveDifficulty, runtime);
    if (dragQuestion) {
      return dragQuestion;
    }
    return createHebrewSessionQuestion(resources, effectiveDifficulty, runtime);
  }

  const effectiveDifficulty = getEffectiveCategoryDifficulty(
    category,
    drawNextDifficulty(nonHebrewDifficultyQueue, difficulty)
  );

  if (category === RESERVED_MAP_CATEGORY) {
    return createGeographyMapQuestion(effectiveDifficulty, runtime, resources);
  }

  const dragQuestion = maybeCreateSessionDragQuestion(category, resources, effectiveDifficulty, runtime);
  if (dragQuestion) {
    return dragQuestion;
  }

  if (category === "time") {
    return createTimeChoiceQuestion(effectiveDifficulty);
  }

  if (category === "statistics") {
    return createStatisticsChoiceQuestion(effectiveDifficulty);
  }

  if (category === "charts-and-graphs") {
    if (resources["charts-and-graphs"]?.entries.length && Math.random() >= 0.8) {
      return createBankChoiceQuestion(
        drawFromPool(resources["charts-and-graphs"], effectiveDifficulty),
        "charts-and-graphs-choice"
      );
    }

    return createChartsAndGraphsQuestion(effectiveDifficulty);
  }

  if (category === "science") {
    const generatedQuestion = createGeneratedCategoryQuestion(category, effectiveDifficulty);
    if (generatedQuestion) {
      return generatedQuestion;
    }

    return createBankChoiceQuestion(drawFromPool(resources.science, effectiveDifficulty), "science-choice");
  }

  const categoryConfig = choiceCategoryConfigs[category];
  if (categoryConfig) {
    const generatedQuestion = createGeneratedCategoryQuestion(category, effectiveDifficulty);
    if (generatedQuestion) {
      return generatedQuestion;
    }

    return categoryConfig.createQuestion(drawFromPool(resources[category], effectiveDifficulty));
  }

  throw new Error(`Unknown session category: ${category}`);
}

function createGeographyMapQuestion(difficulty, runtime, resources) {
  const excludedCountries = runtime?.mapCountries ? Array.from(runtime.mapCountries) : [];
  const rawEntry =
    typeof createGeographyMapGeneratedEntry === "function"
      ? createGeographyMapGeneratedEntry(difficulty, excludedCountries)
      : null;
  const normalizedEntry = normalizeChoiceBankEntry(rawEntry, "geography-choice");

  if (normalizedEntry) {
    runtime?.mapCountries?.add(normalizedEntry.answer);
    return createBankChoiceQuestion(normalizedEntry, "geography-choice");
  }

  const generatedQuestion = createGeneratedCategoryQuestion("geography", difficulty);
  if (generatedQuestion) {
    return generatedQuestion;
  }

  return choiceCategoryConfigs.geography.createQuestion(drawFromPool(resources.geography, difficulty));
}

function getEffectiveCategoryDifficulty(category, difficulty) {
  const maxDifficulty = CATEGORY_MAX_DIFFICULTIES[category];
  return typeof maxDifficulty === "number" ? Math.min(difficulty, maxDifficulty) : difficulty;
}

function maybeCreateLanguageDragQuestion(category, resources, difficulty, runtime) {
  if (category !== "vocabulary-grammar" && category !== "hebrew") {
    return null;
  }

  runtime.languageQuestionIndex += 1;
  if (!LANGUAGE_DRAG_INTERVAL || runtime.languageQuestionIndex % LANGUAGE_DRAG_INTERVAL !== 0) {
    return null;
  }

  const isHebrew = category === "hebrew";
  return createLanguageDragQuestion(resources, difficulty, isHebrew);
}

function maybeCreateSessionDragQuestion(category, resources, difficulty, runtime) {
  const languageDragQuestion = maybeCreateLanguageDragQuestion(category, resources, difficulty, runtime);
  if (languageDragQuestion) {
    return languageDragQuestion;
  }

  return maybeCreateGeneratedCategoryDragQuestion(category, difficulty);
}

function maybeCreateGeneratedCategoryDragQuestion(category, difficulty) {
  const share = GENERATED_CATEGORY_DRAG_SHARES[category];
  if (!share || typeof createCategoryGeneratedDragQuestion !== "function" || Math.random() >= share) {
    return null;
  }

  try {
    const question = createCategoryGeneratedDragQuestion(category, difficulty);
    return question?.mode === "drag" ? question : null;
  } catch {
    return null;
  }
}

function createLanguageDragQuestion(resources, difficulty, isHebrew) {
  const type = isHebrew ? "hebrew-drag" : "vocabulary-grammar-drag";
  const generatedEntry = isHebrew
    ? createHebrewSentenceDragEntry(difficulty)
    : createEnglishSentenceDragEntry(difficulty);

  if (generatedEntry) {
    return createBankDragQuestion(generatedEntry, type);
  }

  const pool = isHebrew ? resources.sentenceDragHebrew : resources.sentenceDragEnglish;
  if (pool?.entries.length) {
    return createBankDragQuestion(drawFromPool(pool, difficulty), type);
  }

  return null;
}

function createEnglishSentenceDragEntry(difficulty) {
  if (typeof createEnglishSentenceDragGeneratedEntry !== "function") {
    return null;
  }

  return normalizeDragQuestionEntry(
    createEnglishSentenceDragGeneratedEntry(difficulty),
    "vocabulary-grammar-drag"
  );
}

function createHebrewSentenceDragEntry(difficulty) {
  if (typeof createHebrewSentenceDragGeneratedEntry !== "function") {
    return null;
  }

  return normalizeDragQuestionEntry(createHebrewSentenceDragGeneratedEntry(difficulty), "hebrew-drag");
}

function maybeCreateHebrewImageQuestion(resources, difficulty) {
  if (!resources?.hebrewImage?.entries.length || Math.random() >= HEBREW_IMAGE_DRAG_SHARE) {
    return null;
  }

  const entries = drawHebrewImageEntries(resources.hebrewImage, difficulty, 3);
  return entries.length === 3 ? createHebrewImageDragQuestion(entries, difficulty) : null;
}

function drawHebrewImageEntries(pool, difficulty, count) {
  if (!pool?.entries?.length || count <= 0) {
    return [];
  }

  const exactEntries = pool.entriesByDifficulty.get(difficulty) || [];
  const eligibleEntries = pool.entries.filter((entry) => entry.difficulty <= difficulty);
  const source =
    exactEntries.length >= count
      ? exactEntries
      : eligibleEntries.length >= count
        ? eligibleEntries
        : pool.entries;

  return shuffleArray([...source]).slice(0, count);
}

function buildReviewCategorySequence(totalQuestions) {
  const reviewQuestionCount = Math.min(
    Math.max(0, totalQuestions - 1),
    Math.max(0, Math.round(totalQuestions * REVIEW_FOCUS_SHARE))
  );
  if (!reviewQuestionCount) {
    return [];
  }

  const weaknessEntries = getUserWeakCategoryEntries(loadSessionHistory()).slice(0, 3);
  if (!weaknessEntries.length) {
    return [];
  }

  const counts = allocateWeightedCategoryCounts(weaknessEntries, reviewQuestionCount);
  const reviewCategories = weaknessEntries.flatMap((entry) =>
    Array.from({ length: counts[entry.category] || 0 }, () => entry.category)
  );

  return interleaveReviewCategories(reviewCategories);
}

function getUserWeakCategoryEntries(sessionHistory) {
  const stats = new Map();

  sessionHistory.forEach((session, sessionIndex) => {
    const sessionWeight = Math.pow(REVIEW_RECENCY_DECAY, sessionIndex);

    (session.records || []).forEach((record) => {
      const category = String(record?.category || "").trim();
      if (!SESSION_CATEGORY_ORDER.includes(category) || !REVIEW_FOCUS_ALLOWED_CATEGORIES.has(category)) {
        return;
      }

      if (!stats.has(category)) {
        stats.set(category, { category, attempts: 0, wrong: 0 });
      }

      const entry = stats.get(category);
      entry.attempts += sessionWeight;
      if (!record.isCorrect) {
        entry.wrong += sessionWeight;
      }
    });
  });

  return Array.from(stats.values())
    .filter((entry) => entry.wrong > 0)
    .map((entry) => ({
      category: entry.category,
      score: entry.wrong / (entry.attempts + 1.5),
      wrong: entry.wrong,
    }))
    .sort((left, right) => right.score - left.score || right.wrong - left.wrong);
}

function allocateWeightedCategoryCounts(entries, total) {
  const counts = Object.fromEntries(entries.map((entry) => [entry.category, 0]));
  const totalWeight = entries.reduce((sum, entry) => sum + entry.score, 0);
  if (totalWeight <= 0) {
    return counts;
  }

  let assigned = 0;
  const ranked = entries.map((entry) => {
    const exact = (entry.score / totalWeight) * total;
    const whole = Math.floor(exact);
    counts[entry.category] = whole;
    assigned += whole;
    return { category: entry.category, remainder: exact - whole };
  });

  ranked.sort((left, right) => right.remainder - left.remainder).forEach((entry) => {
    if (assigned < total) {
      counts[entry.category] += 1;
      assigned += 1;
    }
  });

  return counts;
}

function interleaveReviewCategories(categories) {
  const remaining = categories.reduce((map, category) => {
    map.set(category, (map.get(category) || 0) + 1);
    return map;
  }, new Map());
  const sequence = [];
  let previousCategory = "";

  while (remaining.size) {
    const nextCategory = Array.from(remaining.entries())
      .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
      .find(([category]) => category !== previousCategory)?.[0]
      || Array.from(remaining.keys())[0];

    sequence.push(nextCategory);
    previousCategory = nextCategory;
    const nextCount = (remaining.get(nextCategory) || 0) - 1;
    if (nextCount > 0) {
      remaining.set(nextCategory, nextCount);
    } else {
      remaining.delete(nextCategory);
    }
  }

  return sequence;
}

function allocateCategoryCounts(totalQuestions) {
  const coreTotal = Math.min(totalQuestions, Math.max(1, Math.round(totalQuestions * CORE_CATEGORY_SHARE)));
  const otherTotal = totalQuestions - coreTotal;

  return {
    ...allocateEvenCounts(CORE_SESSION_CATEGORIES, coreTotal),
    ...allocateNonCoreCategoryCounts(otherTotal),
  };
}

function allocateNonCoreCategoryCounts(total) {
  const counts = Object.fromEntries(NON_CORE_SESSION_CATEGORIES.map((category) => [category, 0]));
  if (total <= 0) {
    return counts;
  }

  const rareCounts = allocateRareNonCoreCategoryCounts(total);
  const rareTotal = Object.values(rareCounts).reduce((sum, count) => sum + count, 0);
  const standardCategories = NON_CORE_SESSION_CATEGORIES.filter(
    (category) =>
      !Object.prototype.hasOwnProperty.call(RARE_NON_CORE_CATEGORY_TARGET_OVERALL_SHARES, category)
  );

  Object.assign(counts, allocateEvenCounts(standardCategories, Math.max(0, total - rareTotal)));
  Object.entries(rareCounts).forEach(([category, count]) => {
    counts[category] = count;
  });

  return counts;
}

function allocateRareNonCoreCategoryCounts(total) {
  return Object.fromEntries(
    Object.entries(RARE_NON_CORE_CATEGORY_TARGET_OVERALL_SHARES).map(([category, overallShare]) => [
      category,
      sampleRareCategoryCount(total, overallShare),
    ])
  );
}

function sampleRareCategoryCount(total, overallShare) {
  const nonCoreShare = 1 - CORE_CATEGORY_SHARE;
  const probability = nonCoreShare > 0 ? overallShare / nonCoreShare : 0;
  const clampedProbability = Math.max(0, Math.min(1, probability));
  let count = 0;

  for (let index = 0; index < total; index += 1) {
    if (Math.random() < clampedProbability) {
      count += 1;
    }
  }

  return count;
}

function allocateEvenCounts(categories, total) {
  const counts = Object.fromEntries(categories.map((category) => [category, 0]));
  const base = Math.floor(total / categories.length);
  const remainder = total % categories.length;

  categories.forEach((category) => {
    counts[category] = base;
  });

  shuffleArray([...categories])
    .slice(0, remainder)
    .forEach((category) => {
      counts[category] += 1;
    });

  return counts;
}

function buildCategorySequence(totalQuestions, categoryCounts) {
  const sequence = [];
  const usedCounts = Object.fromEntries(
    SESSION_CATEGORY_ORDER.map((category) => [category, 0])
  );

  for (let slot = 0; slot < totalQuestions; slot += 1) {
    let bestCategory = null;
    let bestScore = Number.NEGATIVE_INFINITY;

    for (const category of SESSION_CATEGORY_ORDER) {
      if (usedCounts[category] >= categoryCounts[category]) {
        continue;
      }

      const score = (((slot + 1) * categoryCounts[category]) / totalQuestions) - usedCounts[category];
      if (score > bestScore) {
        bestScore = score;
        bestCategory = category;
        continue;
      }

      if (score === bestScore && bestCategory !== null) {
        const currentRemaining = categoryCounts[category] - usedCounts[category];
        const bestRemaining = categoryCounts[bestCategory] - usedCounts[bestCategory];
        if (currentRemaining > bestRemaining) {
          bestCategory = category;
        }
      }
    }

    sequence.push(bestCategory);
    usedCounts[bestCategory] += 1;
  }

  return sequence;
}

function createPool(entries) {
  const entriesByDifficulty = groupEntriesByDifficulty(entries);
  return {
    entries,
    entriesByDifficulty,
    queuesByDifficulty: new Map(),
  };
}

function groupEntriesByDifficulty(entries) {
  const grouped = new Map();

  entries.forEach((entry) => {
    if (!grouped.has(entry.difficulty)) {
      grouped.set(entry.difficulty, []);
    }

    grouped.get(entry.difficulty).push(entry);
  });

  return grouped;
}

function drawFromPool(pool, difficulty) {
  const source = getEntriesForDifficulty(pool, difficulty);
  let queue = pool.queuesByDifficulty.get(difficulty);

  if (!queue || !queue.length) {
    queue = shuffleArray([...source]);
    pool.queuesByDifficulty.set(difficulty, queue);
  }

  return queue.pop();
}

function drawHebrewEntry(pool, difficulty) {
  const source = pool.entriesByDifficulty.get(difficulty) || [];
  let queue = pool.queuesByDifficulty.get(`hebrew-${difficulty}`);

  if (!queue || !queue.length) {
    queue = shuffleArray([...(source.length ? source : pool.entries)]);
    pool.queuesByDifficulty.set(`hebrew-${difficulty}`, queue);
  }

  return queue.pop();
}

function getEntriesForDifficulty(pool, difficulty) {
  const exact = pool.entriesByDifficulty.get(difficulty) || [];
  return exact.length ? exact : pool.entries;
}

function buildDifficultyQueue(totalCount, weightMap) {
  if (totalCount <= 0) {
    return [];
  }

  const counts = allocateWeightedCounts(totalCount, weightMap);
  return shuffleArray(
    Object.entries(counts).flatMap(([difficulty, count]) => Array(count).fill(Number(difficulty)))
  );
}

function buildHebrewDifficultyQueue(totalCount, sessionDifficulty, entries) {
  if (totalCount <= 0) {
    return [];
  }

  const availableLevels = [];
  for (let difficulty = 1; difficulty <= sessionDifficulty; difficulty += 1) {
    if (entries.some((entry) => entry.difficulty === difficulty)) {
      availableLevels.push(difficulty);
    }
  }

  if (!availableLevels.length) {
    return [sessionDifficulty];
  }

  const counts = allocateEvenCounts(availableLevels, totalCount);
  return shuffleArray(
    availableLevels.flatMap((difficulty) => Array(counts[difficulty]).fill(difficulty))
  );
}

function drawNextDifficulty(queue, fallbackDifficulty) {
  return queue.length ? queue.pop() : fallbackDifficulty;
}

function allocateWeightedCounts(totalCount, weightMap) {
  const counts = {};
  const entries = Object.entries(weightMap).map(([difficulty, weight]) => ({
    difficulty: Number(difficulty),
    exactCount: totalCount * (Number(weight) || 0),
  }));

  let assignedTotal = 0;

  entries.forEach((entry) => {
    const baseCount = Math.floor(entry.exactCount);
    counts[entry.difficulty] = baseCount;
    assignedTotal += baseCount;
  });

  let remainder = totalCount - assignedTotal;
  const ranked = shuffleArray([...entries]).sort(
    (left, right) => (right.exactCount % 1) - (left.exactCount % 1)
  );

  for (let index = 0; index < ranked.length && remainder > 0; index += 1) {
    counts[ranked[index].difficulty] += 1;
    remainder -= 1;
  }

  return counts;
}

function createMathInputQuestion(difficulty) {
  return randomChoice(mathInputGenerators)(difficulty);
}

function createMathChoiceQuestion(difficulty) {
  if (difficulty <= 2 && Math.random() < 0.28) {
    return createComparisonDragQuestion(difficulty);
  }

  return randomChoice(mathChoiceGenerators)(difficulty);
}

function createAdditionInputQuestion(difficulty) {
  const [left, right, answer] = generateAdditionValues(difficulty);
  return createNumericInputQuestion({
    type: "math-input",
    difficulty,
    questionText: "",
    displayText: `${formatSignedNumber(left)} + ${formatSignedNumber(right)} =`,
    answer,
  });
}

function createAdditionChoiceQuestion(difficulty) {
  const [left, right, answer] = generateAdditionValues(difficulty);
  return createNumericChoiceQuestion({
    type: "math-choice",
    difficulty,
    questionText: "",
    displayText: `${formatSignedNumber(left)} + ${formatSignedNumber(right)} =`,
    answer,
  });
}

function createSubtractionInputQuestion(difficulty) {
  const [left, right, answer] = generateSubtractionValues(difficulty);
  return createNumericInputQuestion({
    type: "math-input",
    difficulty,
    questionText: "",
    displayText: `${formatSignedNumber(left)} - ${formatSignedNumber(right)} =`,
    answer,
  });
}

function createSubtractionChoiceQuestion(difficulty) {
  const [left, right, answer] = generateSubtractionValues(difficulty);
  return createNumericChoiceQuestion({
    type: "math-choice",
    difficulty,
    questionText: "",
    displayText: `${formatSignedNumber(left)} - ${formatSignedNumber(right)} =`,
    answer,
  });
}

function createMultiplicationInputQuestion(difficulty) {
  const { left, right } = generateMultiplicationValues(difficulty);
  return createNumericInputQuestion({
    type: "math-input",
    difficulty,
    questionText: "",
    displayText: `${left} × ${right} =`,
    answer: left * right,
  });
}

function createMultiplicationChoiceQuestion(difficulty) {
  const { left, right } = generateMultiplicationValues(difficulty);
  return createNumericChoiceQuestion({
    type: "math-choice",
    difficulty,
    questionText: "",
    displayText: `${left} × ${right} =`,
    answer: left * right,
  });
}

function createDivisionInputQuestion(difficulty) {
  const { dividend, divisor, quotient } = generateDivisionProblem(difficulty);
  return createNumericInputQuestion({
    type: "math-input",
    difficulty,
    questionText: "",
    displayText: `${dividend} ÷ ${divisor} =`,
    answer: quotient,
  });
}

function createDivisionChoiceQuestion(difficulty) {
  const { dividend, divisor, quotient } = generateDivisionProblem(difficulty);
  return createNumericChoiceQuestion({
    type: "math-choice",
    difficulty,
    questionText: "",
    displayText: `${dividend} ÷ ${divisor} =`,
    answer: quotient,
  });
}

function createMissingNumberInputQuestion(difficulty) {
  const problem = generateMissingNumberProblem(difficulty);
  return createNumericInputQuestion({
    type: "math-input",
    difficulty,
    questionText: problem.questionText,
    displayText: problem.displayText,
    answer: problem.answer,
  });
}

function createMissingNumberChoiceQuestion(difficulty) {
  const problem = generateMissingNumberProblem(difficulty);
  return createNumericChoiceQuestion({
    type: "math-choice",
    difficulty,
    questionText: problem.questionText,
    displayText: problem.displayText,
    answer: problem.answer,
  });
}

function createDecimalOperationInputQuestion(difficulty) {
  const problem = generateDecimalOperationProblem(difficulty);
  return createNumericInputQuestion({
    type: "math-input",
    difficulty,
    questionText: "Solve the decimal problem.",
    displayText: `${problem.leftText} ${problem.operator} ${problem.rightText} =`,
    answer: problem.answer,
  });
}

function createDecimalOperationChoiceQuestion(difficulty) {
  const problem = generateDecimalOperationProblem(difficulty);
  return {
    type: "math-choice",
    difficulty,
    mode: "choice",
    questionText: "Solve the decimal problem.",
    displayText: `${problem.leftText} ${problem.operator} ${problem.rightText} =`,
    extraText: "",
    options: buildDecimalStringOptions(problem.answer, problem.digits),
    answerValue: formatDecimalNumber(problem.answer, problem.digits),
    answerLabel: formatDecimalNumber(problem.answer, problem.digits),
    isHebrew: false,
  };
}

function createPlaceValueInputQuestion(difficulty) {
  const problem = generatePlaceValueProblem(difficulty);
  return createNumericInputQuestion({
    type: "math-input",
    difficulty,
    questionText: `In ${problem.numberText}, what is the value of the digit ${problem.digit}?`,
    displayText: "",
    answer: problem.answer,
    answerLabel: formatGroupedNumber(problem.answer),
  });
}

function createPlaceValueChoiceQuestion(difficulty) {
  const problem = generatePlaceValueProblem(difficulty);
  return {
    type: "math-choice",
    difficulty,
    mode: "choice",
    questionText: `In ${problem.numberText}, what is the value of the digit ${problem.digit}?`,
    displayText: "",
    extraText: "",
    options: shuffleArray(problem.options.map(formatGroupedNumber)),
    answerValue: formatGroupedNumber(problem.answer),
    answerLabel: formatGroupedNumber(problem.answer),
    isHebrew: false,
  };
}

function createRoundingChoiceQuestion(difficulty) {
  const problem = generateRoundingProblem(difficulty);
  return {
    type: "math-choice",
    difficulty,
    mode: "choice",
    questionText: `Round ${formatGroupedNumber(problem.number)} to the nearest ${formatGroupedNumber(
      problem.placeValue
    )}.`,
    displayText: "",
    extraText: "",
    options: buildRoundingOptions(problem.answer, problem.placeValue).map(formatGroupedNumber),
    answerValue: formatGroupedNumber(problem.answer),
    answerLabel: formatGroupedNumber(problem.answer),
    isHebrew: false,
  };
}

function createDecimalComparisonChoiceQuestion(difficulty) {
  const problem = generateDecimalComparisonProblem(difficulty);
  return {
    type: "math-choice",
    difficulty,
    mode: "choice",
    questionText: `Which decimal is ${problem.askFor}?`,
    displayText: "",
    extraText: "",
    options: shuffleArray(problem.options),
    answerValue: problem.answer,
    answerLabel: problem.answer,
    isHebrew: false,
  };
}

function createRectangleMeasureInputQuestion(difficulty) {
  const problem = generateRectangleMeasureProblem(difficulty);
  return createNumericInputQuestion({
    type: "math-input",
    difficulty,
    questionText: problem.questionText,
    displayText: "",
    answer: problem.answer,
    answerLabel:
      problem.measure === "area"
        ? formatUnitCount(problem.answer, "square unit")
        : formatUnitCount(problem.answer, "unit"),
    acceptedAnswerSuffixes:
      problem.measure === "area"
        ? ["square unit", "square units", "unit squared", "units squared", "sq unit", "sq units"]
        : ["unit", "units"],
  });
}

function createRectangleMeasureChoiceQuestion(difficulty) {
  const problem = generateRectangleMeasureProblem(difficulty);
  return createNumericChoiceQuestion({
    type: "math-choice",
    difficulty,
    questionText: problem.questionText,
    displayText: "",
    answer: problem.answer,
  });
}

function createPrimeCompositeChoiceQuestion(difficulty) {
  const problem = generatePrimeCompositeProblem(difficulty);
  return {
    type: "math-choice",
    difficulty,
    mode: "choice",
    questionText: `Which number is ${problem.askFor}?`,
    displayText: "",
    extraText: "",
    options: shuffleArray(problem.options.map(String)),
    answerValue: String(problem.answer),
    answerLabel: String(problem.answer),
    isHebrew: false,
  };
}

function createSkipCountingChoiceQuestion(difficulty) {
  const config = {
    1: { steps: [2, 5, 10], maxStart: 30 },
    2: { steps: [2, 3, 4, 5, 10], maxStart: 50 },
    3: { steps: [2, 3, 4, 5, 6, 8, 10], maxStart: 80 },
    4: { steps: [3, 4, 5, 6, 7, 8, 9, 10, 12], maxStart: 120 },
    5: { steps: [4, 5, 6, 7, 8, 9, 10, 12, 15, 25], maxStart: 180 },
  }[difficulty];

  const step = randomChoice(config.steps);
  const start = randomInt(0, config.maxStart);
  const sequence = [start, start + step, start + step * 2, start + step * 3];
  const answer = start + step * 4;

  return createNumericChoiceQuestion({
    type: "math-choice",
    difficulty,
    questionText: `Skip count by ${step}. What comes next?`,
    displayText: `${sequence.join(", ")}, __`,
    answer,
  });
}

function createNumberPatternChoiceQuestion(difficulty) {
  const pattern = generateNumberPattern(difficulty);
  return createNumericChoiceQuestion({
    type: "math-choice",
    difficulty,
    questionText: "What number should come next in this pattern?",
    displayText: `${pattern.sequence.join(", ")}, __`,
    answer: pattern.answer,
  });
}

function createComparisonChoiceQuestion(difficulty) {
  const ranges = {
    1: { min: 0, max: 20, minGap: 2 },
    2: { min: 0, max: 100, minGap: 5 },
    3: { min: -20, max: 150, minGap: 8 },
    4: { min: -50, max: 300, minGap: 12 },
    5: { min: -100, max: 1000, minGap: 20 },
  }[difficulty];

  const askFor = randomChoice(["bigger", "smaller"]);
  const options = buildDistinctNumberList(4, ranges.min, ranges.max, ranges.minGap).map(String);
  const numbers = options.map(Number);
  const answer = askFor === "bigger" ? String(Math.max(...numbers)) : String(Math.min(...numbers));

  return {
    type: "math-choice",
    difficulty,
    mode: "choice",
    questionText: `Which number is ${askFor}?`,
    displayText: "",
    extraText: "",
    options: shuffleArray(options),
    answerValue: answer,
    answerLabel: answer,
    isHebrew: false,
  };
}

function createComparisonDragQuestion(difficulty) {
  const { left, right, answer } = generateComparisonDragProblem(difficulty);
  const leftText = formatGroupedNumber(left);
  const rightText = formatGroupedNumber(right);

  return {
    type: "math-drag",
    difficulty,
    mode: "drag",
    questionText: "Compare the numbers. Drag < or > into the middle bubble.",
    displayText: "",
    extraText: "",
    dragLayout: "comparison",
    dragPlaceholderText: "?",
    dragComparisonLeftText: leftText,
    dragComparisonRightText: rightText,
    dragTemplateParts: [`${leftText} `, ` ${rightText}`],
    dragChoices: shuffleArray(
      ["<", ">"].map((text, index) => ({
        id: `math-drag-${difficulty}-${index}-${text === "<" ? "lt" : "gt"}`,
        text,
      }))
    ),
    dragAnswerTokens: [answer],
    reviewText: `${leftText} ${answer} ${rightText}`,
    answerValue: answer,
    answerLabel: `${leftText} ${answer} ${rightText}`,
    isHebrew: false,
  };
}

function createMoneyInputQuestion(difficulty) {
  const { amount, price, answer } = generateMoneyProblem(difficulty);
  return createNumericInputQuestion({
    type: "math-input",
    difficulty,
    questionText: `You have ${amount} shekels. You buy something for ${price} shekels. How much change should you get?`,
    displayText: "",
    answer,
    answerLabel: `${answer} shekels`,
    acceptedAnswerPrefixes: ["₪"],
    acceptedAnswerSuffixes: ["shekel", "shekels"],
  });
}

function createMoneyChoiceQuestion(difficulty) {
  const { amount, price, answer } = generateMoneyProblem(difficulty);
  const spread = difficulty <= 2 ? 10 : difficulty <= 4 ? 20 : 35;
  const options = buildNumberOptions(answer, Math.max(0, answer - spread), answer + spread).map(
    (value) => `${value} shekels`
  );

  return {
    type: "math-choice",
    difficulty,
    mode: "choice",
    questionText: `You have ${amount} shekels. You buy something for ${price} shekels. How much change should you get?`,
    displayText: "",
    extraText: "",
    options,
    answerValue: `${answer} shekels`,
    answerLabel: `${answer} shekels`,
    isHebrew: false,
  };
}

function createPercentageInputQuestion(difficulty) {
  const { percent, whole, answer } = generatePercentageProblem(difficulty);
  return createNumericInputQuestion({
    type: "math-input",
    difficulty,
    questionText: `What is ${percent}% of ${whole}?`,
    displayText: "",
    answer,
  });
}

function createPercentageChoiceQuestion(difficulty) {
  const { percent, whole, answer } = generatePercentageProblem(difficulty);
  return createNumericChoiceQuestion({
    type: "math-choice",
    difficulty,
    questionText: `What is ${percent}% of ${whole}?`,
    displayText: "",
    answer,
  });
}

function createStatisticsChoiceQuestion(difficulty) {
  const generators = statisticsGeneratorsByDifficulty[difficulty] || statisticsGeneratorsByDifficulty[3];
  return randomChoice(generators)(difficulty);
}

function createStatisticsMiddleNumberQuestion(difficulty) {
  const config = {
    1: { count: 3, min: 1, max: 10, minGap: 1 },
    2: { count: 5, min: 1, max: 15, minGap: 1 },
    3: { count: 5, min: 2, max: 20, minGap: 1 },
    4: { count: 7, min: 3, max: 30, minGap: 2 },
    5: { count: 7, min: 5, max: 40, minGap: 3 },
  }[difficulty];

  const ordered = buildDistinctNumberList(config.count, config.min, config.max, config.minGap).sort(
    (left, right) => left - right
  );
  const answer = ordered[Math.floor(ordered.length / 2)];
  const shuffled = shuffleArray(ordered);

  return createNumericChoiceQuestion({
    type: "statistics-choice",
    difficulty,
    questionText: `The numbers are ${shuffled.join(", ")}. When you put them in order, what is the middle number?`,
    displayText: "",
    answer,
  });
}

function createStatisticsHighestNumberQuestion(difficulty) {
  return createStatisticsExtremeValueQuestion(difficulty, "highest");
}

function createStatisticsLowestNumberQuestion(difficulty) {
  return createStatisticsExtremeValueQuestion(difficulty, "lowest");
}

function createStatisticsExtremeValueQuestion(difficulty, kind) {
  const config = {
    1: { count: 3, min: 1, max: 10, minGap: 1 },
    2: { count: 4, min: 1, max: 15, minGap: 1 },
    3: { count: 5, min: 2, max: 20, minGap: 1 },
    4: { count: 5, min: 3, max: 30, minGap: 2 },
    5: { count: 6, min: 5, max: 40, minGap: 2 },
  }[difficulty];

  const values = buildDistinctNumberList(config.count, config.min, config.max, config.minGap);
  const answer = kind === "highest" ? Math.max(...values) : Math.min(...values);

  return createNumericChoiceQuestion({
    type: "statistics-choice",
    difficulty,
    questionText: `The numbers are ${shuffleArray(values).join(", ")}. What is the ${kind} number?`,
    displayText: "",
    answer,
  });
}

function createStatisticsMeanQuestion(difficulty) {
  const config = {
    1: { count: randomChoice([2, 3]), min: 1, max: 10, answerMin: 2, answerMax: 10 },
    2: { count: randomChoice([3, 4]), min: 1, max: 15, answerMin: 3, answerMax: 12 },
    3: { count: randomChoice([4, 5]), min: 2, max: 20, answerMin: 4, answerMax: 16 },
    4: { count: randomChoice([4, 5, 6]), min: 3, max: 25, answerMin: 5, answerMax: 18 },
    5: { count: randomChoice([5, 6]), min: 4, max: 30, answerMin: 6, answerMax: 22 },
  }[difficulty];

  const answer = randomInt(config.answerMin, config.answerMax);
  const values = buildWholeMeanDataset(answer, config.count, config.min, config.max);

  return createNumericChoiceQuestion({
    type: "statistics-choice",
    difficulty,
    questionText: `The numbers are ${values.join(", ")}. What is the mean?`,
    displayText: "",
    answer,
  });
}

function createStatisticsMedianQuestion(difficulty) {
  const config = {
    1: { count: 3, min: 1, max: 10, minGap: 1 },
    2: { count: 5, min: 1, max: 15, minGap: 1 },
    3: { count: 5, min: 2, max: 25, minGap: 2 },
    4: { count: 7, min: 3, max: 30, minGap: 2 },
    5: { count: 7, min: 5, max: 40, minGap: 3 },
  }[difficulty];

  const ordered = buildDistinctNumberList(config.count, config.min, config.max, config.minGap).sort(
    (left, right) => left - right
  );
  const answer = ordered[Math.floor(ordered.length / 2)];
  const shuffled = shuffleArray(ordered);

  return createNumericChoiceQuestion({
    type: "statistics-choice",
    difficulty,
    questionText: `The numbers are ${shuffled.join(", ")}. What is the median?`,
    displayText: "",
    answer,
  });
}

function createStatisticsModeQuestion(difficulty) {
  const config = {
    1: { min: 1, max: 10, listLength: 4 },
    2: { min: 1, max: 12, listLength: 5 },
    3: { min: 2, max: 15, listLength: 5 },
    4: { min: 3, max: 20, listLength: 6 },
    5: { min: 4, max: 24, listLength: 6 },
  }[difficulty];

  const answer = randomInt(config.min, config.max);
  const otherValues = buildDistinctNumberList(
    config.listLength - 2,
    config.min,
    config.max,
    1,
    new Set([answer])
  );
  const values = shuffleArray([answer, answer, ...otherValues]);

  return createNumericChoiceQuestion({
    type: "statistics-choice",
    difficulty,
    questionText: `The numbers are ${values.join(", ")}. What is the mode?`,
    displayText: "",
    answer,
  });
}

function createStatisticsRangeQuestion(difficulty) {
  const config = {
    1: { count: 4, min: 1, max: 12, answerMax: 8 },
    2: { count: 4, min: 1, max: 16, answerMax: 10 },
    3: { count: 5, min: 2, max: 25, answerMax: 14 },
    4: { count: 5, min: 4, max: 35, answerMax: 18 },
    5: { count: 6, min: 5, max: 45, answerMax: 24 },
  }[difficulty];

  const answer = randomInt(config.count - 1, config.answerMax);
  const low = randomInt(config.min, config.max - answer);
  const high = low + answer;
  const middle = buildDistinctNumberList(
    config.count - 2,
    low + 1,
    high - 1,
    1,
    new Set([low, high])
  );
  const values = shuffleArray([low, high, ...middle]);

  return createNumericChoiceQuestion({
    type: "statistics-choice",
    difficulty,
    questionText: `The numbers are ${values.join(", ")}. What is the range?`,
    displayText: "",
    answer,
  });
}

function createStatisticsDataQuestion(difficulty) {
  const categories = shuffleArray(["dogs", "cats", "fish", "birds"]).slice(0, 4);
  const maxCount = difficulty <= 2 ? 9 : difficulty <= 4 ? 14 : 20;
  const countValues = buildDistinctNumberList(4, 1, maxCount, 1);
  const counts = categories.map((category, index) => ({
    category,
    count: countValues[index],
  }));

  const askType = randomChoice(
    difficulty <= 2 ? ["most", "fewest", "total"] : ["most", "fewest", "total", "difference"]
  );

  if (askType === "most" || askType === "fewest") {
    const sorted = [...counts].sort((left, right) => left.count - right.count);
    const answer = askType === "most" ? sorted[sorted.length - 1].category : sorted[0].category;
    return {
      type: "statistics-choice",
      difficulty,
      mode: "choice",
      questionText: `A class counted pets: ${counts
        .map((entry) => `${capitalize(entry.category)} ${entry.count}`)
        .join(", ")}. Which pet was counted ${askType === "most" ? "the most" : "the fewest"}?`,
      displayText: "",
      extraText: "",
      options: shuffleArray(categories.map(capitalize)),
      answerValue: capitalize(answer),
      answerLabel: capitalize(answer),
      isHebrew: false,
    };
  }

  if (askType === "total") {
    const answer = counts.reduce((sum, entry) => sum + entry.count, 0);
    return createNumericChoiceQuestion({
      type: "statistics-choice",
      difficulty,
      questionText: `A class counted pets: ${counts
        .map((entry) => `${capitalize(entry.category)} ${entry.count}`)
        .join(", ")}. How many pets were counted in total?`,
      displayText: "",
      answer,
    });
  }

  const sorted = [...counts].sort((left, right) => right.count - left.count);
  const answer = sorted[0].count - sorted[1].count;
  return createNumericChoiceQuestion({
    type: "statistics-choice",
    difficulty,
    questionText: `A class counted pets: ${counts
      .map((entry) => `${capitalize(entry.category)} ${entry.count}`)
      .join(", ")}. How many more ${sorted[0].category} than ${sorted[1].category} were counted?`,
    displayText: "",
    answer,
  });
}

function createChartsAndGraphsQuestion(difficulty) {
  const generators =
    difficulty === 1
      ? [
          createBarMostQuestion,
          createBarFewestQuestion,
          createBarExactQuestion,
          createTableFewestQuestion,
          createTableMostQuestion,
          createTableExactQuestion,
          createBarTotalQuestion,
          createTableTotalQuestion,
        ]
      : difficulty <= 3
        ? [
            createBarMostQuestion,
            createBarFewestQuestion,
            createBarSecondMostQuestion,
            createBarExactQuestion,
            createBarTotalQuestion,
            createBarDifferenceQuestion,
            createTableFewestQuestion,
            createTableMostQuestion,
            createTableSecondMostQuestion,
            createTableExactQuestion,
            createTableTotalQuestion,
            createTableDifferenceQuestion,
          ]
        : [
            createBarMostQuestion,
            createBarFewestQuestion,
            createBarSecondMostQuestion,
            createBarExactQuestion,
            createBarTotalQuestion,
            createBarDifferenceQuestion,
            createTableFewestQuestion,
            createTableMostQuestion,
            createTableSecondMostQuestion,
            createTableExactQuestion,
            createTableTotalQuestion,
            createTableCombinedQuestion,
            createTableDifferenceQuestion,
          ];

  return randomChoice(generators)(difficulty);
}

function createBarMostQuestion(difficulty) {
  const dataset = buildChartDataset(difficulty, "bar");
  const answerItem = dataset.sortedByValue[dataset.sortedByValue.length - 1];

  return createVisualChoiceQuestion({
    type: "charts-and-graphs-choice",
    difficulty,
    questionText: buildChartQuestionText(dataset, "most"),
    visualHtml: renderBarChartVisual(dataset),
    visualSummary: dataset.summary,
    options: shuffleArray(dataset.items.map((item) => item.label)),
    answerValue: answerItem.label,
    answerLabel: answerItem.label,
  });
}

function createBarSecondMostQuestion(difficulty) {
  const dataset = buildChartDataset(difficulty, "bar");
  const answerItem = dataset.sortedByValue[dataset.sortedByValue.length - 2];

  return createVisualChoiceQuestion({
    type: "charts-and-graphs-choice",
    difficulty,
    questionText: buildChartQuestionText(dataset, "secondMost"),
    visualHtml: renderBarChartVisual(dataset),
    visualSummary: dataset.summary,
    options: shuffleArray(dataset.items.map((item) => item.label)),
    answerValue: answerItem.label,
    answerLabel: answerItem.label,
  });
}

function createBarFewestQuestion(difficulty) {
  const dataset = buildChartDataset(difficulty, "bar");
  const answerItem = dataset.sortedByValue[0];

  return createVisualChoiceQuestion({
    type: "charts-and-graphs-choice",
    difficulty,
    questionText: buildChartQuestionText(dataset, "fewest"),
    visualHtml: renderBarChartVisual(dataset),
    visualSummary: dataset.summary,
    options: shuffleArray(dataset.items.map((item) => item.label)),
    answerValue: answerItem.label,
    answerLabel: answerItem.label,
  });
}

function createBarExactQuestion(difficulty) {
  const dataset = buildChartDataset(difficulty, "bar");
  const answerItem = randomChoice(dataset.items);

  return createVisualChoiceQuestion({
    type: "charts-and-graphs-choice",
    difficulty,
    questionText: buildChartQuestionText(dataset, "exact", answerItem.label),
    visualHtml: renderBarChartVisual(dataset),
    visualSummary: dataset.summary,
    options: buildVisualNumberOptions(answerItem.value, difficulty),
    answerValue: String(answerItem.value),
    answerLabel: String(answerItem.value),
  });
}

function createBarTotalQuestion(difficulty) {
  const dataset = buildChartDataset(difficulty, "bar");
  const answer = dataset.items.reduce((sum, item) => sum + item.value, 0);

  return createVisualChoiceQuestion({
    type: "charts-and-graphs-choice",
    difficulty,
    questionText: buildChartQuestionText(dataset, "total"),
    visualHtml: renderBarChartVisual(dataset),
    visualSummary: dataset.summary,
    options: buildVisualNumberOptions(answer, difficulty, answer + 3),
    answerValue: String(answer),
    answerLabel: String(answer),
  });
}

function createBarDifferenceQuestion(difficulty) {
  const dataset = buildChartDataset(difficulty, "bar");
  const [smaller, larger] = [dataset.sortedByValue[0], dataset.sortedByValue[dataset.sortedByValue.length - 1]];
  const answer = larger.value - smaller.value;

  return createVisualChoiceQuestion({
    type: "charts-and-graphs-choice",
    difficulty,
    questionText: buildChartQuestionText(dataset, "difference", larger.label, smaller.label),
    visualHtml: renderBarChartVisual(dataset),
    visualSummary: dataset.summary,
    options: buildVisualNumberOptions(answer, difficulty),
    answerValue: String(answer),
    answerLabel: String(answer),
  });
}

function createTableMostQuestion(difficulty) {
  const dataset = buildChartDataset(difficulty, "table");
  const answerItem = dataset.sortedByValue[dataset.sortedByValue.length - 1];

  return createVisualChoiceQuestion({
    type: "charts-and-graphs-choice",
    difficulty,
    questionText: buildChartQuestionText(dataset, "most"),
    visualHtml: renderTableVisual(dataset),
    visualSummary: dataset.summary,
    options: shuffleArray(dataset.items.map((item) => item.label)),
    answerValue: answerItem.label,
    answerLabel: answerItem.label,
  });
}

function createTableSecondMostQuestion(difficulty) {
  const dataset = buildChartDataset(difficulty, "table");
  const answerItem = dataset.sortedByValue[dataset.sortedByValue.length - 2];

  return createVisualChoiceQuestion({
    type: "charts-and-graphs-choice",
    difficulty,
    questionText: buildChartQuestionText(dataset, "secondMost"),
    visualHtml: renderTableVisual(dataset),
    visualSummary: dataset.summary,
    options: shuffleArray(dataset.items.map((item) => item.label)),
    answerValue: answerItem.label,
    answerLabel: answerItem.label,
  });
}

function createTableFewestQuestion(difficulty) {
  const dataset = buildChartDataset(difficulty, "table");
  const answerItem = dataset.sortedByValue[0];

  return createVisualChoiceQuestion({
    type: "charts-and-graphs-choice",
    difficulty,
    questionText: buildChartQuestionText(dataset, "fewest"),
    visualHtml: renderTableVisual(dataset),
    visualSummary: dataset.summary,
    options: shuffleArray(dataset.items.map((item) => item.label)),
    answerValue: answerItem.label,
    answerLabel: answerItem.label,
  });
}

function createTableExactQuestion(difficulty) {
  const dataset = buildChartDataset(difficulty, "table");
  const answerItem = randomChoice(dataset.items);

  return createVisualChoiceQuestion({
    type: "charts-and-graphs-choice",
    difficulty,
    questionText: buildChartQuestionText(dataset, "exact", answerItem.label),
    visualHtml: renderTableVisual(dataset),
    visualSummary: dataset.summary,
    options: buildVisualNumberOptions(answerItem.value, difficulty),
    answerValue: String(answerItem.value),
    answerLabel: String(answerItem.value),
  });
}

function createTableTotalQuestion(difficulty) {
  const dataset = buildChartDataset(difficulty, "table");
  const answer = dataset.items.reduce((sum, item) => sum + item.value, 0);

  return createVisualChoiceQuestion({
    type: "charts-and-graphs-choice",
    difficulty,
    questionText: buildChartQuestionText(dataset, "total"),
    visualHtml: renderTableVisual(dataset),
    visualSummary: dataset.summary,
    options: buildVisualNumberOptions(answer, difficulty, answer + 4),
    answerValue: String(answer),
    answerLabel: String(answer),
  });
}

function createTableCombinedQuestion(difficulty) {
  const dataset = buildChartDataset(difficulty, "table");
  const pair = shuffleArray([...dataset.items]).slice(0, 2);
  const answer = pair[0].value + pair[1].value;

  return createVisualChoiceQuestion({
    type: "charts-and-graphs-choice",
    difficulty,
    questionText: buildChartQuestionText(dataset, "combined", pair[0].label, pair[1].label),
    visualHtml: renderTableVisual(dataset),
    visualSummary: dataset.summary,
    options: buildVisualNumberOptions(answer, difficulty, answer + 5),
    answerValue: String(answer),
    answerLabel: String(answer),
  });
}

function createTableDifferenceQuestion(difficulty) {
  const dataset = buildChartDataset(difficulty, "table");
  const pair = shuffleArray([...dataset.items]).slice(0, 2).sort((left, right) => right.value - left.value);
  const answer = pair[0].value - pair[1].value;

  return createVisualChoiceQuestion({
    type: "charts-and-graphs-choice",
    difficulty,
    questionText: buildChartQuestionText(dataset, "difference", pair[0].label, pair[1].label),
    visualHtml: renderTableVisual(dataset),
    visualSummary: dataset.summary,
    options: buildVisualNumberOptions(answer, difficulty),
    answerValue: String(answer),
    answerLabel: String(answer),
  });
}

function buildChartDataset(difficulty, visualType) {
  const template = randomChoice(
    visualType === "bar" ? CHART_BAR_TEMPLATES : CHART_TABLE_TEMPLATES
  );
  const config = {
    1: { min: 1, max: 6 },
    2: { min: 2, max: 8 },
    3: { min: 3, max: 12 },
    4: { min: 4, max: 18 },
    5: { min: 5, max: 24 },
  }[difficulty];
  const values = buildDistinctNumberList(template.labels.length, config.min, config.max, 1);
  const items = template.labels.map((label, index) => ({
    label,
    value: values[index],
  }));

  return {
    ...template,
    items,
    visualType,
    sortedByValue: [...items].sort((left, right) => left.value - right.value),
    summary: buildChartSummary(template, items),
  };
}

function buildChartQuestionText(dataset, promptName, ...args) {
  const promptBuilder = dataset.prompts?.[promptName];
  if (typeof promptBuilder !== "function") {
    throw new Error(`Missing chart prompt: ${promptName}`);
  }

  const visualName = dataset.visualType === "bar" ? "graph" : "table";
  return `Look at the ${visualName}. ${promptBuilder(...args)}`;
}

function buildChartSummary(template, items) {
  if (typeof template.summaryItem === "function") {
    return `${template.title}: ${items.map((item) => template.summaryItem(item)).join(", ")}`;
  }

  return `${template.title}: ${items.map((item) => `${item.label} ${item.value}`).join(", ")}`;
}

function renderBarChartVisual(dataset) {
  const maxValue = Math.max(...dataset.items.map((item) => item.value));
  const rows = dataset.items
    .map((item, index) => {
      const width = Math.max(18, Math.round((item.value / maxValue) * 100));
      return `
        <div class="visual-bar-row">
          <span class="visual-bar-label">${escapeHtml(item.label)}</span>
          <span class="visual-bar-track">
            <span class="visual-bar-fill visual-bar-fill-${index % 4}" style="width:${width}%"></span>
          </span>
          <span class="visual-bar-value">${item.value}</span>
        </div>
      `;
    })
    .join("");

  return `
    <div class="visual-card">
      <div class="visual-card-title">${escapeHtml(dataset.title)}</div>
      <div class="visual-bar-chart">${rows}</div>
    </div>
  `;
}

function renderTableVisual(dataset) {
  const rows = dataset.items
    .map(
      (item) => `
        <tr>
          <th scope="row">${escapeHtml(item.label)}</th>
          <td>${item.value}</td>
        </tr>
      `
    )
    .join("");

  return `
    <div class="visual-card">
      <div class="visual-card-title">${escapeHtml(dataset.title)}</div>
      <table class="visual-table">
        <thead>
          <tr>
            <th>${escapeHtml(dataset.leftLabel)}</th>
            <th>${escapeHtml(dataset.rightLabel)}</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function createHebrewChoiceQuestion(entry) {
  return {
    type: "hebrew-choice",
    difficulty: entry.difficulty,
    mode: "choice",
    questionText: "What does this Hebrew word mean?",
    displayText: entry.hebrewDisplay,
    extraText: "",
    extraHtml: "",
    options: buildHebrewOptions(entry.english),
    answerValue: entry.english,
    answerLabel: entry.english,
    reviewText: entry.hebrewDisplay,
    isHebrew: true,
  };
}

function shouldCreateHebrewFinalLetterQuestion(hebrewQuestionIndex) {
  return HEBREW_FINAL_LETTER_INTERVAL > 0 && (hebrewQuestionIndex + 1) % HEBREW_FINAL_LETTER_INTERVAL === 0;
}

function createHebrewSessionQuestion(resources, difficulty, runtime) {
  const startIndex = Number(runtime?.hebrewStandardQuestionIndex || 0);
  if (runtime) {
    runtime.hebrewStandardQuestionIndex = startIndex + 1;
  }

  const factories = [
    () => createHebrewReverseChoiceQuestion(resources, difficulty),
    () => createHebrewAgreementQuestion(difficulty),
    () => createHebrewCategorySortQuestion(difficulty),
    () => createHebrewNikkudContrastQuestion(resources, difficulty),
    () => maybeCreateHebrewImageQuestion(resources, difficulty),
    () => createHebrewChoiceQuestion(drawHebrewEntry(resources.hebrew, difficulty)),
  ];

  for (let offset = 0; offset < factories.length; offset += 1) {
    const question = factories[(startIndex + offset) % factories.length]();
    if (question) {
      return question;
    }
  }

  return createHebrewChoiceQuestion(drawHebrewEntry(resources.hebrew, difficulty));
}

function createHebrewChoiceModeQuestion({
  difficulty,
  questionText,
  displayText = "",
  extraText = "",
  visualHtml = "",
  visualSummary = "",
  options,
  answer,
  answerLabel = answer,
  reviewText = "",
  forceCompactMain = false,
  isHebrewMain = false,
}) {
  const normalizedOptions = Array.from(new Set((options || []).map((option) => String(option).trim()))).filter(Boolean);
  const normalizedAnswer = String(answer || "").trim();
  if (normalizedOptions.length !== 4 || !normalizedAnswer || !normalizedOptions.includes(normalizedAnswer)) {
    return null;
  }

  return {
    type: "hebrew-choice",
    difficulty,
    mode: "choice",
    questionText,
    displayText,
    extraText,
    extraHtml: "",
    visualHtml,
    visualSummary,
    reviewText,
    options: shuffleArray([...normalizedOptions]),
    answerValue: normalizedAnswer,
    answerLabel: String(answerLabel || normalizedAnswer),
    forceCompactMain,
    isHebrew: Boolean(isHebrewMain),
  };
}

function createHebrewTargetsDragQuestion({
  difficulty,
  questionText,
  extraText = "",
  visualSummary = "",
  targets,
  answer,
  choices,
  reviewText = "",
  answerLabel = "",
  dragPlaceholderText = "",
}) {
  const normalizedTargets = Array.isArray(targets)
    ? targets
        .map((target) => ({
          html: typeof target?.html === "string" ? target.html : "",
          reviewLabel: applyHebrewSentenceNikkud(String(target?.reviewLabel || "").trim()),
        }))
        .filter((target) => target.html || target.reviewLabel)
    : [];
  const normalizedAnswer = Array.isArray(answer)
    ? answer
        .map((item) => applyHebrewSentenceNikkud(String(item).trim()))
        .filter(Boolean)
    : [];
  const normalizedChoices = Array.from(
    new Set([...(choices || []).map((item) => applyHebrewSentenceNikkud(String(item).trim())), ...normalizedAnswer])
  ).filter(Boolean);

  if (
    !questionText ||
    normalizedTargets.length !== normalizedAnswer.length ||
    normalizedChoices.length < normalizedAnswer.length
  ) {
    return null;
  }

  return {
    type: "hebrew-drag",
    difficulty,
    mode: "drag",
    questionText: applyHebrewSentenceNikkud(questionText),
    displayText: "",
    extraText: applyHebrewSentenceNikkud(extraText),
    extraHtml: "",
    visualHtml: "",
    visualSummary,
    dragLayout: "targets",
    dragTargetArrangement: "rows",
    dragTargets: normalizedTargets,
    dragChoices: shuffleArray(
      normalizedChoices.map((text, index) => ({
        id: `hebrew-targets-${difficulty}-${index}-${text}`,
        text,
      }))
    ),
    dragAnswerTokens: normalizedAnswer,
    dragPlaceholderText: applyHebrewSentenceNikkud(dragPlaceholderText),
    reviewText: applyHebrewSentenceNikkud(reviewText),
    answerValue: normalizedAnswer.join(" | "),
    answerLabel:
      applyHebrewSentenceNikkud(answerLabel) ||
      normalizedTargets
        .map((target, index) => `${target.reviewLabel || `Word ${index + 1}`}: ${normalizedAnswer[index]}`)
        .join(" | "),
    isHebrew: true,
  };
}

function createHebrewBucketsDragQuestion({
  difficulty,
  questionText,
  extraText = "",
  visualSummary = "",
  buckets,
  reviewText = "",
  dragPlaceholderText = "",
}) {
  const normalizedBuckets = Array.isArray(buckets)
    ? buckets
        .map((bucket) => ({
          label: applyHebrewSentenceNikkud(String(bucket?.label || "").trim()),
          answers: Array.isArray(bucket?.answers)
            ? bucket.answers.map((item) => applyHebrewSentenceNikkud(String(item).trim())).filter(Boolean)
            : [],
        }))
        .filter((bucket) => bucket.label && bucket.answers.length)
    : [];
  const flatAnswers = normalizedBuckets.flatMap((bucket) => bucket.answers);

  if (!questionText || !normalizedBuckets.length || !flatAnswers.length) {
    return null;
  }

  return {
    type: "hebrew-drag",
    difficulty,
    mode: "drag",
    questionText: applyHebrewSentenceNikkud(questionText),
    displayText: "",
    extraText: applyHebrewSentenceNikkud(extraText),
    extraHtml: "",
    visualHtml: "",
    visualSummary,
    dragLayout: "buckets",
    dragBucketColumns: normalizedBuckets,
    dragChoices: shuffleArray(
      flatAnswers.map((text, index) => ({
        id: `hebrew-bucket-${difficulty}-${index}-${text}`,
        text,
      }))
    ),
    dragAnswerTokens: flatAnswers,
    dragPlaceholderText: applyHebrewSentenceNikkud(dragPlaceholderText),
    reviewText: applyHebrewSentenceNikkud(reviewText),
    answerValue: flatAnswers.join(" | "),
    answerLabel: normalizedBuckets.map((bucket) => `${bucket.label}: ${bucket.answers.join(", ")}`).join(" | "),
    isHebrew: true,
  };
}

function getEntriesAtOrBelowDifficulty(entries, difficulty) {
  const exact = entries.filter((entry) => entry.difficulty === difficulty);
  if (exact.length) {
    return exact;
  }

  const eligible = entries.filter((entry) => entry.difficulty <= difficulty);
  return eligible.length ? eligible : entries;
}

function getPoolEntriesAtOrBelowDifficulty(pool, difficulty) {
  const exact = pool?.entriesByDifficulty?.get(difficulty) || [];
  if (exact.length) {
    return exact;
  }

  const eligible = (pool?.entries || []).filter((entry) => entry.difficulty <= difficulty);
  return eligible.length ? eligible : pool?.entries || [];
}

function drawPoolEntryAtOrBelowDifficulty(pool, difficulty, queueKeyPrefix) {
  const source = getPoolEntriesAtOrBelowDifficulty(pool, difficulty);
  if (!source.length) {
    return null;
  }

  const queueKey = `${queueKeyPrefix}-${difficulty}`;
  let queue = pool.queuesByDifficulty.get(queueKey);
  if (!queue || !queue.length) {
    queue = shuffleArray([...source]);
    pool.queuesByDifficulty.set(queueKey, queue);
  }

  return queue.pop() || null;
}

function getHebrewDisplayWord(word) {
  const rawWord = String(word || "").trim();
  if (!rawWord) {
    return "";
  }

  if (HEBREW_POINTED_WORD_LOOKUP.has(rawWord)) {
    return HEBREW_POINTED_WORD_LOOKUP.get(rawWord);
  }

  return rawWord;
}

function createHebrewReverseChoiceQuestion(resources, difficulty) {
  const entry = drawPoolEntryAtOrBelowDifficulty(resources?.hebrewReverse, difficulty, "hebrew-reverse");
  if (!entry) {
    return null;
  }

  const options = buildHebrewReverseOptions(entry, resources?.hebrewReverse, difficulty);
  return createHebrewChoiceModeQuestion({
    difficulty: entry.difficulty,
    questionText: "Which Hebrew word matches this English word?",
    displayText: entry.english,
    options,
    answer: entry.hebrewDisplay,
    answerLabel: entry.hebrewDisplay,
    reviewText: `${entry.english}: ${entry.hebrewDisplay}`,
  });
}

function buildHebrewReverseOptions(correctEntry, pool, difficulty) {
  const options = [correctEntry.hebrewDisplay];
  const seenDisplays = new Set(options);
  const seenMeanings = new Set([getChoiceMeaningKey(correctEntry.english)]);
  const candidateLists = [
    getPoolEntriesAtOrBelowDifficulty(pool, difficulty),
    (pool?.entries || []).filter((entry) => entry.difficulty <= difficulty),
    pool?.entries || [],
  ];

  candidateLists.forEach((candidateList) => {
    shuffleArray([...candidateList]).forEach((entry) => {
      if (options.length >= 4) {
        return;
      }

      const meaningKey = getChoiceMeaningKey(entry.english);
      if (seenDisplays.has(entry.hebrewDisplay) || seenMeanings.has(meaningKey)) {
        return;
      }

      seenDisplays.add(entry.hebrewDisplay);
      seenMeanings.add(meaningKey);
      options.push(entry.hebrewDisplay);
    });
  });

  return options.length === 4 ? options : null;
}

function createHebrewNikkudContrastQuestion(resources, difficulty) {
  const entry = drawPoolEntryAtOrBelowDifficulty(resources?.hebrewHomograph, difficulty, "hebrew-homograph");
  if (!entry) {
    return null;
  }

  const options = buildHebrewNikkudOptions(entry, resources?.hebrewHomograph, difficulty);
  return createHebrewChoiceModeQuestion({
    difficulty: entry.difficulty,
    questionText: `Which pointed Hebrew word means "${entry.english}"?`,
    displayText: entry.strippedHebrew,
    extraText: "The same letters can change meaning when the nikkud changes.",
    options,
    answer: entry.hebrewDisplay,
    answerLabel: entry.hebrewDisplay,
    reviewText: `${entry.strippedHebrew}: ${entry.hebrewDisplay} = ${entry.english}`,
    isHebrewMain: true,
  });
}

function buildHebrewNikkudOptions(correctEntry, pool, difficulty) {
  const options = [correctEntry.hebrewDisplay];
  const seen = new Set(options);
  const siblingOptions = correctEntry.family
    .filter((entry) => entry.hebrewDisplay !== correctEntry.hebrewDisplay)
    .map((entry) => entry.hebrewDisplay);

  siblingOptions.forEach((option) => {
    if (!seen.has(option) && options.length < 4) {
      seen.add(option);
      options.push(option);
    }
  });

  const candidateLists = [
    getPoolEntriesAtOrBelowDifficulty(pool, difficulty).filter(
      (entry) => entry.strippedHebrew !== correctEntry.strippedHebrew
    ),
    (pool?.entries || []).filter((entry) => entry.strippedHebrew !== correctEntry.strippedHebrew),
  ];

  candidateLists.forEach((candidateList) => {
    shuffleArray([...candidateList]).forEach((entry) => {
      if (options.length >= 4 || seen.has(entry.hebrewDisplay)) {
        return;
      }

      seen.add(entry.hebrewDisplay);
      options.push(entry.hebrewDisplay);
    });
  });

  return options.length === 4 ? options : null;
}

function createHebrewAgreementQuestion(difficulty) {
  const blueprint = randomChoice(getEntriesAtOrBelowDifficulty(HEBREW_AGREEMENT_BLUEPRINTS, difficulty));
  if (!blueprint) {
    return null;
  }

  const displayText = applyHebrewSentenceNikkud(blueprint.displayText);
  const options = blueprint.options.map((option) => applyHebrewSentenceNikkud(option));
  const answer = applyHebrewSentenceNikkud(blueprint.answer);

  return createHebrewChoiceModeQuestion({
    difficulty: blueprint.difficulty,
    questionText: "Choose the Hebrew word that completes the sentence.",
    displayText,
    options,
    answer,
    answerLabel: answer,
    reviewText: applyHebrewSentenceNikkud(blueprint.reviewText),
    forceCompactMain: true,
    isHebrewMain: true,
  });
}

function createHebrewCategorySortQuestion(difficulty) {
  const config = HEBREW_CATEGORY_SORT_LEVEL_CONFIG[difficulty] || HEBREW_CATEGORY_SORT_LEVEL_CONFIG[3];
  const buckets = config.labels
    .map((label) => HEBREW_CATEGORY_SORT_GROUPS.find((group) => group.label === label))
    .filter(Boolean)
    .map((group) => ({
      label: group.label,
      answers: shuffleArray(group.words.map((word) => getHebrewDisplayWord(word))).slice(
        0,
        config.itemsPerBucket
      ),
    }));

  return createHebrewBucketsDragQuestion({
    difficulty,
    questionText: "Sort the Hebrew words into the correct categories.",
    extraText: "Each bucket is a Hebrew category.",
    visualSummary: buckets.map((bucket) => bucket.label).join(", "),
    buckets,
    reviewText: "Sort the Hebrew words by category.",
    dragPlaceholderText: "גררו לכאן",
  });
}

function createHebrewFinalLetterQuestion(difficulty) {
  const drill = randomChoice(getEntriesAtOrBelowDifficulty(HEBREW_FINAL_LETTER_DRILLS, difficulty));
  if (!drill) {
    return null;
  }

  const middleMaskedWord = buildMaskedHebrewWord(drill.middleWord, drill.middleLetter, false);
  const finalMaskedWord = buildMaskedHebrewWord(drill.finalWord, drill.finalLetter, true);
  if (!middleMaskedWord || !finalMaskedWord) {
    return null;
  }

  return createHebrewTargetsDragQuestion({
    difficulty: drill.difficulty,
    questionText: "Drag the correct Hebrew letter to each word.",
    extraText: `${drill.middleLetter} belongs in the middle of a word. ${drill.finalLetter} belongs at the end.`,
    visualSummary: `${getHebrewDisplayWord(drill.middleWord)} | ${getHebrewDisplayWord(drill.finalWord)}`,
    targets: [
      {
        html: buildHebrewLetterTargetHtml(middleMaskedWord, "באמצע"),
        reviewLabel: getHebrewDisplayWord(drill.middleWord),
      },
      {
        html: buildHebrewLetterTargetHtml(finalMaskedWord, "בסוף"),
        reviewLabel: getHebrewDisplayWord(drill.finalWord),
      },
    ],
    answer: [drill.middleLetter, drill.finalLetter],
    choices: [drill.middleLetter, drill.finalLetter],
    reviewText: `${getHebrewDisplayWord(drill.middleWord)} | ${getHebrewDisplayWord(drill.finalWord)}`,
    answerLabel: `${getHebrewDisplayWord(drill.middleWord)} | ${getHebrewDisplayWord(drill.finalWord)}`,
    dragPlaceholderText: "אות",
  });
}

function buildMaskedHebrewWord(word, expectedLetter, useFinalPosition) {
  const letters = Array.from(String(word || "").trim());
  if (!letters.length) {
    return "";
  }

  if (useFinalPosition) {
    const lastIndex = letters.length - 1;
    if (letters[lastIndex] !== expectedLetter) {
      return "";
    }

    letters[lastIndex] = "□";
    return letters.join("");
  }

  const maskIndex = findHebrewLetterMaskIndex(letters, expectedLetter);
  if (maskIndex === -1) {
    return "";
  }

  letters[maskIndex] = "□";
  return letters.join("");
}

function findHebrewLetterMaskIndex(letters, expectedLetter) {
  const innerIndexes = [];
  const fallbackIndexes = [];

  letters.forEach((letter, index) => {
    if (letter !== expectedLetter) {
      return;
    }

    if (index > 0 && index < letters.length - 1) {
      innerIndexes.push(index);
    } else if (index < letters.length - 1) {
      fallbackIndexes.push(index);
    }
  });

  if (innerIndexes.length) {
    return innerIndexes[Math.floor(innerIndexes.length / 2)];
  }

  return fallbackIndexes.length ? fallbackIndexes[0] : -1;
}

function buildHebrewLetterTargetHtml(maskedWord, hintLabel) {
  return `
    <div class="hebrew-letter-target">
      <div class="hebrew-letter-target-word" dir="rtl">${escapeHtml(maskedWord)}</div>
      <div class="hebrew-letter-target-hint">${escapeHtml(hintLabel)}</div>
    </div>
  `;
}

function createHebrewReadingComprehensionQuestion(difficulty) {
  const blueprint = randomChoice(getEntriesAtOrBelowDifficulty(HEBREW_READING_BLUEPRINTS, difficulty));
  if (!blueprint) {
    return null;
  }

  const pointedLines = applyHebrewSentenceNikkudList(blueprint.lines);
  const pointedPassage = pointedLines.join(" ");
  const pointedOptions = blueprint.options.map((option) => applyHebrewSentenceNikkud(option));
  const pointedAnswer = applyHebrewSentenceNikkud(blueprint.answer);
  return createHebrewChoiceModeQuestion({
    difficulty: blueprint.difficulty,
    questionText: applyHebrewSentenceNikkud(blueprint.question),
    visualHtml: buildHebrewReadingCard(pointedLines, blueprint.images),
    visualSummary: pointedPassage,
    options: pointedOptions,
    answer: pointedAnswer,
    answerLabel: pointedAnswer,
    reviewText: pointedPassage,
  });
}

function buildHebrewReadingCard(lines, images = []) {
  const pointedLines = applyHebrewSentenceNikkudList(lines);
  const paragraphs = pointedLines
    .map((line) => `<p class="hebrew-reading-line">${escapeHtml(line)}</p>`)
    .join("");
  const imageStrip = Array.isArray(images) && images.length ? buildHebrewReadingImagesHtml(images) : "";

  return `
    <div class="hebrew-reading-card">
      <div class="hebrew-reading-title">קטע קריאה</div>
      <div class="hebrew-reading-lines" dir="rtl">${paragraphs}</div>
      ${imageStrip}
    </div>
  `;
}

function buildHebrewReadingImagesHtml(images) {
  const cards = images
    .map((image) => {
      const asset = String(image?.asset || "").trim();
      if (!asset) {
        return "";
      }

      return `
        <div class="hebrew-reading-image-chip">
          <img
            class="hebrew-reading-image"
            src="app/assets/hebrew-images/${escapeHtml(asset)}"
            alt="${escapeHtml(String(image?.alt || ""))}"
            loading="lazy"
            decoding="async"
          >
        </div>
      `;
    })
    .filter(Boolean)
    .join("");

  return cards ? `<div class="hebrew-reading-images">${cards}</div>` : "";
}

function createHebrewWritingPracticeQuestion(targetText, difficulty, variant) {
  const rawText = String(targetText || "").trim();
  const displayText = applyHebrewSentenceNikkud(rawText);
  const visualText = stripHebrewDiacritics(rawText).trim();
  const showKtavYadExample = Number(difficulty) <= 3;
  const variantLabelMap = {
    letter: "letter",
    word: "word",
    "short-sentence": "sentence",
    "long-sentence": "sentence",
  };
  const label = variantLabelMap[variant] || "text";

  return {
    type: "hebrew-writing",
    difficulty,
    mode: "practice",
    questionText: `Write this Hebrew ${label} in cursive / ktav yad.`,
    displayText,
    extraText: "",
    extraHtml: "",
    visualHtml: showKtavYadExample ? buildHebrewWritingPracticeVisual(visualText, variant) : "",
    visualSummary: showKtavYadExample ? `Ktav yad practice target: ${visualText}` : "",
    reviewText: displayText,
    answerValue: "done",
    answerLabel: "Parents must check your writing.",
    completionValue: "Done",
    actionLabel: "Mark Done",
    successMessage: "Marked done. Parents must check your writing.",
    forceCompactMain: variant === "short-sentence" || variant === "long-sentence",
    isHebrew: true,
  };
}

function buildHebrewWritingPracticeVisual(targetText, variant) {
  if (variant === "letter") {
    return `
      <div class="ktav-yad-card letter">
        <div class="ktav-yad-heading">Ktav yad example</div>
        <div class="ktav-yad-comparison">
          <div class="ktav-yad-chip">
            <div class="ktav-yad-chip-label">Print</div>
            <div class="ktav-yad-chip-value print" dir="rtl">${escapeHtml(targetText)}</div>
          </div>
          <div class="ktav-yad-chip">
            <div class="ktav-yad-chip-label">Ktav yad</div>
            <div class="ktav-yad-chip-value script" dir="rtl">${escapeHtml(targetText)}</div>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="ktav-yad-card">
      <div class="ktav-yad-heading">Ktav yad example</div>
      <div class="ktav-yad-script${variant === "long-sentence" ? " long" : ""}" dir="rtl">
        ${escapeHtml(targetText)}
      </div>
    </div>
  `;
}

function createHebrewImageDragQuestion(entries, difficulty) {
  const selectedEntries = Array.isArray(entries) ? entries.slice(0, 3) : [];
  if (selectedEntries.length !== 3) {
    return null;
  }

  const answerTokens = selectedEntries.map((entry) => entry.hebrewDisplay);
  const answerLabel = selectedEntries
    .map((entry) => `${entry.english}: ${entry.hebrewDisplay}`)
    .join(" | ");

  return {
    type: "hebrew-drag",
    difficulty,
    mode: "drag",
    questionText: "Drag each Hebrew word to the matching picture.",
    displayText: "",
    extraText: "",
    extraHtml: "",
    visualHtml: "",
    visualSummary: `Pictures: ${selectedEntries.map((entry) => entry.english).join(", ")}`,
    dragLayout: "targets",
    dragTargetArrangement: "rows",
    dragTargets: selectedEntries.map((entry) => ({
      html: buildHebrewImageTargetHtml(entry),
      reviewLabel: entry.english,
    })),
    dragChoices: shuffleArray(
      selectedEntries.map((entry, index) => ({
        id: `hebrew-image-${difficulty}-${index}-${stripHebrewDiacritics(entry.hebrew)}`,
        text: entry.hebrewDisplay,
      }))
    ),
    dragAnswerTokens: answerTokens,
    dragPlaceholderText: "Drop word here",
    reviewText: answerLabel,
    answerValue: answerTokens.join(" | "),
    answerLabel,
    isHebrew: true,
  };
}

function buildHebrewImageTargetHtml(entry) {
  return `
    <div class="hebrew-image-target">
      <img
        class="hebrew-image-target-image"
        src="${escapeHtml(entry.imageSrc)}"
        alt="${escapeHtml(entry.imageAlt)}"
        loading="lazy"
        decoding="async"
      >
    </div>
  `;
}

function createBankChoiceQuestion(entry, type) {
  return {
    type,
    difficulty: entry.difficulty,
    mode: "choice",
    questionText: entry.question,
    displayText: entry.displayText || "",
    extraText: entry.extraText || "",
    extraHtml: entry.extraHtml || "",
    visualHtml: entry.visualHtml || "",
    visualSummary: entry.visualSummary || "",
    reviewText: entry.reviewText || "",
    options: shuffleArray([...entry.options]),
    answerValue: entry.answer,
    answerLabel: entry.answer,
    isHebrew: false,
  };
}

function createBankDragQuestion(entry, type) {
  const isHebrew = Boolean(entry.isHebrew);
  const questionText = isHebrew ? applyHebrewSentenceNikkud(entry.question) : entry.question;
  const dragTemplateParts = isHebrew
    ? applyHebrewSentenceNikkudList(entry.templateParts)
    : [...entry.templateParts];
  const dragAnswerTokens = isHebrew
    ? applyHebrewSentenceNikkudList(entry.answer)
    : [...entry.answer];

  return {
    type,
    difficulty: entry.difficulty,
    mode: "drag",
    questionText: isHebrew && shouldHideHebrewDragPrompt(questionText) ? "" : questionText,
    displayText: "",
    extraText: isHebrew ? applyHebrewSentenceNikkud(entry.extraText || "") : entry.extraText || "",
    dragTemplateParts,
    dragChoices: shuffleArray(
      entry.choices.map((text, index) => ({
        id: `${type}-${entry.difficulty}-${index}-${text}`,
        text: isHebrew ? applyHebrewSentenceNikkud(text) : text,
      }))
    ),
    dragAnswerTokens,
    reviewText: isHebrew
      ? buildFilledDragText(dragTemplateParts, dragAnswerTokens)
      : entry.reviewText || buildDragTemplateText(entry.templateParts),
    answerValue: dragAnswerTokens.join(" | "),
    answerLabel: buildFilledDragText(dragTemplateParts, dragAnswerTokens),
    isHebrew,
  };
}

function createGeneratedCategoryQuestion(category, difficulty) {
  const config = generatedChoiceCategoryConfigs[category];
  if (!config?.factory || Math.random() >= config.share) {
    return null;
  }

  try {
    const normalizedEntry = normalizeChoiceBankEntry(config.factory(difficulty), `${category}-choice`);
    return normalizedEntry ? createBankChoiceQuestion(normalizedEntry, `${category}-choice`) : null;
  } catch {
    return null;
  }
}

function createTimeChoiceQuestion(difficulty) {
  const config = {
    1: { minutes: [5, 10, 15, 30], hours: [7, 18], crossHour: false },
    2: { minutes: [5, 10, 15, 20, 30], hours: [7, 19], crossHour: true },
    3: { minutes: [15, 20, 30, 45, 60], hours: [7, 20], crossHour: true },
    4: { minutes: [20, 25, 35, 45, 60, 75, 90], hours: [6, 21], crossHour: true },
    5: { minutes: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 75, 90, 105, 120], hours: [6, 21], crossHour: true },
  }[difficulty];

  let startMinutes = randomInt(config.hours[0], config.hours[1]) * 60 + randomChoice([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);
  const minutesToAdd = randomChoice(config.minutes);

  if (!config.crossHour) {
    startMinutes = Math.floor(startMinutes / 60) * 60 + randomChoice([0, 5, 10, 15, 20, 25]);
  }

  const answerMinutes = startMinutes + minutesToAdd;
  const correctTime = formatClockTime(answerMinutes);
  const optionMinutes = buildTimeOptions(answerMinutes);

  return {
    type: "time-choice",
    difficulty,
    mode: "choice",
    questionText: `It's ${formatClockTime(startMinutes)}. In ${minutesToAdd} minutes, what time will it be?`,
    displayText: "",
    extraText: "",
    reviewText: "",
    options: optionMinutes.map((value) => formatClockTime(value)),
    answerValue: correctTime,
    answerLabel: correctTime,
    isHebrew: false,
  };
}

function createNumericInputQuestion({
  type,
  difficulty,
  questionText,
  displayText,
  answer,
  answerLabel = null,
  acceptedAnswerPrefixes = [],
  acceptedAnswerSuffixes = [],
}) {
  return {
    type,
    difficulty,
    mode: "input",
    questionText,
    displayText,
    extraText: "",
    reviewText: "",
    answerValue: answer,
    answerLabel: answerLabel ?? String(answer),
    acceptedAnswerPrefixes: Array.isArray(acceptedAnswerPrefixes)
      ? acceptedAnswerPrefixes.map(String).filter(Boolean)
      : [],
    acceptedAnswerSuffixes: Array.isArray(acceptedAnswerSuffixes)
      ? acceptedAnswerSuffixes.map(String).filter(Boolean)
      : [],
    isHebrew: false,
  };
}

function createNumericChoiceQuestion({ type, difficulty, questionText, displayText, answer }) {
  return {
    type,
    difficulty,
    mode: "choice",
    questionText,
    displayText,
    extraText: "",
    reviewText: "",
    options: buildNumberOptions(answer).map(String),
    answerValue: String(answer),
    answerLabel: String(answer),
    isHebrew: false,
  };
}

function createVisualChoiceQuestion({
  type,
  difficulty,
  questionText,
  visualHtml,
  visualSummary,
  options,
  answerValue,
  answerLabel,
}) {
  return {
    type,
    difficulty,
    mode: "choice",
    questionText,
    displayText: "",
    extraText: "",
    reviewText: "",
    visualHtml,
    visualSummary,
    options,
    answerValue,
    answerLabel,
    isHebrew: false,
  };
}

function shouldUseCompactQuestionMain(question) {
  if (question?.forceCompactMain) {
    return true;
  }

  const displayText = String(question?.displayText || "").trim();
  if (question?.isHebrew || containsHebrewText(displayText)) {
    return false;
  }

  const text = displayText;
  if (!text) {
    return false;
  }

  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const looksLikeEquation = /^[\d\s+\-×÷=.__/()%:,]+$/.test(text);
  const hasSentencePunctuation = /[.!?]/.test(text) || text.includes(":") || text.includes("\n");

  if (looksLikeEquation) {
    return false;
  }

  return wordCount >= 6 || (hasSentencePunctuation && wordCount >= 4) || text.length >= 40;
}

function buildDragTemplateText(templateParts) {
  return templateParts
    .map((part, index) => (index < templateParts.length - 1 ? `${part}_____` : part))
    .join("");
}

function buildFilledDragText(templateParts, tokens) {
  return templateParts
    .map((part, index) => `${part}${index < tokens.length ? tokens[index] : ""}`)
    .join("");
}

function getDragSlotCount(question) {
  if (question.dragLayout === "buckets") {
    return (question.dragBucketColumns || []).reduce(
      (total, bucket) => total + ((bucket?.answers && bucket.answers.length) || 0),
      0
    );
  }

  if (question.dragLayout === "targets") {
    return Array.isArray(question.dragTargets) ? question.dragTargets.length : 0;
  }

  if (Array.isArray(question.dragAnswerTokens) && question.dragAnswerTokens.length) {
    return question.dragAnswerTokens.length;
  }

  return Math.max(0, (question.dragTemplateParts?.length || 0) - 1);
}

function getDragTargetReviewLabel(target, index) {
  if (typeof target?.reviewLabel === "string" && target.reviewLabel.trim()) {
    return target.reviewLabel.trim();
  }

  if (typeof target?.text === "string" && target.text.trim()) {
    return target.text.trim();
  }

  if (typeof target?.position === "string" && target.position.trim()) {
    return capitalize(target.position);
  }

  return `Target ${index + 1}`;
}

function buildDragTargetsSelectionText(question, tokens) {
  return (question.dragTargets || [])
    .map((target, index) => `${getDragTargetReviewLabel(target, index)}: ${tokens[index]}`)
    .join(" | ");
}

function buildDragBucketSelectionText(question, tokens) {
  let offset = 0;

  return (question.dragBucketColumns || [])
    .map((bucket) => {
      const count = bucket?.answers?.length || 0;
      const bucketTokens = tokens.slice(offset, offset + count);
      offset += count;
      return `${bucket.label}: ${bucketTokens.join(", ")}`;
    })
    .join(" | ");
}

function buildDragSelectionText(question, tokens) {
  if (question.dragLayout === "buckets") {
    return buildDragBucketSelectionText(question, tokens);
  }

  if (question.dragLayout === "targets") {
    return buildDragTargetsSelectionText(question, tokens);
  }

  if (Array.isArray(question.dragTemplateParts) && question.dragTemplateParts.length) {
    return buildFilledDragText(question.dragTemplateParts, tokens);
  }

  return tokens.join(" | ");
}

function isDragSelectionCorrect(question, tokens) {
  if (question.dragLayout === "buckets") {
    let offset = 0;

    return (question.dragBucketColumns || []).every((bucket) => {
      const answers = Array.isArray(bucket?.answers) ? bucket.answers : [];
      const bucketTokens = tokens.slice(offset, offset + answers.length);
      offset += answers.length;

      return (
        bucketTokens.length === answers.length &&
        bucketTokens.every((token) => answers.includes(token)) &&
        answers.every((token) => bucketTokens.includes(token))
      );
    });
  }

  return tokens.every((token, index) => token === question.dragAnswerTokens[index]);
}

function getVisibleQuestionExtraText(question) {
  const extraText = typeof question?.extraText === "string" ? question.extraText : "";
  if (!extraText) {
    return "";
  }

  return extraText
    .split("\n")
    .map((line) => line.trimEnd())
    .filter((line) => !SNAPSHOT_DATE_PATTERN.test(line.trim()))
    .join("\n")
    .trim();
}

function containsHebrewText(value) {
  return /[\u0590-\u05FF]/.test(String(value || ""));
}

function renderCurrentQuestion() {
  if (isViewingResultsScreen()) {
    renderResultsScreen();
    return;
  }

  const question = state.questions[state.viewIndex];
  if (!question) {
    if (hasCompletedSession()) {
      state.viewIndex = state.totalQuestions;
      renderResultsScreen();
      return;
    }

    void finishSession();
    return;
  }

  const reviewingPreviousQuestion = isViewingPreviousQuestion();
  const answerSelection = state.answerSelections[state.viewIndex] || null;

  updateStatusBar();
  updateQuizNavigation();
  renderQuizFeedback();

  elements.questionNumber.textContent = reviewingPreviousQuestion
    ? `Question ${state.viewIndex + 1} (review):`
    : `Question ${state.viewIndex + 1}:`;
  const questionPromptIsHebrew = containsHebrewText(question.questionText);
  const questionMainIsHebrew = Boolean(question.isHebrew) || containsHebrewText(question.displayText);
  elements.questionPrompt.textContent = question.questionText;
  elements.questionPrompt.hidden = !question.questionText;
  elements.questionPrompt.classList.toggle("hebrew", questionPromptIsHebrew);

  elements.questionMain.textContent = question.displayText;
  elements.questionMain.hidden = !question.displayText;
  elements.questionMain.classList.toggle("hebrew", questionMainIsHebrew);
  elements.questionMain.classList.toggle("compact", shouldUseCompactQuestionMain(question));

  elements.questionVisual.innerHTML = question.visualHtml || "";
  elements.questionVisual.hidden = !question.visualHtml;

  if (question.extraHtml) {
    elements.questionExtra.innerHTML = question.extraHtml;
    elements.questionExtra.hidden = false;
    elements.questionExtra.classList.toggle("hebrew", Boolean(question.isHebrew));
  } else {
    const extraText =
      reviewingPreviousQuestion && question.mode === "drag" ? "" : getVisibleQuestionExtraText(question);
    elements.questionExtra.textContent = extraText;
    elements.questionExtra.hidden = !extraText;
    elements.questionExtra.classList.toggle(
      "hebrew",
      Boolean(question.isHebrew) || containsHebrewText(extraText)
    );
  }

  if (question.mode === "input") {
    elements.answerForm.hidden = false;
    elements.inputArea.hidden = false;
    elements.choicesArea.hidden = true;
    elements.dragArea.hidden = true;
    elements.answerInput.disabled = reviewingPreviousQuestion;
    elements.answerInput.value = reviewingPreviousQuestion ? answerSelection?.value || "" : "";
    if (!reviewingPreviousQuestion) {
      focusAnswerInput();
    }
    return;
  }

  if (question.mode === "drag") {
    elements.answerInput.value = "";
    elements.answerInput.disabled = false;
    elements.answerForm.hidden = true;
    elements.inputArea.hidden = true;
    elements.choicesArea.hidden = true;
    elements.dragArea.hidden = false;
    renderDragQuestion(question, {
      readOnly: reviewingPreviousQuestion,
      selectedTokens: Array.isArray(answerSelection?.tokens) ? answerSelection.tokens : [],
    });
    return;
  }

  if (question.mode === "practice") {
    elements.answerInput.value = "";
    elements.answerInput.disabled = false;
    elements.answerForm.hidden = true;
    elements.inputArea.hidden = true;
    elements.choicesArea.hidden = false;
    elements.dragArea.hidden = true;
    renderPracticeButtons(question, {
      readOnly: reviewingPreviousQuestion,
      selectedValue: answerSelection?.value || "",
    });
    return;
  }

  elements.answerInput.value = "";
  elements.answerInput.disabled = false;
  elements.answerForm.hidden = true;
  elements.inputArea.hidden = true;
  elements.choicesArea.hidden = false;
  elements.dragArea.hidden = true;
  renderChoiceButtons(question, {
    readOnly: reviewingPreviousQuestion,
    selectedValue: answerSelection?.value || "",
  });
}

function renderChoiceButtons(question, { readOnly = false, selectedValue = "" } = {}) {
  elements.choicesArea.innerHTML = "";

  question.options.forEach((option, index) => {
    const optionText = String(option);
    const optionIsHebrew = containsHebrewText(optionText);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `choice-button${optionIsHebrew ? " hebrew" : ""}`;
    button.dataset.value = optionText;
    button.disabled = readOnly;

    if (readOnly) {
      if (optionText === question.answerValue) {
        button.classList.add("is-correct");
      } else if (optionText === selectedValue) {
        button.classList.add("is-wrong");
      }
    }

    const labelSpan = document.createElement("span");
    labelSpan.className = "choice-label";
    labelSpan.textContent = `${OPTION_LABELS[index]})`;

    const textSpan = document.createElement("span");
    textSpan.className = `choice-text${optionIsHebrew ? " hebrew" : ""}`;
    textSpan.textContent = optionText;
    if (optionIsHebrew) {
      textSpan.setAttribute("dir", "rtl");
    }

    button.appendChild(labelSpan);
    button.appendChild(textSpan);
    if (!readOnly) {
      button.addEventListener("click", () =>
        handleAnswer(question, optionText === question.answerValue, optionText)
      );
    }
    elements.choicesArea.appendChild(button);
  });
}

function renderPracticeButtons(question, { readOnly = false, selectedValue = "" } = {}) {
  elements.choicesArea.innerHTML = "";

  const actions = document.createElement("div");
  actions.className = "practice-actions";

  const button = document.createElement("button");
  button.type = "button";
  button.className = "primary-button practice-button";
  button.textContent = readOnly
    ? selectedValue || question.completionValue || "Done"
    : question.actionLabel || "Mark Done";
  button.disabled = readOnly;

  if (!readOnly) {
    button.addEventListener("click", () =>
      handleAnswer(question, true, question.completionValue || "Done")
    );
  }

  actions.appendChild(button);
  elements.choicesArea.appendChild(actions);
}

function renderDragQuestion(question, { readOnly = false, selectedTokens = [] } = {}) {
  elements.dragArea.innerHTML = "";
  const dragLayout = question.dragLayout || "sentence";
  const choiceLookup = new Map(question.dragChoices.map((token) => [token.id, token]));
  const isComparisonLayout = dragLayout === "comparison";
  const isTargetsLayout = dragLayout === "targets";
  const isBucketLayout = dragLayout === "buckets";
  const dragQuestionIsHebrew =
    Boolean(question.isHebrew) ||
    containsHebrewText(question.questionText) ||
    containsHebrewText(question.displayText) ||
    (question.dragChoices || []).some((token) => containsHebrewText(token?.text)) ||
    (question.dragTemplateParts || []).some((part) => containsHebrewText(part)) ||
    (question.dragTargets || []).some(
      (target) =>
        containsHebrewText(target?.text) ||
        containsHebrewText(target?.reviewLabel) ||
        containsHebrewText(target?.html)
    ) ||
    (question.dragBucketColumns || []).some(
      (bucket) =>
        containsHebrewText(bucket?.label) ||
        (bucket?.answers || []).some((answer) => containsHebrewText(answer))
    );
  const slotValues = Array.from({ length: getDragSlotCount(question) }, (_, index) => {
    if (!readOnly || !Array.isArray(selectedTokens)) {
      return null;
    }

    const text = selectedTokens[index];
    if (!text) {
      return null;
    }

    return question.dragChoices.find((token) => token.text === text) || {
      id: `review-${index}-${text}`,
      text,
    };
  });

  const placeToken = (slotIndex, tokenId) => {
    if (readOnly) {
      return;
    }

    const token = choiceLookup.get(tokenId);
    if (!token) {
      return;
    }

    const existingIndex = slotValues.findIndex((value) => value?.id === tokenId);
    if (existingIndex !== -1) {
      slotValues[existingIndex] = null;
    }

    slotValues[slotIndex] = token;
    sync();
  };

  const placeTokenInFirstOpenSlot = (tokenId) => {
    if (readOnly) {
      return;
    }

    const emptyIndex = slotValues.findIndex((value) => value === null);
    if (emptyIndex !== -1) {
      placeToken(emptyIndex, tokenId);
    }
  };

  const clearSlot = (slotIndex) => {
    if (readOnly) {
      return;
    }

    slotValues[slotIndex] = null;
    sync();
  };

  function createSlotButton(slotIndex, { placeholderText = "Drop here", comparison = false, extraClass = "" } = {}) {
    const slotButton = document.createElement("button");
    slotButton.type = "button";
    slotButton.className = [
      "drag-slot",
      dragQuestionIsHebrew ? "hebrew" : "",
      comparison ? "comparison" : "",
      extraClass,
      slotValues[slotIndex] ? "filled" : "",
    ]
      .filter(Boolean)
      .join(" ");
    slotButton.textContent = slotValues[slotIndex]?.text || placeholderText || "\u00a0";
    slotButton.disabled = readOnly;
    if (!readOnly) {
      slotButton.addEventListener("click", () => {
        if (slotValues[slotIndex]) {
          clearSlot(slotIndex);
        }
      });
      slotButton.addEventListener("dragover", (event) => {
        event.preventDefault();
      });
      slotButton.addEventListener("drop", (event) => {
        event.preventDefault();
        const tokenId = event.dataTransfer?.getData("text/plain");
        if (tokenId) {
          placeToken(slotIndex, tokenId);
        }
      });
    }
    return slotButton;
  }

  function fillTargetPrompt(prompt, target, index) {
    if (target?.html) {
      prompt.innerHTML = target.html;
      return;
    }

    prompt.textContent = target?.text || getDragTargetReviewLabel(target, index);
  }

  function createSentenceLayout() {
    const sentence = document.createElement("div");
    sentence.className = `drag-sentence${dragQuestionIsHebrew ? " hebrew" : ""}`;

    question.dragTemplateParts.forEach((part, index) => {
      if (part) {
        const partSpan = document.createElement("span");
        partSpan.className = "drag-text";
        partSpan.textContent = part;
        sentence.appendChild(partSpan);
      }

      if (index < slotValues.length) {
        sentence.appendChild(createSlotButton(index));
      }
    });

    return sentence;
  }

  function createComparisonLayout() {
    const comparison = document.createElement("div");
    comparison.className = "drag-comparison";

    const leftNumber = document.createElement("div");
    leftNumber.className = "drag-compare-number";
    leftNumber.textContent = question.dragComparisonLeftText || question.dragTemplateParts[0].trim();

    const rightNumber = document.createElement("div");
    rightNumber.className = "drag-compare-number";
    rightNumber.textContent = question.dragComparisonRightText || question.dragTemplateParts[1].trim();

    comparison.appendChild(leftNumber);
    comparison.appendChild(
      createSlotButton(0, {
        placeholderText: question.dragPlaceholderText || "?",
        comparison: true,
      })
    );
    comparison.appendChild(rightNumber);

    return comparison;
  }

  function createTargetsRowsLayout() {
    const targets = document.createElement("div");
    targets.className = "drag-targets rows";

    question.dragTargets.forEach((target, index) => {
      const row = document.createElement("div");
      row.className = "drag-target-row";

      const prompt = document.createElement("div");
      const promptIsHebrew =
        dragQuestionIsHebrew ||
        containsHebrewText(target?.text) ||
        containsHebrewText(target?.reviewLabel) ||
        containsHebrewText(target?.html);
      prompt.className = `drag-target-prompt${target?.html ? " visual" : ""}${promptIsHebrew ? " hebrew" : ""}`;
      fillTargetPrompt(prompt, target, index);

      row.appendChild(prompt);
      row.appendChild(
        createSlotButton(index, {
          placeholderText: question.dragPlaceholderText || "Drop here",
          extraClass: "target",
        })
      );
      targets.appendChild(row);
    });

    return targets;
  }

  function createTargetsLineLayout() {
    const shell = document.createElement("div");
    shell.className = "drag-line-shell";

    const line = document.createElement("div");
    line.className = "drag-targets line";

    question.dragTargets.forEach((target, index) => {
      const item = document.createElement("div");
      item.className = "drag-line-target";
      item.appendChild(
        createSlotButton(index, {
          placeholderText: question.dragPlaceholderText || "\u00a0",
          extraClass: "target line",
        })
      );

      const tick = document.createElement("div");
      tick.className = "drag-line-tick";
      item.appendChild(tick);

      if (question.dragShowTargetLabels !== false) {
        const labelText = target?.text || target?.reviewLabel || "";
        if (labelText) {
          const label = document.createElement("div");
          label.className = `drag-line-label${containsHebrewText(labelText) ? " hebrew" : ""}`;
          label.textContent = labelText;
          item.appendChild(label);
        }
      }

      line.appendChild(item);
    });

    shell.appendChild(line);

    if (question.dragLineStartLabel || question.dragLineEndLabel) {
      const edgeLabels = document.createElement("div");
      edgeLabels.className = "drag-line-edge-labels";

      const startLabel = document.createElement("span");
      startLabel.className = "drag-line-edge-label";
      startLabel.textContent = question.dragLineStartLabel || "";

      const endLabel = document.createElement("span");
      endLabel.className = "drag-line-edge-label";
      endLabel.textContent = question.dragLineEndLabel || "";

      edgeLabels.appendChild(startLabel);
      edgeLabels.appendChild(endLabel);
      shell.appendChild(edgeLabels);
    }

    return shell;
  }

  function createTargetsCompassLayout() {
    const compass = document.createElement("div");
    compass.className = "drag-targets compass";
    const targetLookup = new Map(
      (question.dragTargets || []).map((target, index) => [target?.position, { target, index }])
    );
    const positions = [
      "northwest",
      "north",
      "northeast",
      "west",
      "center",
      "east",
      "southwest",
      "south",
      "southeast",
    ];

    positions.forEach((position) => {
      if (position === "center") {
        const center = document.createElement("div");
        center.className = "drag-compass-center";
        center.textContent = question.dragCompassCenterLabel || "Compass";
        compass.appendChild(center);
        return;
      }

      const cell = document.createElement("div");
      cell.className = `drag-compass-cell ${position}`;
      const match = targetLookup.get(position);
      if (match) {
        cell.appendChild(
          createSlotButton(match.index, {
            placeholderText: question.dragPlaceholderText || "\u00a0",
            extraClass: "target compass",
          })
        );
      } else {
        cell.classList.add("empty");
      }
      compass.appendChild(cell);
    });

    return compass;
  }

  function createTargetsLayout() {
    if (question.dragTargetArrangement === "line") {
      return createTargetsLineLayout();
    }

    if (question.dragTargetArrangement === "compass") {
      return createTargetsCompassLayout();
    }

    return createTargetsRowsLayout();
  }

  function createBucketsLayout() {
    const buckets = document.createElement("div");
    buckets.className = "drag-buckets";
    let slotIndex = 0;

    (question.dragBucketColumns || []).forEach((bucket) => {
      const column = document.createElement("div");
      column.className = "drag-bucket";

      const label = document.createElement("div");
      label.className = `drag-bucket-label${dragQuestionIsHebrew || containsHebrewText(bucket.label) ? " hebrew" : ""}`;
      label.textContent = bucket.label;

      const slots = document.createElement("div");
      slots.className = "drag-bucket-slots";

      for (let index = 0; index < (bucket?.answers?.length || 0); index += 1) {
        slots.appendChild(
          createSlotButton(slotIndex, {
            placeholderText: question.dragPlaceholderText || "\u00a0",
            extraClass: "bucket",
          })
        );
        slotIndex += 1;
      }

      column.appendChild(label);
      column.appendChild(slots);
      buckets.appendChild(column);
    });

    return buckets;
  }

  function createBank() {
    const bank = document.createElement("div");
    bank.className = [
      "drag-bank",
      dragQuestionIsHebrew ? "hebrew" : "",
      isComparisonLayout ? "comparison" : "",
      isTargetsLayout ? "targets" : "",
      isBucketLayout ? "buckets" : "",
    ]
      .filter(Boolean)
      .join(" ");

    question.dragChoices.forEach((token) => {
      if (slotValues.some((value) => value?.id === token.id)) {
        return;
      }

      const tokenButton = document.createElement("button");
      tokenButton.type = "button";
      tokenButton.className = [
        "drag-token",
        dragQuestionIsHebrew ? "hebrew" : "",
        isComparisonLayout ? "comparison" : "",
        isTargetsLayout ? "targets" : "",
        isBucketLayout ? "buckets" : "",
      ]
        .filter(Boolean)
        .join(" ");
      tokenButton.draggable = true;
      tokenButton.textContent = token.text;
      tokenButton.addEventListener("click", () => placeTokenInFirstOpenSlot(token.id));
      tokenButton.addEventListener("dragstart", (event) => {
        if (event.dataTransfer) {
          event.dataTransfer.effectAllowed = "move";
          event.dataTransfer.setData("text/plain", token.id);
        }
      });
      bank.appendChild(tokenButton);
    });

    return bank;
  }

  function createCheckButton() {
    const checkButton = document.createElement("button");
    checkButton.type = "button";
    checkButton.className = [
      "primary-button",
      "drag-check-button",
      isComparisonLayout ? "comparison" : "",
      isTargetsLayout || isBucketLayout ? "centered" : "",
    ]
      .filter(Boolean)
      .join(" ");
    checkButton.textContent = "Check Answer";
    checkButton.addEventListener("click", () => {
      if (slotValues.some((value) => value === null)) {
        state.feedbackMessage =
          isTargetsLayout || isBucketLayout
            ? "Fill every spot before checking your answer."
            : "Fill every blank before checking your answer.";
        state.feedbackTone = "error";
        renderFeedback();
        return;
      }

      const currentSelectedTokens = slotValues.map((value) => value.text);
      const selectedValue = buildDragSelectionText(question, currentSelectedTokens);
      const isCorrect = isDragSelectionCorrect(question, currentSelectedTokens);
      handleAnswer(question, isCorrect, selectedValue, { tokens: currentSelectedTokens });
    });

    return checkButton;
  }

  function sync() {
    elements.dragArea.innerHTML = "";

    const board = document.createElement("div");
    board.className = [
      "drag-board",
      isComparisonLayout ? "comparison" : "",
      isTargetsLayout ? "targets" : "",
      isBucketLayout ? "buckets" : "",
    ]
      .filter(Boolean)
      .join(" ");

    if (isComparisonLayout) {
      board.appendChild(createComparisonLayout());
    } else if (isTargetsLayout) {
      board.appendChild(createTargetsLayout());
    } else if (isBucketLayout) {
      board.appendChild(createBucketsLayout());
    } else {
      board.appendChild(createSentenceLayout());
    }

    if (!readOnly) {
      board.appendChild(createBank());
      board.appendChild(createCheckButton());
    }

    elements.dragArea.appendChild(board);
  }

  sync();
}

function focusAnswerInput() {
  const focusInput = () => {
    elements.answerInput.focus();
  };

  if (typeof requestAnimationFrame === "function") {
    requestAnimationFrame(focusInput);
    return;
  }

  focusInput();
}

function buildNumericAnswerCandidates(rawValue, question) {
  const strippedValue = stripAcceptedNumericAffixes(rawValue, question);
  if (!strippedValue) {
    return [];
  }

  return Array.from(parseFlexibleNumberCandidates(strippedValue));
}

function stripAcceptedNumericAffixes(rawValue, question) {
  let value = normalizeFlexibleNumericInput(rawValue);
  if (!value) {
    return "";
  }

  value = value.replace(/[.!?]+$/g, "").trim();
  value = stripAcceptedNumericPrefix(value, question?.acceptedAnswerPrefixes);
  value = stripAcceptedNumericSuffix(value, question?.acceptedAnswerSuffixes);

  return value.trim();
}

function stripAcceptedNumericPrefix(value, affixes) {
  const options = Array.isArray(affixes)
    ? [...affixes].map((affix) => String(affix).trim()).filter(Boolean).sort((left, right) => right.length - left.length)
    : [];

  for (const affix of options) {
    const pattern = new RegExp(`^${escapeRegExp(affix)}\\s*`, "i");
    if (pattern.test(value)) {
      return value.replace(pattern, "").trimStart();
    }
  }

  return value;
}

function stripAcceptedNumericSuffix(value, affixes) {
  const options = Array.isArray(affixes)
    ? [...affixes].map((affix) => String(affix).trim()).filter(Boolean).sort((left, right) => right.length - left.length)
    : [];

  for (const affix of options) {
    const pattern = new RegExp(`\\s*${escapeRegExp(affix)}$`, "i");
    if (pattern.test(value)) {
      return value.replace(pattern, "").trimEnd();
    }
  }

  return value;
}

function parseFlexibleNumberCandidates(rawValue) {
  const candidates = new Set();
  const normalized = normalizeFlexibleNumericInput(rawValue);
  if (!normalized) {
    return candidates;
  }

  const variants = new Set([normalized]);
  const parenthesizedMatch = normalized.match(/^\(\s*(.+?)\s*\)$/);
  if (parenthesizedMatch) {
    const innerValue = parenthesizedMatch[1].trim();
    if (innerValue) {
      variants.add(innerValue);
      if (!/^[+-]/.test(innerValue)) {
        variants.add(`-${innerValue}`);
      }
    }
  }

  variants.forEach((variant) => {
    const compactValue = variant.replace(/([+-])\s+/g, "$1").trim();
    const directValue = Number(compactValue);
    if (Number.isFinite(directValue)) {
      candidates.add(directValue);
    }

    buildNormalizedFlexibleNumberStrings(compactValue).forEach((candidateText) => {
      const parsedValue = Number(candidateText);
      if (Number.isFinite(parsedValue)) {
        candidates.add(parsedValue);
      }
    });
  });

  return candidates;
}

function buildNormalizedFlexibleNumberStrings(value) {
  const candidates = new Set();
  const compactValue = value.replace(/(?<=\d)[\s_'’](?=\d)/g, "");
  const addCandidate = (candidateText) => {
    if (/^[+-]?(?:\d+(?:\.\d+)?|\.\d+)$/.test(candidateText)) {
      candidates.add(candidateText);
    }
  };

  addCandidate(compactValue);

  if (/^[+-]?\d{1,3}(?:,\d{3})+(?:\.\d+)?$/.test(compactValue)) {
    addCandidate(compactValue.replace(/,/g, ""));
  }

  if (/^[+-]?\d{1,3}(?:\.\d{3})+(?:,\d+)?$/.test(compactValue)) {
    addCandidate(compactValue.replace(/\./g, "").replace(",", "."));
  }

  if (/^[+-]?\d+,\d{1,2}$/.test(compactValue)) {
    addCandidate(compactValue.replace(",", "."));
  }

  return candidates;
}

function normalizeFlexibleNumericInput(value) {
  return String(value ?? "")
    .replace(/[\u00a0\u202f]/g, " ")
    .replace(/[−–—]/g, "-")
    .trim();
}

function numericAnswersMatch(left, right) {
  return Number.isFinite(left) && Number.isFinite(right) && Math.abs(left - right) < 0.000001;
}

function submitTypedAnswer(event) {
  event.preventDefault();

  if (state.viewIndex !== state.currentIndex) {
    return;
  }

  const question = state.questions[state.currentIndex];
  if (!question || question.mode !== "input") {
    return;
  }

  const typedValue = elements.answerInput.value.trim();
  if (typedValue === "") {
    state.feedbackMessage = "Type an answer and press Enter.";
    state.feedbackTone = "error";
    renderFeedback();
    return;
  }

  const parsedCandidates = buildNumericAnswerCandidates(typedValue, question);
  if (!parsedCandidates.length) {
    state.feedbackMessage = "Please type one number. Formats like 4,000 and 5.5 are okay.";
    state.feedbackTone = "error";
    renderFeedback();
    return;
  }

  const correctAnswer = Number(question.answerValue);
  const isCorrect = parsedCandidates.some((candidate) => numericAnswersMatch(candidate, correctAnswer));
  handleAnswer(question, isCorrect, typedValue);
}

function handleAnswer(question, isCorrect, selectedValue = "", selectedMeta = null) {
  state.answeredCount += 1;
  if (isCorrect) {
    state.correctCount += 1;
  }

  state.answerSelections[state.currentIndex] = {
    value: selectedValue === "" ? "" : String(selectedValue),
    ...(Array.isArray(selectedMeta?.tokens) ? { tokens: [...selectedMeta.tokens] } : {}),
  };
  state.answerResults[state.currentIndex] = isCorrect;
  state.sessionRecords[state.currentIndex] = buildSessionRecord(
    state.currentIndex + 1,
    question,
    selectedValue,
    isCorrect,
    selectedMeta
  );
  state.feedbackMessage = buildOutcomeMessage(question, isCorrect, selectedValue);
  state.feedbackTone = isCorrect ? "success" : "error";

  if (state.currentIndex === state.totalQuestions - 1) {
    state.currentIndex = state.totalQuestions;
    state.viewIndex = state.totalQuestions;
    void finishSession();
    return;
  }

  state.currentIndex += 1;
  state.viewIndex = state.currentIndex;
  renderCurrentQuestion();
}

function buildOutcomeMessage(question, isCorrect, selectedValue = "") {
  if (isCorrect) {
    return question?.successMessage ? escapeHtml(String(question.successMessage)) : "Correct!";
  }

  return formatQuestionReview(question, selectedValue);
}

function formatQuestionReview(question, selectedValue) {
  const lines = [];
  const addLine = (content, className = "") => {
    const classAttribute = className ? ` class="${className}"` : "";
    lines.push(`<div${classAttribute}>${content}</div>`);
  };

  if (question.questionText) {
    addLine(escapeHtml(question.questionText), "feedback-review-line feedback-review-question");
  }

  if (question.displayText) {
    addLine(escapeHtml(question.displayText), "feedback-review-line");
  }

  if (question.reviewText && question.reviewText !== question.displayText) {
    addLine(escapeHtml(question.reviewText), "feedback-review-line");
  }

  if (
    question.visualSummary &&
    question.visualSummary !== question.displayText &&
    question.visualSummary !== question.reviewText
  ) {
    addLine(escapeHtml(question.visualSummary), "feedback-review-line");
  }

  if (Array.isArray(question.options) && question.options.length) {
    question.options.forEach((option, index) => {
      const optionClasses = ["feedback-review-line", "feedback-review-option"];
      if (option === selectedValue) {
        optionClasses.push("selected");
      }
      if (option === question.answerValue) {
        optionClasses.push("correct");
      }

      addLine(
        `<span class="feedback-review-option-label">${OPTION_LABELS[index]})</span> ` +
          `<span class="feedback-review-option-text">${escapeHtml(option)}</span>`,
        optionClasses.join(" ")
      );
    });
  } else if (selectedValue !== "") {
    lines.push('<div class="feedback-review-spacer"></div>');
    addLine(
      `<span class="feedback-review-label">Your answer:</span> ` +
        `<span class="feedback-review-answer selected">${escapeHtml(String(selectedValue))}</span>`,
      "feedback-review-line"
    );
    lines.push('<div class="feedback-review-spacer"></div>');
    addLine(
      `<span class="feedback-review-label">Correct answer:</span> ` +
        `<span class="feedback-review-answer correct">${escapeHtml(String(question.answerLabel))}</span>`,
      "feedback-review-line"
    );
  } else {
    lines.push('<div class="feedback-review-spacer"></div>');
    addLine(
      `<span class="feedback-review-label">Correct answer:</span> ` +
        `<span class="feedback-review-answer correct">${escapeHtml(String(question.answerLabel))}</span>`,
      "feedback-review-line"
    );
  }

  return `<div class="feedback-review">${lines.join("")}</div>`;
}

function finishSession() {
  renderResultsScreen({ shouldPersist: true, shouldCelebrate: true });
}

function renderResultsScreen({ shouldPersist = false, shouldCelebrate = false } = {}) {
  switchScreen(elements.resultsScreen);
  const percentage = state.totalQuestions
    ? (state.correctCount / state.totalQuestions) * 100
    : 0;
  const roundedPercentage = Math.round(percentage);
  const currentUser = getCurrentUserProfile();

  elements.resultsTitle.textContent = getResultsPraise(percentage);
  elements.resultsSummary.textContent =
    `${currentUser.name} got ${state.correctCount} out of ${state.totalQuestions} correct. That's ${roundedPercentage}%.`;
  renderResultsDetails();
  updateResultsNavigation();

  if (shouldPersist) {
    saveSessionHistory();
  }

  if (shouldCelebrate) {
    playConfetti(12000);
  }
}

function renderResultsDetails() {
  const wrongRecords = state.sessionRecords.filter(Boolean).filter((record) => !record.isCorrect);
  const wrongCounts = buildWrongCategoryCounts(wrongRecords);

  if (!wrongRecords.length) {
    elements.resultsCategorySummary.hidden = true;
    elements.resultsReviewList.hidden = false;
    elements.resultsReviewList.innerHTML = `
      <div class="results-review-card results-review-card-clean">
        <p class="results-review-empty">No wrong answers this time.</p>
      </div>
    `;
    return;
  }

  elements.resultsCategorySummary.hidden = false;
  elements.resultsCategorySummary.innerHTML = `
    <div class="results-section-title">Categories To Review</div>
    <table class="results-category-table">
      <thead>
        <tr>
          <th>Category</th>
          <th>Wrong Answers</th>
        </tr>
      </thead>
      <tbody>
        ${wrongCounts
          .map(
            (entry) => `
              <tr>
                <th scope="row">${escapeHtml(entry.categoryLabel)}</th>
                <td>${entry.count}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;

  elements.resultsReviewList.hidden = false;
  elements.resultsReviewList.innerHTML = wrongRecords
    .map(
      (record) => `
        <article class="results-review-card">
          <p class="results-review-title">
            Question ${record.questionNumber} · ${escapeHtml(record.categoryLabel)}
          </p>
          ${record.reviewHtml}
        </article>
      `
    )
    .join("");
}

function showStartScreen() {
  switchScreen(elements.startScreen);
  clearStartMessage();
  stopConfetti();
  state.currentIndex = 0;
  state.viewIndex = 0;
  state.answerResults = [];
  state.answerSelections = [];
  state.sessionRecords = [];
  state.feedbackMessage = "";
  state.feedbackTone = "";
  elements.resultsCategorySummary.innerHTML = "";
  elements.resultsCategorySummary.hidden = true;
  elements.resultsReviewList.innerHTML = "";
  elements.resultsReviewList.hidden = true;
  const activeCountButton = elements.questionCountButtons.find((button) =>
    button.classList.contains("active")
  );
  activeCountButton?.focus();
}

function updateStatusBar() {
  elements.scoreText.textContent = `${state.correctCount}/${state.answeredCount}`;
  renderProgressTracker();
}

function renderProgressTracker() {
  elements.progressTracker.innerHTML = "";

  for (let index = 0; index < state.totalQuestions; index += 1) {
    const box = document.createElement("span");
    box.className = "progress-box";

    if (state.answerResults[index] === true) {
      box.classList.add("correct");
    } else if (state.answerResults[index] === false) {
      box.classList.add("wrong");
    }

    if (index === state.viewIndex) {
      box.classList.add("current");
    }

    elements.progressTracker.appendChild(box);
  }
}

function updateQuizNavigation() {
  elements.quizBackButton.disabled = state.viewIndex <= 0;
  elements.quizForwardButton.disabled = state.viewIndex >= state.currentIndex;
}

function updateResultsNavigation() {
  const canReviewSession = hasCompletedSession() && state.totalQuestions > 0;
  elements.resultsBackButton.disabled = !canReviewSession;
  elements.resultsForwardButton.disabled = true;
}

function hasCompletedSession() {
  return state.totalQuestions > 0 && state.currentIndex >= state.totalQuestions;
}

function isViewingResultsScreen() {
  return hasCompletedSession() && state.viewIndex >= state.totalQuestions;
}

function isViewingPreviousQuestion() {
  return state.viewIndex < state.currentIndex;
}

function getViewedSessionRecord() {
  if (!isViewingPreviousQuestion()) {
    return null;
  }

  return state.sessionRecords[state.viewIndex] || null;
}

function renderQuizFeedback() {
  const reviewRecord = getViewedSessionRecord();
  if (reviewRecord) {
    elements.feedback.innerHTML = `
      <div class="feedback-review-note">Reviewing a previous question. Answers are locked.</div>
      ${reviewRecord.reviewHtml}
    `;
    elements.feedback.className = "feedback-banner review";
    return;
  }

  renderFeedback();
}

function renderFeedback() {
  elements.feedback.innerHTML = state.feedbackMessage;
  elements.feedback.className = state.feedbackMessage
    ? `feedback-banner ${state.feedbackTone}`
    : "feedback-banner";
}

function showPreviousQuizQuestion() {
  if (isViewingResultsScreen()) {
    if (state.totalQuestions <= 0) {
      return;
    }

    state.viewIndex = state.totalQuestions - 1;
    renderCurrentQuestion();
    return;
  }

  if (state.viewIndex <= 0) {
    return;
  }

  state.viewIndex -= 1;
  renderCurrentQuestion();
}

function showNextQuizQuestion() {
  if (isViewingResultsScreen()) {
    return;
  }

  if (state.viewIndex >= state.currentIndex) {
    return;
  }

  state.viewIndex += 1;
  renderCurrentQuestion();
}

function switchScreen(activeScreen) {
  elements.startScreen.hidden = activeScreen !== elements.startScreen;
  elements.quizScreen.hidden = activeScreen !== elements.quizScreen;
  elements.resultsScreen.hidden = activeScreen !== elements.resultsScreen;
  elements.historyScreen.hidden = activeScreen !== elements.historyScreen;
}

function clearStartMessage() {
  elements.startFeedback.textContent = "";
  elements.startFeedback.className = "feedback";
}

function showStartMessage(message, tone) {
  elements.startFeedback.textContent = message;
  elements.startFeedback.className = `feedback ${tone}`;
}

function buildWrongCategoryCounts(records) {
  const grouped = new Map();

  records.forEach((record) => {
    const key = record.category || "unknown";
    if (!grouped.has(key)) {
      grouped.set(key, { category: key, categoryLabel: record.categoryLabel, count: 0 });
    }

    grouped.get(key).count += 1;
  });

  return Array.from(grouped.values()).sort(
    (left, right) => right.count - left.count || left.categoryLabel.localeCompare(right.categoryLabel)
  );
}

function getQuestionCategoryKey(question) {
  const type = String(question?.type || "").trim();
  if (!type) {
    return "general";
  }

  return type.replace(/-(choice|input|drag)$/, "");
}

function getCategoryLabel(category) {
  if (CATEGORY_LABELS[category]) {
    return CATEGORY_LABELS[category];
  }

  return String(category)
    .split("-")
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : ""))
    .join(" ");
}

function buildSessionRecord(questionNumber, question, selectedValue, isCorrect, selectedMeta = null) {
  const category = getQuestionCategoryKey(question);
  return {
    questionNumber,
    category,
    categoryLabel: getCategoryLabel(category),
    questionText: formatQuestionForLog(question),
    chosenAnswer: selectedValue === "" ? "(no answer)" : String(selectedValue),
    ...(Array.isArray(selectedMeta?.tokens) ? { selectedTokens: [...selectedMeta.tokens] } : {}),
    correctAnswer: question.answerLabel,
    isCorrect,
    reviewHtml: formatQuestionReview(question, selectedValue),
  };
}

function formatQuestionForLog(question) {
  const lines = [];

  if (question.questionText) {
    lines.push(question.questionText);
  }

  if (question.displayText) {
    lines.push(question.displayText);
  }

  if (question.reviewText && question.reviewText !== question.displayText) {
    lines.push(question.reviewText);
  }

  if (
    question.visualSummary &&
    question.visualSummary !== question.displayText &&
    question.visualSummary !== question.reviewText
  ) {
    lines.push(question.visualSummary);
  }

  if (question.extraText) {
    lines.push(question.extraText);
  }

  return lines.join("\n");
}

function buildSessionHistoryEntry() {
  const startedAt = state.sessionStartedAt || new Date();
  return {
    id: startedAt.toISOString(),
    startedAt: startedAt.toISOString(),
    userId: state.currentUserId,
    userName: getCurrentUserProfile().name,
    difficulty: state.difficulty,
    hebrewOnly: Boolean(state.hebrewOnly),
    totalQuestions: state.totalQuestions,
    correctCount: state.correctCount,
    records: state.sessionRecords.filter(Boolean).map((record) => ({ ...record })),
  };
}

function saveSessionHistory() {
  if (!state.sessionRecords.filter(Boolean).length) {
    return false;
  }

  const historyByUser = loadAllSessionHistory();
  const sessionHistory = historyByUser[state.currentUserId] || [];
  sessionHistory.unshift(buildSessionHistoryEntry());
  sessionHistory.splice(MAX_SAVED_SESSIONS);
  historyByUser[state.currentUserId] = sessionHistory;

  return writeSessionHistory(historyByUser);
}

function loadAllSessionHistory() {
  const storage = getSessionStorage();
  if (!storage) {
    return Object.fromEntries(USER_PROFILES.map((profile) => [profile.id, []]));
  }

  try {
    const rawValue = storage.getItem(SESSION_HISTORY_STORAGE_KEY);
    if (!rawValue) {
      return Object.fromEntries(USER_PROFILES.map((profile) => [profile.id, []]));
    }

    const parsed = JSON.parse(rawValue);
    if (Array.isArray(parsed)) {
      return Object.fromEntries(
        USER_PROFILES.map((profile) => [profile.id, profile.id === USER_PROFILES[0].id ? parsed : []])
      );
    }

    if (!parsed || typeof parsed !== "object") {
      return Object.fromEntries(USER_PROFILES.map((profile) => [profile.id, []]));
    }

    return Object.fromEntries(
      USER_PROFILES.map((profile) => [
        profile.id,
        Array.isArray(parsed[profile.id]) ? parsed[profile.id] : [],
      ])
    );
  } catch (error) {
    return Object.fromEntries(USER_PROFILES.map((profile) => [profile.id, []]));
  }
}

function loadSessionHistory() {
  const historyByUser = loadAllSessionHistory();
  return Array.isArray(historyByUser[state.currentUserId]) ? historyByUser[state.currentUserId] : [];
}

function writeSessionHistory(historyByUser) {
  const storage = getSessionStorage();
  if (!storage) {
    return false;
  }

  try {
    storage.setItem(SESSION_HISTORY_STORAGE_KEY, JSON.stringify(historyByUser));
    return true;
  } catch (error) {
    return false;
  }
}

function getSessionStorage() {
  try {
    return window.localStorage;
  } catch (error) {
    return null;
  }
}

function showHistoryScreen() {
  renderHistoryScreen();
  switchScreen(elements.historyScreen);
}

function renderHistoryScreen() {
  const sessionHistory = loadSessionHistory();
  const currentUser = getCurrentUserProfile();
  elements.historyList.innerHTML = "";
  elements.historyEmpty.hidden = sessionHistory.length > 0;

  if (!sessionHistory.length) {
    elements.historyEmpty.textContent = `${currentUser.name} has no previous sessions yet.`;
    return;
  }

  sessionHistory.forEach((session, index) => {
    elements.historyList.appendChild(createHistorySessionElement(session, index === 0));
  });
}

function createHistorySessionElement(session, shouldOpen) {
  const details = document.createElement("details");
  details.className = "history-session";
  details.open = shouldOpen;

  const summary = document.createElement("summary");
  const title = document.createElement("span");
  title.textContent = formatHistoryDate(session.startedAt);

  const meta = document.createElement("span");
  meta.className = "history-session-meta";
  meta.textContent =
    `${session.correctCount}/${session.totalQuestions} correct | Difficulty ${session.difficulty}${session.hebrewOnly ? " | Hebrew Only" : ""}`;

  summary.appendChild(title);
  summary.appendChild(meta);
  details.appendChild(summary);

  const body = document.createElement("div");
  body.className = "history-session-body";

  session.records.forEach((record) => {
    body.appendChild(createHistoryQuestionElement(record, session.startedAt));
  });

  details.appendChild(body);
  return details;
}

function createHistoryQuestionElement(record, sessionStartedAt) {
  const wrapper = document.createElement("div");
  wrapper.className = "history-question";

  const title = document.createElement("p");
  title.className = "history-question-title";
  title.textContent = `Question ${record.questionNumber} · ${record.categoryLabel || "Question"}`;
  wrapper.appendChild(title);

  const questionText = document.createElement("p");
  questionText.className = "history-question-text";
  questionText.textContent = formatHistoryQuestionText(record.questionText, sessionStartedAt);
  wrapper.appendChild(questionText);

  const chosenAnswer = document.createElement("p");
  chosenAnswer.className = "history-answer-line";
  chosenAnswer.textContent = `Chosen answer: ${record.chosenAnswer}`;
  wrapper.appendChild(chosenAnswer);

  const correctAnswer = document.createElement("p");
  correctAnswer.className = "history-answer-line";
  correctAnswer.textContent = `Correct answer: ${record.correctAnswer}`;
  wrapper.appendChild(correctAnswer);

  const result = document.createElement("p");
  result.className = `history-answer-line ${record.isCorrect ? "correct" : "wrong"}`;
  result.textContent = `Result: ${record.isCorrect ? "Correct" : "Wrong"}`;
  wrapper.appendChild(result);

  return wrapper;
}

function formatHistoryQuestionText(questionText, sessionStartedAt) {
  const text = typeof questionText === "string" ? questionText : "";
  const sessionTime = formatHistoryTime(sessionStartedAt);
  if (!sessionTime) {
    return text;
  }

  return text.replace(
    new RegExp(SNAPSHOT_DATE_PATTERN.source, "m"),
    `Snapshot date: $1, ${sessionTime}.`
  );
}

function formatHistoryDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Previous session";
  }

  return date.toLocaleString();
}

function formatHistoryTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function getResultsPraise(percentage) {
  if (percentage > 95) {
    return "Super duper work!";
  }

  if (percentage > 90) {
    return "Excellent work!";
  }

  if (percentage > 80) {
    return "Well done!";
  }

  return "Session Finished";
}

function playConfetti(durationMs) {
  stopConfetti();

  const layer = document.createElement("div");
  layer.className = "confetti-layer";
  const colors = ["#ff6b6b", "#ffd166", "#06d6a0", "#118ab2", "#ef476f", "#7cc576"];
  document.body.appendChild(layer);

  confettiRuntime.layer = layer;
  confettiRuntime.pieces = [];
  confettiRuntime.pointer = null;
  confettiRuntime.startTime = getNow();
  confettiRuntime.lastFrameTime = confettiRuntime.startTime;

  const viewportWidth = getViewportWidth();
  for (let index = 0; index < 180; index += 1) {
    const piece = createConfettiPiece(layer, colors);
    resetConfettiPiece(piece, 0, durationMs, viewportWidth, true);
    confettiRuntime.pieces.push(piece);
  }

  confettiRuntime.moveHandler = (event) => {
    confettiRuntime.pointer = {
      x: event.clientX,
      y: event.clientY,
    };
  };
  window.addEventListener("pointermove", confettiRuntime.moveHandler, { passive: true });

  const maxLifetimeMs = durationMs + 18000;
  confettiRuntime.cleanupTimerId = window.setTimeout(stopConfetti, maxLifetimeMs);
  confettiRuntime.frameId = window.requestAnimationFrame((now) => animateConfetti(now, durationMs));
}

function stopConfetti() {
  if (confettiRuntime.frameId !== null) {
    window.cancelAnimationFrame(confettiRuntime.frameId);
    confettiRuntime.frameId = null;
  }

  if (confettiRuntime.cleanupTimerId !== null) {
    window.clearTimeout(confettiRuntime.cleanupTimerId);
    confettiRuntime.cleanupTimerId = null;
  }

  if (confettiRuntime.moveHandler) {
    window.removeEventListener("pointermove", confettiRuntime.moveHandler);
    confettiRuntime.moveHandler = null;
  }

  if (confettiRuntime.layer) {
    confettiRuntime.layer.remove();
    confettiRuntime.layer = null;
  }

  confettiRuntime.pieces = [];
  confettiRuntime.pointer = null;
  confettiRuntime.startTime = 0;
  confettiRuntime.lastFrameTime = 0;

  document.querySelectorAll(".confetti-layer").forEach((layer) => layer.remove());
}

function createConfettiPiece(layer, colors) {
  const piece = document.createElement("span");
  piece.className = "confetti-piece";
  piece.style.background = randomChoice(colors);
  piece.style.display = "none";
  layer.appendChild(piece);

  return {
    active: false,
    element: piece,
    gravity: 0,
    height: 0,
    rotation: 0,
    rotationSpeed: 0,
    spawnAt: 0,
    wobbleAmount: 0,
    wobblePhase: 0,
    wobbleSpeed: 0,
    width: 0,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
  };
}

function resetConfettiPiece(piece, elapsedMs, durationMs, viewportWidth, allowFullSpawnWindow) {
  const maxDelay = allowFullSpawnWindow
    ? durationMs
    : Math.min(1400, Math.max(250, durationMs - elapsedMs));

  piece.active = false;
  piece.spawnAt = elapsedMs + randomInt(0, maxDelay);
  piece.width = randomInt(8, 14);
  piece.height = randomInt(12, 22);
  piece.x = Math.random() * viewportWidth;
  piece.y = -randomInt(30, 220);
  piece.vx = randomInt(-40, 40);
  piece.vy = randomInt(18, 55);
  piece.gravity = randomInt(80, 160);
  piece.rotation = randomInt(0, 360);
  piece.rotationSpeed = randomInt(-260, 260);
  piece.wobbleAmount = randomInt(18, 46);
  piece.wobbleSpeed = 1.2 + Math.random() * 2.4;
  piece.wobblePhase = Math.random() * Math.PI * 2;

  piece.element.style.width = `${piece.width}px`;
  piece.element.style.height = `${piece.height}px`;
  piece.element.style.left = "0";
  piece.element.style.top = "0";
  piece.element.style.opacity = `${0.78 + Math.random() * 0.22}`;
  piece.element.style.display = "none";
}

function animateConfetti(now, durationMs) {
  if (!confettiRuntime.layer) {
    return;
  }

  const elapsedMs = now - confettiRuntime.startTime;
  const deltaMs = Math.min(32, now - confettiRuntime.lastFrameTime || 16);
  const deltaSeconds = deltaMs / 1000;
  const viewportWidth = getViewportWidth();
  const viewportHeight = getViewportHeight();
  const pointer = confettiRuntime.pointer;
  let activeCount = 0;

  confettiRuntime.lastFrameTime = now;

  for (const piece of confettiRuntime.pieces) {
    if (!piece.active) {
      if (elapsedMs >= piece.spawnAt) {
        piece.active = true;
        piece.element.style.display = "block";
      } else {
        continue;
      }
    }

    if (pointer) {
      applyConfettiRepulsion(piece, pointer, deltaSeconds);
    }

    piece.vx *= 0.996;
    piece.vy += piece.gravity * deltaSeconds;
    piece.x +=
      (piece.vx + Math.sin(elapsedMs / 1000 * piece.wobbleSpeed + piece.wobblePhase) * piece.wobbleAmount) *
      deltaSeconds;
    piece.y += piece.vy * deltaSeconds;
    piece.rotation += piece.rotationSpeed * deltaSeconds;

    piece.element.style.transform =
      `translate3d(${piece.x}px, ${piece.y}px, 0) rotate(${piece.rotation}deg)`;

    if (piece.y > viewportHeight + 140 || piece.x < -180 || piece.x > viewportWidth + 180) {
      if (elapsedMs < durationMs) {
        resetConfettiPiece(piece, elapsedMs, durationMs, viewportWidth, false);
      } else {
        piece.active = false;
        piece.element.style.display = "none";
      }
      continue;
    }

    activeCount += 1;
  }

  if (elapsedMs < durationMs || activeCount > 0) {
    confettiRuntime.frameId = window.requestAnimationFrame((frameNow) =>
      animateConfetti(frameNow, durationMs)
    );
    return;
  }

  stopConfetti();
}

function applyConfettiRepulsion(piece, pointer, deltaSeconds) {
  const dx = piece.x - pointer.x;
  const dy = piece.y - pointer.y;
  const distance = Math.hypot(dx, dy) || 1;
  const radius = 170;

  if (distance > radius) {
    return;
  }

  const force = (1 - distance / radius) * 1900;
  piece.vx += (dx / distance) * force * deltaSeconds;
  piece.vy += (dy / distance) * force * deltaSeconds;
}

function getNow() {
  if (typeof performance !== "undefined" && typeof performance.now === "function") {
    return performance.now();
  }

  return Date.now();
}

function getViewportWidth() {
  return window.innerWidth || document.documentElement.clientWidth || 1024;
}

function getViewportHeight() {
  return window.innerHeight || document.documentElement.clientHeight || 768;
}

function generateAdditionValues(difficulty) {
  const config = {
    1: { min: 0, max: 10, answerMin: 0, answerMax: 20, negativeBias: 0 },
    2: { min: -5, max: 20, answerMin: -10, answerMax: 30, negativeBias: 0.3 },
    3: { min: -10, max: 30, answerMin: -20, answerMax: 40, negativeBias: 0.4 },
    4: { min: -20, max: 50, answerMin: -20, answerMax: 70, negativeBias: 0.5 },
    5: { min: -20, max: 80, answerMin: -20, answerMax: 100, negativeBias: 0.55 },
  }[difficulty];

  return buildSignedOperationValues((left, right) => left + right, config);
}

function generateSubtractionValues(difficulty) {
  const config = {
    1: { min: 0, max: 12, answerMin: 0, answerMax: 12, negativeBias: 0 },
    2: { min: -5, max: 20, answerMin: -10, answerMax: 25, negativeBias: 0.35 },
    3: { min: -10, max: 30, answerMin: -20, answerMax: 40, negativeBias: 0.45 },
    4: { min: -20, max: 50, answerMin: -20, answerMax: 70, negativeBias: 0.55 },
    5: { min: -20, max: 80, answerMin: -20, answerMax: 100, negativeBias: 0.6 },
  }[difficulty];

  return buildSignedOperationValues((left, right) => left - right, config);
}

function buildSignedOperationValues(operation, config) {
  while (true) {
    const left = randomInt(config.min, config.max);
    const right = randomInt(config.min, config.max);
    const answer = operation(left, right);

    if (answer < config.answerMin || answer > config.answerMax) {
      continue;
    }

    if (
      config.negativeBias > 0 &&
      Math.random() < config.negativeBias &&
      left >= 0 &&
      right >= 0 &&
      answer >= 0
    ) {
      continue;
    }

    return [left, right, answer];
  }
}

function generateMultiplicationValues(difficulty) {
  const config = {
    1: { min: 0, max: 5, requireLargeFactor: false },
    2: { min: 0, max: 6, requireLargeFactor: false },
    3: { min: 0, max: 8, requireLargeFactor: false },
    4: { min: 1, max: 10, requireLargeFactor: false },
    5: { min: 2, max: 10, requireLargeFactor: true },
  }[difficulty];

  while (true) {
    const left = randomInt(config.min, config.max);
    const right = randomInt(config.min, config.max);
    if (config.requireLargeFactor && left < 6 && right < 6) {
      continue;
    }
    return { left, right };
  }
}

function generateDivisionProblem(difficulty) {
  const config = {
    1: { divisors: [2, 3, 4, 5], quotientMin: 1, quotientMax: 10 },
    2: { divisors: [2, 3, 4, 5, 6, 10], quotientMin: 2, quotientMax: 12 },
    3: { divisors: [2, 3, 4, 5, 6, 7, 8, 9, 10], quotientMin: 2, quotientMax: 15 },
    4: { divisors: [3, 4, 5, 6, 7, 8, 9, 10, 12], quotientMin: 3, quotientMax: 18 },
    5: { divisors: [4, 5, 6, 7, 8, 9, 10, 12], quotientMin: 4, quotientMax: 25 },
  }[difficulty];

  const divisor = randomChoice(config.divisors);
  const quotient = randomInt(config.quotientMin, config.quotientMax);
  return {
    divisor,
    dividend: divisor * quotient,
    quotient,
  };
}

function generateMissingNumberProblem(difficulty) {
  const operation = randomChoice(
    {
      1: ["addition", "subtraction"],
      2: ["addition", "subtraction"],
      3: ["addition", "subtraction", "multiplication"],
      4: ["addition", "subtraction", "multiplication", "division"],
      5: ["addition", "subtraction", "multiplication", "division"],
    }[difficulty]
  );

  if (operation === "addition") {
    const [left, right, answer] = generateAdditionValues(Math.max(1, difficulty - 1));
    if (Math.random() < 0.5) {
      return {
        questionText: "What number makes the equation true?",
        displayText: `__ + ${formatSignedNumber(right)} = ${formatSignedNumber(answer)}`,
        answer: left,
      };
    }

    return {
      questionText: "What number makes the equation true?",
      displayText: `${formatSignedNumber(left)} + __ = ${formatSignedNumber(answer)}`,
      answer: right,
    };
  }

  if (operation === "subtraction") {
    const [left, right, answer] = generateSubtractionValues(Math.max(1, difficulty - 1));
    if (Math.random() < 0.5) {
      return {
        questionText: "What number makes the equation true?",
        displayText: `__ - ${formatSignedNumber(right)} = ${formatSignedNumber(answer)}`,
        answer: left,
      };
    }

    return {
      questionText: "What number makes the equation true?",
      displayText: `${formatSignedNumber(left)} - __ = ${formatSignedNumber(answer)}`,
      answer: right,
    };
  }

  if (operation === "multiplication") {
    const { left, right } = generateMultiplicationValues(difficulty);
    if (Math.random() < 0.5) {
      return {
        questionText: "What number makes the equation true?",
        displayText: `__ × ${right} = ${left * right}`,
        answer: left,
      };
    }

    return {
      questionText: "What number makes the equation true?",
      displayText: `${left} × __ = ${left * right}`,
      answer: right,
    };
  }

  const { dividend, divisor, quotient } = generateDivisionProblem(difficulty);
  if (Math.random() < 0.5) {
    return {
      questionText: "What number makes the equation true?",
      displayText: `__ ÷ ${divisor} = ${quotient}`,
      answer: dividend,
    };
  }

  return {
    questionText: "What number makes the equation true?",
    displayText: `${dividend} ÷ __ = ${quotient}`,
    answer: divisor,
  };
}

function generateDecimalOperationProblem(difficulty) {
  const config = {
    1: { digits: 1, maxWhole: 3, allowSubtraction: false },
    2: { digits: 1, maxWhole: 8, allowSubtraction: true },
    3: { digits: 2, maxWhole: 10, allowSubtraction: true },
    4: { digits: 2, maxWhole: 20, allowSubtraction: true },
    5: { digits: 2, maxWhole: 35, allowSubtraction: true },
  }[difficulty];
  const scale = 10 ** config.digits;
  const operator = config.allowSubtraction && Math.random() < 0.45 ? "-" : "+";

  while (true) {
    const leftScaled = randomInt(scale, config.maxWhole * scale);
    const rightScaled =
      operator === "-"
        ? randomInt(1, Math.max(1, leftScaled - 1))
        : randomInt(1, config.maxWhole * scale);
    const answerScaled = operator === "-" ? leftScaled - rightScaled : leftScaled + rightScaled;

    if (answerScaled <= 0 || answerScaled > (config.maxWhole + 5) * scale) {
      continue;
    }

    if (leftScaled % scale === 0 && rightScaled % scale === 0) {
      continue;
    }

    return {
      digits: config.digits,
      operator,
      leftText: formatDecimalNumber(leftScaled / scale, config.digits),
      rightText: formatDecimalNumber(rightScaled / scale, config.digits),
      answer: Number((answerScaled / scale).toFixed(config.digits)),
    };
  }
}

function generateComparisonDragProblem(difficulty) {
  const config = {
    1: { min: 10, max: 99, minGap: 4 },
    2: { min: 100, max: 999, minGap: 10 },
  }[Math.min(2, Math.max(1, difficulty))];

  while (true) {
    const left = randomInt(config.min, config.max);
    const right = randomInt(config.min, config.max);
    if (Math.abs(left - right) < config.minGap) {
      continue;
    }

    return {
      left,
      right,
      answer: left < right ? "<" : ">",
    };
  }
}

function generatePlaceValueProblem(difficulty) {
  const digitCount = difficulty <= 2 ? 4 : difficulty === 3 ? 5 : 6;
  const digits = buildUniqueDigitSequence(digitCount);
  const validIndexes = digits
    .map((digit, index) => (digit === 0 ? null : index))
    .filter((value) => value !== null);
  const targetIndex = randomChoice(validIndexes);
  const targetDigit = digits[targetIndex];
  const placePower = digitCount - targetIndex - 1;
  const answer = targetDigit * 10 ** placePower;
  const optionPowers = shuffleArray(
    Array.from({ length: digitCount }, (_, power) => power).filter((power) => power !== placePower)
  ).slice(0, 3);

  return {
    numberText: formatGroupedNumber(Number(digits.join(""))),
    digit: targetDigit,
    answer,
    options: shuffleArray([placePower, ...optionPowers]).map((power) => targetDigit * 10 ** power),
  };
}

function generateRoundingProblem(difficulty) {
  const config = {
    1: { placeValues: [10], min: 12, max: 95 },
    2: { placeValues: [10], min: 25, max: 495 },
    3: { placeValues: [10, 100], min: 120, max: 2495 },
    4: { placeValues: [100], min: 250, max: 4995 },
    5: { placeValues: [100, 1000], min: 1500, max: 99995 },
  }[difficulty];

  while (true) {
    const placeValue = randomChoice(config.placeValues);
    const number = randomInt(config.min, config.max);
    if (number % placeValue === 0) {
      continue;
    }

    return {
      number,
      placeValue,
      answer: roundToNearest(number, placeValue),
    };
  }
}

function generateDecimalComparisonProblem(difficulty) {
  const digits = difficulty <= 2 ? 1 : 2;
  const scale = 10 ** digits;
  const askFor = randomChoice(["greatest", "smallest"]);
  const scaledValues = new Set();
  const baseWhole = difficulty <= 2 ? randomInt(0, 9) : randomInt(1, 24);

  while (scaledValues.size < 4) {
    let wholePart = baseWhole;
    if (difficulty >= 4 && Math.random() < 0.35) {
      wholePart += randomChoice([-1, 1]);
    }

    const fractionalPart = randomInt(0, scale - 1);
    const scaledValue = wholePart * scale + fractionalPart;
    if (scaledValue >= 0) {
      scaledValues.add(scaledValue);
    }
  }

  const ordered = Array.from(scaledValues);
  const answerScaled = askFor === "greatest" ? Math.max(...ordered) : Math.min(...ordered);

  return {
    askFor,
    options: ordered.map((value) => formatDecimalNumber(value / scale, digits)),
    answer: formatDecimalNumber(answerScaled / scale, digits),
  };
}

function generateRectangleMeasureProblem(difficulty) {
  const config = {
    1: { min: 2, max: 6, measures: ["area"] },
    2: { min: 2, max: 8, measures: ["area", "perimeter"] },
    3: { min: 3, max: 10, measures: ["area", "perimeter"] },
    4: { min: 4, max: 14, measures: ["area", "perimeter"] },
    5: { min: 5, max: 20, measures: ["area", "perimeter"] },
  }[difficulty];
  const length = randomInt(config.min, config.max);
  let width = randomInt(config.min, config.max);
  while (width === length) {
    width = randomInt(config.min, config.max);
  }
  const measure = randomChoice(config.measures);

  return {
    questionText: `A rectangle is ${length} units long and ${width} units wide. What is the ${measure}?`,
    measure,
    answer: measure === "area" ? length * width : 2 * (length + width),
  };
}

function generatePrimeCompositeProblem(difficulty) {
  const maxValue = difficulty <= 2 ? 25 : difficulty === 3 ? 40 : difficulty === 4 ? 60 : 90;
  const values = Array.from({ length: maxValue - 1 }, (_, index) => index + 2);
  const primes = values.filter(isPrime);
  const composites = values.filter((value) => !isPrime(value));
  const askFor = randomChoice(["prime", "composite"]);
  const answerPool = askFor === "prime" ? primes : composites;
  const distractorPool = askFor === "prime" ? composites : primes;
  const answer = randomChoice(answerPool);

  return {
    askFor,
    answer,
    options: shuffleArray([answer, ...shuffleArray(distractorPool.filter((value) => value !== answer)).slice(0, 3)]),
  };
}

function generateNumberPattern(difficulty) {
  const constantSteps = {
    1: [1, 2, 5],
    2: [2, 3, 4, 5, 10, -1],
    3: [3, 4, 5, 6, 8, -2, -3],
    4: [4, 6, 8, 10, -3, -4],
    5: [5, 6, 8, 10, 12, -4, -5],
  }[difficulty];

  const multiplicativeSteps = {
    1: [],
    2: [],
    3: [2],
    4: [2, 3],
    5: [2, 3],
  }[difficulty];

  const advancedFactories = {
    1: [],
    2: [],
    3: [],
    4: [generateGrowingStepPattern, generateShrinkingStepPattern],
    5: [generateGrowingStepPattern, generateShrinkingStepPattern, generateGrowingStepPattern],
  }[difficulty];

  if (advancedFactories.length && Math.random() < 0.45) {
    return randomChoice(advancedFactories)(difficulty);
  }

  if (multiplicativeSteps.length && Math.random() < (difficulty >= 4 ? 0.25 : 0.35)) {
    const factor = randomChoice(multiplicativeSteps);
    const start = randomInt(1, factor === 2 ? 12 : 3);
    const sequence = [
      start,
      start * factor,
      start * factor * factor,
      start * factor * factor * factor,
    ];
    return {
      sequence,
      answer: start * factor * factor * factor * factor,
    };
  }

  const step = randomChoice(constantSteps);
  const start = randomInt(
    step > 0 ? 1 : Math.abs(step) * 4 + 5,
    difficulty <= 2 ? 20 : difficulty === 3 ? 45 : difficulty === 4 ? 70 : 100
  );
  const sequence = [start, start + step, start + step * 2, start + step * 3];
  return {
    sequence,
    answer: start + step * 4,
  };
}

function generateGrowingStepPattern(difficulty) {
  const stepGrowth = difficulty >= 5 ? randomChoice([2, 3]) : randomChoice([1, 2]);
  const firstStep = difficulty >= 5 ? randomInt(3, 8) : randomInt(2, 6);
  const direction = Math.random() < 0.7 ? 1 : -1;
  const start = direction > 0 ? randomInt(1, difficulty >= 5 ? 35 : 25) : randomInt(35, 90);
  const steps = [
    direction * firstStep,
    direction * (firstStep + stepGrowth),
    direction * (firstStep + stepGrowth * 2),
    direction * (firstStep + stepGrowth * 3),
  ];
  const sequence = [start];

  for (let index = 0; index < 3; index += 1) {
    sequence.push(sequence[sequence.length - 1] + steps[index]);
  }

  return {
    sequence,
    answer: sequence[sequence.length - 1] + steps[3],
  };
}

function generateShrinkingStepPattern(difficulty) {
  const stepChange = difficulty >= 5 ? randomChoice([2, 3]) : 1;
  const baseStep = difficulty >= 5 ? randomInt(8, 14) : randomInt(5, 9);
  const direction = Math.random() < 0.65 ? 1 : -1;
  const steps = [
    direction * baseStep,
    direction * (baseStep - stepChange),
    direction * (baseStep - stepChange * 2),
    direction * (baseStep - stepChange * 3),
  ];
  const smallestMagnitude = Math.min(...steps.map((step) => Math.abs(step)));
  const start =
    direction > 0
      ? randomInt(1, difficulty >= 5 ? 40 : 30)
      : randomInt(20 + smallestMagnitude * 4, difficulty >= 5 ? 110 : 80);
  const sequence = [start];

  for (let index = 0; index < 3; index += 1) {
    sequence.push(sequence[sequence.length - 1] + steps[index]);
  }

  return {
    sequence,
    answer: sequence[sequence.length - 1] + steps[3],
  };
}

function generateMoneyProblem(difficulty) {
  const config = {
    1: { amounts: [10, 20, 30, 40, 50], step: 5 },
    2: { amounts: [20, 30, 40, 50, 60, 80, 100], step: 5 },
    3: { amounts: [50, 60, 80, 90, 100, 120, 150], step: 5 },
    4: { amounts: [80, 100, 120, 150, 180, 200], step: 1 },
    5: { amounts: [100, 120, 150, 180, 200, 250, 300], step: 1 },
  }[difficulty];

  const amount = randomChoice(config.amounts);
  const price = randomChoice(buildMoneyChoicesBelow(amount, config.step));
  return {
    amount,
    price,
    answer: amount - price,
  };
}

function generatePercentageProblem(difficulty) {
  const config = {
    1: { percents: [10, 50], maxWhole: 20 },
    2: { percents: [10, 25, 50, 75], maxWhole: 50 },
    3: { percents: [10, 20, 30, 40, 50, 60, 70, 80, 90], maxWhole: 100 },
    4: { percents: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95], maxWhole: 100 },
    5: { percents: buildPercentChoices(1, 99), maxWhole: 250 },
  }[difficulty];

  while (true) {
    const percent = randomChoice(config.percents);
    const divisor = 100 / greatestCommonDivisor(percent, 100);
    const maxMultiplier = Math.floor(config.maxWhole / divisor);
    if (maxMultiplier < 1) {
      continue;
    }

    const whole = divisor * randomInt(1, maxMultiplier);
    const answer = (percent * whole) / 100;
    if (Number.isInteger(answer) && answer > 0) {
      return { percent, whole, answer };
    }
  }
}

function buildPercentChoices(min, max) {
  const values = [];
  for (let value = min; value <= max; value += 1) {
    values.push(value);
  }
  return values;
}

function buildWholeMeanDataset(answer, count, min, max) {
  while (true) {
    const values = [];
    let remaining = answer * count;

    for (let index = 0; index < count - 1; index += 1) {
      const remainingSlots = count - index - 1;
      const minValue = Math.max(min, remaining - max * remainingSlots);
      const maxValue = Math.min(max, remaining - min * remainingSlots);
      if (minValue > maxValue) {
        break;
      }
      const value = randomInt(minValue, maxValue);
      values.push(value);
      remaining -= value;
    }

    if (values.length !== count - 1) {
      continue;
    }

    if (remaining < min || remaining > max) {
      continue;
    }

    values.push(remaining);
    return shuffleArray(values);
  }
}

function buildMoneyChoicesBelow(amount, step) {
  const prices = [];
  for (let value = step; value < amount; value += step) {
    prices.push(value);
  }
  return prices;
}

function buildDistinctNumberList(count, min, max, minGap, disallowed = new Set()) {
  const values = [];
  let attempts = 0;

  while (values.length < count) {
    attempts += 1;
    if (attempts > 4000) {
      break;
    }

    const candidate = randomInt(min, max);
    if (disallowed.has(candidate)) {
      continue;
    }

    if (values.every((value) => Math.abs(value - candidate) >= minGap)) {
      values.push(candidate);
    }
  }

  if (values.length === count) {
    return values;
  }

  const fallback = [];
  for (let candidate = min; candidate <= max && fallback.length < count; candidate += 1) {
    if (disallowed.has(candidate)) {
      continue;
    }
    if (fallback.every((value) => Math.abs(value - candidate) >= Math.max(1, minGap))) {
      fallback.push(candidate);
    }
  }

  if (fallback.length === count) {
    return fallback;
  }

  return values;
}

function buildNumberOptions(answer, min = answer - 12, max = answer + 12) {
  const safeMin = Math.min(min, answer);
  const safeMax = Math.max(max, answer);
  const options = new Set([answer]);

  while (options.size < 4) {
    const candidate = randomInt(safeMin, safeMax);
    if (candidate !== answer) {
      options.add(candidate);
    }
  }

  return shuffleArray(Array.from(options));
}

function buildDecimalStringOptions(answer, digits) {
  const scale = 10 ** digits;
  const answerScaled = Math.round(answer * scale);
  const offsets = digits === 1 ? [1, 2, 4, 6, 10, 15] : [1, 2, 5, 10, 20, 25, 50];
  const options = new Set([answerScaled]);

  while (options.size < 4) {
    const candidate = answerScaled + randomChoice([-1, 1]) * randomChoice(offsets);
    if (candidate >= 0 && candidate !== answerScaled) {
      options.add(candidate);
    }
  }

  return shuffleArray(Array.from(options)).map((value) => formatDecimalNumber(value / scale, digits));
}

function buildRoundingOptions(answer, placeValue) {
  const options = new Set([answer]);
  const multipliers = [-2, -1, 1, 2, 3];

  while (options.size < 4) {
    const candidate = answer + randomChoice(multipliers) * placeValue;
    if (candidate >= 0 && candidate !== answer) {
      options.add(candidate);
    }
  }

  return shuffleArray(Array.from(options));
}

function buildVisualNumberOptions(answer, difficulty, maxOverride = null) {
  const spread = difficulty <= 2 ? 4 : difficulty <= 4 ? 7 : 10;
  const min = Math.max(0, answer - spread);
  const max = Math.max(answer + spread, maxOverride ?? answer + spread);
  return buildNumberOptions(answer, min, max).map(String);
}

function buildHebrewOptions(correctAnswer) {
  const distractorPool = shuffleArray(
    Array.from(new Set(hebrewMeanings.filter((meaning) => meaning !== correctAnswer)))
  );
  return shuffleArray([correctAnswer, ...distractorPool.slice(0, 3)]);
}

function buildTimeOptions(correctMinutes) {
  const offsets = [-90, -60, -45, -30, -20, -15, -10, -5, 5, 10, 15, 20, 30, 45, 60, 75, 90];
  const options = new Set([correctMinutes]);

  while (options.size < 4) {
    options.add(correctMinutes + randomChoice(offsets));
  }

  return shuffleArray(Array.from(options));
}

function formatClockTime(totalMinutes) {
  const normalized = ((totalMinutes % 1440) + 1440) % 1440;
  const hour24 = Math.floor(normalized / 60);
  const minute = normalized % 60;
  const suffix = hour24 >= 12 ? "PM" : "AM";
  let hour12 = hour24 % 12;
  if (hour12 === 0) {
    hour12 = 12;
  }
  return `${hour12}:${String(minute).padStart(2, "0")} ${suffix}`;
}

function formatSignedNumber(value) {
  return value < 0 ? `(${value})` : String(value);
}

function formatDecimalNumber(value, digits) {
  return Number(value).toFixed(digits);
}

function formatGroupedNumber(value) {
  return Number(value).toLocaleString("en-US");
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatUnitCount(value, singular, plural = `${singular}s`) {
  return `${value} ${value === 1 ? singular : plural}`;
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function buildUniqueDigitSequence(count) {
  const digits = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, count);
  if (digits[0] !== 0) {
    return digits;
  }

  const swapIndex = digits.findIndex((digit) => digit !== 0);
  [digits[0], digits[swapIndex]] = [digits[swapIndex], digits[0]];
  return digits;
}

function greatestCommonDivisor(left, right) {
  let a = Math.abs(left);
  let b = Math.abs(right);

  while (b !== 0) {
    [a, b] = [b, a % b];
  }

  return a || 1;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function roundToNearest(value, placeValue) {
  return Math.round(value / placeValue) * placeValue;
}

function isPrime(value) {
  if (value < 2) {
    return false;
  }

  for (let factor = 2; factor * factor <= value; factor += 1) {
    if (value % factor === 0) {
      return false;
    }
  }

  return true;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice(values) {
  return values[randomInt(0, values.length - 1)];
}

function shuffleArray(values) {
  const shuffled = [...values];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInt(0, index);
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}
