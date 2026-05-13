const SPATIAL_REASONING_QUESTIONS = [
  {
    question: "Which shape has 3 sides?",
    options: ["Triangle", "Square", "Circle", "Rectangle"],
    answer: "Triangle",
    difficulty: 1,
  },
  {
    question: "Which shape has 4 equal sides and 4 right angles?",
    options: ["Triangle", "Square", "Oval", "Pentagon"],
    answer: "Square",
    difficulty: 1,
  },
  {
    question: "An arrow is pointing up. If it turns a quarter-turn clockwise, which way will it point?",
    options: ["Left", "Right", "Down", "Up"],
    answer: "Right",
    difficulty: 2,
  },
  {
    question: "Which 3D shape rolls most like a ball?",
    options: ["Cube", "Sphere", "Pyramid", "Rectangular prism"],
    answer: "Sphere",
    difficulty: 2,
  },
  {
    question: "How many faces does a cube have?",
    options: ["4", "5", "6", "8"],
    answer: "6",
    difficulty: 3,
  },
  {
    question: "How many corners does a rectangle have?",
    options: ["2", "3", "4", "6"],
    answer: "4",
    difficulty: 3,
  },
  {
    question: "If you cut a square from one corner to the opposite corner, what 2 shapes do you make?",
    options: ["2 circles", "2 triangles", "2 pentagons", "2 rectangles"],
    answer: "2 triangles",
    difficulty: 4,
  },
  {
    question: "Which object is most like a cylinder?",
    options: ["A soccer ball", "A soda can", "A book", "A slice of pizza"],
    answer: "A soda can",
    difficulty: 4,
  },
  {
    question: "Which 3D shape has 1 point at the top and a circular base?",
    options: ["Sphere", "Cube", "Cone", "Cylinder"],
    answer: "Cone",
    difficulty: 5,
  },
  {
    question: "You are facing north. If you turn left and then left again, which direction are you facing now?",
    options: ["North", "East", "South", "West"],
    answer: "South",
    difficulty: 5,
  },
  {
    question: "Which shape has no corners?",
    options: ["Circle", "Triangle", "Square", "Rectangle"],
    answer: "Circle",
    difficulty: 1,
  },
  {
    question: "How many sides does a hexagon have?",
    options: ["5", "6", "7", "8"],
    answer: "6",
    difficulty: 1,
  },
  {
    question: "An arrow is pointing left. If it turns a half-turn clockwise, which way will it point?",
    options: ["Up", "Down", "Left", "Right"],
    answer: "Right",
    difficulty: 2,
  },
  {
    question: "Which object is most like a rectangular prism?",
    options: ["A cereal box", "A basketball", "An ice-cream cone", "A coin"],
    answer: "A cereal box",
    difficulty: 2,
  },
  {
    question: "You are facing east. If you turn right, which direction are you facing?",
    options: ["North", "South", "East", "West"],
    answer: "South",
    difficulty: 3,
  },
  {
    question: "Which 3D shape has 2 flat circular faces and can roll?",
    options: ["Cube", "Sphere", "Cylinder", "Pyramid"],
    answer: "Cylinder",
    difficulty: 3,
  },
  {
    question: "Which 3D shape has 1 point at the top and a square base?",
    options: ["Cone", "Sphere", "Square pyramid", "Cylinder"],
    answer: "Square pyramid",
    difficulty: 4,
  },
  {
    question: "What is true about a rectangle?",
    options: [
      "All sides are curved",
      "Opposite sides are equal",
      "It has 3 corners",
      "It is a 3D shape",
    ],
    answer: "Opposite sides are equal",
    difficulty: 4,
  },
  {
    question: "How many edges does a cube have?",
    options: ["8", "10", "12", "14"],
    answer: "12",
    difficulty: 5,
  },
  {
    question: "How many vertices does a triangle have?",
    options: ["2", "3", "4", "6"],
    answer: "3",
    difficulty: 5,
  },
  {
    question: "Which shape has 4 sides and 4 corners?",
    options: ["Triangle", "Square", "Circle", "Oval"],
    answer: "Square",
    difficulty: 1,
  },
  {
    question: "Which shape is round like a ball?",
    options: ["Circle", "Triangle", "Square", "Rectangle"],
    answer: "Circle",
    difficulty: 1,
  },
  {
    question: "An arrow points down. If it turns a quarter-turn counterclockwise, which way will it point?",
    options: ["Left", "Right", "Up", "Down"],
    answer: "Right",
    difficulty: 2,
  },
  {
    question: "Which object is most like a cone?",
    options: ["An ice-cream cone", "A book", "A box", "A coin"],
    answer: "An ice-cream cone",
    difficulty: 2,
  },
  {
    question: "How many sides does a pentagon have?",
    options: ["4", "5", "6", "7"],
    answer: "5",
    difficulty: 3,
  },
  {
    question: "Which 3D shape can slide and has 6 flat faces?",
    options: ["Sphere", "Cube", "Cone", "Cylinder"],
    answer: "Cube",
    difficulty: 3,
  },
  {
    question: "If a shape has 8 sides, what is it called?",
    options: ["Hexagon", "Octagon", "Pentagon", "Triangle"],
    answer: "Octagon",
    difficulty: 4,
  },
  {
    question: "Which shape is a four-sided figure with all sides the same length, like a tilted square?",
    options: ["Rectangle", "Square", "Rhombus", "Triangle"],
    answer: "Rhombus",
    difficulty: 4,
  },
  {
    question: "You are facing south. If you turn right and then right again, which direction are you facing now?",
    options: ["North", "East", "West", "South"],
    answer: "North",
    difficulty: 5,
  },
  {
    question: "Which 3D shape has 1 curved surface and no corners?",
    options: ["Cube", "Sphere", "Pyramid", "Rectangular prism"],
    answer: "Sphere",
    difficulty: 5,
  },
  {
    question: "How many corners does a square have?",
    options: ["2", "3", "4", "5"],
    answer: "4",
    difficulty: 1,
  },
  {
    question: "Which everyday object looks like a cylinder?",
    options: ["A can", "A soccer ball", "A pyramid", "A triangle"],
    answer: "A can",
    difficulty: 1,
  },
  {
    question: "An arrow points right. If it turns a half-turn counterclockwise, which way will it point?",
    options: ["Up", "Down", "Left", "Right"],
    answer: "Left",
    difficulty: 2,
  },
  {
    question: "Which shape has 5 corners?",
    options: ["Triangle", "Square", "Pentagon", "Circle"],
    answer: "Pentagon",
    difficulty: 2,
  },
  {
    question: "Which 3D shape has a flat square base and one point at the top?",
    options: ["Cone", "Cube", "Square pyramid", "Sphere"],
    answer: "Square pyramid",
    difficulty: 3,
  },
  {
    question: "Which shape has opposite sides that are the same length?",
    options: ["Rectangle", "Triangle", "Circle", "Oval"],
    answer: "Rectangle",
    difficulty: 3,
  },
  {
    question: "How many faces does a rectangular prism have?",
    options: ["4", "5", "6", "8"],
    answer: "6",
    difficulty: 4,
  },
  {
    question: "Which shape would best make a roof on a house model?",
    options: ["Triangle", "Circle", "Square", "Oval"],
    answer: "Triangle",
    difficulty: 4,
  },
  {
    question: "If you start facing west, turn left, then turn right, which direction are you facing?",
    options: ["North", "South", "East", "West"],
    answer: "West",
    difficulty: 5,
  },
  {
    question: "How many vertices does a cube have?",
    options: ["6", "8", "10", "12"],
    answer: "8",
    difficulty: 5,
  },
];

