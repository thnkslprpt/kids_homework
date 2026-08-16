// Child-facing safety practice for an Israel-based family. These prompts teach
// recognition and help-seeking, not independent diagnosis or treatment.
const HEALTH_CONTENT_REVIEWED_AT = "2026-08-12";
const HEALTH_SOURCES = Object.freeze({
  emergencyIsrael: {
    title: "Magen David Adom in Israel",
    url: "https://www.mdais.org/en",
    locale: "Israel",
  },
  poisonIsrael: {
    title: "Rambam National Poison Information Center",
    url: "https://www.rambam.org.il/en/departmentsandclinics/laboratories-division/clinical-pharmacology-and-toxicology/national-center-for-the-treatment-of-poisoning/",
    locale: "Israel",
  },
  firstAid: {
    title: "NHS first aid guidance",
    url: "https://www.nhs.uk/conditions/first-aid/",
    locale: "General",
  },
  fire: {
    title: "American Red Cross: If a Fire Starts",
    url: "https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/fire/if-a-fire-starts.html",
    locale: "General",
  },
});

function healthQuestion({
  id,
  difficulty,
  skill,
  question,
  answer,
  options,
  explanation,
  source = HEALTH_SOURCES.firstAid,
}) {
  const normalizedOptions = Array.from(new Set((options || []).map((option) => String(option).trim())));
  if (!id || !skill || !question || !answer || normalizedOptions.length !== 4 || !normalizedOptions.includes(answer)) {
    throw new Error(`Invalid reviewed health question: ${id || question || "unknown"}`);
  }
  return {
    contentId: `health.${id}`,
    skill: `health.${skill}`,
    gradeMin: difficulty,
    gradeMax: difficulty,
    difficulty,
    question,
    options: normalizedOptions,
    answer,
    explanation,
    reviewText: explanation,
    source,
    reviewedAt: HEALTH_CONTENT_REVIEWED_AT,
    locale: source.locale,
  };
}

