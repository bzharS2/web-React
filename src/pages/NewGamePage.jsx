import { Link } from "react-router-dom";

export default function NewGamePage() {
  return (
    <div className="home-screen">
      <div className="home-panel home-panel--compact">
        <p className="home-panel__eyebrow">Mission Complete</p>
        <h1>🎯 Victory</h1>
        <p className="subtitle">The bomb is defused. Want to play again?</p>

        <div className="buttons">
          <Link to="/Bomb" className="btn btn--danger">Play Again</Link>
          <Link to="/" className="btn btn--primary">Home</Link>
        </div>
      </div>
    </div>
  );
}