SPATIAL_REASONING_QUESTIONS.push(
  ...[
    {
      question: "Which shape has 4 equal sides and 4 corners?",
      options: ["Triangle", "Square", "Circle", "Rectangle"],
      answer: "Square",
      difficulty: 1,
    },
    {
      question: "Which shape has zero corners?",
      options: ["Circle", "Triangle", "Square", "Rectangle"],
      answer: "Circle",
      difficulty: 1,
    },
    {
      question: "How many sides are on a pentagon?",
      options: ["4", "5", "6", "7"],
      answer: "5",
      difficulty: 1,
    },
    {
      question: "Which everyday object looks like a sphere?",
      options: ["Ball", "Book", "Box", "Pencil"],
      answer: "Ball",
      difficulty: 1,
    },
    {
      question: "An arrow points up. If it turns a quarter-turn clockwise, which way will it point?",
      options: ["Left", "Right", "Down", "Up"],
      answer: "Right",
      difficulty: 2,
    },
    {
      question: "Which everyday object looks like a rectangular prism?",
      options: ["Cereal box", "Basketball", "Ice-cream cone", "Coin"],
      answer: "Cereal box",
      difficulty: 2,
    },
    {
      question: "How many flat faces does a cube have?",
      options: ["4", "5", "6", "8"],
      answer: "6",
      difficulty: 2,
    },
    {
      question: "If you face north and turn left, which direction are you facing?",
      options: ["East", "West", "South", "North"],
      answer: "West",
      difficulty: 2,
    },
    {
      question: "How many corners does a triangle have?",
      options: ["2", "3", "4", "6"],
      answer: "3",
      difficulty: 3,
    },
    {
      question: "Which shape has opposite sides that are equal in length?",
      options: ["Rectangle", "Triangle", "Circle", "Oval"],
      answer: "Rectangle",
      difficulty: 3,
    },
    {
      question: "If you face east and turn right, which direction are you facing?",
      options: ["North", "South", "East", "West"],
      answer: "South",
      difficulty: 3,
    },
    {
      question: "Which 3D shape has two flat circular faces and can roll?",
      options: ["Cube", "Sphere", "Cylinder", "Pyramid"],
      answer: "Cylinder",
      difficulty: 3,
    },
    {
      question: "If a square is cut from corner to corner, what 2 shapes are made?",
      options: ["2 triangles", "2 circles", "2 rectangles", "2 pentagons"],
      answer: "2 triangles",
      difficulty: 4,
    },
    {
      question: "Which 3D shape has a square base and one point at the top?",
      options: ["Cone", "Cube", "Square pyramid", "Sphere"],
      answer: "Square pyramid",
      difficulty: 4,
    },
    {
      question: "How many flat faces does a rectangular prism have?",
      options: ["4", "5", "6", "8"],
      answer: "6",
      difficulty: 4,
    },
    {
      question: "Which shape would work best as a roof on a house model?",
      options: ["Triangle", "Circle", "Square", "Oval"],
      answer: "Triangle",
      difficulty: 4,
    },
    {
      question: "Which 3D shape has one point at the top and a circular base?",
      options: ["Sphere", "Cube", "Cone", "Cylinder"],
      answer: "Cone",
      difficulty: 5,
    },
    {
      question: "Starting facing west, turn left, then turn right. Which direction are you facing?",
      options: ["North", "South", "East", "West"],
      answer: "West",
      difficulty: 5,
    },
    {
      question: "How many edges are on a cube?",
      options: ["8", "10", "12", "14"],
      answer: "12",
      difficulty: 5,
    },
    {
      question: "Which shape has 8 sides?",
      options: ["Hexagon", "Octagon", "Pentagon", "Triangle"],
      answer: "Octagon",
      difficulty: 5,
    },
    {
      question: "Which shape has 6 sides and 6 corners?",
      options: ["Triangle", "Square", "Hexagon", "Circle"],
      answer: "Hexagon",
      difficulty: 1,
    },
    {
      question: "Which everyday object looks like a cone?",
      options: ["Ice-cream cone", "Book", "Ball", "Brick"],
      answer: "Ice-cream cone",
      difficulty: 1,
    },
    {
      question: "An arrow points left. If it turns a half-turn clockwise, which way will it point?",
      options: ["Up", "Down", "Left", "Right"],
      answer: "Right",
      difficulty: 2,
    },
    {
      question: "Which shape has five corners?",
      options: ["Triangle", "Square", "Pentagon", "Circle"],
      answer: "Pentagon",
      difficulty: 2,
    },
    {
      question: "Which 3D shape can slide and has six flat faces?",
      options: ["Sphere", "Cube", "Cone", "Cylinder"],
      answer: "Cube",
      difficulty: 3,
    },
    {
      question: "Which shape has four corners and opposite sides equal?",
      options: ["Rectangle", "Triangle", "Circle", "Oval"],
      answer: "Rectangle",
      difficulty: 3,
    },
    {
      question: "How many sides are on a hexagon?",
      options: ["5", "6", "7", "8"],
      answer: "6",
      difficulty: 4,
    },
    {
      question: "Which 3D shape has one curved surface and no corners?",
      options: ["Cube", "Sphere", "Pyramid", "Rectangular prism"],
      answer: "Sphere",
      difficulty: 4,
    },
    {
      question: "If you face south and turn right, then right again, which direction are you facing?",
      options: ["North", "East", "West", "South"],
      answer: "West",
      difficulty: 5,
    },
    {
      question: "How many faces does a triangular prism have?",
      options: ["4", "5", "6", "8"],
      answer: "5",
      difficulty: 5,
    },
    {
      question: "Which shape has all sides the same length and 4 right angles?",
      options: ["Square", "Rectangle", "Triangle", "Circle"],
      answer: "Square",
      difficulty: 1,
    },
    {
      question: "Which everyday object is shaped like a cylinder?",
      options: ["Soda can", "Soccer ball", "Pyramid", "Triangle"],
      answer: "Soda can",
      difficulty: 1,
    },
    {
      question: "An arrow points right. If it turns a quarter-turn counterclockwise, which way will it point?",
      options: ["Up", "Down", "Left", "Right"],
      answer: "Up",
      difficulty: 2,
    },
    {
      question: "How many corners are on a square?",
      options: ["2", "3", "4", "5"],
      answer: "4",
      difficulty: 2,
    },
    {
      question: "Which shape has two triangular ends and three rectangular faces?",
      options: ["Cube", "Cone", "Triangular prism", "Cylinder"],
      answer: "Triangular prism",
      difficulty: 3,
    },
    {
      question: "Which 3D shape has one point at the top and a square base?",
      options: ["Cone", "Sphere", "Square pyramid", "Cylinder"],
      answer: "Square pyramid",
      difficulty: 3,
    },
    {
      question: "Which 3D shape has 6 faces, 8 corners, and 12 edges?",
      options: ["4", "5", "6", "7"],
      answer: "6",
      difficulty: 4,
    },
    {
      question: "If a shape has 8 vertices, which shape is it?",
      options: ["Cube", "Square pyramid", "Octagon", "Triangle"],
      answer: "Cube",
      difficulty: 4,
    },
    {
      question: "Which 3D shape has 8 corners and 12 edges?",
      options: ["Cube", "Cone", "Sphere", "Cylinder"],
      answer: "Cube",
      difficulty: 5,
    },
    {
      question: "How many corners does a square pyramid have?",
      options: ["4", "5", "6", "8"],
      answer: "5",
      difficulty: 5,
    },
  ]
);

