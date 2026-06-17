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
  scienceQuestion("In most materials, when temperature increases, what usually happens to the motion of particles?", "They usually move faster", ["They always stop moving", "They become smaller atoms", "They turn into light instantly"], 8, "Matter"),
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

  scienceQuestion("Which body part helps you smell?", "Nose", ["Eyes", "Knees", "Fingers"], 1, "Human Body"),
  scienceQuestion("Which body part helps you taste food?", "Tongue", ["Ears", "Elbows", "Ankles"], 1, "Human Body"),
  scienceQuestion("Which is a liquid at room temperature?", "Water", ["Rock", "Air", "Ice cube"], 1, "Matter"),
  scienceQuestion("What covers most birds' bodies?", "Feathers", ["Scales only", "Leaves", "Shells"], 1, "Animals"),
  scienceQuestion("Which animal is most likely to lay an egg?", "Chicken", ["Cat", "Dog", "Cow"], 1, "Animals"),
  scienceQuestion("What do people need from air to breathe?", "Oxygen", ["Sand", "Plastic", "Smoke"], 1, "Human Body"),
  scienceQuestion("What makes a shadow?", "An object blocking light", ["A rock making sound", "Water freezing", "A seed growing"], 1, "Light"),
  scienceQuestion("Which tool makes small things look bigger?", "Magnifying glass", ["Spoon", "Hammer", "Backpack"], 1, "Tools and Measurement"),
  scienceQuestion("Which is a natural source of light?", "The Sun", ["A book", "A shoe", "A pencil"], 1, "Light"),
  scienceQuestion("Which sense uses your ears?", "Hearing", ["Smelling", "Tasting", "Touching with toes"], 1, "Human Body"),
  scienceQuestion("What is a baby frog called?", "Tadpole", ["Cub", "Chick", "Calf"], 2, "Animals"),
  scienceQuestion("What do bees often collect from flowers?", "Nectar", ["Glass", "Metal", "Soil only"], 2, "Life Science"),
  scienceQuestion("Which part of weather tells how hot or cold the air is?", "Temperature", ["Moon phase", "Rock type", "Plant height"], 2, "Weather"),
  scienceQuestion("What do caterpillars usually become?", "Butterflies or moths", ["Rocks", "Fish", "Clouds"], 2, "Life Science"),
  scienceQuestion("Which object would usually sink in water?", "Stone", ["Cork", "Beach ball", "Wood chip"], 2, "Matter"),
  scienceQuestion("What force slows a ball rolling on grass?", "Friction", ["Evaporation", "Moonlight", "Digestion"], 2, "Forces"),
  scienceQuestion("Which plant part can grow into a new plant?", "Seed", ["Pebble", "Feather", "Cloud"], 2, "Life Science"),
  scienceQuestion("What do animals need food for?", "Energy to live and grow", ["To turn into rocks", "To make sunlight", "To stop all motion"], 2, "Animals"),
  scienceQuestion("What does a rain gauge measure?", "Amount of rainfall", ["Wind direction", "Body temperature", "Magnet strength"], 2, "Weather"),
  scienceQuestion("Which is a gas?", "Air", ["Wood", "Ice", "Steel"], 2, "Matter"),
  scienceQuestion("Which object is a source of light?", "Flashlight", ["Mirror", "Book", "Rock"], 3, "Light"),
  scienceQuestion("What is a consumer in a food chain?", "An organism that gets energy by eating", ["A plant making its own food", "A rock in soil", "A cloud in the sky"], 3, "Ecosystems"),
  scienceQuestion("What kind of energy is stored in food?", "Chemical energy", ["Sound energy only", "Nuclear energy only", "Light energy only"], 3, "Energy"),
  scienceQuestion("Why do we see lightning before hearing thunder?", "Light travels faster than sound", ["Sound travels faster than light", "Thunder happens first", "Clouds block all sound"], 3, "Waves"),
  scienceQuestion("What do skeletal muscles help your body do?", "Move body parts", ["Make sunlight", "Store rocks", "Turn air into water"], 3, "Human Body"),
  scienceQuestion("Which planet is famous for its large rings?", "Saturn", ["Mercury", "Mars", "Venus"], 3, "Earth and Space"),
  scienceQuestion("What is a hypothesis?", "A testable idea or explanation", ["A final answer that cannot change", "A tool for measuring mass", "A type of animal home"], 3, "Science Practices"),
  scienceQuestion("What helps decide whether an object floats or sinks?", "Its density compared with the liquid", ["Its color only", "Its name only", "The day of the week"], 3, "Matter"),
  scienceQuestion("Which tool measures mass?", "Balance scale", ["Thermometer", "Rain gauge", "Compass"], 3, "Tools and Measurement"),
  scienceQuestion("What are fossils?", "Remains or traces of ancient living things", ["New plastic toys", "Cloud shadows", "Fresh raindrops"], 3, "Earth Science"),
  scienceQuestion("What is a variable in an experiment?", "A factor that can change", ["A result that is hidden", "A kind of planet", "A tool that only measures time"], 4, "Science Practices"),
  scienceQuestion("Which body system includes the brain and nerves?", "Nervous system", ["Digestive system", "Skeletal system", "Respiratory system"], 4, "Human Body"),
  scienceQuestion("What is pollination?", "Moving pollen to the part of a flower that can make seeds", ["Water turning into vapor", "A rock becoming smaller", "A magnet pulling iron"], 4, "Life Science"),
  scienceQuestion("Which is a physical change?", "Tearing paper", ["Burning paper", "Rusting iron", "Baking cake batter"], 4, "Matter"),
  scienceQuestion("What causes the Moon's phases?", "The changing view of the Moon's sunlit half from Earth", ["The Moon changing its real shape", "Earth's shadow every night", "Clouds painting the Moon"], 4, "Earth and Space"),
  scienceQuestion("What is radiation in heat transfer?", "Energy moving by waves", ["Energy moving only through wires", "Energy disappearing forever", "Matter turning into roots"], 4, "Energy"),
  scienceQuestion("What is a mixture?", "Materials physically combined", ["One atom by itself", "A force that pulls objects down", "A living cell only"], 4, "Chemistry"),
  scienceQuestion("What is a vertebrate?", "An animal with a backbone", ["A plant with flowers", "A rock with layers", "A cloud with rain"], 4, "Animals"),
  scienceQuestion("Which weather tool measures wind speed?", "Anemometer", ["Thermometer", "Rain gauge", "Balance scale"], 4, "Weather"),
  scienceQuestion("What is a watershed?", "Land where water drains to the same body of water", ["A cave made of ice", "A star inside a cloud", "A tool for measuring sound"], 4, "Earth Science"),
  scienceQuestion("Which subatomic particle has a positive charge?", "Proton", ["Neutron", "Electron", "Molecule"], 5, "Chemistry"),
  scienceQuestion("What is an element?", "A substance made of one kind of atom", ["A mixture of every gas", "A tool used for measuring force", "A living thing with cells"], 5, "Chemistry"),
  scienceQuestion("What is competition in an ecosystem?", "Organisms trying to use the same limited resource", ["Clouds making rain", "Rocks melting into lava", "Planets orbiting the Sun"], 5, "Ecosystems"),
  scienceQuestion("Why do scientists often use graphs?", "To show patterns in data", ["To hide measurements", "To replace observations", "To make every guess true"], 5, "Science Practices"),
  scienceQuestion("Which body system breaks food into smaller nutrients?", "Digestive system", ["Nervous system", "Skeletal system", "Respiratory system"], 5, "Human Body"),
  scienceQuestion("What is potential energy?", "Stored energy", ["Energy of color", "Energy that cannot change form", "Energy only found in stars"], 5, "Energy"),
  scienceQuestion("What is an orbit?", "The path one object follows around another", ["A kind of leaf", "A tool for measuring temperature", "A type of mineral scratch"], 5, "Earth and Space"),
  scienceQuestion("What is groundwater?", "Water stored underground in soil or rock spaces", ["Water only in clouds", "Water inside the Sun", "Water made of metal"], 5, "Earth Science"),
  scienceQuestion("What is electric current?", "A flow of electric charge", ["A flow of sand", "A change in moon shape", "A type of plant root"], 5, "Electricity"),
  scienceQuestion("What is an inherited trait?", "A trait passed from parents to offspring", ["A trait learned only from practice", "A random weather report", "A kind of simple machine"], 5, "Genetics"),
  scienceQuestion("What is a compound?", "A substance made of two or more elements chemically bonded", ["A single proton by itself", "A mixture that is only stirred", "A type of telescope"], 6, "Chemistry"),
  scienceQuestion("Which organs filter blood and help make urine?", "Kidneys", ["Lungs", "Stomach", "Skin only"], 6, "Human Body"),
  scienceQuestion("What is homeostasis?", "Keeping internal conditions stable", ["Changing every cell into bone", "Making rocks softer", "Turning sunlight into sound"], 6, "Human Body"),
  scienceQuestion("What is an organism's niche?", "Its role in an ecosystem", ["Its exact weight in grams", "The color of the nearest rock", "The number of stars overhead"], 6, "Ecosystems"),
  scienceQuestion("Which layer helps tectonic plates move slowly?", "Asthenosphere", ["Inner core", "Ocean water", "Cloud layer"], 6, "Earth Science"),
  scienceQuestion("What is conduction?", "Heat transfer by direct contact", ["Heat transfer by empty space only", "Water falling from clouds", "A cell copying DNA"], 6, "Energy"),
  scienceQuestion("Which organelle in plant cells captures light for photosynthesis?", "Chloroplast", ["Mitochondrion", "Nucleus", "Cell membrane"], 6, "Cells"),
  scienceQuestion("What is an independent variable?", "The factor a scientist changes on purpose", ["The result measured at the end", "A number that cannot be recorded", "A question with no test"], 6, "Science Practices"),
  scienceQuestion("What type of energy is stored in a stretched rubber band?", "Elastic potential energy", ["Sound energy", "Thermal energy only", "Light energy only"], 6, "Energy"),
  scienceQuestion("What happens to light when it reflects?", "It bounces off a surface", ["It turns into soil", "It stops having speed", "It becomes a magnet"], 6, "Waves"),
  scienceQuestion("What is an allele?", "A version of a gene", ["A type of cloud", "A tool for measuring mass", "A layer of Earth"], 7, "Genetics"),
  scienceQuestion("What is an ion?", "An atom or molecule with an electric charge", ["A planet with rings", "A rock with no minerals", "A cell with no water"], 7, "Chemistry"),
  scienceQuestion("What is an exothermic reaction?", "A reaction that releases energy", ["A reaction that creates gravity", "A reaction that makes all atoms vanish", "A reaction that cannot be measured"], 7, "Chemistry"),
  scienceQuestion("How can a vaccine help the immune system?", "It trains the body to recognize a germ", ["It turns bones into muscles", "It removes all bacteria from Earth", "It makes oxygen from sunlight"], 7, "Human Body"),
  scienceQuestion("What are primary consumers?", "Organisms that eat producers", ["Organisms that make sunlight", "Rocks that break apart", "Clouds that make thunder"], 7, "Ecosystems"),
  scienceQuestion("What is carrying capacity?", "The largest population an environment can support over time", ["The weight of one backpack", "The speed of a comet", "The number of bones in a fish"], 7, "Ecosystems"),
  scienceQuestion("What is refraction?", "Light bending as it moves into a different material", ["Sound turning into matter", "Water freezing into vapor", "A plant releasing seeds"], 7, "Waves"),
  scienceQuestion("What are seismic waves?", "Vibrations that travel through Earth during earthquakes", ["Waves made only by birds", "Ocean waves made of sunlight", "Invisible roots in soil"], 7, "Earth Science"),
  scienceQuestion("What hormone helps control blood sugar levels?", "Insulin", ["Chlorophyll", "Helium", "Pollen"], 7, "Human Body"),
  scienceQuestion("What is speed?", "Distance traveled per amount of time", ["Mass divided by color", "A measure of acidity", "The number of neutrons"], 7, "Forces"),
  scienceQuestion("What is osmosis?", "Diffusion of water across a membrane", ["A rock cooling into crystal", "A planet changing orbit", "A sound wave reflecting"], 8, "Cells"),
  scienceQuestion("What is a dominant allele?", "An allele that can mask a recessive allele", ["An allele found only in rocks", "An allele that never affects traits", "An allele with no DNA"], 8, "Genetics"),
  scienceQuestion("What is an ionic bond?", "Attraction between oppositely charged ions", ["Sharing planets between stars", "A crack between continents", "A force that only affects light"], 8, "Chemistry"),
  scienceQuestion("What is a catalyst?", "A substance that speeds a reaction without being used up", ["A substance that destroys all atoms", "A tool that measures rainfall", "A type of animal cell"], 8, "Chemistry"),
  scienceQuestion("Why does air pressure usually decrease at higher altitude?", "There is less air above pressing down", ["Gravity becomes zero", "Air turns into metal", "Clouds remove all oxygen"], 8, "Weather and Climate"),
  scienceQuestion("What mainly causes wind?", "Differences in air pressure", ["The Moon changing color", "Rocks heating underground only", "Fish moving in schools"], 8, "Weather"),
  scienceQuestion("What is the amplitude of a wave?", "The height from rest position to crest", ["The number of atoms in water", "The age of a fossil", "The mass of a planet"], 8, "Waves"),
  scienceQuestion("What is ecological succession?", "Gradual change in a community over time", ["The exact path of one raindrop", "A battery losing charge", "A pulley lifting a box"], 8, "Ecosystems"),
  scienceQuestion("What is thermal equilibrium?", "A state with no net heat flow because temperatures are equal", ["A state where all motion stops forever", "A state where mass becomes color", "A state where water cannot evaporate"], 8, "Energy"),
  scienceQuestion("What is a geologic fault?", "A break in Earth's crust where rocks can move", ["A cloud that makes snow", "A cell part that stores DNA", "A tool for measuring acidity"], 8, "Earth Science"),
  scienceQuestion("What is velocity?", "Speed in a specific direction", ["Mass without direction", "A measure of pH", "Stored chemical energy"], 9, "Forces"),
  scienceQuestion("What is momentum?", "Mass times velocity", ["Temperature times color", "Volume plus brightness", "pH divided by rainfall"], 9, "Forces"),
  scienceQuestion("What is electronegativity?", "An atom's tendency to attract shared electrons", ["A planet's distance from the Sun", "A rock's resistance to scratching", "A plant's rate of transpiration"], 9, "Chemistry"),
  scienceQuestion("What does a molecular formula show?", "The types and numbers of atoms in a molecule", ["The speed of a wave only", "The age of a fossil only", "The direction of a force only"], 9, "Chemistry"),
  scienceQuestion("What is transcription in cells?", "Copying information from DNA into RNA", ["Making a rock from lava", "Moving water through xylem", "Measuring wind speed"], 9, "Genetics"),
  scienceQuestion("What is translation in cells?", "Using RNA instructions to build a protein", ["Changing a solid directly into gas", "Moving plates past each other", "Reflecting light from a mirror"], 9, "Genetics"),
  scienceQuestion("What is speciation?", "Formation of new species over time", ["Daily change in air temperature", "A battery completing a circuit", "A mineral scratching glass"], 9, "Life Science"),
  scienceQuestion("What happens in acid-base neutralization?", "An acid and a base react to form water and a salt", ["Two magnets become planets", "A seed becomes a fossil instantly", "Light stops moving"], 9, "Chemistry"),
  scienceQuestion("Which heat transfer happens by movement of fluids?", "Convection", ["Conduction through direct touch only", "Reflection", "Condensation"], 9, "Energy"),
  scienceQuestion("What is albedo?", "The fraction of light a surface reflects", ["The mass of one atom", "The time for one orbit only", "The pressure inside a battery"], 9, "Climate Science"),
  scienceQuestion("What is centripetal force?", "A net force toward the center of a circular path", ["A force that always points east", "A force that removes mass", "A force that creates atoms"], 10, "Forces"),
  scienceQuestion("What does Kepler's first law say about planetary orbits?", "Planets orbit the Sun in ellipses", ["Planets orbit in perfect squares", "Planets do not move", "Planets orbit only the Moon"], 10, "Earth and Space"),
  scienceQuestion("What is entropy often used to describe?", "How spread out energy or disorder is", ["How acidic a solution is", "How many protons an atom has", "How fast a wave reflects"], 10, "Energy"),
  scienceQuestion("What is dynamic equilibrium?", "Forward and reverse processes happen at equal rates", ["Nothing moves anywhere", "Only the forward process happens", "All atoms become ions"], 10, "Chemistry"),
  scienceQuestion("What is gene regulation?", "Control of when and how much a gene is used", ["Changing a planet's orbit", "Measuring a mineral's hardness", "Moving heat by touching"], 10, "Genetics"),
  scienceQuestion("What is a climate feedback loop?", "A process where a change causes more or less change", ["A tool that measures rainfall", "A single day's weather report", "A rock cycle stage only"], 10, "Climate Science"),
  scienceQuestion("What is selective pressure?", "An environmental factor that affects survival and reproduction", ["A random color chosen by animals", "A magnet's north pole only", "A way to measure temperature"], 10, "Life Science"),
  scienceQuestion("What can redshift in light from a distant galaxy suggest?", "The galaxy is moving away from us", ["The galaxy is made of red paint", "The galaxy has no stars", "The galaxy is inside Earth"], 10, "Earth and Space"),
  scienceQuestion("What is a limiting reactant?", "The reactant used up first that limits product formed", ["A tool for measuring pH", "A force that keeps planets still", "A cell part that stores water"], 10, "Chemistry"),
  scienceQuestion("In a parallel circuit, what can happen if one branch opens?", "Other branches can still carry current", ["All branches must stop forever", "The battery becomes a plant", "The wires lose all mass"], 10, "Electricity"),
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


(() => {
  const questionUtils = globalThis.HomeworkQuestionUtils;
  if (!questionUtils) {
    return;
  }
  const { entry, pickGeneratedEntry, randomChoice } = questionUtils;

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

  globalThis.createScienceTopicGeneratedEntry = (difficulty) =>
    pickGeneratedEntry([createBlueprintEntry], difficulty);
})();