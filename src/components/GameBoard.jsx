import Row from "../Row.jsx";

const MAX_ROWS = 6;

export default function GameBoard({ pastGuesses, currentGuess, solution }) {
  const rows = [];

  for (let i = 0; i < MAX_ROWS; i++) {
    if (i < pastGuesses.length) {
      rows.push(
        <Row key={i} guess={pastGuesses[i]} solution={solution} submitted={true} />
      );
    } else if (i === pastGuesses.length) {
      rows.push(
        <Row key={i} guess={currentGuess} solution={solution} submitted={false} />
      );
    } else {
      rows.push(<Row key={i} guess="" solution={solution} submitted={false} />);
    }
  }

  return <div className="board">{rows}</div>;
}
