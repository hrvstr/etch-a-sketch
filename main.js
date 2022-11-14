const container = document.getElementById("container");

// Create 16x16 DIV elements inside #container
for (i = 1; i <= 16 * 16; i++) {
  const div = document.createElement("div");
  div.textContent = i;
  container.appendChild(div);
}