SPATIAL_REASONING_QUESTIONS.push(
  {
    question: "Which 3D shape can be made from 6 equal square faces?",
    options: ["Cube", "Cone", "Cylinder", "Triangular prism"],
    answer: "Cube",
    difficulty: 6,
  },
  {
    question: "A cube is sliced straight across parallel to one face. What shape is the cross-section?",
    options: ["Square", "Triangle", "Circle", "Pentagon"],
    answer: "Square",
    difficulty: 6,
  },
  {
    question: "A net has 2 congruent triangles and 3 rectangles. Which solid does it make?",
    options: ["Triangular prism", "Square pyramid", "Cube", "Cylinder"],
    answer: "Triangular prism",
    difficulty: 7,
  },
  {
    question: "A cylinder is sliced straight across parallel to its circular bases. What shape is the cross-section?",
    options: ["Circle", "Rectangle", "Triangle", "Hexagon"],
    answer: "Circle",
    difficulty: 7,
  }
);

function createSpatialReasoningGeneratedEntry(difficulty) {
  const level = spatialClampDifficulty(difficulty);
  const generators = {
    1: [
      spatialCreateShapeCountQuestion,
      spatialCreateShapeNameQuestion,
      spatialCreateSimpleObjectQuestion,
      spatialCreateSimpleFaceQuestion,
    ],
    2: [
      spatialCreateTurnQuestion,
      spatialCreateObjectMatchQuestion,
      spatialCreateSidesQuestion,
      spatialCreateCornersQuestion,
    ],
    3: [
      spatialCreatePrismQuestion,
      spatialCreateOrientationQuestion,
      spatialCreateEdgesQuestion,
      spatialCreateVerticesQuestion,
    ],
    4: [
      spatialCreatePropertiesQuestion,
      spatialCreatePrismQuestion,
      spatialCreateCompositeQuestion,
      spatialCreateRotationQuestion,
    ],
    5: [
      spatialCreateRotationQuestion,
      spatialCreateCompositeQuestion,
      spatialCreateEdgesQuestion,
      spatialCreateVerticesQuestion,
    ],
    6: [
      spatialCreateNetQuestion,
      spatialCreateCrossSectionQuestion,
      spatialCreateCoordinateTurnQuestion,
    ],
    7: [
      spatialCreateNetQuestion,
      spatialCreateCrossSectionQuestion,
      spatialCreateCoordinateTurnQuestion,
    ],
  };

  return spatialRandomChoice(generators[level])(level);
}

