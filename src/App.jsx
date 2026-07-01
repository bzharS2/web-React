import { Link, BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import "./App.css"
import { useEffect, useRef, useState } from "react"
import one from "./assets/images/1.png"
import two from "./assets/images/2.png"
import three from "./assets/images/3.png"
import four from "./assets/images/4.png"
import five from "./assets/images/5.png"
import six from "./assets/images/6.png"


function Main() {
  return (
    <div className="container">
      <h1>💣 Bomb Defusal</h1>
      <p className="subtitle">Choose your role</p>

      <div className="buttons">
        <Link to="/Manual" className="btn-manual">📖 Manual</Link>
        <Link to="/Bomb" className="btn-diffuse">💣 Defuse</Link>
      </div>
    </div>
  )
}

function Bomb() {
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
    let correctIdx
    switch (panelIdx) {
      case 0:
        correctIdx = 0
        break;
      case 1:
        correctIdx = 2
        break;
      case 2:
        correctIdx = 1
        break;
      case 3:
        correctIdx = 3
        break;
      case 4:
        correctIdx = 0
        break;
      case 5:
        correctIdx = 2
        break;
      case 6:
        correctIdx = 4
        break;
      case 7:
        correctIdx = 1
        break;
      case 8:
        correctIdx = 2
        break;
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

  const [game, setGame] = useState(initGame);
  const [flashMsg, setFlashMsg] = useState("");

  useEffect(() => {
    if (!flashMsg) return;
    const t = setTimeout(() => setFlashMsg(""), 1500);
    return () => clearTimeout(t);
  }, [flashMsg]);

  function handleWireClick(idx) {
    if (game.status || game.cutWires.includes(idx)) return;

    const isCorrect = idx === game.correctIdx;

    setGame((prev) => {
      const cutWires = [...prev.cutWires, idx];

      if (isCorrect) {
        return { ...prev, cutWires, status: "defused" };
      }

      const tries = prev.tries - 1;
      if (tries === 0) {
        return { ...prev, cutWires, tries, status: "boom" };
      }

      return { ...prev, cutWires, tries };
    });

    if (!isCorrect) {
      const newTries = game.tries - 1;
      if (newTries > 0) {
        setFlashMsg(newTries === 1 ? "Wrong — last chance!" : "Wrong wire!");
      }
    }
  }

  const { wires, cutWires, tries, status } = game;
  const { cls: indCls, label: indLabel } = indicatorState(
    status === "boom" ? 0 : tries
  );

  const headingText = status === "defused" ? "Defused!" : status === "boom" ? "Boom!" : flashMsg;
  const headingColor =
    status === "defused" ? "#22c55e" : status === "boom" || flashMsg ? "#ef4444" : "";

  return (
    <div className="BombBody">
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

        <div className="tries-row">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="try-dot" id={`t${i + 1}`}></div>
          ))}
        </div>

        <h1 id="Myh1" style={{ color: headingColor }}>
          {headingText}
        </h1>

        {status === "defused" && (
          <Link to="/Dice" className="btn" id="A">
            Next →
          </Link>
        )}

      </div>
    </div>
  );
}

