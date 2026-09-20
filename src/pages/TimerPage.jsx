import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TimerPage() {
  const xd = Number(localStorage.getItem("xd") ?? 0);
  const yd = Number(localStorage.getItem("yd") ?? 0);
  const navigate = useNavigate();
  const [second, setSecond] = useState(120);
  const [accept, setAccept] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecond((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (accept) {
      window.alert("u got good reaction time");
      navigate("/NewGame");
    }
  }, [accept, navigate]);

  useEffect(() => {
    if (second === 0 && !accept) {
      alert("Time's up! You lost.");
    }
  }, [second, accept]);

  const end = String(second).at(-1) ?? "0";
  const result = xd + yd;

  function handleClick() {
    if (accept) return;

    const conditions = {
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "0",
      11: "1",
      12: "2",
    };

    if (end === conditions[result]) {
      setAccept(true);
    }
  }

  return (
    <div className="timer-page">
      <div className="timer-card">
        <p className="timer-card__label">Time Remaining</p>
        <div className="timer-value">{second}</div>
        <button className="btn btn--primary" onClick={handleClick}>Enter</button>
      </div>
    </div>
  );
}
