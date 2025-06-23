import React from 'react';
import '../Card/Card.css'; // or your card-specific CSS

const PlayingCard = ({ rank, suit, isFlipped, isMatched, onClick }) => {
    const suitClass = {
        '♠': 'spade',
        '♣': 'club',
        '♥': 'heart',
        '♦': 'diamond'
    }[suit];

    return (
        <div className={`playing-card card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`} onClick={onClick}>
            <div className="card-inner">
                <div className={`card-front ${suitClass}`}>
                    
                    <div className="rank">{rank}</div>
                    <div className="suit">{suit}</div>
                    
                </div>
                <div className="card-back"></div>
            </div>
        </div>
        
    );
};

export default PlayingCard;