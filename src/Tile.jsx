export default function Tile({ letter, status }) {
  // status is "correct", "present", "absent", or undefined (not submitted yet)
  const classes = ["tile"];
  if (letter) classes.push("filled");
  if (status) classes.push(status);

  return <div className={classes.join(" ")}>{letter}</div>;
}
