(() => {
  const { entry, pickGeneratedEntry, randomChoice } = globalThis.HomeworkExtended;

  const blueprints = [
    { topic: "science-life-cycles", difficulty: 1, question: "What is the first stage in many plant life cycles?", answer: "Seed", options: ["Seed", "Adult plant", "Fruit", "Dead leaf"] },
    { topic: "science-life-cycles", difficulty: 2, question: "Which order shows a butterfly life cycle?", answer: "Egg, caterpillar, chrysalis, butterfly", options: ["Egg, caterpillar, chrysalis, butterfly", "Butterfly, rock, rain, egg", "Seed, stem, leaf, flower", "Frog, fish, bird, mammal"] },
    { topic: "science-life-cycles", difficulty: 4, question: "Why do young animals grow and change?", answer: "Living things develop through life stages", options: ["Living things develop through life stages", "Rocks turn into animals", "Weather pushes them into adulthood", "All animals stay the same size"] },
    { topic: "science-food-webs", difficulty: 2, question: "In a food web, what do arrows usually show?", answer: "The direction energy moves", options: ["The direction energy moves", "Which animal is biggest", "Which organism is oldest", "The weather"] },
    { topic: "science-food-webs", difficulty: 3, question: "Which organism is a producer?", answer: "Grass", options: ["Grass", "Rabbit", "Fox", "Hawk"] },
    { topic: "science-food-webs", difficulty: 6, question: "What might happen if many insects disappear from a food web?", answer: "Animals that eat insects may have less food", options: ["Animals that eat insects may have less food", "The Sun stops shining", "All plants become rocks", "Nothing in the web can change"] },
    { topic: "science-classification", difficulty: 2, question: "Which animal is classified as a mammal?", answer: "Dolphin", options: ["Dolphin", "Frog", "Lizard", "Trout"] },
    { topic: "science-classification", difficulty: 3, question: "Which trait do birds usually have?", answer: "Feathers", options: ["Feathers", "Six legs", "Gills only", "No backbone"] },
    { topic: "science-classification", difficulty: 7, question: "Which trait best separates insects from spiders?", answer: "Insects have six legs", options: ["Insects have six legs", "Insects are always larger", "Spiders have wings", "Spiders are plants"] },
    { topic: "science-states-of-matter", difficulty: 1, question: "Which is a solid at room temperature?", answer: "Rock", options: ["Rock", "Steam", "Rain", "Air"] },
    { topic: "science-states-of-matter", difficulty: 2, question: "What happens when liquid water freezes?", answer: "It becomes solid ice", options: ["It becomes solid ice", "It becomes sand", "It disappears forever", "It becomes a magnet"] },
    { topic: "science-states-of-matter", difficulty: 5, question: "Which change is condensation?", answer: "Water vapor becomes liquid water", options: ["Water vapor becomes liquid water", "Ice becomes water vapor directly", "Rock becomes soil", "Metal becomes magnetic"] },
    { topic: "science-circuits", difficulty: 2, question: "Which material is a good conductor in a simple circuit?", answer: "Copper wire", options: ["Copper wire", "Rubber band", "Wood stick", "Plastic spoon"] },
    { topic: "science-circuits", difficulty: 4, question: "What is needed for a bulb to light in a simple circuit?", answer: "A complete path for current", options: ["A complete path for current", "A broken wire only", "A paper switch that stays open", "No battery"] },
    { topic: "science-circuits", difficulty: 7, question: "Why does a closed switch light a bulb in a circuit?", answer: "It completes the path for electric current", options: ["It completes the path for electric current", "It removes the battery", "It turns wire into rubber", "It blocks all current"] },
    { topic: "science-forces", difficulty: 3, question: "What force pulls objects toward Earth?", answer: "Gravity", options: ["Gravity", "Evaporation", "Frictionless motion", "Condensation"] },
    { topic: "science-forces", difficulty: 4, question: "What force slows a sliding book?", answer: "Friction", options: ["Friction", "Condensation", "Melting", "Classification"] },
    { topic: "science-forces", difficulty: 8, question: "If two equal forces push in opposite directions, what is the net force?", answer: "Zero", options: ["Zero", "Double both forces", "Always upward", "Always downward"] },
    { topic: "science-simple-machines", difficulty: 2, question: "Which object is a simple machine?", answer: "Ramp", options: ["Ramp", "Cloud", "Battery", "Leaf"] },
    { topic: "science-simple-machines", difficulty: 5, question: "Which simple machine is a wheel with a rope around it?", answer: "Pulley", options: ["Pulley", "Wedge", "Screw", "Lever"] },
    { topic: "science-simple-machines", difficulty: 10, question: "Why can a pulley make lifting easier?", answer: "It changes the direction of the force and can share the load", options: ["It changes the direction of the force and can share the load", "It removes gravity", "It makes mass disappear", "It creates energy from nothing"] },
    { topic: "science-weather", difficulty: 2, question: "Which instrument measures temperature?", answer: "Thermometer", options: ["Thermometer", "Compass", "Ruler", "Balance scale"] },
    { topic: "science-weather", difficulty: 6, question: "Which weather instrument measures air pressure?", answer: "Barometer", options: ["Barometer", "Thermometer", "Rain gauge", "Anemometer"] },
    { topic: "science-weather", difficulty: 8, question: "If a barometer reading is falling, what weather change may be coming?", answer: "Changing or stormier weather may be coming", options: ["Changing or stormier weather may be coming", "The Moon is closer", "Rocks are melting", "All clouds disappear"] },
    { topic: "science-water-cycle", difficulty: 3, question: "What happens during evaporation?", answer: "Liquid water changes into water vapor", options: ["Liquid water changes into water vapor", "Water vapor becomes ice only", "Rock changes into soil", "A magnet loses its poles"] },
    { topic: "science-water-cycle", difficulty: 4, question: "What is precipitation?", answer: "Water falling from clouds", options: ["Water falling from clouds", "Water soaking into a sponge only", "The Sun warming land", "A rock breaking apart"] },
    { topic: "science-water-cycle", difficulty: 7, question: "Why is the Sun important in the water cycle?", answer: "It provides energy for evaporation", options: ["It provides energy for evaporation", "It turns water into rock", "It stops clouds from forming", "It removes gravity"] },
    { topic: "science-rocks-minerals", difficulty: 4, question: "Which rock forms when melted rock cools?", answer: "Igneous rock", options: ["Igneous rock", "Sedimentary rock", "Metamorphic rock", "Soil"] },
    { topic: "science-rocks-minerals", difficulty: 5, question: "Which property helps identify a mineral?", answer: "Hardness", options: ["Hardness", "Favorite color", "Sound volume", "Birthday"] },
    { topic: "science-rocks-minerals", difficulty: 9, question: "Which process can form sedimentary rock?", answer: "Layers of sediment compact and cement", options: ["Layers of sediment compact and cement", "A battery completes a circuit", "A plant makes seeds", "A pulley changes force direction"] },
    { topic: "science-astronomy-scale", difficulty: 3, question: "Which is largest?", answer: "Sun", options: ["Sun", "Moon", "School bus", "Baseball"] },
    { topic: "science-astronomy-scale", difficulty: 7, question: "Which scale order is smallest to largest?", answer: "Moon, Earth, Sun, solar system", options: ["Moon, Earth, Sun, solar system", "Solar system, Sun, Earth, Moon", "Earth, Moon, solar system, Sun", "Sun, Moon, Earth, solar system"] },
    { topic: "science-astronomy-scale", difficulty: 10, question: "Why do light-years help describe space distances?", answer: "Space distances are extremely large", options: ["Space distances are extremely large", "A light-year measures brightness only", "Planets are all one mile apart", "The Moon is outside the solar system"] },
  ];

  function createBlueprintEntry(difficulty) {
    const level = Math.max(1, Math.min(10, Number.parseInt(difficulty, 10) || 3));
    return entry(randomChoice(blueprints.filter((item) => item.difficulty <= level)));
  }

  globalThis.createExtendedScienceGeneratedEntry = (difficulty) =>
    pickGeneratedEntry([createBlueprintEntry], difficulty);
})();