function spatialCreateShapeCountQuestion(difficulty) {
  const templates = [
    {
      question: "Which shape has 3 sides?",
      answer: "Triangle",
      options: ["Triangle", "Square", "Circle", "Rectangle"],
      difficulty: 1,
    },
    {
      question: "Which shape has 4 equal sides and 4 right angles?",
      answer: "Square",
      options: ["Triangle", "Square", "Oval", "Pentagon"],
      difficulty: 1,
    },
    {
      question: "Which shape has no corners?",
      answer: "Circle",
      options: ["Circle", "Triangle", "Square", "Rectangle"],
      difficulty: 1,
    },
  ];

  return spatialPickTemplate(difficulty, templates);
}

function spatialCreateShapeNameQuestion(difficulty) {
  const templates = [
    {
      question: "How many sides does a hexagon have?",
      answer: "6",
      options: ["5", "6", "7", "8"],
      difficulty: 1,
    },
    {
      question: "How many corners does a square have?",
      answer: "4",
      options: ["2", "3", "4", "5"],
      difficulty: 1,
    },
    {
      question: "How many vertices does a triangle have?",
      answer: "3",
      options: ["2", "3", "4", "6"],
      difficulty: 5,
    },
  ];

  return spatialPickTemplate(difficulty, templates);
}

