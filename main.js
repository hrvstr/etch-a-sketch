// Nodes
const container = document.getElementById("container");
const clearGridButton = document.getElementById("clear");

// Change grid
const gridButton = document.getElementById("grid");
const changeGridOverlay = document.getElementById("gridOverlay");
const changeGridValue = document.getElementById("gridValue");
const changeGridInput = document.getElementById("gridInput");
const changeGridButton = document.getElementById("gridApply");

// CSS Vars
const bodyStyle = getComputedStyle(document.body);
const backgroundLight = bodyStyle.getPropertyValue("--background-light");

// Defaults
const defaultGridSize = 16;

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
    let brightness = 50;
    div.addEventListener("mouseenter", () => {
      brightness += 10;
      div.style.background = getRandomColor(brightness);
    });
  }
  container.style.grid = `auto-flow / repeat(${size}, 1fr)`;
}

function removeGrid() {
  const pixels = container.querySelectorAll("div");
  pixels.forEach((pixel) => {
    container.removeChild(pixel);
  });
}

function calculateGrid(value) {
  return `${value}px * ${value}px = ${value * value}px`;
}

function toggleChangeGridOverlay() {
  if (changeGridOverlay.style.display == "none") {
    changeGridOverlay.style.display = "flex";
  } else {
    changeGridOverlay.style.display = "none";
  }
}

// Clear artboard
clearGridButton.addEventListener("click", () => {
  const pixels = container.querySelectorAll("div");
  pixels.forEach((pixel) => {
    pixel.style.background = backgroundLight;
  });
});

// Change grid size
changeGridButton.addEventListener("click", () => {
  changeGridOverlay.style.display = "none";
  removeGrid();
  createGrid(gridInput.value);
});

// Set initial values in
changeGridInput.value = defaultGridSize;
changeGridValue.value = calculateGrid(defaultGridSize);

// Create initial grid
createGrid(defaultGridSize);
