import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <div className="home-screen">
      <div className="home-panel">
        <p className="home-panel__eyebrow">Mission Control</p>
        <h1>💣 Bomb Defusal</h1>
        <p className="subtitle">Choose your role</p>

        <div className="buttons">
          <Link to="/Manual" className="btn btn--primary">📖 Manual</Link>
          <Link to="/Bomb" className="btn btn--danger">💣 Defuse</Link>
        </div>
      </div>
    </div>
  );
}
