import React, { useState, useEffect } from "react";
import Card from "./Cards.jsx";

const initialCards = [
    { id: 1, value: "A", flipped: false, matched: false },
    { id: 2, value: "B", flipped: false, matched: false },
    { id: 3, value: "C", flipped: false, matched: false },
    { id: 4, value: "D", flipped: false, matched: false },
    { id: 5, value: "E", flipped: false, matched: false },
    { id: 6, value: "F", flipped: false, matched: false },
    { id: 7, value: "G", flipped: false, matched: false },
    { id: 8, value: "H", flipped: false, matched: false },
    { id: 9, value: "A", flipped: false, matched: false },
    { id: 10, value: "B", flipped: false, matched: false },
    { id: 11, value: "C", flipped: false, matched: false },
    { id: 12, value: "D", flipped: false, matched: false },
    { id: 13, value: "E", flipped: false, matched: false },
    { id: 14, value: "F", flipped: false, matched: false },
    { id: 15, value: "G", flipped: false, matched: false },
    { id: 16, value: "H", flipped: false, matched: false }
].sort(() => Math.random() - 0.5);

const GameBoard = () => {
    const [cards, setCards] = useState(initialCards);
    const [selected, setSelected] = useState([]);
    const [clickCount, setClickCount] = useState(0); // Track number of clicks
    const [gameWon, setGameWon] = useState(false); // Track if the game is won
    const [timer, setTimer] = useState(0); // Timer state
    const [intervalId, setIntervalId] = useState(null); // To store the interval reference

    const handleCardClick = (id) => {
        if (selected.length === 2 || gameWon) return; // Prevent action after game is won

        // Flip the selected card
        const newCards = cards.map(card =>
            card.id === id ? { ...card, flipped: true } : card
        );
        setCards(newCards);

        // Add the card to selected
        const newSelected = [...selected, newCards.find(card => card.id === id)];
        setSelected(newSelected);

        // Increase click count
        setClickCount(prev => prev + 1);

        if (newSelected.length === 2) {
            setTimeout(() => {
                if (newSelected[0].value === newSelected[1].value) {
                    setCards(prev =>
                        prev.map(card =>
                            newSelected.some(sel => sel.id === card.id)
                                ? { ...card, matched: true }
                                : card
                        )
                    );
                } else {
                    setCards(prev =>
                        prev.map(card =>
                            newSelected.some(sel => sel.id === card.id)
                                ? { ...card, flipped: false }
                                : card
                        )
                    );
                }
                setSelected([]);
            }, 1000);
        }
    };

    // Check if the game is won (all cards matched)
    useEffect(() => {
        const allMatched = cards.every(card => card.matched);
        if (allMatched) {
            setGameWon(true);
            clearInterval(intervalId); // Stop the timer when the game is won
        }
    }, [cards]);

    // Start the timer when the game begins
    useEffect(() => {
        if (!gameWon) {
            const id = setInterval(() => {
                setTimer(prev => prev + 1); // Increase the timer every second
            }, 1000);

            setIntervalId(id); // Store the interval ID

            // Cleanup the interval when the component unmounts or game is won
            return () => clearInterval(id);
        }
    }, [gameWon]);

    return (
        <div className="game-board">
            {cards.map(card => (
                <Card key={card.id} card={card} onClick={handleCardClick} />
            ))}

            {/* Display the click count */}
            <div className="click-count">Click count: {clickCount}</div>

            {/* Display the timer */}
            <div className="timer">Time: {timer}s</div>

            {/* Display a celebratory message when the game is won */}
            {gameWon && (
                <div className="celebration-message">
                    Congratulations! You've matched all the cards in {clickCount} clicks and {timer} seconds!
                </div>
            )}
        </div>
    );
};

export default GameBoard;