function Manual() {
  return (
    <div className="Manual-Body">

      <div className="page-wrapper">

        <div className="scanline-overlay"></div>

        <header className="manual-header">
          <div className="header-badge">CLASSIFIED</div>
          <h1 className="manual-title">
            <span className="title-icon">📖</span>
            Bomb Manual
          </h1>
          <div className="header-badge">LEVEL 00</div>
        </header>

        <main className="manual-body">

          <section className="manual-section">
            <h2 className="section-heading">
              <span className="section-number">01</span>
              Wires
            </h2>
            <table className="rule-table">
              <thead>
                <tr>
                  <th>Wire Count</th>
                  <th>Instruction</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="wire-count-cell" rowSpan="3">3 wires</td>
                  <td>If there is only one red wire — cut the <span className="wire-tag wire-red">RED</span> wire</td>
                </tr>
                <tr>
                  <td>If there are no red wires — cut the <span className="wire-tag wire-neutral">LAST</span> wire</td>
                </tr>
                <tr>
                  <td>If there is more than one red wire — cut the <span className="wire-tag wire-neutral">SECOND</span> wire</td>
                </tr>
                <tr>
                  <td className="wire-count-cell" rowSpan="3">4 wires</td>
                  <td>If there is more than one yellow — cut the <span className="wire-tag wire-yellow">SECOND</span> yellow</td>
                </tr>
                <tr>
                  <td>If there is only one red with single or more blue — cut the <span className="wire-tag wire-neutral">FIRST</span> wire</td>
                </tr>
                <tr>
                  <td>If there is no blue — cut the <span className="wire-tag wire-neutral">THIRD</span> wire</td>
                </tr>
                <tr>
                  <td className="wire-count-cell" rowSpan="3">5 wires</td>
                  <td>If there is only one purple — cut the <span className="wire-tag wire-purple">PURPLE</span> wire</td>
                </tr>
                <tr>
                  <td>If there is more than one purple with no red wires — cut the <span className="wire-tag wire-neutral">SECOND</span> wire</td>
                </tr>
                <tr>
                  <td>Anything else — cut the first <span className="wire-tag wire-purple">PURPLE</span> wire</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="manual-section">
            <h2 className="section-heading">
              <span className="section-number">02</span>
              Dices
            </h2>
            <table className="rule-table dice-rule-table">
              <tbody>
                <tr>
                  <td>
                    <span className="status-badge badge-free">Free</span>
                    If you have all the vowels you get a free pass and immediately move on
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="status-badge badge-even">Even</span>
                    More than 3 vowels and serial code ends in an even number:
                    <ol className="sub-list">
                      <li>Roll until you get the same number as your non-vowels</li>
                      <li>If none (0 consonants) — roll until a die matches your last digit</li>
                      <li>If your last digit is ZERO — roll until you get a sum of 8 or higher</li>
                    </ol>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="status-badge badge-odd">Odd</span>
                    More than 3 vowels and serial code ends in an odd number — roll the same number of times as your last digit
                  </td>
                </tr>
                <tr>
                  <td>Exactly <span className="inline-highlight">2</span> vowels — roll until you get a sum greater than your last digit</td>
                </tr>
                <tr>
                  <td>Exactly <span className="inline-highlight">1</span> vowel — roll until you get a sum of 5 or below</td>
                </tr>
                <tr>
                  <td>No vowels — you are unlucky, roll until you get a <span className="inline-highlight">double</span></td>
                </tr>
                <tr>
                  <td>Otherwise — roll until your sum is a <span className="inline-highlight">multiple of 3</span></td>
                </tr>
              </tbody>
            </table>
            <h3>before moving make sure your partener has memorised the final dices he/she got</h3>
          </section>

          <section className="manual-section">
            <h2 className="section-heading">
              <span className="section-number">03</span>
              Button Positions
            </h2>
            <table className="rule-table position-rule-table">
              <tbody>
                <tr>
                  <td className="emoji-cell">✅🅰️🆚</td>
                  <td className="position-sequence">middle left right left middle right left middle left right middle left</td>
                </tr>
                <tr>
                  <td className="emoji-cell">🆎🆖🈁</td>
                  <td className="position-sequence">right middle left middle right left middle left right left middle left</td>
                </tr>
                <tr>
                  <td className="emoji-cell">🆙🔘🅾️</td>
                  <td className="position-sequence">left right middle right left middle right middle left middle right left</td>
                </tr>
                <tr>
                  <td className="emoji-cell">🆘🆔⏩</td>
                  <td className="position-sequence">middle left right left right middle left right middle right left middle</td>
                </tr>
              </tbody>
            </table>
          </section>
          <table className="rule-table position-rule-table">
            <h3>in order to move on tell ur partener to press enter when the timer has the sum of the dices in the last position</h3>
          </table>

        </main>

        <footer className="manual-footer">
          <Link to="/" className="back-link">⬅ Back</Link>
          <span className="footer-stamp">DEFUSE WITH CAUTION</span>
        </footer>

      </div>

    </div>
  )
}

