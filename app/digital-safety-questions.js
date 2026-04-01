const DIGITAL_SAFETY_QUESTIONS = [
  {
    question: "Which thing should you not share online without a parent or trusted adult?",
    options: ["Your home address", "Your favorite color", "Your favorite animal", "Your favorite game"],
    answer: "Your home address",
    difficulty: 1,
  },
  {
    question: "Which is the strongest password?",
    options: ["dog123", "MyName", "TreeHouse!48", "111111"],
    answer: "TreeHouse!48",
    difficulty: 1,
  },
  {
    question: "A message says, \"Click right now or your account will disappear!\" What is a warning sign that it may be a scam?",
    options: [
      "It is trying to rush or scare you",
      "It uses words",
      "It is on a screen",
      "It mentions an account",
    ],
    answer: "It is trying to rush or scare you",
    difficulty: 2,
  },
  {
    question: "A stranger in a game chat asks for your school name and phone number. What is the safest choice?",
    options: [
      "Share both if they seem friendly",
      "Share only your school name",
      "Do not share and tell a trusted adult",
      "Ask them for their number first",
    ],
    answer: "Do not share and tell a trusted adult",
    difficulty: 2,
  },
  {
    question: "A website says you must turn off your antivirus program to download a game. What should you do?",
    options: [
      "Turn it off for a minute",
      "Download quickly before the page closes",
      "Leave the site and tell a trusted adult",
      "Type in your password first",
    ],
    answer: "Leave the site and tell a trusted adult",
    difficulty: 3,
  },
  {
    question: "Which is personal information?",
    options: ["Your home address", "Your favorite movie", "Your favorite sport", "Your favorite snack"],
    answer: "Your home address",
    difficulty: 3,
  },
  {
    question: "An email says you won a prize and asks you to click a link. What is the safest next step?",
    options: [
      "Click the link quickly",
      "Reply with your password",
      "Ask a trusted adult before doing anything",
      "Forward it to all your friends",
    ],
    answer: "Ask a trusted adult before doing anything",
    difficulty: 4,
  },
  {
    question: "Before posting a photo of a friend online, what should you do first?",
    options: [
      "Post it right away",
      "Ask permission first",
      "Add their full name",
      "Tag their school",
    ],
    answer: "Ask permission first",
    difficulty: 4,
  },
  {
    question: "A pop-up says you won a phone and asks for bank card details. What is the safest response?",
    options: [
      "Type the details carefully",
      "Close it and tell a trusted adult",
      "Give only part of the card number",
      "Click to see more offers",
    ],
    answer: "Close it and tell a trusted adult",
    difficulty: 5,
  },
  {
    question: "Why is it safer to use different passwords for different accounts?",
    options: [
      "It makes the computer faster",
      "If one password is stolen, the others are still safer",
      "It helps websites know your age",
      "It makes ads shorter",
    ],
    answer: "If one password is stolen, the others are still safer",
    difficulty: 5,
  },
  {
    question: "An app asks for your password to \"fix\" your account. What should you do?",
    options: [
      "Type it in right away",
      "Tell a trusted adult and do not enter it",
      "Send it in a text message",
      "Use your friends' passwords too",
    ],
    answer: "Tell a trusted adult and do not enter it",
    difficulty: 1,
  },
  {
    question: "What is the safest thing to do if a stranger sends you a friend request online?",
    options: [
      "Accept it if they are polite",
      "Accept it and share your school",
      "Ask a trusted adult before responding",
      "Send them your phone number",
    ],
    answer: "Ask a trusted adult before responding",
    difficulty: 1,
  },
  {
    question: "A website wants your location for a game that does not need it. What should you do?",
    options: [
      "Give it right away",
      "Ask a trusted adult first",
      "Share your address too",
      "Ignore the game forever",
    ],
    answer: "Ask a trusted adult first",
    difficulty: 2,
  },
  {
    question: "What does \"log out\" usually do after using a shared device?",
    options: [
      "Keeps your account open for everyone",
      "Closes your account on that device",
      "Deletes the internet",
      "Makes the screen brighter",
    ],
    answer: "Closes your account on that device",
    difficulty: 2,
  },
  {
    question: "A message from a stranger says you must reply right now. What is the warning sign?",
    options: [
      "It uses a picture",
      "It tries to rush you",
      "It has punctuation",
      "It is sent at night",
    ],
    answer: "It tries to rush you",
    difficulty: 3,
  },
  {
    question: "What is the safest choice if an app asks for your microphone but does not need sound?",
    options: [
      "Allow it anyway",
      "Deny it unless a trusted adult says yes",
      "Give it your password",
      "Share your contacts too",
    ],
    answer: "Deny it unless a trusted adult says yes",
    difficulty: 4,
  },
  {
    question: "Someone you do not know asks you to move from a game chat to private messages. What should you do?",
    options: [
      "Move right away",
      "Keep chatting and share your school",
      "Stop chatting and tell a trusted adult",
      "Send a selfie first",
    ],
    answer: "Stop chatting and tell a trusted adult",
    difficulty: 4,
  },
  {
    question: "Which password is the strongest?",
    options: ["apple1", "BlueSky22!", "mypassword", "12345678"],
    answer: "BlueSky22!",
    difficulty: 5,
  },
  {
    question: "Why should you avoid clicking pop-up ads that say you won a prize?",
    options: [
      "They are always free",
      "They can be scams or tricks",
      "They help your device run faster",
      "They make your battery last longer",
    ],
    answer: "They can be scams or tricks",
    difficulty: 5,
  },
];

