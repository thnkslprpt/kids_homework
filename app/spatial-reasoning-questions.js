const SPATIAL_REASONING_QUESTIONS = (() => {
  function q(difficulty, question, options, answer, extra = {}) {
    const normalizedOptions = Array.from(new Set(options.map(String)));
    const normalizedAnswer = String(answer);

    if (!String(question || "").trim()) {
      throw new Error("Spatial reasoning question is missing question text.");
    }

    if (normalizedOptions.length !== 4 || !normalizedOptions.includes(normalizedAnswer)) {
      throw new Error(`Spatial reasoning question must have exactly 4 unique options including the answer: ${question}`);
    }

    return {
      question: String(question),
      options: normalizedOptions,
      answer: normalizedAnswer,
      difficulty: spatialClampDifficulty(difficulty),
      ...extra,
    };
  }

  return [
    // Level 1: basic 2D shapes, corners, sides, and familiar solid shapes.
    q(1, "Which shape has 3 sides?", ["Triangle", "Square", "Circle", "Rectangle"], "Triangle"),
    q(1, "Which shape has 4 equal sides and 4 right angles?", ["Triangle", "Square", "Oval", "Pentagon"], "Square"),
    q(1, "Which shape has no corners?", ["Circle", "Triangle", "Square", "Rectangle"], "Circle"),
    q(1, "How many corners does a square have?", ["2", "3", "4", "5"], "4"),
    q(1, "How many sides does a hexagon have?", ["5", "6", "7", "8"], "6"),
    q(1, "Which shape has 4 sides and 4 corners?", ["Triangle", "Square", "Circle", "Oval"], "Square"),
    q(1, "Which everyday object is most like a sphere?", ["A ball", "A book", "A box", "A pencil"], "A ball"),
    q(1, "Which everyday object is most like a cylinder?", ["A can", "A soccer ball", "A pyramid", "A triangle"], "A can"),
    q(1, "Which everyday object is most like a cone?", ["An ice-cream cone", "A book", "A ball", "A brick"], "An ice-cream cone"),
    q(1, "Which shape is round and flat?", ["Circle", "Cube", "Cone", "Square pyramid"], "Circle"),
    q(1, "Which shape has 5 sides?", ["Triangle", "Square", "Pentagon", "Hexagon"], "Pentagon"),
    q(1, "Which shape has 4 equal sides?", ["Square", "Triangle", "Circle", "Oval"], "Square"),


    q(1, "Which shape has 6 sides?", ["Hexagon", "Pentagon", "Triangle", "Circle"], "Hexagon"),
    q(1, "Which shape has exactly 4 corners?", ["Square", "Triangle", "Circle", "Pentagon"], "Square"),
    q(1, "Which shape has exactly 3 corners?", ["Triangle", "Square", "Circle", "Rectangle"], "Triangle"),
    q(1, "Which shape is stretched out and round like an egg?", ["Oval", "Square", "Triangle", "Cube"], "Oval"),
    q(1, "Which everyday object is most like a cube?", ["A dice", "A ball", "A can", "A cone"], "A dice"),
    q(1, "Which everyday object is most like a rectangular prism?", ["A shoebox", "A ball", "A plate", "A cone"], "A shoebox"),
    q(1, "Which shape has 3 straight sides and 3 corners?", ["Triangle", "Square", "Circle", "Hexagon"], "Triangle"),
    q(1, "Which shape has no straight sides?", ["Circle", "Triangle", "Square", "Rectangle"], "Circle"),
    q(1, "How many sides does a rectangle have?", ["3", "4", "5", "6"], "4"),
    q(1, "How many sides does a triangle have?", ["2", "3", "4", "5"], "3"),
    q(1, "How many sides does a pentagon have?", ["4", "5", "6", "8"], "5"),
    q(1, "Which solid shape is like a box?", ["Cube", "Sphere", "Cone", "Circle"], "Cube"),

    // Level 2: simple turns, directions, and solid-object matching.
    q(2, "An arrow is pointing up. If it turns a quarter-turn clockwise, which way will it point?", ["Left", "Right", "Down", "Up"], "Right"),
    q(2, "An arrow is pointing left. If it turns a half-turn clockwise, which way will it point?", ["Up", "Down", "Left", "Right"], "Right"),
    q(2, "An arrow points right. If it turns a quarter-turn counterclockwise, which way will it point?", ["Up", "Down", "Left", "Right"], "Up"),
    q(2, "An arrow points down. If it turns a quarter-turn clockwise, which way will it point?", ["Left", "Right", "Up", "Down"], "Left"),
    q(2, "If you face north and turn left, which direction are you facing?", ["East", "West", "South", "North"], "West"),
    q(2, "If you face east and turn right, which direction are you facing?", ["North", "South", "East", "West"], "South"),
    q(2, "Which object is most like a rectangular prism?", ["A cereal box", "A basketball", "An ice-cream cone", "A coin"], "A cereal box"),
    q(2, "Which 3D shape rolls most like a ball?", ["Cube", "Sphere", "Pyramid", "Rectangular prism"], "Sphere"),
    q(2, "Which 3D shape has 2 flat circular faces and can roll?", ["Cube", "Sphere", "Cylinder", "Pyramid"], "Cylinder"),
    q(2, "How many flat faces does a cube have?", ["4", "5", "6", "8"], "6"),
    q(2, "Which shape has 5 corners?", ["Triangle", "Square", "Pentagon", "Circle"], "Pentagon"),
    q(2, "Which direction is opposite north?", ["East", "South", "West", "Northeast"], "South"),


    q(2, "An arrow is pointing right. If it turns a quarter-turn clockwise, which way will it point?", ["Down", "Up", "Left", "Right"], "Down"),
    q(2, "An arrow is pointing down. If it turns a half-turn, which way will it point?", ["Up", "Down", "Left", "Right"], "Up"),
    q(2, "An arrow is pointing left. If it turns a quarter-turn counterclockwise, which way will it point?", ["Down", "Up", "Left", "Right"], "Down"),
    q(2, "If you face west and turn right, which direction are you facing?", ["North", "South", "East", "West"], "North"),
    q(2, "If you face south and turn right, which direction are you facing?", ["West", "East", "North", "South"], "West"),
    q(2, "Which direction is opposite east?", ["West", "North", "South", "Northeast"], "West"),
    q(2, "Which 3D shape has only flat square faces?", ["Cube", "Sphere", "Cylinder", "Cone"], "Cube"),
    q(2, "Which 3D shape has a point and a circular base?", ["Cone", "Cube", "Sphere", "Rectangular prism"], "Cone"),
    q(2, "Which object is most like a sphere?", ["A marble", "A book", "A soup can", "A door"], "A marble"),
    q(2, "Which object is most like a cylinder?", ["A paper towel roll", "A football", "A pyramid", "A cube"], "A paper towel roll"),
    q(2, "How many equal square faces does a cube have?", ["4", "5", "6", "8"], "6"),
    q(2, "Which shape has 4 sides but does not need all sides to be equal?", ["Rectangle", "Circle", "Triangle", "Pentagon"], "Rectangle"),

    // Level 3: properties of 2D/3D shapes, simple symmetry, and orientation.
    q(3, "How many faces does a cube have?", ["4", "5", "6", "8"], "6"),
    q(3, "How many edges does a cube have?", ["8", "10", "12", "14"], "12"),
    q(3, "How many vertices does a cube have?", ["6", "8", "10", "12"], "8"),
    q(3, "How many corners does a triangle have?", ["2", "3", "4", "6"], "3"),
    q(3, "Which 3D shape has a flat square base and one point at the top?", ["Cone", "Cube", "Square pyramid", "Sphere"], "Square pyramid"),
    q(3, "Which 3D shape has two triangular ends and three rectangular faces?", ["Cube", "Cone", "Triangular prism", "Cylinder"], "Triangular prism"),
    q(3, "Which shape has opposite sides that are the same length?", ["Rectangle", "Triangle", "Circle", "Oval"], "Rectangle"),
    q(3, "A shape can be folded exactly in half along a line. What is that line called?", ["Line of symmetry", "Edge", "Vertex", "Diagonal only"], "Line of symmetry"),
    q(3, "If you face south and turn left, which direction are you facing?", ["East", "West", "North", "South"], "East"),
    q(3, "If a shape has 8 sides, what is it called?", ["Hexagon", "Octagon", "Pentagon", "Triangle"], "Octagon"),
    q(3, "Which shape has exactly one pair of parallel sides?", ["Trapezoid", "Circle", "Triangle", "Pentagon"], "Trapezoid"),
    q(3, "Which shape has all sides the same length but no right angles are required?", ["Rhombus", "Rectangle", "Circle", "Triangle"], "Rhombus"),


    q(3, "How many sides does an octagon have?", ["6", "7", "8", "9"], "8"),
    q(3, "Which shape has exactly 2 pairs of parallel sides?", ["Rectangle", "Triangle", "Pentagon", "Circle"], "Rectangle"),
    q(3, "Which shape has all points the same distance from its center?", ["Circle", "Square", "Triangle", "Rectangle"], "Circle"),
    q(3, "Which capital letter has a horizontal line of symmetry?", ["B", "F", "R", "N"], "B"),
    q(3, "Which capital letter has no line of symmetry?", ["F", "A", "H", "O"], "F"),
    q(3, "How many lines of symmetry does a square have?", ["1", "2", "4", "6"], "4"),
    q(3, "Which 3D shape has no flat faces?", ["Sphere", "Cube", "Cylinder", "Cone"], "Sphere"),
    q(3, "Which 3D shape has 1 curved surface and 2 circular faces?", ["Cylinder", "Sphere", "Cube", "Square pyramid"], "Cylinder"),
    q(3, "If you face west and turn left, which direction are you facing?", ["South", "North", "East", "West"], "South"),
    q(3, "If a shape has 7 sides, what is it called?", ["Heptagon", "Hexagon", "Octagon", "Pentagon"], "Heptagon"),
    q(3, "Which shape is a quadrilateral?", ["Rectangle", "Triangle", "Circle", "Oval"], "Rectangle"),
    q(3, "Which solid has two circular faces that are parallel?", ["Cylinder", "Cone", "Sphere", "Cube"], "Cylinder"),

    // Level 4: decomposing, composing, prisms, diagonals, and multi-step direction.
    q(4, "If you cut a square from one corner to the opposite corner, what 2 shapes do you make?", ["2 circles", "2 triangles", "2 pentagons", "2 rectangles"], "2 triangles"),
    q(4, "How many faces does a rectangular prism have?", ["4", "5", "6", "8"], "6"),
    q(4, "Which shape would best make the roof on a simple house drawing?", ["Triangle", "Circle", "Square", "Oval"], "Triangle"),
    q(4, "Which 3D shape has 1 point at the top and a circular base?", ["Sphere", "Cube", "Cone", "Cylinder"], "Cone"),
    q(4, "Which 3D shape has 1 curved surface and no corners?", ["Cube", "Sphere", "Pyramid", "Rectangular prism"], "Sphere"),
    q(4, "You are facing north. If you turn left and then left again, which direction are you facing now?", ["North", "East", "South", "West"], "South"),
    q(4, "You are facing south. If you turn right and then right again, which direction are you facing now?", ["North", "East", "West", "South"], "North"),
    q(4, "Which shape has two pairs of parallel sides and four right angles?", ["Rectangle", "Triangle", "Trapezoid", "Pentagon"], "Rectangle"),
    q(4, "A diagonal of a rectangle goes from one corner to which place?", ["The opposite corner", "The nearest side", "The center of a circle", "A curved edge"], "The opposite corner"),
    q(4, "Which solid has 5 faces, 5 vertices, and 8 edges?", ["Square pyramid", "Cube", "Cylinder", "Cone"], "Square pyramid"),
    q(4, "Which shape can be split into 2 equal triangles by drawing one diagonal?", ["Square", "Circle", "Oval", "Pentagon"], "Square"),
    q(4, "If you start at a point and move 2 squares east and 1 square north, where are you from the start?", ["Northeast", "Northwest", "Southeast", "Southwest"], "Northeast"),


    q(4, "If you draw one diagonal in a rectangle, how many triangles are formed?", ["2", "3", "4", "6"], "2"),
    q(4, "Which shape can be made by joining two equal right triangles along their longest side?", ["Rectangle", "Circle", "Pentagon", "Cone"], "Rectangle"),
    q(4, "You are facing east. If you turn left and then left again, which direction are you facing now?", ["West", "North", "South", "East"], "West"),
    q(4, "You are facing west. If you turn right and then right again, which direction are you facing now?", ["East", "North", "South", "West"], "East"),
    q(4, "Which solid has 6 faces, 8 vertices, and 12 edges?", ["Cube", "Cone", "Cylinder", "Square pyramid"], "Cube"),
    q(4, "Which solid has 1 square base and 4 triangular faces?", ["Square pyramid", "Cube", "Cylinder", "Triangular prism"], "Square pyramid"),
    q(4, "Which shape has two pairs of equal opposite sides and four right angles?", ["Rectangle", "Trapezoid", "Triangle", "Pentagon"], "Rectangle"),
    q(4, "If you start at a point and move 3 squares west and 2 squares south, where are you from the start?", ["Southwest", "Southeast", "Northwest", "Northeast"], "Southwest"),
    q(4, "Which shape can be split into 4 equal small squares by one vertical and one horizontal line?", ["Square", "Triangle", "Circle", "Pentagon"], "Square"),
    q(4, "A square has one diagonal drawn. What shape is each half?", ["Triangle", "Circle", "Pentagon", "Oval"], "Triangle"),
    q(4, "Which solid has flat faces only and no curved surfaces?", ["Rectangular prism", "Sphere", "Cylinder", "Cone"], "Rectangular prism"),
    q(4, "Which 2D shape is the face of a cube?", ["Square", "Circle", "Triangle", "Oval"], "Square"),

    // Level 5: stronger solid geometry, symmetry, rotations, and coordinate ideas.
    q(5, "How many vertices does a triangular prism have?", ["4", "5", "6", "8"], "6"),
    q(5, "How many edges does a triangular prism have?", ["6", "8", "9", "12"], "9"),
    q(5, "How many faces does a triangular prism have?", ["4", "5", "6", "8"], "5"),
    q(5, "How many corners does a square pyramid have?", ["4", "5", "6", "8"], "5"),
    q(5, "Which shape has 6 sides and 6 corners?", ["Triangle", "Square", "Hexagon", "Circle"], "Hexagon"),
    q(5, "If you start facing west, turn left, then turn right, which direction are you facing?", ["North", "South", "East", "West"], "West"),
    q(5, "If an arrow points up and turns 270 degrees clockwise, which way will it point?", ["Left", "Right", "Down", "Up"], "Left"),
    q(5, "A rectangle is reflected over a vertical line. What changes?", ["Left and right swap", "It becomes a circle", "It loses all corners", "It turns into a pyramid"], "Left and right swap"),
    q(5, "Which capital letter has a vertical line of symmetry?", ["A", "F", "G", "R"], "A"),
    q(5, "Which shape has no lines of symmetry?", ["Scalene triangle", "Square", "Circle", "Rectangle"], "Scalene triangle"),
    q(5, "Point A is at row 2, column 3. Which tells its position correctly?", ["Row 2, column 3", "Row 3, column 2", "Row 2 only", "Column 3 only"], "Row 2, column 3"),
    q(5, "Which solid has 6 rectangular faces?", ["Rectangular prism", "Cone", "Sphere", "Square pyramid"], "Rectangular prism"),


    q(5, "How many faces does a square pyramid have?", ["4", "5", "6", "8"], "5"),
    q(5, "How many edges does a square pyramid have?", ["5", "6", "8", "10"], "8"),
    q(5, "Which shape has 10 sides?", ["Decagon", "Octagon", "Hexagon", "Pentagon"], "Decagon"),
    q(5, "If you start facing north, turn right, then turn left, which direction are you facing?", ["North", "East", "South", "West"], "North"),
    q(5, "If an arrow points right and turns 270 degrees clockwise, which way will it point?", ["Up", "Down", "Left", "Right"], "Up"),
    q(5, "If an arrow points left and turns 180 degrees, which way will it point?", ["Right", "Left", "Up", "Down"], "Right"),
    q(5, "A triangle is reflected over a horizontal line. What changes?", ["Top and bottom swap", "It becomes a circle", "It loses one side", "It becomes a cube"], "Top and bottom swap"),
    q(5, "Which capital letter has both vertical and horizontal symmetry?", ["H", "F", "G", "R"], "H"),
    q(5, "Which shape has exactly 2 lines of symmetry?", ["Rectangle", "Scalene triangle", "Parallelogram", "Pentagon"], "Rectangle"),
    q(5, "Point B is at row 4, column 1. Which tells its position correctly?", ["Row 4, column 1", "Row 1, column 4", "Column 4, row 1", "Row 4 only"], "Row 4, column 1"),
    q(5, "Which solid has 2 triangular faces and 3 rectangular faces?", ["Triangular prism", "Cube", "Cone", "Square pyramid"], "Triangular prism"),
    q(5, "Which transformation flips a shape to make a mirror image?", ["Reflection", "Rotation", "Translation", "Volume"], "Reflection"),

    // Level 6: nets, cross-sections, coordinate turns, and cube stacks.
    q(6, "Which 3D shape can be made from 6 equal square faces?", ["Cube", "Cone", "Cylinder", "Triangular prism"], "Cube"),
    q(6, "A cube is sliced straight across parallel to one face. What shape is the cross-section?", ["Square", "Triangle", "Circle", "Pentagon"], "Square"),
    q(6, "A cylinder is sliced straight across parallel to its circular bases. What shape is the cross-section?", ["Circle", "Rectangle", "Triangle", "Hexagon"], "Circle"),
    q(6, "A net has 2 congruent triangles and 3 rectangles. Which solid does it make?", ["Triangular prism", "Square pyramid", "Cube", "Cylinder"], "Triangular prism"),
    q(6, "A net has 1 square and 4 triangles. Which solid does it make?", ["Square pyramid", "Cube", "Cylinder", "Triangular prism"], "Square pyramid"),
    q(6, "Point A is 3 squares right and 2 squares up from the start. After a quarter-turn clockwise around the start, where is A?", ["2 squares right and 3 squares down", "3 squares left and 2 squares up", "2 squares left and 3 squares up", "3 squares right and 2 squares down"], "2 squares right and 3 squares down"),
    q(6, "A 2 by 3 rectangle of unit squares is rotated a quarter-turn. What are its new dimensions?", ["3 by 2", "2 by 3", "1 by 6", "4 by 1"], "3 by 2"),
    q(6, "A stack has 2 cubes on the bottom and 1 cube centered on top. How many cubes are in the stack?", ["2", "3", "4", "5"], "3"),
    q(6, "Which view of a cube looks like a square?", ["Front view", "Only top view", "Only side view", "No view"], "Front view"),
    q(6, "A shape is moved 4 squares right without turning. What transformation is this?", ["Translation", "Reflection", "Rotation", "Cross-section"], "Translation"),
    q(6, "A shape is flipped over a mirror line. What transformation is this?", ["Reflection", "Translation", "Rotation", "Stacking"], "Reflection"),
    q(6, "A shape is turned around a point. What transformation is this?", ["Rotation", "Reflection", "Translation", "Net"], "Rotation"),


    q(6, "A net has 6 congruent squares. Which solid can it make?", ["Cube", "Cone", "Cylinder", "Triangular prism"], "Cube"),
    q(6, "A cylinder is sliced straight from top to bottom through its center. What shape can the cross-section be?", ["Rectangle", "Circle", "Triangle", "Pentagon"], "Rectangle"),
    q(6, "A cone is sliced straight through the tip and center of the base. What shape is the cross-section?", ["Triangle", "Circle", "Square", "Hexagon"], "Triangle"),
    q(6, "A 4 by 1 rectangle of unit squares is rotated a quarter-turn. What are its new dimensions?", ["1 by 4", "4 by 1", "2 by 2", "5 by 1"], "1 by 4"),
    q(6, "A stack has 3 cubes on the bottom and 2 cubes on top. How many cubes are in the stack?", ["5", "4", "6", "8"], "5"),
    q(6, "A shape is moved 2 squares left and 3 squares down without turning. What transformation is this?", ["Translation", "Rotation", "Reflection", "Net"], "Translation"),
    q(6, "A shape is turned 180 degrees around a point. What transformation is this?", ["Rotation", "Reflection", "Translation", "Cross-section"], "Rotation"),
    q(6, "Point A is 2 squares right and 4 squares up from the start. After a quarter-turn clockwise around the start, where is A?", ["4 squares right and 2 squares down", "2 squares right and 4 squares down", "4 squares left and 2 squares up", "2 squares left and 4 squares up"], "4 squares right and 2 squares down"),
    q(6, "Point A is 1 square right and 3 squares up from the start. After a quarter-turn counterclockwise around the start, where is A?", ["3 squares left and 1 square up", "3 squares right and 1 square down", "1 square left and 3 squares up", "1 square right and 3 squares down"], "3 squares left and 1 square up"),
    q(6, "Which view of a rectangular prism can look like a rectangle?", ["Front view", "No view", "Only corner view", "Only curved view"], "Front view"),
    q(6, "A net has 2 circles and 1 rectangle. Which solid does it make?", ["Cylinder", "Cone", "Cube", "Square pyramid"], "Cylinder"),
    q(6, "A cube is sliced parallel to its top face. Which shape is made by the slice?", ["Square", "Circle", "Triangle", "Oval"], "Square"),

    // Level 7: nets, projections, more complex turns, and surface thinking.
    q(7, "A cube has side length 1 unit. How many unit square faces cover the outside?", ["4", "5", "6", "8"], "6"),
    q(7, "A rectangular prism is 2 cubes long, 1 cube wide, and 1 cube high. How many small cubes make it?", ["2", "3", "4", "6"], "2"),
    q(7, "A rectangular prism is 2 cubes long, 2 cubes wide, and 1 cube high. How many small cubes make it?", ["3", "4", "5", "8"], "4"),
    q(7, "A cube is sliced from one corner to the opposite corner through the middle. Which cross-section could appear?", ["Hexagon", "Circle", "Oval", "Star"], "Hexagon"),
    q(7, "Which solid has exactly one curved surface and one flat circular face?", ["Cone", "Cylinder", "Sphere", "Cube"], "Cone"),
    q(7, "A cone is sliced parallel to its base. What shape is the cross-section?", ["Circle", "Triangle", "Rectangle", "Square"], "Circle"),
    q(7, "A cone is sliced from the tip straight through the center of the base. What shape is the cross-section?", ["Triangle", "Circle", "Rectangle", "Pentagon"], "Triangle"),
    q(7, "Point B is 4 squares left and 1 square up from the start. After a half-turn around the start, where is B?", ["4 squares right and 1 square down", "1 square right and 4 squares down", "4 squares left and 1 square down", "1 square left and 4 squares up"], "4 squares right and 1 square down"),
    q(7, "A shape is reflected over a horizontal line. What swaps?", ["Top and bottom", "Left and right only", "Inside and outside", "Edges and faces"], "Top and bottom"),
    q(7, "If a shape turns 90 degrees clockwise twice, how far has it turned?", ["180 degrees", "90 degrees", "270 degrees", "360 degrees"], "180 degrees"),
    q(7, "Which net could fold into a cube?", ["6 squares connected edge-to-edge", "4 triangles only", "2 circles and 1 rectangle", "1 square and 4 triangles"], "6 squares connected edge-to-edge"),
    q(7, "A top view of a cylinder looks like which shape?", ["Circle", "Triangle", "Rectangle", "Pentagon"], "Circle"),


    q(7, "A rectangular prism is 3 cubes long, 2 cubes wide, and 1 cube high. How many small cubes make it?", ["6", "5", "8", "12"], "6"),
    q(7, "A rectangular prism is 2 cubes long, 2 cubes wide, and 2 cubes high. How many small cubes make it?", ["8", "6", "10", "12"], "8"),
    q(7, "A cube has side length 2 units. How many small unit cubes fill it?", ["8", "4", "6", "12"], "8"),
    q(7, "A cylinder is sliced parallel to its side through the middle. What shape can the cross-section be?", ["Rectangle", "Circle", "Triangle", "Pentagon"], "Rectangle"),
    q(7, "A square pyramid is sliced straight down through its top point and the middle of its base. What shape can the cross-section be?", ["Triangle", "Circle", "Hexagon", "Oval"], "Triangle"),
    q(7, "Point B is 2 squares right and 5 squares down from the start. After a half-turn around the start, where is B?", ["2 squares left and 5 squares up", "5 squares right and 2 squares up", "2 squares right and 5 squares up", "5 squares left and 2 squares down"], "2 squares left and 5 squares up"),
    q(7, "A shape is reflected over a vertical line. What swaps?", ["Left and right", "Top and bottom only", "Faces and edges", "Area and perimeter"], "Left and right"),
    q(7, "If a shape turns 90 degrees counterclockwise three times, how far has it turned?", ["270 degrees counterclockwise", "90 degrees clockwise", "180 degrees clockwise", "360 degrees clockwise"], "270 degrees counterclockwise"),
    q(7, "Which net could fold into a square pyramid?", ["1 square and 4 triangles", "6 squares", "2 circles and 1 rectangle", "3 rectangles and 2 triangles"], "1 square and 4 triangles"),
    q(7, "A side view of a cone often looks like which shape?", ["Triangle", "Circle", "Square", "Hexagon"], "Triangle"),
    q(7, "Which solid has two congruent polygon bases connected by rectangles?", ["Prism", "Sphere", "Cone", "Circle"], "Prism"),
    q(7, "A top view of a square pyramid is usually which shape?", ["Square", "Circle", "Triangle", "Rectangle only"], "Square"),

    // Level 8: coordinate transformations, cube arrays, and reasoning from views.
    q(8, "Point (2, 3) is reflected over the y-axis. What is the new point?", ["(-2, 3)", "(2, -3)", "(-3, 2)", "(3, 2)"], "(-2, 3)"),
    q(8, "Point (2, 3) is reflected over the x-axis. What is the new point?", ["(2, -3)", "(-2, 3)", "(-3, 2)", "(3, 2)"], "(2, -3)"),
    q(8, "Point (1, 4) is translated 3 units right and 2 units down. What is the new point?", ["(4, 2)", "(4, 6)", "(-2, 2)", "(3, 1)"], "(4, 2)"),
    q(8, "A rectangle is 3 units wide and 5 units tall. After a 90-degree rotation, what can its dimensions be?", ["5 units wide and 3 units tall", "3 units wide and 5 units tall", "8 units wide and 1 unit tall", "15 units wide and 1 unit tall"], "5 units wide and 3 units tall"),
    q(8, "A 2 by 2 by 2 cube is built from small cubes. How many small cubes are used?", ["4", "6", "8", "12"], "8"),
    q(8, "A 3 by 2 by 1 rectangular prism is built from unit cubes. How many cubes are used?", ["5", "6", "8", "12"], "6"),
    q(8, "A solid has a front view that is a rectangle and a top view that is a circle. Which solid could it be?", ["Cylinder", "Cube", "Square pyramid", "Triangular prism"], "Cylinder"),
    q(8, "A solid has a front view that is a triangle and a top view that is a circle. Which solid could it be?", ["Cone", "Cylinder", "Cube", "Rectangular prism"], "Cone"),
    q(8, "Which statement is true about a cube and a rectangular prism?", ["Every cube is a rectangular prism", "Every rectangular prism is a cube", "Neither has faces", "Only cubes have edges"], "Every cube is a rectangular prism"),
    q(8, "A regular hexagon is divided from its center to all vertices. How many triangles are made?", ["4", "5", "6", "8"], "6"),
    q(8, "A square is rotated 90 degrees around its center. Which shape does it look like after the turn?", ["A square", "A triangle", "A circle", "A pentagon"], "A square"),
    q(8, "Which transformation keeps a figure the same size and shape?", ["Rotation", "Stretching", "Squashing", "Cutting"], "Rotation"),


    q(8, "Point (-3, 4) is reflected over the y-axis. What is the new point?", ["(3, 4)", "(-3, -4)", "(4, -3)", "(3, -4)"], "(3, 4)"),
    q(8, "Point (-2, -5) is reflected over the x-axis. What is the new point?", ["(-2, 5)", "(2, -5)", "(5, -2)", "(2, 5)"], "(-2, 5)"),
    q(8, "Point (4, 1) is translated 2 units left and 3 units up. What is the new point?", ["(2, 4)", "(6, 4)", "(2, -2)", "(1, 4)"], "(2, 4)"),
    q(8, "Point (-1, 3) is translated 5 units right and 1 unit down. What is the new point?", ["(4, 2)", "(-6, 2)", "(4, 4)", "(2, 4)"], "(4, 2)"),
    q(8, "A rectangle is 2 units wide and 6 units tall. After a 90-degree rotation, what can its dimensions be?", ["6 units wide and 2 units tall", "2 units wide and 6 units tall", "8 units wide and 1 unit tall", "12 units wide and 1 unit tall"], "6 units wide and 2 units tall"),
    q(8, "A 4 by 2 by 1 rectangular prism is built from unit cubes. How many cubes are used?", ["8", "6", "10", "12"], "8"),
    q(8, "A 3 by 3 by 2 rectangular prism is built from unit cubes. How many cubes are used?", ["18", "12", "15", "27"], "18"),
    q(8, "A solid has a front view that is a square and a top view that is a square. Which solid could it be?", ["Cube", "Cone", "Cylinder", "Sphere"], "Cube"),
    q(8, "A solid has a front view that is a rectangle and a side view that is a triangle. Which solid could it be?", ["Triangular prism", "Cylinder", "Sphere", "Cube"], "Triangular prism"),
    q(8, "A regular pentagon is divided from its center to all vertices. How many triangles are made?", ["5", "4", "6", "10"], "5"),
    q(8, "Which transformation changes a figure's position but not its size or shape?", ["Translation", "Stretching", "Squashing", "Cutting"], "Translation"),
    q(8, "A shape is reflected and then slid without changing size. Which property stays the same?", ["Shape size", "Color only", "Number of dimensions", "Grid labels"], "Shape size"),

    // Level 9: advanced mental rotation, cross-sections, nets, and spatial counting.
    q(9, "Point (3, 1) is rotated 90 degrees counterclockwise around the origin. What is the new point?", ["(-1, 3)", "(1, -3)", "(3, -1)", "(-3, 1)"], "(-1, 3)"),
    q(9, "Point (3, 1) is rotated 90 degrees clockwise around the origin. What is the new point?", ["(1, -3)", "(-1, 3)", "(-3, -1)", "(3, -1)"], "(1, -3)"),
    q(9, "Point (2, -4) is rotated 180 degrees around the origin. What is the new point?", ["(-2, 4)", "(2, 4)", "(-4, 2)", "(4, -2)"], "(-2, 4)"),
    q(9, "A 3 by 3 by 1 rectangular prism is built from unit cubes. How many cubes are used?", ["6", "9", "12", "27"], "9"),
    q(9, "A 3 by 3 by 3 cube is built from unit cubes. How many cubes are used?", ["9", "18", "27", "36"], "27"),
    q(9, "A 2 by 2 by 2 cube is painted on the outside. How many small cubes have exactly 3 painted faces?", ["4", "6", "8", "12"], "8"),
    q(9, "A rectangular prism has length 4, width 2, and height 3. What is its volume in unit cubes?", ["9", "18", "24", "32"], "24"),
    q(9, "A plane slices a cylinder parallel to its side, not through the circular bases. What shape can the cross-section be?", ["Rectangle", "Circle", "Pentagon", "Hexagon"], "Rectangle"),
    q(9, "Which solid has 8 vertices, 12 edges, and 6 faces?", ["Cube", "Square pyramid", "Cone", "Triangular prism"], "Cube"),
    q(9, "Which solid has 6 vertices, 9 edges, and 5 faces?", ["Triangular prism", "Cube", "Cone", "Cylinder"], "Triangular prism"),
    q(9, "A figure is reflected over the y-axis, then reflected over the x-axis. This matches which single transformation?", ["180-degree rotation", "90-degree rotation", "Translation right", "No movement"], "180-degree rotation"),
    q(9, "A square pyramid is sliced parallel to its base. What shape is the cross-section?", ["Square", "Circle", "Triangle", "Hexagon"], "Square"),


    q(9, "Point (1, 5) is rotated 90 degrees counterclockwise around the origin. What is the new point?", ["(-5, 1)", "(5, -1)", "(-1, -5)", "(1, -5)"], "(-5, 1)"),
    q(9, "Point (-2, 3) is rotated 90 degrees clockwise around the origin. What is the new point?", ["(3, 2)", "(-3, -2)", "(2, -3)", "(-2, -3)"], "(3, 2)"),
    q(9, "Point (-4, -1) is rotated 180 degrees around the origin. What is the new point?", ["(4, 1)", "(-4, 1)", "(1, 4)", "(4, -1)"], "(4, 1)"),
    q(9, "A 4 by 3 by 1 rectangular prism is built from unit cubes. How many cubes are used?", ["12", "8", "10", "16"], "12"),
    q(9, "A 4 by 2 by 2 rectangular prism is built from unit cubes. How many cubes are used?", ["16", "12", "18", "24"], "16"),
    q(9, "A 3 by 3 by 3 cube is painted on the outside. How many small cubes have exactly 3 painted faces?", ["8", "6", "12", "27"], "8"),
    q(9, "A 2 by 3 by 4 rectangular prism has what volume in unit cubes?", ["24", "18", "20", "32"], "24"),
    q(9, "A plane slices a cube parallel to a face. What shape is the cross-section?", ["Square", "Circle", "Triangle", "Oval"], "Square"),
    q(9, "A plane slices a sphere. What shape is the cross-section?", ["Circle", "Triangle", "Rectangle", "Square"], "Circle"),
    q(9, "A figure is rotated 90 degrees clockwise, then 90 degrees clockwise again. This matches which single transformation?", ["180-degree rotation", "90-degree rotation", "Reflection", "Translation"], "180-degree rotation"),
    q(9, "A figure is reflected over a vertical line, then reflected over the same vertical line again. What is the final position?", ["Back at the start", "Rotated 90 degrees", "Moved farther left", "Upside down"], "Back at the start"),
    q(9, "A cone is sliced parallel to its circular base. What shape is the cross-section?", ["Circle", "Triangle", "Rectangle", "Hexagon"], "Circle"),

    // Level 10: challenging coordinate geometry, cube nets, projections, and composed transformations.
    q(10, "Point (4, -2) is rotated 90 degrees counterclockwise around the origin. What is the new point?", ["(2, 4)", "(-2, -4)", "(-4, 2)", "(4, 2)"], "(2, 4)"),
    q(10, "Point (-3, 5) is rotated 90 degrees clockwise around the origin. What is the new point?", ["(5, 3)", "(-5, -3)", "(3, -5)", "(-3, -5)"], "(5, 3)"),
    q(10, "Point (-2, -6) is reflected over the line y = x. What is the new point?", ["(-6, -2)", "(2, 6)", "(6, 2)", "(-2, 6)"], "(-6, -2)"),
    q(10, "Point (5, -1) is reflected over the line y = -x. What is the new point?", ["(1, -5)", "(-1, 5)", "(-5, 1)", "(5, 1)"], "(1, -5)"),
    q(10, "A 4 by 3 by 2 rectangular prism is built from unit cubes. How many unit cubes are used?", ["18", "20", "24", "32"], "24"),
    q(10, "A 3 by 3 by 3 cube is painted on the outside. How many small cubes have no painted faces?", ["0", "1", "6", "8"], "1"),
    q(10, "A 4 by 4 by 4 cube is painted on the outside. How many small cubes have no painted faces?", ["4", "8", "16", "24"], "8"),
    q(10, "Which set of faces belongs in a cube net?", ["6 squares", "4 triangles", "2 circles and 1 rectangle", "1 square and 4 triangles"], "6 squares"),
    q(10, "A cube is viewed from one corner so three faces are visible. What shape are the visible face outlines usually drawn as?", ["Parallelograms", "Circles", "Pentagons", "Curved ovals"], "Parallelograms"),
    q(10, "A shape is rotated 90 degrees clockwise and then reflected over the x-axis. What should you do to track a point accurately?", ["Apply the rotation first, then the reflection", "Reflect first no matter what", "Ignore the order", "Only count the corners"], "Apply the rotation first, then the reflection"),
    q(10, "A square with vertices (0,0), (2,0), (2,2), and (0,2) is translated 3 units right. Which point is a new vertex?", ["(3,0)", "(-3,0)", "(2,3)", "(0,3)"], "(3,0)"),
    q(10, "A solid's top view is a rectangle, front view is a rectangle, and side view is a rectangle. Which solid best matches?", ["Rectangular prism", "Cone", "Sphere", "Square pyramid"], "Rectangular prism"),

    q(10, "Point (6, 1) is rotated 90 degrees counterclockwise around the origin. What is the new point?", ["(-1, 6)", "(1, -6)", "(-6, -1)", "(6, -1)"], "(-1, 6)"),
    q(10, "Point (-4, -2) is rotated 90 degrees clockwise around the origin. What is the new point?", ["(-2, 4)", "(2, -4)", "(4, 2)", "(-4, 2)"], "(-2, 4)"),
    q(10, "Point (3, -7) is reflected over the line y = x. What is the new point?", ["(-7, 3)", "(7, -3)", "(3, 7)", "(-3, 7)"], "(-7, 3)"),
    q(10, "Point (-6, 2) is reflected over the line y = -x. What is the new point?", ["(-2, 6)", "(2, -6)", "(6, -2)", "(-6, -2)"], "(-2, 6)"),
    q(10, "A 5 by 3 by 2 rectangular prism is built from unit cubes. How many unit cubes are used?", ["30", "24", "28", "40"], "30"),
    q(10, "A 5 by 5 by 5 cube is painted on the outside. How many small cubes have no painted faces?", ["27", "8", "9", "64"], "27"),
    q(10, "A 3 by 3 by 3 cube is painted on the outside. How many small cubes have exactly 2 painted faces?", ["12", "8", "6", "24"], "12"),
    q(10, "A 4 by 4 by 4 cube is painted on the outside. How many small cubes have exactly 3 painted faces?", ["8", "16", "24", "32"], "8"),
    q(10, "A cube net must have how many square faces?", ["6", "4", "5", "8"], "6"),
    q(10, "A point is reflected over y = x and then reflected over y = x again. What is the final point?", ["The original point", "The opposite point", "A point on the x-axis", "A point on the y-axis"], "The original point"),
    q(10, "A shape is translated 4 units right and then rotated 90 degrees around the origin. What should you do to track a point accurately?", ["Apply the translation first, then the rotation", "Rotate first no matter what", "Ignore the translation", "Only count the faces"], "Apply the translation first, then the rotation"),
    q(10, "A solid's top view is a circle, front view is a rectangle, and side view is a rectangle. Which solid best matches?", ["Cylinder", "Cone", "Sphere", "Square pyramid"], "Cylinder"),

  ];
})();

