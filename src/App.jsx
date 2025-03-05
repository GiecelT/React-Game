import React from "react";
import GameBoard from "./assets/components/Gameboard.jsx";
import "./index.css";

const App = () => (
    <div className="app">
        <h1>Matching Card Game</h1>
        <button onClick={() => window.location.reload()}>Restart</button>
        <GameBoard />
    </div>
);

export default App;