function Dice({ setxd, setyd }) {
  const [localX, setLocalX] = useState(null);
  const [localY, setLocalY] = useState(null);
  const [code, setCode] = useState("");
  const [passed, setPassed] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const [rolled, setRolled] = useState(false);
  const [countRolls, setCountRolls] = useState(0);

  const diceImages = {
    1: one,
    2: two,
    3: three,
    4: four,
    5: five,
    6: six,
  };

  useEffect(() => {
    let newCode = "";
    const letters = "AEIOUBZCVGHLK";
    const nums = "1234567890";

    for (let i = 0; i < 8; i++) {
      if (i === 7) {
        newCode += nums[Math.floor(Math.random() * nums.length)];
      } else {
        newCode += letters[Math.floor(Math.random() * letters.length)];
      }
    }

    setCode(newCode);
  }, []);

  const rollDice = () => {
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;


    setLocalX(d1);   // for displaying images
    setLocalY(d2);
    localStorage.setItem("xd", d1);
    localStorage.setItem("yd", d2);

    setRolled(true);

    const newRollCount = countRolls + 1;
    setCountRolls(newRollCount);

    checkWin(d1, d2, newRollCount);
  };

  const checkWin = (d1, d2, rolls) => {
    const vowels = ["A", "E", "I", "O", "U"];

    let vowelCount = 0;

    for (let ch of code) {
      if (vowels.includes(ch)) vowelCount++;
    }
    const consonantCount = code.length - vowelCount - 1;
    const lastDigit = Number(code.at(-1));



    const even = lastDigit % 2 === 0;
    const odd = !even;
    const hasAllVowels =
      code.includes("A") &&
      code.includes("E") &&
      code.includes("I") &&
      code.includes("O") &&
      code.includes("U");

    const hasNoVowels =
      !code.includes("A") &&
      !code.includes("E") &&
      !code.includes("I") &&
      !code.includes("O") &&
      !code.includes("U");

    let win = false;

    if (hasAllVowels) {
      win = true;
    }
    else if (hasNoVowels) {
      if (d1 === d2) win = true;
    }
    else if (vowelCount > 3 && even) {
      if (consonantCount > 0) {
        if (d1 === consonantCount || d2 === consonantCount) {
          win = true;
        }
      } else {
        if (lastDigit === 0) {
          if (d1 + d2 >= 8) {
            win = true;
          }
        } else {
          if (d1 === lastDigit || d2 === lastDigit) {
            win = true;
          }
        }
      }
    }
    else if (vowelCount > 3 && odd) {
      if (rolls === lastDigit) {
        win = true;
      }
    }
    else if (vowelCount === 2) {
      if (d1 + d2 > lastDigit) {
        win = true;
      }
    }
    else if (vowelCount === 1) {
      if (d1 + d2 <= 5) {
        win = true;
      }
    }
    else {
      if ((d1 + d2) % 3 === 0) {
        win = true;
      }
    }

    setPassed(win);
  };

  const confirm = () => {
    if (passed) {

      setShowNext(true);
    } else {
      alert("u lost");
      window.location.reload();
    }
  };

  return (
    <div className="DiceBody">
      <div className="dice-container">

        <div className="dice">
          {rolled && (
            <img src={diceImages[localX]} alt="Dice 1" />
          )}
        </div>

        <div className="center">

          <button
            className="roll-btn"
            onClick={rollDice}
          >
            🎲 Roll Dice
          </button>

          <button
            className="btn"
            onClick={confirm}
          >
            Confirm
          </button>

          <p>
            <code className="serial">
              {code}
            </code>
          </p>

          {showNext && (
            <Link
              to="/Emoji"
              className="btn"
            >
              Next --
            </Link>
          )}

        </div>

        <div className="dice">
          {rolled && (
            <img src={diceImages[localY]} alt="Dice 2" />
          )}
        </div>

      </div>
    </div>
  );
}

