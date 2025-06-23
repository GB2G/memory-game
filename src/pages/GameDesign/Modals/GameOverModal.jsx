import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const GameOverModal = ({ show, onRestart }) => {
  const navigate = useNavigate();

  return (
    <Modal show={show} centered>
      <Modal.Header>
        <Modal.Title>Game Over</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>You matched all pairs!</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={onRestart}>
          Restart
        </Button>
        <Button variant="secondary" onClick={() => navigate('/')}>
          Home
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GameOverModal;