function createDigitalSafetyGeneratedEntry(difficulty) {
  const level = digitalSafetyClampDifficulty(difficulty);
  const generatorsByLevel = {
    1: [
      digitalSafetyCreatePasswordQuestion,
      digitalSafetyCreatePersonalInfoQuestion,
      digitalSafetyCreateFriendRequestQuestion,
    ],
    2: [
      digitalSafetyCreateRushingMessageQuestion,
      digitalSafetyCreatePersonalInfoQuestion,
      digitalSafetyCreatePermissionQuestion,
    ],
    3: [
      digitalSafetyCreateSharedDeviceQuestion,
      digitalSafetyCreatePermissionQuestion,
    ],
    4: [
      digitalSafetyCreatePhotoPermissionQuestion,
      digitalSafetyCreateRushingMessageQuestion,
    ],
    5: [
      digitalSafetyCreateScamPrizeQuestion,
      digitalSafetyCreatePasswordQuestion,
      digitalSafetyCreatePhotoPermissionQuestion,
    ],
  };

  return {
    ...digitalSafetyPick(generatorsByLevel[level])(),
    difficulty: level,
  };
}

function digitalSafetyCreatePasswordQuestion() {
  const templates = [
    {
      question: "Which is the strongest password?",
      options: ["dog123", "MyName", "TreeHouse!48", "111111"],
      answer: "TreeHouse!48",
    },
    {
      question: "Which password is the strongest?",
      options: ["apple1", "BlueSky22!", "mypassword", "12345678"],
      answer: "BlueSky22!",
    },
  ];
  return digitalSafetyPick(templates);
}

function digitalSafetyCreatePersonalInfoQuestion() {
  const templates = [
    {
      question: "Which thing should you not share online without a parent or trusted adult?",
      options: ["Your home address", "Your favorite color", "Your favorite animal", "Your favorite game"],
      answer: "Your home address",
    },
    {
      question: "Which is personal information?",
      options: ["Your home address", "Your favorite movie", "Your favorite sport", "Your favorite snack"],
      answer: "Your home address",
    },
  ];
  return digitalSafetyPick(templates);
}

function digitalSafetyCreateFriendRequestQuestion() {
  return {
    question: "What is the safest thing to do if a stranger sends you a friend request online?",
    options: [
      "Accept it if they are polite",
      "Accept it and share your school",
      "Ask a trusted adult before responding",
      "Send them your phone number",
    ],
    answer: "Ask a trusted adult before responding",
    difficulty: 1,
  };
}

function digitalSafetyCreateRushingMessageQuestion() {
  const templates = [
    {
      question: "A message says, \"Click right now or your account will disappear!\" What is a warning sign that it may be a scam?",
      options: [
        "It is trying to rush or scare you",
        "It uses words",
        "It is on a screen",
        "It mentions an account",
      ],
      answer: "It is trying to rush or scare you",
    },
    {
      question: "A message from a stranger says you must reply right now. What is the warning sign?",
      options: ["It uses a picture", "It tries to rush you", "It has punctuation", "It is sent at night"],
      answer: "It tries to rush you",
    },
  ];
  return digitalSafetyPick(templates);
}

function digitalSafetyCreatePermissionQuestion() {
  const templates = [
    {
      question: "A website wants your location for a game that does not need it. What should you do?",
      options: ["Give it right away", "Ask a trusted adult first", "Share your address too", "Ignore the game forever"],
      answer: "Ask a trusted adult first",
    },
    {
      question: "What is the safest thing to do if an app asks for your microphone but does not need sound?",
      options: [
        "Allow it anyway",
        "Deny it unless a trusted adult says yes",
        "Give it your password",
        "Share your contacts too",
      ],
      answer: "Deny it unless a trusted adult says yes",
    },
  ];
  return digitalSafetyPick(templates);
}

function digitalSafetyCreateSharedDeviceQuestion() {
  return {
    question: "What does \"log out\" usually do after using a shared device?",
    options: [
      "Keeps your account open for everyone",
      "Closes your account on that device",
      "Deletes the internet",
      "Makes the screen brighter",
    ],
    answer: "Closes your account on that device",
    difficulty: 2,
  };
}

function digitalSafetyCreatePhotoPermissionQuestion() {
  return {
    question: "Before posting a photo of a friend online, what should you do first?",
    options: ["Post it right away", "Ask permission first", "Add their full name", "Tag their school"],
    answer: "Ask permission first",
    difficulty: 4,
  };
}

function digitalSafetyCreateScamPrizeQuestion() {
  return {
    question: "A pop-up says you won a phone and asks for bank card details. What is the safest response?",
    options: [
      "Type the details carefully",
      "Close it and tell a trusted adult",
      "Give only part of the card number",
      "Click to see more offers",
    ],
    answer: "Close it and tell a trusted adult",
    difficulty: 5,
  };
}

function digitalSafetyClampDifficulty(difficulty) {
  const value = Number(difficulty);
  if (!Number.isInteger(value) || value < 1) {
    return 1;
  }
  return Math.min(5, value);
}

function digitalSafetyPick(values) {
  if (typeof randomChoice === "function") {
    return randomChoice(values);
  }
  return values[Math.floor(Math.random() * values.length)];
}
