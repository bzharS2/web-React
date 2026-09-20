import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import BombPage from "./pages/BombPage";
import DicePage from "./pages/DicePage";
import EmojiPage from "./pages/EmojiPage";
import MainPage from "./pages/MainPage";
import ManualPage from "./pages/ManualPage";
import NewGamePage from "./pages/NewGamePage";
import TimerPage from "./pages/TimerPage";

function App() {
  return (
    <BrowserRouter basename="/web-React">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Bomb" element={<BombPage />} />
        <Route path="/Manual" element={<ManualPage />} />
        <Route path="/Dice" element={<DicePage />} />
        <Route path="/Emoji" element={<EmojiPage />} />
        <Route path="/Timer" element={<TimerPage />} />
        <Route path="/NewGame" element={<NewGamePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
