const slots = ["", "", "", "", ""];
let currentLetter = "";
let lettersLeft = 5;

function randomLetter() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  return alphabet[Math.floor(Math.random() * alphabet.length)];
}

function updateUI() {
  document.querySelectorAll(".slot").forEach((slot, i) => {
    slot.textContent = slots[i];
  });
  document.getElementById("current-letter").textContent = currentLetter;
}

function getNewLetter() {
  if (lettersLeft > 0) {
    currentLetter = randomLetter();
    updateUI();
  }
}

function placeLetter(index) {
  if (slots[index] === "" && currentLetter !== "") {
    slots[index] = currentLetter;
    currentLetter = "";
    lettersLeft--;
    updateUI();
    if (lettersLeft > 0) getNewLetter();
  }
}

function submitWord() {
  const word = slots.join("");
  fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
    .then((res) => {
      if (!res.ok) throw new Error("Not a word");
      return res.json();
    })
    .then(() => {
      document.getElementById("message").textContent = `🎉 "${word}" is a word!`;
    })
    .catch(() => {
      document.getElementById("message").textContent = `Womp womp. "${word}" isn't a word.`;
    });
}

// Start game
getNewLetter();
