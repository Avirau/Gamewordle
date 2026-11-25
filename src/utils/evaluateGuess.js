// Returns an array of 5 statuses: "correct", "present", or "absent".
// Two passes are used so repeated letters are handled the way real Wordle does it.
export function evaluateGuess(guess, solution) {
  const result = Array(5).fill("absent");
  const leftover = {}; // letters in the solution not matched as green

  // Pass 1: find greens and count the remaining solution letters
  for (let i = 0; i < 5; i++) {
    if (guess[i] === solution[i]) {
      result[i] = "correct";
    } else {
      leftover[solution[i]] = (leftover[solution[i]] || 0) + 1;
    }
  }

  // Pass 2: find yellows using only the leftover letters
  for (let i = 0; i < 5; i++) {
    if (result[i] === "correct") continue;
    const letter = guess[i];
    if (leftover[letter] > 0) {
      result[i] = "present";
      leftover[letter] -= 1;
    }
  }

  return result;
}

// Builds a map like { A: "correct", B: "absent" } for coloring the keyboard.
// A letter keeps its best status: correct > present > absent.
export function buildKeyStatuses(pastGuesses, solution) {
  const rank = { absent: 1, present: 2, correct: 3 };
  const statuses = {};

  pastGuesses.forEach((guess) => {
    const result = evaluateGuess(guess, solution);
    guess.split("").forEach((letter, i) => {
      const current = statuses[letter];
      if (!current || rank[result[i]] > rank[current]) {
        statuses[letter] = result[i];
      }
    });
  });

  return statuses;
}
