import { Link } from "react-router-dom";
import { useState } from "react";
import one from "../assets/images/1.png";
import two from "../assets/images/2.png";
import three from "../assets/images/3.png";
import four from "../assets/images/4.png";
import five from "../assets/images/5.png";
import six from "../assets/images/6.png";

const diceImages = { 1: one, 2: two, 3: three, 4: four, 5: five, 6: six };

function createCode() {
  let newCode = "";
  const letters = "AEIOUBZCVGHLK";
  const nums = "1234567890";

  for (let i = 0; i < 8; i++) {
    newCode += i === 7 ? nums[Math.floor(Math.random() * nums.length)] : letters[Math.floor(Math.random() * letters.length)];
  }

  return newCode;
}

export default function DicePage() {
  const [localX, setLocalX] = useState(null);
  const [localY, setLocalY] = useState(null);
  const [code] = useState(() => createCode());
  const [passed, setPassed] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [rolled, setRolled] = useState(false);
  const [countRolls, setCountRolls] = useState(0);

  const checkWin = (d1, d2, rolls) => {
    const vowels = ["A", "E", "I", "O", "U"];
    let vowelCount = 0;

    for (let ch of code) {
      if (vowels.includes(ch)) vowelCount++;
    }

    const consonantCount = code.length - vowelCount - 1;
    const lastDigit = Number(code.at(-1));
    const even = lastDigit % 2 === 0;
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
    } else if (hasNoVowels) {
      if (d1 === d2) win = true;
    } else if (vowelCount > 3 && even) {
      if (consonantCount > 0) {
        if (d1 === consonantCount || d2 === consonantCount) {
          win = true;
        }
      } else if (lastDigit === 0) {
        if (d1 + d2 >= 8) {
          win = true;
        }
      } else if (d1 === lastDigit || d2 === lastDigit) {
        win = true;
      }
    } else if (vowelCount > 3 && !even) {
      if (rolls === lastDigit) {
        win = true;
      }
    } else if (vowelCount === 2) {
      if (d1 + d2 > lastDigit) {
        win = true;
      }
    } else if (vowelCount === 1) {
      if (d1 + d2 <= 5) {
        win = true;
      }
    } else if ((d1 + d2) % 3 === 0) {
      win = true;
    }

    setPassed(win);
  };

  const rollDice = () => {
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    const newRollCount = countRolls + 1;

    setLocalX(d1);
    setLocalY(d2);
    localStorage.setItem("xd", d1);
    localStorage.setItem("yd", d2);
    setRolled(true);
    setCountRolls(newRollCount);
    checkWin(d1, d2, newRollCount);
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
    <div className="dice-page">
      <div className="dice-container">
        <div className="dice">
          {rolled && <img src={diceImages[localX]} alt="Dice 1" />}
        </div>

        <div className="center">
          <button className="roll-btn" onClick={rollDice}>🎲 Roll Dice</button>
          <button className="btn btn--success" onClick={confirm}>Confirm</button>

          <p>
            <code className="serial">{code}</code>
          </p>

          {showNext && (
            <Link to="/Emoji" className="btn btn--success">Next --</Link>
          )}
        </div>

        <div className="dice">
          {rolled && <img src={diceImages[localY]} alt="Dice 2" />}
        </div>
      </div>
    </div>
  );
}
