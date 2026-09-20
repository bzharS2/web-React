import { Link } from "react-router-dom";
import { useState } from "react";

const arrays = [
  [2, 1, 3, 1, 2, 3, 1, 2, 1, 3, 2, 1],
  [3, 2, 1, 2, 3, 1, 2, 1, 3, 1, 2, 1],
  [1, 3, 2, 3, 1, 2, 3, 2, 1, 2, 3, 1],
  [2, 1, 3, 1, 3, 2, 1, 3, 2, 3, 1, 2],
];

const buttonValues = {
  1: 1, 2: 2, 3: 3,
  4: 1, 5: 2, 6: 3,
  7: 1, 8: 2, 9: 3,
  10: 1, 11: 2, 12: 3,
};

function EmojiGame({ onReset }) {
  const [randombtn] = useState(() => Math.floor(Math.random() * arrays.length));
  const array = arrays[randombtn];
  const [index, setIndex] = useState(0);
  const [won, setWon] = useState(false);

  function handleClick(btnId) {
    const pressed = buttonValues[btnId];

    if (array[index] !== pressed) {
      alert("wrong button");
      onReset();
    } else {
      const next = index + 1;
      if (next === 12) {
        setWon(true);
      } else {
        setIndex(next);
      }
    }
  }

  const divButtons = [
    { divIndex: 0, buttons: [{ id: 1, emoji: "✅" }, { id: 2, emoji: "🅰️" }, { id: 3, emoji: "🆚" }] },
    { divIndex: 1, buttons: [{ id: 4, emoji: "🆎" }, { id: 5, emoji: "🆖" }, { id: 6, emoji: "🈁" }] },
    { divIndex: 2, buttons: [{ id: 7, emoji: "🆙" }, { id: 8, emoji: "🔘" }, { id: 9, emoji: "🅾️" }] },
    { divIndex: 3, buttons: [{ id: 10, emoji: "🆘" }, { id: 11, emoji: "🆔" }, { id: 12, emoji: "⏩" }] },
  ];

  if (won) {
    return (
      <div className="emoji-success">
        <h1>You won! 🎉</h1>
        <Link to="/Timer" className="btn btn--success">Next --</Link>
      </div>
    );
  }

  return (
    <div className="emoji-page">
      {divButtons.map(({ divIndex, buttons }) => (
        <div
          key={divIndex}
          className={`emoji-grid ${divIndex === randombtn ? "" : "hidden"}`}
        >
          {buttons.map(({ id, emoji }) => (
            <button key={id} onClick={() => handleClick(id)}>{emoji}</button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function EmojiPage() {
  const [resetKey, setResetKey] = useState(0);
  return <EmojiGame key={resetKey} onReset={() => setResetKey((k) => k + 1)} />;
}
