import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const PANELS = [
  [{ c: "red" }, { c: "blue" }, { c: "green" }],
  [{ c: "green" }, { c: "blue" }, { c: "green" }],
  [{ c: "red" }, { c: "red" }, { c: "green" }],
  [{ c: "yellow" }, { c: "blue" }, { c: "green" }, { c: "yellow" }],
  [{ c: "blue" }, { c: "red" }, { c: "blue" }, { c: "yellow" }],
  [{ c: "red" }, { c: "green" }, { c: "green" }, { c: "yellow" }],
  [{ c: "red" }, { c: "blue" }, { c: "green" }, { c: "yellow" }, { c: "purple" }],
  [{ c: "purple" }, { c: "blue" }, { c: "green" }, { c: "yellow" }, { c: "purple" }],
  [{ c: "red" }, { c: "blue" }, { c: "purple" }, { c: "yellow" }, { c: "purple" }],
];

function pickRandom(arr) {
  return Math.floor(Math.random() * arr.length);
}

function initGame() {
  const panelIdx = pickRandom(PANELS);
  const wires = PANELS[panelIdx];

  let correctIdx;
  switch (panelIdx) {
    case 0:
      correctIdx = 0;
      break;
    case 1:
      correctIdx = 2;
      break;
    case 2:
      correctIdx = 1;
      break;
    case 3:
      correctIdx = 3;
      break;
    case 4:
      correctIdx = 0;
      break;
    case 5:
      correctIdx = 2;
      break;
    case 6:
      correctIdx = 4;
      break;
    case 7:
      correctIdx = 1;
      break;
    case 8:
      correctIdx = 2;
      break;
    default:
      correctIdx = 0;
  }

  return {
    wires,
    correctIdx,
    cutWires: [],
    tries: 2,
    status: null,
    message: "",
  };
}

function indicatorState(tries) {
  if (tries === 2) return { cls: "ind-green", label: "Safe" };
  if (tries === 1) return { cls: "ind-yellow", label: "Caution" };
  return { cls: "ind-red", label: "Danger" };
}

export default function BombPage() {
  const [game, setGame] = useState(initGame);
  const [flashMsg, setFlashMsg] = useState("");

  useEffect(() => {
    if (!flashMsg) return;
    const timer = setTimeout(() => setFlashMsg(""), 1500);
    return () => clearTimeout(timer);
  }, [flashMsg]);

  function handleWireClick(idx) {
    if (game.status || game.cutWires.includes(idx)) return;

    setGame((prev) => {
      if (prev.status || prev.cutWires.includes(idx)) return prev;

      const isCorrect = idx === prev.correctIdx;
      const cutWires = [...prev.cutWires, idx];

      if (isCorrect) {
        return { ...prev, cutWires, status: "defused" };
      }

      const tries = prev.tries - 1;
      setFlashMsg(tries === 1 ? "Wrong — last chance!" : "Wrong wire!");

      if (tries === 0) {
        return { ...prev, cutWires, tries, status: "boom" };
      }

      return { ...prev, cutWires, tries };
    });
  }

  const { wires, cutWires, tries, status } = game;
  const spentTries = Math.max(0, 2 - tries);
  const { cls: indCls, label: indLabel } = indicatorState(status === "boom" ? 0 : tries);
  const headingText = status === "defused" ? "Defused!" : status === "boom" ? "Boom!" : flashMsg;
  const headingColor = status === "defused" ? "var(--color-success)" : status === "boom" || flashMsg ? "var(--color-danger)" : "var(--color-text-soft)";

  return (
    <div className="bomb-page">
      <div className="bomb">
        <div className="bomb-header">
          <span className="bomb-label">Unit 04 — Defuse</span>
          <div className="indicator-wrap">
            <div id="indicator" className={`color ${indCls}`}></div>
            <span className="ind-label" id="ind-label">{indLabel}</span>
          </div>
        </div>

        <div className="panel">
          {wires.map((wire, idx) => (
            <div
              key={idx}
              className={`wire ${wire.c}${cutWires.includes(idx) ? " cut" : ""}`}
              onClick={() => handleWireClick(idx)}
            >
              <span className="node left"></span>
              <span className="node right"></span>
            </div>
          ))}
        </div>

        <div className="tries-row" aria-label={`Attempts remaining: ${tries}`}>
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className={`try-dot ${i < spentTries ? "spent" : ""}`}
              id={`t${i + 1}`}
            ></div>
          ))}
        </div>

        <h1 id="Myh1" style={{ color: headingColor }}>{headingText}</h1>

        {status === "defused" && (
          <Link to="/Dice" className="btn btn--success" id="A">
            Next →
          </Link>
        )}
      </div>
    </div>
  );
}
