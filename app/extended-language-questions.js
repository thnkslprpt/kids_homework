(() => {
  const { entry, pickGeneratedEntry, randomChoice } = globalThis.HomeworkExtended;

  const vocabularyGrammarBlueprints = [
    { topic: "language-spelling", difficulty: 1, question: "Which word is spelled correctly?", answer: "because", options: ["because", "becuz", "beacuse", "becaus"] },
    { topic: "language-spelling", difficulty: 1, question: "Which word is spelled correctly?", answer: "friend", options: ["friend", "freind", "frend", "friende"] },
    { topic: "language-spelling", difficulty: 2, question: "Which word is spelled correctly?", answer: "thought", options: ["thought", "thot", "thaught", "thougt"] },
    { topic: "language-spelling", difficulty: 4, question: "Which word is spelled correctly?", answer: "necessary", options: ["necessary", "neccesary", "necesary", "nessessary"] },
    { topic: "language-syllables", difficulty: 1, question: "How many syllables are in banana?", answer: "3", options: ["1", "2", "3", "4"] },
    { topic: "language-syllables", difficulty: 1, question: "How many syllables are in tiger?", answer: "2", options: ["1", "2", "3", "4"] },
    { topic: "language-syllables", difficulty: 3, question: "How many syllables are in elephant?", answer: "3", options: ["1", "2", "3", "4"] },
    { topic: "language-syllables", difficulty: 5, question: "How many syllables are in information?", answer: "4", options: ["2", "3", "4", "5"] },
    { topic: "language-punctuation", difficulty: 1, question: "Which sentence has correct punctuation?", answer: "Where is my pencil?", options: ["Where is my pencil?", "Where is my pencil.", "Where is my pencil", "Where, is my pencil"] },
    { topic: "language-punctuation", difficulty: 2, question: "Which sentence uses a comma correctly?", answer: "After lunch, we played outside.", options: ["After lunch, we played outside.", "After, lunch we played outside.", "After lunch we, played outside.", "After lunch we played, outside."] },
    { topic: "language-punctuation", difficulty: 6, question: "Which sentence punctuates dialogue correctly?", answer: "\"Wait,\" said Maya.", options: ["\"Wait,\" said Maya.", "\"Wait\" said, Maya.", "Wait, said Maya.", "\"Wait said Maya.\""] },
    { topic: "language-capitalization", difficulty: 1, question: "Which sentence has correct capitalization?", answer: "Maya went to Tel Aviv.", options: ["Maya went to Tel Aviv.", "maya went to tel aviv.", "Maya went to tel aviv.", "maya went to Tel Aviv."] },
    { topic: "language-capitalization", difficulty: 3, question: "Which title is capitalized correctly?", answer: "The Lion and the Mouse", options: ["The Lion and the Mouse", "the lion and the mouse", "The lion And The mouse", "the Lion and The Mouse"] },
    { topic: "language-parts-of-speech", difficulty: 2, question: "Which word is a noun?", displayText: "The careful child builds a tower.", answer: "child", options: ["careful", "child", "builds", "quickly"] },
    { topic: "language-parts-of-speech", difficulty: 3, question: "Which word is a verb?", displayText: "The careful child builds a tower.", answer: "builds", options: ["careful", "child", "builds", "tower"] },
    { topic: "language-parts-of-speech", difficulty: 4, question: "Which word is an adjective?", displayText: "The silver robot moved slowly.", answer: "silver", options: ["silver", "robot", "moved", "slowly"] },
    { topic: "language-parts-of-speech", difficulty: 5, question: "Which word is an adverb?", displayText: "The silver robot moved slowly.", answer: "slowly", options: ["silver", "robot", "moved", "slowly"] },
    { topic: "language-prefixes", difficulty: 2, question: "What does the prefix re- mean in reread?", answer: "again", options: ["again", "not", "before", "between"] },
    { topic: "language-prefixes", difficulty: 4, question: "What does the prefix un- mean in unfair?", answer: "not", options: ["not", "again", "many", "before"] },
    { topic: "language-prefixes", difficulty: 6, question: "What does the prefix pre- mean in preview?", answer: "before", options: ["before", "after", "wrong", "under"] },
    { topic: "language-suffixes", difficulty: 3, question: "What does the suffix -less mean in careless?", answer: "without", options: ["without", "full of", "one who", "again"] },
    { topic: "language-suffixes", difficulty: 7, question: "Which suffix changes a word into a person who does an action?", answer: "-er", options: ["-er", "-less", "-ful", "-ness"] },
    { topic: "language-roots", difficulty: 5, question: "What does the root scrib/script mean?", answer: "write", options: ["write", "carry", "hear", "measure"] },
    { topic: "language-roots", difficulty: 8, question: "What does the root bio mean?", answer: "life", options: ["life", "water", "sound", "light"] },
    { topic: "language-sentence-combining", difficulty: 4, question: "Which sentence combines the ideas best?", displayText: "The rain stopped. We went outside.", answer: "When the rain stopped, we went outside.", options: ["When the rain stopped, we went outside.", "The rain stopped we went outside.", "Outside stopped when rain went.", "We went rain stopped outside."] },
    { topic: "language-sentence-combining", difficulty: 6, question: "Which sentence combines the ideas best?", displayText: "The bridge was narrow. The hikers crossed carefully.", answer: "Because the bridge was narrow, the hikers crossed carefully.", options: ["Because the bridge was narrow, the hikers crossed carefully.", "The bridge narrow hikers because crossed.", "The hikers crossed because carefully narrow.", "The bridge was narrow the hikers crossed carefully."] },
    { topic: "language-sentence-combining", difficulty: 9, question: "Which revision is most concise and clear?", displayText: "Due to the fact that the trail was icy, the hikers moved at a slow speed.", answer: "Because the trail was icy, the hikers moved slowly.", options: ["Because the trail was icy, the hikers moved slowly.", "The icy trail was due to the hikers slowly.", "At a slow speed, the trail was due to ice.", "The hikers were icy because speed was slow."] },
  ];

  const readingBlueprints = [
    { topic: "reading-main-idea", difficulty: 1, question: "What is the main idea?", displayText: "Sam feeds the dog, fills its water bowl, and brushes its fur.", answer: "Sam takes care of the dog.", options: ["Sam takes care of the dog.", "Sam loses the dog.", "The dog is at school.", "The bowl is broken."] },
    { topic: "reading-paragraph-ordering", difficulty: 1, question: "Which comes first?", displayText: "A: Eat the sandwich. B: Make the sandwich. C: Put the plate away.", answer: "B", options: ["A", "B", "C", "They are all first"] },
    { topic: "reading-main-idea", difficulty: 2, question: "What is the main idea?", displayText: "Nora waters the seedlings every morning. She checks the soil and moves the tray closer to the window when the leaves look pale.", answer: "Nora takes care of seedlings carefully.", options: ["Nora takes care of seedlings carefully.", "Nora dislikes plants.", "The window is broken.", "Seedlings never need water."] },
    { topic: "reading-evidence", difficulty: 3, question: "Which detail is evidence that the library was busy?", displayText: "The librarian put out extra chairs. Every table was full, and a line formed at the desk.", answer: "Every table was full.", options: ["Every table was full.", "The librarian works there.", "The chairs had legs.", "The desk was near the door."] },
    { topic: "reading-paragraph-ordering", difficulty: 4, question: "Which paragraph order makes the most sense?", displayText: "A: Finally, she served the soup. B: First, she chopped vegetables. C: Then, she let the soup simmer.", answer: "B, C, A", options: ["B, C, A", "A, B, C", "C, A, B", "B, A, C"] },
    { topic: "reading-evidence", difficulty: 5, question: "Which detail is evidence for the claim?", displayText: "Claim: The library is busier after school. Visits: morning 18, lunch 24, after school 51.", answer: "After school had 51 visits, the most of the three times.", options: ["After school had 51 visits, the most of the three times.", "Libraries have books.", "Lunch sounds busy.", "Morning comes before lunch."] },
    { topic: "reading-inference", difficulty: 5, question: "What can you infer?", displayText: "Mia looked at the dark clouds, zipped her backpack, and took an umbrella.", answer: "Mia thinks it may rain.", options: ["Mia thinks it may rain.", "Mia is going swimming.", "Mia hates backpacks.", "The umbrella is broken."] },
    { topic: "reading-inference", difficulty: 7, question: "What can you infer?", displayText: "Omar crossed out two answers, reread the question, and checked the chart before choosing.", answer: "Omar is trying to answer carefully.", options: ["Omar is trying to answer carefully.", "Omar cannot read charts.", "Omar already knows the answer is wrong.", "Omar is ignoring the question."] },
    { topic: "reading-summarization", difficulty: 8, question: "Which summary is strongest?", displayText: "A class tested three bridge designs. The triangle design held the most weight, so they chose it for the final model.", answer: "The class used test results to choose the strongest bridge design.", options: ["The class used test results to choose the strongest bridge design.", "The class built a bridge and everyone was amazed.", "Triangles are always better for every object.", "The class did not test anything."] },
    { topic: "reading-summarization", difficulty: 9, question: "Which summary keeps only the important information?", displayText: "A team tried three materials for a model roof. Paper leaked quickly, foil bent, and plastic stayed dry. The team used plastic in the final model.", answer: "The team tested roof materials and chose plastic because it worked best.", options: ["The team tested roof materials and chose plastic because it worked best.", "The paper was white and the foil was shiny.", "The model roof was the greatest roof ever made.", "The team used every material equally in the final model."] },
    { topic: "reading-summarization", difficulty: 10, question: "Which summary is most objective?", displayText: "The article explains that city trees lower street temperatures, provide shade, and can reduce storm-water runoff.", answer: "City trees can cool streets, give shade, and help manage runoff.", options: ["City trees can cool streets, give shade, and help manage runoff.", "Trees are obviously the best thing in every city.", "The article is mostly about birds in trees.", "Storm water is never affected by trees."] },
  ];

  function createFromBlueprints(blueprints) {
    return (difficulty) => {
      const level = Math.max(1, Math.min(10, Number.parseInt(difficulty, 10) || 3));
      const choices = blueprints.filter((item) => item.difficulty <= level);
      return entry(randomChoice(choices));
    };
  }

  globalThis.createExtendedVocabularyGrammarGeneratedEntry = (difficulty) =>
    pickGeneratedEntry([createFromBlueprints(vocabularyGrammarBlueprints)], difficulty);

  globalThis.createExtendedReadingComprehensionGeneratedEntry = (difficulty) =>
    pickGeneratedEntry([createFromBlueprints(readingBlueprints)], difficulty);
})();
