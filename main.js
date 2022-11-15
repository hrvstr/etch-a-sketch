const container = document.getElementById("container");
const changeGridButton = document.getElementById("change-grid");

function createGrid(size) {
  for (i = 1; i <= size * size; i++) {
    const div = document.createElement("div");
    // div.textContent = i;
    container.appendChild(div);
    container.style.grid = `auto-flow / repeat(${size}, 1fr)`;
    div.addEventListener("mouseenter", () => {
      div.classList.add("active");
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
  let userInput = prompt("How many square per side?", 16);
  if (isNaN(userInput) || !userInput) {
    alert("Please supply a number from 1 to 100.");
  } else if (userInput > 100) {
    alert("Number should not be larger than 100");
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
