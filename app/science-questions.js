// Bundled offline science multiple-choice questions.
// Curated for kids, with static and generated support through difficulty level 10.
function scienceQuestion(question, correctAnswer, incorrectAnswers, difficulty, category = "Curated Science") {
  return {
    question,
    correctAnswer,
    incorrectAnswers,
    category,
    difficulty,
  };
}

const SCIENCE_QUESTIONS = [
  scienceQuestion("Which planet do we live on?", "Earth", ["Mars", "Venus", "Jupiter"], 1, "Earth and Space"),
  scienceQuestion("How many planets are in our Solar System?", "Eight", ["Six", "Seven", "Nine"], 1, "Earth and Space"),
  scienceQuestion("Which star gives Earth most of its light and heat?", "The Sun", ["The Moon", "Mars", "Polaris"], 1, "Earth and Space"),
  scienceQuestion("What do plants usually need to grow?", "Sunlight, water, and air", ["Only rocks", "Only darkness", "Only plastic"], 1, "Life Science"),
  scienceQuestion("Which body part helps you see?", "Eyes", ["Knees", "Elbows", "Toes"], 1, "Human Body"),
  scienceQuestion("Which body part helps you hear?", "Ears", ["Teeth", "Wrists", "Ankles"], 1, "Human Body"),
  scienceQuestion("Which is a living thing?", "A tree", ["A pencil", "A chair", "A rock"], 1, "Life Science"),
  scienceQuestion("Which is a solid?", "Ice", ["Steam", "Air", "Rain"], 1, "Matter"),
  scienceQuestion("What do fish use to breathe underwater?", "Gills", ["Feathers", "Roots", "Horns"], 1, "Animals"),
  scienceQuestion("What tool measures temperature?", "Thermometer", ["Ruler", "Compass", "Magnifying glass"], 1, "Tools and Measurement"),
  scienceQuestion("What is a habitat?", "The place where an organism lives", ["The sound an animal makes", "The color of a plant", "The speed of a river"], 2, "Life Science"),
  scienceQuestion("Which planet is known as the Red Planet?", "Mars", ["Venus", "Jupiter", "Mercury"], 2, "Earth and Space"),
  scienceQuestion("Which planet is closest to the Sun?", "Mercury", ["Earth", "Mars", "Neptune"], 2, "Earth and Space"),
  scienceQuestion("What part of a plant takes in water from the soil?", "Roots", ["Flowers", "Seeds", "Fruit"], 2, "Life Science"),
  scienceQuestion("What do leaves help a plant make?", "Food", ["Bones", "Hair", "Metal"], 2, "Life Science"),
  scienceQuestion("Which force pulls objects toward Earth?", "Gravity", ["Friction", "Magnetism", "Sound"], 2, "Forces"),
  scienceQuestion("What happens when water freezes?", "It becomes ice", ["It becomes smoke", "It becomes sand", "It becomes sunlight"], 2, "Matter"),
  scienceQuestion("Which animal is a mammal?", "Dog", ["Shark", "Frog", "Eagle"], 2, "Animals"),
  scienceQuestion("Which material is usually attracted to a magnet?", "Iron", ["Wood", "Plastic", "Glass"], 2, "Forces"),
  scienceQuestion("What do clouds often contain?", "Tiny water droplets", ["Only dust storms", "Large rocks", "Pieces of glass"], 2, "Weather"),
  scienceQuestion("What is evaporation?", "Liquid water changing into water vapor", ["Water vapor changing into ice", "Rock changing into soil", "A seed changing into a plant"], 3, "Water Cycle"),
  scienceQuestion("What is condensation?", "Water vapor cooling into liquid droplets", ["Liquid water turning into fire", "A plant making seeds", "A magnet losing its poles"], 3, "Water Cycle"),
  scienceQuestion("Which object is a good conductor of electricity?", "Copper wire", ["Rubber band", "Wooden spoon", "Plastic straw"], 3, "Electricity"),
  scienceQuestion("What is the main job of the heart?", "Pump blood around the body", ["Make bones", "Store memories", "Digest all food"], 3, "Human Body"),
  scienceQuestion("What is the main job of lungs?", "Help the body take in oxygen", ["Pump blood", "Make sunlight", "Break rocks"], 3, "Human Body"),
  scienceQuestion("In a simple food chain, what do producers usually do?", "Make their own food", ["Eat only animals", "Break metal", "Make clouds"], 3, "Ecosystems"),
  scienceQuestion("Which is an example of a predator-prey relationship?", "A fox hunting a rabbit", ["A rock beside a tree", "A pencil on a desk", "A cloud above a mountain"], 3, "Ecosystems"),
  scienceQuestion("What causes day and night on Earth?", "Earth spinning on its axis", ["The Moon changing size", "Clouds moving west", "The Sun turning off"], 3, "Earth and Space"),
  scienceQuestion("Which simple machine is a ramp?", "Inclined plane", ["Pulley", "Wheel and axle", "Lever"], 3, "Engineering"),
  scienceQuestion("What type of energy does a moving bicycle have?", "Kinetic energy", ["Chemical energy only", "Stored elastic energy only", "Nuclear energy"], 3, "Energy"),
  scienceQuestion("What does chlorophyll help plants do?", "Capture light for photosynthesis", ["Digest meat", "Make bones", "Attract iron"], 4, "Life Science"),
  scienceQuestion("What is a complete electric circuit?", "A closed path that electricity can flow through", ["A broken path with a gap", "A list of planets", "A piece of paper with a drawing"], 4, "Electricity"),
  scienceQuestion("Which change is usually reversible?", "Melting ice and freezing it again", ["Burning paper to ash", "Cooking an egg", "Rusting iron"], 4, "Matter"),
  scienceQuestion("What causes most ocean tides?", "The Moon's gravity", ["The color of seawater", "Fish swimming together", "Earth's clouds"], 4, "Earth and Space"),
  scienceQuestion("What is an adaptation?", "A trait that helps an organism survive", ["A random toy name", "A kind of weather map", "A number on a ruler"], 4, "Life Science"),
  scienceQuestion("Which is a decomposer?", "Fungus", ["Sunlight", "Rabbit", "Granite"], 4, "Ecosystems"),
  scienceQuestion("What happens to sound when vibrations get stronger?", "The sound is usually louder", ["The sound always disappears", "The sound becomes colder", "The sound turns into light"], 4, "Waves"),
  scienceQuestion("Which property describes how much matter is in an object?", "Mass", ["Color", "Shape", "Temperature"], 4, "Matter"),
  scienceQuestion("What is erosion?", "Movement of weathered rock and soil", ["The Moon making light", "A battery storing charge", "A seed making pollen"], 4, "Earth Science"),
  scienceQuestion("Which part of a cell controls many cell activities?", "Nucleus", ["Cell wall only", "Chlorophyll", "Stomach"], 4, "Cells"),
  scienceQuestion("What is the main product plants make during photosynthesis?", "Sugar", ["Salt", "Metal", "Smoke"], 5, "Life Science"),
  scienceQuestion("Which gas do plants release during photosynthesis?", "Oxygen", ["Helium", "Neon", "Methane only"], 5, "Life Science"),
  scienceQuestion("What is density?", "Mass compared with volume", ["Color compared with shape", "Speed compared with sound", "Age compared with size"], 5, "Matter"),
  scienceQuestion("Which organ system moves oxygen and nutrients through the body?", "Circulatory system", ["Skeletal system", "Digestive system only", "Nervous system only"], 5, "Human Body"),
  scienceQuestion("What is a food web?", "Many connected food chains", ["A list of recipes", "A net used to catch stars", "A kind of plant root"], 5, "Ecosystems"),
  scienceQuestion("What is a black hole?", "A region with gravity so strong light cannot escape", ["A cave under the ocean", "A planet made of ice", "A cloud with no water"], 5, "Earth and Space"),
  scienceQuestion("What is the difference between mass and weight?", "Mass is amount of matter; weight is gravity's pull", ["Mass is color; weight is sound", "Mass is temperature; weight is shape", "Mass is speed; weight is age"], 5, "Forces"),
  scienceQuestion("Which layer of Earth is broken into tectonic plates?", "Lithosphere", ["Inner core", "Atmosphere", "Hydrosphere"], 5, "Earth Science"),
  scienceQuestion("Why is repeating an experiment useful?", "It checks whether results are consistent", ["It changes the answer automatically", "It removes the need to measure", "It proves every guess is right"], 5, "Science Practices"),
  scienceQuestion("What does a control group help scientists do?", "Compare results with the tested change", ["Hide the data", "Change every variable", "Skip observations"], 5, "Science Practices"),
  scienceQuestion("What is an atom?", "A tiny unit of matter", ["A type of telescope", "A living cell", "A weather pattern"], 6, "Chemistry"),
  scienceQuestion("What is a molecule?", "Two or more atoms bonded together", ["A layer of Earth", "A kind of force", "A plant organ"], 6, "Chemistry"),
  scienceQuestion("What is the main job of red blood cells?", "Carry oxygen", ["Make bile", "Store memories", "Build tooth enamel"], 6, "Human Body"),
  scienceQuestion("What is an ecosystem?", "Living things and their nonliving environment", ["Only animals in a zoo", "Only clouds in the sky", "Only rocks underground"], 6, "Ecosystems"),
  scienceQuestion("Which energy source is renewable?", "Solar energy", ["Coal", "Oil", "Natural gas"], 6, "Energy"),
  scienceQuestion("What is weathering?", "Breaking rock into smaller pieces", ["Moving blood through veins", "Changing sugar into light", "Measuring electric current"], 6, "Earth Science"),
  scienceQuestion("What is the function of mitochondria in many cells?", "Release usable energy from food", ["Store genetic instructions only", "Make the cell wall green", "Pump blood"], 6, "Cells"),
  scienceQuestion("What happens when an object has balanced forces on it?", "Its motion does not change", ["It must speed up", "It must melt", "It becomes magnetic"], 6, "Forces"),
  scienceQuestion("What does an insulator do in an electric circuit?", "Resists the flow of electric current", ["Turns gravity off", "Makes oxygen", "Stores fossils"], 6, "Electricity"),
  scienceQuestion("Which statement best describes climate?", "Typical weather patterns over a long time", ["One rainy afternoon", "A single thermometer reading", "The direction a river flows today"], 6, "Weather and Climate"),
  scienceQuestion("What is DNA's main role in cells?", "Store genetic instructions", ["Digest food in the stomach", "Carry oxygen in air", "Make rocks magnetic"], 7, "Cells"),
  scienceQuestion("What is natural selection?", "Helpful inherited traits become more common over generations", ["Animals choose their favorite color", "Rocks sort themselves by size", "Weather stops changing"], 7, "Life Science"),
  scienceQuestion("What is a chemical reaction?", "A process that forms new substances", ["A shadow moving across a wall", "A magnet pointing north", "A ruler measuring length"], 7, "Chemistry"),
  scienceQuestion("What does pH measure?", "How acidic or basic a solution is", ["How heavy a planet is", "How loud a sound is", "How old a fossil is"], 7, "Chemistry"),
  scienceQuestion("Which plate boundary often forms mountains when continents collide?", "Convergent boundary", ["Divergent boundary", "Transform boundary", "No boundary"], 7, "Earth Science"),
  scienceQuestion("Why do astronauts feel weightless in orbit?", "They are falling around Earth with their spacecraft", ["There is no gravity near Earth", "Their mass becomes zero", "The Moon pushes them upward"], 7, "Earth and Space"),
  scienceQuestion("What does Newton's first law describe?", "Objects keep their motion unless a force changes it", ["All objects are made of cells", "Heat always moves upward only", "Plants need no energy"], 7, "Forces"),
  scienceQuestion("What kind of wave is sound in air?", "Longitudinal wave", ["Transverse light wave", "Standing water only", "A chemical wave only"], 7, "Waves"),
  scienceQuestion("What is biodiversity?", "The variety of living things in an area", ["The total number of clouds", "The weight of one animal", "The color of a mineral"], 7, "Ecosystems"),
  scienceQuestion("What is the main function of white blood cells?", "Help fight infection", ["Carry oxygen only", "Make bones hard", "Store bile"], 7, "Human Body"),
  scienceQuestion("What is an isotope?", "Atoms of the same element with different numbers of neutrons", ["Atoms with no protons", "Two different planets", "A type of fossil leaf"], 8, "Chemistry"),
  scienceQuestion("What happens to particles when temperature increases?", "They usually move faster", ["They always stop moving", "They become smaller atoms", "They turn into light instantly"], 8, "Matter"),
  scienceQuestion("What does the law of conservation of mass say?", "Matter is not created or destroyed in a closed reaction", ["Mass always becomes energy in every reaction", "All solids weigh the same", "Liquids have no mass"], 8, "Chemistry"),
  scienceQuestion("What is cellular respiration?", "Cells releasing energy from food molecules", ["Plants absorbing moonlight", "Rocks melting into lava", "Clouds making rainbows"], 8, "Cells"),
  scienceQuestion("What is the carbon cycle?", "Movement of carbon among air, organisms, water, and rocks", ["The path of the Moon around Earth", "A circuit made only of copper", "A wheel used to measure speed"], 8, "Earth Systems"),
  scienceQuestion("Which electromagnetic wave has the shortest wavelength listed here?", "X-rays", ["Radio waves", "Microwaves", "Visible red light"], 8, "Waves"),
  scienceQuestion("In a series circuit, what happens if one bulb burns out?", "The whole circuit can open and all bulbs go out", ["Only gravity changes", "More oxygen is made", "The battery becomes a magnet"], 8, "Electricity"),
  scienceQuestion("What is the role of enzymes?", "Speed up chemical reactions in living things", ["Store sunlight as metal", "Make atoms disappear", "Pull planets into orbit"], 8, "Life Science"),
  scienceQuestion("Which process moves water through a plant and out through leaves?", "Transpiration", ["Condensation", "Deposition", "Fermentation"], 8, "Life Science"),
  scienceQuestion("What is the main reason seasons happen on Earth?", "Earth's axis is tilted as it orbits the Sun", ["Earth gets much closer to the Sun each summer", "The Moon blocks winter", "The Sun changes color every month"], 8, "Earth and Space"),
  scienceQuestion("What does acceleration mean in physics?", "A change in velocity over time", ["A change in color over time", "The total amount of matter", "The distance around a circle"], 9, "Forces"),
  scienceQuestion("If net force on an object is not zero, what happens?", "The object's motion changes", ["The object must disappear", "The object loses all mass", "The object becomes a liquid"], 9, "Forces"),
  scienceQuestion("What information does the atomic number give?", "The number of protons", ["The number of electron shells only", "The mass of the whole planet", "The age of a fossil"], 9, "Chemistry"),
  scienceQuestion("What is a covalent bond?", "A bond where atoms share electrons", ["A bond made by sharing planets", "A force that only pulls magnets north", "A crack between tectonic plates"], 9, "Chemistry"),
  scienceQuestion("What is meiosis used for in many organisms?", "Making sex cells with half the usual chromosome number", ["Digesting food in the stomach", "Pumping blood through arteries", "Breaking rocks by wind"], 9, "Life Science"),
  scienceQuestion("What is a mutation?", "A change in DNA sequence", ["A type of cloud", "A measure of temperature", "A piece of volcanic glass"], 9, "Life Science"),
  scienceQuestion("Which gas is most directly increased by burning fossil fuels?", "Carbon dioxide", ["Helium", "Neon", "Argon"], 9, "Climate Science"),
  scienceQuestion("What does half-life describe?", "The time for half of a radioactive sample to decay", ["Half the time between sunrise and sunset", "Half the length of a wave", "Half the mass of any planet"], 9, "Earth Science"),
  scienceQuestion("At a transform plate boundary, plates mainly move how?", "Slide past each other", ["Move directly toward the Sun", "Freeze together forever", "Turn into ocean water"], 9, "Earth Science"),
  scienceQuestion("What does a Punnett square help predict?", "Possible inherited traits in offspring", ["The next day's weather exactly", "The mass of a star", "The speed of sound in metal"], 9, "Genetics"),
  scienceQuestion("What does Newton's second law connect?", "Force, mass, and acceleration", ["Color, taste, and smell", "Latitude, longitude, and rainfall", "Roots, flowers, and fruit only"], 10, "Forces"),
  scienceQuestion("Why does a satellite stay in orbit instead of falling straight down?", "Its forward speed makes it keep missing Earth as it falls", ["Earth's gravity is zero there", "The satellite has no mass", "The Sun pushes it in a square path"], 10, "Earth and Space"),
  scienceQuestion("What is the main idea of plate tectonics?", "Earth's lithosphere is divided into moving plates", ["Earth's oceans never move", "Mountains are made only by wind", "The core is made of clouds"], 10, "Earth Science"),
  scienceQuestion("In chemistry, what is activation energy?", "The energy needed to start a reaction", ["The mass lost by a magnet", "The color of an acid", "The distance between planets"], 10, "Chemistry"),
  scienceQuestion("What does conservation of energy mean?", "Energy changes form but the total amount is conserved", ["Energy is always destroyed by friction", "Energy only exists in batteries", "Energy cannot move between objects"], 10, "Energy"),
  scienceQuestion("What is gene expression?", "Using information in a gene to make a product such as a protein", ["Turning a chromosome into a planet", "Measuring the pH of rain", "Breaking rock into sediment"], 10, "Genetics"),
  scienceQuestion("What is the difference between mitosis and meiosis?", "Mitosis makes body cells; meiosis makes sex cells", ["Mitosis makes rocks; meiosis makes clouds", "Mitosis happens only in stars", "Meiosis makes cells with twice as many chromosomes every time"], 10, "Cells"),
  scienceQuestion("Why can greenhouse gases warm Earth?", "They absorb and re-emit infrared radiation", ["They turn sunlight into sound", "They remove all oxygen", "They make gravity stronger"], 10, "Climate Science"),
  scienceQuestion("What does specific heat describe?", "How much energy changes a substance's temperature", ["How acidic a liquid is", "How many protons an atom has", "How fast an animal runs"], 10, "Matter"),
  scienceQuestion("What does peer review help scientists do?", "Find problems and improve work before publication", ["Keep all data secret forever", "Avoid testing ideas", "Replace evidence with opinions"], 10, "Science Practices"),
];

