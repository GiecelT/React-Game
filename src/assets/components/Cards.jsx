import React from "react";


const Card = ({ card, onClick }) => {
    return (
        <div 
            className={`card ${card.flipped ? "flipped" : ""}`} 
            onClick={() => !card.matched && !card.flipped && onClick(card.id)}
        >
            <div className="card-inner">
                <div className="card-front">{card.flipped ? card.value : "?"}</div>
                <div className="card-back"></div>
            </div>
        </div>
    );
};

export default Card;
