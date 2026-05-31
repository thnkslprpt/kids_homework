(() => {
  const { entry, pickGeneratedEntry, randomChoice } = globalThis.HomeworkExtended;

  const blueprints = [
    { topic: "history-timelines", difficulty: 1, question: "Which comes first on a timeline?", displayText: "A: Plant a seed. B: Water the sprout. C: Pick the tomato.", answer: "A", options: ["A", "B", "C", "They happen together"] },
    { topic: "history-timelines", difficulty: 4, question: "Which comes first on a timeline?", displayText: "A: Build a house. B: Move into the house. C: Paint the rooms after moving in.", answer: "A", options: ["A", "B", "C", "They happen at the same time"] },
    { topic: "history-timelines", difficulty: 9, question: "Which timeline order is correct?", answer: "Cause, event, consequence", options: ["Cause, event, consequence", "Consequence, cause, event", "Event, consequence, cause", "All timelines ignore order"] },
    { topic: "geography-latitude-longitude", difficulty: 3, question: "What do latitude lines measure?", answer: "Distance north or south of the equator", options: ["Distance north or south of the equator", "Height of a mountain", "Population of a city", "Depth of an ocean"] },
    { topic: "geography-latitude-longitude", difficulty: 5, question: "Which line is longitude?", answer: "A line measuring east or west of the prime meridian", options: ["A line measuring east or west of the prime meridian", "A line measuring temperature", "A line showing only rivers", "A line around one classroom"] },
    { topic: "geography-latitude-longitude", difficulty: 10, question: "Why are latitude and climate connected?", answer: "Latitude affects how directly sunlight reaches a place", options: ["Latitude affects how directly sunlight reaches a place", "Latitude changes the language people speak", "Latitude controls all holidays", "Latitude measures population"] },
    { topic: "geography-climate-zones", difficulty: 1, question: "Which climate zone is usually coldest?", answer: "Polar", options: ["Polar", "Tropical", "Desert", "Temperate"] },
    { topic: "geography-climate-zones", difficulty: 2, question: "Which climate zone is usually hottest year-round?", answer: "Tropical", options: ["Tropical", "Polar", "Temperate", "Mountain"] },
    { topic: "geography-climate-zones", difficulty: 7, question: "Why can mountains have cooler climates than nearby lowlands?", answer: "Temperature often drops at higher elevations", options: ["Temperature often drops at higher elevations", "Mountains are always near the equator", "Longitude makes all mountains hot", "Snow creates latitude lines"] },
    { topic: "geography-landforms", difficulty: 1, question: "Which landform is a very high area of land?", answer: "Mountain", options: ["Mountain", "River", "Island", "Valley"] },
    { topic: "geography-landforms", difficulty: 2, question: "Which landform is land surrounded by water?", answer: "Island", options: ["Island", "Valley", "Plateau", "Canyon"] },
    { topic: "geography-landforms", difficulty: 6, question: "Which landform is created by a river cutting into land over time?", answer: "Canyon", options: ["Canyon", "Peninsula", "Island", "Plain"] },
    { topic: "geography-landforms", difficulty: 8, question: "What is a delta?", answer: "Land built from sediment where a river meets slower water", options: ["Land built from sediment where a river meets slower water", "A mountain made only of ice", "A line of longitude", "A desert with no sand"] },
    { topic: "history-migration-routes", difficulty: 3, question: "Why do many migrations happen?", answer: "People move toward safety, jobs, family, or resources", options: ["People move toward safety, jobs, family, or resources", "Latitude forces everyone to move", "Maps make people move", "All moves happen randomly"] },
    { topic: "history-migration-routes", difficulty: 6, question: "Which map feature helps show a migration route?", answer: "Arrows showing direction of movement", options: ["Arrows showing direction of movement", "A title with no places", "A picture of one building", "A blank scale bar only"] },
    { topic: "history-migration-routes", difficulty: 9, question: "Which is a push factor in migration?", answer: "A drought makes farming difficult", options: ["A drought makes farming difficult", "A new job is available elsewhere", "Family is waiting in a new city", "A school offers a scholarship"] },
    { topic: "culture-holiday-matching", difficulty: 2, question: "Which holiday is connected with lighting a menorah?", answer: "Hanukkah", options: ["Hanukkah", "Diwali", "Ramadan", "Thanksgiving"] },
    { topic: "culture-holiday-matching", difficulty: 4, question: "Which holiday is connected with fasting during daylight for many Muslims?", answer: "Ramadan", options: ["Ramadan", "Hanukkah", "Thanksgiving", "Carnival"] },
    { topic: "culture-holiday-matching", difficulty: 7, question: "Which pairing is a culture/holiday match?", answer: "Diwali - festival of lights celebrated by many Hindus", options: ["Diwali - festival of lights celebrated by many Hindus", "Hanukkah - Lunar New Year parade only", "Ramadan - harvest moon dance only", "Thanksgiving - ancient Roman road"] },
    { topic: "culture-holiday-matching", difficulty: 10, question: "Which statement about holidays is most careful?", answer: "Traditions can vary by family, country, and community", options: ["Traditions can vary by family, country, and community", "Every family celebrates every holiday the same way", "Only one holiday exists in each country", "Maps decide how holidays are celebrated"] },
  ];

  function createBlueprintEntry(difficulty) {
    const level = Math.max(1, Math.min(10, Number.parseInt(difficulty, 10) || 3));
    return entry(randomChoice(blueprints.filter((item) => item.difficulty <= level)));
  }

  globalThis.createExtendedGeographyHistoryGeneratedEntry = (difficulty) =>
    pickGeneratedEntry([createBlueprintEntry], difficulty);
})();