function createSpatialReasoningGeneratedEntry(difficulty) {
  const level = spatialClampDifficulty(difficulty);
  const generatorsByLevel = {
    1: [spatialGenerateShapeFact, spatialGenerateObjectShape, spatialGenerateSimpleSides],
    2: [spatialGenerateCardinalTurn, spatialGenerateObjectShape, spatialGenerateSolidFact],
    3: [spatialGenerateSolidFact, spatialGenerateCardinalTurn, spatialGenerateSymmetryFact],
    4: [spatialGenerateMultiTurn, spatialGenerateDiagonalOrDecompose, spatialGenerateSolidFact],
    5: [spatialGenerateMultiTurn, spatialGenerateRotationDegrees, spatialGeneratePrismFact],
    6: [spatialGenerateTransformationTerm, spatialGenerateCrossSection, spatialGenerateCoordinateTurn],
    7: [spatialGenerateCrossSection, spatialGenerateCubeCount, spatialGenerateReflectionFact],
    8: [spatialGenerateCoordinateReflection, spatialGenerateCubeVolume, spatialGenerateViewQuestion],
    9: [spatialGenerateCoordinateRotation, spatialGenerateCubePaintQuestion, spatialGenerateCompositeTransform],
    10: [spatialGenerateCoordinateRotation, spatialGenerateAdvancedReflection, spatialGenerateCubePaintQuestion],
  };

  const generators = generatorsByLevel[level] || generatorsByLevel[10];
  return spatialRandomChoice(generators)(level);
}

