import Tile from "./Tile.jsx";
import { evaluateGuess } from "./utils/evaluateGuess.js";

// A row can be a past guess (colored), the current guess (typing), or empty.
export default function Row({ guess = "", solution, submitted }) {
  const statuses = submitted ? evaluateGuess(guess, solution) : [];
  const letters = guess.padEnd(5, " ").split("");

  return (
    <div className="row">
      {letters.map((ch, i) => (
        <Tile key={i} letter={ch.trim()} status={statuses[i]} />
      ))}
    </div>
  );
}
