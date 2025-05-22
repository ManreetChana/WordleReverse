let currentLevel = 1;
const maxLevel = 5;
let slots = [];
let filled = [];
let currentLetter = "";
let lettersLeft = 0;

function updateLevelUI() {
  document.getElementById("level-title").textContent = `Level ${currentLevel}: Make a ${currentLevel + 1}-letter Word`;
  document.getElementById("game-board").style.display = "block";
  document.getElementById("congrats-screen").style.display = "none";
  document.getElementById("try-again-button").style.display = "none";

  // Reset UI
  const slotsDiv = document.getElementById("slots");
  const buttonsDiv = document.getElementById("buttons");
  slotsDiv.innerHTML = "";
  buttonsDiv.innerHTML = "";

  slots = new Array(currentLevel + 1).fill("");
  filled = new Array(currentLevel + 1).fill(false);
  lettersLeft = currentLevel + 1;

  for (let i = 0; i < slots.length; i++) {
    const div = document.createElement("div");
    div.className = "slot";
    div.dataset.index = i;
    slotsDiv.appendChild(div);

    const btn = document.createElement("button");
    btn.textContent = `Slot ${i + 1}`;
    btn.onclick = () => placeLetter(i);
    buttonsDiv.appendChild(btn);
  }

  getNewLetter();
  updateUI();
}

function randomLetter() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  return alphabet[Math.floor(Math.random() * alphabet.length)];
}

function getNewLetter() {
  if (lettersLeft > 0) {
    currentLetter = randomLetter();
    document.getElementById("current-letter").textContent = currentLetter;
  }
}

function updateUI() {
  document.querySelectorAll(".slot").forEach((slot, i) => {
    slot.textContent = slots[i];
  });
}

function placeLetter(index) {
  if (!filled[index] && currentLetter) {
    slots[index] = currentLetter;
    filled[index] = true;
    lettersLeft--;
    currentLetter = "";
    updateUI();

    if (lettersLeft > 0) {
      getNewLetter();
    }
  }
}

function submitWord() {
  const word = slots.join("").toLowerCase();

  if (slots.some(slot => slot === "" || slot == null)) {
    document.getElementById("message").textContent = "⚠️ Fill all slots!";
    return;
  }

  fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
    .then((res) => {
      if (!res.ok) throw new Error("Invalid word");
      return res.json();
    })
    .then(() => {
      document.getElementById("message").textContent = `🎉 "${word}" is valid!`;

      setTimeout(() => {
        if (currentLevel >= maxLevel) {
          endGame();
        } else {
          currentLevel++;
          document.getElementById("message").textContent = "";
          updateLevelUI();
        }
      }, 1500);
    })
    .catch(() => {
      document.getElementById("message").textContent = `Womp womp. "${word}" is not a valid word. Try again!`;
      document.getElementById("try-again-button").style.display = "inline-block";
    });
}

function resetLevel() {
  document.getElementById("message").textContent = "";
  updateLevelUI();
}

function endGame() {
  document.getElementById("game-board").style.display = "none";
  document.getElementById("congrats-screen").style.display = "block";
}

function restartGame() {
  currentLevel = 1;
  document.getElementById("message").textContent = "";
  updateLevelUI();
}

// Start game at Level 1
updateLevelUI();