function spatialMakeEntry(difficulty, question, answer, distractors, extra = {}) {
  const options = spatialBuildOptions(answer, distractors);
  return {
    question: String(question),
    options,
    answer: String(answer),
    difficulty: spatialClampDifficulty(difficulty),
    ...extra,
  };
}

function spatialGenerateShapeFact(difficulty) {
  const facts = [
    { shape: "triangle", count: "3", feature: "sides", distractors: ["4", "5", "6"] },
    { shape: "square", count: "4", feature: "corners", distractors: ["2", "3", "5"] },
    { shape: "pentagon", count: "5", feature: "sides", distractors: ["3", "4", "6"] },
    { shape: "hexagon", count: "6", feature: "sides", distractors: ["4", "5", "8"] },
  ];
  const fact = spatialRandomChoice(facts);
  return spatialMakeEntry(
    Math.max(1, difficulty),
    `How many ${fact.feature} does a ${fact.shape} have?`,
    fact.count,
    fact.distractors
  );
}

function spatialGenerateObjectShape(difficulty) {
  const objects = [
    { object: "a ball", shape: "Sphere", distractors: ["Cube", "Cone", "Cylinder"] },
    { object: "a cereal box", shape: "Rectangular prism", distractors: ["Sphere", "Cone", "Cylinder"] },
    { object: "a soup can", shape: "Cylinder", distractors: ["Cube", "Sphere", "Pyramid"] },
    { object: "an ice-cream cone", shape: "Cone", distractors: ["Cylinder", "Cube", "Sphere"] },
  ];
  const item = spatialRandomChoice(objects);
  return spatialMakeEntry(
    difficulty,
    `Which 3D shape is most like ${item.object}?`,
    item.shape,
    item.distractors
  );
}

