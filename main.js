// Nodes
const container = document.getElementById("container");
const clearGridButton = document.getElementById("clear");
const helpButton = document.getElementById("help");
const drawModeInfo = document.getElementById("info");
const instructions = document.getElementById("instructions");
const drawModeStatusDisplay = document.getElementById("status");
const drawModeIndicator = document.getElementById("drawModeIndicator");
const drawModeSeparator = document.getElementById("drawModeSeparator");
const drawModeStatusCloseButton = document.getElementById("infoClose");
const colorModeButton = document.getElementById("colorModeButton");
const colorPicker = document.getElementById("colorPicker");
const colorLabel = document.getElementById("colorLabel");
const randomRange = document.getElementById("randomRange");

// Change grid
const gridButton = document.getElementById("grid");
const changeGridOverlay = document.getElementById("gridOverlay");
const changeGridValue = document.getElementById("gridValue");
const changeGridInput = document.getElementById("gridInput");
const changeGridButton = document.getElementById("gridApply");

// CSS Vars
const bodyStyle = getComputedStyle(document.body);
const secondary = bodyStyle.getPropertyValue("--secondary");
const tertiary = bodyStyle.getPropertyValue("--tertiary");
const green = bodyStyle.getPropertyValue("--green");
const red = bodyStyle.getPropertyValue("--red");

// Defaults
const defaultGridSize = 16;
createGrid(defaultGridSize);

// Draw mode
let drawModeIsActive = true;
changeDrawModeInfo();

// Change grid
changeGridValue.value = calculateGrid(defaultGridSize);

// Color
let currentColor = green;
let randomColorMode = true;
colorPicker.value = currentColor;

// Functions

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor(brightness) {
  return `hsl(${getRandomNumber(0, 360)}, ${getRandomNumber(
    50,
    100
  )}%, ${brightness}%)`;
}

function createGrid(size) {
  container.style.grid = `auto-flow / repeat(${size}, 1fr)`;
  for (i = 1; i <= size * size; i++) {
    const div = document.createElement("div");
    container.appendChild(div);
    let brightness = 50;
    div.addEventListener("mouseenter", () => {
      if (drawModeIsActive) {
        if (randomColorMode) {
          brightness += 10;
          div.style.background = getRandomColor(brightness);
        } else {
          div.style.background = currentColor;
        }
      }
    });
  }
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
  changeGridOverlay.classList.toggle("hidden");
}

function changeDrawModeInfo() {
  if (drawModeIsActive) {
    drawModeStatusDisplay.style.color = green;
    drawModeStatusDisplay.textContent = "Drawing enabled.";
    instructions.textContent =
      "Move the cursor to draw. Click the square to stop drawing.";
  } else {
    drawModeStatusDisplay.style.color = red;
    drawModeStatusDisplay.textContent = "Drawing disabled.";
    instructions.textContent =
      "Click on the square and move the cursor to start drawing.";
  }
}

function toggleDrawModeInfo() {
  drawModeInfo.classList.toggle("hidden");
  helpButton.classList.toggle("hidden");
  drawModeIndicator.classList.toggle("hidden");
  drawModeSeparator.classList.toggle("hidden");
}

// Event listeners

// Toggle color mode
colorModeButton.addEventListener("click", () => {
  colorPicker.classList.toggle("hidden");
  colorModeButton.classList.toggle("background-green");
  randomRange.classList.toggle("hidden");
  if (randomColorMode == true) {
    colorLabel.textContent = currentColor;
  } else {
    colorLabel.textContent = "";
  }
  randomColorMode = !randomColorMode;
});

// Toggle draw mode when clicking on the container
container.addEventListener("click", () => {
  drawModeIsActive = !drawModeIsActive;
  drawModeIndicator.classList.toggle("background-red");
  changeDrawModeInfo();
});

// Toggle draw mode info
drawModeStatusCloseButton.addEventListener("click", toggleDrawModeInfo);
helpButton.addEventListener("click", toggleDrawModeInfo);
drawModeIndicator.addEventListener("click", toggleDrawModeInfo);

// Change color
colorPicker.addEventListener("input", () => {
  currentColor = colorPicker.value;
  colorLabel.textContent = colorPicker.value;
});

// Change grid size
changeGridButton.addEventListener("click", () => {
  changeGridOverlay.classList.toggle("hidden");
  removeGrid();
  createGrid(gridInput.value);
});

// Clear artboard
clearGridButton.addEventListener("click", () => {
  const pixels = container.querySelectorAll("div");
  pixels.forEach((pixel) => {
    pixel.style.background = tertiary;
  });
});