const HEALTH_AND_FIRST_AID_QUESTIONS = [
  healthQuestion({
    id: "helmet-recognition",
    difficulty: 1,
    skill: "prevention.head-protection",
    question: "What helps protect your head when riding a bike or scooter?",
    answer: "A correctly fitted helmet",
    options: ["A correctly fitted helmet", "A baseball cap", "A loose scarf", "A backpack"],
    explanation: "A correctly fitted helmet reduces the chance of a serious head injury in a fall.",
  }),
  healthQuestion({
    id: "scrape-help",
    difficulty: 1,
    skill: "first-aid.small-scrape",
    question: "You get a small scrape while playing. What is a safe first response?",
    answer: "Stop, tell a trusted adult, and rinse it gently with clean water",
    options: [
      "Stop, tell a trusted adult, and rinse it gently with clean water",
      "Keep playing, hide the scrape, and cover it without cleaning it",
      "Rub soil on the scrape, then wait until later to tell an adult",
      "Use someone else's medicine before asking a trusted adult",
    ],
    explanation: "An adult can help check the scrape; gentle rinsing removes visible dirt.",
  }),
  healthQuestion({
    id: "handwashing-time",
    difficulty: 2,
    skill: "prevention.handwashing",
    question: "For about how long should you scrub all parts of your hands with soap?",
    answer: "About 20 seconds",
    options: ["About 5 seconds", "About 10 seconds", "About 20 seconds", "About 2 minutes"],
    explanation: "About 20 seconds gives time to clean palms, backs, fingers, and around the nails.",
  }),
  healthQuestion({
    id: "minor-burn-cool-water",
    difficulty: 2,
    skill: "first-aid.minor-burn",
    question: "After moving away from the heat source, what should you do for a small minor burn while getting adult help?",
    answer: "Cool it under cool running water",
    options: [
      "Cool it under cool running water",
      "Press ice directly onto it",
      "Spread butter or toothpaste on it",
      "Cover it immediately with a thick blanket",
    ],
    explanation: "Cool running water removes heat; direct ice and household creams can damage or contaminate skin.",
  }),
  healthQuestion({
    id: "nosebleed-position",
    difficulty: 3,
    skill: "first-aid.nosebleed",
    question: "Which position is usually safest for a simple nosebleed while an adult helps?",
    answer: "Sit upright and lean slightly forward",
    options: [
      "Sit upright and lean slightly forward",
      "Lie flat and raise both legs",
      "Lean the head far backward",
      "Run around to stop the bleeding",
    ],
    explanation: "Leaning forward helps keep blood from running down the throat.",
  }),
  healthQuestion({
    id: "medicine-adult-dose",
    difficulty: 3,
    skill: "prevention.medicine-safety",
    question: "What is the safest rule for a child taking medicine?",
    answer: "Take it only with a trusted adult and the correct labeled dose",
    options: [
      "Take it only with a trusted adult and the correct labeled dose",
      "Take the amount that a friend remembers from a different medicine",
      "Take twice the labeled dose whenever the symptoms feel worse",
      "Take any familiar-looking pill without checking its label first",
    ],
    explanation: "The correct medicine and dose depend on the person and the label or clinician's directions.",
  }),
  healthQuestion({
    id: "heavy-bleeding-help",
    difficulty: 4,
    skill: "emergency.heavy-bleeding",
    question: "A cut is bleeding heavily and does not quickly stop. What should a child do?",
    answer: "Get a trusted adult and emergency help immediately",
    options: [
      "Get a trusted adult and emergency help immediately",
      "Hide the cut until the bleeding slows",
      "Keep using the injured body part",
      "Remove anything stuck deeply in the wound",
    ],
    explanation: "Heavy or continuing bleeding needs urgent adult and medical help.",
  }),
  healthQuestion({
    id: "thunder-shelter",
    difficulty: 4,
    skill: "emergency.thunderstorm",
    question: "You hear thunder while outside. Which shelter is safest?",
    answer: "A substantial building or an enclosed hard-topped vehicle",
    options: [
      "A substantial building or an enclosed hard-topped vehicle",
      "An isolated tall tree standing at the edge of an open field",
      "An open sports field far away from buildings and vehicles",
      "A shallow outdoor shelter beside a long metal fence",
    ],
    explanation: "Go indoors or into an enclosed hard-topped vehicle; isolated trees and open ground are unsafe.",
  }),
  healthQuestion({
    id: "allergy-breathing-emergency",
    difficulty: 5,
    skill: "emergency.severe-allergy",
    question: "In Israel, someone has signs of a severe allergic reaction and trouble breathing. What should you do?",
    answer: "Call 101 now and follow the emergency dispatcher's instructions",
    options: [
      "Call 101 now and follow the emergency dispatcher's instructions",
      "Wait quietly until tomorrow to see whether the reaction passes",
      "Offer an unfamiliar food to test whether the reaction gets worse",
      "Ask the person to walk home alone before telling a trusted adult",
    ],
    explanation: "Trouble breathing can be life-threatening; call Magen David Adom at 101 immediately.",
    source: HEALTH_SOURCES.emergencyIsrael,
  }),
  healthQuestion({
    id: "poison-center-israel",
    difficulty: 5,
    skill: "emergency.possible-poisoning",
    question: "In Israel, a person may have swallowed poison but is awake and has no serious symptoms. What should an adult do right away?",
    answer: "Call the Israel Poison Information Center at 04-777-1900",
    options: [
      "Call the Israel Poison Information Center at 04-777-1900",
      "Make the person vomit before asking for advice",
      "Give food or drink without professional advice",
      "Wait for symptoms before telling anyone",
    ],
    explanation: "Call the poison center promptly for case-specific advice; for serious symptoms, call emergency services.",
    source: HEALTH_SOURCES.poisonIsrael,
  }),
  healthQuestion({
    id: "unresponsive-check-help",
    difficulty: 6,
    skill: "emergency.unresponsive-person",
    question: "A person does not respond when spoken to or gently tapped. What should a child do first?",
    answer: "Shout for an adult and call emergency services now",
    options: [
      "Shout for an adult and call emergency services now",
      "Give the person food or water immediately",
      "Leave the person alone for an hour",
      "Move the person without checking for danger",
    ],
    explanation: "An unresponsive person needs immediate emergency assessment; follow the dispatcher's instructions.",
    source: HEALTH_SOURCES.emergencyIsrael,
  }),
  healthQuestion({
    id: "concussion-warning",
    difficulty: 6,
    skill: "emergency.head-injury",
    question: "After a hard hit to the head, which change means an adult should seek urgent medical advice?",
    answer: "Increasing confusion, repeated vomiting, or unusual sleepiness",
    options: [
      "Increasing confusion, repeated vomiting, or unusual sleepiness",
      "A shoelace coming untied and a sleeve getting dirty during the fall",
      "Feeling embarrassed because other people saw the person fall over",
      "Wanting to replace a scratched sticker on the outside of a helmet",
    ],
    explanation: "Worsening thinking, vomiting, or alertness after a head injury can signal a serious problem.",
  }),
  healthQuestion({
    id: "heat-illness-response",
    difficulty: 7,
    skill: "emergency.heat-illness",
    question: "During hot-weather exercise, a teammate becomes dizzy, weak, and nauseated. What is the safest response?",
    answer: "Stop activity, move to a cooler place, and get adult help",
    options: [
      "Stop activity, move to a cooler place, and get adult help",
      "Encourage faster exercise to finish sooner",
      "Leave the person alone in direct sunlight",
      "Tell the person to ignore worsening symptoms",
    ],
    explanation: "Stop exertion and get help; worsening symptoms or confusion need emergency care.",
  }),
  healthQuestion({
    id: "unknown-substance-information",
    difficulty: 7,
    skill: "emergency.poison-information",
    question: "Why should the container or label be kept nearby when an adult calls about a possible poisoning?",
    answer: "It can identify the substance and amount for the specialist",
    options: [
      "It can identify the substance and amount for the specialist",
      "It guarantees that no medical care will be needed",
      "It tells the caller to use a home remedy",
      "It replaces describing the person's symptoms",
    ],
    explanation: "Accurate product and exposure information helps professionals give safer instructions.",
    source: HEALTH_SOURCES.poisonIsrael,
  }),
  healthQuestion({
    id: "emergency-scene-safety",
    difficulty: 8,
    skill: "emergency.scene-safety",
    question: "Why should you check for dangers such as traffic, fire, or live electricity before approaching an injured person?",
    answer: "Becoming another injured person would make the emergency worse",
    options: [
      "Becoming another injured person would make the emergency worse",
      "Scene safety matters only to professional rescuers",
      "Approaching quickly always removes every danger",
      "Checking the scene replaces calling emergency services",
    ],
    explanation: "Protect yourself, warn others, and call trained help rather than entering an unsafe scene.",
  }),
  healthQuestion({
    id: "emergency-information",
    difficulty: 8,
    skill: "emergency.call-information",
    question: "Which information is most useful when calling emergency services?",
    answer: "Exact location, what happened, current dangers, and the person's condition",
    options: [
      "Exact location, what happened, current dangers, and the person's condition",
      "Only the caller's favorite place, favorite color, and school subject",
      "A guess about a diagnosis without the location or current condition",
      "A long story about unrelated things that happened earlier that day",
    ],
    explanation: "Location and immediate facts help dispatchers send appropriate help and guide the caller.",
    source: HEALTH_SOURCES.emergencyIsrael,
  }),
  healthQuestion({
    id: "grease-fire-response",
    difficulty: 9,
    skill: "emergency.kitchen-fire",
    question: "A pan of cooking oil catches fire. What should a child do?",
    answer: "Move away, warn others, leave safely, and call for adult or emergency help",
    options: [
      "Move away, warn others, leave safely, and call for adult or emergency help",
      "Pour water into the burning oil and stay nearby to watch what happens",
      "Carry the burning pan through the house to find a different room",
      "Fan the flames to cool the pan while everyone else stays inside",
    ],
    explanation: "Never put water on burning oil or carry the pan; get out, stay out, and call for help.",
    source: HEALTH_SOURCES.fire,
  }),
  healthQuestion({
    id: "fire-exit-priority",
    difficulty: 9,
    skill: "emergency.fire-evacuation",
    question: "A smoke alarm sounds and you see smoke. Which plan has the safest priority?",
    answer: "Use the nearest safe exit, stay outside, and call for help from safety",
    options: [
      "Use the nearest safe exit, stay outside, and call for help from safety",
      "Search every room for important belongings before leaving the building",
      "Hide in a closed cupboard and wait there until the alarm finally stops",
      "Go back inside after leaving so you can check where the fire started",
    ],
    explanation: "Get out, stay out, and call from safety; do not delay to collect belongings.",
    source: HEALTH_SOURCES.fire,
  }),
  healthQuestion({
    id: "advice-source-check",
    difficulty: 10,
    skill: "information.source-evaluation",
    question: "A social-media post gives emergency medical advice but names no expert or source. What is the best response?",
    answer: "Use official emergency or health guidance and ask a qualified adult or professional",
    options: [
      "Use official emergency or health guidance and ask a qualified adult or professional",
      "Follow the post because many people shared it without checking the source",
      "Treat its confident tone as proof that the medical advice must be safe",
      "Combine it with anonymous comments that agree and follow the majority",
    ],
    explanation: "Emergency advice should come from authoritative, current sources and trained professionals.",
  }),
  healthQuestion({
    id: "decision-tree-limits",
    difficulty: 10,
    skill: "emergency.decision-limits",
    question: "What is the most important limit of a first-aid decision tree in a learning app?",
    answer: "It can teach recognition but cannot replace a professional's real-time assessment",
    options: [
      "It can teach recognition but cannot replace a professional's real-time assessment",
      "It guarantees that the same treatment is correct for every person and situation",
      "It makes emergency calls and professional medical advice unnecessary",
      "It can diagnose any condition accurately from only one reported symptom",
    ],
    explanation: "Real emergencies vary; call trained help and follow current professional instructions.",
  }),
];