function spatialGenerateSimpleSides(difficulty) {
  const choices = [
    { question: "Which shape has no corners?", answer: "Circle", distractors: ["Triangle", "Square", "Pentagon"] },
    { question: "Which shape has 4 equal sides and 4 right angles?", answer: "Square", distractors: ["Triangle", "Oval", "Pentagon"] },
    { question: "Which shape has exactly 3 corners?", answer: "Triangle", distractors: ["Square", "Circle", "Hexagon"] },
  ];
  const item = spatialRandomChoice(choices);
  return spatialMakeEntry(difficulty, item.question, item.answer, item.distractors);
}

function spatialGenerateSolidFact(difficulty) {
  const facts = [
    { solid: "cube", feature: "faces", answer: "6", distractors: ["4", "5", "8"] },
    { solid: "cube", feature: "edges", answer: "12", distractors: ["8", "10", "14"] },
    { solid: "cube", feature: "vertices", answer: "8", distractors: ["6", "10", "12"] },
    { solid: "rectangular prism", feature: "faces", answer: "6", distractors: ["4", "5", "8"] },
    { solid: "square pyramid", feature: "vertices", answer: "5", distractors: ["4", "6", "8"] },
  ];
  const fact = spatialRandomChoice(facts);
  return spatialMakeEntry(
    difficulty,
    `How many ${fact.feature} does a ${fact.solid} have?`,
    fact.answer,
    fact.distractors
  );
}

