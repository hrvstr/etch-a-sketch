const container = document.getElementById("container");
const changeGridButton = document.getElementById("change-grid");

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor(brightness) {
  return `hsl(${getRandomNumber(225, 275)}, ${getRandomNumber(
    50,
    100
  )}%, ${brightness}%)`;
}

function createGrid(size) {
  for (i = 1; i <= size * size; i++) {
    const div = document.createElement("div");
    container.appendChild(div);
    container.style.grid = `auto-flow / repeat(${size}, 1fr)`;
    let brightness = 50;
    div.addEventListener("mouseenter", () => {
      brightness += 10;
      div.style.background = getRandomColor(brightness);
    });
  }
}

function removeGrid() {
  const squares = container.querySelectorAll("div");
  squares.forEach((square) => {
    container.removeChild(square);
  });
}

changeGridButton.addEventListener("click", () => {
  // Get & check user input
  let userInput = prompt("How many squares per side?", 16);
  if (isNaN(userInput) || !userInput) {
    alert("Please supply a number from 1 to 100.");
  } else if (userInput > 100) {
    alert("Number should not be larger than 100.");
  } else if (userInput < 1) {
    alert("Number should be larger than 1.");
  } else {
    // Remove & Create grid
    removeGrid();
    createGrid(userInput);
  }
});

// Create initial grid
createGrid(16);