function spatialCreateSimpleObjectQuestion(difficulty) {
  const templates = [
    {
      question: "Which everyday object looks like a cylinder?",
      answer: "A soda can",
      options: ["A soda can", "A soccer ball", "A pyramid", "A triangle"],
      difficulty: 1,
    },
    {
      question: "Which object is most like a cone?",
      answer: "An ice-cream cone",
      options: ["An ice-cream cone", "A book", "A box", "A coin"],
      difficulty: 2,
    },
    {
      question: "Which object is most like a rectangular prism?",
      answer: "A cereal box",
      options: ["A cereal box", "A basketball", "An ice-cream cone", "A coin"],
      difficulty: 2,
    },
  ];

  return spatialPickTemplate(difficulty, templates);
}

function spatialCreateSimpleFaceQuestion() {
  return {
    question: "How many faces does a cube have?",
    answer: "6",
    options: spatialBuildOptions("6", ["4", "5", "8"]),
    difficulty: 3,
  };
}

function spatialCreateTurnQuestion(difficulty) {
  const templates = [
    {
      question: "An arrow is pointing up. If it turns a quarter-turn clockwise, which way will it point?",
      answer: "Right",
      options: ["Left", "Right", "Down", "Up"],
      difficulty: 2,
    },
    {
      question: "An arrow is pointing left. If it turns a half-turn clockwise, which way will it point?",
      answer: "Right",
      options: ["Up", "Down", "Left", "Right"],
      difficulty: 2,
    },
    {
      question: "If you are facing north and turn left, then left again, which direction are you facing now?",
      answer: "South",
      options: ["North", "East", "South", "West"],
      difficulty: 5,
    },
  ];

  return spatialPickTemplate(difficulty, templates);
}