function spatialGenerateCardinalTurn(difficulty) {
  const directions = ["North", "East", "South", "West"];
  const startIndex = spatialRandomInt(0, directions.length - 1);
  const turn = spatialRandomChoice([
    { label: "left", delta: -1 },
    { label: "right", delta: 1 },
    { label: "a half-turn", delta: 2 },
  ]);
  const answer = directions[(startIndex + turn.delta + 4) % 4];
  return spatialMakeEntry(
    difficulty,
    `You are facing ${directions[startIndex].toLowerCase()}. If you turn ${turn.label}, which direction are you facing?`,
    answer,
    directions.filter((direction) => direction !== answer)
  );
}

function spatialGenerateSymmetryFact(difficulty) {
  const facts = [
    { question: "Which shape always has 4 lines of symmetry?", answer: "Square", distractors: ["Scalene triangle", "Parallelogram", "Trapezoid"] },
    { question: "Which shape has no lines of symmetry?", answer: "Scalene triangle", distractors: ["Square", "Circle", "Rectangle"] },
    { question: "A mirror line creates matching halves. What is it called?", answer: "Line of symmetry", distractors: ["Vertex", "Edge", "Face"] },
  ];
  const fact = spatialRandomChoice(facts);
  return spatialMakeEntry(difficulty, fact.question, fact.answer, fact.distractors);
}

