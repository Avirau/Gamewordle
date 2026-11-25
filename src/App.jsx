import { useState, useEffect, useCallback } from "react";
import GameBoard from "./components/GameBoard.jsx";
import Keyboard from "./components/Keyboard.jsx";
import { pickRandomWord } from "./words.js";
import { buildKeyStatuses } from "./utils/evaluateGuess.js";

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

export default function App() {
  // Centralized game state
  const [solutionWord, setSolutionWord] = useState(() => pickRandomWord());
  const [currentGuess, setCurrentGuess] = useState("");
  const [pastGuesses, setPastGuesses] = useState([]);
  const [gameStatus, setGameStatus] = useState("IN_PROGRESS");
  const [message, setMessage] = useState("");

  // One function handles both physical and on-screen keys.
  const handleKey = useCallback(
    (key) => {
      if (gameStatus !== "IN_PROGRESS") return; // halt input after win/loss

      if (key === "ENTER") {
        if (currentGuess.length < WORD_LENGTH) {
          setMessage("Not enough letters");
          return;
        }
        const newPast = [...pastGuesses, currentGuess];
        setPastGuesses(newPast);
        setCurrentGuess("");
        setMessage("");

        if (currentGuess === solutionWord) {
          setGameStatus("WON");
        } else if (newPast.length === MAX_GUESSES) {
          setGameStatus("LOST");
        }
      } else if (key === "BACKSPACE") {
        setCurrentGuess((g) => g.slice(0, -1));
        setMessage("");
      } else if (/^[A-Z]$/.test(key)) {
        setCurrentGuess((g) => (g.length < WORD_LENGTH ? g + key : g));
        setMessage("");
      }
    },
    [currentGuess, pastGuesses, solutionWord, gameStatus]
  );

  // Listen for physical keyboard presses.
  useEffect(() => {
    function onKeyDown(e) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const key = e.key.toUpperCase();
      if (key === "ENTER" || key === "BACKSPACE" || /^[A-Z]$/.test(key)) {
        handleKey(key);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleKey]);

  function restart() {
    setSolutionWord(pickRandomWord());
    setCurrentGuess("");
    setPastGuesses([]);
    setGameStatus("IN_PROGRESS");
    setMessage("");
  }

  const keyStatuses = buildKeyStatuses(pastGuesses, solutionWord);

  return (
    <div className="app">
      <h1>Wordle Clone</h1>
      <p className="message">{message || "\u00A0"}</p>

      <GameBoard
        pastGuesses={pastGuesses}
        currentGuess={currentGuess}
        solution={solutionWord}
      />

      <Keyboard keyStatuses={keyStatuses} onKey={handleKey} />

      {gameStatus !== "IN_PROGRESS" && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>{gameStatus === "WON" ? "You won! 🎉" : "Game over"}</h2>
            <p>
              {gameStatus === "WON"
                ? "Nice work. You found the hidden word."
                : "You used all 6 guesses. The word was:"}
            </p>
            {gameStatus === "LOST" && <p className="answer">{solutionWord}</p>}
            <button className="play-again" onClick={restart}>
              Play again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