function spatialCreateObjectMatchQuestion(difficulty) {
  const templates = [
    {
      question: "Which object is most like a sphere?",
      answer: "A soccer ball",
      options: ["A soccer ball", "A book", "A can", "A pencil"],
      difficulty: 2,
    },
    {
      question: "Which object is most like a cylinder?",
      answer: "A can",
      options: ["A can", "A triangle", "A pyramid", "A cube"],
      difficulty: 2,
    },
  ];

  return spatialPickTemplate(difficulty, templates);
}

function spatialCreateSidesQuestion() {
  return {
    question: "How many sides does a pentagon have?",
    answer: "5",
    options: spatialBuildOptions("5", ["4", "6", "7"]),
    difficulty: 3,
  };
}

function spatialCreateCornersQuestion() {
  return {
    question: "How many corners are on a square?",
    answer: "4",
    options: spatialBuildOptions("4", ["2", "3", "5"]),
    difficulty: 2,
  };
}

function spatialCreatePrismQuestion(difficulty) {
  const templates = [
    {
      question: "Which 3D shape has two triangular ends and three rectangular faces?",
      answer: "Triangular prism",
      options: ["Cube", "Cone", "Triangular prism", "Cylinder"],
      difficulty: 3,
    },
    {
      question: "Which 3D shape has one point at the top and a square base?",
      answer: "Square pyramid",
      options: ["Cone", "Sphere", "Square pyramid", "Cylinder"],
      difficulty: 3,
    },
  ];

  return spatialPickTemplate(difficulty, templates);
}

function spatialCreateOrientationQuestion(difficulty) {
  const templates = [
    {
      question: "If you face east and turn right, which direction are you facing?",
      answer: "South",
      options: ["North", "South", "East", "West"],
      difficulty: 3,
    },
    {
      question: "If you face south and turn right, then right again, which direction are you facing now?",
      answer: "North",
      options: ["North", "East", "West", "South"],
      difficulty: 5,
    },
  ];

  return spatialPickTemplate(difficulty, templates);
}

function spatialCreateEdgesQuestion(difficulty) {
  const templates = [
    {
      question: "How many edges does a cube have?",
      answer: "12",
      options: ["8", "10", "12", "14"],
      difficulty: 5,
    },
    {
      question: "How many faces does a rectangular prism have?",
      answer: "6",
      options: ["4", "5", "6", "8"],
      difficulty: 4,
    },
  ];

  return spatialPickTemplate(difficulty, templates);
}

function spatialCreateVerticesQuestion(difficulty) {
  const templates = [
    {
      question: "How many vertices does a cube have?",
      answer: "8",
      options: ["6", "8", "10", "12"],
      difficulty: 5,
    },
    {
      question: "How many vertices does a triangle have?",
      answer: "3",
      options: ["2", "3", "4", "6"],
      difficulty: 5,
    },
  ];

  return spatialPickTemplate(difficulty, templates);
}

function spatialCreatePropertiesQuestion(difficulty) {
  const templates = [
    {
      question: "Which shape has opposite sides that are equal?",
      answer: "Rectangle",
      options: ["Rectangle", "Triangle", "Circle", "Oval"],
      difficulty: 4,
    },
    {
      question: "Which shape has all sides the same length and 4 right angles?",
      answer: "Square",
      options: ["Square", "Rectangle", "Triangle", "Circle"],
      difficulty: 1,
    },
  ];

  return spatialPickTemplate(difficulty, templates);
}