function spatialGenerateMultiTurn(difficulty) {
  const directions = ["North", "East", "South", "West"];
  const startIndex = spatialRandomInt(0, directions.length - 1);
  const first = spatialRandomChoice([
    { label: "left", delta: -1 },
    { label: "right", delta: 1 },
  ]);
  const second = spatialRandomChoice([
    { label: "left", delta: -1 },
    { label: "right", delta: 1 },
  ]);
  const answer = directions[(startIndex + first.delta + second.delta + 8) % 4];
  return spatialMakeEntry(
    difficulty,
    `You are facing ${directions[startIndex].toLowerCase()}. If you turn ${first.label} and then ${second.label}, which direction are you facing?`,
    answer,
    directions.filter((direction) => direction !== answer)
  );
}

function spatialGenerateDiagonalOrDecompose(difficulty) {
  const items = [
    { question: "If a square is cut from one corner to the opposite corner, what 2 shapes are made?", answer: "2 triangles", distractors: ["2 circles", "2 pentagons", "2 rectangles"] },
    { question: "A diagonal of a rectangle connects one corner to which place?", answer: "The opposite corner", distractors: ["The nearest side", "The center of a circle", "A curved edge"] },
    { question: "Which shape can be split into 2 equal triangles by one diagonal?", answer: "Square", distractors: ["Circle", "Oval", "Cone"] },
  ];
  const item = spatialRandomChoice(items);
  return spatialMakeEntry(difficulty, item.question, item.answer, item.distractors);
}