function Emoji() {
  const [resetKey, setResetKey] = useState(0);

  return <EmojiGame key={resetKey} onReset={() => setResetKey(k => k + 1)} />;
}

function EmojiGame({ onReset }) {
  const arrays = [
    [2, 1, 3, 1, 2, 3, 1, 2, 1, 3, 2, 1],
    [3, 2, 1, 2, 3, 1, 2, 1, 3, 1, 2, 1],
    [1, 3, 2, 3, 1, 2, 3, 2, 1, 2, 3, 1],
    [2, 1, 3, 1, 3, 2, 1, 3, 2, 3, 1, 2],
  ];

  const randombtn = useRef(Math.floor(Math.random() * 4));
  const array = arrays[randombtn.current];

  const buttonValues = {
    1: 1, 2: 2, 3: 3,
    4: 1, 5: 2, 6: 3,
    7: 1, 8: 2, 9: 3,
    10: 1, 11: 2, 12: 3,
  };

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
      <div className="EmojiBody">
        <h1>You won! 🎉</h1>
        <Link to="/Timer" className="btn">Next --</Link>
      </div>
    );
  }

  return (
    <div className="EmojiBody">
      {divButtons.map(({ divIndex, buttons }) => (
        <div
          key={divIndex}
          className={`div ${divIndex === randombtn.current ? "" : "hidden"}`}
        >
          {buttons.map(({ id, emoji }) => (
            <button key={id} onClick={() => handleClick(id)}>
              {emoji}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

function Timer() {
  const xd = Number(localStorage.getItem("xd"));  // ← read here
  const yd = Number(localStorage.getItem("yd"));  // ← read here
  const navigate = useNavigate();
  const [second, setSecond] = useState(120);
  const [accept, setAccept] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setSecond(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  let end = `${second}`.at(-1);
  const result = xd + yd;
  function handleClick(second) {
    switch (result) {
      case 2: if (end == 2) {
        setAccept(true)
      }
        break
      case 3:
        if (end == 3) {
          setAccept(true)
        }
        break
      case 4:
        if (end == 4) {
          setAccept(true)
        }
        break
      case 5:
        if (end == 5) {
          setAccept(true)
        }

        break
      case 6:
        if (end == 6) {
          setAccept(true)
        }
        break
      case 7:
        if (end == 7) {
          setAccept(true)
        }
        break
      case 8:
        if (end == 8) {
          setAccept(true)
        }
        break
      case 9:
        if (end == 9) {
          setAccept(true)
        }
        break
      case 10:
        if (end == 0) {
          setAccept(true)
        }
        break
      case 11:
        if (end == 1) {
          setAccept(true)
        }
        break
      case 12:
        if (end == 2) {
          setAccept(true)
        }
        break

    }
  }
  if (accept) {
    window.alert(`u got good reaction time`)
    navigate("/NewGame")
  }
  useEffect(() => {
    if (second === 0) {
      alert("Time's up! You lost.");
    }
  }, [second, navigate]);

  return (
    <div>Time Remaining: {second}
      <br /><br />
      <button className="btn" onClick={() => handleClick(second)}>Enter</button>
    </div>
  );
}
function NewGame() {
  return (
    <div>NEWgAME</div>
  )
}
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Bomb" element={<Bomb />} />
        <Route path="/Manual" element={<Manual />} />
        <Route path="/Dice" element={<Dice />} />
        <Route path="/Emoji" element={<Emoji />} />
        <Route path="/Timer" element={<Timer />} />
        <Route path="/NewGame" element={<NewGame />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