function spatialCreateCompositeQuestion(difficulty) {
  const templates = [
    {
      question: "If you cut a square from one corner to the opposite corner, what 2 shapes do you make?",
      answer: "2 triangles",
      options: ["2 circles", "2 triangles", "2 pentagons", "2 rectangles"],
      difficulty: 4,
    },
    {
      question: "Which shape has a flat square base and one point at the top?",
      answer: "Square pyramid",
      options: ["Cone", "Cube", "Square pyramid", "Sphere"],
      difficulty: 3,
    },
  ];

  return spatialPickTemplate(difficulty, templates);
}

function spatialCreateRotationQuestion(difficulty) {
  const templates = [
    {
      question: "You are facing north. If you turn left and then left again, which direction are you facing now?",
      answer: "South",
      options: ["North", "East", "South", "West"],
      difficulty: 5,
    },
    {
      question: "You are facing south. If you turn right and then right again, which direction are you facing now?",
      answer: "North",
      options: ["North", "East", "West", "South"],
      difficulty: 5,
    },
  ];

  return spatialPickTemplate(difficulty, templates);
}

function spatialCreateNetQuestion(difficulty) {
  const templates = [
    {
      question: "Which 3D shape can be made from 6 equal square faces?",
      answer: "Cube",
      options: ["Cube", "Cone", "Cylinder", "Triangular prism"],
      difficulty: 6,
    },
    {
      question: "A net has 2 congruent triangles and 3 rectangles. Which solid does it make?",
      answer: "Triangular prism",
      options: ["Triangular prism", "Square pyramid", "Cube", "Cylinder"],
      difficulty: 7,
    },
  ];

  return spatialPickTemplate(difficulty, templates);
}

function spatialCreateCrossSectionQuestion(difficulty) {
  const templates = [
    {
      question: "A cube is sliced straight across parallel to one face. What shape is the cross-section?",
      answer: "Square",
      options: ["Square", "Triangle", "Circle", "Pentagon"],
      difficulty: 6,
    },
    {
      question: "A cylinder is sliced straight across parallel to its circular bases. What shape is the cross-section?",
      answer: "Circle",
      options: ["Circle", "Rectangle", "Triangle", "Hexagon"],
      difficulty: 7,
    },
  ];

  return spatialPickTemplate(difficulty, templates);
}

function spatialCreateCoordinateTurnQuestion(difficulty) {
  const templates = [
    {
      question: "Point A is 3 squares right and 2 squares up from the start. After a quarter-turn clockwise around the start, where is A?",
      answer: "2 squares right and 3 squares down",
      options: [
        "2 squares right and 3 squares down",
        "3 squares left and 2 squares up",
        "2 squares left and 3 squares up",
        "3 squares right and 2 squares down",
      ],
      difficulty: 6,
    },
    {
      question: "Point B is 4 squares left and 1 square up from the start. After a half-turn around the start, where is B?",
      answer: "4 squares right and 1 square down",
      options: [
        "4 squares right and 1 square down",
        "1 square right and 4 squares down",
        "4 squares left and 1 square down",
        "1 square left and 4 squares up",
      ],
      difficulty: 7,
    },
  ];

  return spatialPickTemplate(difficulty, templates);
}

function spatialBuildOptions(answer, candidates) {
  const options = [String(answer), ...candidates.map(String)];
  const unique = [];

  for (const option of options) {
    if (option && !unique.includes(option)) {
      unique.push(option);
    }
  }

  if (unique.length !== 4) {
    throw new Error("Spatial generator produced invalid options");
  }

  return spatialShuffle(unique);
}

function spatialPickTemplate(difficulty, templates) {
  const level = spatialClampDifficulty(difficulty);
  const eligible = templates.filter((template) => template.difficulty <= level);
  return spatialRandomChoice(eligible.length ? eligible : templates);
}

function spatialClampDifficulty(value) {
  const difficulty = Number(value);
  if (!Number.isInteger(difficulty) || difficulty < 1) {
    return 1;
  }

  return Math.min(7, difficulty);
}

function spatialRandomChoice(values) {
  if (typeof randomChoice === "function") {
    return randomChoice(values);
  }

  return values[Math.floor(Math.random() * values.length)];
}

function spatialShuffle(values) {
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