function spatialGenerateRotationDegrees(difficulty) {
  const starts = ["up", "right", "down", "left"];
  const labels = ["Up", "Right", "Down", "Left"];
  const startIndex = spatialRandomInt(0, starts.length - 1);
  const turn = spatialRandomChoice([
    { label: "90 degrees clockwise", delta: 1 },
    { label: "180 degrees", delta: 2 },
    { label: "270 degrees clockwise", delta: 3 },
  ]);
  const answer = labels[(startIndex + turn.delta) % 4];
  return spatialMakeEntry(
    difficulty,
    `An arrow points ${starts[startIndex]}. If it turns ${turn.label}, which way will it point?`,
    answer,
    labels.filter((label) => label !== answer)
  );
}

function spatialGeneratePrismFact(difficulty) {
  const facts = [
    { question: "How many faces does a triangular prism have?", answer: "5", distractors: ["4", "6", "8"] },
    { question: "How many edges does a triangular prism have?", answer: "9", distractors: ["6", "8", "12"] },
    { question: "How many vertices does a triangular prism have?", answer: "6", distractors: ["4", "5", "8"] },
    { question: "Which solid has 6 rectangular faces?", answer: "Rectangular prism", distractors: ["Cone", "Sphere", "Square pyramid"] },
  ];
  const fact = spatialRandomChoice(facts);
  return spatialMakeEntry(difficulty, fact.question, fact.answer, fact.distractors);
}

function spatialGenerateTransformationTerm(difficulty) {
  const transformations = [
    { description: "moved without turning or flipping", answer: "Translation", distractors: ["Reflection", "Rotation", "Cross-section"] },
    { description: "flipped over a mirror line", answer: "Reflection", distractors: ["Translation", "Rotation", "Net"] },
    { description: "turned around a point", answer: "Rotation", distractors: ["Reflection", "Translation", "Prism"] },
  ];
  const item = spatialRandomChoice(transformations);
  return spatialMakeEntry(
    difficulty,
    `A shape is ${item.description}. What transformation is this?`,
    item.answer,
    item.distractors
  );
}

function spatialGenerateCrossSection(difficulty) {
  const sections = [
    { solid: "cube", slice: "parallel to one face", answer: "Square", distractors: ["Circle", "Triangle", "Pentagon"] },
    { solid: "cylinder", slice: "parallel to its circular bases", answer: "Circle", distractors: ["Rectangle", "Triangle", "Hexagon"] },
    { solid: "cone", slice: "parallel to its base", answer: "Circle", distractors: ["Triangle", "Rectangle", "Square"] },
    { solid: "square pyramid", slice: "parallel to its base", answer: "Square", distractors: ["Circle", "Triangle", "Hexagon"] },
  ];
  const section = spatialRandomChoice(sections);
  return spatialMakeEntry(
    difficulty,
    `A ${section.solid} is sliced ${section.slice}. What shape is the cross-section?`,
    section.answer,
    section.distractors
  );
}

function spatialGenerateCoordinateTurn(difficulty) {
  const x = spatialRandomInt(1, 4);
  const y = spatialRandomInt(1, 4);
  const clockwise = Math.random() < 0.5;
  const answer = clockwise
    ? `${y} squares right and ${x} squares down`
    : `${y} squares left and ${x} squares up`;
  return spatialMakeEntry(
    difficulty,
    `Point A is ${x} squares right and ${y} squares up from the start. After a quarter-turn ${clockwise ? "clockwise" : "counterclockwise"} around the start, where is A?`,
    answer,
    [
      `${x} squares right and ${y} squares down`,
      `${y} squares right and ${x} squares up`,
      `${x} squares left and ${y} squares up`,
    ]
  );
}

function spatialGenerateCubeCount(difficulty) {
  const length = spatialRandomInt(2, 3);
  const width = spatialRandomInt(1, 3);
  const height = spatialRandomInt(1, 2);
  const answer = length * width * height;
  return spatialMakeEntry(
    difficulty,
    `A rectangular prism is ${length} cubes long, ${width} cubes wide, and ${height} cubes high. How many small cubes make it?`,
    String(answer),
    spatialNumericDistractors(answer, [length + width + height, length * width, answer + 2])
  );
}

function spatialGenerateReflectionFact(difficulty) {
  const facts = [
    { question: "A shape is reflected over a vertical line. What swaps?", answer: "Left and right", distractors: ["Top and bottom", "Faces and edges", "Corners and curves"] },
    { question: "A shape is reflected over a horizontal line. What swaps?", answer: "Top and bottom", distractors: ["Left and right only", "Inside and outside", "Edges and faces"] },
    { question: "A reflected shape keeps which property?", answer: "Same size and shape", distractors: ["Different number of sides", "Different area", "No vertices"] },
  ];
  const fact = spatialRandomChoice(facts);
  return spatialMakeEntry(difficulty, fact.question, fact.answer, fact.distractors);
}

