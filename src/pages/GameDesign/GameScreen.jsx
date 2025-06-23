import React, { useState, useEffect } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {useParams} from 'react-router-dom';
import PlayingCard from './Card/Card.jsx';
import GameOverModal from './Modals/GameOverModal';
import GameWonModal from './Modals/GameWonModal.jsx';
import './MemoryGame.css';

function MemoryGame() {
    
    const [seconds, setSeconds] = useState(0);
    const navigate = useNavigate();
    const params = useParams();
    const [cards, setCards] = useState([]);
    const [flippedIndices, setFlippedIndices] = useState([]);
    const [score, setScore] = useState(0);
    const [matches, setMatches] = useState(0);
    const [gameWon, setGameWon] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [isPreviewing, setIsPreviewing] = useState(true); // Preview mode

    // Format time mm:ss
    const formatTime = (s) => {
        const mins = Math.floor(s / 60).toString().padStart(2, '0');
        const secs = (s % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    let gameData = {
        "easy": ['easy', 2, 20, 5500, 5, 2],
        "normal": ['normal', 4, 40, 6000, 6, 4],
        "hard": ['hard', 9, 100, 10000, 10, 6],
    };

    const difficulty = params.level;

    const data = gameData[difficulty];
    const points = data[2];
    const timeS = data[4];
    const timeMs = data[3];
    const mistakes = data[5];

    // Number of pairs based on difficulty
    const getPairCount = () => {
        return data[1];
    };

    // Generate deck (unique cards only)
    const generateDeck = (pairCount) => {
        const suits = ['\u2660', '\u2665', '\u2666', '\u2663'];
        const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        const deck = [];
        while (deck.length < pairCount) {
            const rank = ranks[Math.floor(Math.random() * ranks.length)];
            const suit = suits[Math.floor(Math.random() * suits.length)];
            const id = `${rank}${suit}`;
        if (!deck.find(c => c.id === id)) {
            deck.push({ id, rank, suit, isFlipped: false, isMatched: false });
        }
        }
        return deck;
    };

    //Lives feature
    const [lives, setLives] = useState(mistakes);


    //Timer to countdown preview
    const [previewSecondsLeft, setPreviewSecondsLeft] = useState(timeS);

    useEffect(() => {
        if (isPreviewing) {
            setPreviewSecondsLeft(timeS); // reset timer to 10 seconds
            const countdown = setInterval(() => {
                setPreviewSecondsLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(countdown);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(countdown);
        }
    }, [isPreviewing]);

    // Shuffle deck
    const shuffleDeck = (deck) => deck.sort(() => Math.random() - 0.5);

    // Setup cards and start preview on difficulty change
    useEffect(() => {
        console.log(difficulty);
        const generated = generateDeck(getPairCount());
        // Show all cards face up initially
        const previewCards = [...generated, ...generated].map(card => ({
            ...card,
            isFlipped: false,
            isMatched: false,
        }));
        setCards(shuffleDeck(previewCards));
        setFlippedIndices([]);
        setScore(0);
        setMatches(0);
        setGameOver(false);
        setGameWon(false);
        setSeconds(0);
        setIsPreviewing(true);
    }, [difficulty]);

    // End preview after 5.5 seconds - flip cards face down and enable gameplay
    useEffect(() => {
        if (isPreviewing) {
        const previewTimer = setTimeout(() => {
            setCards(prevCards =>
            prevCards.map(card => ({ ...card, isFlipped: true }))
            );
            setIsPreviewing(false);
        }, timeMs);
            return () => clearTimeout(previewTimer);
        }
    }, [isPreviewing]);

    // Timer - only runs if not previewing and game not over
    useEffect(() => {
        if (!isPreviewing && !gameOver) {
        const timer = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);

        return () => clearInterval(timer);
        }
    }, [isPreviewing, gameOver]);

    // Handle card click
    const handleCardClick = (index) => {
        console.log("Card clicked");
        if (isPreviewing) return; // disable clicks during preview
        
        const newCards = [...cards];
        if (newCards[index].isFlipped && newCards[index].isMatched || flippedIndices.length === 2) return;

        //console.log(newCards[index].isFlipped);
        newCards[index].isFlipped = false;
        const newFlipped = [...flippedIndices, index];
        setCards(newCards);
        setFlippedIndices(newFlipped);

        if (newFlipped.length === 2) {
            const [first, second] = newFlipped;
            if (newCards[first].id === newCards[second].id) {
                setTimeout(() => {
                newCards[first].isMatched = true;
                newCards[second].isMatched = true;
                setCards([...newCards]);
                setFlippedIndices([]);
                setScore(score + points);
                setMatches(matches + 1);
                }, 500);
            } else {
                setTimeout(() => {
                newCards[first].isFlipped = true;
                newCards[second].isFlipped = true;
                setCards([...newCards]);
                setFlippedIndices([]);
                setScore(score - 10);
                setLives(prev => prev-1);
                }, 1000);
            }
        }
    };

    useEffect(() => {
        if (lives <= 0) {
            setGameOver(true);
        }
    }, [lives]);

    // Detect game over (all pairs matched)
    useEffect(() => {
        if (matches === getPairCount()) {
        setGameWon(true);

        }
    }, [matches]);

    // Restart game (resets all states and preview)
    const restartGame = () => {
        const generated = generateDeck(getPairCount());
        const previewCards = [...generated, ...generated].map(card => ({
            ...card,
            isFlipped: false,
            isMatched: false,
        }));
        setLives(mistakes);
        setCards(shuffleDeck(previewCards));
        setFlippedIndices([]);
        setScore(0);
        setMatches(0);
        setGameOver(false);
        setGameWon(false);
        setSeconds(0);
        setIsPreviewing(true);
    };

    return (
        <div className="memory-game-wrapper">
        <Navbar  variant="dark" className="game-navbar">
            <Container className="d-flex justify-content-between align-items-center">
            <div className="navbar-item">🧠 Score: {score}</div>
            <div className="navbar-item">❤️ Lives: {lives}</div>
            <div className="navbar-item">⏱️ Time: {formatTime(seconds)}</div>
            <Button variant="outline-light" onClick={() => navigate('/')}>
                Return Home
            </Button>
            </Container>
        </Navbar>

            {isPreviewing && (
                <div className="preview-timer">
                    🕒 Preview ends in: {previewSecondsLeft}s
                </div>
            )}

        <div className={`game-grid ${difficulty}`}>
            {cards.map((card, index) => (
                <PlayingCard
                    key={index}
                    rank={card.rank}
                    suit={card.suit}
                    isFlipped={card.isFlipped || card.isMatched}
                    isMatched={card.isMatched}
                    onClick={() => handleCardClick(index)}
                />
            ))}
        </div>

        <GameOverModal
            show={gameOver}
            onRestart={restartGame}
        />

        <GameWonModal
            show={gameWon}
            onRestart={restartGame}    
        />
        </div>
    );
}

export default MemoryGame;