function healthClampDifficulty(difficulty) {
  const value = Number.parseInt(difficulty, 10);
  return Number.isFinite(value) ? Math.max(1, Math.min(10, value)) : 3;
}

function healthShuffle(values) {
  const copy = [...values];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function healthPick(values) {
  return values[Math.floor(Math.random() * values.length)];
}

function createHealthAndFirstAidGeneratedEntry(difficulty) {
  const level = healthClampDifficulty(difficulty);
  const exact = HEALTH_AND_FIRST_AID_QUESTIONS.filter((question) => question.difficulty === level);
  const picked = healthPick(exact);
  return { ...picked, options: healthShuffle(picked.options) };
}

const HEALTH_DECISION_BLUEPRINTS = [
  { difficulty: 1, id: "tell-adult", skill: "help-seeking", question: "You notice a new injury while playing. What should you do?", answer: "Stop and tell a trusted adult", options: ["Stop and tell a trusted adult", "Hide it and keep playing", "Ask another child for medicine", "Wait until the next day"] },
  { difficulty: 2, id: "burn-myth", skill: "minor-burn", question: "Which burn-care idea should you reject?", answer: "Put ice or butter directly on the burn", options: ["Put ice or butter directly on the burn", "Move away from the heat source", "Get adult help", "Use cool running water for a minor burn"] },
  { difficulty: 3, id: "dose-check", skill: "medicine-safety", question: "Two liquid medicines use different measuring tools. What should an adult do?", answer: "Read each label and use its correct measuring tool", options: ["Read each label and use its correct measuring tool", "Guess from the bottle size", "Use a kitchen spoon for every medicine", "Combine both medicines in one cup"] },
  { difficulty: 4, id: "lightning-choice", skill: "thunderstorm", question: "Thunder starts during a football game. Which decision is safest?", answer: "Stop the game and move into a substantial building", options: ["Stop the game and move into a substantial building", "Continue playing until the rain becomes too heavy to see", "Shelter beside a metal goal until the thunder stops", "Stand under the tallest nearby tree to stay out of the rain"] },
  { difficulty: 5, id: "poison-no-vomit", skill: "possible-poisoning", question: "Why should you not make someone vomit after a possible poisoning unless a professional directs it?", answer: "It can cause additional harm for some substances", options: ["It can cause additional harm for some substances", "It always removes every substance safely", "It makes identifying the product easier", "It replaces calling the poison center"] },
  { difficulty: 6, id: "unresponsive-priority", skill: "unresponsive-person", question: "Why is calling for emergency help urgent when someone is unresponsive?", answer: "Their breathing or circulation may be in danger", options: ["Their breathing or circulation may be in danger", "They always need something to eat", "They are certainly pretending", "Waiting alone is the safest test"] },
  { difficulty: 7, id: "symptom-change", skill: "monitoring", question: "While waiting for professional help, why should an adult notice changes in breathing or alertness?", answer: "Changes help dispatchers update their instructions", options: ["Changes help dispatchers update their instructions", "Changes prove a home diagnosis is correct", "Changes make the location unimportant", "Changes mean the call should be ended"] },
  { difficulty: 8, id: "scene-danger", skill: "scene-safety", question: "A cyclist is hurt in a busy road. What comes before approaching?", answer: "Avoid traffic danger and call trained help", options: ["Avoid traffic danger and call trained help", "Run into traffic immediately", "Move vehicles without warning anyone", "Assume drivers can see everyone"] },
  { difficulty: 9, id: "grease-fire-myth", skill: "kitchen-fire", question: "Which action makes a cooking-oil fire more dangerous?", answer: "Pouring water on the burning oil", options: ["Pouring water on the burning oil", "Leaving by a safe route", "Warning people nearby", "Calling emergency help from safety"] },
  { difficulty: 10, id: "source-recency", skill: "source-evaluation", question: "Two first-aid pages disagree. Which should carry more weight?", answer: "Current guidance from the relevant official health or emergency service", options: ["Current guidance from the relevant official health or emergency service", "The page with the most colorful pictures and dramatic animations", "The oldest anonymous comment even when it gives no sources", "The page that promises one simple cure for every possible case"] },
];

function createHealthAndFirstAidPracticalGeneratedEntry(difficulty) {
  const level = healthClampDifficulty(difficulty);
  const blueprint = HEALTH_DECISION_BLUEPRINTS.find((item) => item.difficulty === level);
  const source = level === 5 ? HEALTH_SOURCES.poisonIsrael : level >= 9 ? HEALTH_SOURCES.fire : HEALTH_SOURCES.firstAid;
  return {
    ...blueprint,
    contentId: `health.decision.${blueprint.id}`,
    skill: `health.emergency.${blueprint.skill}`,
    gradeMin: level,
    gradeMax: level,
    difficulty: level,
    options: healthShuffle(blueprint.options),
    explanation: HEALTH_AND_FIRST_AID_QUESTIONS.find((item) => item.difficulty === level)?.explanation || "Choose the action that protects people and brings trained help.",
    reviewText: HEALTH_AND_FIRST_AID_QUESTIONS.find((item) => item.difficulty === level)?.explanation || "Choose the action that protects people and brings trained help.",
    source,
    reviewedAt: HEALTH_CONTENT_REVIEWED_AT,
    locale: source.locale,
  };
}

globalThis.createHealthAndFirstAidPracticalGeneratedEntry = createHealthAndFirstAidPracticalGeneratedEntry;

globalThis.HomeworkQuestions?.register({
  id: "health-and-first-aid",
  label: "Health and First Aid",
  getStaticQuestions: () => HEALTH_AND_FIRST_AID_QUESTIONS,
  generatedEntryFactory: createHealthAndFirstAidGeneratedEntry,
  supplementalGeneratedEntryFactory: createHealthAndFirstAidPracticalGeneratedEntry,
  generatedShare: 0.55,
  supplementalShare: 0.45,
  supportsDrag: true,
});