function spatialGenerateCoordinateReflection(difficulty) {
  const x = spatialRandomInt(1, 5);
  const y = spatialRandomInt(1, 5);
  const overYAxis = Math.random() < 0.5;
  const answer = overYAxis ? `(-${x}, ${y})` : `(${x}, -${y})`;
  return spatialMakeEntry(
    difficulty,
    `Point (${x}, ${y}) is reflected over the ${overYAxis ? "y-axis" : "x-axis"}. What is the new point?`,
    answer,
    overYAxis
      ? [`(${x}, -${y})`, `(-${y}, ${x})`, `(${y}, ${x})`]
      : [`(-${x}, ${y})`, `(-${y}, ${x})`, `(${y}, ${x})`]
  );
}

function spatialGenerateCubeVolume(difficulty) {
  const length = spatialRandomInt(2, 4);
  const width = spatialRandomInt(2, 4);
  const height = spatialRandomInt(1, 3);
  const answer = length * width * height;
  return spatialMakeEntry(
    difficulty,
    `A ${length} by ${width} by ${height} rectangular prism is built from unit cubes. How many cubes are used?`,
    String(answer),
    spatialNumericDistractors(answer, [length + width + height, length * width, width * height])
  );
}

function spatialGenerateViewQuestion(difficulty) {
  const views = [
    { question: "A solid has a front view that is a rectangle and a top view that is a circle. Which solid could it be?", answer: "Cylinder", distractors: ["Cube", "Square pyramid", "Triangular prism"] },
    { question: "A solid has a front view that is a triangle and a top view that is a circle. Which solid could it be?", answer: "Cone", distractors: ["Cylinder", "Cube", "Rectangular prism"] },
    { question: "A top view of a cylinder usually looks like which shape?", answer: "Circle", distractors: ["Triangle", "Rectangle", "Pentagon"] },
  ];
  const view = spatialRandomChoice(views);
  return spatialMakeEntry(difficulty, view.question, view.answer, view.distractors);
}

function spatialGenerateCoordinateRotation(difficulty) {
  const x = spatialRandomInt(1, 5) * (Math.random() < 0.5 ? 1 : -1);
  const y = spatialRandomInt(1, 5) * (Math.random() < 0.5 ? 1 : -1);
  const clockwise = Math.random() < 0.5;
  const answerPoint = clockwise ? [y, -x] : [-y, x];
  const answer = spatialPoint(answerPoint[0], answerPoint[1]);
  return spatialMakeEntry(
    difficulty,
    `Point ${spatialPoint(x, y)} is rotated 90 degrees ${clockwise ? "clockwise" : "counterclockwise"} around the origin. What is the new point?`,
    answer,
    [
      spatialPoint(-answerPoint[0], answerPoint[1]),
      spatialPoint(answerPoint[0], -answerPoint[1]),
      spatialPoint(-x, -y),
    ]
  );
}

function spatialGenerateCubePaintQuestion(difficulty) {
  const size = difficulty >= 10 ? spatialRandomChoice([3, 4]) : spatialRandomChoice([2, 3]);
  const askInterior = difficulty >= 10 && size >= 3 && Math.random() < 0.5;
  const answer = askInterior ? Math.pow(size - 2, 3) : 8;
  return spatialMakeEntry(
    difficulty,
    askInterior
      ? `A ${size} by ${size} by ${size} cube is painted on the outside. How many small cubes have no painted faces?`
      : `A ${size} by ${size} by ${size} cube is painted on the outside. How many small cubes have exactly 3 painted faces?`,
    String(answer),
    askInterior
      ? spatialNumericDistractors(answer, [0, size, size * size])
      : spatialNumericDistractors(answer, [size, size * 2, size * size])
  );
}

function spatialGenerateCompositeTransform(difficulty) {
  const facts = [
    { question: "A figure is reflected over the y-axis, then reflected over the x-axis. This matches which single transformation?", answer: "180-degree rotation", distractors: ["90-degree rotation", "Translation right", "No movement"] },
    { question: "A figure is translated right and then translated left by the same amount. What is the final position?", answer: "Back at the start", distractors: ["Farther right", "Farther left", "Upside down"] },
    { question: "Two 90-degree clockwise rotations equal which turn?", answer: "180-degree rotation", distractors: ["45-degree rotation", "90-degree rotation", "360-degree rotation"] },
  ];
  const fact = spatialRandomChoice(facts);
  return spatialMakeEntry(difficulty, fact.question, fact.answer, fact.distractors);
}

function spatialGenerateAdvancedReflection(difficulty) {
  const x = spatialRandomInt(1, 6) * (Math.random() < 0.5 ? 1 : -1);
  const y = spatialRandomInt(1, 6) * (Math.random() < 0.5 ? 1 : -1);
  const overPositiveDiagonal = Math.random() < 0.5;
  const answerPoint = overPositiveDiagonal ? [y, x] : [-y, -x];
  const answer = spatialPoint(answerPoint[0], answerPoint[1]);
  return spatialMakeEntry(
    difficulty,
    `Point ${spatialPoint(x, y)} is reflected over the line ${overPositiveDiagonal ? "y = x" : "y = -x"}. What is the new point?`,
    answer,
    [
      spatialPoint(-answerPoint[0], answerPoint[1]),
      spatialPoint(answerPoint[0], -answerPoint[1]),
      spatialPoint(-x, -y),
    ]
  );
}

function spatialBuildOptions(answer, candidates) {
  const normalizedAnswer = String(answer);
  const options = [normalizedAnswer];

  for (const candidate of candidates.map(String)) {
    if (candidate && candidate !== normalizedAnswer && !options.includes(candidate)) {
      options.push(candidate);
    }
  }

  const fallbacks = [
    "Triangle",
    "Square",
    "Circle",
    "Rectangle",
    "Cube",
    "Sphere",
    "Cylinder",
    "Cone",
    "North",
    "South",
    "East",
    "West",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "8",
    "12",
    "24",
  ];

  for (const fallback of fallbacks) {
    if (options.length >= 4) break;
    if (fallback !== normalizedAnswer && !options.includes(fallback)) {
      options.push(fallback);
    }
  }

  if (options.length !== 4 || !options.includes(normalizedAnswer)) {
    throw new Error("Spatial reasoning generator produced invalid options.");
  }

  return spatialShuffle(options);
}

function spatialNumericDistractors(answer, candidates = []) {
  const numericAnswer = Number(answer);
  const values = [];

  for (const candidate of candidates) {
    const numeric = Number(candidate);
    if (Number.isFinite(numeric) && numeric !== numericAnswer) {
      values.push(String(numeric));
    }
  }

  for (const delta of [-2, -1, 1, 2, 3, -3, 4, -4, 6, -6, 8, -8]) {
    const candidate = numericAnswer + delta;
    if (candidate >= 0 && candidate !== numericAnswer) {
      values.push(String(candidate));
    }
  }

  return Array.from(new Set(values)).slice(0, 3);
}

function spatialPoint(x, y) {
  return `(${x}, ${y})`;
}

function spatialClampDifficulty(value) {
  const level = Number.parseInt(value, 10);
  if (!Number.isFinite(level)) {
    return 3;
  }

  return Math.max(1, Math.min(10, level));
}

function spatialRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function spatialRandomChoice(values) {
  return values[Math.floor(Math.random() * values.length)];
}

function spatialShuffle(values) {
  const copy = [...values];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}