function createScienceGeneratedEntry(difficulty) {
  const level = scienceClampDifficulty(difficulty);
  const lowerBound = Math.max(1, level - 2);
  const exactPool = SCIENCE_QUESTIONS.filter((entry) => entry.difficulty === level);
  const nearbyPool = SCIENCE_QUESTIONS.filter(
    (entry) => entry.difficulty >= lowerBound && entry.difficulty <= level
  );
  const pool = exactPool.length ? exactPool : nearbyPool.length ? nearbyPool : SCIENCE_QUESTIONS;
  const entry = scienceRandomChoice(pool);

  return {
    question: entry.question,
    options: scienceShuffle([entry.correctAnswer, ...entry.incorrectAnswers]),
    answer: entry.correctAnswer,
    difficulty: level,
  };
}

function scienceClampDifficulty(value) {
  const difficulty = Number(value);
  if (!Number.isInteger(difficulty) || difficulty < 1) {
    return 1;
  }

  return Math.min(10, difficulty);
}

function scienceRandomChoice(values) {
  if (typeof randomChoice === "function") {
    return randomChoice(values);
  }

  return values[Math.floor(Math.random() * values.length)];
}

function scienceShuffle(values) {
  if (typeof shuffleArray === "function") {
    return shuffleArray(values);
  }

  const shuffled = [...values];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}